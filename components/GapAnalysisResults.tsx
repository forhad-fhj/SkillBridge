import { Card } from "@/components/ui/Card";

interface GapAnalysisResultsProps {
    matchedSkills: any[];
    missingSkills: any[];
    readinessScore: number;
}

export const GapAnalysisResults = ({ matchedSkills, missingSkills }: GapAnalysisResultsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Matched Skills */}
            <Card className="h-full border-green-500/20 bg-green-500/5">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="bg-green-500/20 text-green-400 p-2 rounded-lg mr-3">✓</span>
                    Your Matched Skills
                </h3>

                {matchedSkills.length === 0 ? (
                    <p className="text-gray-400 italic">No direct matches found yet. Keep learning!</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {matchedSkills.map((item, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 rounded-full text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/20"
                                title={`Found in ${item.frequency} jobs`}
                            >
                                {item.skill}
                            </span>
                        ))}
                    </div>
                )}

                <p className="mt-4 text-sm text-gray-400">
                    These skills align perfectly with current market demands.
                </p>
            </Card>

            {/* Missing Skills */}
            <Card className="h-full border-red-500/20 bg-red-500/5">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="bg-red-500/20 text-red-400 p-2 rounded-lg mr-3">⚠</span>
                    Missing High-Demand Skills
                </h3>

                {missingSkills.length === 0 ? (
                    <p className="text-gray-400 italic">Amazing! You have all the top required skills.</p>
                ) : (
                    <div className="space-y-3">
                        {missingSkills.slice(0, 6).map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-red-500/10 border border-red-500/10">
                                <span className="font-medium text-red-200">{item.skill}</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-red-300 bg-red-500/20 px-2 py-0.5 rounded">
                                        {item.priority} Priority
                                    </span>
                                    <span className="text-xs text-gray-400" title="Job postings count">
                                        {item.frequency} jobs
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <p className="mt-4 text-sm text-gray-400">
                    Focus on these to significantly boost your readiness score.
                </p>
            </Card>
        </div>
    );
};
