'use client';

import React from 'react';

interface SectionHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

export default function SectionHeader({ title, description, actions }: SectionHeaderProps) {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/40 pb-5">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    {actions}
                </div>
            )}
        </div>
    );
}
