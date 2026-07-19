'use client';

import React from 'react';

export type BadgeStatus = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
    status: BadgeStatus;
    label: string;
    className?: string;
}

export default function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
    const statusStyles = {
        success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-450 hover:bg-emerald-500/15 shadow-[0_0_10px_rgba(34,197,94,0.05)]',
        warning: 'bg-amber-500/10 border-amber-500/20 text-amber-450 hover:bg-amber-500/15 shadow-[0_0_10px_rgba(245,158,11,0.05)]',
        danger: 'bg-rose-500/10 border-rose-500/20 text-rose-450 hover:bg-rose-500/15 shadow-[0_0_10px_rgba(239,68,68,0.05)]',
        info: 'bg-blue-500/10 border-blue-500/20 text-blue-450 hover:bg-blue-500/15 shadow-[0_0_10px_rgba(37,99,235,0.05)]',
        neutral: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400 hover:bg-zinc-500/15',
    };

    const statusIcons = {
        success: 'bg-emerald-500',
        warning: 'bg-amber-500',
        danger: 'bg-rose-500',
        info: 'bg-blue-500',
        neutral: 'bg-zinc-500',
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold select-none transition-colors duration-250 ${statusStyles[status]} ${className}`}
            role="status"
            aria-label={`Status: ${label}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${statusIcons[status]}`} />
            <span>{label}</span>
        </span>
    );
}
