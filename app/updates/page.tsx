"use client";

import Link from "next/link";
import { ArrowLeft, Rocket, Zap, TrendingUp, Database, LineChart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface UpdateItem {
    version: string;
    date: string;
    title: string;
    description: string;
    features: string[];
    icon: React.ElementType;
}

const UPDATES: UpdateItem[] = [
    {
        version: "v1.2",
        date: "Today",
        title: "The Moneyball Update",
        description: "We've completely overhauled the dashboard to give you pro-level insights into your game. Stop guessing and start knowing.",
        features: [
            "Ranking Dashboard: See which ball is your highest scoring.",
            "Visual Trendline: Track your last 20 games with a beautiful neon chart.",
            "Smart Alerts: Automatic reminders when it's time for surface maintenance."
        ],
        icon: LineChart
    },
    {
        version: "v1.1",
        date: "Yesterday",
        title: "Smart Arsenal & Mileage",
        description: "Data entry just got 10x faster. We've added intelligence to the app to do the heavy lifting for you.",
        features: [
            "Smart Autocomplete: Type 'Phaze' and we'll fill in the brand and coverstock.",
            "Bulk Logging: Log a 3-game series in one tap using the new slider.",
            "Ball Database: Curated list of 50+ popular balls built-in."
        ],
        icon: Database
    },
    {
        version: "v1.0",
        date: "Initial Release",
        title: "PinPoint Launch",
        description: "The foundation of your modern bowling arsenal. Track your equipment, log your games, and maintain your gear.",
        features: [
            "Arsenal Management: Add and edit your bowling balls.",
            "Digital Maintenance Log: Never forget when you last detoxed.",
            "Mobile-first Design: Works perfectly on your phone at the lanes."
        ],
        icon: Rocket
    }
];

export default function UpdatesPage() {
    return (
        <main className="min-h-screen p-4 pb-20 md:p-8 max-w-xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">What's New</h1>
                    <p className="text-xs text-primary tracking-widest font-mono">APP UPDATES</p>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-white/10">
                {UPDATES.map((item, index) => (
                    <div key={item.version} className="relative pl-12">
                        {/* Timeline Node */}
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-secondary border border-white/10 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <item.icon className="h-5 w-5 text-primary" />
                        </div>

                        {/* Content Card */}
                        <div className="bg-secondary/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg font-bold text-white">{item.title}</h2>
                                        {index === 0 && (
                                            <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                                                LATEST
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 font-mono mt-1">{item.version} • {item.date}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                {item.description}
                            </p>

                            <ul className="space-y-2">
                                {item.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                        <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-500 text-sm">More updates coming soon...</p>
            </div>
        </main>
    );
}
