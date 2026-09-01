/**
 * Utility helper functions
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format date and time
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get risk color based on risk level
 * @param {number} score - Risk score (0-100)
 * @returns {string} Tailwind color class
 */
export const getRiskColor = (score) => {
  if (score < 25) return 'text-green-600';
  if (score < 50) return 'text-yellow-600';
  if (score < 75) return 'text-orange-600';
  return 'text-red-600';
};

/**
 * Get risk background color
 * @param {number} score - Risk score (0-100)
 * @returns {string} Tailwind background class
 */
export const getRiskBgColor = (score) => {
  if (score < 25) return 'bg-green-50';
  if (score < 50) return 'bg-yellow-50';
  if (score < 75) return 'bg-orange-50';
  return 'bg-red-50';
};

/**
 * Get risk level label
 * @param {number} score - Risk score (0-100)
 * @returns {string} Risk level label
 */
export const getRiskLevel = (score) => {
  if (score < 25) return 'Low';
  if (score < 50) return 'Medium';
  if (score < 75) return 'High';
  return 'Critical';
};

/**
 * Format currency
 * @param {number} value - Value to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (!value) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(value);
};

/**
 * Format number with thousands separator
 * @param {number} value - Value to format
 * @returns {string} Formatted number
 */
export const formatNumber = (value) => {
  if (!value) return '0';
  return new Intl.NumberFormat('en-IN').format(value);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 50) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Check if value is empty
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};
