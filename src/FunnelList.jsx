import React from 'react';
import FunnelItem from './FunnelItem';

function FunnelList({ 
  applicationId, 
  loading, 
  error, 
  funnelData, 
  expandedFunnels, 
  toggleFunnel, 
  handleRefresh 
}) {
  if (!applicationId) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-md">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Enter Application ID</h2>
          <p className="text-gray-500 mb-4">
            Please enter an Application ID in the search box above to view activity data.
          </p>
          <div className="flex justify-center">
            <svg className="h-16 w-16 text-indigo-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
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

  if (funnelData.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No activity data found for Application ID: {applicationId}</p>
        <p className="mt-2">Try searching with a different Application ID.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {funnelData.map((funnel) => (
        <FunnelItem 
          key={funnel.id}
          funnel={funnel}
          isExpanded={expandedFunnels[funnel.id]}
          toggleFunnel={toggleFunnel}
        />
      ))}
    </div>
  );
}

export default FunnelList;