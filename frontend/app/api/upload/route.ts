import { NextRequest, NextResponse } from 'next/server';
import { pythonClient } from '@/lib/api/pythonClient';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const userEmail = formData.get('email') as string;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only PDF and DOCX are supported.' },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 10MB limit' },
                { status: 400 }
            );
        }

        try {
            // Forward to Python backend for parsing
            const result = await pythonClient.parseDocument(file);

            // Store or update user in database
            if (userEmail && userEmail !== 'guest@example.com') {
                const user = await prisma.user.upsert({
                    where: { email: userEmail },
                    update: {
                        resumeUrl: file.name,
                    },
                    create: {
                        email: userEmail,
                        name: userEmail.split('@')[0],
                        resumeUrl: file.name,
                    },
                });

                return NextResponse.json({
                    ...result,
                    userId: user.id,
                });
            }

            return NextResponse.json(result);
        } catch (backendError: any) {
            console.error('Backend error:', backendError);
            return NextResponse.json(
                { error: backendError.message || 'Failed to process document on backend' },
                { status: 502 }
            );
        }
    } catch (error: any) {
        console.error('Error uploading file:', error);
        
        // Handle different error types
        if (error.message?.includes('multipart')) {
            return NextResponse.json(
                { error: 'Invalid request format' },
                { status: 400 }
            );
        }
        
        return NextResponse.json(
            { error: error.message || 'Failed to process document' },
            { status: 500 }
        );
    }
}
