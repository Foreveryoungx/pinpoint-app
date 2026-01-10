"use client";

import { useApp } from "@/components/AppProvider";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis, ReferenceLine } from "recharts";
import { TrendingUp } from "lucide-react";

export function ScoreHistoryChart() {
    const { logs } = useApp();

    // Get last 20 games reversd (logs are usually newest first)
    // And calculate average score for bulk logs
    const recentGames = [...logs]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-20)
        .map(log => ({
            ...log,
            displayScore: Math.round(log.score / (log.gamesCount || 1))
        }));

    if (recentGames.length < 2) {
        return null; // Need at least 2 games to show a line
    }

    const average = Math.round(recentGames.reduce((acc, curr) => acc + curr.displayScore, 0) / recentGames.length);

    // Calculate dynamic Y-axis domain
    const minScore = Math.min(...recentGames.map(g => g.displayScore));
    const maxScore = Math.max(...recentGames.map(g => g.displayScore));
    const domainMin = Math.max(0, minScore - 20);
    const domainMax = Math.min(300, maxScore + 20);

    return (
        <div className="w-full bg-secondary/30 border border-white/5 rounded-2xl p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Recent Trend
                </h3>
                <div className="text-xs text-gray-400">
                    Last {recentGames.length} Games • Avg: <span className="text-white font-bold">{average}</span>
                </div>
            </div>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={recentGames}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00FF9D" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00FF9D" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <YAxis
                            hide={false}
                            domain={[domainMin, domainMax]}
                            tick={{ fontSize: 10, fill: '#666' }}
                            axisLine={false}
                            tickLine={false}
                            width={30}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                            itemStyle={{ color: '#00FF9D' }}
                            formatter={(value: number | undefined) => [`${value}`, 'Score']}
                            labelFormatter={() => ''}
                        />
                        <ReferenceLine y={average} stroke="#666" strokeDasharray="3 3" label={{ position: 'right', value: 'Avg', fill: '#666', fontSize: 10 }} />
                        <Area
                            type="monotone"
                            dataKey="displayScore"
                            stroke="#00FF9D"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
