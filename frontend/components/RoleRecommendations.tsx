'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface RoleRecommendation {
    id: string;
    title: string;
    difficulty: string;
    description: string;
    companyTypes: string[];
    avgSalary: string;
    growthPath: string;
    requiredSkills: string[];
    preferredSkills: string[];
    fitScore: number;
    requiredMatched: string[];
    requiredMissing: string[];
    preferredMatched: string[];
    skillCoverage: string;
    status: 'Ready' | 'Stretch Goal' | 'Future';
    statusColor: string;
}

interface RoleRecommendationsProps {
    recommendations: RoleRecommendation[];
    isLoading?: boolean;
}

const difficultyColors: Record<string, string> = {
    'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusStyles: Record<string, { bg: string; text: string; icon: string }> = {
    'Ready': { bg: 'bg-green-500/20', text: 'text-green-400', icon: '✅' },
    'Stretch Goal': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: '🎯' },
    'Future': { bg: 'bg-red-500/20', text: 'text-red-400', icon: '📚' },
};

export const RoleRecommendations = ({ recommendations, isLoading }: RoleRecommendationsProps) => {
    if (isLoading) {
        return (
            <Card className="bg-slate-900/50 border-slate-800 p-8">
                <div className="flex items-center justify-center">
                    <span className="animate-spin text-2xl mr-3">⏳</span>
                    <span className="text-slate-400">Finding matching roles...</span>
                </div>
            </Card>
        );
    }

    if (!recommendations || recommendations.length === 0) {
        return (
            <Card className="bg-slate-900/50 border-slate-800 p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">No Matching Roles Found</h3>
                <p className="text-slate-400">Upload your resume to get personalized role recommendations.</p>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    💼 Recommended Roles
                </h3>
                <span className="text-sm text-slate-400">
                    {recommendations.length} roles match your profile
                </span>
            </div>

            <div className="grid gap-4">
                {recommendations.map((role, index) => {
                    const statusStyle = statusStyles[role.status] || statusStyles['Future'];
                    const difficultyColor = difficultyColors[role.difficulty] || difficultyColors['Beginner'];

                    return (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-lg font-bold text-white">
                                                {role.title}
                                            </h4>
                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColor}`}>
                                                {role.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400">{role.description}</p>
                                    </div>

                                    {/* Fit Score */}
                                    <div className="text-center ml-4">
                                        <div className={`text-2xl font-bold ${role.fitScore >= 70 ? 'text-green-400' :
                                                role.fitScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                            {role.fitScore}%
                                        </div>
                                        <div className="text-xs text-slate-500">Fit Score</div>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium mb-4 ${statusStyle.bg} ${statusStyle.text}`}>
                                    <span>{statusStyle.icon}</span>
                                    {role.status}
                                </div>

                                {/* Skills Section */}
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    {/* Required Skills */}
                                    <div>
                                        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                            Required Skills ({role.skillCoverage})
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {role.requiredSkills.map((skill, i) => {
                                                const isMatched = role.requiredMatched.includes(skill.toLowerCase()) ||
                                                    role.requiredMatched.some(m => skill.toLowerCase().includes(m));
                                                return (
                                                    <span
                                                        key={i}
                                                        className={`text-xs px-2 py-1 rounded-lg border ${isMatched
                                                                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                                                : 'bg-red-500/10 text-red-300 border-red-500/30'
                                                            }`}
                                                    >
                                                        {isMatched ? '✓' : '✗'} {skill}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Preferred Skills */}
                                    <div>
                                        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                            Nice to Have
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {role.preferredSkills.map((skill, i) => {
                                                const isMatched = role.preferredMatched.includes(skill.toLowerCase()) ||
                                                    role.preferredMatched.some(m => skill.toLowerCase().includes(m));
                                                return (
                                                    <span
                                                        key={i}
                                                        className={`text-xs px-2 py-1 rounded-lg border ${isMatched
                                                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                                                : 'bg-slate-700/50 text-slate-400 border-slate-600/50'
                                                            }`}
                                                    >
                                                        {isMatched && '✓ '}{skill}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="pt-4 border-t border-slate-700/50 grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <div className="text-slate-500 text-xs">Salary Range</div>
                                        <div className="text-slate-300">{role.avgSalary}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 text-xs">Company Types</div>
                                        <div className="text-slate-300">{role.companyTypes.slice(0, 2).join(', ')}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 text-xs">Growth Path</div>
                                        <div className="text-slate-300 truncate" title={role.growthPath}>
                                            {role.growthPath.split('→')[0]}→...
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Ready to Apply
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Stretch Goal
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Build Skills First
                </span>
            </div>
        </div>
    );
};
