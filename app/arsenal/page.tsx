"use client";

import { useApp } from "@/components/AppProvider";
import { AddBallForm } from "@/components/AddBallForm";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Plus, NotebookPen, RefreshCcw, Pencil } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Ball } from "@/lib/types";

export default function ArsenalPage() {
    const { arsenal, resetMaintenance } = useApp();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingBall, setEditingBall] = useState<Ball | null>(null);

    const handleEdit = (ball: Ball) => {
        setEditingBall(ball);
        setShowAddForm(true);
    };

    const closeForm = () => {
        setShowAddForm(false);
        setEditingBall(null);
    };

    return (
        <main className="min-h-screen p-4 pb-20 md:p-8 max-w-2xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">My Arsenal</h1>
                    <p className="text-gray-400 text-sm">Manage your equipment & maintenance</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/log">
                        <Button variant="primary" size="sm">
                            <NotebookPen className="mr-2 h-4 w-4" /> Log Game
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" size="sm">Back</Button>
                    </Link>
                </div>
            </div>

            {showAddForm ? (
                <AddBallForm onClose={closeForm} initialData={editingBall || undefined} />
            ) : (
                <Button
                    onClick={() => setShowAddForm(true)}
                    className="w-full py-6 text-lg border-2 border-dashed border-white/10 bg-transparent hover:bg-white/5 hover:border-primary/50 text-gray-400 hover:text-primary"
                >
                    <Plus className="mr-2" /> Add New Ball
                </Button>
            )}

            <div className="space-y-4">
                {arsenal.length === 0 && !showAddForm && (
                    <div className="text-center py-12 text-gray-500">
                        <p>No balls in your arsenal yet.</p>
                        <p className="text-sm mt-1">Add your first ball to start tracking.</p>
                    </div>
                )}

                {arsenal.map((ball) => {
                    const needsSurface = ball.gamesSinceSurface >= 9;
                    const needsDetox = ball.gamesSinceDetox >= 50;

                    return (
                        <div key={ball.id} className="p-4 rounded-xl bg-secondary border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
                            {/* Maintenance Alert Banners */}
                            {(needsSurface || needsDetox) && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-alert-surface to-alert-detox opacity-50" />
                            )}

                            <div className="flex gap-4 items-start">
                                {ball.image ? (
                                    <div className="h-16 w-16 rounded-lg bg-cover bg-center shrink-0 border border-white/10" style={{ backgroundImage: `url(${ball.image})` }} />
                                ) : (
                                    <div className="h-16 w-16 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                        <span className="text-xs text-gray-500 text-center px-1">{ball.brand}</span>
                                    </div>
                                )}

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{ball.name}</h3>
                                            <p className="text-sm text-gray-400">{ball.brand} • {ball.coverstock}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="bg-white/5 px-3 py-1 rounded-full text-xs font-mono text-gray-300">
                                                {ball.gamesTotal} gms
                                            </div>
                                            <button
                                                onClick={() => handleEdit(ball)}
                                                className="text-gray-500 hover:text-white p-1"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <MaintenanceBar
                                    current={ball.gamesSinceSurface}
                                    max={9}
                                    label="Surface"
                                    type="surface"
                                    onReset={() => resetMaintenance(ball.id, 'surface')}
                                />
                                <MaintenanceBar
                                    current={ball.gamesSinceDetox}
                                    max={50}
                                    label="Detox"
                                    type="detox"
                                    onReset={() => resetMaintenance(ball.id, 'detox')}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    );
}

function MaintenanceBar({ current, max, label, type, onReset }: { current: number, max: number, label: string, type: 'surface' | 'detox', onReset: (id: string, type: 'surface' | 'detox') => void }) {
    const percentage = Math.min(100, Math.round((current / max) * 100));
    const isOverdue = current >= max;
    const isWarning = !isOverdue && percentage >= 80;

    let colorClass = "bg-primary";
    let bgClass = "bg-primary/20";

    if (isOverdue) {
        colorClass = type === 'surface' ? "bg-alert-surface" : "bg-alert-detox";
        bgClass = type === 'surface' ? "bg-alert-surface/20" : "bg-alert-detox/20";
    } else if (isWarning) {
        colorClass = "bg-yellow-400";
        bgClass = "bg-yellow-400/20";
    }

    return (
        <div className={cn("p-3 rounded-lg flex flex-col gap-2 transition-colors", isOverdue ? `${bgClass.replace('/20', '/10')} border ${colorClass.replace('bg-', 'border-')}/20` : "bg-black/20")}>
            <div className="flex justify-between items-center mb-1">
                <span className={cn("text-xs font-medium uppercase tracking-wider", isOverdue ? "text-white" : "text-gray-400")}>{label}</span>
                <span className={cn("text-xs font-bold", isOverdue ? colorClass.replace('bg-', 'text-') : "text-gray-300")}>
                    {percentage}%
                </span>
            </div>

            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-500", colorClass)}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] text-gray-500 font-mono">{current} / {max} gms</span>
                {isOverdue && (
                    <button
                        onClick={() => onReset}
                        className={cn("text-[10px] font-bold uppercase hover:underline", colorClass.replace('bg-', 'text-'))}
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
}
