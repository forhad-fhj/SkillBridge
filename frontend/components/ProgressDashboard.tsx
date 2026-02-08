'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useEffect, useState } from 'react';

interface ProgressData {
    id: string;
    readinessScore: number;
    skillCount: number;
    domain: string | null;
    date: string;
}

interface ProgressStats {
    totalAnalyses: number;
    averageScore: number;
    highestScore: number;
}

interface ProgressDashboardProps {
    isLoggedIn?: boolean;
    onSignIn?: () => void;
}

export const ProgressDashboard = ({ isLoggedIn, onSignIn }: ProgressDashboardProps) => {
    const [history, setHistory] = useState<ProgressData[]>([]);
    const [stats, setStats] = useState<ProgressStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoggedIn) {
            setIsLoading(false);
            return;
        }

        const fetchProgress = async () => {
            try {
                const response = await fetch('/api/progress');
                if (!response.ok) throw new Error('Failed to fetch progress');
                const data = await response.json();
                setHistory(data.history || []);
                setStats(data.stats || null);
            } catch (err) {
                setError('Could not load progress data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProgress();
    }, [isLoggedIn]);

    // Format data for chart
    const chartData = history.slice().reverse().map((item, index) => ({
        name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: item.readinessScore,
        skills: item.skillCount
    }));

    if (!isLoggedIn) {
        return (
            <Card className="bg-slate-900/50 border-slate-800">
                <div className="text-center py-8">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-bold text-white mb-2">Track Your Progress</h3>
                    <p className="text-slate-400 mb-4">Sign in to save your analyses and track improvement over time</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onSignIn}
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium"
                    >
                        Sign In to Start Tracking
                    </motion.button>
                </div>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card className="bg-slate-900/50 border-slate-800 p-8">
                <div className="flex items-center justify-center">
                    <span className="animate-spin text-2xl mr-3">⏳</span>
                    <span className="text-slate-400">Loading your progress...</span>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-slate-900/50 border-slate-800 p-8 text-center">
                <div className="text-red-400">{error}</div>
            </Card>
        );
    }

    if (history.length === 0) {
        return (
            <Card className="bg-slate-900/50 border-slate-800">
                <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Progress Yet</h3>
                    <p className="text-slate-400">Complete your first resume analysis to start tracking your progress!</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400">
                                {stats?.totalAnalyses || 0}
                            </div>
                            <div className="text-sm text-slate-400">Total Analyses</div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">
                                {stats?.averageScore || 0}%
                            </div>
                            <div className="text-sm text-slate-400">Average Score</div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400">
                                {stats?.highestScore || 0}%
                            </div>
                            <div className="text-sm text-slate-400">Highest Score</div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Progress Chart */}
            <Card className="bg-slate-900/50 border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📈 Readiness Score Trend
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="#22d3ee"
                                strokeWidth={2}
                                fill="url(#scoreGradient)"
                                name="Readiness Score"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Recent Analyses */}
            <Card className="bg-slate-900/50 border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📋 Recent Analyses
                </h3>
                <div className="space-y-3">
                    {history.slice(0, 5).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                        >
                            <div>
                                <div className="text-white font-medium">
                                    {item.domain || 'General Analysis'}
                                </div>
                                <div className="text-sm text-slate-400">
                                    {new Date(item.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm text-slate-500">Skills</div>
                                    <div className="text-white font-medium">{item.skillCount}</div>
                                </div>
                                <div className={`text-2xl font-bold ${item.readinessScore >= 70 ? 'text-green-400' :
                                        item.readinessScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                                    }`}>
                                    {item.readinessScore}%
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
