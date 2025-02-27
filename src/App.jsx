import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RefreshCw, User, Clock, CheckCircle, AlertTriangle, XCircle, ArrowUpLeft as ArrowUturnLeft, Filter, Calendar, Download, Search, MoreHorizontal } from 'lucide-react';

// Mock data structure
const funnelData = [
  {
    id: '1',
    name: 'Sourcing',
    duration: '2h 30m',
    date: '17/04/2024',
    time: '03:00 PM',
    status: 'completed',
    tasks: [
      { id: '101', applicationId: 'APP-001', name: 'Send Consent OTP', status: 'completed', createdAt: '17/04/2024 03:00 PM', updatedAt: '17/04/2024 03:05 PM' },
      { id: '102', applicationId: 'APP-001', name: 'Create Lead', status: 'completed', createdAt: '17/04/2024 03:05 PM', updatedAt: '17/04/2024 03:10 PM' },
      { id: '103', applicationId: 'APP-001', name: 'Basic Details', status: 'completed', createdAt: '17/04/2024 03:10 PM', updatedAt: '17/04/2024 03:15 PM' },
      { id: '104', applicationId: 'APP-001', name: 'DOB Check', status: 'completed', createdAt: '17/04/2024 03:15 PM', updatedAt: '17/04/2024 03:20 PM' },
      { id: '105', applicationId: 'APP-001', name: 'COL Check', status: 'completed', createdAt: '17/04/2024 03:20 PM', updatedAt: '17/04/2024 03:25 PM' },
      { id: '106', applicationId: 'APP-001', name: 'Pan Validation', status: 'completed', createdAt: '17/04/2024 03:25 PM', updatedAt: '17/04/2024 03:30 PM', lastEditedBy: 'Mohit Bansal (Sourcing Agent)' },
      { id: '107', applicationId: 'APP-001', name: 'Bajaj Offer Initiate', status: 'completed', createdAt: '17/04/2024 03:30 PM', updatedAt: '17/04/2024 03:35 PM' },
      { id: '108', applicationId: 'APP-001', name: 'Pan Photo Upload', status: 'completed', createdAt: '17/04/2024 03:35 PM', updatedAt: '17/04/2024 03:40 PM' },
      { id: '109', applicationId: 'APP-001', name: 'Fraud Check', status: 'completed', createdAt: '17/04/2024 03:40 PM', updatedAt: '17/04/2024 03:45 PM' },
      { id: '110', applicationId: 'APP-001', name: 'Current Address', status: 'completed', createdAt: '17/04/2024 03:45 PM', updatedAt: '17/04/2024 03:50 PM' },
      { id: '111', applicationId: 'APP-001', name: 'Contact Details', status: 'completed', createdAt: '17/04/2024 03:50 PM', updatedAt: '17/04/2024 03:55 PM' },
      { id: '112', applicationId: 'APP-001', name: 'Personal Details', status: 'completed', createdAt: '17/04/2024 03:55 PM', updatedAt: '17/04/2024 04:00 PM' },
      { id: '113', applicationId: 'APP-001', name: 'Address Details', status: 'completed', createdAt: '17/04/2024 04:00 PM', updatedAt: '17/04/2024 04:05 PM' },
      { id: '114', applicationId: 'APP-001', name: 'Employment Details', status: 'completed', createdAt: '17/04/2024 04:05 PM', updatedAt: '17/04/2024 04:10 PM' },
      { id: '115', applicationId: 'APP-001', name: 'Asset Attach', status: 'completed', createdAt: '17/04/2024 04:10 PM', updatedAt: '17/04/2024 04:15 PM' },
    ]
  },
  {
    id: '2',
    name: 'Credit',
    duration: '1h 45m',
    date: '17/04/2024',
    time: '04:15 PM',
    status: 'completed',
    tasks: [
      { id: '201', applicationId: 'APP-001', name: 'CIBIL Pull', status: 'completed', createdAt: '17/04/2024 04:15 PM', updatedAt: '17/04/2024 04:25 PM' },
      { id: '202', applicationId: 'APP-001', name: 'Credit workflow', status: 'completed', createdAt: '17/04/2024 04:25 PM', updatedAt: '17/04/2024 04:35 PM' },
      { id: '203', applicationId: 'APP-001', name: 'DC Approve', status: 'completed', createdAt: '17/04/2024 04:35 PM', updatedAt: '17/04/2024 04:45 PM' },
    ]
  },
  {
    id: '3',
    name: 'Sourcing (Revisit)',
    duration: '1h 15m',
    date: '17/04/2024',
    time: '04:45 PM',
    status: 'completed',
    tasks: [
      { 
        id: '301', 
        applicationId: 'APP-001', 
        name: 'Customer Banking', 
        status: 'warning', 
        createdAt: '17/04/2024 04:45 PM', 
        updatedAt: '17/04/2024 05:00 PM',
        sendBack: true,
        previousStage: 'Credit',
        iteration: 1
      },
      { 
        id: '302', 
        applicationId: 'APP-001', 
        name: 'Customer Banking', 
        status: 'completed', 
        createdAt: '17/04/2024 05:00 PM', 
        updatedAt: '17/04/2024 05:15 PM',
        revisit: true,
        iteration: 1
      },
    ]
  },
  {
    id: '4',
    name: 'Conversion',
    duration: '2h 00m',
    date: '17/04/2024',
    time: '05:15 PM',
    status: 'completed',
    tasks: [
      { id: '401', applicationId: 'APP-001', name: 'Terms generation', status: 'completed', createdAt: '17/04/2024 05:15 PM', updatedAt: '17/04/2024 05:25 PM' },
      { id: '402', applicationId: 'APP-001', name: 'Initiate Offer Approval', status: 'completed', createdAt: '17/04/2024 05:25 PM', updatedAt: '17/04/2024 05:35 PM' },
      { id: '403', applicationId: 'APP-001', name: 'Manager Approval', status: 'completed', createdAt: '17/04/2024 05:35 PM', updatedAt: '17/04/2024 05:45 PM' },
      { id: '404', applicationId: 'APP-001', name: 'Action on Terms', status: 'completed', createdAt: '17/04/2024 05:45 PM', updatedAt: '17/04/2024 05:55 PM' },
      { id: '405', applicationId: 'APP-001', name: 'Document upload', status: 'completed', createdAt: '17/04/2024 05:55 PM', updatedAt: '17/04/2024 06:05 PM' },
    ]
  },
  {
    id: '5',
    name: 'RTO',
    duration: '0h 30m',
    date: '17/04/2024',
    time: '06:05 PM',
    status: 'completed',
    tasks: [
      { id: '501', applicationId: 'APP-001', name: 'RTO completion', status: 'completed', createdAt: '17/04/2024 06:05 PM', updatedAt: '17/04/2024 06:15 PM' },
    ]
  },
  {
    id: '6',
    name: 'Risk',
    duration: '1h 30m',
    date: '17/04/2024',
    time: '06:15 PM',
    status: 'completed',
    tasks: [
      { id: '601', applicationId: 'APP-001', name: 'FCU Checks', status: 'completed', createdAt: '17/04/2024 06:15 PM', updatedAt: '17/04/2024 06:25 PM' },
      { id: '602', applicationId: 'APP-001', name: 'RCU Checks', status: 'completed', createdAt: '17/04/2024 06:25 PM', updatedAt: '17/04/2024 06:35 PM' },
      { id: '603', applicationId: 'APP-001', name: 'RTO Kit Approval', status: 'completed', createdAt: '17/04/2024 06:35 PM', updatedAt: '17/04/2024 06:45 PM' },
      { id: '604', applicationId: 'APP-001', name: 'Final QC', status: 'completed', createdAt: '17/04/2024 06:45 PM', updatedAt: '17/04/2024 06:55 PM' },
    ]
  },
  {
    id: '7',
    name: 'Fulfillment',
    duration: '1h 45m',
    date: '17/04/2024',
    time: '06:55 PM',
    status: 'completed',
    tasks: [
      { id: '701', applicationId: 'APP-001', name: 'Fulfillment KYC', status: 'completed', createdAt: '17/04/2024 06:55 PM', updatedAt: '17/04/2024 07:05 PM' },
      { id: '702', applicationId: 'APP-001', name: 'Fulfillment NACH', status: 'completed', createdAt: '17/04/2024 07:05 PM', updatedAt: '17/04/2024 07:15 PM' },
      { id: '703', applicationId: 'APP-001', name: 'Fulfillment Reference call', status: 'completed', createdAt: '17/04/2024 07:15 PM', updatedAt: '17/04/2024 07:25 PM' },
      { id: '704', applicationId: 'APP-001', name: 'Fulfillment Agreement', status: 'completed', createdAt: '17/04/2024 07:25 PM', updatedAt: '17/04/2024 07:35 PM' },
    ]
  },
  {
    id: '8',
    name: 'Disbursal',
    duration: '0h 45m',
    date: '17/04/2024',
    time: '07:35 PM',
    status: 'active',
    tasks: [
      { id: '801', applicationId: 'APP-001', name: 'Ready for Disbursal', status: 'pending', createdAt: '17/04/2024 07:35 PM', updatedAt: '17/04/2024 07:35 PM' },
    ]
  },
  {
    id: '9',
    name: 'Sourcing (Revisit)',
    duration: 'Pending',
    date: '18/04/2024',
    time: 'Pending',
    status: 'pending',
    tasks: [
      { 
        id: '901', 
        applicationId: 'APP-001', 
        name: 'Send Consent OTP', 
        status: 'pending', 
        createdAt: 'Pending', 
        updatedAt: 'Pending',
        sendBack: true,
        previousStage: 'Disbursal',
        iteration: 2
      },
    ]
  },
];

