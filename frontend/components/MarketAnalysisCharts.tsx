import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { Card } from './ui/Card';
import { motion } from 'framer-motion';

interface MarketAnalysisProps {
    domain: string;
}

// Mock Static Data for Feature B
const MARKET_DATA = {
    "Frontend Developer": {
        topSkills: [
            { name: 'React', demand: 92, user: 80 },
            { name: 'JavaScript', demand: 95, user: 90 },
            { name: 'TypeScript', demand: 78, user: 40 },
            { name: 'Next.js', demand: 85, user: 60 },
            { name: 'Tailwind', demand: 82, user: 75 },
            { name: 'CSS', demand: 88, user: 95 },
        ],
        trends: [
            { month: 'Jan', demand: 65 },
            { month: 'Feb', demand: 68 },
            { month: 'Mar', demand: 75 },
            { month: 'Apr', demand: 72 },
            { month: 'May', demand: 80 },
            { month: 'Jun', demand: 85 },
        ]
    },
    "Backend Developer": {
        topSkills: [
            { name: 'Python', demand: 90, user: 85 },
            { name: 'Node.js', demand: 88, user: 60 },
            { name: 'SQL', demand: 92, user: 70 },
            { name: 'Docker', demand: 75, user: 30 },
            { name: 'AWS', demand: 80, user: 40 },
            { name: 'API Design', demand: 85, user: 75 },
        ],
        trends: [
            { month: 'Jan', demand: 70 },
            { month: 'Feb', demand: 72 },
            { month: 'Mar', demand: 75 },
            { month: 'Apr', demand: 82 },
            { month: 'May', demand: 85 },
            { month: 'Jun', demand: 88 },
        ]
    },
    "Data Analyst": {
        topSkills: [
            { name: 'Python', demand: 95, user: 90 },
            { name: 'SQL', demand: 90, user: 85 },
            { name: 'Excel', demand: 85, user: 80 },
            { name: 'Tableau', demand: 75, user: 20 },
            { name: 'PowerBI', demand: 70, user: 10 },
            { name: 'Statistics', demand: 80, user: 60 },
        ],
        trends: [
            { month: 'Jan', demand: 60 },
            { month: 'Feb', demand: 65 },
            { month: 'Mar', demand: 70 },
            { month: 'Apr', demand: 75 },
            { month: 'May', demand: 78 },
            { month: 'Jun', demand: 82 },
        ]
    }
};

export const MarketAnalysisCharts = ({ domain }: MarketAnalysisProps) => {
    // safe fallback
    const selectedDomain = (MARKET_DATA as any)[domain] ? domain : "Frontend Developer";
    const data = (MARKET_DATA as any)[selectedDomain];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">

            {/* Chart 1: Top Demanded Skills vs User (Comparison) */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                    <span className="mr-2">📊</span> Market Demand vs. You
                </h3>
                <p className="text-sm text-slate-400 mb-6">Comparison of top required skills for {selectedDomain}</p>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data.topSkills}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                            <YAxis dataKey="name" type="category" stroke="#f8fafc" width={80} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Legend />
                            <Bar name="Market Demand" dataKey="demand" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                            <Bar name="Your Level" dataKey="user" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Chart 2: Demand Trend (Area Chart) */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                    <span className="mr-2">📈</span> {selectedDomain} Hiring Trend
                </h3>
                <p className="text-sm text-slate-400 mb-6">6-month demand forecast index</p>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data.trends}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="demand"
                                stroke="#8b5cf6"
                                fillOpacity={1}
                                fill="url(#colorDemand)"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

        </div>
    );
};
