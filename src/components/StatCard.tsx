
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  progress?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  progress,
  icon,
  trend = 'neutral',
  trendValue
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="neumorphism dark:neumorphism-dark rounded-3xl p-6 transition-all duration-300 hover:scale-105 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-white">
          {icon}
        </div>
        {trendValue && (
          <div className={`text-sm font-semibold ${getTrendColor()}`}>
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-4xl font-black text-foreground animate-count-up">
            {value}
          </span>
          <span className="text-lg font-medium text-muted-foreground">
            {unit}
          </span>
        </div>
        
        {progress && (
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {progress}% of goal
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
