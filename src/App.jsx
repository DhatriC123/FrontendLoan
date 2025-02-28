import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import FunnelList from './FunnelList';
import FilterPanel from './FilterPanel';

function App() {
  const [expandedFunnels, setExpandedFunnels] = useState({});
  const [applicationId, setApplicationId] = useState('');
  const [inputApplicationId, setInputApplicationId] = useState('');
  const [funnelData, setFunnelData] = useState([]);
  const [filteredFunnelData, setFilteredFunnelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filter states with added actorId
  const [filters, setFilters] = useState({
    taskId: '',
    status: '',
    updatedDate: '',
    actorId: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (applicationId) {
      fetchFunnelData();
    }
  }, [applicationId]);

  // Apply filters whenever filters or funnelData changes
  useEffect(() => {
    applyFilters();
  }, [filters, funnelData]);

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
          rawUpdatedAt: taskItem.updatedAt, // Keep the raw date for filtering
          order: taskItem.order || 0,
          actorId: taskItem.actorId || 'N/A'
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

  const applyFilters = () => {
    // Start with all funnel data
    let result = [...funnelData];
    
    // If we have any active filters
    if (filters.taskId || filters.status || filters.updatedDate || filters.actorId) {
      // Map through each funnel
      result = result.map(funnel => {
        // Filter the tasks based on criteria
        const filteredTasks = funnel.tasks.filter(task => {
          // Task ID filter
          if (filters.taskId && !task.id.toLowerCase().includes(filters.taskId.toLowerCase())) {
            return false;
          }
          
          // Status filter
          if (filters.status && task.status !== filters.status) {
            return false;
          }
          
          // Actor ID filter
          if (filters.actorId && !task.actorId.toString().toLowerCase().includes(filters.actorId.toLowerCase())) {
            return false;
          }
          
          // Updated date filter
          if (filters.updatedDate) {
            // Try to parse the date from both formatted and raw date
            let taskDate;
            try {
              // First try the raw date
              taskDate = new Date(task.rawUpdatedAt);
              if (isNaN(taskDate.getTime())) {
                // If that fails, try to parse from the formatted date
                const parts = task.updatedAt.split(/[/, :]/);
                if (parts.length >= 3) {
                  // Assuming DD/MM/YYYY format from en-GB locale
                  taskDate = new Date(parts[2], parts[1] - 1, parts[0]);
                }
              }
            } catch (e) {
              // If all parsing fails, skip date filtering for this task
              return false;
            }
            
            // Skip tasks with invalid dates
            if (!taskDate || isNaN(taskDate.getTime())) {
              return false;
            }
            
            const filterDate = new Date(filters.updatedDate);
            
            // Compare only the date part (ignoring time)
            if (taskDate.getFullYear() !== filterDate.getFullYear() ||
                taskDate.getMonth() !== filterDate.getMonth() ||
                taskDate.getDate() !== filterDate.getDate()) {
              return false;
            }
          }
          
          return true;
        });
        
        // Return a new funnel object with filtered tasks
        return {
          ...funnel,
          tasks: filteredTasks,
          // Update progress based on filtered tasks
          progress: `${filteredTasks.filter(t => t.status === 'COMPLETED').length}/${filteredTasks.length}`
        };
      });
      
      // Remove empty funnels (those with no tasks after filtering)
      result = result.filter(funnel => funnel.tasks.length > 0);
    }
    
    setFilteredFunnelData(result);
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

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      taskId: '',
      status: '',
      updatedDate: '',
      actorId: ''
    });
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        inputApplicationId={inputApplicationId}
        setInputApplicationId={setInputApplicationId}
        handleApplicationIdSubmit={handleApplicationIdSubmit}
        applicationId={applicationId}
        handleRefresh={handleRefresh}
        toggleFilters={toggleFilters}
        showFilters={showFilters}
      />

      <main className="max-w-3xl mx-auto px-4 py-4">
        {applicationId && (
          <div className="mb-3 px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md text-sm font-medium">
            Application ID: {applicationId}
          </div>
        )}
        
        {showFilters && applicationId && (
          <FilterPanel 
            filters={filters}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
          />
        )}
        
        <FunnelList 
          applicationId={applicationId}
          loading={loading}
          error={error}
          funnelData={filteredFunnelData.length > 0 || Object.values(filters).some(f => f !== '') ? filteredFunnelData : funnelData}
          expandedFunnels={expandedFunnels}
          toggleFunnel={toggleFunnel}
          handleRefresh={handleRefresh}
        />
      </main>
    </div>
  );
}

export default App;