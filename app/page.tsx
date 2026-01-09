"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NotebookPen, LayoutGrid, Plus } from "lucide-react";
import { BallPerformanceList } from "@/components/BallPerformanceList";
import { DashboardAlerts } from "@/components/DashboardAlerts";
import { useApp } from "@/components/AppProvider";

export default function Home() {
  const { arsenal } = useApp();
  const hasBalls = arsenal.length > 0;

  return (
    <main className="min-h-screen p-4 pb-20 md:p-8 max-w-xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">PinPoint</h1>
          <p className="text-xs text-primary tracking-widest font-mono">DASHBOARD</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/log" className="block">
          <Button className="w-full h-14 text-lg bg-primary text-black hover:bg-primary/90 font-bold shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <NotebookPen className="mr-2 h-5 w-5" /> Log Game
          </Button>
        </Link>
        <Link href="/arsenal" className="block">
          <Button variant="secondary" className="w-full h-14 text-lg border border-white/10">
            {hasBalls ? <LayoutGrid className="mr-2 h-5 w-5" /> : <Plus className="mr-2 h-5 w-5" />}
            {hasBalls ? "My Arsenal" : "Add Ball"}
          </Button>
        </Link>
      </div>

      {/* Alerts */}
      <DashboardAlerts />

      {/* Performance Stats */}
      <section>
        <BallPerformanceList />
      </section>
    </main>
  );
}
