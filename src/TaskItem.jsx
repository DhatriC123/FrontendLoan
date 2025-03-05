import React from 'react';
import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

function TaskItem({ task }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'NEW':
      case 'TODO': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'WARNING': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'FAILED': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'SKIPPED': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'NEW':
      case 'TODO': return 'bg-blue-100 text-blue-800';
      case 'WARNING': return 'bg-amber-100 text-amber-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      case 'SKIPPED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <li className="px-4 py-2">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5 mr-3">
          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
            {getStatusIcon(task.status)}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              {task.name}
            </p>
            <span className={`ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(task.status)}`}>
              {task.status}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5 grid grid-cols-1 md:grid-cols-2 gap-x-2">
            <p>Task ID: {task.id}</p>
            <p>Actor ID: {task.actorId}</p>
            <p>Updated: {task.updatedAt}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;