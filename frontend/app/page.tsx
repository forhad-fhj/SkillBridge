'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle, TrendingUp, Users, Code, Database, ChevronRight, Zap } from "lucide-react";

export default function Home() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200 font-inter">
            {/* Extended Animated Background Elements */}
            <div className="absolute inset-0 bg-slate-950 z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
                <div className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[800px] h-[800px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-40"></div>
            </div>

            <div className="relative z-10">
                {/* Navbar */}
                <nav className="border-b border-white/5 backdrop-blur-xl bg-slate-950/40 sticky top-0 z-50">
                    <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 group-hover:from-blue-300 group-hover:via-cyan-300 group-hover:to-teal-300 transition-all duration-300">
                                SkillBridge
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
                            <Link href="#trending" className="hover:text-white transition-colors">Trending Roles</Link>
                            <Link href="/dashboard">
                                <Button variant="secondary" size="sm" className="bg-transparent hover:bg-white/5 text-slate-200 border border-white/10">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button size="sm" className="bg-white text-slate-950 hover:bg-slate-100 border-none font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="container mx-auto px-6 pt-32 pb-40 flex flex-col items-center text-center relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-slate-800/40 border border-slate-700/50 rounded-full px-4 py-1.5 mb-10 backdrop-blur-md shadow-lg shadow-cyan-500/5">
                            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
                            <span className="text-sm font-medium text-cyan-200 tracking-wide">Updated for 2026 Job Market</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
                            Bridge the gap to your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-gradient-x">dream tech job</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-300/90 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                            Stop guessing. SkillBridge analyzes your skills against <span className="text-white font-medium">real-time market data</span> to build you a personalized roadmap for success in Bangladesh's tech industry.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,182,212,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-2xl shadow-cyan-500/20 transition-all flex items-center gap-3 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <span className="relative">Check My Job Readiness</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative" />
                                </motion.button>
                            </Link>
                            <Link href="#how-it-works">
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-5 rounded-2xl bg-slate-800/40 text-white font-medium border border-white/10 hover:border-white/20 transition-all backdrop-blur-md flex items-center gap-2"
                                >
                                    How it works
                                </motion.button>
                            </Link>
                        </motion.div>

                        <motion.p variants={fadeInUp} className="mt-8 text-sm text-slate-500 flex items-center justify-center gap-2 opacity-80">
                            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span>Analysis takes <span className="text-slate-300 font-medium">less than 2 minutes</span> • No sign up required</span>
                        </motion.p>
                    </motion.div>
                </section>

                {/* Social Proof Stats - Glass Card */}
                <section className="relative -mt-20 z-20 container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50"
                    >
                        <div className="flex flex-col items-center justify-center p-6 text-center group hover:bg-white/5 transition-colors rounded-xl">
                            <div className="mb-4 p-4 bg-blue-500/10 rounded-full border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-8 h-8 text-blue-400" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">1,200+</div>
                            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Learners Analyzed</div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-6 text-center group hover:bg-white/5 transition-colors rounded-xl">
                            <div className="mb-4 p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Database className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">500+</div>
                            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Skills Mapped</div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-6 text-center group hover:bg-white/5 transition-colors rounded-xl">
                            <div className="mb-4 p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">98%</div>
                            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Positive Feedback</div>
                        </div>
                    </motion.div>
                </section>

                {/* How It Works - Enhanced Spacing */}
                <section id="how-it-works" className="py-32 container mx-auto px-6">
                    <div className="text-center mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                        >
                            Your Path to Employment
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed"
                        >
                            We've simplified the complex process of career planning into three easy, actionable steps.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                step: "01",
                                title: "Upload Your CV",
                                desc: "Our AI scans your resume to identify your current technical skills and experience levels.",
                                icon: "📄",
                                color: "blue"
                            },
                            {
                                step: "02",
                                title: "Choose a Role",
                                desc: "Select your target role (e.g. Frontend Developer) to compare against market standards.",
                                icon: "🎯",
                                color: "cyan"
                            },
                            {
                                step: "03",
                                title: "Get Your Roadmap",
                                desc: "Receive a personalized learning path with resources to bridge your skill gaps.",
                                icon: "🚀",
                                color: "emerald"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="relative bg-slate-900/40 backdrop-blur-md border border-white/5 p-10 rounded-3xl overflow-hidden group hover:bg-slate-800/40 transition-all duration-500"
                            >
                                <div className={`absolute top-0 right-0 p-32 bg-${item.color}-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-${item.color}-500/20`}></div>

                                <div className="relative z-10">
                                    <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 origin-bottom-left">{item.icon}</div>
                                    <div className={`text-sm font-bold text-${item.color}-400 mb-2 tracking-widest uppercase`}>Step {item.step}</div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Trending Roles - Premium Cards */}
                <section id="trending" className="py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    🔥 Trending Roles in <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">High Demand</span>
                                </h2>
                                <p className="text-slate-400 text-xl font-light">Top positions companies in Bangladesh are hiring for right now.</p>
                            </div>
                            <Link href="/dashboard">
                                <Button variant="outline" className="h-12 px-6 text-base border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 rounded-xl transition-all">
                                    View All Roles <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Frontend Developer Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-900 border border-white/5 rounded-[2rem] p-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="bg-slate-950/95 rounded-[1.9rem] p-10 h-full relative z-10 transition-transform duration-500 group-hover:scale-[0.99] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                            <Code className="w-10 h-10 text-cyan-400" />
                                        </div>
                                        <span className="px-4 py-1.5 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full border border-green-500/20">Active Hiring</span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-3">Frontend Developer</h3>
                                    <p className="text-slate-400 mb-8 text-lg leading-relaxed">Build modern, responsive user interfaces using React, Next.js, and Tailwind CSS. The most sought-after role in 2026.</p>

                                    <div className="flex flex-wrap gap-3 mb-10">
                                        {['React', 'TypeScript', 'Tailwind', 'Next.js'].map((skill) => (
                                            <span key={skill} className="px-4 py-2 bg-slate-900 text-slate-300 text-sm font-medium rounded-xl border border-slate-800 group-hover:border-cyan-500/30 transition-colors">{skill}</span>
                                        ))}
                                    </div>

                                    <Link href="/dashboard" className="inline-flex items-center text-cyan-400 font-bold text-lg hover:text-cyan-300 transition-colors group/link">
                                        Analyze Fit <ArrowRight className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Data Analyst Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-900 border border-white/5 rounded-[2rem] p-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="bg-slate-950/95 rounded-[1.9rem] p-10 h-full relative z-10 transition-transform duration-500 group-hover:scale-[0.99] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                                            <Database className="w-10 h-10 text-purple-400" />
                                        </div>
                                        <span className="px-4 py-1.5 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full border border-green-500/20">Active Hiring</span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-3">Data Analyst</h3>
                                    <p className="text-slate-400 mb-8 text-lg leading-relaxed">Transform massive datasets into actionable business insights using Python, SQL, and advanced visualization tools.</p>

                                    <div className="flex flex-wrap gap-3 mb-10">
                                        {['Python', 'SQL', 'Pandas', 'PowerBI'].map((skill) => (
                                            <span key={skill} className="px-4 py-2 bg-slate-900 text-slate-300 text-sm font-medium rounded-xl border border-slate-800 group-hover:border-purple-500/30 transition-colors">{skill}</span>
                                        ))}
                                    </div>

                                    <Link href="/dashboard" className="inline-flex items-center text-purple-400 font-bold text-lg hover:text-purple-300 transition-colors group/link">
                                        Analyze Fit <ArrowRight className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Refined CTA Section */}
                <section className="py-32 container mx-auto px-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-[120px] rounded-full transform rotate-3 scale-75 opacity-20 pointer-events-none"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-16 text-center overflow-hidden shadow-2xl"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">bridge the gap?</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                                Join thousands of Bangladeshi students who are fast-tracking their career with data-driven insights. It's free and takes seconds.
                            </p>

                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 rounded-2xl bg-white text-slate-950 font-bold text-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
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
