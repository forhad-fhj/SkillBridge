import axios, { AxiosInstance } from 'axios';

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

class PythonClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: PYTHON_BACKEND_URL,
            timeout: 30000, // 30 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async parseDocument(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.client.post('/api/parse-document', formData);

        return response.data;
    }

    async extractSkills(text: string) {
        const response = await this.client.post('/api/extract-skills', { text });
        return response.data;
    }

    async analyzeGap(userSkills: any, jobDescriptions: any[], domain?: string) {
        const response = await this.client.post('/api/analyze-gap', {
            userSkills,
            jobDescriptions,
            domain,
        });
        return response.data;
    }

    async healthCheck() {
        const response = await this.client.get('/api/health');
        return response.data;
    }
}

export const pythonClient = new PythonClient();
