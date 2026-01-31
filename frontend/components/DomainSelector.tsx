import React from 'react';

interface DomainSelectorProps {
    selectedDomain: string;
    onSelect: (domain: string) => void;
    isLoading?: boolean;
}

const DOMAINS = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Analyst',
    'Mobile Developer',
    'DevOps Engineer',
    'UI/UX Designer',
    'QA Engineer',
    'Machine Learning Engineer',
    'WordPress Developer'
];

export const DomainSelector = ({ selectedDomain, onSelect, isLoading }: DomainSelectorProps) => {
    return (
        <div className="w-full max-w-md mx-auto mb-8 animate-fade-in">
            <label className="block text-sm font-medium text-slate-400 mb-2">
                I am looking for a:
            </label>
            <select
                value={selectedDomain}
                onChange={(e) => onSelect(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer hover:bg-slate-800/50"
            >
                {DOMAINS.map((domain) => (
                    <option key={domain} value={domain}>
                        {domain}
                    </option>
                ))}
            </select>
            <p className="mt-2 text-xs text-slate-500 italic">
                The analysis will compare your skills against {selectedDomain} requirements in Bangladesh.
            </p>
        </div>
    );
};
