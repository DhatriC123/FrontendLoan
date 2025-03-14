import React, { useState } from 'react';
import StatusTimeline from './StatusTimeline';
import { getStatusColor, formatDuration, getStatusDotColor } from '../../utils/formatters';


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
            className={`flex flex-col sm:flex-row sm:justify-between ${!isSendback ? 'cursor-pointer' : ''}`}
            onClick={() => toggleTaskTimeline(task?.id || index)}
          >
            <div className="mb-2 sm:mb-0">
              <div className="font-medium">{task?.name || 'Unknown Task'}</div>
              <div className="text-sm text-gray-500">ID: {task?.id || 'N/A'}</div>
            </div>
            <div className="flex flex-col sm:items-end">
              <div className="text-sm">
                <span className="font-medium">Status:</span>{' '}
                <span className={getStatusColor(task?.currentStatus || 'UNKNOWN')}>
                  {task?.currentStatus || 'UNKNOWN'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Handled by:</span> {task?.handledBy || 'N/A'}
              </div>
              {(task?.duration !== undefined || task?.sendbacks !== undefined) && (
                <div className="text-sm text-gray-500">
                  {task?.duration !== undefined && (
                    <span className="mr-3">
                      <span className="font-medium">Duration:</span> {formatDuration(task.duration)}
                    </span>
                  )}
                  {task?.sendbacks !== undefined && (
                    <span>
                      <span className="font-medium">Sendbacks:</span> {task.sendbacks}
                    </span>
                  )}
                </div>
              )}
              {!isSendback && (
                <div className="text-xs text-blue-600 mt-1">
                  {expandedTasks[task?.id || index] ? 'Hide Timeline' : 'Show Timeline'}
                </div>
              )}
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