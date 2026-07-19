'use client';

import React from 'react';

interface PriorityBadgeProps {
    priority: 'low' | 'medium' | 'high' | 'critical' | string;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
    const normalized = priority?.toLowerCase() || 'low';

    const getColors = () => {
        switch (normalized) {
            case 'critical':
            case 'danger':
                return 'text-red-500 border-red-500/25 bg-red-500/10 font-extrabold';
            case 'high':
                return 'text-orange-450 border-orange-500/25 bg-orange-500/10 font-bold';
            case 'medium':
            case 'warning':
                return 'text-yellow-500 border-yellow-500/25 bg-yellow-500/10 font-bold';
            default:
                return 'text-emerald-450 border-emerald-500/25 bg-emerald-500/10 font-bold';
        }
    };

    return (
        <span className={`inline-flex px-2 py-0.5 rounded-md border text-[9px] uppercase tracking-wider shrink-0 ${getColors()}`}>
            {priority}
        </span>
    );
}
