import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Card } from '@/components/ui/Card';
import { GapAnalysisResults } from '@/components/GapAnalysisResults';
import { LearningRoadmap } from '@/components/LearningRoadmap';
import { SkillChart } from '@/components/SkillChart';
import { MarketAnalysisCharts } from '@/components/MarketAnalysisCharts';
import { InternshipProbabilityGauge } from '@/components/InternshipProbabilityGauge';
import { GitHubAnalyzer } from '@/components/GitHubAnalyzer';
import { ResumeFeedback } from '@/components/ResumeFeedback';

interface DashboardProps {
    analysisResults: any;
    userProfile?: any;
    domain?: string; // Added domain prop
    githubUsername?: string;
    extractedSkills?: Record<string, string[]>; // Added for ResumeFeedback
}

export const ReadinessDashboard = ({ analysisResults, githubUsername, extractedSkills }: DashboardProps) => {
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
                {/* Feature C: Internship Probability Gauge */}
                <div className="flex-1">
                    <InternshipProbabilityGauge
                        score={readinessScore}
                        matchedSkillsCount={matchedSkills.length}
                        missingSkillsCount={missingSkills.length}
                    />
                </div>

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

                <div className="w-full md:w-1/3 lg:w-1/4">
                    <SkillChart matchedSkills={matchedSkills} missingSkills={missingSkills} />
                </div>
            </div>

            {/* Detailed Analysis Breakdown */}
            <GapAnalysisResults
                matchedSkills={matchedSkills}
                missingSkills={missingSkills}
                readinessScore={readinessScore}
            />

            {/* Feature B: Market Analysis Charts */}
            <MarketAnalysisCharts domain={analysisResults.domain || "Frontend Developer"} />

            {/* Feature D: GitHub Analyzer */}
            {githubUsername && <GitHubAnalyzer username={githubUsername} />}

            {/* Feature E: AI Resume Feedback */}
            {extractedSkills && (
                <ResumeFeedback
                    extractedSkills={extractedSkills}
                    matchedSkills={matchedSkills}
                />
            )}

            {/* Learning Roadmap */}
            <LearningRoadmap
                roadmap={generatedRoadmap}
                readinessScore={readinessScore}
            />
        </div>
    );
};
