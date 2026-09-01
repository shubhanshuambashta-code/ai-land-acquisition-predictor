import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { ALERT_TYPE_COLORS } from '../utils/constants';

/**
 * Alert Component
 * Displays alert/notification messages with different severity levels
 */
const Alert = ({ type = 'info', title, message, onClose }) => {
  const colors = ALERT_TYPE_COLORS[type] || ALERT_TYPE_COLORS.info;

  const icons = {
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
    error: <AlertCircle size={20} />,
    success: <CheckCircle size={20} />,
  };

  return (
    <div className={`${colors.bg} border-l-4 border-current rounded-lg p-4 ${colors.text}`} role="alert">
      <div className="flex items-start">
        <div className={`flex-shrink-0 mt-0.5 ${colors.icon}`}>
          {icons[type]}
        </div>
        <div className="ml-3 flex-1">
          {title && <h3 className="font-semibold text-sm">{title}</h3>}
          {message && (
            <p className={`text-sm mt-${title ? '1' : '0'}`}>{message}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto flex-shrink-0 inline-flex text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
