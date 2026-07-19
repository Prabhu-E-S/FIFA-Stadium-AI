'use client';

import React from 'react';
import { Clock, Activity, AlertTriangle, Info } from 'lucide-react';

export interface TimelineItem {
    id: string;
    time: string;
    title: string;
    description: string;
    category: 'crowd' | 'safety' | 'sys' | 'transit' | string;
}

interface TimelineProps {
    items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
    const getCategoryIcon = (cat: string) => {
        switch (cat.toLowerCase()) {
            case 'crowd': return Activity;
            case 'safety': return AlertTriangle;
            case 'transit': return Clock;
            default: return Info;
        }
    };

    const getCategoryColors = (cat: string) => {
        switch (cat.toLowerCase()) {
            case 'crowd': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'safety': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'transit': return 'bg-yellow-500/10 text-yellow-405 border-yellow-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {items.map((item, idx) => {
                    const Icon = getCategoryIcon(item.category);
                    return (
                        <li key={item.id}>
                            <div className="relative pb-8">
                                {idx !== items.length - 1 ? (
                                    <span className="absolute top-4 left-4 -ml-[1px] h-full w-[2px] bg-zinc-800" aria-hidden="true" />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span className={`h-8 w-8 rounded-full flex items-center justify-center border ${getCategoryColors(item.category)}`}>
                                            <Icon className="h-4 w-4" />
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-xs text-white font-bold">{item.title}</p>
                                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.description}</p>
                                        </div>
                                        <div className="text-right text-[10px] whitespace-nowrap text-zinc-500 font-bold font-mono">
                                            {item.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
