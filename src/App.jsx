import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CheckCircle, Clock, AlertTriangle, XCircle, ChevronUp, ChevronDown, 
  User, MoreHorizontal, Search, Filter, Calendar, 
  Download, RefreshCw, CornerUpLeft
} from 'lucide-react';

function App() {
  const [expandedFunnels, setExpandedFunnels] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' or 'flowchart'
  const [searchTerm, setSearchTerm] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [inputApplicationId, setInputApplicationId] = useState('');
  const [funnelData, setFunnelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFunnelData();
  }, [applicationId]); // Refetch when applicationId changes

  const fetchFunnelData = async () => {
    setLoading(true);
    try {
      // For testing, you can use a mock API endpoint or your actual endpoint
      const url = `http://localhost:8081/activity/${applicationId}`;
      
      // In production, use this:
      const response = await axios.get(url);
      const transformedData = transformApiData(response.data);
      
      setFunnelData(transformedData);
      
      // Initialize expanded state for all funnels
      const initialExpandedState = Object.fromEntries(
        transformedData.map(funnel => [funnel.id, true])
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

  // Transform API data to the format expected by your component
  const transformApiData = (apiData) => {
    // Ensure apiData is an array
    const dataArray = Array.isArray(apiData) ? apiData : [apiData];
    
    // If the array is empty, return an empty array
    if (dataArray.length === 0) {
      return [];
    }
    
    return dataArray.map((item, index) => {
      // Generate a unique ID for each funnel
      const funnelId = `funnel-${index}-${item.funnel ? item.funnel.toLowerCase() : 'unknown'}`;
      
      // Ensure tasks is an array
      const tasks = Array.isArray(item.tasks) ? item.tasks : [];
      
      // Determine funnel status based on tasks
      const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;
      const totalTasks = tasks.length;
      
      let funnelStatus = 'pending';
      if (completedTasks === totalTasks && totalTasks > 0) {
        funnelStatus = 'completed';
      } else if (completedTasks > 0) {
        funnelStatus = 'active';
      }
      
      // Get current date for display purposes
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB');
      const formattedTime = currentDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
      
      // Transform tasks
      const transformedTasks = tasks.map(task => {
        // Convert API task status to component status
        let taskStatus = 'pending';
        switch (task.status) {
          case 'COMPLETED':
            taskStatus = 'completed';
            break;
          case 'NEW':
            taskStatus = 'pending';
            break;
          case 'FAILED':
            taskStatus = 'error';
            break;
          case 'WARNING':
            taskStatus = 'warning';
            break;
          default:
            taskStatus = 'pending';
        }
        
        // Format the date
        let formattedUpdatedAt = 'N/A';
        try {
          const updatedDate = new Date(task.updatedAt);
          formattedUpdatedAt = updatedDate.toLocaleString('en-GB');
        } catch (e) {
          console.warn('Invalid date format:', task.updatedAt);
        }
        
        return {
          id: task.taskId || `task-${Math.random().toString(36).substr(2, 9)}`,
          name: formatTaskName(task.taskId || 'unknown-task'),
          status: taskStatus,
          createdAt: formattedUpdatedAt, // Using updatedAt as createdAt for simplicity
          updatedAt: formattedUpdatedAt,
          lastEditedBy: task.actorId ? `User ${task.actorId}` : 'System',
          applicationId: applicationId || 'N/A',
          sendBack: false, // Default value, adjust if your API provides this info
          previousStage: '', // Default value, adjust if your API provides this info
          iteration: null, // Default value, adjust if your API provides this info
          revisit: false // Default value, adjust if your API provides this info
        };
      });
      
      // Sort tasks by order
      transformedTasks.sort((a, b) => {
        const taskA = tasks.find(t => t.taskId === a.id);
        const taskB = tasks.find(t => t.taskId === b.id);
        return ((taskA?.order || 0) - (taskB?.order || 0));
      });
      
      return {
        id: funnelId,
        name: `${item.funnel || 'Unknown'} Funnel`,
        status: funnelStatus,
        date: formattedDate,
        time: formattedTime,
        duration: `${completedTasks}/${totalTasks} tasks completed`,
        tasks: transformedTasks
      };
    });
  };

  // Helper function to format task IDs into readable names
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getFunnelStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'active':
        return 'bg-blue-50 border-l-4 border-blue-500';
      case 'pending':
        return 'bg-gray-50 border-l-4 border-gray-300';
      default:
        return 'bg-white';
    }
  };

  const filteredFunnels = funnelData.filter(funnel => 
    funnel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funnel.tasks.some(task => 
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.applicationId && task.applicationId.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const handleApplicationIdSubmit = (e) => {
    e.preventDefault();
    if (inputApplicationId.trim()) {
      setApplicationId(inputApplicationId);
    }
  };

  const handleRefresh = () => {
    fetchFunnelData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Activity Log</h1>
              <div className="ml-4 flex space-x-2">
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${activeView === 'timeline' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveView('timeline')}
                >
                  Timeline View
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${activeView === 'flowchart' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveView('flowchart')}
                >
                  Flow View
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputApplicationId}
                  onChange={(e) => setInputApplicationId(e.target.value)}
                  placeholder="Enter Application ID..."
                  className="px-4 py-2 border border-gray-300 rounded-l-md text-sm focus:ring-indigo-500 focus:border-indigo-500 w-56"
                />
                <button 
                  onClick={handleApplicationIdSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-md text-sm shadow-sm hover:bg-indigo-700"
                >
                  Search
                </button>
              </div>
              {applicationId && (
                <div className="px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md text-sm font-medium">
                  Application ID: {applicationId}
                </div>
              )}
              <button className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-sm shadow-sm hover:bg-gray-50 flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-medium text-gray-900">Activity Timeline</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-sm shadow-sm hover:bg-gray-50 flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={handleRefresh}
              >
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full"
                      />
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>All Statuses</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Warning</option>
                    <option>Error</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Funnel</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>All Funnels</option>
                    <option>Sourcing</option>
                    <option>Credit</option>
                    <option>Conversion</option>
                    <option>RTO</option>
                    <option>Risk</option>
                    <option>Fulfillment</option>
                    <option>Disbursal</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm shadow-sm hover:bg-indigo-700">
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">
              <p>{error}</p>
              <button 
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm shadow-sm hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          ) : filteredFunnels.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>No activity data found. Try adjusting your search criteria.</p>
            </div>
          ) : activeView === 'timeline' ? (
            <div className="divide-y divide-gray-200">
              {filteredFunnels.map((funnel, index) => (
                <div key={funnel.id} className="relative">
                  <div 
                    className={`px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${getFunnelStatusClass(funnel.status)}`}
                    onClick={() => toggleFunnel(funnel.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {funnel.name.includes('Revisit') ? (
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <CornerUpLeft className="h-5 w-5 text-amber-600" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-indigo-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-base font-medium text-gray-900">{funnel.name}</h3>
                          {funnel.name.includes('Revisit') && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              Revisit
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {funnel.date} • {funnel.time} • Duration: {funnel.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {funnel.status === 'active' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          ACTIVE
                        </span>
                      )}
                      {funnel.status === 'pending' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          PENDING
                        </span>
                      )}
                      <button className="text-indigo-600 hover:text-indigo-900">
                        {expandedFunnels[funnel.id] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Vertical timeline connector */}
                  {index < filteredFunnels.length - 1 && expandedFunnels[funnel.id] && (
                    <div className="absolute left-11 top-16 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                  )}

                  {expandedFunnels[funnel.id] && (
                    <div className="bg-gray-50 px-6 py-3 relative">
                      <ul className="space-y-4">
                        {funnel.tasks.map((task, taskIndex) => (
                          <li key={task.id} className="bg-white rounded-md shadow-sm p-4 relative">
                            {/* Task connector line */}
                            {taskIndex < funnel.tasks.length - 1 && (
                              <div className="absolute left-5 top-14 h-10 w-0.5 bg-gray-200 z-0"></div>
                            )}
                            
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5">
                                {task.sendBack ? (
                                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <CornerUpLeft className="h-5 w-5 text-amber-600" />
                                  </div>
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    {getStatusIcon(task.status)}
                                  </div>
                                )}
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900 flex items-center">
                                      {task.name}
                                      {task.revisit && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                          Revisited
                                        </span>
                                      )}
                                      {task.sendBack && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                          Send Back from {task.previousStage}
                                        </span>
                                      )}
                                      {task.iteration && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                          Iteration {task.iteration}
                                        </span>
                                      )}
                                    </h4>
                                    <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-2">
                                      <span>Task ID: {task.id}</span>
                                      <span>•</span>
                                      <span>Created: {task.createdAt}</span>
                                      <span>•</span>
                                      <span>Updated: {task.updatedAt}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <button className="p-1 rounded-full hover:bg-gray-100">
                                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                    </button>
                                  </div>
                                </div>
                                
                                {task.lastEditedBy && (
                                  <p className="mt-2 text-xs text-gray-500">Last edited by: {task.lastEditedBy}</p>
                                )}
                                
                                {task.name === 'Pan Validation' && (
                                  <div className="mt-2 flex items-center">
                                    <span className="text-xs text-gray-500">Task creation time: {task.createdAt}</span>
                                    <button className="ml-3 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                      <RefreshCw className="mr-1 h-3 w-3" />
                                      Re-trigger
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-4xl">
                  <div className="relative">
                    {/* Flow chart visualization */}
                    <div className="flex flex-col">
                      {filteredFunnels.map((funnel, index) => (
                        <div key={funnel.id} className="mb-8">
                          <div className={`p-4 rounded-lg mb-2 ${getFunnelStatusClass(funnel.status)} shadow-sm`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {funnel.name.includes('Revisit') ? (
                                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                    <CornerUpLeft className="h-5 w-5 text-amber-600" />
                                  </div>
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                    <User className="h-5 w-5 text-indigo-600" />
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-base font-medium text-gray-900">{funnel.name}</h3>
                                  <p className="text-sm text-gray-500">
                                    {funnel.date} • Tasks: {funnel.tasks.length}
                                  </p>
                                </div>
                              </div>
                              <div>
                                {funnel.status === 'active' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    ACTIVE
                                  </span>
                                )}
                                {funnel.status === 'pending' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    PENDING
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Tasks in a horizontal flow */}
                          <div className="flex overflow-x-auto pb-4">
                            {funnel.tasks.map((task, taskIndex) => (
                              <div key={task.id} className="flex-shrink-0 mr-4 relative">
                                <div className={`w-64 p-3 rounded-lg shadow-sm ${
                                  task.status === 'completed' ? 'bg-green-50 border border-green-200' :
                                  task.status === 'pending' ? 'bg-blue-50 border border-blue-200' :
                                  task.status === 'warning' ? 'bg-amber-50 border border-amber-200' :
                                  'bg-red-50 border border-red-200'
                                }`}>
                                  <div className="flex items-center mb-2">
                                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mr-2">
                                      {getStatusIcon(task.status)}
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-900 truncate">{task.name}</h4>
                                  </div>
                                  
                                  <div className="text-xs text-gray-500">
                                    <p className="truncate">ID: {task.id}</p>
                                    <p className="truncate">Created: {task.createdAt}</p>
                                    {task.sendBack && (
                                      <div className="mt-1 flex items-center">
                                        <CornerUpLeft className="h-3 w-3 text-amber-600 mr-1" />
                                        <span className="text-amber-600">From {task.previousStage}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Connector line */}
                                {taskIndex < funnel.tasks.length - 1 && (
                                  <div className="absolute right-0 top-1/2 w-4 h-0.5 bg-gray-300"></div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Connector between funnels */}
                          {index < filteredFunnels.length - 1 && (
                            <div className="flex justify-center my-2">
                              <div className="h-8 w-0.5 bg-gray-300"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;