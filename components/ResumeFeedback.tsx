import React, { useMemo } from 'react';
import { Card } from './ui/Card';

interface ResumeFeedbackProps {
    extractedSkills: Record<string, string[]>;
    matchedSkills: any[];
}

export const ResumeFeedback = ({ extractedSkills, matchedSkills }: ResumeFeedbackProps) => {
    // Generate feedback based on simple heuristics
    const feedback = useMemo(() => {
        const tips: { type: 'error' | 'warning' | 'info', text: string }[] = [];

        // 1. Check Technical Skills Count
        const totalSkills = Object.values(extractedSkills).flat().length;
        if (totalSkills < 5) {
            tips.push({ type: 'error', text: "Your CV mentions very few technical skills. Consider adding a 'Skills' section with a list of technologies you know." });
        } else if (totalSkills < 10) {
            tips.push({ type: 'warning', text: "Try to list more specific tools and libraries to pass ATS filters." });
        } else {
            tips.push({ type: 'info', text: `Great! We detected ${totalSkills} technical skills on your profile.` });
        }

        // 2. Check Skill Categories
        const categories = Object.keys(extractedSkills);
        if (!categories.some(c => c.toLowerCase().includes('framework') || c.toLowerCase().includes('library'))) {
            tips.push({ type: 'warning', text: "Missing 'Frameworks' section? Grouping skills by category (Languages, Frameworks, Tools) helps recruiters read faster." });
        }

        // 3. Match Ratio
        const highValueSkills = matchedSkills.length;
        if (highValueSkills === 0) {
            tips.push({ type: 'error', text: "Critical: We couldn't match any of your skills to the target job description. Ensure you use standard naming (e.g., 'React.js' instead of 'My Frontend exp')." });
        }

        // 4. Formatting Tips (Static heuristics for now)
        tips.push({ type: 'info', text: "Tip: Use bullet points for project descriptions to make them skimmable." });
        tips.push({ type: 'info', text: "Tip: Quantify your impact (e.g., 'Improved load time by 30%') instead of just listing responsibilities." });

        return tips;
    }, [extractedSkills, matchedSkills]);

    return (
        <Card className="p-6 mt-8 bg-slate-900/50 border-slate-800 animate-slide-up delay-100">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2 text-2xl">📝</span> AI Resume Feedback
            </h3>

            <div className="space-y-4">
                {feedback.map((item, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-xl border flex items-start ${item.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-200' :
                                item.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200' :
                                    'bg-blue-500/10 border-blue-500/20 text-blue-200'
                            }`}
                    >
                        <span className="mr-3 text-lg mt-0.5">
                            {item.type === 'error' ? '🚫' : item.type === 'warning' ? '⚠️' : '💡'}
                        </span>
                        <p className="text-sm leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-xs text-slate-500 text-center">
                Automated ATS scan based on common parsing rules.
            </p>
        </Card>
    );
};
