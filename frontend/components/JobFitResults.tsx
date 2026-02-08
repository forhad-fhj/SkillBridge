'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface Resource {
    title: string;
    url: string;
    platform?: string;
    difficulty?: string;
    duration?: string;
}

interface MissingSkillWithResources {
    skill: string;
    resources: Resource[];
}

interface ATSScore {
    overallScore: number;
    breakdown: {
        keywordMatch: number;
        actionVerbs: number;
        impactWords: number;
        quantifiableResults: number;
    };
    tips: string[];
}

interface JobFitResultsProps {
    results: {
        matchPercentage: number;
        fitLevel: string;
        fitColor: string;
        fitMessage: string;
        matchedSkills: string[];
        matchedCount: number;
        missingSkills: string[];
        missingCount: number;
        missingWithResources: MissingSkillWithResources[];
        extraSkills: string[];
        extraCount: number;
        jdSkillCount: number;
        atsScore?: ATSScore;
    };
    onReset?: () => void;
}

const fitColors: Record<string, string> = {
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    yellow: 'from-yellow-500 to-orange-500',
    red: 'from-red-500 to-pink-500',
};

const fitBgColors: Record<string, string> = {
    green: 'bg-green-500/10 border-green-500/30',
    blue: 'bg-blue-500/10 border-blue-500/30',
    yellow: 'bg-yellow-500/10 border-yellow-500/30',
    red: 'bg-red-500/10 border-red-500/30',
};

export const JobFitResults = ({ results, onReset }: JobFitResultsProps) => {
    const gradientColor = fitColors[results.fitColor] || fitColors.blue;
    const bgColor = fitBgColors[results.fitColor] || fitBgColors.blue;

    return (
        <div className="space-y-6">
            {/* Main Score Card */}
            <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                {/* Header with Score */}
                <div className={`p-6 border-b border-slate-700/50 ${bgColor}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Job Fit Analysis</h3>
                            <p className="text-slate-300">{results.fitMessage}</p>
                        </div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="text-center"
                        >
                            <div className={`text-5xl font-bold bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}>
                                {results.matchPercentage}%
                            </div>
                            <div className="text-sm text-slate-400 mt-1">{results.fitLevel} Match</div>
                        </motion.div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="p-6 grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="text-3xl font-bold text-green-400">{results.matchedCount}</div>
                        <div className="text-sm text-slate-400">Matched Skills</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div className="text-3xl font-bold text-red-400">{results.missingCount}</div>
                        <div className="text-sm text-slate-400">Missing Skills</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <div className="text-3xl font-bold text-blue-400">{results.extraCount}</div>
                        <div className="text-sm text-slate-400">Extra Skills</div>
                    </div>
                </div>
            </Card>

            {/* Matched Skills */}
            {results.matchedSkills.length > 0 && (
                <Card className="bg-slate-900/50 border-slate-800">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        ✅ Matched Skills ({results.matchedCount})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {results.matchedSkills.map((skill, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03 }}
                                className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 text-sm font-medium"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </Card>
            )}

            {/* Missing Skills with Resources */}
            {results.missingWithResources.length > 0 && (
                <Card className="bg-slate-900/50 border-slate-800">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        ❌ Missing Skills ({results.missingCount})
                    </h4>
                    <div className="space-y-3">
                        {results.missingWithResources.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-red-300">{item.skill}</span>
                                    <span className="text-xs text-slate-500">Required</span>
                                </div>
                                {item.resources.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.resources.map((res, j) => (
                                            <a
                                                key={j}
                                                href={res.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs px-2 py-1 rounded-md bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                                            >
                                                📚 {res.platform || 'Learn'}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Extra Skills */}
            {results.extraSkills.length > 0 && (
                <Card className="bg-slate-900/50 border-slate-800">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        ➕ Your Extra Skills ({results.extraCount})
                    </h4>
                    <p className="text-sm text-slate-400 mb-3">
                        Skills you have that aren't listed in the JD—these could still be valuable!
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {results.extraSkills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600/50 text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </Card>
            )}

            {/* ATS Score */}
            {results.atsScore && (
                <Card className="bg-slate-900/50 border-slate-800">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        🤖 ATS Compatibility Score
                    </h4>

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Overall ATS Score</span>
                            <span className="text-2xl font-bold text-cyan-400">{results.atsScore.overallScore}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${results.atsScore.overallScore}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {Object.entries(results.atsScore.breakdown).map(([key, value]) => (
                            <div key={key} className="p-3 rounded-lg bg-slate-800/50">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-slate-400 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <span className="text-sm font-medium text-slate-200">{value}%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-1.5">
                                    <div
                                        className="h-1.5 rounded-full bg-cyan-500"
                                        style={{ width: `${value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {results.atsScore.tips.length > 0 && (
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                            <h5 className="text-sm font-semibold text-yellow-300 mb-2">💡 Improvement Tips</h5>
                            <ul className="space-y-1">
                                {results.atsScore.tips.map((tip, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                        <span className="text-yellow-400">•</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Card>
            )}

            {/* Reset Button */}
            {onReset && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onReset}
                    className="w-full py-3 px-6 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all border border-slate-700"
                >
                    ← Analyze Another Job Description
                </motion.button>
            )}
        </div>
    );
};
