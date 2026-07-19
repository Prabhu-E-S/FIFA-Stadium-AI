'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type StatStatus = 'success' | 'warning' | 'danger' | 'info';

interface StatCardProps {
    title: string;
    value: string | number;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: LucideIcon;
    status?: StatStatus;
    description?: string;
}

export default function StatCard({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    status = 'info',
    description,
}: StatCardProps) {
    const statusGlowColors = {
        info: 'hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:border-blue-500/30',
        success: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:border-emerald-500/30',
        warning: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-500/30',
        danger: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-rose-500/30',
    };

    const statusIconColors = {
        info: 'text-blue-500 bg-blue-500/5 border-blue-500/10',
        success: 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10',
        warning: 'text-amber-500 bg-amber-500/5 border-amber-500/10',
        danger: 'text-rose-500 bg-rose-500/5 border-rose-500/10',
    };

    const trendIcons = {
        increase: TrendingUp,
        decrease: TrendingDown,
        neutral: Minus,
    };

    const trendColors = {
        increase: 'text-emerald-450 bg-emerald-500/10',
        decrease: 'text-rose-450 bg-rose-500/10',
        neutral: 'text-zinc-400 bg-zinc-500/10',
    };

    const TrendIcon = trendIcons[changeType];

    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md transition-all duration-300 ${statusGlowColors[status]}`}
        >
            <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">{title}</span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${statusIconColors[status]}`}>
                    <Icon className="h-4.5 w-4.5" />
                </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{value}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${trendColors[changeType]}`}>
                    <TrendIcon className="h-3 w-3" />
                    <span>{change}</span>
                </span>
            </div>

            {description && (
                <p className="mt-2 text-xs text-zinc-500 font-medium">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
