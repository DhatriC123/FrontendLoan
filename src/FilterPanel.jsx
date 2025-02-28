import React from 'react';
import { X } from 'lucide-react';

function FilterPanel({ filters, handleFilterChange, clearFilters }) {
  // Get unique statuses for the dropdown
  const statuses = ['COMPLETED', 'TODO', 'NEW', 'WARNING', 'FAILED', 'SKIPPED'];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-900">Filter Tasks</h3>
        <button 
          onClick={clearFilters}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
        >
          <X className="h-3 w-3 mr-1" />
          Clear Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="taskId" className="block text-xs font-medium text-gray-700 mb-1">
            Task ID
          </label>
          <input
            type="text"
            id="taskId"
            value={filters.taskId}
            onChange={(e) => handleFilterChange('taskId', e.target.value)}
            placeholder="Filter by task ID"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="actorId" className="block text-xs font-medium text-gray-700 mb-1">
            Actor ID
          </label>
          <input
            type="text"
            id="actorId"
            value={filters.actorId}
            onChange={(e) => handleFilterChange('actorId', e.target.value)}
            placeholder="Filter by actor ID"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="updatedDate" className="block text-xs font-medium text-gray-700 mb-1">
            Updated Date
          </label>
          <input
            type="date"
            id="updatedDate"
            value={filters.updatedDate}
            onChange={(e) => handleFilterChange('updatedDate', e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;