import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Card } from '@/components/ui/Card';
import { GapAnalysisResults } from '@/components/GapAnalysisResults';
import { LearningRoadmap } from '@/components/LearningRoadmap';

interface DashboardProps {
    analysisResults: any;
    userProfile?: any;
}

export const ReadinessDashboard = ({ analysisResults }: DashboardProps) => {
    if (!analysisResults) return null;

    const { readinessScore, matchedSkills, missingSkills, generatedRoadmap, totalMarketSkills } = analysisResults;

    // Determine readiness level text and color
    const getReadinessLevel = (score: number) => {
        if (score >= 80) return { text: "Market Ready 🚀", color: "text-green-400" };
        if (score >= 60) return { text: "Almost There 👍", color: "text-blue-400" };
        if (score >= 40) return { text: "Good Start 🌱", color: "text-yellow-400" };
        return { text: "Needs Work 📚", color: "text-red-400" };
    };

    const status = getReadinessLevel(readinessScore);

    return (
        <div className="animate-fade-in pb-12">
            {/* Hero Score Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <Card className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
                    <h2 className="text-lg text-gray-400 font-medium mb-6 uppercase tracking-wider">Internship Readiness Score</h2>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ProgressRing progress={readinessScore} size={200} strokeWidth={16} />
                    </motion.div>
                    <div className={`mt-6 text-2xl font-bold ${status.color}`}>
                        {status.text}
                    </div>
                    <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                        Based on analysis of {totalMarketSkills}+ current job market skills in Bangladesh
                    </p>
                </Card>

                <Card className="flex-1 p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-6">Reality Check 🧐</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Skills Matched</span>
                                <span className="text-white font-bold">{matchedSkills.length}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min((matchedSkills.length / (matchedSkills.length + missingSkills.length)) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Skills Missing</span>
                                <span className="text-white font-bold">{missingSkills.length}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min((missingSkills.length / (matchedSkills.length + missingSkills.length)) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                You have <span className="text-green-400 font-bold">{matchedSkills.length}</span> strong skills, but adding the top <span className="text-red-400 font-bold">3</span> missing skills could boost your score by <span className="text-accent-400 font-bold">~15%</span>.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Detailed Analysis Breakdown */}
            <GapAnalysisResults
                matchedSkills={matchedSkills}
                missingSkills={missingSkills}
                readinessScore={readinessScore}
            />

            {/* Learning Roadmap */}
            <LearningRoadmap
                roadmap={generatedRoadmap}
                readinessScore={readinessScore}
            />
        </div>
    );
};
