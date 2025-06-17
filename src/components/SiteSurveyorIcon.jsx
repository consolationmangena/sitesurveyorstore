import React from 'react';

const SiteSurveyorIcon = ({ size = 64, className = "" }) => {
  const fontSize = size * 0.8; // Make the S about 80% of the container size
  
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)',
        border: '2px solid #1e40af'
      }}
    >
      <span 
        style={{ 
          fontSize: `${fontSize}px`,
          fontWeight: 'bold',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1,
          textAlign: 'center'
        }}
      >
        S
      </span>
    </div>
  );
};

export default SiteSurveyorIcon;