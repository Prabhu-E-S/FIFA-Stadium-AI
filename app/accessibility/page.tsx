'use client';

import React from 'react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import DashboardCard from '@/components/common/dashboard-card';
import StatCard from '@/components/common/stat-card';
import StatusBadge from '@/components/common/status-badge';
import { Accessibility, Compass, RotateCw, Shield, HelpCircle } from 'lucide-react';

export default function AccessibilityPage() {
    const requests = [
        { id: 'req-1', name: 'Wheelchair escort from Gate 8 to Block 120', time: '10 mins ago', status: 'dispatching' as const },
        { id: 'req-2', name: 'Sign Language interpreter request at Info Point 3', time: '18 mins ago', status: 'resolved' as const },
        { id: 'req-3', name: 'Elderly assistance cart request at South VIP Entrance', time: '30 mins ago', status: 'active' as const },
    ];

    return (
        <PageContainer>
            <SectionHeader
                title="Accessibility Services"
                description="Wheelchair assistance, adaptive seating tracking, and mobility carts routing."
                actions={
                    <button className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 transition-all active:scale-95 duration-200">
                        <RotateCw className="h-3.5 w-3.5" />
                        <span>Refresh Assistance Queue</span>
                    </button>
                }
            />

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                    title="Active Requests"
                    value="4 Pending"
                    change="-20.5%"
                    changeType="decrease"
                    icon={Accessibility}
                    status="warning"
                    description="Assistance requests awaiting driver/escort assignment"
                />
                <StatCard
                    title="Active Escort Carts"
                    value="8 / 10 Carts"
                    change="80% Load"
                    changeType="neutral"
                    icon={Compass}
                    status="info"
                    description="Electric assistive dispatch carts currently deployed"
                />
                <StatCard
                    title="Service Satisfaction"
                    value="98.4%"
                    change="+1.2%"
                    changeType="increase"
                    icon={HelpCircle}
                    status="success"
                    description="Based on feedback surveys from assist ticket closeouts"
                />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Assistance requests */}
                <div className="lg:col-span-7">
                    <DashboardCard
                        title="Assistance Requests Queue"
                        subtitle="Queue of incoming mobility and service assistance requests"
                        icon={Accessibility}
                    >
                        <div className="space-y-4 mt-2">
                            {requests.map((req) => (
                                <div key={req.id} className="flex items-center justify-between border-b border-zinc-800/40 pb-3 last:border-0 last:pb-0">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white">{req.name}</span>
                                        <span className="text-[10px] text-zinc-500 font-medium">{req.time}</span>
                                    </div>
                                    <StatusBadge
                                        status={req.status === 'dispatching' ? 'warning' : req.status === 'active' ? 'info' : 'neutral'}
                                        label={req.status.toUpperCase()}
                                    />
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>

                {/* Elevators and support status */}
                <div className="lg:col-span-5">
                    <DashboardCard
                        title="Elevators & Dedicated Facilities"
                        subtitle="Live accessibility hardware connectivity and status"
                        icon={Shield}
                    >
                        <div className="space-y-4 mt-2">
                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <span className="text-xs font-semibold text-white">East Elevator Block (E-1, E-2)</span>
                                <StatusBadge status="success" label="100% OPERATIONAL" />
                            </div>
                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <span className="text-xs font-semibold text-white">North Elevator Block (N-3, N-4)</span>
                                <StatusBadge status="success" label="100% OPERATIONAL" />
                            </div>
                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <span className="text-xs font-semibold text-white">West Elevator Block (W-1)</span>
                                <StatusBadge status="warning" label="SLOW SERVICE (E-4 OFFLINE)" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-white">Tactile Wayfinding Beacons</span>
                                <StatusBadge status="success" label="ONLINE" />
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </PageContainer>
    );
}
