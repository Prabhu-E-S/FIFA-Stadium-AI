'use client';

import React from 'react';
import { Compass, Users, ShieldAlert, Accessibility, Sparkles, Loader2 } from 'lucide-react';
import StatusBadge from '../common/status-badge';

interface AgentExecutionCardProps {
    agentName: string;
    status: 'success' | 'warning' | 'danger' | 'info' | string;
    executionTime?: string;
    confidence?: number;
    details?: Record<string, unknown>;
    loading?: boolean;
}

export default function AgentExecutionCard({
    agentName,
    status,
    executionTime,
    confidence,
    details,
    loading = false
}: AgentExecutionCardProps) {
    const getIcon = () => {
        switch (agentName.toLowerCase()) {
            case 'navigation': return Compass;
            case 'crowd': return Users;
            case 'emergency': return ShieldAlert;
            case 'accessibility': return Accessibility;
            default: return Sparkles;
        }
    };

    const getStatusStyle = () => {
        switch (status?.toLowerCase()) {
            case 'danger':
            case 'critical':
                return 'border-red-500/20 bg-red-500/[0.01]';
            case 'warning':
                return 'border-yellow-500/20 bg-yellow-500/[0.01]';
            case 'success':
                return 'border-blue-500/20 bg-blue-500/[0.01]';
            default:
                return 'border-zinc-800/80 bg-zinc-950/20';
        }
    };

    const Icon = getIcon();

    return (
        <div className={`rounded-xl border p-4 space-y-3 transition-colors ${getStatusStyle()}`}>
            <div className="flex justify-between items-center bg-zinc-950/20 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                    {!loading ? (
                        <div className="text-blue-400">
                            <Icon className="h-4.5 w-4.5" />
                        </div>
                    ) : (
                        <Loader2 className="h-4.5 w-4.5 animate-spin text-blue-400" />
                    )}
                    <span className="text-xs font-bold text-white capitalize">{agentName} Agent</span>
                </div>

                {!loading && status && (
                    <StatusBadge status={status as 'success' | 'warning' | 'danger' | 'info'} label={status.toUpperCase()} />
                )}
            </div>

            {!loading && (
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-zinc-500 font-mono">
                        {executionTime && (
                            <div>
                                <span>LATENCY: </span>
                                <span className="text-zinc-350">{executionTime}</span>
                            </div>
                        )}
                        {confidence && (
                            <div className="justify-self-end">
                                <span>CONFIDENCE: </span>
                                <span className="text-zinc-350">{confidence}%</span>
                            </div>
                        )}
                    </div>

                    {details && Object.keys(details).length > 0 && (
                        <div className="text-[10px] text-zinc-405 font-mono space-y-1 bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-900/60 max-h-[100px] overflow-y-auto">
                            {Object.entries(details).map(([key, val]) => (
                                <div key={key} className="flex justify-between gap-2.5">
                                    <span className="text-zinc-550 break-all shrink-0 capitalize">{key.replace('_', ' ')}:</span>
                                    <span className="text-zinc-300 font-bold truncate max-w-[150px]">{String(val)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {loading && (
                <div className="space-y-2 py-2">
                    <div className="h-3 w-1/3 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-8 bg-zinc-800 rounded animate-pulse" />
                </div>
            )}
        </div>
    );
}
