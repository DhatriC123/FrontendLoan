import React, { useState } from 'react';
import StatusTimeline from './StatusTimeline';
import { getStatusDotColor,getStatusColor,formatDuration } from '../../utils/formatters';

function TaskGroup({ tasks, isSendback }) {
  // State to track which tasks have expanded timelines
  const [expandedTasks, setExpandedTasks] = useState({});

  // Toggle timeline visibility for a task
  const toggleTaskTimeline = (taskId) => {
    if (isSendback) return; // Don't toggle for sendback tasks
    
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Sort tasks by createdAt date if available
  const sortedTasks = [...tasks].sort((a, b) => {
    // Check if both tasks have createdAt property
    if (a?.createdAt && b?.createdAt) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    // If only one has createdAt, prioritize the one without
    if (a?.createdAt) return 1;
    if (b?.createdAt) return -1;
    // If neither has createdAt, maintain original order
    return 0;
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map((task, index) => (
        <div key={task?.id || index} className="bg-gray-50 p-3 rounded-md">
          <div 
            className={`flex justify-between items-center ${!isSendback ? 'cursor-pointer' : ''}`}
            onClick={() => toggleTaskTimeline(task?.id || index)}
          >
            <div className="flex-1">
              <div className="font-medium">{task?.name || 'Unknown Task'}</div>
              <div className="text-sm text-gray-500">ID: {task?.id || 'N/A'}</div>
            </div>
            
            <div className="flex-1 flex justify-end">
              <div className="text-right">
                <div className="text-sm mb-1">
                  <span className="font-medium">Status: </span>
                  <span className={getStatusColor(task?.currentStatus || 'UNKNOWN')}>
                    {task?.currentStatus || 'UNKNOWN'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Handled by: </span>{task?.handledBy || 'N/A'}
                </div>
                <div className="text-sm text-gray-500 flex justify-end mb-1">
                  {task?.duration !== undefined && (
                    <span className="mr-4">
                      <span className="font-medium">Duration: </span>{formatDuration(task.duration)}
                    </span>
                  )}
                  {task?.sendbacks !== undefined && (
                    <span>
                      <span className="font-medium">Sendbacks: </span>{task.sendbacks}
                    </span>
                  )}
                </div>
                
                {!isSendback && (
                  <div className="text-xs text-blue-600 flex items-center justify-end mt-1">
                    {expandedTasks[task?.id || index] ? 'Hide Timeline' : 'Show Timeline'}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ml-1 transition-transform ${expandedTasks[task?.id || index] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Status Timeline - only for non-sendback tasks */}
          {!isSendback && expandedTasks[task?.id || index] && task?.statusHistory && task.statusHistory.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-3">
              <StatusTimeline statusHistory={task.statusHistory} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}




export default TaskGroup;