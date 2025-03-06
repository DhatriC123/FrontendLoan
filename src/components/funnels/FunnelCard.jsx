import React, { useState } from 'react';
import TaskGroup from './TaskGroup';

function FunnelCard({ funnel, isExpanded, onToggle }) {
  const [expandedTasks, setExpandedTasks] = useState({});
  
  const toggleTask = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border-2 border-indigo-100">
      {/* Funnel Header - Make it more prominent */}
      <div 
        className="px-5 py-4 bg-indigo-50 flex items-center justify-between cursor-pointer hover:bg-indigo-100 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <span className={`text-indigo-600 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
          <h3 className="font-semibold text-lg text-indigo-900">{funnel.name}</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-indigo-700">{funnel.progress}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            funnel.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {funnel.status === 'completed' ? 'Completed' : 'In Progress'}
          </span>
        </div>
      </div>
      
      {/* Task Groups - Add indentation and styling to create hierarchy */}
      {isExpanded && (
        <div className="divide-y divide-gray-100 pl-4 pr-2 py-2 bg-white">
          {funnel.tasks.map(task => (
            <div key={task.id} className="ml-6 my-2 border-l-2 border-gray-200 pl-3">
              <TaskGroup 
                task={task}
                isExpanded={expandedTasks[task.id]}
                onToggle={() => toggleTask(task.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FunnelCard;