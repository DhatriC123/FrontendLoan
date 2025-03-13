// TaskGroup.jsx
import React from 'react';
import StatusTimeline from './StatusTimeline';
import { getStatusColor } from '../../utils/formatters';

function TaskGroup({ task, isExpanded, onToggle }) {
  const formattedCreatedAt = new Date(task.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // Format duration based on seconds
  const formatDuration = (seconds) => {
    if (seconds === undefined || seconds === null) return 'N/A';
    
    if (seconds === 0) return '0 sec';
    
    if (seconds < 60) {
      return `${seconds} sec`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return remainingSeconds > 0 
        ? `${minutes} min ${remainingSeconds} sec` 
        : `${minutes} min`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return minutes > 0 
        ? `${hours} hr ${minutes} min` 
        : `${hours} hr`;
    }
  };

  return (
    <div className="bg-white rounded-md overflow-hidden">
      <div 
        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 rounded-md"
        onClick={onToggle}
      >
        {/* Left side - Task name, creation date and expand icon */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className={`text-gray-500 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
            <h4 className="font-medium text-gray-800">{task.name || task.taskId}</h4>
            <div className="flex items-center space-x-3 ml-2">
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                Duration: {formatDuration(task.duration)}
              </span>
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                Sendbacks: {task.sendbacks !== undefined ? task.sendbacks : 'N/A'}
              </span>
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-500 ml-6">
            Created: {formattedCreatedAt}
          </div>
        </div>
      
        {/* Right side - Status and handler */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">Handled by: {task.handledBy}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(task.currentStatus)}`}>
            {task.currentStatus}
          </span>
        </div>
      </div>
    
      {/* Status Timeline */}
      {isExpanded && (
        <div className="px-4 py-3 mt-2 bg-gray-50 rounded-md">
          <StatusTimeline statusHistory={task.statusHistory} />
        </div>
      )}
    </div>
  );
}

export default TaskGroup;