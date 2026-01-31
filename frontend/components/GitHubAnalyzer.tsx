import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';

interface GitHubAnalyzerProps {
    username: string;
}

interface GitHubStats {
    repos: number;
    followers: number;
    languages: Record<string, number>;
    score: number;
    topLanguage: string;
    avatarUrl: string;
}

export const GitHubAnalyzer = ({ username }: GitHubAnalyzerProps) => {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        const fetchGitHubData = async () => {
            try {
                // Fetch user info
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                if (!userRes.ok) throw new Error('User not found');
                const userData = await userRes.json();

                // Fetch repos
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
                const reposData = await reposRes.json();

                // Analyze languages
                const languages: Record<string, number> = {};
                reposData.forEach((repo: any) => {
                    if (repo.language) {
                        languages[repo.language] = (languages[repo.language] || 0) + 1;
                    }
                });

                // Calculate Simple "Portfolio Strength" Score
                // 5 points per repo (cap 50), 2 points per follower (cap 30), 20 points diversity
                const repoScore = Math.min(userData.public_repos * 5, 50);
                const followerScore = Math.min(userData.followers * 2, 30);
                const diversityScore = Math.min(Object.keys(languages).length * 5, 20);
                const totalScore = Math.min(repoScore + followerScore + diversityScore, 100);

                // Find top language
                const topLang = Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

                setStats({
                    repos: userData.public_repos,
                    followers: userData.followers,
                    languages,
                    score: totalScore,
                    topLanguage: topLang,
                    avatarUrl: userData.avatar_url
                });
            } catch (err) {
                console.error(err);
                setError('Could not fetch GitHub profile');
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, [username]);

    if (!username) return null;

    if (loading) return (
        <Card className="p-6 mt-8 animate-pulse bg-slate-900/50 border-slate-800">
            <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
            <div className="h-20 bg-slate-800 rounded mb-4"></div>
        </Card>
    );

    if (error) return null;

    return (
        <Card className="p-6 mt-8 bg-slate-900/50 border-slate-800 animate-slide-up">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2 text-2xl">🐙</span> GitHub Portfolio Analysis
            </h3>

            {stats && (
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* Avatar & Score */}
                    <div className="flex flex-col items-center">
                        <img
                            src={stats.avatarUrl}
                            alt={username}
                            className="w-20 h-20 rounded-full border-4 border-slate-700 mb-2"
                        />
                        <div className="text-center">
                            <span className="text-3xl font-bold text-white">{stats.score}</span>
                            <span className="text-xs text-slate-400 block uppercase tracking-wider">Strength Score</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                            <div className="text-2xl font-bold text-blue-400">{stats.repos}</div>
                            <div className="text-xs text-slate-400">Repositories</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                            <div className="text-2xl font-bold text-purple-400">{stats.followers}</div>
                            <div className="text-xs text-slate-400">Followers</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                            <div className="text-2xl font-bold text-green-400">{Object.keys(stats.languages).length}</div>
                            <div className="text-xs text-slate-400">Languages</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                            <div className="text-sm font-bold text-yellow-400 truncate mt-1">{stats.topLanguage}</div>
                            <div className="text-xs text-slate-400">Top Lang</div>
                        </div>
                    </div>
                </div>
            )}

            <p className="mt-4 text-xs text-center text-slate-500 italic">
                {stats && stats.score > 70 ? "🔥 Your GitHub is fire! Great asset for job applications." :
                    "💡 Tip: Add more public repositories and ReadMEs to boost this score."}
            </p>
        </Card>
    );
};
