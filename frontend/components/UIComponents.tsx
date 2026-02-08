'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface Skill {
    skill: string;
    category?: string;
    proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    isMatched?: boolean;
}

interface SkillCardsProps {
    skills: Skill[];
    title: string;
    type?: 'matched' | 'missing' | 'extra' | 'neutral';
    maxDisplay?: number;
}

const proficiencyColors = {
    beginner: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    intermediate: 'bg-green-500/20 text-green-400 border-green-500/30',
    advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    expert: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const typeStyles = {
    matched: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: '✓', iconColor: 'text-green-400' },
    missing: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '✗', iconColor: 'text-red-400' },
    extra: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: '+', iconColor: 'text-cyan-400' },
    neutral: { bg: 'bg-slate-800/50', border: 'border-slate-700/50', icon: '•', iconColor: 'text-slate-400' },
};

export const SkillCards = ({ skills, title, type = 'neutral', maxDisplay = 20 }: SkillCardsProps) => {
    const style = typeStyles[type];
    const displaySkills = skills.slice(0, maxDisplay);
    const remaining = skills.length - maxDisplay;

    return (
        <Card className="bg-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <span className="text-sm text-slate-400">{skills.length} skills</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {displaySkills.map((skill, index) => (
                    <motion.div
                        key={skill.skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${style.bg} ${style.border} flex items-center gap-1.5`}
                    >
                        <span className={style.iconColor}>{style.icon}</span>
                        <span className="text-white">{skill.skill}</span>
                        {skill.proficiency && (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${proficiencyColors[skill.proficiency]}`}>
                                {skill.proficiency}
                            </span>
                        )}
                    </motion.div>
                ))}

                {remaining > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-3 py-1.5 rounded-lg text-sm text-slate-400 border border-slate-700/50 bg-slate-800/30"
                    >
                        +{remaining} more
                    </motion.div>
                )}
            </div>
        </Card>
    );
};

// Empty State Component
interface EmptyStateProps {
    icon?: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export const EmptyState = ({ icon = '📭', title, description, action }: EmptyStateProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
        >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-6">{description}</p>
            {action && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.onClick}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/20"
                >
                    {action.label}
                </motion.button>
            )}
        </motion.div>
    );
};

// Loading Skeleton Component
interface LoadingSkeletonProps {
    type?: 'card' | 'text' | 'circle';
    count?: number;
}

export const LoadingSkeleton = ({ type = 'card', count = 1 }: LoadingSkeletonProps) => {
    const items = Array.from({ length: count }, (_, i) => i);

    if (type === 'circle') {
        return (
            <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-slate-800 animate-pulse" />
            </div>
        );
    }

    if (type === 'text') {
        return (
            <div className="space-y-2">
                {items.map((i) => (
                    <div
                        key={i}
                        className="h-4 bg-slate-800 rounded animate-pulse"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((i) => (
                <div key={i} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 animate-pulse">
                    <div className="h-4 bg-slate-700 rounded w-1/3 mb-4" />
                    <div className="space-y-2">
                        <div className="h-3 bg-slate-700 rounded w-full" />
                        <div className="h-3 bg-slate-700 rounded w-5/6" />
                        <div className="h-3 bg-slate-700 rounded w-4/6" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// Badge Component
interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md';
}

const badgeVariants = {
    default: 'bg-slate-700/50 text-slate-300 border-slate-600/50',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

export const Badge = ({ children, variant = 'default', size = 'sm' }: BadgeProps) => {
    const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

    return (
        <span className={`inline-flex items-center rounded-full font-medium border ${badgeVariants[variant]} ${sizeClasses}`}>
            {children}
        </span>
    );
};
