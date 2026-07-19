'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Info, CheckCircle, MapPin, Clock } from 'lucide-react';
import StatusBadge from './status-badge';

export type AlertSeverity = 'info' | 'warning' | 'error' | 'success';

interface AlertCardProps {
    title: string;
    description: string;
    timestamp: string;
    severity: AlertSeverity;
    location?: string;
    status?: 'active' | 'resolved' | 'pending';
    onActionClick?: () => void;
    actionText?: string;
}

export default function AlertCard({
    title,
    description,
    timestamp,
    severity,
    location,
    status = 'active',
    onActionClick,
    actionText = 'Respond',
}: AlertCardProps) {
    const severityConfigs = {
        info: {
            icon: Info,
            color: 'text-blue-500',
            bgGlow: 'hover:shadow-[0_0_15px_rgba(37,99,235,0.08)] hover:border-blue-550/30',
            sideBorder: 'border-l-4 border-l-blue-600',
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-amber-500',
            bgGlow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:border-amber-550/30',
            sideBorder: 'border-l-4 border-l-amber-500',
        },
        error: {
            icon: ShieldAlert,
            color: 'text-rose-500',
            bgGlow: 'hover:shadow-[0_0_15px_rgba(239,68,68,0.08)] hover:border-rose-550/30',
            sideBorder: 'border-l-4 border-l-rose-500',
        },
        success: {
            icon: CheckCircle,
            color: 'text-emerald-500',
            bgGlow: 'hover:shadow-[0_0_15px_rgba(34,197,94,0.08)] hover:border-emerald-550/30',
            sideBorder: 'border-l-4 border-l-emerald-500',
        },
    };

    const config = severityConfigs[severity];
    const SeverityIcon = config.icon;

    return (
        <motion.div
            whileHover={{ scale: 1.002 }}
            transition={{ duration: 0.15 }}
            className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-5 backdrop-blur-sm transition-all duration-300 ${config.bgGlow} ${config.sideBorder}`}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg p-1.5 bg-zinc-900 border border-zinc-800">
                        <SeverityIcon className={`h-4.5 w-4.5 ${config.color}`} />
                    </div>
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-white text-sm">{title}</h4>
                            <StatusBadge
                                status={status === 'active' ? (severity === 'error' ? 'danger' : severity === 'warning' ? 'warning' : 'info') : 'neutral'}
                                label={status.toUpperCase()}
                            />
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">{description}</p>

                        {/* Metadata Footer */}
                        <div className="flex flex-wrap items-center gap-3.5 pt-2 text-[10px] text-zinc-500 font-medium">
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{timestamp}</span>
                            </span>
                            {location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{location}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {onActionClick && (
                    <button
                        onClick={onActionClick}
                        className="self-end sm:self-start rounded-lg border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-[11px] font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all shadow-sm active:scale-95 duration-200"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </motion.div>
    );
}
