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

        // If no jobs found, send null to trigger backend mock data
        const jobsToSend = jobs.length === 0 ? null : jobs;

        if (jobs.length === 0) {
            console.warn('No jobs found in database, backend will use mock data');
        }

        // Call Python backend for gap analysis
        const analysis = await pythonClient.analyzeGap(
            userSkills,
            jobsToSend,
            domain
        );

        // Store analysis result in database if userId is provided and is not a guest
        if (userId && !userId.startsWith('guest')) {
            await prisma.analysisResult.create({
                data: {
                    userId,
                    readinessScore: analysis.readinessScore,
                    matchedSkills: analysis.matchedSkills,
                    missingSkills: analysis.missingSkills,
                    generatedRoadmap: JSON.stringify(analysis.generatedRoadmap), // Convert to string as per schema
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
