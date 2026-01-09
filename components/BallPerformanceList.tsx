"use client";

import { useApp } from "@/components/AppProvider";
import { calculateBallStats } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { Trophy, TrendingUp } from "lucide-react";

export function BallPerformanceList() {
    const { arsenal, logs } = useApp();
    const stats = calculateBallStats(arsenal, logs);

    // Filter out balls with 0 games for the ranking to keep it clean
    const activeStats = stats.filter(s => s.gamesPlayed > 0);

    if (activeStats.length === 0) {
        return (
            <div className="p-6 rounded-2xl bg-secondary/30 border border-white/5 text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-gray-500 mb-2" />
                <h3 className="text-gray-300 font-medium">No Data Yet</h3>
                <p className="text-sm text-gray-500">Log some games to unlock performance stats.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" /> Performance Ranking
            </h2>

            <div className="space-y-3">
                {activeStats.map((stat, index) => (
                    <div key={stat.ballId} className="relative group">
                        {/* Rank Badge */}
                        <div className={cn(
                            "absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border shadow-lg z-10",
                            index === 0 ? "bg-primary text-black border-primary" : "bg-secondary text-gray-400 border-white/10"
                        )}>
                            {index + 1}
                        </div>

                        <div className="ml-2 p-3 rounded-xl bg-secondary border border-white/5 flex items-center gap-3 relative overflow-hidden">
                            {/* Progress Bar Background */}
                            <div
                                className="absolute top-0 bottom-0 left-0 bg-primary/5 transition-all duration-1000"
                                style={{ width: `${(stat.average / 300) * 100}%` }}
                            />

                            {stat.image ? (
                                <div className="h-10 w-10 rounded-full bg-cover bg-center shrink-0 border border-white/10 z-0" style={{ backgroundImage: `url(${stat.image})` }} />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 z-0">
                                    <span className="text-[10px] text-gray-500">{stat.brand.slice(0, 2)}</span>
                                </div>
                            )}

                            <div className="flex-1 min-w-0 z-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-white truncate">{stat.name}</h3>
                                    <span className="text-xl font-bold text-primary">{stat.average}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{stat.gamesPlayed} games</span>
                                    <span>High: {stat.highScore}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
