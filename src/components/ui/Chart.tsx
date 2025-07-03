import React from 'react';

export function Chart() {
  // Simplified chart representation using SVG
  const data = [
    { time: '00:00', download: 20, upload: 15 },
    { time: '04:00', download: 35, upload: 25 },
    { time: '08:00', download: 45, upload: 30 },
    { time: '12:00', download: 60, upload: 40 },
    { time: '16:00', download: 80, upload: 55 },
    { time: '20:00', download: 45, upload: 35 },
    { time: '24:00', download: 25, upload: 20 }
  ];

  return (
    <div className="h-64 w-full">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-600" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Download line */}
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          points={data.map((d, i) => `${i * 60 + 20},${180 - d.download * 2}`).join(' ')}
        />
        
        {/* Upload line */}
        <polyline
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          points={data.map((d, i) => `${i * 60 + 20},${180 - d.upload * 2}`).join(' ')}
        />
        
        {/* Data points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={i * 60 + 20} cy={180 - d.download * 2} r="3" fill="#3B82F6" />
            <circle cx={i * 60 + 20} cy={180 - d.upload * 2} r="3" fill="#10B981" />
          </g>
        ))}
      </svg>
    </div>
  );
}