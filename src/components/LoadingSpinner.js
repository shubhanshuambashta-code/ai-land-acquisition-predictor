import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Loading Spinner Component
 * Displays a loading indicator
 */
const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader size={40} className="text-primary-600 animate-spin" />
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">{content}</div>
      </div>
    );
  }

  return <div className="py-12 px-4">{content}</div>;
};

export default LoadingSpinner;
