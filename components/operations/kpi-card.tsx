'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

type KPICardStatus = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

interface KPICardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'increase' | 'decrease' | 'neutral';
    icon: LucideIcon;
    status?: KPICardStatus;
    description?: string;
    progress?: number;
}

export default function KPICard({
    title,
    value,
    change,
    changeType = 'neutral',
    icon: Icon,
    status = 'neutral',
    description,
    progress
}: KPICardProps) {
    const getStatusColor = (s: KPICardStatus) => {
        switch (s) {
            case 'success': return 'border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-400';
            case 'danger': return 'border-red-500/20 bg-red-500/[0.02] text-red-500';
            case 'warning': return 'border-yellow-500/20 bg-yellow-500/[0.02] text-yellow-500';
            case 'info': return 'border-blue-500/20 bg-blue-500/[0.02] text-blue-400';
            default: return 'border-zinc-800/80 bg-zinc-900/10 text-zinc-400';
        }
    };

    const getProgressColor = (s: KPICardStatus) => {
        switch (s) {
            case 'success': return 'bg-emerald-500';
            case 'danger': return 'bg-red-500';
            case 'warning': return 'bg-yellow-500';
            case 'info': return 'bg-blue-500';
            default: return 'bg-zinc-500';
        }
    };

    const getChangeIcon = () => {
        if (changeType === 'increase') return <ArrowUpRight className="h-3 w-3" />;
        if (changeType === 'decrease') return <ArrowDownRight className="h-3 w-3" />;
        return null;
    };

    const getChangeColor = () => {
        if (changeType === 'increase') return 'text-emerald-400 bg-emerald-500/10';
        if (changeType === 'decrease') return 'text-red-400 bg-red-500/10';
        return 'text-zinc-500 bg-zinc-500/10';
    };

    return (
        <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`rounded-2xl border p-5 backdrop-blur-md flex flex-col justify-between h-full min-h-[140px] transition-all content-box ${getStatusColor(status)}`}
        >
            <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest font-mono">
                    {title}
                </span>
                <div className={`p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/60`}>
                    <Icon className="h-4.5 w-4.5" />
                </div>
            </div>

            <div className="mt-3">
                <h3 className="text-xl font-extrabold text-white font-mono break-all tracking-tight">
                    {value}
                </h3>

                {progress !== undefined && (
                    <div className="w-full bg-zinc-950/80 h-1.5 rounded-full mt-3.5 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`h-full rounded-full ${getProgressColor(status)}`}
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mt-3 text-[10px] font-semibold">
                <span className="text-zinc-450 truncate max-w-[150px]">
                    {description}
                </span>

                {change && (
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full shrink-0 ${getChangeColor()}`}>
                        {getChangeIcon()}
                        <span>{change}</span>
                    </span>
                )}
            </div>
        </motion.div>
    );
}
