'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Users,
  ShieldAlert,
  BrainCircuit,
  Map,
  Accessibility,
  Calendar,
  MapPin,
  Activity,
  ChevronRight,
  AlertOctagon,
  Sparkles
} from 'lucide-react';

import PageContainer from '@/components/common/page-container';
import StatCard from '@/components/common/stat-card';
import AlertCard from '@/components/common/alert-card';
import TimelineCard from '@/components/common/timeline-card';
import StatusBadge from '@/components/common/status-badge';

// Container Variants for stagger animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } }
};

export default function DashboardPage() {
  // Static placeholders
  const stats = [
    {
      title: 'Crowd Status',
      value: '64,120 / 70,000',
      change: '+14.2%',
      changeType: 'increase' as const,
      icon: Users,
      status: 'success' as const,
      description: 'Stadium capacity at 91.6%'
    },
    {
      title: 'Active Incidents',
      value: '2 Alerts',
      change: '-60.0%',
      changeType: 'decrease' as const,
      icon: ShieldAlert,
      status: 'danger' as const,
      description: '1 security, 1 facility incident'
    },
    {
      title: 'AI Recommendations',
      value: '6 Optimal',
      change: '+2 new',
      changeType: 'increase' as const,
      icon: BrainCircuit,
      status: 'info' as const,
      description: 'Crowd flow and logistics suggestions'
    },
    {
      title: 'Navigation Requests',
      value: '1,450 / hr',
      change: '+18.4%',
      changeType: 'increase' as const,
      icon: Map,
      status: 'info' as const,
      description: 'High traffic near North Exit'
    },
    {
      title: 'Accessibility Requests',
      value: '18 Active',
      change: '-12.5%',
      changeType: 'decrease' as const,
      icon: Accessibility,
      status: 'warning' as const,
      description: '14 resolved in last hour'
    }
  ];

  const recentAlerts = [
    {
      id: 'alt-1',
      title: 'North Entrance Crowd Congestion',
      description: 'Crowd flow rate exceeding threshold. Recommending activation of bypass gate 2B and redirecting route B users.',
      timestamp: '5 min ago',
      severity: 'warning' as const,
      location: 'Gate 2A & 2B, North Concourse',
      status: 'active' as const
    },
    {
      id: 'alt-2',
      title: 'Elevator E-4 Offline (Power Trip)',
      description: 'Facility elevator E-4 serving wheelchair Section 304 reported offline. Accessibility cart dispatched to assist visitors.',
      timestamp: '18 min ago',
      severity: 'error' as const,
      location: 'Level 2, Section 304',
      status: 'active' as const
    },
    {
      id: 'alt-3',
      title: 'Medical Assistance Requested',
      description: 'Heat exhaustion report at Row 14, Seat 22. Medical response team alpha has reached and is administering first aid.',
      timestamp: '42 min ago',
      severity: 'success' as const,
      location: 'Sector 5, Lower Tier',
      status: 'resolved' as const
    }
  ];

  const timelineEvents = [
    {
      id: 'evt-1',
      time: '10:35 AM',
      title: 'Roof Closure Sequence Initiated',
      description: 'AI detected incoming light rain front. Retractable roof closing cycle will complete in 8 minutes.',
      category: 'weather' as const,
      status: 'ongoing' as const
    },
    {
      id: 'evt-2',
      time: '10:14 AM',
      title: 'Sector 3 Access Gates Congestion Cleared',
      description: 'Additional biometric scanning lanes opened to accelerate entry flow. Delay returned to normal (<2 mins).',
      category: 'crowd' as const,
      status: 'resolved' as const
    },
    {
      id: 'evt-3',
      time: '09:55 AM',
      title: 'Biometric Access Integration Check',
      description: 'Quarterly system checks verified normal performance across all 120 ticketing checkpoints.',
      category: 'system' as const,
      status: 'resolved' as const
    },
    {
      id: 'evt-4',
      time: '09:30 AM',
      title: 'Accessibility Cart Dispatched (Cart #4)',
      description: 'Dispatched to Gate 8 to transport an elderly visitor matching mobility assistance parameters.',
      category: 'access' as const,
      status: 'resolved' as const
    }
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-8 md:p-10 backdrop-blur-md"
      >
        {/* Glow Effects */}
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-blue-600/10 blur-[80px]" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-emerald-600/5 blur-[80px]" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Stadium Intelligence Core</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
              StadiumBrain AI
            </h1>
            <p className="text-zinc-400 text-sm max-w-xl md:text-base leading-relaxed">
              An AI-powered stadium intelligence platform for the FIFA World Cup 2026. Monitor crowding, manage incidents, optimize routing, and assist accessibility requirements in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col border border-zinc-800/85 bg-zinc-900/60 p-4 rounded-2xl min-w-[130px]">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">CROWD STATUS</span>
              <span className="text-lg font-bold text-white mt-1">SECURE</span>
              <span className="text-[10px] text-emerald-450 font-bold mt-0.5">NORMAL FLOW</span>
            </div>
            <div className="flex flex-col border border-zinc-800/85 bg-zinc-900/60 p-4 rounded-2xl min-w-[130px]">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">INCIDENTS</span>
              <span className="text-lg font-bold text-white mt-1">2 PLANNED</span>
              <span className="text-[10px] text-zinc-405 font-bold mt-0.5">0 CRITICAL</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Quick Stats Carousel/List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <StatCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              status={stat.status}
              description={stat.description}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Secondary Row: Timeline, Alerts, Match Details */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Recent Alerts (7 cols on lg) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-zinc-400" />
              <h2 className="text-lg font-bold tracking-tight text-white">Recent Operations Alerts</h2>
            </div>
            <button className="flex items-center text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">
              <span>View operational center</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {recentAlerts.map((alert) => (
              <motion.div key={alert.id} variants={itemVariants}>
                <AlertCard
                  title={alert.title}
                  description={alert.description}
                  timestamp={alert.timestamp}
                  severity={alert.severity}
                  location={alert.location}
                  status={alert.status}
                  onActionClick={() => console.log('Respond click')}
                  actionText="Dispatch Team"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Timeline & Match Card (5 cols on lg) */}
        <div className="space-y-8 lg:col-span-5">
          {/* Upcoming Match Card */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-zinc-400" />
              <span>Upcoming Match Information</span>
            </h2>

            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-950/20 p-5 backdrop-blur-md"
            >
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800/60">
                <span className="text-[10px] font-bold text-zinc-450 tracking-wider">MATCHDAY 3 - GROUP A</span>
                <StatusBadge status="success" label="NORMAL SECURITY" />
              </div>

              <div className="flex items-center justify-around py-6">
                {/* Home Team */}
                <div className="flex flex-col items-center">
                  <div className="text-3xl filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]">🇺🇸</div>
                  <span className="font-bold text-white text-sm mt-2">United States</span>
                  <span className="text-[10px] text-zinc-500 font-semibold mt-0.5">HOST</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-zinc-500 text-xs font-bold font-mono">VS</span>
                  <div className="w-[1px] h-6 bg-zinc-800 my-1" />
                  <span className="text-[10px] font-bold text-blue-500 font-mono">20:00 EST</span>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center">
                  <div className="text-3xl filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
                  <span className="font-bold text-white text-sm mt-2">England</span>
                  <span className="text-[10px] text-zinc-500 font-semibold mt-0.5">GUEST</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/60 text-xs font-medium text-zinc-405">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  <span>MetLife Stadium, NJ</span>
                </div>
                <div className="flex items-center gap-2 justify-self-end">
                  <Users className="h-3.5 w-3.5 text-zinc-500" />
                  <span>78,500 expected</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-zinc-400" />
                <span>Stadium Operations Log</span>
              </h2>
              <span className="text-[10px] font-bold font-mono text-zinc-500">LIVE FEED</span>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-5 backdrop-blur-md max-h-[360px] overflow-y-auto">
              <div className="flow-root">
                {timelineEvents.map((event) => (
                  <TimelineCard
                    key={event.id}
                    time={event.time}
                    title={event.title}
                    description={event.description}
                    category={event.category}
                    status={event.status}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
