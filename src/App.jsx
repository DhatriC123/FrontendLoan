import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import FunnelList from './FunnelList';
import FilterPanel from './FilterPanel';
import Dashboard from './Dashboard';
import TabNavigation from './TabNavigation';

function App() {
  const [expandedFunnels, setExpandedFunnels] = useState({});
  const [applicationId, setApplicationId] = useState('');
  const [inputApplicationId, setInputApplicationId] = useState('');
  const [funnelData, setFunnelData] = useState([]);
  const [filteredFunnelData, setFilteredFunnelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'dashboard'
  
  // Comprehensive filter states with default sort order as 'asc' (oldest first)
  const [filters, setFilters] = useState({
    taskId: '',
    status: '',
    updatedDate: '',
    actorId: '',
    funnelType: '',
    dateRange: '',
    startDate: '',
    endDate: '',
    sortBy: 'updatedAt',
    sortOrder: 'asc' // Default to ascending (oldest first) to match backend order
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
      const url = `http://localhost:8080/applicationLog/${applicationId}`;
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
    // Create an array of funnels from all categories in the response object
    // Use Object.entries to preserve the order of keys from the response
    const funnels = Object.entries(apiData).map(([categoryName, tasks]) => {
      // Use the tasks array directly without reordering
      const taskArray = tasks || [];
      
      const completedTasks = taskArray.filter(taskItem => taskItem.status === 'COMPLETED').length;
      const totalTasks = taskArray.length;
      
      let funnelStatus = 'pending';
      if (completedTasks === totalTasks && totalTasks > 0) {
        funnelStatus = 'completed';
      } else if (completedTasks > 0) {
        funnelStatus = 'active';
      }
      
      // Transform tasks while preserving their original order
      const transformedTasks = taskArray.map(taskItem => {
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
          actorId: taskItem.actorId || 'N/A'
        };
      });
      
      return {
        id: `funnel-${categoryName.toLowerCase()}`,
        name: `${categoryName} Funnel`,
        status: funnelStatus,
        progress: `${completedTasks}/${totalTasks}`,
        tasks: transformedTasks, // Preserve original order
        originalCategory: categoryName // Store original category name for filtering
      };
    });
    
    // Return funnels in the original order from the API response
    return funnels;
  };

  const applyFilters = () => {
    // Start with all funnel data - preserve original order
    let result = [...funnelData];
    
    // Filter by funnel type if specified
    if (filters.funnelType) {
      result = result.filter(funnel => 
        funnel.originalCategory === filters.funnelType || 
        funnel.name.toUpperCase().includes(filters.funnelType)
      );
    }
    
    // Apply date range filters if specified
    if (filters.dateRange) {
      const now = new Date();
      let startDate;
      
      switch (filters.dateRange) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'yesterday':
          startDate = new Date(now);
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'last7days':
          startDate = new Date(now);
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'last30days':
          startDate = new Date(now);
          startDate.setDate(startDate.getDate() - 30);
          break;
        case 'custom':
          if (filters.startDate) {
            startDate = new Date(filters.startDate);
          }
          break;
        default:
          startDate = null;
      }
      
      let endDate = null;
      if (filters.dateRange === 'custom' && filters.endDate) {
        endDate = new Date(filters.endDate);
        // Set to end of day
        endDate.setHours(23, 59, 59, 999);
      }
      
      // Apply date range filter to tasks
      if (startDate || endDate) {
        result = result.map(funnel => {
          const filteredTasks = funnel.tasks.filter(task => {
            const taskDate = new Date(task.rawUpdatedAt);
            
            if (startDate && taskDate < startDate) {
              return false;
            }
            
            if (endDate && taskDate > endDate) {
              return false;
            }
            
            return true;
          });
          
          return {
            ...funnel,
            tasks: filteredTasks,
            progress: `${filteredTasks.filter(t => t.status === 'COMPLETED').length}/${filteredTasks.length}`
          };
        });
      }
    }
    
    // If we have any basic active filters
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
        
        // Return a new funnel object with filtered tasks (maintaining original order)
        return {
          ...funnel,
          tasks: filteredTasks,
          // Update progress based on filtered tasks
          progress: `${filteredTasks.filter(t => t.status === 'COMPLETED').length}/${filteredTasks.length}`
        };
      });
    }
    
    // Only apply sorting if the user has explicitly changed the sort settings from default
    // or if they've explicitly set a sort order
    if (filters.sortBy !== 'updatedAt' || (filters.sortOrder !== 'asc' && filters.sortOrder !== '')) {
      result = result.map(funnel => {
        const sortedTasks = [...funnel.tasks].sort((a, b) => {
          let valueA, valueB;
          
          // Get the values to compare based on the sort field
          switch (filters.sortBy) {
            case 'updatedAt':
              valueA = new Date(a.rawUpdatedAt).getTime();
              valueB = new Date(b.rawUpdatedAt).getTime();
              break;
            case 'taskId':
              valueA = a.id.toLowerCase();
              valueB = b.id.toLowerCase();
              break;
            case 'status':
              valueA = a.status;
              valueB = b.status;
              break;
            case 'actorId':
              valueA = a.actorId;
              valueB = b.actorId;
              break;
            default:
              valueA = a.id;
              valueB = b.id;
          }
          
          // Apply the sort order
          if (filters.sortOrder === 'asc') {
            return valueA > valueB ? 1 : -1;
          } else {
            return valueA < valueB ? 1 : -1;
          }
        });
        
        return {
          ...funnel,
          tasks: sortedTasks
        };
      });
    }
    
    // Remove empty funnels (those with no tasks after filtering)
    result = result.filter(funnel => funnel.tasks.length > 0);
    
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
      actorId: '',
      funnelType: '',
      dateRange: '',
      startDate: '',
      endDate: '',
      sortBy: 'updatedAt',
      sortOrder: 'asc' // Reset to ascending (oldest first) to match backend order
    });
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  // Get the data to display (filtered or original)
  const displayData = filteredFunnelData.length > 0 || Object.values(filters).some(f => f !== '' && f !== 'updatedAt' && f !== 'asc') 
    ? filteredFunnelData 
    : funnelData;

  // Render the active tab content
  const renderTabContent = () => {
    if (!applicationId) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          Please enter an application ID to view data.
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <p className="text-gray-500 mt-4">Loading data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 p-4 rounded-lg text-red-700 mb-4">
          <p className="font-medium">Error</p>
          <p>{error}</p>
          <button 
            onClick={handleRefresh}
            className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded-md text-sm shadow-sm hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (activeTab === 'list') {
      return (
        <FunnelList 
          applicationId={applicationId}
          loading={false}
          error={null}
          funnelData={displayData}
          expandedFunnels={expandedFunnels}
          toggleFunnel={toggleFunnel}
          handleRefresh={handleRefresh}
        />
      );
    } else {
      return <Dashboard funnelData={displayData} />;
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
        toggleFilters={toggleFilters}
        showFilters={showFilters}
      />

      <main className="max-w-7xl mx-auto px-4 py-4">
        {applicationId && (
          <div className="mb-3 px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md text-sm font-medium">
            Application ID: {applicationId}
          </div>
        )}
        
        {applicationId && (
          <TabNavigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        )}
        
        {showFilters && applicationId && activeTab === 'list' && (
          <FilterPanel 
            filters={filters}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
          />
        )}
        
        {renderTabContent()}
      </main>
    </div>
  );
}

export default App;