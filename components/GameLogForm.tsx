"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";

export function GameLogForm() {
    const { arsenal, logGame } = useApp();
    const router = useRouter();

    const [formData, setFormData] = useState({
        ballId: "",
        score: "",
        boardStand: "",
        boardTarget: "",
        notes: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.ballId) return;

        logGame({
            ballId: formData.ballId,
            score: parseInt(formData.score) || 0,
            line: formData.boardStand && formData.boardTarget ? {
                boardStand: parseInt(formData.boardStand),
                boardTarget: parseInt(formData.boardTarget)
            } : undefined,
            notes: formData.notes
        });

        router.push('/arsenal');
    };

    if (arsenal.length === 0) {
        return (
            <div className="text-center p-8 text-gray-400">
                <p>You need to add a ball to your arsenal before logging a game.</p>
                <Button onClick={() => router.push('/arsenal')} className="mt-4" variant="secondary">
                    Go Add a Ball
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Select Ball Used</label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                    {arsenal.map(ball => (
                        <div
                            key={ball.id}
                            onClick={() => setFormData({ ...formData, ballId: ball.id })}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${formData.ballId === ball.id
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-secondary border-white/5 text-gray-400 hover:bg-white/5"
                                }`}
                        >
                            <div className="font-medium">{ball.name}</div>
                            <div className="text-xs opacity-70">{ball.brand}</div>
                        </div>
                    ))}
                </div>
            </div>

            <Input
                required
                type="number"
                label="Score"
                placeholder="e.g. 215"
                value={formData.score}
                onChange={e => setFormData({ ...formData, score: e.target.value })}
            />

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">The Line (Optional)</label>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="number"
                        placeholder="Stand (Board)"
                        value={formData.boardStand}
                        onChange={e => setFormData({ ...formData, boardStand: e.target.value })}
                    />
                    <Input
                        type="number"
                        placeholder="Target (Arrow)"
                        value={formData.boardTarget}
                        onChange={e => setFormData({ ...formData, boardTarget: e.target.value })}
                    />
                </div>
            </div>

            <Input
                label="Notes"
                placeholder="Lane condition, breaks, etc."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />

            <Button type="submit" className="w-full h-12 text-lg" disabled={!formData.ballId}>
                <Save className="mr-2" /> Log Game
            </Button>
        </form>
    );
}
