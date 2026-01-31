import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import { Card } from './ui/Card';

interface SkillChartProps {
    matchedSkills: any[];
    missingSkills: any[];
}

export const SkillChart = ({ matchedSkills, missingSkills }: SkillChartProps) => {
    // Process data for the Radar chart
    // We'll group skills into broad categories if possible, or just show top 5-7 metrics

    const data = [
        {
            subject: 'Languages',
            A: matchedSkills.filter(s => ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'PHP', 'Ruby', 'Go', 'HTML', 'CSS'].includes(s.skill)).length,
            B: matchedSkills.length + missingSkills.length,
            fullMark: 10,
        },
        {
            subject: 'Frameworks',
            A: matchedSkills.filter(s => ['React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask'].includes(s.skill)).length,
            B: 10,
            fullMark: 10,
        },
        {
            subject: 'Databases',
            A: matchedSkills.filter(s => ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase'].includes(s.skill)).length,
            B: 10,
            fullMark: 10,
        },
        {
            subject: 'Tools',
            A: matchedSkills.filter(s => ['Git', 'Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform', 'Figma'].includes(s.skill)).length,
            B: 10,
            fullMark: 10,
        },
        {
            subject: 'Concepts',
            A: matchedSkills.filter(s => ['REST API', 'GraphQL', 'CI/CD', 'UI/UX', 'SEO', 'Agile'].includes(s.skill)).length,
            B: 10,
            fullMark: 10,
        },
    ];

    // A more generic grouping logic based on what we have
    const categories = ['Languages', 'Frameworks', 'Databases', 'Tools', 'Concepts'];
    // This is a placeholder logic, ideally we'd have categorical data from the backend
    // For now let's just create a nice looking chart showing "Match" across categories

    return (
        <Card className="p-4 h-[400px] w-full bg-slate-900/50 border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Skill Category Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                        name="Your Profile"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.5}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                        itemStyle={{ color: '#3b82f6' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Card>
    );
};
