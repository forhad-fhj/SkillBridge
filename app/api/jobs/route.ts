import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const domain = searchParams.get('domain');

        // Fetch jobs, optionally filtered by domain
        const jobs = await prisma.job.findMany({
            where: domain ? { domain } : undefined,
            select: {
                id: true,
                title: true,
                company: true,
                domain: true,
                extractedSkills: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Get unique domains for filtering
        const domains = await prisma.job.findMany({
            select: {
                domain: true,
            },
            distinct: ['domain'],
        });

        return NextResponse.json({
            jobs,
            domains: domains.map(d => d.domain),
            total: jobs.length,
        });
    } catch (error: any) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch jobs' },
            { status: 500 }
        );
    }
}
