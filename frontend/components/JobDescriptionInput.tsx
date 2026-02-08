'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface JobDescriptionInputProps {
    onAnalyze: (jobDescription: string, domain: string) => void;
    isLoading?: boolean;
    disabled?: boolean;
}

const PREDEFINED_ROLES = [
    { id: 'custom', label: 'Paste Custom JD', template: '' },
    {
        id: 'frontend',
        label: 'Frontend Developer',
        template: `We are looking for a Frontend Developer with strong experience in:
- React.js or Vue.js framework
- TypeScript and modern JavaScript (ES6+)
- HTML5, CSS3, and responsive design
- State management (Redux, Zustand, or Pinia)
- RESTful APIs and GraphQL
- Git version control
- Unit testing (Jest, React Testing Library)

Nice to have:
- Next.js or Nuxt.js experience
- Tailwind CSS
- CI/CD pipelines
- Figma or design tools`
    },
    {
        id: 'backend',
        label: 'Backend Developer',
        template: `We are seeking a Backend Developer with expertise in:
- Python (Django/FastAPI) or Node.js (Express/NestJS)
- RESTful API design and development
- SQL databases (PostgreSQL, MySQL)
- NoSQL databases (MongoDB, Redis)
- Docker and containerization
- Cloud services (AWS, GCP, or Azure)
- Git and version control

Preferred:
- Microservices architecture
- Message queues (RabbitMQ, Kafka)
- Kubernetes
- CI/CD experience`
    },
    {
        id: 'fullstack',
        label: 'Full Stack Developer',
        template: `Full Stack Developer position requiring:
- Frontend: React.js or Vue.js with TypeScript
- Backend: Node.js or Python
- Database: PostgreSQL and MongoDB
- API: REST and GraphQL
- DevOps: Docker, CI/CD basics
- Cloud: AWS or similar
- Version Control: Git

Additional skills:
- Next.js or similar meta-framework
- Testing frameworks
- Agile methodologies`
    },
    {
        id: 'data',
        label: 'Data Analyst/Scientist',
        template: `Data Analyst/Scientist role requiring:
- Python (Pandas, NumPy, Scikit-learn)
- SQL and database querying
- Data visualization (Tableau, PowerBI, Matplotlib)
- Statistical analysis
- Machine Learning fundamentals
- Excel advanced functions

Nice to have:
- R programming
- Deep Learning (TensorFlow, PyTorch)
- Big Data tools (Spark, Hadoop)
- Cloud ML services`
    }
];

export const JobDescriptionInput = ({ onAnalyze, isLoading, disabled }: JobDescriptionInputProps) => {
    const [jobDescription, setJobDescription] = useState('');
    const [selectedRole, setSelectedRole] = useState('custom');
    const [charCount, setCharCount] = useState(0);

    const handleRoleChange = (roleId: string) => {
        setSelectedRole(roleId);
        const role = PREDEFINED_ROLES.find(r => r.id === roleId);
        if (role && role.template) {
            setJobDescription(role.template);
            setCharCount(role.template.length);
        }
    };

    const handleTextChange = (text: string) => {
        setJobDescription(text);
        setCharCount(text.length);
        if (selectedRole !== 'custom') {
            setSelectedRole('custom');
        }
    };

    const handleSubmit = () => {
        if (jobDescription.trim().length >= 50) {
            const domain = PREDEFINED_ROLES.find(r => r.id === selectedRole)?.label || 'General';
            onAnalyze(jobDescription, domain);
        }
    };

    const isValid = jobDescription.trim().length >= 50;

    return (
        <Card className="bg-slate-900/50 border-slate-800">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                    📋 Job Description Analysis
                </h3>
                <p className="text-slate-400 text-sm">
                    Paste a job description to see how well your resume matches the requirements
                </p>
            </div>

            {/* Predefined Role Selector */}
            <div className="mb-4">
                <label className="text-sm font-medium text-slate-400 mb-2 block">
                    Quick Select Role Template
                </label>
                <div className="flex flex-wrap gap-2">
                    {PREDEFINED_ROLES.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => handleRoleChange(role.id)}
                            disabled={disabled || isLoading}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedRole === role.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {role.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Job Description Textarea */}
            <div className="mb-4">
                <label className="text-sm font-medium text-slate-400 mb-2 block">
                    Job Description
                </label>
                <textarea
                    value={jobDescription}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Paste the job description here or select a template above..."
                    disabled={disabled || isLoading}
                    rows={10}
                    className="w-full p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>{charCount} characters</span>
                    <span className={charCount >= 50 ? 'text-green-400' : 'text-yellow-400'}>
                        {charCount >= 50 ? '✓ Ready to analyze' : 'Minimum 50 characters required'}
                    </span>
                </div>
            </div>

            {/* Analyze Button */}
            <motion.button
                whileHover={{ scale: isValid ? 1.02 : 1 }}
                whileTap={{ scale: isValid ? 0.98 : 1 }}
                onClick={handleSubmit}
                disabled={!isValid || isLoading || disabled}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isValid && !isLoading
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
            >
                {isLoading ? (
                    <>
                        <span className="animate-spin">⏳</span>
                        Analyzing Match...
                    </>
                ) : (
                    <>
                        🎯 Analyze Job Fit
                    </>
                )}
            </motion.button>

            {/* Info Box */}
            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-300">
                    💡 <strong>Tip:</strong> For best results, paste the complete job description including
                    required skills, qualifications, and responsibilities.
                </p>
            </div>
        </Card>
    );
};
