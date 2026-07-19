'use client';

import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import DashboardCard from '@/components/common/dashboard-card';
import StatCard from '@/components/common/stat-card';
import StatusBadge from '@/components/common/status-badge';
import { Map, Milestone, Compass, RotateCw, ArrowRight, Loader2 } from 'lucide-react';
import { callNavigation, NavigationResponse } from '@/lib/api';

export default function NavigationPage() {
    const [navData, setNavData] = useState<NavigationResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const gates = [
        { name: 'Gate A (North)', status: 'success' as const, label: 'Optimal Flow', wait: '2 mins' },
        { name: 'Gate B (Northeast)', status: 'warning' as const, label: 'Moderate Wait', wait: '11 mins' },
        { name: 'Gate C (East)', status: 'danger' as const, label: 'Congested', wait: '28 mins' },
        { name: 'Gate D (South)', status: 'success' as const, label: 'Optimal Flow', wait: '4 mins' },
    ];

    const fetchRoute = async () => {
        setLoading(true);
        try {
            const data = await callNavigation();
            setNavData(data);
        } catch (e) {
            console.error("Failed to query navigation API:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoute();
    }, []);

    // Combine static list with live backend choice if loaded
    const displayedGates = navData
        ? [
            { name: `${navData.gate} (Live)`, status: 'success' as const, label: `BIOMETRIC: ${navData.crowd}`, wait: navData.walking_time },
            ...gates
        ]
        : gates;

    return (
        <PageContainer>
            <SectionHeader
                title="Smart Navigation & Fan Transit"
                description="Real-time routes optimization, gate control, and fan transit assistance."
                actions={
                    <button
                        onClick={fetchRoute}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 transition-all active:scale-95 duration-200 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <RotateCw className="h-3.5 w-3.5" />
                        )}
                        <span>Recalculate Routes</span>
                    </button>
                }
            />

            {/* Row 1: Nav Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                    title="Average Wait Time"
                    value={navData ? navData.walking_time : "11.2 mins"}
                    change={navData ? "LIVE BACKEND" : "-4.5 mins"}
                    changeType={navData ? "neutral" : "decrease"}
                    icon={Compass}
                    status="success"
                    description={navData ? `Optimal route: ${navData.gate} via ${navData.status}` : "Average wait across all 12 operational gates"}
                />
                <StatCard
                    title="Transit Load"
                    value="18,420 / hr"
                    change="+8.3%"
                    changeType="increase"
                    icon={Milestone}
                    status="info"
                    description="Total fan movement via public transit routes"
                />
                <StatCard
                    title="Diverted Traffic"
                    value={navData ? `${navData.crowd} Flow` : "3,120 fans"}
                    change="AI Active"
                    changeType="neutral"
                    icon={Map}
                    status="warning"
                    description="Rerouted to East corridor to balance crowd load"
                />
            </div>

            {/* Row 2: Gates & Map Layout Mockups */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Gate Wait Times */}
                <div className="lg:col-span-5">
                    <DashboardCard
                        title="Gate Entry Status"
                        subtitle="Real-time biometric boarding checkpoints queue times"
                        icon={Milestone}
                    >
                        <div className="space-y-4 mt-2">
                            {displayedGates.map((gate, i) => (
                                <div key={`${gate.name}-${i}`} className="flex items-center justify-between border-b border-zinc-800/40 pb-3 last:border-0 last:pb-0">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white">{gate.name}</span>
                                        <span className="text-[10px] text-zinc-500 font-medium">Wait time: {gate.wait}</span>
                                    </div>
                                    <StatusBadge status={gate.status} label={gate.label} />
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>

                {/* AI Recommendations & Route Control */}
                <div className="lg:col-span-7">
                    <DashboardCard
                        title="AI Routing Intelligence & Gate Control"
                        subtitle="Automated route optimization recommendation history"
                        icon={Map}
                    >
                        <div className="space-y-4 mt-2">
                            {/* Rec 1 */}
                            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-400">
                                        FLOW CONTROL ROUTING
                                    </span>
                                    <span className="text-[10px] text-zinc-500 font-mono">10:30 AM</span>
                                </div>
                                <h4 className="mt-2 text-xs font-bold text-white">
                                    {navData ? `Divert traffic to ${navData.gate}` : "Divert Gate C East traffic to Gate D (South)"}
                                </h4>
                                <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                                    {navData
                                        ? `Gate routing status reports as: ${navData.status}. Ensure fan guidance alerts show transit options targeting ${navData.gate}.`
                                        : "Gate C ticketing scans are bottlenecked. Push navigation alerts to fans in the Eastern concourse showing direct walkway to Gate D."
                                    }
                                </p>
                                <div className="mt-3 flex items-center justify-between gap-4 pt-3 border-t border-zinc-800/60">
                                    <span className="text-[10px] text-emerald-450 font-bold">
                                        {navData ? `Walking Time: ~${navData.walking_time}` : "Estimated savings: -14 mins wait"}
                                    </span>
                                    <button
                                        onClick={fetchRoute}
                                        disabled={loading}
                                        className="flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white hover:bg-blue-500"
                                    >
                                        <span>Refresh Route</span>
                                        <ArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Rec 2 */}
                            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 opacity-75">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-500/10 px-2.5 py-0.5 text-[10px] font-bold text-zinc-400">
                                        SHUTTLE BUS EXPANSION
                                    </span>
                                    <span className="text-[10px] text-zinc-500 font-mono">08:45 AM</span>
                                </div>
                                <h4 className="mt-2 text-xs font-bold text-white">Increase MetLife Shuttle loops</h4>
                                <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                                    High density reported at NJ Transit station. Add 4 secondary shuttles to loop B.
                                </p>
                                <div className="mt-3 flex items-center justify-between gap-4 pt-3 border-t border-zinc-800/60">
                                    <span className="text-[10px] text-zinc-500 font-bold">Status: Handled (Auto-dispatched)</span>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </PageContainer>
    );
}
