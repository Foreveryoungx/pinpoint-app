export interface Ball {
    id: string;
    name: string;
    brand: string;
    coverstock: string;
    gamesTotal: number;
    gamesSinceSurface: number;
    gamesSinceDetox: number;
    image?: string;
    notes?: string;
    isRetired?: boolean;
}

export interface GameLog {
    id: string;
    ballId: string;
    date: string;
    score: number;
    location?: string;
    line?: {
        boardStand: number;
        boardTarget: number;
    };
    notes?: string;
}

export interface AppState {
    arsenal: Ball[];
    logs: GameLog[];
}
