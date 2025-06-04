import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { calculateSignalQuality, calculateEffectiveThroughput } from '../utils/powerCalculations';
import { BarChart3, Activity, Zap } from 'lucide-react';

const MetricsPanel: React.FC = () => {
  const { metrics, parameters } = useSimulation();
  
  // Calculate signal quality as a percentage
  const signalQuality = calculateSignalQuality(metrics.margin);
  
  // Calculate effective throughput
  const downstreamThroughput = calculateEffectiveThroughput(
    parameters.dataRateDownstream,
    signalQuality
  );
  
  const upstreamThroughput = calculateEffectiveThroughput(
    parameters.dataRateUpstream,
    signalQuality
  );
  
  // Determine status color based on signal quality
  const getStatusColor = (quality: number): string => {
    if (quality >= 70) return 'text-green-500';
    if (quality >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Determine power meter class based on power level
  const getPowerMeterClass = (level: number): string => {
    if (level >= 70) return 'bg-gradient-to-r from-green-500 to-emerald-400';
    if (level >= 40) return 'bg-gradient-to-r from-yellow-500 to-amber-400';
    return 'bg-gradient-to-r from-red-500 to-rose-400';
  };
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-lg h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Activity className="h-5 w-5 text-cyan-400 mr-2" />
        <h3 className="text-lg font-medium text-white">Network Metrics</h3>
      </div>
      
      {/* Power Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-800/50 rounded-md p-3">
          <div className="text-xs text-gray-400 mb-1">Tx Power</div>
          <div className="text-xl font-mono text-white">
            {metrics.inputPower.toFixed(1)}<span className="text-sm text-gray-400 ml-1">dBm</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-md p-3">
          <div className="text-xs text-gray-400 mb-1">Rx Power</div>
          <div className="text-xl font-mono text-white">
            {metrics.outputPower.toFixed(1)}<span className="text-sm text-gray-400 ml-1">dBm</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-md p-3">
          <div className="text-xs text-gray-400 mb-1">Power Loss</div>
          <div className="text-xl font-mono text-white">
            {metrics.loss.toFixed(1)}<span className="text-sm text-gray-400 ml-1">dB</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-md p-3">
          <div className="text-xs text-gray-400 mb-1">Power Margin</div>
          <div className={`text-xl font-mono ${getStatusColor(signalQuality)}`}>
            {metrics.margin.toFixed(1)}<span className="text-sm ml-1">dB</span>
          </div>
        </div>
      </div>
      
      {/* Signal Quality Meter */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <div className="text-sm text-gray-400">Signal Quality</div>
          <div className={`text-sm font-mono ${getStatusColor(signalQuality)}`}>
            {signalQuality.toFixed(1)}%
          </div>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getPowerMeterClass(signalQuality)} transition-all duration-500`}
            style={{ width: `${signalQuality}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Critical</span>
          <span>Degraded</span>
          <span>Optimal</span>
        </div>
      </div>
      
      {/* Throughput Metrics */}
      <div className="mb-4">
        <div className="text-sm text-gray-400 mb-2 flex items-center">
          <BarChart3 className="h-4 w-4 mr-1" />
          <span>Effective Throughput</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center bg-gray-800/50 rounded-md p-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <div className="text-xs text-gray-400">Downstream</div>
            <div className="ml-auto text-sm font-mono text-white">
              {downstreamThroughput.toFixed(2)} <span className="text-xs">Gbps</span>
            </div>
          </div>
          
          <div className="flex items-center bg-gray-800/50 rounded-md p-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <div className="text-xs text-gray-400">Upstream</div>
            <div className="ml-auto text-sm font-mono text-white">
              {upstreamThroughput.toFixed(2)} <span className="text-xs">Gbps</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wavelength Information */}
      <div className="mt-auto">
        <div className="text-sm text-gray-400 mb-2 flex items-center">
          <Zap className="h-4 w-4 mr-1" />
          <span>Wavelength Information</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center bg-gray-800/50 rounded-md p-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <div className="text-xs text-gray-400">Downstream</div>
            <div className="ml-auto text-sm font-mono text-white">
              {parameters.wavelengthDownstream} <span className="text-xs">nm</span>
            </div>
          </div>
          
          <div className="flex items-center bg-gray-800/50 rounded-md p-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <div className="text-xs text-gray-400">Upstream</div>
            <div className="ml-auto text-sm font-mono text-white">
              {parameters.wavelengthUpstream} <span className="text-xs">nm</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 p-2 border border-gray-800 rounded bg-gray-900/50">
        <p className="mb-1">Signal Quality Indicators:</p>
        <ul className="ml-4 list-disc text-xs space-y-1">
          <li><span className="text-green-500">70-100%</span>: Excellent (high stability)</li>
          <li><span className="text-yellow-500">40-69%</span>: Acceptable (may experience issues)</li>
          <li><span className="text-red-500">&lt;40%</span>: Critical (service degradation)</li>
        </ul>
      </div>
    </div>
  );
};

export default MetricsPanel;