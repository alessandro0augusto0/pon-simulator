import React from 'react';
import Header from '../components/Header';
import { Library } from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="container mx-auto p-8">
        <div className="flex items-center mb-8">
          <Library className="h-8 w-8 text-cyan-400 mr-3" />
          <h1 className="text-3xl font-bold">Learning Resources</h1>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Technical Standards</h2>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.itu.int/rec/T-REC-G.984.1/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  ITU-T G.984 GPON Standard
                </a>
              </li>
              <li>
                <a 
                  href="https://www.itu.int/rec/T-REC-G.989.1/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  ITU-T G.989 NG-PON2
                </a>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Educational Material</h2>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  PON Technology Overview
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Fiber Optics Fundamentals
                </a>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Tools & Calculators</h2>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Optical Power Budget Calculator
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Bandwidth Estimation Tool
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resources;