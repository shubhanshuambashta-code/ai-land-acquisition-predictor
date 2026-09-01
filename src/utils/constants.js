/**
 * Application Constants
 */

export const USER_ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  VIEWER: 'Viewer',
};

export const RISK_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export const RISK_COLORS = {
  Low: '#22c55e',      // green-500
  Medium: '#f59e0b',   // amber-500
  High: '#ef4444',     // red-500
  Critical: '#7f1d1d', // red-900
};

export const ALERT_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};

export const ALERT_TYPE_COLORS = {
  info: { bg: 'bg-blue-50', text: 'text-blue-800', icon: 'text-blue-400' },
  warning: { bg: 'bg-yellow-50', text: 'text-yellow-800', icon: 'text-yellow-400' },
  error: { bg: 'bg-red-50', text: 'text-red-800', icon: 'text-red-400' },
  success: { bg: 'bg-green-50', text: 'text-green-800', icon: 'text-green-400' },
};

export const PROJECT_TYPES = [
  'Residential',
  'Commercial',
  'Industrial',
  'Agricultural',
  'Mixed Use',
];

export const DELAY_FACTORS = [
  'Land Disputes',
  'Documentation Issues',
  'Environmental Clearance',
  'Legal Proceedings',
  'Administrative Delays',
  'Financial Constraints',
  'Local Opposition',
  'Weather Conditions',
];
