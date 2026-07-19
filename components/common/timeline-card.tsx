'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Accessibility, Terminal, CloudSun, CheckCircle2, AlertCircle, Play } from 'lucide-react';

export type TimelineCategory = 'crowd' | 'security' | 'access' | 'system' | 'weather';
export type TimelineStatus = 'resolved' | 'ongoing' | 'alert';

interface TimelineCardProps {
    time: string;
    title: string;
    description: string;
    category: TimelineCategory;
    status: TimelineStatus;
}

export default function TimelineCard({
    time,
    title,
    description,
    category,
    status,
}: TimelineCardProps) {
    const categoryConfigs = {
        crowd: { icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/5 border-blue-500/10' },
        security: { icon: Shield, color: 'text-rose-500', bg: 'bg-rose-500/5 border-rose-500/10' },
        access: { icon: Accessibility, color: 'text-amber-500', bg: 'bg-amber-500/5 border-amber-500/10' },
        system: { icon: Terminal, color: 'text-emerald-500', bg: 'bg-emerald-500/5 border-emerald-500/10' },
        weather: { icon: CloudSun, color: 'text-sky-500', bg: 'bg-sky-500/5 border-sky-500/10' },
    };

    const statusConfigs = {
        resolved: { icon: CheckCircle2, text: 'Resolved', color: 'text-emerald-450' },
        ongoing: { icon: Play, text: 'Active', color: 'text-blue-450 animate-pulse' },
        alert: { icon: AlertCircle, text: 'Alert', color: 'text-rose-450' },
    };

    const catConfig = categoryConfigs[category];
    const statConfig = statusConfigs[status];
    const CategoryIcon = catConfig.icon;
    const StatusIcon = statConfig.icon;

    return (
        <div className="relative pl-6 pb-6 last:pb-0 group">
            {/* Vertical Connecting Line */}
            <span className="absolute top-0 left-[11px] bottom-0 w-[2px] bg-zinc-800 group-last:hidden" />

            {/* Icon Indicator Ball */}
            <div className={`absolute top-0.5 left-0 flex h-6.5 w-6.5 items-center justify-center rounded-full border bg-zinc-950 transition-all group-hover:scale-105 ${catConfig.bg}`}>
                <CategoryIcon className={`h-3.5 w-3.5 ${catConfig.color}`} />
            </div>

            {/* Main card content */}
            <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.15 }}
                className="ml-4 rounded-xl border border-zinc-800/60 bg-zinc-900/10 p-4 transition-colors hover:bg-zinc-900/35 hover:border-zinc-800"
            >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-zinc-500 font-mono">{time}</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-800" />
                        <h5 className="font-semibold text-white text-xs tracking-wide">{title}</h5>
                    </div>

                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${statConfig.color}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        <span>{statConfig.text}</span>
                    </span>
                </div>

                <p className="mt-1.5 text-xs text-zinc-400 leading-normal">{description}</p>
            </motion.div>
        </div>
    );
}
