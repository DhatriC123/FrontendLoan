import React from 'react';
import { getStatusDotColor } from '../../utils/formatters';
import { formatDuration } from '../../utils/dateUtils';

function StatusTimeline({ statusHistory }) {
  // Calculate time differences between status changes
  const timelineDurations = statusHistory.map((status, index) => {
    if (index === statusHistory.length - 1) {
      return null; // No duration for the last item
    }
    
    const currentTime = new Date(status.updatedAt).getTime();
    const nextTime = new Date(statusHistory[index + 1].updatedAt).getTime();
    const durationMs = nextTime - currentTime;
    
    return formatDuration(durationMs);
  });
  
  // Determine how many items per row (adjust as needed)
  const itemsPerRow = 3;
  
  // Group status history into rows
  const rows = [];
  for (let i = 0; i < statusHistory.length; i += itemsPerRow) {
    rows.push(statusHistory.slice(i, i + itemsPerRow));
  }
  
  return (
    <div className="relative">
      {rows.map((row, rowIndex) => {
        // Alternate direction for each row (left-to-right, right-to-left)
        const isRightToLeft = rowIndex % 2 === 1;
        const sortedRow = isRightToLeft ? [...row].reverse() : row;
        const isLastRow = rowIndex === rows.length - 1;
        
        return (
          <div key={rowIndex} className="relative mb-8">
            {/* Horizontal line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
            
            {/* Status items */}
            <div className={`flex ${isRightToLeft ? 'flex-row-reverse' : 'flex-row'} justify-between relative`}>
              {sortedRow.map((status, index) => {
                const originalIndex = isRightToLeft 
                  ? rowIndex * itemsPerRow + (row.length - 1 - index)
                  : rowIndex * itemsPerRow + index;
                
                const formattedTime = new Date(status.updatedAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                });
                
                return (
                  <div key={originalIndex} className="flex flex-col items-center px-2" style={{ width: `${100 / itemsPerRow}%` }}>
                    {/* Status dot */}
                    <div className={`z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                      getStatusDotColor(status.status)
                    }`}>
                      <div className="w-5 h-5 rounded-full bg-white"></div>
                    </div>
                    
                    {/* Status content */}
                    <div className="mt-2 text-center">
                      <div className="font-medium text-gray-900">{status.status}</div>
                      <div className="text-sm text-gray-500">{formattedTime}</div>
                      
                      {/* Duration to next status */}
                      {timelineDurations[originalIndex] && (
                        <div className="mt-1 text-xs text-gray-400 italic">
                          {timelineDurations[originalIndex]}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Connecting curve to next row if not the last row */}
            {rowIndex < rows.length - 1 && (
              <div className="absolute -bottom-8 w-8 h-8 border-b-2 border-r-2 border-gray-200 rounded-br-xl" 
                   style={{ 
                     [isRightToLeft ? 'left' : 'right']: '-4px',
                     transform: 'translateY(-4px)'
                   }}>
              </div>
            )}
            
            {/* Arrow at the end of the timeline for the last row */}
            {isLastRow && (
              <div className="absolute" style={{ 
                [isRightToLeft ? 'left' : 'right']: '-12px', 
                top: '20px'
              }}>
                <div className="relative">
                  <div className="w-8 h-0.5 bg-gray-200"></div>
                  <div className="absolute top-0 right-0 w-0 h-0 
                                border-t-[5px] border-t-transparent 
                                border-l-[8px] border-l-gray-200 
                                border-b-[5px] border-b-transparent"
                       style={{ transform: 'translateY(-4.5px)' }}>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StatusTimeline;