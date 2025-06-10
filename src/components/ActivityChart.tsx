
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartData {
  day: string;
  calories: number;
  steps: number;
}

interface ActivityChartProps {
  data: ChartData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neumorphism dark:neumorphism-dark rounded-xl p-3 border-0">
          <p className="text-sm font-medium">{label}曜日</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'calories' ? 'カロリー' : '歩数'}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="neumorphism dark:neumorphism-dark rounded-3xl p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">アクティビティ概要</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'rgb(var(--muted-foreground))' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="rgb(var(--progress-calories))"
              strokeWidth={3}
              dot={{ fill: 'rgb(var(--progress-calories))', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: 'rgb(var(--progress-calories))', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="steps"
              stroke="rgb(var(--progress-steps))"
              strokeWidth={3}
              dot={{ fill: 'rgb(var(--progress-steps))', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: 'rgb(var(--progress-steps))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
