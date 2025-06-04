import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { SimulationProvider } from './context/SimulationContext';
import Header from './components/Header';
import NetworkDiagram from './components/NetworkDiagram';
import ParameterControls from './components/ParameterControls';
import MetricsPanel from './components/MetricsPanel';
import InfoPanel from './components/InfoPanel';
import Documentation from './pages/Documentation';
import Resources from './pages/Resources';

function MainSimulation() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-[500px]">
            <NetworkDiagram />
          </div>
          
          <div className="lg:col-span-1">
            <ParameterControls />
          </div>
          
          <div className="lg:col-span-1">
            <MetricsPanel />
          </div>
          
          <div className="lg:col-span-2">
            <InfoPanel />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          <p>PON Network Simulator — Educational Tool for Optical Network Visualization</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} | Designed for network engineers and students</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SimulationProvider>
        <Routes>
          <Route path="/" element={<MainSimulation />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </SimulationProvider>
    </BrowserRouter>
  );
}

export default App;