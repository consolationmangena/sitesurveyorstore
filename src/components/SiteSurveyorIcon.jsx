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
      {/* Background Circle with Gradient */}
      <circle cx="32" cy="32" r="30" fill="url(#backgroundGradient)" stroke="url(#borderGradient)" strokeWidth="2"/>
      
      {/* Main Survey Equipment (Theodolite/Total Station) */}
      <g transform="translate(32, 20)">
        {/* Tripod Base */}
        <path d="M-8 20 L-4 12 L4 12 L8 20 Z" fill="url(#metalGradient)" stroke="#2563eb" strokeWidth="0.5"/>
        
        {/* Instrument Body */}
        <rect x="-6" y="8" width="12" height="8" rx="2" fill="url(#instrumentGradient)" stroke="#1e40af" strokeWidth="0.5"/>
        
        {/* Telescope */}
        <rect x="-8" y="10" width="16" height="3" rx="1.5" fill="url(#telescopeGradient)" stroke="#1e40af" strokeWidth="0.5"/>
        
        {/* Eyepiece */}
        <circle cx="8" cy="11.5" r="1.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5"/>
        
        {/* Level Bubble */}
        <ellipse cx="0" cy="6" rx="3" ry="1" fill="#10b981" opacity="0.8"/>
        <ellipse cx="0" cy="6" rx="1" ry="0.5" fill="#ffffff" opacity="0.9"/>
      </g>
      
      {/* GPS Satellite Signals */}
      <g opacity="0.7">
        {/* Satellite 1 */}
        <circle cx="12" cy="12" r="2" fill="#fbbf24"/>
        <path d="M12 12 L20 20" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" opacity="0.6"/>
        
        {/* Satellite 2 */}
        <circle cx="52" cy="16" r="2" fill="#fbbf24"/>
        <path d="M52 16 L44 24" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" opacity="0.6"/>
        
        {/* Satellite 3 */}
        <circle cx="48" cy="48" r="2" fill="#fbbf24"/>
        <path d="M48 48 L40 40" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" opacity="0.6"/>
      </g>
      
      {/* Coordinate Grid */}
      <g opacity="0.3" stroke="#2563eb" strokeWidth="0.5">
        {/* Vertical Lines */}
        <line x1="16" y1="8" x2="16" y2="56"/>
        <line x1="24" y1="8" x2="24" y2="56"/>
        <line x1="40" y1="8" x2="40" y2="56"/>
        <line x1="48" y1="8" x2="48" y2="56"/>
        
        {/* Horizontal Lines */}
        <line x1="8" y1="16" x2="56" y2="16"/>
        <line x1="8" y1="24" x2="56" y2="24"/>
        <line x1="8" y1="40" x2="56" y2="40"/>
        <line x1="8" y1="48" x2="56" y2="48"/>
      </g>
      
      {/* Compass Rose */}
      <g transform="translate(48, 48)" opacity="0.8">
        {/* Compass Circle */}
        <circle cx="0" cy="0" r="6" fill="none" stroke="#dc2626" strokeWidth="1"/>
        
        {/* North Arrow */}
        <path d="M0 -6 L2 -2 L0 0 L-2 -2 Z" fill="#dc2626"/>
        
        {/* Cardinal Points */}
        <text x="0" y="-8" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fontWeight="bold" fill="#dc2626">N</text>
      </g>
      
      {/* Data Points/Markers */}
      <g fill="#10b981" opacity="0.8">
        <circle cx="20" cy="44" r="1.5"/>
        <circle cx="28" cy="36" r="1.5"/>
        <circle cx="36" cy="28" r="1.5"/>
        <circle cx="44" cy="36" r="1.5"/>
      </g>
      
      {/* Connecting Lines (Survey Lines) */}
      <g stroke="#10b981" strokeWidth="1" opacity="0.6">
        <line x1="20" y1="44" x2="28" y2="36"/>
        <line x1="28" y1="36" x2="36" y2="28"/>
        <line x1="36" y1="28" x2="44" y2="36"/>
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
        
        {/* Metal Gradient */}
        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#e5e7eb', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#d1d5db', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#9ca3af', stopOpacity:1}} />
        </linearGradient>
        
        {/* Instrument Gradient */}
        <linearGradient id="instrumentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#d97706', stopOpacity:1}} />
        </linearGradient>
        
        {/* Telescope Gradient */}
        <linearGradient id="telescopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#374151', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#1f2937', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#111827', stopOpacity:1}} />
        </linearGradient>
        
        {/* Drop Shadow Filter */}
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
      </defs>
    </svg>
  );
};

export default SiteSurveyorIcon;