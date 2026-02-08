'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle, TrendingUp, Users, Code, Database, ChevronRight, Zap } from "lucide-react";

export default function Home() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-slate-950 z-0">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            </div>

            <div className="relative z-10 font-inter">
                {/* Navbar */}
                <nav className="border-b border-white/5 backdrop-blur-md bg-slate-950/50 sticky top-0 z-50">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-blue-300 group-hover:to-cyan-300 transition-all">
                                SkillBridge
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
                            <Link href="#trending" className="hover:text-white transition-colors">Trending Roles</Link>
                            <Link href="/dashboard">
                                <Button variant="secondary" size="sm" className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-none shadow-lg shadow-blue-500/25">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span className="text-sm font-medium text-cyan-300">Updated for 2026 Job Market</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                            Know how <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">close you are</span> to your dream tech job in Bangladesh
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            SkillBridge analyzes your skills and maps them to real job market requirements, providing a personalized roadmap to bridge the gap.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center gap-2 group"
                                >
                                    Check My Job Readiness
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link href="#how-it-works">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-slate-800/50 text-white font-medium border border-slate-700 hover:bg-slate-800 transition-all backdrop-blur-md"
                                >
                                    How it works
                                </motion.button>
                            </Link>
                        </motion.div>

                        <motion.p variants={fadeInUp} className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            Takes less than 2 minutes • No sign up required
                        </motion.p>
                    </motion.div>
                </section>

                {/* Social Proof Stats */}
                <section className="border-y border-slate-800 bg-slate-900/30 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center justify-center gap-4"
                            >
                                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                    <Users className="w-8 h-8 text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <div className="text-2xl font-bold text-white">1,200+</div>
                                    <div className="text-sm text-slate-400">Learners Analyzed</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center justify-center gap-4"
                            >
                                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                    <Database className="w-8 h-8 text-cyan-400" />
                                </div>
                                <div className="text-left">
                                    <div className="text-2xl font-bold text-white">500+</div>
                                    <div className="text-sm text-slate-400">Skills Mapped</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center justify-center gap-4"
                            >
                                <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                    <TrendingUp className="w-8 h-8 text-emerald-400" />
                                </div>
                                <div className="text-left">
                                    <div className="text-2xl font-bold text-white">98%</div>
                                    <div className="text-sm text-slate-400">Positive Feedback</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-24 container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How SkillBridge Works</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            We've simplified the process of career planning into three easy steps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Upload Your CV",
                                desc: "Our AI scans your resume to identify your current technical skills and experience levels.",
                                icon: "📄"
                            },
                            {
                                step: "02",
                                title: "Choose a Role",
                                desc: "Select your target role (e.g. Frontend Developer) to compare against market standards.",
                                icon: "🎯"
                            },
                            {
                                step: "03",
                                title: "Get Your Roadmap",
                                desc: "Receive a personalized learning path with resources to bridge your skill gaps.",
                                icon: "🚀"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-2xl hover:border-blue-500/30 hover:bg-slate-800/60 transition-all group"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <div className="text-sm font-bold text-blue-500 mb-2">STEP {item.step}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Trending Roles */}
                <section id="trending" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900/50 border-t border-slate-800">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                    🔥 Trending Roles in Bangladesh
                                </h2>
                                <p className="text-slate-400 text-lg">High-demand positions you should aim for in 2026.</p>
                            </div>
                            <Link href="/dashboard">
                                <Button variant="outline" className="text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800">
                                    View All Roles <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Frontend Developer Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-1 overflow-hidden hover:border-cyan-500/50 transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="bg-slate-950/90 rounded-[22px] p-8 h-full relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                                            <Code className="w-8 h-8 text-cyan-400" />
                                        </div>
                                        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold uppercase rounded-full border border-green-500/20">High Demand</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">Frontend Developer</h3>
                                    <p className="text-slate-400 mb-6 line-clamp-2">Build modern, responsive user interfaces using React, Next.js, and Tailwind CSS.</p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {['React', 'TypeScript', 'Tailwind', 'Next.js'].map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-lg border border-slate-700">{skill}</span>
                                        ))}
                                    </div>

                                    <Link href="/dashboard" className="inline-flex items-center text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                                        Analyze Fit <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Data Analyst Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-1 overflow-hidden hover:border-purple-500/50 transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="bg-slate-950/90 rounded-[22px] p-8 h-full relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                            <Database className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold uppercase rounded-full border border-green-500/20">High Demand</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">Data Analyst</h3>
                                    <p className="text-slate-400 mb-6 line-clamp-2">Transform data into actionable insights using Python, SQL, and data visualization tools.</p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {['Python', 'SQL', 'Pandas', 'PowerBI'].map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-lg border border-slate-700">{skill}</span>
                                        ))}
                                    </div>

                                    <Link href="/dashboard" className="inline-flex items-center text-purple-400 font-bold hover:text-purple-300 transition-colors">
                                        Analyze Fit <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 container mx-auto px-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl rounded-[100px] transform rotate-3 scale-75 opacity-30"></div>
                    <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-12 text-center overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500"></div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to bridge your skill gap?</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                            Join thousands of Bangladeshi students who are fast-tracking their career with data-driven insights.
                        </p>

                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg shadow-xl shadow-white/10 hover:shadow-white/20 transition-all"
                            >
                                Assess My Skills Now
                            </motion.button>
                        </Link>
                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}
