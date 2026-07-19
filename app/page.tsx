'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
  Users,
  ShieldAlert,
  BrainCircuit,
  Map,
  Accessibility,
  Activity,
  Terminal,
  Send,
  Loader2,
  Search,
  Sparkles,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

import PageContainer from '@/components/common/page-container';
import ErrorBoundary from '@/components/common/error-boundary';

// Reusable components
import KPICard from '@/components/operations/kpi-card';
import ZoneCard, { ZoneColor } from '@/components/operations/zone-card';
import AIRecommendationCard from '@/components/operations/ai-recommendation-card';
import AgentExecutionCard from '@/components/operations/agent-execution-card';
import AnimatedProgressBar from '@/components/operations/animated-progress-bar';

import {
  callOrchestrator,
  OrchestratorResponse
} from '@/lib/api';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

interface ZoneData {
  name: string;
  crowdLevel: string;
  riskLevel: string;
  status: string;
  color: ZoneColor;
  occupancy: number; // percentage
  incidents: number;
  recommendation: string;
}

export default function DashboardPage() {
  // AI Orchestrator state
  const [query, setQuery] = useState('');
  const [orchestratorResult, setOrchestratorResult] = useState<OrchestratorResponse | null>(null);
  const [orchestratorLoading, setOrchestratorLoading] = useState(false);
  const [queryTimestamp, setQueryTimestamp] = useState<string>('');

  // Simulated live KPIs state
  const [crowdCount, setCrowdCount] = useState(64120);
  const [activeIncidents, setActiveIncidents] = useState(2);
  const [navRequests, setNavRequests] = useState(1450);
  const [accessRequests, setAccessRequests] = useState(18);
  const [aiConfidence, setAiConfidence] = useState(94);
  const [overallHealth, setOverallHealth] = useState(96);

  // Stadium Zone Cards state
  const [zones, setZones] = useState<ZoneData[]>([
    {
      name: 'North Stand',
      crowdLevel: 'Moderate',
      riskLevel: 'Low',
      status: 'Normal entry flow at gates.',
      color: 'green',
      occupancy: 65,
      incidents: 0,
      recommendation: 'Main entrance operation nominal.'
    },
    {
      name: 'South Stand',
      crowdLevel: 'Heavy',
      riskLevel: 'Medium',
      status: 'Food court area congestion.',
      color: 'yellow',
      occupancy: 88,
      incidents: 1,
      recommendation: 'Open concession sector bypass lanes.'
    },
    {
      name: 'East Stand',
      crowdLevel: 'Critical',
      riskLevel: 'High',
      status: 'Concourse gate congestion.',
      color: 'red',
      occupancy: 94,
      incidents: 1,
      recommendation: 'Reroute incoming arrivals to West Entrance.'
    },
    {
      name: 'West Stand',
      crowdLevel: 'Moderate',
      riskLevel: 'Low',
      status: 'Flow rate steady.',
      color: 'green',
      occupancy: 58,
      incidents: 0,
      recommendation: 'West sectors ready for spillover traffic.'
    },
    {
      name: 'VIP',
      crowdLevel: 'Low',
      riskLevel: 'Low',
      status: 'Secure access checks active.',
      color: 'green',
      occupancy: 42,
      incidents: 0,
      recommendation: 'Lounge pathways clean. Escalators nominal.'
    },
    {
      name: 'Parking',
      crowdLevel: 'Heavy',
      riskLevel: 'Low',
      status: 'Zone B lot near capacity.',
      color: 'yellow',
      occupancy: 82,
      incidents: 0,
      recommendation: 'Redirect incoming vehicles to North overflow Lot C.'
    },
    {
      name: 'Fan Zone',
      crowdLevel: 'Heavy',
      riskLevel: 'Medium',
      status: 'Live screen gathering at limit.',
      color: 'orange',
      occupancy: 85,
      incidents: 0,
      recommendation: 'Deploy crowd control barriers at Sector 3 boundary.'
    }
  ]);

  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(zones[2]); // East Stand initially

  // 10 second light simulation interval
  useEffect(() => {
    const timer = setInterval(() => {
      // Fluctuate crowd count slightly (+- 150)
      setCrowdCount(prev => {
        const delta = Math.floor(Math.random() * 300) - 150;
        const target = prev + delta;
        return Math.max(50000, Math.min(70000, target));
      });

      // Navigation requests fluctuation
      setNavRequests(prev => prev + Math.floor(Math.random() * 21) - 10);

      // Accessibility requests fluctuation
      setAccessRequests(prev => Math.max(5, Math.min(25, prev + Math.floor(Math.random() * 3) - 1)));

      // AI Confidence fluctuation (+- 2)
      setAiConfidence(prev => Math.max(85, Math.min(99, prev + Math.floor(Math.random() * 5) - 2)));

      // Overall health fluctuation
      setOverallHealth(prev => Math.max(90, Math.min(100, prev + Math.floor(Math.random() * 3) - 1)));

      // Randomly update zone occupancies and status
      setZones(prevZones => {
        const nextZones = prevZones.map(zone => {
          const occupancyDelta = Math.floor(Math.random() * 5) - 2;
          const nextOccupancy = Math.max(30, Math.min(99, zone.occupancy + occupancyDelta));

          let color: ZoneColor = 'green';
          let crowdLevel = 'Moderate';
          if (nextOccupancy >= 90) {
            color = 'red';
            crowdLevel = 'Critical';
          } else if (nextOccupancy >= 80) {
            color = 'orange';
            crowdLevel = 'Heavy';
          } else if (nextOccupancy >= 68) {
            color = 'yellow';
            crowdLevel = 'Heavy';
          }

          return {
            ...zone,
            occupancy: nextOccupancy,
            color,
            crowdLevel
          };
        });

        // Sync selected zone info
        if (selectedZone) {
          const updatedSelected = nextZones.find(z => z.name === selectedZone.name);
          if (updatedSelected) {
            setSelectedZone(updatedSelected);
          }
        }
        return nextZones;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [selectedZone]);

  const handleOrchestrate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setOrchestratorLoading(true);
    setOrchestratorResult(null);

    const now = new Date();
    setQueryTimestamp(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`);

    try {
      const response = await callOrchestrator(query);
      setOrchestratorResult(response);

      // Dynamic metrics updates based on AI intent response
      if (response.selected_agents.includes('crowd')) {
        setCrowdCount(prev => prev + 1000);
      }
      if (response.selected_agents.includes('emergency')) {
        setActiveIncidents(prev => prev + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOrchestratorLoading(false);
    }
  };

  return (
    <PageContainer>
      {/* Top Welcome Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-zinc-800/80 bg-zinc-900/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>FIFA WORLD CUP COMMAND CENTRE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">MetLife Operations Dashboard</h1>
          <p className="text-xs text-zinc-450">Real-time telemetry, spatial sector occupancy metrics, and AI multi-agent recommendation engine.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-zinc-550 font-bold font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            LIVE TELEMETRY REFRESHING (10S)
          </span>

          <Link
            href="/operations"
            className="flex items-center justify-center h-9 px-4 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-xs font-bold text-white transition-all select-none"
          >
            <span>Operations Log</span>
          </Link>
        </div>
      </motion.div>

      {/* Grid Section 1: Live Stadium Overview KPI Cards (6 columns) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-6 gap-3"
      >
        <motion.div variants={itemVariants}>
          <KPICard
            title="Crowd Occupancy"
            value={`${crowdCount.toLocaleString()} / 75,000`}
            progress={Math.round((crowdCount / 75000) * 100)}
            icon={Users}
            status="info"
            description="Overall seats occupied"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Active Incidents"
            value={`${activeIncidents} Alerts`}
            icon={ShieldAlert}
            status={activeIncidents > 2 ? 'danger' : 'warning'}
            description="Open operations items"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Navigation Requests"
            value={`${navRequests.toLocaleString()} / hr`}
            icon={Map}
            status="info"
            description="Route redirection calls"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Access Requests"
            value={`${accessRequests} Jobs`}
            icon={Accessibility}
            status="warning"
            description="Cart & ramp calls active"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="AI Confidence"
            value={`${aiConfidence}%`}
            icon={BrainCircuit}
            status="success"
            progress={aiConfidence}
            description="Decision logic score"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="System Health"
            value={`${overallHealth}%`}
            icon={Activity}
            status="success"
            progress={overallHealth}
            description="Backend microservices uptime"
          />
        </motion.div>
      </motion.div>

      {/* Grid Section 2: AI Orchestrated Console and Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Orchestrated Query & Trace */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-6 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="h-4.5 w-4.5 text-blue-400" />
              <span>AI Agentic Decision Console</span>
            </h3>

            <form onSubmit={handleOrchestrate} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-550" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Crowd congestion reported near East Stand. Advise bypass routings."
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-zinc-800/80 bg-zinc-950/80 text-xs text-white placeholder-zinc-600 outline-none focus:border-blue-500 transition-all font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={orchestratorLoading || !query.trim()}
                className="flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all disabled:opacity-50 active:scale-95 duration-200 select-none shrink-0"
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

            <AnimatePresence mode="wait">
              {orchestratorResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Traced intent metadata */}
                  <div className="border border-zinc-800/80 bg-zinc-950/40 p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-400 uppercase tracking-widest font-mono">
                      INTENT DETECTED: {orchestratorResult.intent}
                    </span>
                    <span className="text-zinc-500 font-mono font-semibold">{queryTimestamp}</span>
                  </div>

                  <p className="text-xs text-zinc-450 leading-relaxed italic bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/30">
                    {"\""}{query}{"\""}
                  </p>

                  {/* Sub-Agent Activated Row */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-zinc-550 uppercase tracking-wider font-mono">
                      Agent Tracing Steps
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {orchestratorResult.sub_agent_responses?.map((agt) => (
                        <AgentExecutionCard
                          key={agt.agent}
                          agentName={agt.agent}
                          status={agt.status}
                          executionTime="310ms"
                          confidence={88}
                          details={agt.data}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Re-consolidated Decision output */}
                  {orchestratorResult.decision && (
                    <AIRecommendationCard
                      title="Decision Recommendation"
                      summary={orchestratorResult.decision.summary}
                      recommendation={orchestratorResult.decision.recommendation}
                      priority={orchestratorResult.decision.priority}
                      confidence={orchestratorResult.decision.confidence}
                      location={orchestratorResult.intent}
                      timestamp={queryTimestamp}
                    />
                  )}
                </motion.div>
              ) : (
                <div className="border border-dashed border-zinc-800/80 rounded-xl p-8 text-center text-zinc-500 font-medium text-xs">
                  {orchestratorLoading ? (
                    <div className="space-y-3 flex flex-col items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                      <span>Orchestrating AI Sub-agent execution pipeline...</span>
                    </div>
                  ) : (
                    "Submit queries to engage the Orchestrator and observe sub-agent executions."
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right 5 cols: Latest Recommendation & Map */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Recommendation Panel */}
          {orchestratorResult?.decision ? (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BrainCircuit className="h-4.5 w-4.5 text-emerald-400" />
                <span>Active Recommendation Directive</span>
              </h3>
              <AIRecommendationCard
                title="Consolidated Decision directive"
                summary={orchestratorResult.decision.summary}
                recommendation={orchestratorResult.decision.recommendation}
                priority={orchestratorResult.decision.priority}
                confidence={orchestratorResult.decision.confidence}
                location={orchestratorResult.intent}
                timestamp={queryTimestamp}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BrainCircuit className="h-4.5 w-4.5 text-zinc-450" />
                <span>Default AI Recommendation Directive</span>
              </h3>
              <AIRecommendationCard
                title="Operational Safety Directive"
                summary="Concourse crowd flow metrics in East Stand indicate crowding limits are close to red alerts. Rerouting is scheduled."
                recommendation="Direct Sector 3 entry gates to lock arriving queues and shift ticket flow to MetLife West Gate entrance."
                priority="High"
                confidence={92}
                location="East Stand concourse"
                timestamp="12:15:30"
              />
            </div>
          )}

          {/* Interactive Stadium Map Placeholder */}
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-5 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Map className="h-4.5 w-4.5 text-blue-400" />
              <span>Interactive Stadium Map</span>
            </h3>

            <ErrorBoundary fallbackTitle="Stadium Map Interactive Layout Offline">
              {/* Clickable Map Layout Placeholder */}
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 320 220" className="w-full max-w-[280px] h-auto text-zinc-650" aria-label="Stadium Sectors outline map">
                  {/* Outer Boundary */}
                  <rect x="10" y="10" width="300" height="200" rx="30" fill="none" stroke="#27272a" strokeWidth="2" />

                  {/* Pitch Area */}
                  <rect x="110" y="70" width="100" height="80" rx="5" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                  {/* Center circle */}
                  <circle cx="160" cy="110" r="16" fill="none" stroke="#3f3f46" strokeWidth="1.5" />

                  {/* Stands clickable polygon paths */}
                  {/* North Stand */}
                  <polygon
                    points="20,20 300,20 250,55 70,55"
                    fill={selectedZone?.name === 'North Stand' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(9, 9, 11, 0.5)'}
                    stroke={selectedZone?.name === 'North Stand' ? '#3b82f6' : '#27272a'}
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-blue-500/10 transition-all focus:outline-none"
                    onClick={() => setSelectedZone(zones[0])}
                    tabIndex={0}
                    aria-label="North Stand"
                  />

                  {/* East Stand */}
                  <polygon
                    points="300,20 300,200 255,160 255,60"
                    fill={selectedZone?.name === 'East Stand' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(9, 9, 11, 0.5)'}
                    stroke={selectedZone?.name === 'East Stand' ? '#ef4444' : '#27272a'}
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-red-500/10 transition-all focus:outline-none"
                    onClick={() => setSelectedZone(zones[2])}
                    tabIndex={0}
                    aria-label="East Stand"
                  />

                  {/* South Stand */}
                  <polygon
                    points="20,200 300,200 250,165 70,165"
                    fill={selectedZone?.name === 'South Stand' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(9, 9, 11, 0.5)'}
                    stroke={selectedZone?.name === 'South Stand' ? '#eab308' : '#27272a'}
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-yellow-500/10 transition-all focus:outline-none"
                    onClick={() => setSelectedZone(zones[1])}
                    tabIndex={0}
                    aria-label="South Stand"
                  />

                  {/* West Stand */}
                  <polygon
                    points="20,20 20,200 65,160 65,60"
                    fill={selectedZone?.name === 'West Stand' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(9, 9, 11, 0.5)'}
                    stroke={selectedZone?.name === 'West Stand' ? '#3b82f6' : '#27272a'}
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-blue-500/10 transition-all focus:outline-none"
                    onClick={() => setSelectedZone(zones[3])}
                    tabIndex={0}
                    aria-label="West Stand"
                  />
                </svg>
              </div>

              <AnimatePresence mode="wait">
                {selectedZone && (
                  <motion.div
                    key={selectedZone.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border border-zinc-800 bg-zinc-950/60 p-4 rounded-2xl space-y-3"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-900/60">
                      <span className="text-xs font-bold text-white">{selectedZone.name} Details</span>
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${selectedZone.color === 'red' ? 'bg-red-500/10 text-red-550 border border-red-500/20' :
                        selectedZone.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20'
                        }`}>
                        {selectedZone.crowdLevel}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <AnimatedProgressBar value={selectedZone.occupancy} label="Stand Density Capacity" theme={selectedZone.color === 'red' ? 'red' : selectedZone.color === 'yellow' ? 'yellow' : 'emerald'} />

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-zinc-500 font-mono pt-1">
                        <div>
                          <span>RISK: </span>
                          <span className={`font-bold ${selectedZone.color === 'red' ? 'text-red-500' : 'text-zinc-350'}`}>{selectedZone.riskLevel}</span>
                        </div>
                        <div className="justify-self-end">
                          <span>INCIDENTS: </span>
                          <span className="text-zinc-350">{selectedZone.incidents} active</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-zinc-400 bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-900 leading-relaxed">
                        <span className="font-bold text-zinc-350">Status: </span>
                        {selectedZone.status}
                      </div>

                      <div className="text-[10px] text-emerald-400 bg-emerald-500/[0.02] p-2.5 rounded-lg border border-emerald-500/15 leading-relaxed font-bold">
                        <span className="font-bold text-emerald-500 uppercase tracking-widest text-[8px] block mb-0.5 font-mono">Directive recommendation</span>
                        {selectedZone.recommendation}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ErrorBoundary>
          </div>
        </div>
      </div>

      {/* Grid Section 3: Stadium Zones Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Smartphone className="h-4.5 w-4.5 text-zinc-400" />
            <span>Stadium Sectors & Facilities Directory</span>
          </h3>
          <span className="text-[9px] uppercase tracking-wider text-zinc-550 font-bold font-mono">Interactive Cards</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {zones.map((zone) => (
            <ZoneCard
              key={zone.name}
              name={zone.name}
              crowdLevel={zone.crowdLevel}
              riskLevel={zone.riskLevel}
              status={zone.status}
              color={zone.color}
              isSelected={selectedZone?.name === zone.name}
              onClick={() => setSelectedZone(zone)}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
