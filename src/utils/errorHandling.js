/**
 * Error Handling Utilities
 * Centralized error handling and formatting
 */

/**
 * Parse error response from API
 * @param {Error} error - Error object
 * @returns {string} Formatted error message
 */
export const parseError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * Format validation errors
 * @param {Object} errors - Validation errors object
 * @returns {string} Formatted error message
 */
export const formatValidationErrors = (errors) => {
  const errorMessages = Object.values(errors).filter(Boolean);
  return errorMessages.length > 0 ? errorMessages[0] : 'Validation failed';
};

/**
 * Handle API error with logging
 * @param {Error} error - Error object
 * @param {string} context - Error context/location
 */
export const logError = (error, context = 'Unknown') => {
  console.error(`[${context}] Error:`, error);
  
  // In production, send to error tracking service
  if (process.env.REACT_APP_ENV === 'production') {
    // Send to Sentry, LogRocket, etc.
    // sentryClient.captureException(error);
  }
};

/**
 * Get user-friendly error message
 * @param {Error} error - Error object
 * @returns {string} User-friendly message
 */
export const getUserFriendlyMessage = (error) => {
  if (error.response?.status === 401) {
    return 'Session expired. Please log in again.';
  }
  if (error.response?.status === 403) {
    return 'You do not have permission to perform this action.';
  }
  if (error.response?.status === 404) {
    return 'The requested resource was not found.';
  }
  if (error.response?.status === 500) {
    return 'Server error. Please try again later.';
  }
  if (error.message === 'Network Error') {
    return 'Network error. Please check your connection.';
  }
  return 'An error occurred. Please try again.';
};

/**
 * Retry failed API call
 * @param {Function} apiCall - API call function
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise}
 */
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};
