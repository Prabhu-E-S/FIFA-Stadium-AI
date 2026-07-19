'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    subtitle?: string;
    icon?: LucideIcon;
    iconColor?: string;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function DashboardCard({
    title,
    subtitle,
    icon: Icon,
    iconColor = 'text-blue-500',
    actions,
    children,
    className = '',
    hoverEffect = true,
}: DashboardCardProps) {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -4, borderColor: 'rgba(37, 99, 235, 0.3)' } : {}}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-md transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] ${className}`}
        >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-850/60 border border-zinc-800">
                            <Icon className={`h-5 w-5 ${iconColor}`} />
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-white tracking-wide text-sm">{title}</h3>
                        {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
                    </div>
                </div>
                {actions && <div className="flex items-center">{actions}</div>}
            </div>

            {/* Card Content */}
            <div className="text-zinc-300 text-sm">{children}</div>
        </motion.div>
    );
}
