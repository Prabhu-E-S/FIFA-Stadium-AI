'use client';

import React from 'react';

interface ConfidenceBadgeProps {
    confidence: number;
}

export default function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
    const getColor = () => {
        if (confidence >= 90) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
        if (confidence >= 75) return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
        if (confidence >= 60) return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5';
        return 'text-red-400 border-red-500/20 bg-red-500/5';
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold shrink-0 ${getColor()}`}>
            {confidence}% CONFIDENCE
        </span>
    );
}
