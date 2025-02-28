import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import FunnelList from './FunnelList';

function App() {
  const [expandedFunnels, setExpandedFunnels] = useState({});
  const [applicationId, setApplicationId] = useState('');
  const [inputApplicationId, setInputApplicationId] = useState('');
  const [funnelData, setFunnelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (applicationId) {
      fetchFunnelData();
    }
  }, [applicationId]);

  const fetchFunnelData = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:8081/activity/${applicationId}`;
      const response = await axios.get(url);
      const transformedData = transformApiData(response.data);
      
      setFunnelData(transformedData);
      
      // Initialize expanded state for all funnels
      const initialExpandedState = Object.fromEntries(
        transformedData.map(funnel => [funnel.id, false]) // Default collapsed
      );
      setExpandedFunnels(initialExpandedState);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching funnel data:', err);
      setError('Failed to load activity data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const transformApiData = (apiData) => {
    const dataArray = Array.isArray(apiData) ? apiData : [apiData];
    
    if (dataArray.length === 0) {
      return [];
    }
    
    // First, determine the minimum order of tasks in each funnel to use for funnel ordering
    const funnelMinOrders = {};
    
    dataArray.forEach(item => {
      const funnelName = item.funnel || 'Unknown';
      const tasks = Array.isArray(item.tasks) ? item.tasks : [];
      
      if (tasks.length > 0) {
        // Find the minimum order value among tasks
        const minTaskOrder = Math.min(...tasks.map(taskItem => taskItem.order || Number.MAX_SAFE_INTEGER));
        
        // If this funnel doesn't have a min order yet, or this is lower, update it
        if (!(funnelName in funnelMinOrders) || minTaskOrder < funnelMinOrders[funnelName]) {
          funnelMinOrders[funnelName] = minTaskOrder;
        }
      } else {
        // If no tasks, assign a high number
        if (!(funnelName in funnelMinOrders)) {
          funnelMinOrders[funnelName] = Number.MAX_SAFE_INTEGER;
        }
      }
    });
    
    // Transform the data with the funnel order information
    const transformedFunnels = dataArray.map((item, index) => {
      const funnelName = item.funnel || 'Unknown';
      const funnelId = `funnel-${index}-${funnelName.toLowerCase()}`;
      const tasks = Array.isArray(item.tasks) ? item.tasks : [];
      
      const completedTasks = tasks.filter(taskItem => taskItem.status === 'COMPLETED').length;
      const totalTasks = tasks.length;
      
      let funnelStatus = 'pending';
      if (completedTasks === totalTasks && totalTasks > 0) {
        funnelStatus = 'completed';
      } else if (completedTasks > 0) {
        funnelStatus = 'active';
      }
      
      // Sort tasks by their order property
      const sortedTasks = [...tasks].sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
      });
      
      const transformedTasks = sortedTasks.map(taskItem => {
        let formattedUpdatedAt = 'N/A';
        try {
          const updatedDate = new Date(taskItem.updatedAt);
          formattedUpdatedAt = updatedDate.toLocaleString('en-GB');
        } catch (e) {
          console.warn('Invalid date format:', taskItem.updatedAt);
        }
        
        return {
          id: taskItem.taskId || `task-${Math.random().toString(36).substr(2, 9)}`,
          name: formatTaskName(taskItem.taskId || 'unknown-task'),
          status: taskItem.status,
          updatedAt: formattedUpdatedAt,
          order: taskItem.order || 0,
          actorId: taskItem.actorId || 'N/A' // Add actorId here
        };
      });
      
      return {
        id: funnelId,
        name: `${funnelName} Funnel`,
        status: funnelStatus,
        progress: `${completedTasks}/${totalTasks}`,
        tasks: transformedTasks,
        // Use the minimum task order as the funnel order
        order: funnelMinOrders[funnelName] || index
      };
    });
    
    // Sort funnels by their determined order
    return transformedFunnels.sort((a, b) => a.order - b.order);
  };

  const formatTaskName = (taskId) => {
    if (!taskId) return 'Unknown Task';
    
    return taskId
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const toggleFunnel = (funnelId) => {
    setExpandedFunnels(prev => ({
      ...prev,
      [funnelId]: !prev[funnelId]
    }));
  };

  const handleApplicationIdSubmit = (e) => {
    e.preventDefault();
    if (inputApplicationId.trim()) {
      setApplicationId(inputApplicationId);
    }
  };

  const handleRefresh = () => {
    if (applicationId) {
      fetchFunnelData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        inputApplicationId={inputApplicationId}
        setInputApplicationId={setInputApplicationId}
        handleApplicationIdSubmit={handleApplicationIdSubmit}
        applicationId={applicationId}
        handleRefresh={handleRefresh}
      />

      <main className="max-w-3xl mx-auto px-4 py-4">
        {applicationId && (
          <div className="mb-3 px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md text-sm font-medium">
            Application ID: {applicationId}
          </div>
        )}
        
        <FunnelList 
          applicationId={applicationId}
          loading={loading}
          error={error}
          funnelData={funnelData}
          expandedFunnels={expandedFunnels}
          toggleFunnel={toggleFunnel}
          handleRefresh={handleRefresh}
        />
      </main>
    </div>
  );
}

export default App;