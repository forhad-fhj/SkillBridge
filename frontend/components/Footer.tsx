import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart, Facebook } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-xl relative z-10">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                SkillBridge
                            </span>
                        </Link>
                        <p className="text-slate-400 text-base leading-relaxed mb-6">
                            Empowering Bangladeshi students and job seekers with data-driven career insights. Bridge the gap between your skills and the global market.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2.5 bg-slate-900 rounded-full border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-400 transition-all group">
                                <Github size={20} className="group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link href="#" className="p-2.5 bg-slate-900 rounded-full border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-400 transition-all group">
                                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link href="#" className="p-2.5 bg-slate-900 rounded-full border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-400 transition-all group">
                                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white text-lg mb-6">Product</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors flex items-center gap-2">Readiness Analyzer</Link></li>
                            <li><Link href="/roadmap" className="hover:text-cyan-400 transition-colors">Learning Roadmap</Link></li>
                            <li><Link href="/roles" className="hover:text-cyan-400 transition-colors">Career Paths</Link></li>
                            <li><Link href="/skills" className="hover:text-cyan-400 transition-colors">Skill Trends</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white text-lg mb-6">Resources</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Success Stories</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Tech Blog 🇧🇩</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Job Market Report</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Student Guide</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                                <span>hello@skillbridge.bd</span>
                            </li>
                            <li>
                                <p className="text-sm text-slate-500 mt-4">
                                    Have questions? Does your university want to partner with us?
                                </p>
                                <Link href="#" className="text-blue-400 font-medium hover:underline mt-2 inline-block">
                                    Get in touch &rarr;
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
                    <div className="flex items-center bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                        <span className="flex items-center gap-1.5">
                            Built with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> for Bangladeshi tech aspirants 🇧🇩
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
