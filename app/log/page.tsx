"use client";

import { GameLogForm } from "@/components/GameLogForm";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LogGamePage() {
    return (
        <main className="min-h-screen p-4 md:p-8 max-w-xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-white">Log Game</h1>
            </div>

            <div className="bg-secondary/30 p-6 rounded-2xl border border-white/5">
                <GameLogForm />
            </div>
        </main>
    );
}
