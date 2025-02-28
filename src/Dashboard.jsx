import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B'];

function Dashboard({ funnelData }) {
  // Calculate status distribution across all tasks
  const statusData = useMemo(() => {
    if (!funnelData || funnelData.length === 0) {
      return [];
    }

    const statusCounts = {};
    let totalTasks = 0;

    // Count tasks by status
    funnelData.forEach(funnel => {
      funnel.tasks.forEach(task => {
        statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
        totalTasks++;
      });
    });

    // Convert to array format for charts
    return Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status],
      percentage: Math.round((statusCounts[status] / totalTasks) * 100)
    }));
  }, [funnelData]);

  // Calculate funnel distribution (tasks per funnel)
  const funnelDistribution = useMemo(() => {
    if (!funnelData || funnelData.length === 0) {
      return [];
    }

    return funnelData.map(funnel => ({
      name: funnel.name.replace(' Funnel', ''),
      total: funnel.tasks.length,
      completed: funnel.tasks.filter(task => task.status === 'COMPLETED').length
    }));
  }, [funnelData]);

  // Calculate actor distribution
  const actorData = useMemo(() => {
    if (!funnelData || funnelData.length === 0) {
      return [];
    }

    const actorCounts = {};
    let totalTasks = 0;

    // Count tasks by actor
    funnelData.forEach(funnel => {
      funnel.tasks.forEach(task => {
        const actorId = task.actorId || 'Unknown';
        actorCounts[actorId] = (actorCounts[actorId] || 0) + 1;
        totalTasks++;
      });
    });

    // Convert to array format for charts
    return Object.keys(actorCounts)
      .map(actor => ({
        name: actor,
        value: actorCounts[actor],
        percentage: Math.round((actorCounts[actor] / totalTasks) * 100)
      }))
      .sort((a, b) => b.value - a.value) // Sort by count descending
      .slice(0, 5); // Take top 5 actors
  }, [funnelData]);

  // Custom label for pie chart slices
  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, name, value, percentage } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Don't render labels for very small slices (less than 5%)
    if (percentage < 5) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#000000" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${name}: ${percentage}%`}
      </text>
    );
  };

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-xs">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p>{`Count: ${payload[0].value}`}</p>
          <p>{`Percentage: ${payload[0].payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  // If no data, show a message
  if (!funnelData || funnelData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">No data available. Please search for an application ID.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Activity Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Task Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => `${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actor Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Top 5 Actors</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={actorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {actorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => `${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tasks by Funnel</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelDistribution}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Total Tasks" fill="#8884d8" />
                <Bar dataKey="completed" name="Completed Tasks" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-indigo-50 p-3 rounded-lg">
          <p className="text-xs text-indigo-700">Total Funnels</p>
          <p className="text-xl font-semibold text-indigo-900">{funnelData.length}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-xs text-green-700">Total Tasks</p>
          <p className="text-xl font-semibold text-green-900">
            {funnelData.reduce((sum, funnel) => sum + funnel.tasks.length, 0)}
          </p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-xs text-yellow-700">Completed Tasks</p>
          <p className="text-xl font-semibold text-yellow-900">
            {funnelData.reduce((sum, funnel) => 
              sum + funnel.tasks.filter(t => t.status === 'COMPLETED').length, 0)}
          </p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-xs text-red-700">Failed Tasks</p>
          <p className="text-xl font-semibold text-red-900">
            {funnelData.reduce((sum, funnel) => 
              sum + funnel.tasks.filter(t => t.status === 'FAILED').length, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;