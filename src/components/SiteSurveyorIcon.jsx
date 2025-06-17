import React from 'react';

const SiteSurveyorIcon = ({ size = 64, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="32" cy="32" r="30" fill="url(#backgroundGradient)" stroke="url(#borderGradient)" strokeWidth="2"/>
      
      {/* Simple, Clean Letter 'S' */}
      <g transform="translate(32, 32)">
        <path 
          d="M-8 -16 
             C-8 -20, -4 -24, 0 -24
             L8 -24
             C12 -24, 16 -20, 16 -16
             C16 -12, 12 -8, 8 -8
             L0 -8
             C-2 -8, -4 -6, -4 -4
             C-4 -2, -2 0, 0 0
             L8 0
             C12 0, 16 4, 16 8
             C16 12, 12 16, 8 16
             L-8 16
             C-12 16, -16 12, -16 8
             C-16 4, -12 0, -8 0
             L0 0
             C2 0, 4 2, 4 4
             C4 6, 2 8, 0 8
             L-8 8
             C-12 8, -16 4, -16 0
             Z" 
          fill="#ffffff" 
          stroke="none"
        />
      </g>
      
      {/* Gradients */}
      <defs>
        {/* Background Gradient */}
        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#6366f1', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
        </linearGradient>
        
        {/* Border Gradient */}
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#1e40af', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#7c3aed', stopOpacity:1}} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SiteSurveyorIcon;