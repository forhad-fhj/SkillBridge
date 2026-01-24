import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface LearningRoadmapProps {
    roadmap: string;
    readinessScore: number;
}

export const LearningRoadmap = ({ roadmap, readinessScore }: LearningRoadmapProps) => {
    // Simple markdown parsing for the roadmap (since we don't have a markdown renderer installed yet)
    // In a real app, I'd suggest installing 'react-markdown'

    const parseRoadmap = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('# ')) {
                return <h2 key={index} className="text-2xl font-bold mt-6 mb-4 text-white">{line.replace('# ', '')}</h2>;
            }
            if (line.startsWith('## ')) {
                return <h3 key={index} className="text-xl font-semibold mt-5 mb-3 text-secondary-300">{line.replace('## ', '')}</h3>;
            }
            if (line.startsWith('### ')) {
                return <h4 key={index} className="text-lg font-medium mt-4 mb-2 text-accent-300">{line.replace('### ', '')}</h4>;
            }
            if (line.startsWith('**') && line.endsWith('**')) { // Bold headers mostly
                return <p key={index} className="font-bold text-white mb-2">{line.replace(/\*\*/g, '')}</p>
            }
            if (line.startsWith('- ') || line.startsWith('* ')) {
                return <li key={index} className="ml-4 mb-1 text-gray-300 list-disc">{line.replace(/^[-*] /, '')}</li>;
            }
            if (line.match(/^\d+\. /)) {
                // Handle priority list items with bold parts
                const content = line.replace(/^\d+\. /, '');
                const parts = content.split('**');

                return (
                    <div key={index} className="flex items-start mb-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-500/20 text-primary-300 text-sm font-bold mr-3 mt-0.5">
                            {line.match(/^\d+/)?.[0]}
                        </span>
                        <div>
                            {parts.map((part, i) =>
                                i % 2 === 1 ? <span key={i} className="font-bold text-white">{part}</span> : <span key={i} className="text-gray-300">{part}</span>
                            )}
                        </div>
                    </div>
                );
            }

            if (line.trim() === '') return <br key={index} />;

            return <p key={index} className="text-gray-300 mb-2">{line.replace(/\*\*/g, '')}</p>;
        });
    };

    return (
        <Card className="max-w-4xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-2xl font-display font-bold text-white flex items-center">
                    <span className="mr-3 text-3xl">🗺️</span>
                    Personalized Learning Roadmap
                </h2>
                <div className="text-right">
                    <div className="text-sm text-gray-400">Current Readiness</div>
                    <div className="text-2xl font-bold text-primary-400">{readinessScore}%</div>
                </div>
            </div>

            <div className="prose prose-invert max-w-none">
                {parseRoadmap(roadmap)}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
                <p>Generated based on Bangladesh market demand analysis</p>
                <button className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
                    Download PDF ⬇️
                </button>
            </div>
        </Card>
    );
};
