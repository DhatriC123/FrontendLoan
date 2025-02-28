import React from 'react';
import { RefreshCw } from 'lucide-react';

function Header({ 
  inputApplicationId, 
  setInputApplicationId, 
  handleApplicationIdSubmit, 
  applicationId, 
  handleRefresh 
}) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 py-2">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">Activity Log</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <input
                type="text"
                value={inputApplicationId}
                onChange={(e) => setInputApplicationId(e.target.value)}
                placeholder="Application ID"
                className="px-3 py-1 border border-gray-300 rounded-l-md text-sm focus:ring-indigo-500 focus:border-indigo-500 w-40"
              />
              <button 
                onClick={handleApplicationIdSubmit}
                className="px-3 py-1 bg-indigo-600 text-white rounded-r-md text-sm shadow-sm hover:bg-indigo-700"
              >
                Search
              </button>
            </div>
            {applicationId && (
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={handleRefresh}
              >
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;