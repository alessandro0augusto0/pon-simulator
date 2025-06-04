import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Network, Wifi } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md mr-3">
            <Network className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center">
              PON<span className="text-cyan-400">Simulator</span>
              <Wifi className="h-4 w-4 text-cyan-400 ml-1" />
            </h1>
            <p className="text-xs text-gray-400">Passive Optical Network Visualization Tool</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm ${location.pathname === '/' ? 'text-white' : 'text-gray-400'} hover:text-cyan-400 transition-colors`}
          >
            Dashboard
          </Link>
          <Link 
            to="/documentation" 
            className={`text-sm ${location.pathname === '/documentation' ? 'text-white' : 'text-gray-400'} hover:text-cyan-400 transition-colors`}
          >
            Documentation
          </Link>
          <Link 
            to="/resources" 
            className={`text-sm ${location.pathname === '/resources' ? 'text-white' : 'text-gray-400'} hover:text-cyan-400 transition-colors`}
          >
            Resources
          </Link>
          <a 
            href="https://github.com/yourusername/pon-simulator" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-md text-white hover:opacity-90 transition-opacity"
          >
            Learn More
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;