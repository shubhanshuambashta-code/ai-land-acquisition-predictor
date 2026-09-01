import React from 'react';

/**
 * Card Component
 * Reusable card wrapper component
 */
const Card = ({ children, className = '', title, subtitle, footer, padding = 'p-6' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {(title || subtitle) && (
        <div className={`${padding} border-b border-gray-200`}>
          {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className={padding}>{children}</div>
      {footer && <div className={`${padding} border-t border-gray-200 bg-gray-50`}>{footer}</div>}
    </div>
  );
};

export default Card;
