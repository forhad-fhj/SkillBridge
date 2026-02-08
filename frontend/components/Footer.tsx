import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                SkillBridge
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Helping Bangladeshi students and job seekers measure their readiness for the global tech market.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Analyzer</Link></li>
                            <li><Link href="/roadmap" className="hover:text-blue-400 transition-colors">Roadmap</Link></li>
                            <li><Link href="/roles" className="hover:text-blue-400 transition-colors">Career Paths</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Success Stories</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Job Market Data</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white text-slate-400 transition-all">
                                <Github size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white text-slate-400 transition-all">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white text-slate-400 transition-all">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white text-slate-400 transition-all">
                                <Mail size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
                    <div className="flex items-center mt-4 md:mt-0">
                        <span>Built with <Heart size={14} className="inline text-red-500 mx-1 fill-red-500" /> for Bangladeshi tech aspirants 🇧🇩</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
