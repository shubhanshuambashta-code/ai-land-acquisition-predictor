import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { getRiskColor, getRiskBgColor, getRiskLevel } from '../utils/helpers';

/**
 * Dashboard Card Component
 * Reusable card for displaying metrics and data
 */
const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  riskScore,
  onClick,
  className = '',
  loading = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      role="article"
      aria-label={title}
    >
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            {Icon && (
              <div className="p-3 bg-primary-100 rounded-lg">
                <Icon size={24} className="text-primary-600" />
              </div>
            )}
          </div>

          {/* Subtitle or Risk Score */}
          {riskScore !== undefined ? (
            <div
              className={`py-2 px-3 rounded-lg ${getRiskBgColor(riskScore)} mb-3`}
            >
              <p className={`text-sm font-semibold ${getRiskColor(riskScore)}`}>
                Risk Level: {getRiskLevel(riskScore)}
              </p>
              <p className="text-xs text-gray-600 mt-1">Score: {riskScore}%</p>
            </div>
          ) : null}

          {subtitle && !riskScore && (
            <p className="text-sm text-gray-600 mb-3">{subtitle}</p>
          )}

          {/* Trend Indicator */}
          {trend && (
            <div className="flex items-center space-x-1">
              {trend.direction === 'up' ? (
                <TrendingUp size={16} className="text-red-500" />
              ) : (
                <TrendingDown size={16} className="text-green-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend.direction === 'up' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {trend.value}% {trend.label}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardCard;