// Sample application IDs for dropdown
const sampleApplicationIds = [
  'APP-001',
  'APP-002',
  'APP-003',
  'APP-004',
  'APP-005',
];

function App() {
  const [expandedFunnels, setExpandedFunnels] = useState(
    Object.fromEntries(funnelData.map(funnel => [funnel.id, true]))
  );
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' or 'flowchart'
  const [searchTerm, setSearchTerm] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [inputApplicationId, setInputApplicationId] = useState('');

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
      task.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleApplicationIdSubmit = (e) => {
    e.preventDefault();
    if (inputApplicationId.trim()) {
      setApplicationId(inputApplicationId);
    }
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
              <span className="text-sm text-gray-500">Last updated: 17/04/2024 07:35 PM</span>
              <button className="p-1 rounded-full hover:bg-gray-100">
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

          {activeView === 'timeline' ? (
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
                            <ArrowUturnLeft className="h-5 w-5 text-amber-600" />
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
                                    <ArrowUturnLeft className="h-5 w-5 text-amber-600" />
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
                                    <span className="text-xs text-gray-500">Task creation time: 10/04/2024</span>
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
                                    <ArrowUturnLeft className="h-5 w-5 text-amber-600" />
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
                                        <ArrowUturnLeft className="h-3 w-3 text-amber-600 mr-1" />
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