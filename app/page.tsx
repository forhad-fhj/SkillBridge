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

                    <div className="glass rounded-2xl p-8 max-w-md animate-slide-up delay-75 border-slate-700/50 bg-slate-800/30">
                        <p className="text-slate-300 mb-4">
                            🔥 Trending now: <strong className="text-blue-400">Frontend Developer</strong>, <strong className="text-purple-400">Data Analyst</strong>
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-xs px-2 py-1 bg-blue-500/10 rounded-full text-blue-300 border border-blue-500/20">React.js</span>
                            <span className="text-xs px-2 py-1 bg-purple-500/10 rounded-full text-purple-300 border border-purple-500/20">Python</span>
                            <span className="text-xs px-2 py-1 bg-emerald-500/10 rounded-full text-emerald-300 border border-emerald-500/20">Node.js</span>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="absolute bottom-4 w-full text-center text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} SkillBridge. All rights reserved to Forhad.</p>
            </footer>
        </main>
    );
}
