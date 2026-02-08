'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle, TrendingUp, Users, Code, Database, ChevronRight, Zap } from "lucide-react";

export default function Home() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200 font-inter">
            {/* Extended Animated Background Elements */}
            <div className="absolute inset-0 bg-slate-950 z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob"></div>
                <div className="absolute top-[10%] -right-[10%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-25"></div>
            </div>

            <div className="relative z-10">
                {/* Navbar */}
                <nav className="border-b border-white/5 backdrop-blur-xl bg-slate-950/40 sticky top-0 z-50">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <span className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 group-hover:from-blue-300 group-hover:via-cyan-300 group-hover:to-teal-300 transition-all duration-300">
                                SkillBridge
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
                            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
                            <Link href="#trending" className="hover:text-white transition-colors">Trending Roles</Link>
                            <Link href="/dashboard">
                                <Button size="sm" className="bg-white text-slate-950 hover:bg-slate-100 border-none font-semibold h-9 px-4 shadow-lg shadow-white/5 hover:shadow-white/10 transition-all">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section - Compact */}
                <section className="container mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-slate-800/40 border border-slate-700/50 rounded-full px-3 py-1 mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/5">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                            <span className="text-xs font-medium text-cyan-200 tracking-wide">Updated for 2026 Job Market</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1] drop-shadow-2xl">
                            Bridge the gap to your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-gradient-x">dream tech job</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg text-slate-300/90 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                            Stop guessing. We analyze your skills against <span className="text-white font-medium">real-time market data</span> to build you a personalized roadmap for success.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6,182,212,0.2)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm md:text-base shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <span className="relative">Check My Job Readiness</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative" />
                                </motion.button>
                            </Link>
                            <Link href="#how-it-works">
                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 rounded-xl bg-slate-800/40 text-white font-medium text-sm md:text-base border border-white/10 hover:border-white/20 transition-all backdrop-blur-md flex items-center gap-2"
                                >
                                    How it works
                                </motion.button>
                            </Link>
                        </motion.div>

                        <motion.p variants={fadeInUp} className="mt-6 text-xs text-slate-500 flex items-center justify-center gap-2 opacity-80">
                            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span>Analysis takes <span className="text-slate-300 font-medium">2 minutes</span> • No sign up required</span>
                        </motion.p>
                    </motion.div>
                </section>

                {/* Social Proof Stats - Compact */}
                <section className="relative -mt-12 z-20 container mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl shadow-black/40 max-w-4xl mx-auto"
                    >
                        <div className="flex flex-col items-center justify-center p-3 text-center group hover:bg-white/5 transition-colors rounded-lg">
                            <div className="mb-2 p-2 bg-blue-500/10 rounded-full border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-0.5">1,200+</div>
                            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Learners Analyzed</div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-3 text-center group hover:bg-white/5 transition-colors rounded-lg">
                            <div className="mb-2 p-2 bg-cyan-500/10 rounded-full border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Database className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-0.5">500+</div>
                            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Skills Mapped</div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-3 text-center group hover:bg-white/5 transition-colors rounded-lg">
                            <div className="mb-2 p-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-0.5">98%</div>
                            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Positive Feedback</div>
                        </div>
                    </motion.div>
                </section>

                {/* How It Works - Compact Cards */}
                <section id="how-it-works" className="py-20 container mx-auto px-6">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-3xl font-bold text-white mb-3"
                        >
                            Your Path to Employment
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed"
                        >
                            Simplified career planning in three actionable steps.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Upload Your CV",
                                desc: "Our AI scans your resume to identify technical skills and experience levels.",
                                icon: "📄",
                                color: "blue"
                            },
                            {
                                step: "02",
                                title: "Choose a Role",
                                desc: "Select a target role to compare your profile against market standards.",
                                icon: "🎯",
                                color: "cyan"
                            },
                            {
                                step: "03",
                                title: "Get Your Roadmap",
                                desc: "Receive a personalized learning path to bridge your skill gaps.",
                                icon: "🚀",
                                color: "emerald"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="relative bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl overflow-hidden group hover:bg-slate-800/40 transition-all duration-300"
                            >
                                <div className={`absolute top-0 right-0 p-16 bg-${item.color}-500/5 rounded-full blur-xl -mr-8 -mt-8 transition-all group-hover:bg-${item.color}-500/10`}></div>

                                <div className="relative z-10">
                                    <div className="text-3xl mb-4 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 origin-bottom-left">{item.icon}</div>
                                    <div className={`text-[10px] font-bold text-${item.color}-400 mb-1.5 tracking-widest uppercase`}>Step {item.step}</div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Trending Roles - Compact */}
                <section id="trending" className="py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950"></div>

                    <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                    🔥 Trending Roles
                                </h2>
                                <p className="text-slate-400 text-base font-light">Positions in high demand right now.</p>
                            </div>
                            <Link href="/dashboard">
                                <Button variant="outline" className="h-9 px-4 text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 rounded-lg transition-all">
                                    View All Roles <ChevronRight className="w-3 h-3 ml-1" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Frontend Developer Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-900 border border-white/5 rounded-2xl p-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="bg-slate-950/95 rounded-[0.9rem] p-6 h-full relative z-10 transition-transform duration-500 group-hover:translate-x-[1px] group-hover:translate-y-[1px]">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                            <Code className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <span className="px-2.5 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-500/20">Active Hiring</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">Frontend Developer</h3>
                                    <p className="text-slate-400 mb-4 text-sm leading-relaxed">Build modern, responsive user interfaces using React, Next.js, and Tailwind CSS.</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {['React', 'TypeScript', 'Tailwind', 'Next.js'].map((skill) => (
                                            <span key={skill} className="px-2.5 py-1 bg-slate-900 text-slate-300 text-[10px] font-medium rounded-md border border-slate-800 group-hover:border-cyan-500/30 transition-colors">{skill}</span>
                                        ))}
                                    </div>

                                    <Link href="/dashboard" className="inline-flex items-center text-cyan-400 font-bold text-sm hover:text-cyan-300 transition-colors group/link">
                                        Analyze Fit <ArrowRight className="w-3 h-3 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Data Analyst Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-900 border border-white/5 rounded-2xl p-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="bg-slate-950/95 rounded-[0.9rem] p-6 h-full relative z-10 transition-transform duration-500 group-hover:translate-x-[1px] group-hover:translate-y-[1px]">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2.5 bg-purple-500/10 rounded-lg border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                                            <Database className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <span className="px-2.5 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-500/20">Active Hiring</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">Data Analyst</h3>
                                    <p className="text-slate-400 mb-4 text-sm leading-relaxed">Transform massive datasets into actionable business insights using Python and SQL.</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {['Python', 'SQL', 'Pandas', 'PowerBI'].map((skill) => (
                                            <span key={skill} className="px-2.5 py-1 bg-slate-900 text-slate-300 text-[10px] font-medium rounded-md border border-slate-800 group-hover:border-purple-500/30 transition-colors">{skill}</span>
                                        ))}
                                    </div>

                                    <Link href="/dashboard" className="inline-flex items-center text-purple-400 font-bold text-sm hover:text-purple-300 transition-colors group/link">
                                        Analyze Fit <ArrowRight className="w-3 h-3 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Refined CTA Section - Compact */}
                <section className="py-20 container mx-auto px-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-[80px] rounded-full transform rotate-3 scale-75 opacity-20 pointer-events-none"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center overflow-hidden shadow-2xl max-w-3xl mx-auto"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">bridge the gap?</span>
                            </h2>
                            <p className="text-ml md:text-lg text-slate-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
                                Join thousands of Bangladeshi students who are fast-tracking their career with data-driven insights.
                            </p>

                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 rounded-xl bg-white text-slate-950 font-bold text-base shadow-lg shadow-white/10 transition-all"
                                >
                                    Assess My Skills Now
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </section>

                <Footer />
            </div>
        </main>
    );
}
