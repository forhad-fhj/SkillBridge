import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "SkillBridge - Student-to-Job Transition Tracker",
    description: "Analyze your skills against real market demands in Bangladesh. Get personalized learning roadmaps and internship readiness scores.",
    keywords: ["job skills", "career development", "Bangladesh jobs", "skill gap analysis", "internship readiness"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
