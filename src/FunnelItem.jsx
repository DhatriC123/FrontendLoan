import React from 'react';
import { User, ChevronUp, ChevronDown } from 'lucide-react';
import TaskItem from './TaskItem';

function FunnelItem({ funnel, isExpanded, toggleFunnel }) {
  const getFunnelStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'border-l-4 border-green-500';
      case 'active': return 'border-l-4 border-blue-500';
      case 'pending': return 'border-l-4 border-gray-300';
      default: return '';
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div 
        className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${getFunnelStatusClass(funnel.status)}`}
        onClick={() => toggleFunnel(funnel.id)}
      >
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{funnel.name}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <span>Progress: {funnel.progress}</span>
              {funnel.status === 'active' && (
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ACTIVE
                </span>
              )}
            </div>
          </div>
        </div>
        <button className="text-indigo-600 hover:text-indigo-900">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100">
          <ul className="divide-y divide-gray-100">
            {funnel.tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FunnelItem;