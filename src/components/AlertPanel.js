import React, { useState } from 'react';
import { AlertCircle, Bell, X, CheckCircle } from 'lucide-react';
import { formatDateTime } from '../utils/helpers';

/**
 * Alert Panel Component
 * Displays alerts and notifications for administrators
 */
const AlertPanel = ({ alerts = [], onMarkAsRead, onDelete, loading = false }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 rounded-lg p-4 h-20 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Bell size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">No alerts at the moment</p>
      </div>
    );
  }

  // Group alerts by severity
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical');
  const warningAlerts = alerts.filter((a) => a.severity === 'warning');
  const infoAlerts = alerts.filter((a) => a.severity === 'info');

  const renderAlert = (alert) => {
    const severityStyles = {
      critical: 'bg-red-50 border-l-4 border-red-500',
      warning: 'bg-yellow-50 border-l-4 border-yellow-500',
      info: 'bg-blue-50 border-l-4 border-blue-500',
    };

    const severityColors = {
      critical: 'text-red-800',
      warning: 'text-yellow-800',
      info: 'text-blue-800',
    };

    const isExpanded = expandedId === alert.id;

    return (
      <div key={alert.id} className={`${severityStyles[alert.severity]} rounded-r-lg p-4 mb-3`}>
        <div className="flex items-start justify-between">
          <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : alert.id)}>
            <div className="flex items-start space-x-3">
              <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${severityColors[alert.severity]}`} />
              <div className="flex-1">
                <h4 className={`font-semibold ${severityColors[alert.severity]}`}>
                  {alert.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                {alert.projectName && (
                  <p className="text-xs text-gray-500 mt-2">
                    Project: <span className="font-medium">{alert.projectName}</span>
                  </p>
                )}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Created: {formatDateTime(alert.createdAt)}
                    </p>
                    {alert.details && (
                      <p className="text-sm text-gray-700 mt-2">{alert.details}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-2">
            {!alert.read && (
              <button
                onClick={() => onMarkAsRead(alert.id)}
                className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                aria-label="Mark as read"
                title="Mark as read"
              >
                <CheckCircle size={18} />
              </button>
            )}
            <button
              onClick={() => onDelete(alert.id)}
              className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors"
              aria-label="Delete alert"
              title="Delete alert"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {criticalAlerts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-red-800 mb-2">Critical ({criticalAlerts.length})</h4>
          {criticalAlerts.map((alert) => renderAlert(alert))}
        </div>
      )}
      {warningAlerts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-yellow-800 mb-2">Warnings ({warningAlerts.length})</h4>
          {warningAlerts.map((alert) => renderAlert(alert))}
        </div>
      )}
      {infoAlerts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-blue-800 mb-2">Information ({infoAlerts.length})</h4>
          {infoAlerts.map((alert) => renderAlert(alert))}
        </div>
      )}
    </div>
  );
};

export default AlertPanel;
