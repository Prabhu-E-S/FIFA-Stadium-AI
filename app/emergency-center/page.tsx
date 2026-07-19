'use client';

import React from 'react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import DashboardCard from '@/components/common/dashboard-card';
import StatCard from '@/components/common/stat-card';
import StatusBadge from '@/components/common/status-badge';
import { ShieldAlert, Users, Phone, Zap, HeartHandshake, CloudRain } from 'lucide-react';

export default function EmergencyCenterPage() {
    const dispatches = [
        { team: 'Response Squad Alpha (Security)', task: ' Northwest Gate access dispute', location: 'Gate 2B', status: 'ongoing' as const },
        { team: 'Medical Team 2', task: 'Heat exhaustion, Row 14 Seat 22', location: 'Section 104', status: 'resolved' as const },
        { team: 'Response Squad Gamma (Security)', task: 'Suspicious backpack investigation', location: 'Zone C Escalators', status: 'ongoing' as const },
    ];

    return (
        <PageContainer>
            <SectionHeader
                title="Emergency & Security Dispatch"
                description="Rapid security dispatch, medical requests logging, and containment control."
                actions={
                    <button className="flex items-center gap-2 rounded-xl bg-red-950 border border-red-900/60 px-4 py-2 text-xs font-bold text-red-100 hover:bg-red-900 transition-all active:scale-95 duration-200">
                        <Phone className="h-3.5 w-3.5" />
                        <span>Trigger Mass Advisory Warning</span>
                    </button>
                }
            />

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                    title="Active Red Alarms"
                    value="0 Critical"
                    change="System Solid"
                    changeType="neutral"
                    icon={ShieldAlert}
                    status="success"
                    description="All critical telemetry points reporting secure"
                />
                <StatCard
                    title="Deployed Personnel"
                    value="3 Teams Deployed"
                    change="Available: 8"
                    changeType="neutral"
                    icon={Users}
                    status="info"
                    description="Security and medical response units currently active"
                />
                <StatCard
                    title="Avg Dispatch Latency"
                    value="45 seconds"
                    change="-15s this hour"
                    changeType="decrease"
                    icon={Zap}
                    status="success"
                    description="Time from alert confirmation code to squad dispatch"
                />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Dispatches */}
                <div className="lg:col-span-7">
                    <DashboardCard
                        title="Active Dispatches Log"
                        subtitle="Real-time tracking of security and medical responder assets"
                        icon={ShieldAlert}
                    >
                        <div className="space-y-4 mt-2">
                            {dispatches.map((disp, idx) => (
                                <div key={idx} className="flex flex-col gap-2 p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-white uppercase">{disp.team}</span>
                                        <StatusBadge
                                            status={disp.status === 'ongoing' ? 'warning' : 'neutral'}
                                            label={disp.status === 'ongoing' ? 'DISPATCHED' : 'RESOLVED'}
                                        />
                                    </div>
                                    <p className="text-xs text-zinc-450">
                                        <span className="font-semibold text-zinc-300">Assignment:</span> {disp.task}
                                    </p>
                                    <p className="text-[10px] text-zinc-500 font-medium">Located at: {disp.location}</p>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>

                {/* Safety standards */}
                <div className="lg:col-span-5">
                    <DashboardCard
                        title="Safety & Environmental Metrics"
                        subtitle="Stadium physical perimeter diagnostics"
                        icon={HeartHandshake}
                    >
                        <div className="space-y-4 mt-2">
                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <div className="flex items-center gap-2">
                                    <HeartHandshake className="h-4 w-4 text-emerald-500" />
                                    <span className="text-xs font-semibold text-white">First Aid Hub Status</span>
                                </div>
                                <span className="text-xs text-emerald-450 font-bold">4/4 Hubs Online</span>
                            </div>

                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <div className="flex items-center gap-2">
                                    <CloudRain className="h-4 w-4 text-blue-500" />
                                    <span className="text-xs font-semibold text-white">Retractable Roof Check</span>
                                </div>
                                <span className="text-xs text-blue-450 font-bold">Closed (Sequence Done)</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4 text-emerald-500" />
                                    <span className="text-xs font-semibold text-white">Fire Suppression System</span>
                                </div>
                                <span className="text-xs text-emerald-450 font-bold">100% Integrity</span>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </PageContainer>
    );
}
