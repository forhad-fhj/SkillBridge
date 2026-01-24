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

        // Forward to Python backend for parsing
        const result = await pythonClient.parseDocument(file);

        // Store or update user in database
        if (userEmail) {
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
    } catch (error: any) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process document' },
            { status: 500 }
        );
    }
}
