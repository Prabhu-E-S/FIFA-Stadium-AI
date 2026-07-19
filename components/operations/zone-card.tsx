'use client';

import React from 'react';
import { Users, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export type ZoneColor = 'green' | 'yellow' | 'orange' | 'red';

interface ZoneCardProps {
    name: string;
    crowdLevel: string;
    riskLevel: string;
    status: string;
    color: ZoneColor;
    onClick?: () => void;
    isSelected?: boolean;
}

export default function ZoneCard({
    name,
    crowdLevel,
    riskLevel,
    status,
    color,
    onClick,
    isSelected = false
}: ZoneCardProps) {
    const getBadgeColors = (c: ZoneColor) => {
        switch (c) {
            case 'green': return 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-bold';
            case 'yellow': return 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10 font-bold';
            case 'orange': return 'border-orange-500/30 text-orange-400 bg-orange-500/10 font-bold';
            case 'red': return 'border-red-500/30 text-red-505 bg-red-500/10 font-extrabold';
        }
    };

    const getBorderClass = () => {
        if (isSelected) return 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/50';

        switch (color) {
            case 'green': return 'border-zinc-800/80 hover:border-emerald-500/40 bg-zinc-900/10';
            case 'yellow': return 'border-zinc-800/80 hover:border-yellow-500/40 bg-zinc-900/10';
            case 'orange': return 'border-zinc-800/80 hover:border-orange-500/40 bg-zinc-900/10';
            case 'red': return 'border-zinc-800/80 hover:border-red-500/40 bg-zinc-900/10';
        }
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            onClick={onClick}
            className={`w-full text-left rounded-2xl border p-4 backdrop-blur-md transition-all cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/70 select-none ${getBorderClass()}`}
        >
            <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-white tracking-tight">{name}</h4>
                <span className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-wider border ${getBadgeColors(color)}`}>
                    {color.toUpperCase()}
                </span>
            </div>

            <p className="text-[10px] text-zinc-400 mt-2 line-clamp-1 leading-snug">
                {status}
            </p>

            <div className="flex gap-4 mt-3 pt-3 border-t border-zinc-800/50 text-[10px] font-semibold text-zinc-400">
                <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-zinc-550" />
                    <span>Crowd: {crowdLevel}</span>
                </div>
                <div className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-zinc-550" />
                    <span>Risk: {riskLevel}</span>
                </div>
            </div>
        </motion.button>
    );
}
