import React, { useState } from 'react';
import { HelpCircle, ChevronRight, ChevronDown } from 'lucide-react';

const InfoPanel: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('about');
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-lg h-full">
      <div className="flex items-center mb-4">
        <HelpCircle className="h-5 w-5 text-cyan-400 mr-2" />
        <h3 className="text-lg font-medium text-white">PON Network Guide</h3>
      </div>
      
      <div className="space-y-3 text-sm">
        {/* About PON Section */}
        <div className="border border-gray-800 rounded-md overflow-hidden">
          <button 
            className="flex justify-between items-center w-full py-2 px-3 bg-gray-800/50 text-left"
            onClick={() => toggleSection('about')}
          >
            <span className="font-medium text-white">About PON Networks</span>
            {expandedSection === 'about' ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'about' && (
            <div className="p-3 text-gray-300 space-y-2">
              <p>
                Passive Optical Networks (PON) are point-to-multipoint fiber optic networks
                that use passive splitters to divide the fiber signal, enabling a single 
                optical fiber to serve multiple endpoints.
              </p>
              <p>
                PON systems are widely used in Fiber-to-the-Home (FTTH) deployments due to 
                their cost-effectiveness, scalability, and high bandwidth capacity.
              </p>
            </div>
          )}
        </div>
        
        {/* Components Section */}
        <div className="border border-gray-800 rounded-md overflow-hidden">
          <button 
            className="flex justify-between items-center w-full py-2 px-3 bg-gray-800/50 text-left"
            onClick={() => toggleSection('components')}
          >
            <span className="font-medium text-white">Network Components</span>
            {expandedSection === 'components' ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'components' && (
            <div className="p-3 text-gray-300 space-y-3">
              <div>
                <h4 className="text-cyan-400 font-medium mb-1">OLT (Optical Line Terminal)</h4>
                <p className="text-gray-400">
                  The central endpoint in a PON, located at the service provider's facility.
                  It manages, coordinates, and controls the ONUs connected to it.
                </p>
              </div>
              
              <div>
                <h4 className="text-cyan-400 font-medium mb-1">Optical Splitter</h4>
                <p className="text-gray-400">
                  A passive device that divides the optical signal from one fiber into 
                  multiple fibers. Common split ratios include 1:8, 1:16, and 1:32.
                </p>
              </div>
              
              <div>
                <h4 className="text-cyan-400 font-medium mb-1">ONU (Optical Network Unit)</h4>
                <p className="text-gray-400">
                  The endpoint device located at the customer premises that converts
                  optical signals to electrical signals for customer equipment.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Technologies Section */}
        <div className="border border-gray-800 rounded-md overflow-hidden">
          <button 
            className="flex justify-between items-center w-full py-2 px-3 bg-gray-800/50 text-left"
            onClick={() => toggleSection('technologies')}
          >
            <span className="font-medium text-white">PON Technologies</span>
            {expandedSection === 'technologies' ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'technologies' && (
            <div className="p-3 text-gray-300">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2 text-left text-cyan-400">Technology</th>
                    <th className="pb-2 text-left text-cyan-400">Downstream</th>
                    <th className="pb-2 text-left text-cyan-400">Upstream</th>
                    <th className="pb-2 text-left text-cyan-400">Wavelength</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800">
                    <td className="py-2">GPON</td>
                    <td className="py-2">2.5 Gbps</td>
                    <td className="py-2">1.25 Gbps</td>
                    <td className="py-2">1490/1310 nm</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2">EPON</td>
                    <td className="py-2">1.25 Gbps</td>
                    <td className="py-2">1.25 Gbps</td>
                    <td className="py-2">1490/1310 nm</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2">XG-PON</td>
                    <td className="py-2">10 Gbps</td>
                    <td className="py-2">2.5 Gbps</td>
                    <td className="py-2">1577/1270 nm</td>
                  </tr>
                  <tr>
                    <td className="py-2">XGS-PON</td>
                    <td className="py-2">10 Gbps</td>
                    <td className="py-2">10 Gbps</td>
                    <td className="py-2">1577/1270 nm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Parameters Section */}
        <div className="border border-gray-800 rounded-md overflow-hidden">
          <button 
            className="flex justify-between items-center w-full py-2 px-3 bg-gray-800/50 text-left"
            onClick={() => toggleSection('parameters')}
          >
            <span className="font-medium text-white">Key Parameters</span>
            {expandedSection === 'parameters' ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'parameters' && (
            <div className="p-3 text-gray-300 space-y-3">
              <div>
                <h4 className="text-cyan-400 font-medium mb-1">Fiber Distance</h4>
                <p className="text-gray-400">
                  The length of fiber optic cable between network components. Maximum 
                  distance is typically 20km for standard PON deployments.
                </p>
              </div>
              
              <div>
                <h4 className="text-cyan-400 font-medium mb-1">Optical Power</h4>
                <p className="text-gray-400">
                  Measured in dBm, this represents the strength of the optical signal.
                  Typical values range from +3 to +10 dBm for transmitters.
                </p>
              </div>
              
              <div>
                <h4 className="text-cyan-400 font-medium mb-1">Optical Loss</h4>
                <p className="text-gray-400">
                  The reduction in optical power as light travels through the network,
                  measured in dB. Sources include fiber attenuation (0.35 dB/km),
                  splitter loss, and connector loss.
                </p>
              </div>
              
              <div>
                <h4 className="text-cyan-400 font-medium mb-1">Power Margin</h4>
                <p className="text-gray-400">
                  The difference between received power and receiver sensitivity,
                  representing the safety margin for reliable operation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;