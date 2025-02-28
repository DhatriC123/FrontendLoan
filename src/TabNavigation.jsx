import React from 'react';
import { List, PieChart } from 'lucide-react';

function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-2 mb-4">
      <button 
        onClick={() => setActiveTab('list')}
        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
          activeTab === 'list' 
            ? 'bg-indigo-100 text-indigo-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <List className="w-4 h-4 mr-1.5" />
        List View
      </button>
      <button 
        onClick={() => setActiveTab('dashboard')}
        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
          activeTab === 'dashboard' 
            ? 'bg-indigo-100 text-indigo-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <PieChart className="w-4 h-4 mr-1.5" />
        Analytics
      </button>
    </div>
  );
}

export default TabNavigation;