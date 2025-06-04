import React from 'react';
import Header from '../components/Header';
import { Book } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="container mx-auto p-8">
        <div className="flex items-center mb-8">
          <Book className="h-8 w-8 text-cyan-400 mr-3" />
          <h1 className="text-3xl font-bold">Documentation</h1>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Getting Started</h2>
            <p className="text-gray-300 mb-4">
              The PON Network Simulator is an educational tool designed to help you understand
              the principles of Passive Optical Networks through interactive visualization.
            </p>
            <h3 className="text-lg font-medium mb-2 text-white">Key Features</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Interactive network topology visualization</li>
              <li>Real-time packet flow animation</li>
              <li>Adjustable network parameters</li>
              <li>Power and signal quality metrics</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Using the Simulator</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Adjust network parameters using the control panel to see how different
                configurations affect network performance and signal quality.
              </p>
              <p>
                The visualization shows:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Blue packets: Downstream data flow</li>
                <li>Green packets: Upstream data flow</li>
                <li>Connection colors indicate signal strength</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;