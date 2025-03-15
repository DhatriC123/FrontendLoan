import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { statusColors } from '../../utils/Ganntutils';

const TaskTooltip = ({ hoveredTask, tooltipPosition, onClose }) => {
  const [isPinned, setIsPinned] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!tooltipPosition || !hoveredTask) return;

    const updatePosition = () => {
      if (tooltipRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newX = tooltipPosition.x + 10;
        let newY = tooltipPosition.y + 10;

        if (newX + tooltipRect.width > viewportWidth) {
          newX = Math.max(10, tooltipPosition.x - tooltipRect.width - 10);
        }

        if (newY + tooltipRect.height > viewportHeight) {
          newY = Math.max(10, tooltipPosition.y - tooltipRect.height - 10);
        }

        setAdjustedPosition({ x: newX, y: newY });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [tooltipPosition, hoveredTask]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target) && isPinned) {
        onClose(); // Call the onClose function passed from the parent
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isPinned, onClose]);

  const handleTooltipClick = (e) => {
    e.stopPropagation();
    setIsPinned(true); // Pin the tooltip when clicked
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose(); // Call the onClose function passed from the parent
  };

  if (!hoveredTask) return null;

  const segment = hoveredTask.currentSegment;
  if (!segment) return null;

  const formattedStatuses = hoveredTask.statuses.map((status) => ({
    ...status,
    formattedTime: format(status.time, 'HH:mm:ss'),
  }));

  return (
    <div
      ref={tooltipRef}
      className={`fixed z-50 bg-white p-4 rounded-lg shadow-xl border border-gray-200 text-sm ${isPinned ? 'cursor-default' : 'cursor-pointer'}`}
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
        maxWidth: '80vw',
        minWidth: '300px',
        overflow: 'auto',
      }}
      onClick={handleTooltipClick} // Pin on click
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg">{hoveredTask.id}</h4>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleCloseClick} // Unpin on close button click
        >
          &times; {/* Close icon */}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p>
            <span className="font-semibold">Funnel:</span>
            <span className="ml-1 inline-flex items-center">
              <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: hoveredTask.funnelColor }}></span>
              {hoveredTask.funnel}
            </span>
          </p>
          <p>
            <span className="font-semibold">Current Status:</span>
            <span className="ml-1 inline-flex items-center">
              <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: statusColors[segment.status] || '#6B7280' }}></span>
              {segment.status}
            </span>
          </p>
          <p><span className="font-semibold">Actor ID:</span> {hoveredTask.actorId || 'None'}</p>
        </div>
        <div>
          <p><span className="font-semibold">Start:</span> {format(segment.startTime, 'HH:mm:ss')}</p>
          <p><span className="font-semibold">End:</span> {format(segment.endTime, 'HH:mm:ss')}</p>
          <p><span className="font-semibold">Duration:</span> {((segment.endTime - segment.startTime) / 1000).toFixed(2)}s</p>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mt-4">
        <p className="font-semibold mb-2">Status Timeline:</p>

        <div className="relative mt-2 mb-2 h-28">
          <div className="absolute left-0 right-0 h-0.5 bg-gray-300" style={{ top: '20px' }}></div>

          {formattedStatuses.map((status, idx) => {
            const denominator = formattedStatuses[formattedStatuses.length - 1].time - formattedStatuses[0].time;
            const position = denominator === 0 ? 50 : ((status.time - formattedStatuses[0].time) / denominator * 100);
            const nextStatus = formattedStatuses[idx + 1];

            return (
              <React.Fragment key={idx}>
                <div
                  className="absolute"
                  style={{
                    left: `${position}%`,
                    top: '20px',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: status.color }}
                    title={`${status.status} at ${status.formattedTime}`}
                  ></div>
                </div>

                <div
                  className="absolute text-xs font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    left: `${position}%`,
                    top: '0px',
                    transform: 'translateX(-50%)',
                    width: '60px',
                  }}
                >
                  {status.status}
                </div>

                <div
                  className="absolute text-xs text-gray-500 text-center"
                  style={{
                    left: `${position}%`,
                    top: '35px',
                    transform: 'translateX(-50%)',
                    width: '60px',
                  }}
                >
                  {status.formattedTime}
                </div>

                {nextStatus && denominator !== 0 && (
                  <div
                    className="absolute h-0.5 bg-gray-400"
                    style={{
                      left: `${position}%`,
                      top: '20px',
                      width: `${((nextStatus.time - status.time) / denominator * 100)}%`,
                    }}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center italic">
        {isPinned ? 'Click to unpin this tooltip' : 'Click to pin this tooltip'}
      </div>
    </div>
  );
};

export default TaskTooltip;