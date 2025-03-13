
import { formatTaskName } from './formatters';

// apiTransformers.js
export const transformApiData = (data) => {
  // Create an array to hold all funnels
  const funnels = [];
  
  // Process each funnel in the data
  for (const [funnelKey, funnelData] of Object.entries(data)) {
    if (typeof funnelData === 'object' && funnelData !== null) {
      // Create a funnel object
      const funnel = {
        id: funnelKey,
        name: funnelData.funnel || funnelKey,
        funnelDuration: funnelData.funnelDuration || 0,
        tasks: []
      };
      
      // Process tasks if they exist
      if (Array.isArray(funnelData.tasks)) {
        funnel.tasks = funnelData.tasks.map(task => {
          // Get the current status from the last status history entry
          const currentStatus = task.statusHistory && task.statusHistory.length > 0 
            ? task.statusHistory[task.statusHistory.length - 1].status 
            : 'UNKNOWN';
            
          return {
            id: task.taskId,
            name: task.taskId,
            taskId: task.taskId,
            order: task.order,
            handledBy: task.handledBy,
            createdAt: task.createdAt,
            statusHistory: task.statusHistory || [],
            currentStatus: currentStatus,
            duration: task.duration,
            sendbacks: task.sendbacks,
            visited: task.visited
          };
        });
        
        // Sort tasks by order if available
        funnel.tasks.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      
      // Calculate progress
      const totalTasks = funnel.tasks.length;
      const completedTasks = funnel.tasks.filter(task => task.currentStatus === 'COMPLETED').length;
      funnel.progress = `${completedTasks}/${totalTasks}`;
      funnel.status = completedTasks === totalTasks && totalTasks > 0 ? 'completed' : 'in-progress';
      
      funnels.push(funnel);
    }
  }
  
  return funnels;
};