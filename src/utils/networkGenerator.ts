import { NetworkNode, FiberConnection } from '../types';

export const generateInitialNetwork = (splitterRatio: number): { 
  nodes: NetworkNode[]; 
  connections: FiberConnection[]; 
} => {
  const nodes: NetworkNode[] = [];
  const connections: FiberConnection[] = [];
  
  // Add OLT (Optical Line Terminal)
  const olt: NetworkNode = {
    id: 'olt-1',
    type: 'OLT',
    name: 'Central Office OLT',
    x: 100,
    y: 250,
    status: 'active'
  };
  
  nodes.push(olt);
  
  // Add Splitter
  const splitter: NetworkNode = {
    id: 'splitter-1',
    type: 'SPLITTER',
    name: `1:${splitterRatio} Splitter`,
    x: 400,
    y: 250,
    status: 'active'
  };
  
  nodes.push(splitter);
  
  // Add connection between OLT and Splitter
  connections.push({
    id: 'conn-olt-splitter',
    sourceId: olt.id,
    targetId: splitter.id,
    length: 5, // 5 km
    attenuation: 0.35 // 0.35 dB/km
  });
  
  // Add ONUs (Optical Network Units)
  const onuCount = splitterRatio;
  const radius = 200;
  const angleStep = (Math.PI) / (onuCount - 1);
  
  for (let i = 0; i < onuCount; i++) {
    // Calculate position in a semicircle
    const angle = i * angleStep;
    const x = splitter.x + radius * Math.cos(angle);
    const y = splitter.y + radius * Math.sin(angle);
    
    const onu: NetworkNode = {
      id: `onu-${i + 1}`,
      type: 'ONU',
      name: `Customer ONU ${i + 1}`,
      x: x,
      y: y,
      status: 'active'
    };
    
    nodes.push(onu);
    
    // Add connection between Splitter and ONU
    connections.push({
      id: `conn-splitter-onu-${i + 1}`,
      sourceId: splitter.id,
      targetId: onu.id,
      length: 1 + Math.random() * 2, // 1-3 km
      attenuation: 0.35 // 0.35 dB/km
    });
  }
  
  return { nodes, connections };
};