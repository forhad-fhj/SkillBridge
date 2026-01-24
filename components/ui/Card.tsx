import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', variant = 'glass', children, ...props }, ref) => {
        const variants = {
            default: 'bg-gray-800 border border-gray-700',
            glass: 'glass-dark text-white',
        };

        return (
            <div
                ref={ref}
                className={`rounded-xl p-6 shadow-xl ${variants[variant]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
