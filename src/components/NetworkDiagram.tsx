import React, { useRef, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { NetworkNode, FiberConnection, DataPacket } from '../types';
import { calculateConnectionBudget } from '../utils/powerCalculations';

const NetworkDiagram: React.FC = () => {
  const { nodes, connections, packets, parameters, isRunning } = useSimulation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw the network on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);
    
    // Draw connections
    connections.forEach(connection => {
      drawConnection(ctx, connection, nodes, parameters.transmissionPower);
    });
    
    // Draw nodes
    nodes.forEach(node => {
      drawNode(ctx, node);
    });
    
    // Draw packets
    packets.forEach(packet => {
      drawPacket(ctx, packet, nodes, connections);
    });
    
    // Animation frame
    if (isRunning) {
      requestAnimationFrame(() => {});
    }
  }, [nodes, connections, packets, parameters, isRunning]);
  
  // Draw grid pattern
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(20, 180, 170, 0.1)';
    ctx.lineWidth = 0.5;
    
    const gridSize = 25;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };
  
  // Draw a network node
  const drawNode = (ctx: CanvasRenderingContext2D, node: NetworkNode) => {
    const nodeSize = node.type === 'SPLITTER' ? 40 : (node.type === 'OLT' ? 50 : 30);
    
    // Draw node circle with glow effect
    ctx.shadowColor = getNodeColor(node.type, node.status);
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#1A1A2E';
    ctx.strokeStyle = getNodeColor(node.type, node.status);
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Remove shadow for text
    ctx.shadowBlur = 0;
    
    // Draw node type
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = getNodeColor(node.type, node.status);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.type, node.x, node.y - 5);
    
    // Draw node name
    ctx.font = '10px monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(node.name, node.x, node.y + 10);
  };
  
  // Draw a connection between nodes
  const drawConnection = (
    ctx: CanvasRenderingContext2D, 
    connection: FiberConnection, 
    nodes: NetworkNode[],
    transmissionPower: number
  ) => {
    const sourceNode = nodes.find(n => n.id === connection.sourceId);
    const targetNode = nodes.find(n => n.id === connection.targetId);
    
    if (!sourceNode || !targetNode) return;
    
    // Calculate power budget for this connection
    const powerBudget = calculateConnectionBudget(connection, transmissionPower);
    const signalQuality = Math.max(0, Math.min(1, (powerBudget + 28) / 30)); // Normalize to 0-1
    
    // Draw fiber line with gradient based on signal quality
    const gradient = ctx.createLinearGradient(sourceNode.x, sourceNode.y, targetNode.x, targetNode.y);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(1, powerBudget < -20 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(16, 185, 129, 0.8)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.lineTo(targetNode.x, targetNode.y);
    ctx.stroke();
    
    // Draw connection label with distance
    const midX = (sourceNode.x + targetNode.x) / 2;
    const midY = (sourceNode.y + targetNode.y) / 2;
    
    ctx.font = '10px monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${connection.length.toFixed(1)} km`, midX, midY - 10);
  };
  
  // Draw a data packet on the connection
  const drawPacket = (
    ctx: CanvasRenderingContext2D, 
    packet: DataPacket, 
    nodes: NetworkNode[],
    connections: FiberConnection[]
  ) => {
    const sourceNode = nodes.find(n => n.id === packet.sourceId);
    const targetNode = nodes.find(n => n.id === packet.targetId);
    
    if (!sourceNode || !targetNode) return;
    
    // Calculate packet position along the connection
    const x = sourceNode.x + (targetNode.x - sourceNode.x) * packet.progress;
    const y = sourceNode.y + (targetNode.y - sourceNode.y) * packet.progress;
    
    // Draw packet
    ctx.shadowColor = packet.direction === 'downstream' ? '#3B82F6' : '#10B981';
    ctx.shadowBlur = 10;
    ctx.fillStyle = packet.direction === 'downstream' ? '#3B82F6' : '#10B981';
    
    const packetSize = 6 + (packet.size / 1000); // Scale packet size visually
    
    ctx.beginPath();
    ctx.arc(x, y, packetSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Remove shadow
    ctx.shadowBlur = 0;
  };
  
  // Get color based on node type and status
  const getNodeColor = (type: string, status: string): string => {
    if (status === 'error') return '#EF4444';
    if (status === 'warning') return '#F59E0B';
    
    switch (type) {
      case 'OLT':
        return '#3B82F6'; // Blue
      case 'SPLITTER':
        return '#8B5CF6'; // Purple
      case 'ONU':
        return '#10B981'; // Green
      default:
        return '#94A3B8'; // Gray
    }
  };
  
  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-900 rounded-lg">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: '#0F172A' }}
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/80 p-3 rounded-md backdrop-blur-sm border border-gray-800">
        <div className="text-xs text-gray-400 mb-2">Network Legend</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs text-gray-300">OLT (Central Office)</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-xs text-gray-300">Splitter</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-300">ONU (Customer Premises)</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs text-gray-300">Downstream Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-300">Upstream Data</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkDiagram;