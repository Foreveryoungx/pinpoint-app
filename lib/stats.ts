import { AppState, Ball, GameLog } from "./types";

export interface BallStats {
    ballId: string;
    name: string;
    average: number;
    highScore: number;
    gamesPlayed: number;
    totalPins: number;
    image?: string;
    brand: string;
}

export function calculateBallStats(arsenal: Ball[], logs: GameLog[]): BallStats[] {
    const statsMap = new Map<string, { totalPins: number; games: number; high: number }>();

    // Initialize map
    arsenal.forEach(ball => {
        statsMap.set(ball.id, { totalPins: 0, games: 0, high: 0 });
    });

    // Aggregate logs
    logs.forEach(log => {
        const current = statsMap.get(log.ballId);
        if (current) {
            current.totalPins += log.score;
            current.games += (log.gamesCount || 1);
            const gameScore = Math.round(log.score / (log.gamesCount || 1));

            if (gameScore > current.high) {
                current.high = gameScore;
            }
        }
    });

    // Transform to array and sort
    return arsenal.map(ball => {
        const stat = statsMap.get(ball.id)!;
        return {
            ballId: ball.id,
            name: ball.name,
            brand: ball.brand,
            image: ball.image,
            average: stat.games > 0 ? Math.round(stat.totalPins / stat.games) : 0,
            highScore: stat.high,
            gamesPlayed: stat.games,
            totalPins: stat.totalPins
        };
    }).sort((a, b) => b.average - a.average); // Default sort by Average Descending
}
