/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Disable ESLint during production builds
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Disable TypeScript errors during production builds
        ignoreBuildErrors: true,
    },
    env: {
        PYTHON_BACKEND_URL: process.env.PYTHON_BACKEND_URL || 'http://localhost:8000',
    },
    images: {
        remotePatterns: [],
    },
    turbopack: {
        root: '.',
    },
};

export default nextConfig;
