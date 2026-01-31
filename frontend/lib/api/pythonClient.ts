import axios, { AxiosInstance } from 'axios';

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';

class PythonClient {
    private client: AxiosInstance;
    private jsonClient: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: PYTHON_BACKEND_URL,
            timeout: 60000, // 60 seconds for file uploads
        });

        this.jsonClient = axios.create({
            baseURL: PYTHON_BACKEND_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async parseDocument(file: File) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const formData = new FormData();
        const pdfBlob = new Blob([buffer], { type: file.type });
        formData.append('file', pdfBlob, file.name);

        console.log(`[PythonClient] Connecting to: ${this.client.defaults.baseURL}`);
        console.log(`[PythonClient] Uploading file: ${file.name}, size: ${file.size}, type: ${file.type}`);
        try {
            const response = await this.client.post('/api/parse-document', formData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async extractSkills(text: string) {
        try {
            const response = await this.jsonClient.post('/api/extract-skills', { text });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async analyzeGap(userSkills: any, jobDescriptions: any[], domain?: string) {
        try {
            const response = await this.jsonClient.post('/api/analyze-gap', {
                userSkills,
                jobDescriptions,
                domain,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async healthCheck() {
        try {
            const response = await this.jsonClient.get('/api/health');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.detail || error.message;
            const status = error.response?.status;

            if (status === 400) {
                throw new Error(`Bad Request: ${message}`);
            } else if (status === 500) {
                throw new Error(`Server Error: ${message || 'Failed to process request'}`);
            } else if (error.code === 'ECONNREFUSED') {
                throw new Error('Backend service is not available. Please ensure the Python backend is running.');
            }
            throw new Error(message || 'An error occurred');
        }
        throw error;
    }
}

export const pythonClient = new PythonClient();
