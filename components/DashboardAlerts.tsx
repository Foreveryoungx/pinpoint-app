"use client";

import { useApp } from "@/components/AppProvider";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, Droplet, RefreshCcw } from "lucide-react";

export function DashboardAlerts() {
    const { arsenal, resetMaintenance } = useApp();

    const alerts = arsenal.flatMap(ball => {
        const list = [];
        if (ball.gamesSinceSurface >= 9) {
            list.push({ type: 'surface', ball });
        }
        if (ball.gamesSinceDetox >= 50) {
            list.push({ type: 'detox', ball });
        }
        return list;
    });

    if (alerts.length === 0) return null;

    return (
        <div className="space-y-3 mb-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Maintenance Required</h2>
            {alerts.map((alert, idx) => (
                <div key={`${alert.ball.id}-${alert.type}-${idx}`} className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-red-500/20 shadow-[0_0_10px_rgba(255,0,0,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${alert.type === 'surface' ? 'bg-alert-surface/10 text-alert-surface' : 'bg-alert-detox/10 text-alert-detox'}`}>
                            {alert.type === 'surface' ? <AlertTriangle size={16} /> : <Droplet size={16} />}
                        </div>
                        <div>
                            <p className="text-white font-medium">{alert.ball.name}</p>
                            <p className="text-xs text-gray-400 capitalize">{alert.type} Needed</p>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => resetMaintenance(alert.ball.id, alert.type as 'surface' | 'detox')}
                        className="text-xs"
                    >
                        Reset
                    </Button>
                </div>
            ))}
        </div>
    );
}
