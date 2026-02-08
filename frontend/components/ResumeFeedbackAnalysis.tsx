'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface SoftSkill {
    found: boolean;
    evidence: string[];
    strength: string;
}

interface ActionVerbCategory {
    count: number;
    examples: string[];
}

interface BulletQuality {
    text: string;
    score: number;
    issues: string[];
    hasMetrics: boolean;
}

interface ResumeFeedbackAnalysisProps {
    analysis: {
        overallScore: number;
        qualityLevel: string;
        qualityMessage: string;
        sections: {
            actionVerbs: {
                score: number;
                totalFound: number;
                byCategory: Record<string, ActionVerbCategory>;
                weakCategories: string[];
                feedback: string[];
            };
            softSkills: {
                score: number;
                totalDetected: number;
                totalPossible: number;
                skills: Record<string, SoftSkill>;
                feedback: string[];
            };
            quantifiedAchievements: {
                score: number;
                totalFound: number;
                metrics: { type: string; value: string }[];
                feedback: string[];
            };
            bulletPoints: {
                totalBullets: number;
                overallScore: number;
                quality: BulletQuality[];
                feedback: string[];
            };
        };
        topPriorities: string[];
    };
    isLoading?: boolean;
}

const qualityColors: Record<string, string> = {
    'Excellent': 'from-green-500 to-emerald-500',
    'Good': 'from-blue-500 to-cyan-500',
    'Needs Work': 'from-yellow-500 to-orange-500',
    'Weak': 'from-red-500 to-pink-500',
};

const ScoreCircle = ({ score, label, size = 'md' }: { score: number; label: string; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        sm: 'w-16 h-16 text-lg',
        md: 'w-20 h-20 text-xl',
        lg: 'w-28 h-28 text-3xl',
    };

    const color = score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="flex flex-col items-center">
            <div className={`${sizeClasses[size]} rounded-full border-4 ${score >= 70 ? 'border-green-500/50' : score >= 50 ? 'border-yellow-500/50' : 'border-red-500/50'
                } bg-slate-800/50 flex items-center justify-center`}>
                <span className={`font-bold ${color}`}>{score}%</span>
            </div>
            <span className="text-xs text-slate-400 mt-1">{label}</span>
        </div>
    );
};

export const ResumeFeedbackAnalysis = ({ analysis, isLoading }: ResumeFeedbackAnalysisProps) => {
    if (isLoading) {
        return (
            <Card className="bg-slate-900/50 border-slate-800 p-8">
                <div className="flex items-center justify-center">
                    <span className="animate-spin text-2xl mr-3">⏳</span>
                    <span className="text-slate-400">Analyzing resume quality...</span>
                </div>
            </Card>
        );
    }

    if (!analysis) {
        return null;
    }

    const { sections } = analysis;
    const gradientColor = qualityColors[analysis.qualityLevel] || qualityColors['Good'];

    return (
        <div className="space-y-6">
            {/* Overall Score Card */}
            <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                                📝 Resume Quality Analysis
                            </h3>
                            <p className="text-slate-300">{analysis.qualityMessage}</p>
                        </div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="text-center"
                        >
                            <div className={`text-5xl font-bold bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}>
                                {analysis.overallScore}%
                            </div>
                            <div className="text-sm text-slate-400">{analysis.qualityLevel}</div>
                        </motion.div>
                    </div>
                </div>

                {/* Score Breakdown */}
                <div className="p-6 grid grid-cols-4 gap-4">
                    <ScoreCircle score={sections.actionVerbs.score} label="Action Verbs" />
                    <ScoreCircle score={sections.softSkills.score} label="Soft Skills" />
                    <ScoreCircle score={sections.quantifiedAchievements.score} label="Metrics" />
                    <ScoreCircle score={sections.bulletPoints.overallScore} label="Bullets" />
                </div>
            </Card>

            {/* Top Priorities */}
            <Card className="bg-slate-900/50 border-slate-800">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🎯 Top Priorities
                </h4>
                <div className="space-y-2">
                    {analysis.topPriorities.map((priority, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
                        >
                            <span className="text-yellow-400 font-bold">{i + 1}</span>
                            <span className="text-slate-200">{priority}</span>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Soft Skills Section */}
            <Card className="bg-slate-900/50 border-slate-800">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🧠 Soft Skills ({sections.softSkills.totalDetected}/{sections.softSkills.totalPossible})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {Object.entries(sections.softSkills.skills).map(([skill, data]) => (
                        <div
                            key={skill}
                            className={`p-3 rounded-lg border text-center ${data.found
                                    ? 'bg-green-500/10 border-green-500/30'
                                    : 'bg-slate-800/50 border-slate-700/50'
                                }`}
                        >
                            <div className={`text-lg mb-1 ${data.found ? 'text-green-400' : 'text-slate-500'}`}>
                                {data.found ? '✓' : '○'}
                            </div>
                            <div className={`text-sm font-medium capitalize ${data.found ? 'text-green-300' : 'text-slate-400'}`}>
                                {skill.replace('_', ' ')}
                            </div>
                            <div className="text-xs text-slate-500">{data.strength}</div>
                        </div>
                    ))}
                </div>
                <div className="space-y-2">
                    {sections.softSkills.feedback.map((tip, i) => (
                        <div key={i} className="text-sm text-slate-300 p-2 rounded bg-slate-800/30">
                            {tip}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Action Verbs Section */}
            <Card className="bg-slate-900/50 border-slate-800">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    ⚡ Action Verbs ({sections.actionVerbs.totalFound} found)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {Object.entries(sections.actionVerbs.byCategory).map(([category, data]) => (
                        <div key={category} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-300 capitalize">{category}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${data.count >= 2 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {data.count}
                                </span>
                            </div>
                            {data.examples.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {data.examples.map((verb, i) => (
                                        <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-700/50 text-slate-400">
                                            {verb}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="space-y-2">
                    {sections.actionVerbs.feedback.map((tip, i) => (
                        <div key={i} className="text-sm text-slate-300 p-2 rounded bg-slate-800/30">
                            {tip}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Quantified Achievements */}
            <Card className="bg-slate-900/50 border-slate-800">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📊 Quantified Achievements ({sections.quantifiedAchievements.totalFound} found)
                </h4>
                {sections.quantifiedAchievements.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {sections.quantifiedAchievements.metrics.map((metric, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 text-sm border border-cyan-500/30">
                                {metric.type}: {metric.value}
                            </span>
                        ))}
                    </div>
                )}
                <div className="space-y-2">
                    {sections.quantifiedAchievements.feedback.map((tip, i) => (
                        <div key={i} className="text-sm text-slate-300 p-2 rounded bg-slate-800/30">
                            {tip}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
