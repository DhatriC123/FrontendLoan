import React, { useEffect, useState } from 'react';
import GanttChart from './components/GanttChart';
import { fetchTasksByApplicationId } from './services/api';

function Dashboard({ applicationId }) {  // Destructure the props object
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTasksByApplicationId(applicationId);
        setTaskData(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch task data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [applicationId]);  // Add applicationId to dependency array

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Task Workflow Dashboard</h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p>{error}</p>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {taskData && !loading && (
          <GanttChart data={taskData} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;