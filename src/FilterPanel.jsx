import React from 'react';
import { X } from 'lucide-react';

function FilterPanel({ filters, handleFilterChange, clearFilters }) {
  // Get unique statuses for the dropdown - include all possible statuses
  const statuses = [
    'COMPLETED', 
    'IN_PROGRESS', 
    'NEW', 
    'TODO', 
    'WARNING', 
    'FAILED', 
    'SKIPPED'
  ];
  
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
      
      {/* Advanced filters section - can be expanded if needed */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <details className="text-xs">
          <summary className="text-gray-700 font-medium cursor-pointer">Advanced Filters</summary>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="funnelType" className="block text-xs font-medium text-gray-700 mb-1">
                Funnel Type
              </label>
              <select
                id="funnelType"
                value={filters.funnelType || ''}
                onChange={(e) => handleFilterChange('funnelType', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Funnels</option>
                <option value="CREDIT">Credit</option>
                <option value="SOURCING">Sourcing</option>
                <option value="UNKNOWN">Unknown</option>
                {/* Add other funnel types as needed */}
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-xs font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                id="dateRange"
                value={filters.dateRange || ''}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            {filters.dateRange === 'custom' && (
              <>
                <div>
                  <label htmlFor="startDate" className="block text-xs font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={filters.startDate || ''}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-xs font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={filters.endDate || ''}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="sortBy" className="block text-xs font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sortBy"
                value={filters.sortBy || 'updatedAt'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="updatedAt">Updated Date</option>
                <option value="taskId">Task ID</option>
                <option value="status">Status</option>
                <option value="actorId">Actor ID</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sortOrder" className="block text-xs font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <select
  id="sortOrder"
  value={filters.sortOrder || 'asc'}
  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
>
  <option value="asc">Oldest First</option>
  <option value="desc">Newest First</option>
</select>
            </div>
          </div>
        </details>
      </div>
      
      {/* Filter tags/chips to show active filters */}
      <div className="mt-3 flex flex-wrap gap-2">
        {filters.taskId && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
            Task ID: {filters.taskId}
            <button 
              onClick={() => handleFilterChange('taskId', '')}
              className="ml-1 text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        
        {filters.actorId && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
            Actor ID: {filters.actorId}
            <button 
              onClick={() => handleFilterChange('actorId', '')}
              className="ml-1 text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        
        {filters.status && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
            Status: {filters.status}
            <button 
              onClick={() => handleFilterChange('status', '')}
              className="ml-1 text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        
        {filters.updatedDate && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
            Date: {new Date(filters.updatedDate).toLocaleDateString()}
            <button 
              onClick={() => handleFilterChange('updatedDate', '')}
              className="ml-1 text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        
        {filters.funnelType && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
            Funnel: {filters.funnelType}
            <button 
              onClick={() => handleFilterChange('funnelType', '')}
              className="ml-1 text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterPanel;