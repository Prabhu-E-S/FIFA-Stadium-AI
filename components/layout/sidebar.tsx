'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayout } from '@/lib/layout-context';
import {
    Home,
    Map,
    Users,
    ShieldAlert,
    Accessibility,
    Settings,
    X,
    BrainCircuit
} from 'lucide-react';

const sidebarItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Smart Navigation', href: '/navigation', icon: Map },
    { name: 'Crowd Monitor', href: '/crowd-monitor', icon: Users },
    { name: 'Emergency Center', href: '/emergency-center', icon: ShieldAlert },
    { name: 'Accessibility', href: '/accessibility', icon: Accessibility },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen } = useLayout();

    const handleLinkClick = () => {
        // Close sidebar on mobile after navigation
        setSidebarOpen(false);
    };

    const sidebarContent = (
        <div className="flex h-full flex-col bg-zinc-950/80 text-white backdrop-blur-xl border-r border-zinc-800/80">
            {/* Brand Logo & Name Area */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-800/80">
                <Link href="/" className="flex items-center gap-3 group" onClick={handleLinkClick}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all group-hover:scale-105">
                        <BrainCircuit className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <span className="font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                            StadiumBrain
                        </span>
                        <span className="block text-[10px] text-zinc-500 font-medium tracking-widest -mt-0.5">
                            FIFA 2026 AI
                        </span>
                    </div>
                </Link>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-lg p-1.5 hover:bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors md:hidden"
                    aria-label="Close sidebar"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={handleLinkClick}
                            className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative ${isActive
                                ? 'text-white'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNavIndicator"
                                    className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-xl"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                            {isActive && (
                                <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-md" />
                            )}
                            <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-105 ${isActive ? 'text-blue-500' : 'text-zinc-500 group-hover:text-zinc-300'
                                }`} />
                            <span className="relative z-10">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Status Area */}
            <div className="p-6 border-t border-zinc-800/80 bg-zinc-950/40">
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <div>
                        <div className="text-[11px] font-semibold text-zinc-300">SYSTEM STATE</div>
                        <div className="text-[10px] text-zinc-500 font-mono">FIFA-SECURE-IDLE</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar: stays on screen */}
            <aside className="hidden h-screen w-64 md:block flex-shrink-0">
                {sidebarContent}
            </aside>

            {/* Mobile Drawer Backdrop */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
                        />
                        {/* Mobile Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-72 h-full md:hidden"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
