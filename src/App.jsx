import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [applicationId, setApplicationId] = React.useState("");
  const [activityLogs, setActivityLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Sample data structure for activity logs
  const sampleLogs = [
    { id: 1, funnel: "Data Ingestion", startTime: "2023-01-01T10:00:00", endTime: "2023-01-01T10:15:00" },
    { id: 2, funnel: "Data Processing", startTime: "2023-01-01T10:15:00", endTime: "2023-01-01T10:45:00" },
    { id: 3, funnel: "Model Training", startTime: "2023-01-01T10:45:00", endTime: "2023-01-01T11:30:00" },
    { id: 4, funnel: "Evaluation", startTime: "2023-01-01T11:30:00", endTime: "2023-01-01T11:45:00" },
    { id: 5, funnel: "Deployment", startTime: "2023-01-01T11:45:00", endTime: "2023-01-01T12:00:00" },
    { id: 6, funnel: "Data Ingestion", startTime: "2023-01-01T13:00:00", endTime: "2023-01-01T13:10:00" },
    { id: 7, funnel: "Data Processing", startTime: "2023-01-01T13:10:00", endTime: "2023-01-01T13:35:00" },
    { id: 8, funnel: "Model Training", startTime: "2023-01-01T13:35:00", endTime: "2023-01-01T14:20:00" },
  ];

  // Function to fetch activity logs based on application ID
  const fetchActivityLogs = (id) => {
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real application, this would be an API call
      if (id.trim() === "") {
        setError("Please enter a valid Application ID");
        setActivityLogs([]);
      } else {
        setActivityLogs(sampleLogs);
      }
      setLoading(false);
    }, 1000);
  };

  // Calculate task duration in minutes
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return (end - start) / (1000 * 60); // Convert milliseconds to minutes
  };

  // Get unique funnel names for x-axis
  const funnelNames = [...new Set(activityLogs.map(log => log.funnel))];

  // Get min and max timestamps for y-axis scale
  const timestamps = activityLogs.flatMap(log => [new Date(log.startTime), new Date(log.endTime)]);
  const minTime = timestamps.length > 0 ? new Date(Math.min(...timestamps)) : new Date();
  const maxTime = timestamps.length > 0 ? new Date(Math.max(...timestamps)) : new Date();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchActivityLogs(applicationId);
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Activity Log Visualization</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
            placeholder="Enter Application ID"
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Visualize"}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : activityLogs.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Activity Timeline for Application ID: {applicationId}</h2>
          
          <div className="relative" style={{ height: "500px" }}>
            {/* X-axis (Funnel Names) */}
            <div className="absolute bottom-0 left-16 right-0 flex justify-between">
              {funnelNames.map((funnel, index) => (
                <div 
                  key={index} 
                  className="text-sm text-gray-600 transform -rotate-45 origin-top-left"
                  style={{ 
                    left: `${(index / (funnelNames.length - 1)) * 100}%`,
                    position: 'absolute',
                    bottom: '-40px'
                  }}
                >
                  {funnel}
                </div>
              ))}
            </div>
            
            {/* Y-axis (Timestamps) */}
            <div className="absolute top-0 bottom-0 left-0 w-16 flex flex-col justify-between">
              {Array.from({ length: 6 }).map((_, index) => {
                const timeOffset = (maxTime - minTime) * (index / 5);
                const timePoint = new Date(maxTime - timeOffset);
                return (
                  <div key={index} className="text-xs text-gray-600 flex items-center justify-end pr-2">
                    {formatTime(timePoint)}
                  </div>
                );
              })}
            </div>
            
            {/* Graph area */}
            <div className="absolute top-0 bottom-0 left-16 right-0 border-l border-b border-gray-300">
              {activityLogs.map((log, index) => {
                const startDate = new Date(log.startTime);
                const endDate = new Date(log.endTime);
                const duration = calculateDuration(log.startTime, log.endTime);
                
                // Calculate position
                const funnelIndex = funnelNames.indexOf(log.funnel);
                const xPosition = `${(funnelIndex / (funnelNames.length - 1)) * 100}%`;
                
                const timeRange = maxTime - minTime;
                const yStart = ((maxTime - startDate) / timeRange) * 100;
                const yEnd = ((maxTime - endDate) / timeRange) * 100;
                const height = yStart - yEnd;
                
                return (
                  <div 
                    key={index}
                    className="absolute bg-blue-500 rounded opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
                    style={{
                      left: `calc(${xPosition} - 15px)`,
                      top: `${yEnd}%`,
                      height: `${height}%`,
                      width: '30px',
                    }}
                    title={`${log.funnel}: ${formatTime(log.startTime)} - ${formatTime(log.endTime)} (${duration.toFixed(1)} min)`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
                      {duration > 10 ? `${duration.toFixed(0)}m` : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-16 pt-4 border-t border-gray-200">
            <h3 className="text-md font-semibold mb-2">Legend</h3>
            <div className="flex flex-wrap gap-4">
              {funnelNames.map((funnel, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm">{funnel}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : applicationId ? (
        <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
          No activity logs found for the given Application ID.
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
          Enter an Application ID to visualize activity logs.
        </div>
      )}
    </div>
  );
}