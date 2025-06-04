import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SimulationParameters } from '../types';
import { Sliders, Save, RotateCcw, PlayCircle, PauseCircle } from 'lucide-react';

const ParameterControls: React.FC = () => {
  const { 
    parameters, 
    updateParameter, 
    toggleSimulation, 
    isRunning,
    resetSimulation,
    saveConfiguration
  } = useSimulation();
  
  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    key: keyof SimulationParameters
  ) => {
    updateParameter(key, parseFloat(e.target.value));
  };
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-y-auto shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sliders className="h-5 w-5 text-cyan-400 mr-2" />
          <h3 className="text-lg font-medium text-white">Network Parameters</h3>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={resetSimulation}
            className="p-2 rounded-md bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" 
            title="Reset Simulation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          
          <button 
            onClick={toggleSimulation}
            className="p-2 rounded-md bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" 
            title={isRunning ? "Pause Simulation" : "Resume Simulation"}
          >
            {isRunning ? (
              <PauseCircle className="h-4 w-4" />
            ) : (
              <PlayCircle className="h-4 w-4" />
            )}
          </button>
          
          <button 
            onClick={saveConfiguration}
            className="p-2 rounded-md bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" 
            title="Save Configuration"
          >
            <Save className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fiber Distance */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Fiber Distance (km)</label>
            <span className="text-sm font-mono text-cyan-400">{parameters.fiberDistance.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="20" 
            step="0.5" 
            value={parameters.fiberDistance} 
            onChange={(e) => handleSliderChange(e, 'fiberDistance')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>20</span>
          </div>
        </div>
        
        {/* Splitter Ratio */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Splitter Ratio (1:n)</label>
            <span className="text-sm font-mono text-cyan-400">1:{parameters.splitterRatio}</span>
          </div>
          <input 
            type="range" 
            min="2" 
            max="16" 
            step="1" 
            value={parameters.splitterRatio} 
            onChange={(e) => handleSliderChange(e, 'splitterRatio')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1:2</span>
            <span>1:16</span>
          </div>
        </div>
        
        {/* Transmission Power */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Transmission Power (dBm)</label>
            <span className="text-sm font-mono text-cyan-400">{parameters.transmissionPower.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="10" 
            step="0.5" 
            value={parameters.transmissionPower} 
            onChange={(e) => handleSliderChange(e, 'transmissionPower')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>10</span>
          </div>
        </div>
        
        {/* Receiver Sensitivity */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Receiver Sensitivity (dBm)</label>
            <span className="text-sm font-mono text-cyan-400">{parameters.receiverSensitivity.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="-35" 
            max="-20" 
            step="0.5" 
            value={parameters.receiverSensitivity} 
            onChange={(e) => handleSliderChange(e, 'receiverSensitivity')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>-35</span>
            <span>-20</span>
          </div>
        </div>
        
        {/* Wavelength Downstream */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Downstream Wavelength (nm)</label>
            <span className="text-sm font-mono text-cyan-400">{parameters.wavelengthDownstream.toFixed(0)}</span>
          </div>
          <input 
            type="range" 
            min="1480" 
            max="1500" 
            step="1" 
            value={parameters.wavelengthDownstream} 
            onChange={(e) => handleSliderChange(e, 'wavelengthDownstream')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1480</span>
            <span>1500</span>
          </div>
        </div>
        
        {/* Wavelength Upstream */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Upstream Wavelength (nm)</label>
            <span className="text-sm font-mono text-cyan-400">{parameters.wavelengthUpstream.toFixed(0)}</span>
          </div>
          <input 
            type="range" 
            min="1290" 
            max="1330" 
            step="1" 
            value={parameters.wavelengthUpstream} 
            onChange={(e) => handleSliderChange(e, 'wavelengthUpstream')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1290</span>
            <span>1330</span>
          </div>
        </div>
        
        {/* Data Rate Downstream */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Downstream Rate (Gbps)</label>
            <span className="text-sm font-mono text-cyan-400">{parameters.dataRateDownstream.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="1.25" 
            max="10" 
            step="1.25" 
            value={parameters.dataRateDownstream} 
            onChange={(e) => handleSliderChange(e, 'dataRateDownstream')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1.25</span>
            <span>10</span>
          </div>
        </div>
        
        {/* Data Rate Upstream */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Upstream Rate (Gbps)</label>
            <span className="text-sm font-mono text-cyan-400">{parameters.dataRateUpstream.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.5" 
            value={parameters.dataRateUpstream} 
            onChange={(e) => handleSliderChange(e, 'dataRateUpstream')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.5</span>
            <span>5</span>
          </div>
        </div>
        
        {/* Packet Rate */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">Packet Generation Rate (p/s)</label>
            <span className="text-sm font-mono text-cyan-400">{parameters.packetGenerationRate.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="20" 
            step="1" 
            value={parameters.packetGenerationRate} 
            onChange={(e) => handleSliderChange(e, 'packetGenerationRate')} 
            className="w-full accent-cyan-500 bg-gray-800 h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>20</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>* Adjust parameters to simulate different network configurations and conditions</p>
      </div>
    </div>
  );
};

export default ParameterControls;