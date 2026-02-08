'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FileUpload } from '@/components/FileUpload';
import { ReadinessDashboard } from '@/components/ReadinessDashboard';
import { DomainSelector } from '@/components/DomainSelector';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
    const [file, setFile] = useState<File | null>(null);
    const [extractedSkills, setExtractedSkills] = useState<any>(null);
    const [analysisResults, setAnalysisResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'upload' | 'ready' | 'analyzing' | 'results'>('upload');
    const [selectedDomain, setSelectedDomain] = useState('Frontend Developer');
    const [githubUsername, setGithubUsername] = useState('');

    // Separate Upload Logic
    const handleFileUpload = async (uploadedFile: File) => {
        setFile(uploadedFile);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', uploadedFile);
            formData.append('email', 'guest@example.com');

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const responseData = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(responseData.error || `Upload failed with status ${uploadRes.status}`);
            }

            if (!responseData.skills) {
                throw new Error('No skills were extracted from the document. Please try another file.');
            }

            setExtractedSkills(responseData.skills);

            // Go to Ready step instead of auto-analyzing
            setStep('ready');
        } catch (error: any) {
            console.error('Upload error:', error);
            const errorMessage = error.message || 'Failed to upload CV. Please try again.';
            alert(errorMessage);
            setStep('upload');
        } finally {
            setLoading(false);
        }
    };

    // Separate Analysis Logic
    const startAnalysis = async () => {
        if (!extractedSkills) return;

        setLoading(true);
        setStep('analyzing');

        try {
            const analyzeRes = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userSkills: extractedSkills,
                    domain: selectedDomain,
                    userId: 'guest_123'
                }),
            });

            const data = await analyzeRes.json();

            if (!analyzeRes.ok) {
                const errorMessage = data.error || data.detail || `Server returned ${analyzeRes.status}`;
                throw new Error(errorMessage);
            }

            // Check if readinessScore exists (0 is valid!)
            if (data.readinessScore === undefined || data.readinessScore === null) {
                console.error('Invalid analysis response:', data);
                throw new Error('Invalid response from analysis service - missing readinessScore');
            }

            setAnalysisResults(data);
            setStep('results');
        } catch (error: any) {
            console.error('Analysis error:', error);
            const errorMessage = error.message || 'Something went wrong during analysis.';
            alert(`Analysis Error: ${errorMessage}\n\nPlease ensure the backend is running and try again.`);
            setStep('ready'); // Go back to ready on error
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
                <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md py-4 -mx-4 px-4 md:px-8 mb-8 border-b border-slate-800/50 flex justify-between items-center transition-all">
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

                    {step === 'ready' && (
                        <div className="w-full max-w-lg animate-fade-in">
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                                    📄
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">CV Uploaded Successfully!</h2>
                                <p className="text-slate-400 mb-8">
                                    We extracted skills from <strong>{file?.name}</strong>. Ready to analyze your readiness for <strong>{selectedDomain}</strong>?
                                </p>

                                <div className="space-y-4">
                                    {/* Allow changing domain if needed before analysis */}
                                    <div className="text-left bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                        <label className="text-xs text-slate-500 uppercase font-bold block mb-2">Target Domain</label>
                                        <DomainSelector
                                            selectedDomain={selectedDomain}
                                            onSelect={setSelectedDomain}
                                            isLoading={false}
                                        />
                                    </div>

                                    {/* GitHub Input - moved to Ready step */}
                                    <div className="text-left bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                        <label className="text-xs text-slate-500 uppercase font-bold block mb-2">GitHub Username (Optional)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-slate-500">@</span>
                                            <input
                                                type="text"
                                                placeholder="octocat"
                                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 text-sm"
                                                onChange={(e) => setGithubUsername(e.target.value)}
                                                value={githubUsername}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full py-4 text-lg font-bold shadow-lg shadow-blue-500/25"
                                        onClick={startAnalysis}
                                        isLoading={loading}
                                    >
                                        🚀 Start Analysis
                                    </Button>

                                    <button
                                        onClick={() => setStep('upload')}
                                        className="text-sm text-slate-500 hover:text-white transition-colors"
                                    >
                                        Cancel & Upload Different File
                                    </button>
                                </div>
                            </div>
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
                            <ReadinessDashboard
                                analysisResults={{ ...analysisResults, domain: selectedDomain }}
                                githubUsername={githubUsername}
                                extractedSkills={extractedSkills}
                            />
                        </div>
                    )}

                </div>
            </div>

            <footer className="mt-20 py-6 text-center text-slate-500 border-t border-slate-800/50">
                <p>© {new Date().getFullYear()} SkillBridge. All rights reserved to Forhad.</p>
            </footer>
        </main >
    );
}
