import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
    return (
        <main className="min-h-screen bg-animated-gradient">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-white animate-fade-in">
                        Skill<span className="text-gradient-accent">Bridge</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl animate-slide-up">
                        Bridge the gap between your skills and your dream job in Bangladesh
                    </p>

                    <div className="animate-slide-up mb-12">
                        <Link href="/dashboard">
                            <Button size="lg" className="text-xl px-10 py-6">
                                Check My Readiness 🚀
                            </Button>
                        </Link>
                    </div>

                    <div className="glass rounded-2xl p-8 max-w-md animate-slide-up delay-75">
                        <p className="text-gray-300 mb-4">
                            🔥 Trending now: <strong>Frontend Developer</strong>, <strong>Data Analyst</strong>
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-xs px-2 py-1 bg-primary-500/20 rounded-full text-primary-300">React.js</span>
                            <span className="text-xs px-2 py-1 bg-secondary-500/20 rounded-full text-secondary-300">Python</span>
                            <span className="text-xs px-2 py-1 bg-accent-500/20 rounded-full text-accent-300">Node.js</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
