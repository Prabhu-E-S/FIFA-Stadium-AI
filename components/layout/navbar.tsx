'use client';

import React from 'react';
import { useLayout } from '@/lib/layout-context';
import { Menu, Bell, Search, User, Globe2 } from 'lucide-react';

export default function Navbar() {
    const { toggleSidebar } = useLayout();

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 backdrop-blur-xl">
            {/* Left side: Hamburger (mobile only) & Breadcrumb/Search placeholder */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="rounded-lg p-1.5 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors md:hidden"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Search Mockup (feels premium) */}
                <div className="relative hidden max-w-xs sm:block">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search operations, sectors..."
                        className="h-9 w-60 rounded-xl border border-zinc-800/80 bg-zinc-900/40 pl-9 pr-4 text-xs text-white placeholder-zinc-500 outline-none focus:border-blue-500/50 focus:bg-zinc-900/80 transition-all"
                        readOnly
                    />
                </div>
            </div>

            {/* Right side: Language Indicator, Notifications, and Profile */}
            <div className="flex items-center gap-4">
                {/* FIFA World Cup 2026 Indicator */}
                <div className="flex items-center gap-1.5 border border-zinc-800/80 bg-zinc-900/30 px-3 py-1 rounded-full text-[11px] font-bold text-zinc-400">
                    <Globe2 className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                    <span>FIFA World Cup 2026™</span>
                </div>

                {/* Notification Icon */}
                <button
                    className="relative rounded-xl border border-zinc-850 bg-zinc-900/30 p-2 hover:bg-zinc-805 hover:text-white text-zinc-400 transition-all group"
                    aria-label="Notifications"
                >
                    <Bell className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-105" />
                    {/* Notification Ping Badge */}
                    <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                    </span>
                </button>

                <div className="h-8 w-[1px] bg-zinc-800" />

                {/* Profile Avatar */}
                <button
                    className="flex items-center gap-2 rounded-xl border border-zinc-850 bg-zinc-900/30 p-1.5 pr-3 hover:bg-zinc-805 transition-all duration-300 group"
                    aria-label="Profile menu"
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-800 text-[11px] font-semibold text-white group-hover:scale-105 transition-transform">
                        <User className="h-4 w-4" />
                    </div>
                    <div className="hidden text-left sm:block">
                        <div className="text-xs font-semibold text-zinc-300">FIFA Liaison</div>
                        <div className="text-[9px] text-zinc-500 -mt-0.5">Stadia Control</div>
                    </div>
                </button>
            </div>
        </header>
    );
}
