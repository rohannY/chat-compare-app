import React from 'react';
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <div className="text-center max-w-2xl px-6">
        <div className="text-9xl font-bold text-neutral-700">404</div>
        <h1 className="text-4xl font-light tracking-tight text-neutral-300 mt-4">
          Resource Not Found
        </h1>
        
        <div className="mt-6 text-neutral-400 text-lg">
          The path <code className="bg-neutral-800 px-2 py-1 rounded ml-2">{location.pathname}</code> 
          &nbsp;does not exist on this server.
        </div>
        
        <div className="mt-8 flex justify-center space-x-4">
          <Link 
            to="/" 
            className="px-6 py-3 border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors rounded"
          >
            Return to Home
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors rounded"
          >
            Reload
          </button>
        </div>
        
        <div className="mt-12 text-neutral-600 text-sm">
          Error: Requested resource is unavailable or has been removed.
        </div>
      </div>
    </div>
  );
};

export default NotFound;