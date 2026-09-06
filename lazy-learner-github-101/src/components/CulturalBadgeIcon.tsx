import React from 'react';

interface CulturalBadgeIconProps {
  type: 'wau' | 'hornbill' | 'hibiscus' | 'kopitiam' | 'rafflesia' | 'keris';
  size?: number;
  className?: string;
}

export const CulturalBadgeIcon: React.FC<CulturalBadgeIconProps> = ({
  type,
  size = 44,
  className = '',
}) => {
  switch (type) {
    case 'wau':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="28" fill="#FFF3D1" stroke="#FDCB6E" strokeWidth="3" />
          {/* Wau Bulan Top Wings */}
          <path
            d="M32 10 C46 18, 54 26, 32 36 C10 26, 18 18, 32 10 Z"
            fill="#FF5E3A"
            stroke="#1E242B"
            strokeWidth="2"
          />
          {/* Wau Bulan Crescent Bottom Tail */}
          <path
            d="M16 44 C24 38, 40 38, 48 44 C42 52, 22 52, 16 44 Z"
            fill="#00B894"
            stroke="#1E242B"
            strokeWidth="2"
          />
          {/* Center Spine */}
          <line x1="32" y1="8" x2="32" y2="54" stroke="#FDCB6E" strokeWidth="2.5" />
          <circle cx="32" cy="24" r="3" fill="#FDCB6E" />
        </svg>
      );

    case 'hibiscus':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="28" fill="#FFE8E5" stroke="#FF5E3A" strokeWidth="3" />
          {/* 5 Hibiscus Petals (Bunga Raya) */}
          <circle cx="32" cy="18" r="9" fill="#FF5E3A" />
          <circle cx="45" cy="27" r="9" fill="#FF5E3A" />
          <circle cx="40" cy="42" r="9" fill="#FF5E3A" />
          <circle cx="24" cy="42" r="9" fill="#FF5E3A" />
          <circle cx="19" cy="27" r="9" fill="#FF5E3A" />
          {/* Yellow Stamen Center */}
          <circle cx="32" cy="31" r="6" fill="#FDCB6E" />
          <path d="M32 31 L39 20" stroke="#FDCB6E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="19" r="2.5" fill="#FF5E3A" />
        </svg>
      );

    case 'hornbill':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="28" fill="#E6F9F5" stroke="#00B894" strokeWidth="3" />
          <circle cx="28" cy="34" r="14" fill="#1E242B" />
          <path d="M26 20 C38 14, 48 18, 42 26 Z" fill="#FF5E3A" />
          <path d="M36 26 C52 26, 56 34, 52 40 C44 37, 36 36, 34 34 Z" fill="#FDCB6E" />
          <circle cx="30" cy="32" r="3" fill="#FFFFFF" />
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="28" fill="#FEF9E7" stroke="#F39C12" strokeWidth="3" />
          <polygon
            points="32,14 37,25 49,26 40,34 43,46 32,39 21,46 24,34 15,26 27,25"
            fill="#FDCB6E"
            stroke="#D49B2A"
            strokeWidth="2"
          />
        </svg>
      );
  }
};
