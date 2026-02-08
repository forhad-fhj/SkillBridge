import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { readinessScore, skillCount, domain } = body

        // Save progress entry
        const progress = await prisma.progressHistory.create({
            data: {
                userId: session.user.id,
                readinessScore: readinessScore || 0,
                skillCount: skillCount || 0,
                domain: domain || null
            }
        })

        return NextResponse.json({
            id: progress.id,
            message: "Progress saved successfully"
        })
    } catch (error) {
        console.error("Error saving progress:", error)
        return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
    }
}
