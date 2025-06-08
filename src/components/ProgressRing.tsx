
import React from 'react';

interface ProgressRingProps {
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
  backgroundColor?: string;
  label: string;
  value: string;
  unit: string;
  showText?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size,
  strokeWidth,
  color,
  backgroundColor = "rgb(var(--muted))",
  label,
  value,
  unit,
  showText = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.2}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-huge font-black gradient-text animate-count-up">
            {value}
          </div>
          <div className="text-sm font-medium text-muted-foreground -mt-2">
            {unit}
          </div>
          <div className="text-xs font-medium text-muted-foreground mt-1">
            {label}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
