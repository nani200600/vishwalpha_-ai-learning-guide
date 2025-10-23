
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ReportData } from '../types';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => (
  <div className={`bg-white/10 dark:bg-black/10 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-white/10 p-4 shadow-lg ${className}`}>
    {children}
  </div>
);

interface SkillProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  colorGradient: string;
}

export const SkillProgressCircle: React.FC<SkillProgressCircleProps> = ({ progress, size = 80, strokeWidth = 8, colorGradient }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-300/20"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <defs>
          <linearGradient id={colorGradient} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={`stop-color-${colorGradient.split(' ')[0]}`} />
            <stop offset="100%" className={`stop-color-${colorGradient.split(' ')[1]}`} />
          </linearGradient>
          <style>{`
            .stop-color-from-pink-400 { stop-color: #F472B6; }
            .stop-color-to-red-500 { stop-color: #EF4444; }
            .stop-color-from-blue-400 { stop-color: #60A5FA; }
            .stop-color-to-indigo-500 { stop-color: #6366F1; }
            .stop-color-from-green-400 { stop-color: #4ADE80; }
            .stop-color-to-teal-500 { stop-color: #14B8A6; }
            .stop-color-from-yellow-400 { stop-color: #FBBF24; }
            .stop-color-to-orange-500 { stop-color: #F97316; }
          `}</style>
        </defs>
        <circle
          stroke={`url(#${colorGradient})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
        {progress}%
      </span>
    </div>
  );
};

interface ReportChartsProps {
    data: ReportData;
}

export const ReportCharts: React.FC<ReportChartsProps> = ({ data }) => {
    return (
        <div className="space-y-8">
            <GlassCard>
                <h3 className="text-lg font-bold text-white mb-4">Skills Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.radar}>
                        <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                        <PolarAngleAxis dataKey="subject" stroke="#fff" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0)" />
                        <Radar name="Skills" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </GlassCard>
            <GlassCard>
                <h3 className="text-lg font-bold text-white mb-4">Progress Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.bar} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 30, 30, 0.8)', border: 'none' }} />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </GlassCard>
        </div>
    );
}

export const Badge: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${className}`}>
        {children}
    </span>
);
