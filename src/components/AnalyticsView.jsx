import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AnalyticsView({ funnelData }) {
  const [viewType, setViewType] = useState('funnels'); // 'funnels' or 'tasks'
  
  // Format duration for display
  const formatDuration = (seconds) => {
    if (seconds === undefined || seconds === null) return 0;
    return seconds; // Return raw seconds for the chart
  };
  
  // Prepare data for funnel duration chart
  const funnelChartData = {
    labels: funnelData.map(funnel => funnel.name),
    datasets: [
      {
        label: 'Duration (seconds)',
        data: funnelData.map(funnel => formatDuration(funnel.funnelDuration)),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Prepare data for task duration chart - flatten all tasks from all funnels
  const allTasks = funnelData.flatMap(funnel => 
    funnel.tasks.map(task => ({
      ...task,
      funnelName: funnel.name
    }))
  );
  
  // Sort tasks by duration for better visualization
  const sortedTasks = [...allTasks].sort((a, b) => (b.duration || 0) - (a.duration || 0));
  
  // Take top 20 tasks for better readability
  const topTasks = sortedTasks.slice(0, 20);
  
  const taskChartData = {
    labels: topTasks.map(task => `${task.funnelName}: ${task.name || task.taskId}`),
    datasets: [
      {
        label: 'Duration (seconds)',
        data: topTasks.map(task => formatDuration(task.duration)),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
      {
        label: 'Sendbacks',
        data: topTasks.map(task => task.sendbacks || 0),
        backgroundColor: 'rgba(245, 158, 11, 0.6)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: viewType === 'funnels' ? 'Funnel Duration Analysis' : 'Task Duration Analysis',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            // Format seconds into human-readable format for tooltip
            if (context.dataset.label === 'Duration (seconds)') {
              if (value < 60) {
                return `Duration: ${value} sec`;
              } else if (value < 3600) {
                const minutes = Math.floor(value / 60);
                const seconds = value % 60;
                return seconds > 0 
                  ? `Duration: ${minutes} min ${seconds} sec` 
                  : `Duration: ${minutes} min`;
              } else {
                const hours = Math.floor(value / 3600);
                const minutes = Math.floor((value % 3600) / 60);
                return minutes > 0 
                  ? `Duration: ${hours} hr ${minutes} min` 
                  : `Duration: ${hours} hr`;
              }
            }
            return `${context.dataset.label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Duration (seconds)',
        },
      },
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 45,
        },
      },
    },
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Time Analysis</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewType('funnels')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              viewType === 'funnels'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Funnel Duration
          </button>
          <button
            onClick={() => setViewType('tasks')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              viewType === 'tasks'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Task Duration
          </button>
        </div>
      </div>
      
      <div className="h-96">
        <Bar 
          data={viewType === 'funnels' ? funnelChartData : taskChartData} 
          options={chartOptions} 
        />
      </div>
      
      {viewType === 'tasks' && (
        <div className="mt-4 text-sm text-gray-500">
          * Showing top 20 tasks by duration. Sendbacks are shown as a secondary metric.
        </div>
      )}
    </div>
  );
}

export default AnalyticsView;