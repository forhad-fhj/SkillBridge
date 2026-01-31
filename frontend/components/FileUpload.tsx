import { useState, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FileUploadProps {
    onUpload: (file: File) => Promise<void>;
    isLoading?: boolean;
}

export const FileUpload = ({ onUpload, isLoading = false }: FileUploadProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type === 'application/pdf' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setFileName(file.name);
            onUpload(file);
        } else {
            alert("Please upload a PDF or DOCX file");
        }
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <Card className={`relative w-full max-w-xl mx-auto transition-all ${dragActive ? 'border-primary-500 ring-2 ring-primary-500/50' : 'border-gray-700'
            }`}>
            <div
                className="flex flex-col items-center justify-center p-8 text-center"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleChange}
                />

                <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>

                <h3 className="mb-2 text-xl font-bold text-white">Upload your CV</h3>
                <p className="mb-6 text-gray-400">
                    Drag & drop your resume here, or click to browse<br />
                    <span className="text-sm opacity-60">(Supported: PDF, DOCX)</span>
                </p>

                {fileName ? (
                    <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-lg mb-4">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-sm truncate max-w-[200px]">{fileName}</span>
                    </div>
                ) : null}

                <Button
                    variant="primary"
                    onClick={onButtonClick}
                    isLoading={isLoading}
                >
                    {fileName ? 'Analyze Another' : 'Select File'}
                </Button>
            </div>

            {dragActive && (
                <div className="absolute inset-0 w-full h-full bg-primary-500/10 rounded-xl pointer-events-none backdrop-blur-[1px]" />
            )}
        </Card>
    );
};
