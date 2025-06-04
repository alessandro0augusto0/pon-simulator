import { SimulationParameters, FiberConnection, PowerMetrics } from '../types';

export const calculatePowerMetrics = (
  parameters: SimulationParameters,
  connections: FiberConnection[]
): PowerMetrics => {
  // Calculate total fiber length
  const totalLength = connections.reduce((sum, conn) => sum + conn.length, 0);
  
  // Calculate fiber attenuation loss
  const fiberLoss = totalLength * parameters.fiberDistance * 0.35; // 0.35 dB/km is typical
  
  // Calculate splitter loss (assuming a splitter will divide power equally)
  const splitterLoss = 10 * Math.log10(parameters.splitterRatio) + 0.5; // Additional 0.5dB for insertion loss
  
  // Calculate connector losses (assuming 2 connectors per link, 0.3dB per connector)
  const connectorLoss = connections.length * 2 * 0.3;
  
  // Total loss
  const totalLoss = fiberLoss + splitterLoss + connectorLoss;
  
  // Output power
  const outputPower = parameters.transmissionPower - totalLoss;
  
  // Power margin (difference between output power and receiver sensitivity)
  const powerMargin = outputPower - parameters.receiverSensitivity;
  
  return {
    inputPower: parameters.transmissionPower,
    outputPower,
    loss: totalLoss,
    margin: powerMargin
  };
};

// Function to calculate optical budget for a specific connection
export const calculateConnectionBudget = (
  connection: FiberConnection,
  transmissionPower: number
): number => {
  const fiberLoss = connection.length * connection.attenuation;
  const connectorLoss = 2 * 0.3; // Two connectors at 0.3dB each
  
  return transmissionPower - fiberLoss - connectorLoss;
};

// Calculate signal level at a specific point (percentage)
export const calculateSignalQuality = (powerMargin: number): number => {
  // If margin is negative, signal is below sensitivity threshold
  if (powerMargin < 0) return 0;
  
  // Map margin to a 0-100% scale
  // Assuming 10dB margin is excellent (100%), 0dB is minimum (0%)
  const qualityPercent = Math.min(powerMargin / 10 * 100, 100);
  return Math.max(qualityPercent, 0);
};

// Calculate effective throughput based on signal quality
export const calculateEffectiveThroughput = (
  nominalRate: number, 
  signalQuality: number
): number => {
  // Simple linear model assuming throughput drops with signal quality
  // More sophisticated models would consider BER, FEC, etc.
  const utilizationFactor = signalQuality / 100;
  return nominalRate * utilizationFactor;
};