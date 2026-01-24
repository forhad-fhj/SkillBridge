'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FileUpload } from '@/components/FileUpload';
import { ReadinessDashboard } from '@/components/ReadinessDashboard';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
    const [file, setFile] = useState<File | null>(null);
    const [extractedSkills, setExtractedSkills] = useState<any>(null);
    const [analysisResults, setAnalysisResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'upload' | 'analyzing' | 'results'>('upload');

    const handleFileUpload = async (uploadedFile: File) => {
        setFile(uploadedFile);
        setLoading(true);

        try {
            // 1. Upload and Parse
            const formData = new FormData();
            formData.append('file', uploadedFile);
            formData.append('email', 'guest@example.com'); // Temporary guest email

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) throw new Error('Upload failed');

            const parseData = await uploadRes.json();
            setExtractedSkills(parseData.skills);

            // 2. Analyze Gap (Frontend Developer default for now)
            setStep('analyzing');
            const analyzeRes = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userSkills: parseData.skills,
                    domain: 'Frontend Developer', // We could make this dynamic later
                    userId: parseData.userId
                }),
            });

            if (!analyzeRes.ok) throw new Error('Analysis failed');

            const data = await analyzeRes.json();
            setAnalysisResults(data);
            setStep('results');
        } catch (error) {
            console.error(error);
            alert('Something went wrong during analysis. Please try again.');
            setStep('upload');
        } finally {
            setLoading(false);
        }
    };

    const resetAnalysis = () => {
        setFile(null);
        setExtractedSkills(null);
        setAnalysisResults(null);
        setStep('upload');
    };

    return (
        <main className="min-h-screen bg-background text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <Link href="/" className="flex items-center space-x-2 group cursor-pointer hover:opacity-80 transition-opacity">
                        <span className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                            SkillBridge
                        </span>
                    </Link>
                    {step === 'results' && (
                        <Button variant="outline" size="sm" onClick={resetAnalysis}>
                            New Analysis
                        </Button>
                    )}
                </header>

                {/* Content */}
                <div className="flex flex-col items-center justify-center">

                    {step === 'upload' && (
                        <div className="w-full max-w-2xl animate-fade-in">
                            <div className="text-center mb-10">
                                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                                    Check Your <span className="text-primary-400">Internship Readiness</span>
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    Upload your CV and let AI compare your skills against the real job market in Bangladesh.
                                </p>
                            </div>
                            <FileUpload onUpload={handleFileUpload} isLoading={loading} />
                        </div>
                    )}

                    {step === 'analyzing' && (
                        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                            <div className="w-24 h-24 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-8"></div>
                            <h2 className="text-2xl font-bold mb-2">Analyzing your profile...</h2>
                            <p className="text-gray-400">Comparing with 100+ active job postings</p>
                        </div>
                    )}

                    {step === 'results' && analysisResults && (
                        <div className="w-full">
                            <ReadinessDashboard analysisResults={analysisResults} />
                        </div>
                    )}

                </div>
            </div>

            <footer className="mt-20 py-6 text-center text-slate-500 border-t border-slate-800/50">
                <p>© {new Date().getFullYear()} SkillBridge. All rights reserved to Forhad.</p>
            </footer>
        </main>
    );
}
