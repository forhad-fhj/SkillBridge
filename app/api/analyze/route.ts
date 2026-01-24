import { NextRequest, NextResponse } from 'next/server';
import { pythonClient } from '@/lib/api/pythonClient';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userSkills, domain, userId } = body;

        if (!userSkills) {
            return NextResponse.json(
                { error: 'User skills are required' },
                { status: 400 }
            );
        }

        // Fetch job descriptions from database (filtered by domain if provided)
        const jobs = await prisma.job.findMany({
            where: domain ? { domain } : undefined,
            select: {
                id: true,
                title: true,
                company: true,
                domain: true,
                extractedSkills: true,
            },
        });

        if (jobs.length === 0) {
            return NextResponse.json(
                { error: 'No job data available for analysis' },
                { status: 404 }
            );
        }

        // Call Python backend for gap analysis
        const analysis = await pythonClient.analyzeGap(
            userSkills,
            jobs,
            domain
        );

        // Store analysis result in database if userId is provided
        if (userId) {
            await prisma.analysisResult.create({
                data: {
                    userId,
                    readinessScore: analysis.readinessScore,
                    matchedSkills: analysis.matchedSkills,
                    missingSkills: analysis.missingSkills,
                    generatedRoadmap: analysis.generatedRoadmap,
                },
            });
        }

        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error('Error analyzing gap:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to perform gap analysis' },
            { status: 500 }
        );
    }
}
