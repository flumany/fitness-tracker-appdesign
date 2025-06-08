
import React, { useState, useEffect } from 'react';
import { Activity, Zap, Target, Calendar, Timer, TrendingUp } from 'lucide-react';
import ProgressRing from '@/components/ProgressRing';
import StatCard from '@/components/StatCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import WorkoutTimer from '@/components/WorkoutTimer';
import ActivityChart from '@/components/ActivityChart';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'workout' | 'stats'>('dashboard');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Sample data
  const chartData = [
    { day: 'Mon', calories: 420, steps: 8500 },
    { day: 'Tue', calories: 380, steps: 7200 },
    { day: 'Wed', calories: 520, steps: 12000 },
    { day: 'Thu', calories: 440, steps: 9300 },
    { day: 'Fri', calories: 600, steps: 15000 },
    { day: 'Sat', calories: 350, steps: 6800 },
    { day: 'Sun', calories: 480, steps: 10500 },
  ];

  const handleStartWorkout = () => {
    setCurrentView('workout');
    setIsWorkoutActive(true);
  };

  const handleStopWorkout = () => {
    setIsWorkoutActive(false);
    setCurrentView('dashboard');
    // Trigger confetti animation on workout completion
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const toggleWorkout = () => {
    setIsWorkoutActive(!isWorkoutActive);
  };

  // Confetti effect component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 gradient-primary animate-confetti"
          style={{
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
            animationDuration: 3 + Math.random() * 2 + 's',
          }}
        />
      ))}
    </div>
  );

  if (currentView === 'workout') {
    return (
      <WorkoutTimer
        isActive={isWorkoutActive}
        onToggle={toggleWorkout}
        onStop={handleStopWorkout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold gradient-text">FitTracker</h1>
          <p className="text-sm text-muted-foreground">Let's crush your goals today!</p>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                currentView === 'dashboard' 
                  ? 'gradient-primary text-white' 
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('stats')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                currentView === 'stats' 
                  ? 'gradient-primary text-white' 
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              Stats
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 pb-20">
        {currentView === 'dashboard' && (
          <>
            {/* Main Progress Ring */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <ProgressRing
                  progress={75}
                  size={280}
                  strokeWidth={20}
                  color="rgb(var(--progress-steps))"
                  label="Steps"
                  value="12,847"
                  unit="steps"
                />
                <div className="absolute inset-0" style={{ transform: 'scale(0.75)' }}>
                  <ProgressRing
                    progress={60}
                    size={280}
                    strokeWidth={20}
                    color="rgb(var(--progress-calories))"
                    label="Calories"
                    value="2,340"
                    unit="kcal"
                  />
                </div>
                <div className="absolute inset-0" style={{ transform: 'scale(0.5)' }}>
                  <ProgressRing
                    progress={90}
                    size={280}
                    strokeWidth={20}
                    color="rgb(var(--progress-distance))"
                    label="Distance"
                    value="8.4"
                    unit="km"
                  />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Active Minutes"
                value="94"
                unit="min"
                progress={78}
                icon={<Timer size={24} />}
                trend="up"
                trendValue="12%"
              />
              <StatCard
                title="Heart Rate"
                value="146"
                unit="bpm"
                icon={<Activity size={24} />}
                trend="neutral"
              />
              <StatCard
                title="Workout Streak"
                value="7"
                unit="days"
                icon={<Target size={24} />}
                trend="up"
                trendValue="2"
              />
              <StatCard
                title="Energy Burned"
                value="2,340"
                unit="kcal"
                progress={85}
                icon={<Zap size={24} />}
                trend="up"
                trendValue="156"
              />
            </div>

            {/* Activity Chart */}
            <ActivityChart data={chartData} />
          </>
        )}

        {currentView === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold gradient-text">Statistics</h2>
            
            {/* Weekly Overview */}
            <div className="neumorphism dark:neumorphism-dark rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp size={20} />
                <span>Weekly Overview</span>
              </h3>
              <div className="grid grid-cols-7 gap-3">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                  const intensity = Math.random();
                  return (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{day}</div>
                      <div 
                        className="w-8 h-8 rounded-xl mx-auto transition-all duration-300 hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, 
                            rgba(var(--gradient-start), ${intensity}) 0%, 
                            rgba(var(--gradient-end), ${intensity}) 100%)`
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Goals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="neumorphism dark:neumorphism-dark rounded-3xl p-6">
                <div className="text-center">
                  <div className="text-huge font-black gradient-text">85%</div>
                  <div className="text-sm text-muted-foreground">Monthly Goal</div>
                  <div className="mt-2 w-full bg-muted rounded-full h-2">
                    <div className="gradient-primary h-2 rounded-full w-[85%]" />
                  </div>
                </div>
              </div>
              
              <div className="neumorphism dark:neumorphism-dark rounded-3xl p-6">
                <div className="text-center">
                  <div className="text-huge font-black gradient-text">23</div>
                  <div className="text-sm text-muted-foreground">Workouts This Month</div>
                </div>
              </div>
              
              <div className="neumorphism dark:neumorphism-dark rounded-3xl p-6">
                <div className="text-center">
                  <div className="text-huge font-black gradient-text">7.2</div>
                  <div className="text-sm text-muted-foreground">Avg Daily Hours</div>
                </div>
              </div>
            </div>

            <ActivityChart data={chartData} />
          </div>
        )}
      </div>

      <FloatingActionButton onClick={handleStartWorkout} />
    </div>
  );
};

export default Index;
