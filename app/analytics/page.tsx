'use client';

import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    Users,
    TrendingUp,
    BarChart3,
    PieChart as PieIcon
} from 'lucide-react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import AnalyticsCard from '@/components/operations/analytics-card';
import ErrorBoundary from '@/components/common/error-boundary';

export default function AnalyticsPage() {
    const [isMounted, setIsMounted] = useState(false);

    // Avoid SSR mismatches with Recharts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Simulated metrics data
    const crowdTrend = [
        { time: '09:00', current: 32000, forecast: 35000 },
        { time: '09:30', current: 41200, forecast: 42000 },
        { time: '10:00', current: 52000, forecast: 55000 },
        { time: '10:30', current: 61800, forecast: 63000 },
        { time: '11:00', current: 64120, forecast: 68000 },
        { time: '11:30', current: 69200, forecast: 71000 },
        { time: '12:00', current: 72100, forecast: 73500 }
    ];

    const incidentData = [
        { name: 'North Stand', resolved: 14, active: 1 },
        { name: 'South Stand', resolved: 22, active: 2 },
        { name: 'East Stand', resolved: 18, active: 3 },
        { name: 'West Stand', resolved: 9, active: 0 },
        { name: 'VIP stand', resolved: 4, active: 0 },
        { name: 'Parking Lots', resolved: 28, active: 1 },
        { name: 'Fan Zone', resolved: 35, active: 2 }
    ];

    const requestTrend = [
        { time: '09:00', nav: 450, access: 8 },
        { time: '09:30', nav: 680, access: 12 },
        { time: '10:00', nav: 980, access: 15 },
        { time: '10:30', nav: 1200, access: 14 },
        { time: '11:00', nav: 1450, access: 18 },
        { time: '11:30', nav: 1650, access: 22 },
        { time: '12:00', nav: 1800, access: 20 }
    ];

    const priorityDist = [
        { name: 'Critical', value: 3, color: '#ef4444' },
        { name: 'High', value: 8, color: '#f97316' },
        { name: 'Medium', value: 15, color: '#eab308' },
        { name: 'Low', value: 24, color: '#10b981' }
    ];

    return (
        <PageContainer>
            <SectionHeader
                title="Stadium Analytics Intelligence"
                description="Comprehensive analytics reporting on crowd levels, transit routes, safety incidents, and pipeline confidence distribution."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                {/* Chart 1: Crowd Trend (LineChart) */}
                <div className="h-full">
                    <AnalyticsCard title="Crowd Velocity & Capacity Forecast" description="Actual vs predicted seating capacity counts." icon={TrendingUp}>
                        <ErrorBoundary fallbackTitle="Crowd Velocity Graph Offline">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height={230}>
                                    <LineChart data={crowdTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="time" stroke="#71717a" fontSize={10} className="font-mono" />
                                        <YAxis stroke="#71717a" fontSize={10} className="font-mono" />
                                        <Tooltip contentStyle={{ background: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '11px' }} />
                                        <Line type="monotone" dataKey="current" name="Occupancy" stroke="#3b82f6" strokeWidth={2.5} activeDot={{ r: 6 }} />
                                        <Line type="monotone" dataKey="forecast" name="Forecast Model" stroke="#71717a" strokeWidth={1.5} strokeDasharray="5 5" />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : null}
                        </ErrorBoundary>
                    </AnalyticsCard>
                </div>

                {/* Chart 2: Incident Trends (BarChart) */}
                <div className="h-full">
                    <AnalyticsCard title="Active vs Resolved Sector Incidents" description="Breakdown of support tickets across sectors." icon={BarChart3}>
                        <ErrorBoundary fallbackTitle="Sector Incidents Graph Offline">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height={230}>
                                    <BarChart data={incidentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="name" stroke="#71717a" fontSize={9} />
                                        <YAxis stroke="#71717a" fontSize={10} />
                                        <Tooltip contentStyle={{ background: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '11px' }} />
                                        <Bar dataKey="resolved" name="Resolved Tasks" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                                        <Bar dataKey="active" name="Active Warnings" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : null}
                        </ErrorBoundary>
                    </AnalyticsCard>
                </div>

                {/* Chart 3: Requests Trend (AreaChart) */}
                <div className="h-full">
                    <AnalyticsCard title="Operational Queries & Mobility Calls" description="Timeline frequency of transit and accessibility helper calls." icon={Users}>
                        <ErrorBoundary fallbackTitle="Mobility Logs Offline">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height={230}>
                                    <AreaChart data={requestTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorAccess" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#eab308" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="time" stroke="#71717a" fontSize={10} />
                                        <YAxis yAxisId="left" stroke="#3b82f6" fontSize={10} />
                                        <YAxis yAxisId="right" orientation="right" stroke="#eab308" fontSize={10} />
                                        <Tooltip contentStyle={{ background: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '11px' }} />
                                        <Area yAxisId="left" type="monotone" dataKey="nav" name="Nav Reroutes" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorNav)" />
                                        <Area yAxisId="right" type="monotone" dataKey="access" name="Access Assistance" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#colorAccess)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : null}
                        </ErrorBoundary>
                    </AnalyticsCard>
                </div>

                {/* Chart 4: Priority Distribution (PieChart) */}
                <div className="h-full">
                    <AnalyticsCard title="Incident Priority Distribution Ratio" description="Classification ratio of incoming warning calls." icon={PieIcon}>
                        <ErrorBoundary fallbackTitle="Priority Pie Metrics Offline">
                            {isMounted ? (
                                <div className="flex flex-col sm:flex-row items-center justify-around h-full gap-4">
                                    <div className="w-[180px] h-[180px] shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={priorityDist}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={75}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {priorityDist.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ background: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '11px' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="space-y-2 w-full font-semibold text-xs">
                                        {priorityDist.map((item) => (
                                            <div key={item.name} className="flex justify-between items-center bg-zinc-950/45 p-2 rounded-lg border border-zinc-900">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                                    <span className="text-zinc-350">{item.name}</span>
                                                </div>
                                                <span className="text-white font-bold font-mono">{item.value} tasks</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </ErrorBoundary>
                    </AnalyticsCard>
                </div>

            </div>
        </PageContainer>
    );
}
