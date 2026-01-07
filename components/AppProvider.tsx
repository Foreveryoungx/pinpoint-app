"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, Ball, GameLog } from '@/lib/types';

interface AppContextType extends AppState {
    addBall: (ball: Omit<Ball, 'id' | 'gamesTotal' | 'gamesSinceSurface' | 'gamesSinceDetox'>) => void;
    updateBall: (id: string, updates: Partial<Ball>) => void;
    deleteBall: (id: string) => void;
    logGame: (log: Omit<GameLog, 'id' | 'date'>) => void;
    resetMaintenance: (ballId: string, type: 'surface' | 'detox') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'pinpoint_data_v1';

const INITIAL_STATE: AppState = {
    arsenal: [],
    logs: [],
};

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AppState>(INITIAL_STATE);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setState(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state, isLoaded]);

    const addBall = (ballData: Omit<Ball, 'id' | 'gamesTotal' | 'gamesSinceSurface' | 'gamesSinceDetox'>) => {
        const newBall: Ball = {
            ...ballData,
            id: crypto.randomUUID(),
            gamesTotal: 0,
            gamesSinceSurface: 0,
            gamesSinceDetox: 0,
        };
        setState(prev => ({ ...prev, arsenal: [...prev.arsenal, newBall] }));
    };

    const updateBall = (id: string, updates: Partial<Ball>) => {
        setState(prev => ({
            ...prev,
            arsenal: prev.arsenal.map(b => b.id === id ? { ...b, ...updates } : b)
        }));
    };

    const deleteBall = (id: string) => {
        setState(prev => ({
            ...prev,
            arsenal: prev.arsenal.filter(b => b.id !== id)
        }));
    };

    const logGame = (logData: Omit<GameLog, 'id' | 'date'>) => {
        const newLog: GameLog = {
            ...logData,
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
        };

        setState(prev => {
            // Update ball mileage
            const updatedArsenal = prev.arsenal.map(b => {
                if (b.id === logData.ballId) {
                    return {
                        ...b,
                        gamesTotal: b.gamesTotal + 1,
                        gamesSinceSurface: b.gamesSinceSurface + 1,
                        gamesSinceDetox: b.gamesSinceDetox + 1
                    };
                }
                return b;
            });

            return {
                arsenal: updatedArsenal,
                logs: [newLog, ...prev.logs]
            };
        });
    };

    const resetMaintenance = (ballId: string, type: 'surface' | 'detox') => {
        setState(prev => ({
            ...prev,
            arsenal: prev.arsenal.map(b => {
                if (b.id === ballId) {
                    if (type === 'surface') return { ...b, gamesSinceSurface: 0 };
                    if (type === 'detox') return { ...b, gamesSinceDetox: 0 };
                }
                return b;
            })
        }));
    };

    if (!isLoaded) {
        return null; // Or a loading spinner
    }

    return (
        <AppContext.Provider value={{ ...state, addBall, updateBall, deleteBall, logGame, resetMaintenance }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
