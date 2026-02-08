import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface Resource {
    title: string;
    url: string;
    platform?: string;
    difficulty?: string;
    duration?: string;
    type?: string;
}

interface RoadmapStep {
    skill: string;
    priority: "Critical" | "High" | "Medium";
    estimated_time?: string;
    estimatedTime?: string;
    description?: string;
    resources: Resource[];
    order?: number;
    scoreImpact?: string;
    frequency?: number;
}

interface LearningRoadmapProps {
    roadmap: RoadmapStep[];
    readinessScore: number;
}

const platformIcons: Record<string, string> = {
    'freeCodeCamp': '🆓',
    'Udemy': '🎓',
    'Coursera': '📚',
    'YouTube': '▶️',
    'MDN': '📖',
    'React.dev': '⚛️',
    'TypeScript': '🔷',
    'Vercel': '▲',
    'default': '🔗'
};

const difficultyColors: Record<string, string> = {
    'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const LearningRoadmap = ({ roadmap, readinessScore }: LearningRoadmapProps) => {
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const toggleCard = (index: number) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedCards(newExpanded);
    };

    // Function to download roadmap as text
    const downloadRoadmap = () => {
        let content = `Personalized Learning Roadmap\n\n`;
        content += `Current Readiness Score: ${readinessScore}%\n\n`;

        roadmap.forEach((step, index) => {
            content += `${index + 1}. ${step.skill} (${step.priority} Priority)\n`;
            content += `   Estimated Time: ${step.estimated_time}\n`;
            content += `   Description: ${step.description}\n`;
            content += `   Resources:\n`;
            step.resources.forEach(r => {
                content += `   - ${r.title}: ${r.url}\n`;
            });
            content += `\n`;
        });

        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "SkillBridge_Roadmap.txt";
        document.body.appendChild(element);
        element.click();
    };

    if (!roadmap || roadmap.length === 0) {
        return (
            <Card className="max-w-4xl mx-auto mt-8 p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">🎉 You're Market Ready!</h3>
                <p className="text-gray-400">No critical missing skills found. Keep building projects!</p>
            </Card>
        );
    }

    return (
        <Card className="max-w-4xl mx-auto mt-8 bg-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between mb-8 border-b border-slate-700/50 pb-6">
                <h2 className="text-2xl font-display font-bold text-white flex items-center">
                    <span className="mr-3 text-3xl">🗺️</span>
                    Personalized Learning Roadmap
                </h2>
                <div className="text-right">
                    <div className="text-sm text-slate-400">Current Readiness</div>
                    <div className="text-2xl font-bold text-blue-400">{readinessScore}%</div>
                </div>
            </div>

            <div className="relative pl-8 md:pl-0">
                {/* Vertical Line for Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2 rounded-full"></div>

                <div className="space-y-12">
                    {roadmap.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Timeline Node */}
                            <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center z-10 -translate-x-1/2 md:-translate-x-1/2 mt-1 md:mt-0">
                                <div className={`w-3 h-3 rounded-full ${step.priority === 'Critical' ? 'bg-red-500' :
                                    step.priority === 'High' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}></div>
                            </div>

                            {/* Spacer for desktop alignment */}
                            <div className="hidden md:block w-1/2"></div>

                            {/* Card Content */}
                            <div className="w-full md:w-1/2 pl-8 md:pl-0">
                                <div className={`relative p-6 rounded-2xl border bg-slate-800/50 hover:bg-slate-800/80 transition-all group ${step.priority === 'Critical' ? 'border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' :
                                    step.priority === 'High' ? 'border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]' :
                                        'border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                                    }`}>
                                    {/* Arrow for Desktop */}
                                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-800 border-l border-b border-t-0 border-r-0 rotate-45 transform 
                                        ${index % 2 === 0 ? '-left-2 border-slate-700' : '-right-2 border-slate-700 rotate-[225deg]'}`}
                                    ></div>

                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                            {step.skill}
                                        </h3>
                                        <span className={`text-xs px-2 py-1 rounded font-medium uppercase tracking-wider ${step.priority === 'Critical' ? 'bg-red-500/10 text-red-400' :
                                            step.priority === 'High' ? 'bg-yellow-500/10 text-yellow-400' :
                                                'bg-green-500/10 text-green-400'
                                            }`}>
                                            {step.priority}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-4 flex-wrap">
                                        <span className="flex items-center">
                                            ⏱ {step.estimatedTime || step.estimated_time || 'Varies'}
                                        </span>
                                        {step.scoreImpact && (
                                            <span className="flex items-center text-green-400">
                                                📈 {step.scoreImpact}
                                            </span>
                                        )}
                                        {step.frequency && step.frequency > 0 && (
                                            <span className="flex items-center text-blue-400">
                                                🔥 {step.frequency} job mentions
                                            </span>
                                        )}
                                    </div>

                                    {step.description && (
                                        <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    )}

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => toggleCard(index)}
                                            className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 uppercase hover:text-blue-400 transition-colors"
                                        >
                                            <span>📚 Learning Resources ({step.resources.length})</span>
                                            <span className={`transform transition-transform ${expandedCards.has(index) ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        </button>

                                        <AnimatePresence>
                                            {expandedCards.has(index) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="space-y-2 overflow-hidden"
                                                >
                                                    {step.resources.map((res, i) => (
                                                        <a
                                                            key={i}
                                                            href={res.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block p-3 rounded-xl bg-slate-700/30 hover:bg-blue-600/20 border border-slate-600/50 hover:border-blue-500/50 transition-all group/resource"
                                                        >
                                                            <div className="flex items-start justify-between gap-2">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="text-lg">
                                                                            {platformIcons[res.platform || 'default'] || platformIcons['default']}
                                                                        </span>
                                                                        <span className="text-sm font-medium text-white group-hover/resource:text-blue-300 transition-colors">
                                                                            {res.title}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                                        {res.platform && (
                                                                            <span className="text-slate-400">{res.platform}</span>
                                                                        )}
                                                                        {res.duration && (
                                                                            <span>• {res.duration}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-1">
                                                                    {res.difficulty && (
                                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${difficultyColors[res.difficulty] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
                                                                            {res.difficulty}
                                                                        </span>
                                                                    )}
                                                                    <span className="text-blue-400 text-xs opacity-0 group-hover/resource:opacity-100 transition-opacity">
                                                                        Open →
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {!expandedCards.has(index) && step.resources.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {step.resources.slice(0, 3).map((res, i) => (
                                                    <span key={i} className="text-xs px-2 py-1 rounded-lg bg-slate-700/50 text-slate-400 border border-slate-600/50">
                                                        {platformIcons[res.platform || 'default']} {res.platform || 'Resource'}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-700/50 flex items-center justify-between text-sm text-slate-400">
                <p>Generated based on Bangladesh market demand analysis</p>
                <button
                    onClick={downloadRoadmap}
                    className="flex items-center px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all border border-slate-700 hover:border-slate-600"
                >
                    <span className="mr-2">⬇️</span> Download Roadmap
                </button>
            </div>
        </Card>
    );
};
