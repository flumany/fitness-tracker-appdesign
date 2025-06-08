
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';

interface WorkoutTimerProps {
  isActive: boolean;
  onToggle: () => void;
  onStop: () => void;
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ isActive, onToggle, onStop }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen gradient-primary flex flex-col items-center justify-center text-white ${isActive ? 'pulse-slow' : ''}`}>
      <div className="text-center space-y-8">
        <h2 className="text-2xl font-semibold opacity-90">Workout Timer</h2>
        
        <div className="text-huge font-black animate-count-up">
          {formatTime(time)}
        </div>
        
        <div className="flex space-x-6">
          <button
            onClick={onToggle}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 active:scale-95 transition-all duration-200"
          >
            {isActive ? <Pause size={32} /> : <Play size={32} />}
          </button>
          
          <button
            onClick={onStop}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 active:scale-95 transition-all duration-200"
          >
            <Square size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;
