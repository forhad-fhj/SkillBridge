import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';

interface InternshipProbabilityGaugeProps {
    score: number;
    matchedSkillsCount: number;
    missingSkillsCount: number;
}

export const InternshipProbabilityGauge = ({ score, matchedSkillsCount, missingSkillsCount }: InternshipProbabilityGaugeProps) => {
    // Calculate a "Probability" slightly different from raw readiness to be motivating
    // e.g. if > 80, probability is very high.
    // We can add some logic: Base score + (matched * 2) capped at 98%
    const probability = Math.min(Math.round(score + (matchedSkillsCount * 1.5)), 98);

    // Color logic
    const getColor = (val: number) => {
        if (val < 40) return '#ef4444'; // red
        if (val < 70) return '#eab308'; // yellow
        return '#22c55e'; // green
    };

    const strokeColor = getColor(probability);
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    // Semi-circle (50% of circumference)
    const offset = circumference - ((probability / 100) * (circumference / 2));

    return (
        <Card className="flex flex-col items-center justify-center p-8 bg-slate-900/50 border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2 text-2xl">🎯</span> Internship Probability
            </h3>

            <div className="relative w-64 h-32 flex justify-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 100">
                    {/* Background Arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="20"
                        strokeLinecap="round"
                    />

                    {/* Probability Arc */}
                    <motion.path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeDasharray={`${circumference / 2} ${circumference}`}
                        strokeDashoffset={circumference / 2} // Start hidden
                        animate={{ strokeDashoffset: circumference - ((probability / 100) * (circumference / 2)) }}
                        initial={{ strokeDashoffset: circumference / 2 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>

                {/* Text Override */}
                <div className="absolute bottom-0 flex flex-col items-center">
                    <motion.span
                        className="text-5xl font-bold text-white tabular-nums tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {probability}%
                    </motion.span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Chance</span>
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-slate-300 text-sm">
                    {probability > 80 ? "You're in the top candidate tier! 🌟" :
                        probability > 50 ? "You're getting close. Focus on critical skills." :
                            "Significant skill gaps detected. Start learning! 📚"}
                </p>
                <div className="flex justify-center gap-4 mt-4 text-xs font-mono text-slate-500">
                    <span>Matches: {matchedSkillsCount}</span>
                    <span>•</span>
                    <span>Missing: {missingSkillsCount}</span>
                </div>
            </div>
        </Card>
    );
};
