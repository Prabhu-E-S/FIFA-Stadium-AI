'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Search,
  Terminal,
  Send,
  Loader2,
  GitBranch
} from 'lucide-react';
import Link from 'next/link';

import PageContainer from '@/components/common/page-container';
import StatCard from '@/components/common/stat-card';
import AlertCard from '@/components/common/alert-card';
import TimelineCard from '@/components/common/timeline-card';
import StatusBadge from '@/components/common/status-badge';

import {
  callOrchestrator,
  callNavigation,
  callCrowd,
  callEmergency,
  callAccessibility,
  OrchestratorResponse,
  NavigationResponse,
  CrowdResponse,
  EmergencyResponse,
  AccessibilityResponse
} from '@/lib/api';

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
  // AI Orchestrator Console state
  const [query, setQuery] = useState('');
  const [orchestratorResult, setOrchestratorResult] = useState<OrchestratorResponse | null>(null);
  const [orchestratorLoading, setOrchestratorLoading] = useState(false);

  // Backend fetched states
  const [navData, setNavData] = useState<NavigationResponse | null>(null);
  const [crowdData, setCrowdData] = useState<CrowdResponse | null>(null);
  const [emergencyData, setEmergencyData] = useState<EmergencyResponse | null>(null);
  const [accessData, setAccessData] = useState<AccessibilityResponse | null>(null);

  // Fetch initial mock metrics from backend on mount
  useEffect(() => {
    async function getInitialMetrics() {
      try {
        const [nav, crd, emg, acc] = await Promise.all([
          callNavigation(),
          callCrowd(),
          callEmergency(),
          callAccessibility()
        ]);
        setNavData(nav);
        setCrowdData(crd);
        setEmergencyData(emg);
        setAccessData(acc);
      } catch (error) {
        console.error("Failed to load initial metrics from FastAPI server:", error);
      }
    }
    getInitialMetrics();
  }, []);

  // Submit query to Orchestrator API
  const handleOrchestrate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setOrchestratorLoading(true);
    setOrchestratorResult(null);

    try {
      const response = await callOrchestrator(query);
      setOrchestratorResult(response);

      // Dynamically fetch and update the local agent metrics triggered by the orchestrator
      if (response.selected_agents.includes('navigation')) {
        const nav = await callNavigation(query);
        setNavData(nav);
      }
      if (response.selected_agents.includes('crowd')) {
        const crd = await callCrowd(query);
        setCrowdData(crd);
      }
      if (response.selected_agents.includes('emergency')) {
        const emg = await callEmergency(query);
        setEmergencyData(emg);
      }
      if (response.selected_agents.includes('accessibility')) {
        const acc = await callAccessibility(query);
        setAccessData(acc);
      }
    } catch (error) {
      console.error("Failed to route query through orchestrator:", error);
    } finally {
      setOrchestratorLoading(false);
    }
  };

  const stats = [
    {
      title: 'Crowd Status',
      value: crowdData ? `${crowdData.zone} (${crowdData.crowd_level})` : '64,120 / 70,000',
      change: crowdData ? 'LIVE BACKEND' : '+14.2%',
      changeType: 'increase' as const,
      icon: Users,
      status: crowdData?.crowd_level === 'High' ? 'danger' as const : 'success' as const,
      description: crowdData ? `Forecast: ${crowdData.prediction}` : 'Stadium capacity at 91.6%'
    },
    {
      title: 'Active Incidents',
      value: emergencyData ? `${emergencyData.priority} Priority` : '2 Alerts',
      change: emergencyData ? 'LIVE BACKEND' : '-60.0%',
      changeType: 'decrease' as const,
      icon: ShieldAlert,
      status: 'danger' as const,
      description: emergencyData ? `Action: ${emergencyData.recommended_action} (ETA: ${emergencyData.eta})` : '1 security, 1 facility incident'
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
      value: navData ? `${navData.gate} (${navData.walking_time})` : '1,450 / hr',
      change: navData ? 'LIVE BACKEND' : '+18.4%',
      changeType: 'increase' as const,
      icon: Map,
      status: 'info' as const,
      description: navData ? `Transit: ${navData.status} | Crowd: ${navData.crowd}` : 'High traffic near North Exit'
    },
    {
      title: 'Accessibility Requests',
      value: accessData ? accessData.route : '18 Active',
      change: accessData ? 'LIVE BACKEND' : '-12.5%',
      changeType: 'decrease' as const,
      icon: Accessibility,
      status: 'warning' as const,
      description: accessData ? `Hazards: ${accessData.warnings.join(', ')}` : '14 resolved in last hour'
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
              <span className="text-[10px] text-emerald-400 font-bold mt-0.5">NORMAL FLOW</span>
            </div>
            <div className="flex flex-col border border-zinc-800/85 bg-zinc-900/60 p-4 rounded-2xl min-w-[130px]">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">INCIDENTS</span>
              <span className="text-lg font-bold text-white mt-1">2 PLANNED</span>
              <span className="text-[10px] text-yellow-500 font-bold mt-0.5">0 CRITICAL</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Orchestrator Console */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-md space-y-4"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-blue-400" />
            <h2 className="text-base font-bold">AI Multi-Agent Orchestrator</h2>
          </div>
          <Link href="/workflow" className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 duration-200">
            <GitBranch className="h-3.5 w-3.5" />
            <span>Interactive Workflow View</span>
          </Link>
        </div>
        <p className="text-xs text-zinc-400">
          Input an operational command or enquiry. The Orchestrator will classify the intent and trigger the correct analytics agents.
        </p>

        <form onSubmit={handleOrchestrate} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Find wheelchair routings, check crowd capacity of east stand, safety status..."
              className="w-full h-10 rounded-xl border border-zinc-800/90 bg-zinc-950/80 pl-10 pr-4 text-xs text-white placeholder-zinc-650 outline-none focus:border-blue-500/80 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={orchestratorLoading}
            className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all disabled:opacity-50 active:scale-95 duration-200"
          >
            {orchestratorLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <span>Orchestrate</span>
                <Send className="h-3 w-3" />
              </>
            )}
          </button>
        </form>

        {/* Display Orchestrator Results */}
        {orchestratorResult && (
          <div className="space-y-4 pt-2">
            {/* Step 1: Orchestration Info */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                    PIPELINE INTENT: {orchestratorResult.intent}
                  </span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {orchestratorResult.selected_agents.map((agt) => (
                    <span key={agt} className="rounded-full bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400 capitalize">
                      {agt} agent active
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-400">
                {orchestratorResult.message}
              </p>
            </div>

            {/* Step 2: Individual Sub-Agent Telemetry Outputs */}
            {orchestratorResult.sub_agent_responses && orchestratorResult.sub_agent_responses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {orchestratorResult.sub_agent_responses.map((agentData, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-805 bg-zinc-900/40 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white capitalize">{agentData.agent} Agent</span>
                      <StatusBadge status={agentData.status} label={agentData.status?.toUpperCase() || 'SUCCESS'} />
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono space-y-1">
                      {Object.entries(agentData.data || {}).map(([key, val]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-zinc-500">{key}:</span>
                          <span className="text-zinc-305 font-semibold truncate max-w-[120px]">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Decision Output */}
            {orchestratorResult.decision && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Central Decision Recommendation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-zinc-450 font-bold">CONFIDENCE: {orchestratorResult.decision.confidence}%</span>
                    <StatusBadge
                      status={orchestratorResult.decision.priority === 'High' ? 'danger' : orchestratorResult.decision.priority === 'Medium' ? 'warning' : 'success'}
                      label={`${orchestratorResult.decision.priority} Priority`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-zinc-300 font-mono">OPERATIONAL SUMMARY:</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {orchestratorResult.decision.summary}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1">
                  <h4 className="text-xs font-semibold text-emerald-400">DIRECTED ACTION INSTRUCTIONS:</h4>
                  <p className="text-xs text-white leading-relaxed font-bold">
                    {orchestratorResult.decision.recommendation}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Dashboard Quick Stats */}
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
                <span className="text-[10px] font-bold text-zinc-550 tracking-wider">MATCHDAY 3 - GROUP A</span>
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

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/60 text-xs font-medium text-zinc-450">
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
