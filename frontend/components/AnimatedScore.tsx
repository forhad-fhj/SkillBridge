'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedScoreProps {
    score: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showLabel?: boolean;
    label?: string;
    animate?: boolean;
}

const sizeConfig = {
    sm: { width: 80, strokeWidth: 6, fontSize: 'text-lg' },
    md: { width: 120, strokeWidth: 8, fontSize: 'text-2xl' },
    lg: { width: 160, strokeWidth: 10, fontSize: 'text-4xl' },
    xl: { width: 200, strokeWidth: 12, fontSize: 'text-5xl' },
};

const getScoreColor = (score: number): { stroke: string; text: string; glow: string } => {
    if (score >= 80) return {
        stroke: '#22c55e',
        text: 'text-green-400',
        glow: 'shadow-green-500/50'
    };
    if (score >= 60) return {
        stroke: '#eab308',
        text: 'text-yellow-400',
        glow: 'shadow-yellow-500/50'
    };
    if (score >= 40) return {
        stroke: '#f97316',
        text: 'text-orange-400',
        glow: 'shadow-orange-500/50'
    };
    return {
        stroke: '#ef4444',
        text: 'text-red-400',
        glow: 'shadow-red-500/50'
    };
};

const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
};

export const AnimatedScore = ({
    score,
    size = 'lg',
    showLabel = true,
    label,
    animate = true
}: AnimatedScoreProps) => {
    const config = sizeConfig[size];
    const colors = getScoreColor(score);
    const [displayScore, setDisplayScore] = useState(0);

    const radius = (config.width - config.strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // Animate the score number
    const spring = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        if (animate) {
            spring.set(score);
            const unsubscribe = spring.on('change', (v) => {
                setDisplayScore(Math.round(v));
            });
            return unsubscribe;
        } else {
            setDisplayScore(score);
        }
    }, [score, spring, animate]);

    const strokeDashoffset = circumference - (displayScore / 100) * circumference;

    return (
        <motion.div
            initial={animate ? { scale: 0.8, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex flex-col items-center"
        >
            <div
                className={`relative flex items-center justify-center shadow-2xl ${colors.glow} rounded-full`}
                style={{ width: config.width, height: config.width }}
            >
                {/* Background circle */}
                <svg
                    className="absolute transform -rotate-90"
                    width={config.width}
                    height={config.width}
                >
                    <circle
                        cx={config.width / 2}
                        cy={config.width / 2}
                        r={radius}
                        fill="none"
                        stroke="#334155"
                        strokeWidth={config.strokeWidth}
                    />
                    <motion.circle
                        cx={config.width / 2}
                        cy={config.width / 2}
                        r={radius}
                        fill="none"
                        stroke={colors.stroke}
                        strokeWidth={config.strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        initial={animate ? { strokeDashoffset: circumference } : false}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                </svg>

                {/* Score text */}
                <div className="text-center z-10">
                    <motion.span
                        className={`font-bold ${config.fontSize} ${colors.text}`}
                        initial={animate ? { scale: 0 } : false}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                    >
                        {displayScore}%
                    </motion.span>
                </div>
            </div>

            {showLabel && (
                <motion.div
                    initial={animate ? { y: 10, opacity: 0 } : false}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 text-center"
                >
                    <div className={`font-semibold ${colors.text}`}>
                        {label || getScoreLabel(score)}
                    </div>
                    <div className="text-sm text-slate-400">
                        Readiness Score
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

// Animated Counter Component
interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}

export const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 1.5 }: AnimatedCounterProps) => {
    const [displayValue, setDisplayValue] = useState(0);
    const spring = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        spring.set(value);
        const unsubscribe = spring.on('change', (v) => {
            setDisplayValue(Math.round(v));
        });
        return unsubscribe;
    }, [value, spring]);

    return (
        <span>
            {prefix}{displayValue}{suffix}
        </span>
    );
};

// Animated Progress Bar
interface AnimatedProgressBarProps {
    progress: number;
    label?: string;
    color?: string;
}

export const AnimatedProgressBar = ({ progress, label, color = 'cyan' }: AnimatedProgressBarProps) => {
    const colorClasses = {
        cyan: 'from-cyan-500 to-blue-500',
        green: 'from-green-500 to-emerald-500',
        yellow: 'from-yellow-500 to-orange-500',
        red: 'from-red-500 to-pink-500',
    };

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-400">{label}</span>
                    <span className="text-sm text-slate-300">{progress}%</span>
                </div>
            )}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};
