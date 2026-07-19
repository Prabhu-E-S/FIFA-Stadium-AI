'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedProgressBarProps {
    value: number;
    label?: string;
    theme?: 'blue' | 'emerald' | 'yellow' | 'red';
}

export default function AnimatedProgressBar({
    value,
    label,
    theme = 'blue'
}: AnimatedProgressBarProps) {
    const getThemeColor = () => {
        switch (theme) {
            case 'emerald': return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
            case 'yellow': return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]';
            case 'red': return 'bg-red-505 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
            default: return 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]';
        }
    };

    return (
        <div className="space-y-1.5 w-full">
            <div className="flex justify-between items-center text-[10px] font-bold font-mono">
                {label && <span className="text-zinc-400 uppercase tracking-wider">{label}</span>}
                <span className="text-white ml-auto">{value}%</span>
            </div>
            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${getThemeColor()}`}
                />
            </div>
        </div>
    );
}
