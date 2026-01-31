import { motion } from 'framer-motion';

interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export const ProgressRing = ({
    progress,
    size = 120,
    strokeWidth = 8,
    className = ''
}: ProgressRingProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    // Determine color based on score
    const getColor = (score: number) => {
        if (score >= 80) return '#4ade80'; // Green
        if (score >= 50) return '#fbbf24'; // Yellow
        return '#f87171'; // Red
    };

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getColor(progress)}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                />
            </svg>
            {/* Percentage text */}
            <div className="absolute flex flex-col items-center justify-center text-white">
                <span className="text-3xl font-bold font-display">{progress}%</span>
                <span className="text-xs text-gray-400">Ready</span>
            </div>
        </div>
    );
};
