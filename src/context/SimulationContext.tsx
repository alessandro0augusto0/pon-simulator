import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { 
  NetworkNode, 
  FiberConnection, 
  DataPacket, 
  SimulationParameters,
  PowerMetrics
} from '../types';
import { generateInitialNetwork } from '../utils/networkGenerator';
import { calculatePowerMetrics } from '../utils/powerCalculations';

interface SimulationContextType {
  nodes: NetworkNode[];
  connections: FiberConnection[];
  packets: DataPacket[];
  parameters: SimulationParameters;
  metrics: PowerMetrics;
  isRunning: boolean;
  updateParameter: (key: keyof SimulationParameters, value: number) => void;
  toggleSimulation: () => void;
  resetSimulation: () => void;
  saveConfiguration: () => void;
}

const defaultParameters: SimulationParameters = {
  fiberDistance: 10, // km
  splitterRatio: 8, // 1:8
  transmissionPower: 3, // dBm
  receiverSensitivity: -28, // dBm
  wavelengthDownstream: 1490, // nm
  wavelengthUpstream: 1310, // nm
  dataRateDownstream: 2.5, // Gbps
  dataRateUpstream: 1.25, // Gbps
  packetGenerationRate: 5 // packets per second
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [connections, setConnections] = useState<FiberConnection[]>([]);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [parameters, setParameters] = useState<SimulationParameters>(() => {
    const saved = localStorage.getItem('ponSimulatorConfig');
    return saved ? JSON.parse(saved).parameters : defaultParameters;
  });
  const [metrics, setMetrics] = useState<PowerMetrics>({
    inputPower: 0,
    outputPower: 0,
    loss: 0,
    margin: 0
  });
  const [isRunning, setIsRunning] = useState(true);
  
  const animationFrameRef = useRef<number>();
  const lastPacketTimeRef = useRef<number>(0);
  
  // Initialize network
  useEffect(() => {
    const { nodes, connections } = generateInitialNetwork(parameters.splitterRatio);
    setNodes(nodes);
    setConnections(connections);
  }, [parameters.splitterRatio]);
  
  // Calculate power metrics when parameters change
  useEffect(() => {
    const newMetrics = calculatePowerMetrics(parameters, connections);
    setMetrics(newMetrics);
  }, [parameters, connections]);
  
  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!isRunning) return;
    
    // Generate new packets based on rate
    const packetInterval = 1000 / parameters.packetGenerationRate;
    if (timestamp - lastPacketTimeRef.current >= packetInterval) {
      setPackets(prevPackets => {
        const newPackets = [...prevPackets];
        
        // Add downstream packet (70% chance)
        if (Math.random() < 0.7) {
          const oltNode = nodes.find(node => node.type === 'OLT');
          const splitterNode = nodes.find(node => node.type === 'SPLITTER');
          
          if (oltNode && splitterNode) {
            newPackets.push({
              id: `packet-${Date.now()}-${Math.random()}`,
              direction: 'downstream',
              sourceId: oltNode.id,
              targetId: splitterNode.id,
              progress: 0,
              size: Math.floor(Math.random() * 1000) + 500
            });
          }
        }
        
        // Add upstream packet (30% chance)
        if (Math.random() < 0.3) {
          const onuNodes = nodes.filter(node => node.type === 'ONU');
          const splitterNode = nodes.find(node => node.type === 'SPLITTER');
          
          if (onuNodes.length > 0 && splitterNode) {
            const randomOnu = onuNodes[Math.floor(Math.random() * onuNodes.length)];
            newPackets.push({
              id: `packet-${Date.now()}-${Math.random()}`,
              direction: 'upstream',
              sourceId: randomOnu.id,
              targetId: splitterNode.id,
              progress: 0,
              size: Math.floor(Math.random() * 500) + 100
            });
          }
        }
        
        return newPackets;
      });
      
      lastPacketTimeRef.current = timestamp;
    }
    
    // Update packet positions
    setPackets(prevPackets => {
      return prevPackets
        .map(packet => {
          const updatedPacket = { ...packet, progress: packet.progress + 0.02 };
          
          if (updatedPacket.progress >= 1) {
            if (packet.direction === 'downstream') {
              const targetNode = nodes.find(node => node.id === packet.targetId);
              if (targetNode?.type === 'SPLITTER') {
                const onuNodes = nodes.filter(node => node.type === 'ONU');
                return onuNodes.map(onu => ({
                  id: `packet-${Date.now()}-${Math.random()}`,
                  direction: 'downstream',
                  sourceId: targetNode.id,
                  targetId: onu.id,
                  progress: 0,
                  size: packet.size / onuNodes.length
                }));
              }
            }
            
            if (packet.direction === 'upstream') {
              const targetNode = nodes.find(node => node.id === packet.targetId);
              if (targetNode?.type === 'SPLITTER') {
                const oltNode = nodes.find(node => node.type === 'OLT');
                if (oltNode) {
                  return [{
                    id: `packet-${Date.now()}-${Math.random()}`,
                    direction: 'upstream',
                    sourceId: targetNode.id,
                    targetId: oltNode.id,
                    progress: 0,
                    size: packet.size
                  }];
                }
              }
            }
            
            return [];
          }
          
          return updatedPacket;
        })
        .flat();
    });
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isRunning, nodes, parameters.packetGenerationRate]);
  
  // Start/stop animation
  useEffect(() => {
    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, animate]);
  
  const updateParameter = useCallback((key: keyof SimulationParameters, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  }, []);
  
  const toggleSimulation = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);
  
  const resetSimulation = useCallback(() => {
    setParameters(defaultParameters);
    setPackets([]);
    const { nodes, connections } = generateInitialNetwork(defaultParameters.splitterRatio);
    setNodes(nodes);
    setConnections(connections);
    toast.success('Simulation reset to default values');
  }, []);
  
  const saveConfiguration = useCallback(() => {
    const config = {
      parameters,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('ponSimulatorConfig', JSON.stringify(config));
    toast.success('Configuration saved successfully!', {
      description: 'Your settings will be restored next time you open the simulator.'
    });
  }, [parameters]);
  
  return (
    <SimulationContext.Provider value={{
      nodes,
      connections,
      packets,
      parameters,
      metrics,
      isRunning,
      updateParameter,
      toggleSimulation,
      resetSimulation,
      saveConfiguration
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};