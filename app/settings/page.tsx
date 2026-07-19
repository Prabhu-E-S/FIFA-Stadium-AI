'use client';

import React from 'react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import DashboardCard from '@/components/common/dashboard-card';
import StatusBadge from '@/components/common/status-badge';
import { Save, ShieldAlert, Cpu, Bell, CloudLightning } from 'lucide-react';

export default function SettingsPage() {
    return (
        <PageContainer>
            <SectionHeader
                title="Settings & System Configurations"
                description="Configure analytical thresholds, security protocols, and FIFA API sync."
                actions={
                    <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all active:scale-95 duration-200">
                        <Save className="h-3.5 w-3.5" />
                        <span>Save Configurations</span>
                    </button>
                }
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Column 1: Threshold configs */}
                <div className="lg:col-span-6 space-y-6">
                    {/* AI configurations */}
                    <DashboardCard
                        title="AI Modeling & Analytical Sensitivity"
                        subtitle="Configure computer vision crowd thresholds and predictions"
                        icon={Cpu}
                    >
                        <div className="space-y-4 mt-2">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-zinc-400 uppercase">AI Forecasting Horizon</label>
                                <select className="h-9 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-xs text-white outline-none focus:border-blue-500" disabled>
                                    <option>15 Minutes (Recommended)</option>
                                    <option>30 Minutes</option>
                                    <option>1 Hour</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-zinc-400 uppercase">Crowd Alert Sensitivity</label>
                                <div className="flex items-center gap-4">
                                    <input type="range" className="flex-1 accent-blue-600 bg-zinc-800" min="0" max="100" defaultValue="85" disabled />
                                    <span className="text-xs font-bold text-white">85% Capacity</span>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>

                    {/* Connected Services */}
                    <DashboardCard
                        title="Integrations & Data Synchronization"
                        subtitle="External service connection statuses"
                        icon={CloudLightning}
                    >
                        <div className="space-y-4 mt-2">
                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <span className="text-xs font-semibold text-white">FIFA Ticketmaster API Sync</span>
                                <StatusBadge status="success" label="SYNCED (LIVE)" />
                            </div>
                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <span className="text-xs font-semibold text-white">NOAA Weather Radar Interface</span>
                                <StatusBadge status="success" label="CONNECTED" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-white">NJ Transit Live Timetable Sync</span>
                                <StatusBadge status="success" label="CONNECTED" />
                            </div>
                        </div>
                    </DashboardCard>
                </div>

                {/* Column 2: Notifications and Alerts */}
                <div className="lg:col-span-6 space-y-6">
                    <DashboardCard
                        title="Emergency response protocols"
                        subtitle="Automated system actions during red alerts"
                        icon={ShieldAlert}
                    >
                        <div className="space-y-4 mt-2">
                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs font-semibold text-white">Auto-roof closure on weather alerts</span>
                                    <span className="text-[10px] text-zinc-550">Trigger automatic closure upon rain forecasting &gt;30%</span>
                                </div>
                                <div className="h-5 w-9 rounded-full bg-blue-600/30 border border-blue-500/20 p-0.5 flex justify-end items-center cursor-not-allowed">
                                    <div className="h-3.5 w-3.5 rounded-full bg-blue-500" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs font-semibold text-white">Auto-rerouting alerts push</span>
                                    <span className="text-[10px] text-zinc-550">Push redirects instantly when exit queues wait exceeds 20 minutes</span>
                                </div>
                                <div className="h-5 w-9 rounded-full bg-blue-600/30 border border-blue-500/20 p-0.5 flex justify-end items-center cursor-not-allowed">
                                    <div className="h-3.5 w-3.5 rounded-full bg-blue-500" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs font-semibold text-white">Advisory Alert Broadcasts</span>
                                    <span className="text-[10px] text-zinc-550">Allow direct public push messages from the Dispatch Center</span>
                                </div>
                                <div className="h-5 w-9 rounded-full bg-blue-600/30 border border-blue-500/20 p-0.5 flex justify-end items-center cursor-not-allowed">
                                    <div className="h-3.5 w-3.5 rounded-full bg-blue-500" />
                                </div>
                            </div>
                        </div>
                    </DashboardCard>

                    <DashboardCard
                        title="Notification channels & digests"
                        subtitle="Alert routing preferences for operations agents"
                        icon={Bell}
                    >
                        <div className="space-y-3 mt-2 text-xs font-semibold text-zinc-400">
                            <div className="flex justify-between items-center py-1">
                                <span>Critical Red Alerts</span>
                                <span className="text-rose-500">Instant SMS, Push & HUD</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-t border-zinc-800/40">
                                <span>Amber Warning Warnings</span>
                                <span className="text-amber-500">Push Notification Only</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-t border-zinc-800/40">
                                <span>Info Operations Logs</span>
                                <span className="text-zinc-550 font-normal">Hourly Email Digest</span>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </PageContainer>
    );
}
