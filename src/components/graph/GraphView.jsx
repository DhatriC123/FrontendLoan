import React, { useEffect, useState } from 'react';
import GanttChart from './GanttChart';

import { fetchTasksByApplicationId } from '../../services/api/dashboardapi';

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
    
        <>
          {taskData && !loading && (
            <GanttChart data={taskData} />
          )}  
        </>
        
      
  );
}

export default Dashboard;