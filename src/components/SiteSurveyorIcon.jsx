import React from 'react';

const SiteSurveyorIcon = ({ size = 64, className = "" }) => {
  return (
    <div 
      className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-professional ${className}`}
      style={{ 
        width: size, 
        height: size
      }}
    >
      <span 
        style={{ 
          fontSize: `${size * 0.5}px`,
          fontWeight: '600',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1,
          letterSpacing: '-0.02em'
        }}
      >
        S
      </span>
    </div>
  );
};

export default SiteSurveyorIcon;