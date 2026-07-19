'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import PriorityBadge from './priority-badge';
import ConfidenceBadge from './confidence-badge';

interface AIRecommendationCardProps {
    title: string;
    summary: string;
    recommendation: string;
    priority: string;
    confidence: number;
    location?: string;
    timestamp: string;
}

export default function AIRecommendationCard({
    title,
    summary,
    recommendation,
    priority,
    confidence,
    location,
    timestamp
}: AIRecommendationCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Sparkles className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs font-mono font-bold text-zinc-350 uppercase select-none">{title}</h4>
                </div>
                <div className="flex items-center gap-2">
                    <PriorityBadge priority={priority} />
                    <span className="text-[10px] text-zinc-550 font-bold font-mono">{timestamp}</span>
                </div>
            </div>

            <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block font-mono">Operations Directive</span>
                <p className="text-xs font-bold text-white leading-relaxed">{recommendation}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-900/60">
                <ConfidenceBadge confidence={confidence} />

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-350 transition-colors py-1 cursor-pointer select-none"
                >
                    <span>{isOpen ? 'Hide' : 'Expand'} Details</span>
                    {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 mt-1 space-y-2.5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-900/60">
                            <div>
                                <span className="font-semibold text-zinc-300">Summary: </span>
                                {summary}
                            </div>
                            {location && (
                                <div>
                                    <span className="font-semibold text-zinc-300">Affected Area: </span>
                                    {location}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
