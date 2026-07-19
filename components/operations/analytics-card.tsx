'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    children: React.ReactNode;
}

export default function AnalyticsCard({
    title,
    description,
    icon: Icon,
    children
}: AnalyticsCardProps) {
    return (
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-5 md:p-6 backdrop-blur-md space-y-4 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start border-b border-zinc-900/60 pb-3">
                <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
                    {description && <p className="text-[10px] text-zinc-500 font-semibold">{description}</p>}
                </div>
                {Icon && (
                    <div className="p-1.5 rounded-lg bg-zinc-950/40 border border-zinc-800 text-zinc-450">
                        <Icon className="h-4 w-4" />
                    </div>
                )}
            </div>
            <div className="flex-1 w-full min-h-[220px] pt-4">
                {children}
            </div>
        </div>
    );
}
