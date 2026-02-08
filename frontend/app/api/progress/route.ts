import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Get last 10 progress entries for the user
        const history = await prisma.progressHistory.findMany({
            where: { userId: session.user.id },
            orderBy: { analyzedAt: 'desc' },
            take: 10
        })

        // Get summary stats
        const stats = await prisma.progressHistory.aggregate({
            where: { userId: session.user.id },
            _avg: { readinessScore: true },
            _max: { readinessScore: true },
            _count: { id: true }
        })

        return NextResponse.json({
            history: history.map(h => ({
                id: h.id,
                readinessScore: h.readinessScore,
                skillCount: h.skillCount,
                domain: h.domain,
                date: h.analyzedAt.toISOString()
            })),
            stats: {
                totalAnalyses: stats._count.id,
                averageScore: Math.round(stats._avg.readinessScore || 0),
                highestScore: stats._max.readinessScore || 0
            }
        })
    } catch (error) {
        console.error("Error fetching progress:", error)
        return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
    }
}
