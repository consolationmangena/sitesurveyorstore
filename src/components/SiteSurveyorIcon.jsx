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
      {/* Background Circle with Professional Gradient */}
      <circle cx="32" cy="32" r="30" fill="url(#backgroundGradient)" stroke="url(#borderGradient)" strokeWidth="2"/>
      
      {/* Subtle Grid Pattern for Surveying Theme */}
      <g opacity="0.1" stroke="#ffffff" strokeWidth="0.5">
        <line x1="16" y1="8" x2="16" y2="56"/>
        <line x1="24" y1="8" x2="24" y2="56"/>
        <line x1="40" y1="8" x2="40" y2="56"/>
        <line x1="48" y1="8" x2="48" y2="56"/>
        <line x1="8" y1="16" x2="56" y2="16"/>
        <line x1="8" y1="24" x2="56" y2="24"/>
        <line x1="8" y1="40" x2="56" y2="40"/>
        <line x1="8" y1="48" x2="56" y2="48"/>
      </g>
      
      {/* GPS/Survey Points (Subtle) */}
      <g opacity="0.3">
        <circle cx="12" cy="12" r="1.5" fill="#fbbf24"/>
        <path d="M12 12 L24 24" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="1,1"/>
        
        <circle cx="52" cy="16" r="1.5" fill="#fbbf24"/>
        <path d="M52 16 L40 28" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="1,1"/>
        
        <circle cx="48" cy="52" r="1.5" fill="#fbbf24"/>
        <path d="M48 52 L36 40" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="1,1"/>
      </g>
      
      {/* Main Letter 'S' - Beautifully Designed */}
      <g transform="translate(32, 32)">
        {/* S Letter Path with Professional Styling */}
        <path d="M-10 -18 
                 C-10 -22, -6 -26, -2 -26
                 L10 -26
                 C14 -26, 18 -22, 18 -18
                 C18 -14, 14 -10, 10 -10
                 L-2 -10
                 C-4 -10, -6 -8, -6 -6
                 C-6 -4, -4 -2, -2 -2
                 L10 -2
                 C14 -2, 18 2, 18 6
                 C18 10, 14 14, 10 14
                 L-10 14
                 C-14 14, -18 10, -18 6
                 C-18 2, -14 -2, -10 -2
                 L2 -2
                 C4 -2, 6 0, 6 2
                 C6 4, 4 6, 2 6
                 L-10 6
                 C-14 6, -18 2, -18 -2
                 Z" 
              fill="url(#letterGradient)" 
              stroke="url(#letterStroke)" 
              strokeWidth="1"
              filter="url(#letterShadow)"/>
        
        {/* Inner Highlight for Depth */}
        <path d="M-6 -22
                 C-6 -24, -4 -26, -2 -26
                 L8 -26
                 C10 -26, 12 -24, 12 -22
                 M-2 -6
                 C0 -6, 2 -4, 2 -2
                 L8 -2
                 C10 -2, 12 0, 12 2
                 C12 4, 10 6, 8 6
                 L-8 6
                 C-10 6, -12 4, -12 2" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="1.5" 
              strokeLinecap="round"/>
      </g>
      
      {/* Corner Survey Points */}
      <g fill="#10b981" opacity="0.6">
        <circle cx="16" cy="16" r="1"/>
        <circle cx="48" cy="16" r="1"/>
        <circle cx="16" cy="48" r="1"/>
        <circle cx="48" cy="48" r="1"/>
      </g>
      
      {/* Connecting Survey Lines */}
      <g stroke="#10b981" strokeWidth="0.5" opacity="0.4">
        <line x1="16" y1="16" x2="48" y2="16"/>
        <line x1="48" y1="16" x2="48" y2="48"/>
        <line x1="48" y1="48" x2="16" y2="48"/>
        <line x1="16" y1="48" x2="16" y2="16"/>
      </g>
      
      {/* Gradients and Effects */}
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
        
        {/* Letter Gradient */}
        <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#f8fafc', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#e2e8f0', stopOpacity:1}} />
        </linearGradient>
        
        {/* Letter Stroke */}
        <linearGradient id="letterStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#cbd5e1', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#94a3b8', stopOpacity:1}} />
        </linearGradient>
        
        {/* Letter Shadow */}
        <filter id="letterShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
        
        {/* Glow Effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default SiteSurveyorIcon;