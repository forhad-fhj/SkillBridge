
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://127.0.0.1:8000';

async function testHealth() {
    try {
        console.log(`Checking health at ${BASE_URL}/health...`);
        const res = await axios.get(`${BASE_URL}/health`, { timeout: 5000 });
        console.log('Health check passed:', res.data);
    } catch (err) {
        console.error('Health check failed:', err.message);
        if (err.response) console.error('Status:', err.response.status);
    }
}

async function testUpload() {
    try {
        console.log(`Testing upload at ${BASE_URL}/api/parse-document...`);
        // Create a dummy PDF file
        const filePath = path.join(__dirname, 'test.pdf');
        fs.writeFileSync(filePath, 'dummy pdf content');

        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        const res = await axios.post(`${BASE_URL}/api/parse-document`, form, {
            headers: {
                ...form.getHeaders()
            },
            timeout: 10000
        });
        console.log('Upload passed:', res.data);

        // Cleanup
        fs.unlinkSync(filePath);
    } catch (err) {
        console.error('Upload failed:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        }
    }
}

async function main() {
    await testHealth();
    await testUpload();
}

main();
