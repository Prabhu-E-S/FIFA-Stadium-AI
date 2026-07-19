'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldAlert,
    Clock,
    History,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import StatusBadge from '@/components/common/status-badge';

// Reusable components
import IncidentTable, { Incident } from '@/components/operations/incident-table';
import Timeline, { TimelineItem } from '@/components/operations/timeline';
import PriorityBadge from '@/components/operations/priority-badge';
import ConfidenceBadge from '@/components/operations/confidence-badge';

interface HistoricalDecision {
    id: string;
    query: string;
    timestamp: string;
    intent: string;
    selected_agents: string[];
    summary: string;
    recommendation: string;
    confidence: number;
    priority: string;
}

export default function OperationsCenterPage() {
    const [incidents, setIncidents] = useState<Incident[]>([
        {
            id: 'inc-1',
            title: 'North Entrance Crowd Congestion',
            location: 'Gate 2A & 2B, North Concourse',
            priority: 'High',
            assignedAgent: 'crowd',
            status: 'active'
        },
        {
            id: 'inc-2',
            title: 'Elevator E-4 Offline (Power Trip)',
            location: 'Level 2, Section 304',
            priority: 'Critical',
            assignedAgent: 'accessibility',
            status: 'active'
        },
        {
            id: 'inc-3',
            title: 'Facility Spill Report',
            location: 'South Concourse Block 112',
            priority: 'Low',
            assignedAgent: 'navigation',
            status: 'resolved'
        },
        {
            id: 'inc-4',
            title: 'Heat Exhaustion Emergency Call',
            location: 'Row 14, Seat 22',
            priority: 'High',
            assignedAgent: 'emergency',
            status: 'resolved'
        }
    ]);

    const [expandedDecisionId, setExpandedDecisionId] = useState<string | null>(null);

    const [historicalDecisions] = useState<HistoricalDecision[]>([
        {
            id: 'dec-1',
            query: 'Heat spike reported in upper south section. Medical transport may be required.',
            timestamp: '11:28 AM',
            intent: 'emergency',
            selected_agents: ['emergency', 'navigation'],
            summary: 'High temperatures causing heat exhaustion warnings in Sector 212. Medical team require clearing paths.',
            recommendation: 'Deploy Medical Cart #2 via elevator 4 access gate. Dispatch crowd control guards to section 11 gate to clear entry vectors.',
            confidence: 96,
            priority: 'High'
        },
        {
            id: 'dec-2',
            query: 'Ramp obstacle blocking wheelchairs near main exit gates.',
            timestamp: '11:15 AM',
            intent: 'accessibility',
            selected_agents: ['accessibility', 'navigation'],
            summary: 'Accessibility ramp blockages discovered. Wheelchair users routing obstructed.',
            recommendation: 'Redirect arrivals to North Lift route 3. Alert facilities crew to remove trash obstacles.',
            confidence: 88,
            priority: 'Medium'
        },
        {
            id: 'dec-3',
            query: 'Crowd build-up near east ticketing area.',
            timestamp: '10:52 AM',
            intent: 'crowd',
            selected_agents: ['crowd', 'navigation'],
            summary: 'Arrival line speeds below 1.2 passengers/sec. Queue delays reaching 5 minutes.',
            recommendation: 'Open concession ticket bypass channels 5 & 6. Instruct security lines to initiate automatic biometric fastpass.',
            confidence: 94,
            priority: 'Medium'
        }
    ]);

    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
        {
            id: 'time-1',
            time: '11:28 AM',
            category: 'safety',
            title: 'Emergency Cart Dispatched',
            description: 'AI detected heat report at Sector 212. Dispatched emergency response cart #2 and marked incident active.'
        },
        {
            id: 'time-2',
            time: '11:25 AM',
            category: 'transit',
            title: 'Ticketing Bypass Active',
            description: 'Navigation agent redirected visitor groups from overloaded east gates to side entrance corridors.'
        },
        {
            id: 'time-3',
            time: '11:20 AM',
            category: 'crowd',
            title: 'Crowd Limits Exceeded',
            description: 'Crowd monitors indicated food court section 108 occupancy exceeded safe threshold by 12%.'
        },
        {
            id: 'time-4',
            time: '10:45 AM',
            category: 'sys',
            title: 'Daily Biometric Calibration Check',
            description: 'Auto-checks completed. All 120 client gate access scanners validated successfully.'
        }
    ]);

    const handleDispatch = (id: string) => {
        // Resolve incident dynamically
        setIncidents((prev) =>
            prev.map((i) => (i.id === id ? { ...i, status: 'resolved' } : i))
        );

        // Append to timeline
        const inc = incidents.find((i) => i.id === id);
        if (inc) {
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} AM`;
            setTimelineItems((prev) => [
                {
                    id: `time-new-${now.getTime()}`,
                    time: timeStr,
                    category: 'safety',
                    title: `Dispatched: ${inc.title}`,
                    description: `Stadium Operations Commander manually triggered safety dispatch to ${inc.location}.`
                },
                ...prev
            ]);
        }
    };

    const toggleDecision = (id: string) => {
        setExpandedDecisionId(expandedDecisionId === id ? null : id);
    };

    return (
        <PageContainer>
            <SectionHeader
                title="Operations Command Center"
                description="Monitor current incidents queue, review AI historical logic chains, and track real-time operational events."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Incidents Monitor & Decision History (8 cols) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Incident Monitor */}
                    <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-6 backdrop-blur-md space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <ShieldAlert className="h-4.5 w-4.5 text-blue-400" />
                                <span>Active Incident Monitor</span>
                            </h3>
                            <StatusBadge status="warning" label={`${incidents.filter(i => i.status === 'active').length} OPEN ITEMS`} />
                        </div>

                        <p className="text-xs text-zinc-450 leading-relaxed">
                            Track reported structural or safety anomalies across stands and route dispatch directives directly.
                        </p>

                        <IncidentTable incidents={incidents} onDispatch={handleDispatch} />
                    </div>

                    {/* Decision History */}
                    <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-6 backdrop-blur-md space-y-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <History className="h-4.5 w-4.5 text-blue-400" />
                            <span>Decision Recommendation History</span>
                        </h3>

                        <p className="text-xs text-zinc-450 leading-relaxed pb-2">
                            Archived instructions generated by the AI Decision Agent loops.
                        </p>

                        <div className="space-y-3">
                            {historicalDecisions.map((dec) => {
                                const isExpanded = expandedDecisionId === dec.id;
                                return (
                                    <div key={dec.id} className="rounded-2xl border border-zinc-850 bg-zinc-950/20 p-4 transition-colors">
                                        <div
                                            onClick={() => toggleDecision(dec.id)}
                                            className="flex items-center justify-between cursor-pointer select-none"
                                        >
                                            <div className="space-y-1 pr-4">
                                                <span className="text-[10px] text-zinc-550 font-bold font-mono">{dec.timestamp}</span>
                                                <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug">{"\""}{dec.query}{"\""}</h4>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                                <PriorityBadge priority={dec.priority} />
                                                {isExpanded ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="border-t border-zinc-900 mt-3 pt-3 space-y-3 text-xs">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono">Telemetry Input</span>
                                                            <ConfidenceBadge confidence={dec.confidence} />
                                                        </div>

                                                        <div className="flex flex-wrap gap-1.5">
                                                            {dec.selected_agents.map((agent) => (
                                                                <span key={agent} className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400 uppercase font-bold">
                                                                    {agent} Agent Activated
                                                                </span>
                                                            ))}
                                                        </div>

                                                        <div className="space-y-1">
                                                            <span className="font-bold text-zinc-350">AI Reasoning:</span>
                                                            <p className="text-zinc-400 leading-relaxed">{dec.summary}</p>
                                                        </div>

                                                        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3.5 space-y-1">
                                                            <span className="font-bold text-emerald-450 uppercase text-[9px] tracking-wider block font-mono">Consolidated Directive Action</span>
                                                            <p className="text-white font-bold leading-relaxed">{dec.recommendation}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Life Activity Log (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-6 backdrop-blur-md space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Clock className="h-4.5 w-4.5 text-blue-400" />
                                <span>AI Chronological Timeline</span>
                            </h3>
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>

                        <p className="text-xs text-zinc-450 leading-relaxed">
                            Logs of background decisions and dispatch recommendations.
                        </p>

                        <div className="pt-2">
                            <Timeline items={timelineItems} />
                        </div>
                    </div>
                </div>

            </div>
        </PageContainer>
    );
}
