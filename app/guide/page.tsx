"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Droplets, Map, HelpCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GuidePage() {
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
                    <h1 className="text-2xl font-bold text-white">Bowler's Guide</h1>
                    <p className="text-xs text-primary tracking-widest font-mono">KNOWLEDGE BASE</p>
                </div>
            </div>

            <div className="space-y-6">

                {/* Intro */}
                <div className="bg-secondary/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/20 p-3 rounded-xl">
                            <HelpCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white mb-2">PinPoint Terminology</h2>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                PinPoint helps you track more than just scores. Here's a quick guide to understanding the maintenance and targeting features.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Surface Maintenance */}
                <div className="bg-secondary/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-[#00FF9D]" />
                        <h2 className="text-lg font-bold text-white">Surface Maintenance</h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-300 leading-relaxed">
                            <strong className="text-white">What is it?</strong><br />
                            Over time, your bowling ball's surface gets smoothed out by the lane, losing its hook potential. "Surface" refers to sanding the ball with abrasive pads (e.g., Abralon) to restore its roughness.
                        </p>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <p className="text-xs text-gray-400 font-mono mb-1">RECOMMENDED INTERVAL</p>
                            <p className="text-sm text-white font-medium">Every 3 - 9 Games</p>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            PinPoint alerts you after 9 games to remind you to refresh your surface.
                        </p>
                    </div>
                </div>

                {/* Detox */}
                <div className="bg-secondary/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Droplets className="h-5 w-5 text-blue-400" />
                        <h2 className="text-lg font-bold text-white">Detox / Oil Extraction</h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-300 leading-relaxed">
                            <strong className="text-white">What is it?</strong><br />
                            Reactive resin balls absorb oil like a sponge. Eventually, they get "full" and stop reacting effectively. A "Detox" or "Bake" uses heat or ultrasonic waves to bleed this oil out.
                        </p>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <p className="text-xs text-gray-400 font-mono mb-1">RECOMMENDED INTERVAL</p>
                            <p className="text-sm text-white font-medium">Every 30 - 60 Games</p>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            PinPoint alerts you after 50 games to consider a deep clean.
                        </p>
                    </div>
                </div>

                {/* The Line */}
                <div className="bg-secondary/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Map className="h-5 w-5 text-purple-400" />
                        <h2 className="text-lg font-bold text-white">The Line</h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Logging your "Line" helps you remember where you played on the lane.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                                <p className="text-xs text-gray-400 font-bold mb-1">STAND</p>
                                <p className="text-xs text-gray-300">Where you place your feet on the approach (Board #).</p>
                            </div>
                            <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                                <p className="text-xs text-gray-400 font-bold mb-1">TARGET</p>
                                <p className="text-xs text-gray-300">What arrow or board you aim for on the lane.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
