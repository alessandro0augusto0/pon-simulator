export interface NetworkNode {
  id: string;
  type: 'OLT' | 'SPLITTER' | 'ONU';
  name: string;
  x: number;
  y: number;
  status: 'active' | 'inactive' | 'warning' | 'error';
}

export interface FiberConnection {
  id: string;
  sourceId: string;
  targetId: string;
  length: number; // in kilometers
  attenuation: number; // in dB/km
}

export interface DataPacket {
  id: string;
  direction: 'upstream' | 'downstream';
  sourceId: string;
  targetId: string;
  progress: number; // 0 to 1
  size: number; // in bytes
}

export interface SimulationParameters {
  fiberDistance: number; // in kilometers
  splitterRatio: number; // 1:n ratio
  transmissionPower: number; // in dBm
  receiverSensitivity: number; // in dBm
  wavelengthDownstream: number; // in nm
  wavelengthUpstream: number; // in nm
  dataRateDownstream: number; // in Gbps
  dataRateUpstream: number; // in Gbps
  packetGenerationRate: number; // packets per second
}

export interface PowerMetrics {
  inputPower: number; // in dBm
  outputPower: number; // in dBm
  loss: number; // in dB
  margin: number; // in dB
}