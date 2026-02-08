'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { GapAnalysisResults } from '@/components/GapAnalysisResults';
import { LearningRoadmap } from '@/components/LearningRoadmap';
import { SkillChart } from '@/components/SkillChart';
import { MarketAnalysisCharts } from '@/components/MarketAnalysisCharts';
import { InternshipProbabilityGauge } from '@/components/InternshipProbabilityGauge';
import { GitHubAnalyzer } from '@/components/GitHubAnalyzer';
import { ResumeFeedback } from '@/components/ResumeFeedback';
import { AnimatedScore } from '@/components/AnimatedScore';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { JobFitResults } from '@/components/JobFitResults';
import { RoleRecommendations } from '@/components/RoleRecommendations';
import { ResumeFeedbackAnalysis } from '@/components/ResumeFeedbackAnalysis';
import { pythonClient } from '@/lib/api/pythonClient';

interface DashboardProps {
    analysisResults: any;
    userProfile?: any;
    domain?: string;
    githubUsername?: string;
    extractedSkills?: Record<string, string[]>;
    resumeText?: string;
}

export const ReadinessDashboard = ({ analysisResults, githubUsername, extractedSkills, resumeText }: DashboardProps) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'jobfit' | 'roles' | 'feedback'>('overview');
    const [isLoadingJobFit, setIsLoadingJobFit] = useState(false);
    const [jobFitResults, setJobFitResults] = useState<any>(null);
    const [roleRecommendations, setRoleRecommendations] = useState<any[]>([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(false);
    const [resumeFeedback, setResumeFeedback] = useState<any>(null);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

    if (!analysisResults) return null;

    const { readinessScore, matchedSkills, missingSkills, generatedRoadmap, totalMarketSkills } = analysisResults;

    // Handler for Job Fit Analysis
    const handleAnalyzeJobFit = async (jobDescription: string) => {
        setIsLoadingJobFit(true);
        try {
            const result = await pythonClient.analyzeJobFit(
                extractedSkills || {},
                jobDescription,
                resumeText,
                analysisResults.domain
            );
            setJobFitResults(result);
        } catch (error) {
            console.error('Job fit analysis error:', error);
            alert('Failed to analyze job fit. Please try again.');
        } finally {
            setIsLoadingJobFit(false);
        }
    };

    // Load role recommendations
    const loadRoleRecommendations = async () => {
        if (roleRecommendations.length > 0) return;
        setIsLoadingRoles(true);
        try {
            const result = await pythonClient.recommendRoles(
                extractedSkills || {},
                readinessScore,
                8
            );
            setRoleRecommendations(result.recommendations || []);
        } catch (error) {
            console.error('Role recommendations error:', error);
        } finally {
            setIsLoadingRoles(false);
        }
    };

    // Load resume feedback
    const loadResumeFeedback = async () => {
        if (resumeFeedback || !resumeText) return;
        setIsLoadingFeedback(true);
        try {
            const result = await pythonClient.getResumeFeedback(resumeText);
            setResumeFeedback(result);
        } catch (error) {
            console.error('Resume feedback error:', error);
        } finally {
            setIsLoadingFeedback(false);
        }
    };

    // Handle tab change
    const handleTabChange = (tab: typeof activeTab) => {
        setActiveTab(tab);
        if (tab === 'roles') loadRoleRecommendations();
        if (tab === 'feedback' && resumeText) loadResumeFeedback();
    };

    const tabs = [
        { id: 'overview', label: '📊 Overview', icon: '📊' },
        { id: 'jobfit', label: '🎯 Job Fit', icon: '🎯' },
        { id: 'roles', label: '💼 Roles', icon: '💼' },
        { id: 'feedback', label: '📝 Resume', icon: '📝' },
    ];

    return (
        <div className="animate-fade-in pb-12">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTabChange(tab.id as typeof activeTab)}
                        className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                    >
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.icon}</span>
                    </motion.button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Hero Score Section with Animated Score */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        {/* Animated Score Circle */}
                        <Card className="flex-1 flex items-center justify-center py-8">
                            <AnimatedScore score={readinessScore} size="xl" />
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
                                        <motion.div
                                            className="bg-green-500 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((matchedSkills.length / (matchedSkills.length + missingSkills.length)) * 100, 100)}%` }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Skills Missing</span>
                                        <span className="text-white font-bold">{missingSkills.length}</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <motion.div
                                            className="bg-red-500 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((missingSkills.length / (matchedSkills.length + missingSkills.length)) * 100, 100)}%` }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-700">
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        You have <span className="text-green-400 font-bold">{matchedSkills.length}</span> strong skills.
                                        Adding the top <span className="text-red-400 font-bold">3</span> missing skills could boost your score by <span className="text-accent-400 font-bold">~15%</span>.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <SkillChart matchedSkills={matchedSkills} missingSkills={missingSkills} />
                        </div>
                    </div>

                    {/* Detailed Analysis */}
                    <GapAnalysisResults
                        matchedSkills={matchedSkills}
                        missingSkills={missingSkills}
                        readinessScore={readinessScore}
                    />

                    {/* Market Analysis */}
                    <MarketAnalysisCharts domain={analysisResults.domain || "Frontend Developer"} />

                    {/* GitHub Analyzer */}
                    {githubUsername && <GitHubAnalyzer username={githubUsername} />}

                    {/* Learning Roadmap */}
                    <LearningRoadmap
                        roadmap={generatedRoadmap}
                        readinessScore={readinessScore}
                    />
                </motion.div>
            )}

            {/* Job Fit Analysis Tab */}
            {activeTab === 'jobfit' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {!jobFitResults ? (
                        <JobDescriptionInput
                            onAnalyze={handleAnalyzeJobFit}
                            isLoading={isLoadingJobFit}
                        />
                    ) : (
                        <JobFitResults
                            results={jobFitResults}
                            onReset={() => setJobFitResults(null)}
                        />
                    )}
                </motion.div>
            )}

            {/* Role Recommendations Tab */}
            {activeTab === 'roles' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <RoleRecommendations
                        recommendations={roleRecommendations}
                        isLoading={isLoadingRoles}
                    />
                </motion.div>
            )}

            {/* Resume Feedback Tab */}
            {activeTab === 'feedback' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {resumeText ? (
                        <ResumeFeedbackAnalysis
                            analysis={resumeFeedback}
                            isLoading={isLoadingFeedback}
                        />
                    ) : (
                        <Card className="bg-slate-900/50 border-slate-800 text-center py-12">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-xl font-bold text-white mb-2">Resume Text Not Available</h3>
                            <p className="text-slate-400">Upload a text-based resume to get detailed AI feedback.</p>
                        </Card>
                    )}

                    {/* Also show existing resume feedback */}
                    {extractedSkills && (
                        <div className="mt-6">
                            <ResumeFeedback
                                extractedSkills={extractedSkills}
                                matchedSkills={matchedSkills}
                            />
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};
