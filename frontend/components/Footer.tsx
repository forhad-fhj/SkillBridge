import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

export const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-950 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950 pointer-events-none"></div>

            <div className="container mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-4 space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                SkillBridge
                            </span>
                        </Link>
                        <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                            Empowering Bangladeshi tech talent with data-driven career insights. Bridge the gap between your skills and the global market.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <Link href="#" className="p-2.5 bg-slate-900 rounded-full border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 hover:text-blue-400 text-slate-400 transition-all duration-300">
                                <Github size={18} />
                            </Link>
                            <Link href="#" className="p-2.5 bg-slate-900 rounded-full border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 hover:text-blue-400 text-slate-400 transition-all duration-300">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="#" className="p-2.5 bg-slate-900 rounded-full border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 hover:text-blue-400 text-slate-400 transition-all duration-300">
                                <Twitter size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-semibold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Skill Analyzer</Link></li>
                            <li><Link href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</Link></li>
                            <li><Link href="#trending" className="hover:text-cyan-400 transition-colors">Trending Roles</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-semibold text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Career Blog</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Success Stories</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Tech Roadmap</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Job Market Data</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="col-span-1 md:col-span-4">
                        <h4 className="font-semibold text-white mb-6">Stay Updated</h4>
                        <p className="text-slate-400 text-sm mb-4">Get the latest trends in Bangladesh's tech job market delivered to your inbox.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                            />
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white px-4">
                                <ArrowRight size={18} />
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
                    <div className="flex items-center mt-4 md:mt-0 gap-6">
                        <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                        <span className="flex items-center">
                            Built with <Heart size={14} className="inline text-red-500 mx-1 fill-red-500 animate-pulse" /> in Dhaka
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
