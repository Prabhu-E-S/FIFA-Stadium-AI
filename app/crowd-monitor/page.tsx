'use client';

import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import DashboardCard from '@/components/common/dashboard-card';
import StatCard from '@/components/common/stat-card';
import StatusBadge from '@/components/common/status-badge';
import { Users, Search, Thermometer, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import { callCrowd, CrowdResponse } from '@/lib/api';

export default function CrowdMonitorPage() {
    const [crowdData, setCrowdData] = useState<CrowdResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const sectors = [
        { id: 'S1', name: 'Sector 1 (North Stand)', occupancy: '8,420 / 9,000', density: 'high' as const, pct: 93 },
        { id: 'S2', name: 'Sector 2 (East Upper)', occupancy: '14,200 / 18,500', density: 'info' as const, pct: 76 },
        { id: 'S3', name: 'Sector 3 (South Lower)', occupancy: '11,800 / 12,000', density: 'danger' as const, pct: 98 },
        { id: 'S4', name: 'Sector 4 (West Stand)', occupancy: '22,100 / 25,000', density: 'info' as const, pct: 88 },
        { id: 'S5', name: 'Sector 5 (Hospitality)', occupancy: '4,100 / 5,500', density: 'success' as const, pct: 74 },
    ];

    const fetchCrowd = async () => {
        setLoading(true);
        try {
            const data = await callCrowd();
            setCrowdData(data);
        } catch (e) {
            console.error("Failed to query crowd API:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCrowd();
    }, []);

    const getDensityText = (density: string) => {
        switch (density) {
            case 'danger': return 'Near Capacity';
            case 'high': return 'High Density';
            case 'warning': return 'Moderate';
            case 'success': return 'Light Flow';
            default: return 'Normal';
        }
    };

    // Combine static sectors with live backend zone if query returned
    const displayedSectors = crowdData
        ? [
            { id: 'LIVE', name: `Zone ${crowdData.zone} (Live Backend)`, occupancy: `${crowdData.crowd_level} Density`, density: 'danger' as const, pct: 95 },
            ...sectors
        ]
        : sectors;

    return (
        <PageContainer>
            <SectionHeader
                title="Crowd Monitor"
                description="Live stadium capacity, crowd density analysis, and stand occupancy tracking."
                actions={
                    <button
                        onClick={fetchCrowd}
                        disabled={loading}
                        className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs font-bold text-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                        )}
                        <span>AI Density Forecasting Active</span>
                    </button>
                }
            />

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                    title="Overall Attendance"
                    value={crowdData ? `${crowdData.zone}: ${crowdData.crowd_level}` : "64,120 / 70,000"}
                    change={crowdData ? "LIVE BACKEND" : "91.6%"}
                    changeType="neutral"
                    icon={Users}
                    status={crowdData?.crowd_level === 'High' ? 'danger' : 'success'}
                    description={crowdData ? `Forecast: ${crowdData.prediction}` : "Total active tickets scanned at entry turnstiles"}
                />
                <StatCard
                    title="Avg Flow Rate"
                    value="420 fans/min"
                    change="-4.2%"
                    changeType="decrease"
                    icon={Thermometer}
                    status="info"
                    description="Average flow speed through entry choke levels"
                />
                <StatCard
                    title="Crowd Anomalies"
                    value="0 Detected"
                    change="Clean Log"
                    changeType="neutral"
                    icon={ShieldAlert}
                    status="success"
                    description="Computer vision scans report zero panic trends"
                />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Sector breakdown */}
                <div className="lg:col-span-7">
                    <DashboardCard
                        title="Sector Breakdown & Density"
                        subtitle="Stadium section capacity usage and threshold alarms"
                        icon={Users}
                    >
                        <div className="space-y-5 mt-2">
                            {displayedSectors.map((sector) => (
                                <div key={sector.id} className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold">
                                        <span className="text-white">{sector.name}</span>
                                        <span className="text-zinc-400">{sector.occupancy}</span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-2 bg-zinc-850 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${sector.density === 'danger' ? 'bg-rose-500' :
                                                    sector.density === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                                                    }`}
                                                style={{ width: `${sector.pct}%` }}
                                            />
                                        </div>
                                        <StatusBadge
                                            status={sector.density === 'danger' ? 'danger' : sector.density === 'high' ? 'warning' : 'info'}
                                            label={getDensityText(sector.density)}
                                            className="min-w-[100px] justify-center"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>

                {/* Heatmap/Stand info */}
                <div className="lg:col-span-5">
                    <DashboardCard
                        title="Biometric Density Analysis"
                        subtitle="Computer vision AI cameras telemetry data feed"
                        icon={Search}
                    >
                        <div className="space-y-4 mt-2">
                            <div className="rounded-xl border border-zinc-850 bg-zinc-950/40 p-4 space-y-3">
                                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                                    <span>Choke Hotspot: Section 304 Ramp</span>
                                </h4>
                                <p className="text-[11px] text-zinc-400 leading-relaxed">
                                    Heavy accumulation detected near Eastern concourse upward slope. Pedestrian speed has decreased to 0.4 m/s.
                                </p>
                                <div className="text-[10px] text-zinc-500 font-medium">
                                    Camera Feed Ref: <span className="font-mono text-zinc-450">CAM-N-304</span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 space-y-2">
                                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <span>North Plaza Turnstiles: Clear</span>
                                </h4>
                                <p className="text-[11px] text-zinc-400 leading-relaxed">
                                    Entry checkpoint queue times average 12 seconds. Throughput is highly optimized.
                                </p>
                                <div className="text-[10px] text-zinc-500 font-medium">
                                    Camera Feed Ref: <span className="font-mono text-zinc-450">CAM-T-ENT-1</span>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </PageContainer>
    );
}
