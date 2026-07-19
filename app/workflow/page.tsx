'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Terminal,
    Send,
    Loader2,
    Compass,
    Users,
    ShieldAlert,
    Accessibility,
    Sparkles,
    ArrowDownCircle,
    HelpCircle,
    Cpu,
    Fingerprint,
    Layers,
    PlayCircle,
    CheckCircle2
} from 'lucide-react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import StatusBadge from '@/components/common/status-badge';
import { callOrchestrator, OrchestratorResponse } from '@/lib/api';

interface StepDetail {
    id: number;
    label: string;
    subLabel: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

export default function WorkflowPage() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [orchestratorResult, setOrchestratorResult] = useState<OrchestratorResponse | null>(null);

    // Pipeline track steps:
    // 0: User Query, 1: Orchestrator, 2: Intent Detection, 3: Agent Selection, 4: Agent Execution, 5: Decision Agent, 6: Final Recommendation
    const [activeStep, setActiveStep] = useState<number>(-1);

    const stepsList: StepDetail[] = [
        {
            id: 0,
            label: 'User Query',
            subLabel: 'Input Payload ingestion',
            description: 'Accepts raw enquirer query context from commander panel.',
            icon: HelpCircle
        },
        {
            id: 1,
            label: 'Orchestrator Ingest',
            subLabel: 'Tokenization & Parsing',
            description: 'Checks context and dynamically prepares dynamic markdown prompts template.',
            icon: Cpu
        },
        {
            id: 2,
            label: 'Intent Detection',
            subLabel: 'Semantic Classification',
            description: 'Uses Gemini to classify query intent (e.g. navigation, crowd, emergency).',
            icon: Fingerprint
        },
        {
            id: 3,
            label: 'Agent Selection',
            subLabel: 'Target Routing List',
            description: 'Maps intent category list onto specific specialized sub-agents.',
            icon: Layers
        },
        {
            id: 4,
            label: 'Agent Execution',
            subLabel: 'Sub-Agent Reasoning',
            description: 'Invokes target agents concurrently, parsing specialized JSON metadata.',
            icon: PlayCircle
        },
        {
            id: 5,
            label: 'Decision Agent',
            subLabel: 'Consolidation & Reconcilation',
            description: 'Decision Agent combines all agent logs into unified recommendation.',
            icon: Sparkles
        },
        {
            id: 6,
            label: 'Final Command Recommendation',
            subLabel: 'Operational Directive',
            description: 'Generates structured JSON decision for commanders.',
            icon: ArrowDownCircle
        }
    ];

    const handleRunWorkflow = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setOrchestratorResult(null);

        // Step-by-step playback sequence:
        setActiveStep(0);

        try {
            // Begin fetching actual API info in parallel with visualization
            const responsePromise = callOrchestrator(query);

            // Node 0 -> Node 1
            await new Promise(resolve => setTimeout(resolve, 800));
            setActiveStep(1);

            // Node 1 -> Node 2
            await new Promise(resolve => setTimeout(resolve, 800));
            setActiveStep(2);

            // Node 2 -> Node 3
            await new Promise(resolve => setTimeout(resolve, 800));
            setActiveStep(3);

            const response = await responsePromise;
            setOrchestratorResult(response);

            // Node 3 -> Node 4
            await new Promise(resolve => setTimeout(resolve, 900));
            setActiveStep(4);

            // Node 4 -> Node 5
            await new Promise(resolve => setTimeout(resolve, 900));
            setActiveStep(5);

            // Node 5 -> Node 6
            await new Promise(resolve => setTimeout(resolve, 800));
            setActiveStep(6);
        } catch (err) {
            console.error(err);
            setActiveStep(-1);
        } finally {
            setLoading(false);
        }
    };

    const getSubAgentIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'navigation': return Compass;
            case 'crowd': return Users;
            case 'emergency': return ShieldAlert;
            case 'accessibility': return Accessibility;
            default: return Sparkles;
        }
    };

    return (
        <PageContainer>
            <SectionHeader
                title="Interactive AI Workflow Trace"
                description="Chronological step-by-step visual tracker mapping query ingestion, Orchestrator intent routing, and Decision Agent generation."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Control Panel */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-md space-y-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Terminal className="h-4.5 w-4.5 text-blue-400" />
                            <span>Trace Pipeline Controller</span>
                        </h3>

                        <p className="text-xs text-zinc-450 leading-relaxed font-semibold">
                            Enter stadium query parameters to run and animate every node of the multi-agent decision path.
                        </p>

                        <form onSubmit={handleRunWorkflow} className="space-y-3">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g. Someone fell near Sector 4. Is the medical team dispatched? Check crowd blocks."
                                className="w-full min-h-[90px] rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-xs text-white placeholder-zinc-650 outline-none focus:border-blue-500 transition-all resize-none"
                            />
                            <button
                                type="submit"
                                disabled={loading || !query.trim()}
                                className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all disabled:opacity-50 active:scale-95 duration-200 select-none"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Executing stages...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Run Animated Flow</span>
                                        <Send className="h-3 w-3" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Animated Flow Canvas */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-blue-500/[0.03] blur-[120px] pointer-events-none" />

                        <div className="flex flex-col items-center space-y-4">
                            {stepsList.map((step, idx) => {
                                const isActive = activeStep === step.id;
                                const isCompleted = activeStep > step.id;
                                const Icon = step.icon;

                                return (
                                    <React.Fragment key={step.id}>
                                        {/* Connection Line */}
                                        {idx > 0 && (
                                            <div className="h-8 w-[2px] relative">
                                                <div className="absolute inset-0 bg-zinc-800" />
                                                {isCompleted && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: '100%' }}
                                                        transition={{ duration: 0.4 }}
                                                        className="absolute inset-0 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {/* Step Card Container */}
                                        <motion.div
                                            animate={{
                                                scale: isActive ? 1.02 : 1,
                                                borderColor: isActive ? 'rgba(59, 130, 246, 0.6)' : isCompleted ? 'rgba(16, 185, 129, 0.4)' : 'rgba(39, 39, 42, 0.6)',
                                                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.05)' : isCompleted ? 'rgba(16, 185, 129, 0.02)' : 'rgba(24, 24, 27, 0.4)'
                                            }}
                                            className="w-full max-w-lg rounded-2xl border p-4.5 flex gap-4 transition-all duration-300 relative overflow-hidden"
                                        >
                                            <div className={`p-2.5 rounded-xl border shrink-0 flex items-center justify-center h-11 w-11 ${isActive ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                                                isCompleted ? 'text-emerald-450 bg-emerald-500/10 border-emerald-500/30' :
                                                    'text-zinc-650 bg-zinc-950/45 border-zinc-850'
                                                }`}>
                                                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                            </div>

                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-white tracking-tight">{step.label}</span>
                                                    <span className="text-[9px] font-bold font-mono text-zinc-550 uppercase tracking-widest">{step.subLabel}</span>
                                                </div>
                                                <p className="text-[11px] text-zinc-450 leading-relaxed font-semibold">{step.description}</p>

                                                {/* Stage Details Overlay */}
                                                {isActive && step.id === 0 && (
                                                    <div className="mt-2 text-[10px] text-zinc-350 italic font-mono bg-zinc-950/80 p-2 rounded-lg border border-zinc-900 leading-snug">
                                                        Query: {"\""}{query}{"\""}
                                                    </div>
                                                )}

                                                {isActive && step.id === 2 && orchestratorResult && (
                                                    <div className="mt-2 text-[10px] text-blue-400 font-bold font-mono bg-blue-500/5 p-2 rounded-lg border border-blue-500/20">
                                                        Intent Category: {orchestratorResult.intent.toUpperCase()}
                                                    </div>
                                                )}

                                                {isActive && step.id === 3 && orchestratorResult && (
                                                    <div className="mt-2 flex flex-wrap gap-1.5 pt-1">
                                                        {orchestratorResult.selected_agents.map((agent) => (
                                                            <span key={agent} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-blue-450 font-bold capitalize">
                                                                {agent} agent selected
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {isActive && step.id === 4 && orchestratorResult && (
                                                    <div className="mt-2 space-y-2">
                                                        {orchestratorResult.sub_agent_responses?.map((agt) => {
                                                            const AgtIcon = getSubAgentIcon(agt.agent);
                                                            return (
                                                                <div key={agt.agent} className="flex items-center justify-between bg-zinc-950/80 p-2 rounded-lg border border-zinc-900 text-[10px] font-mono">
                                                                    <div className="flex items-center gap-1.5 text-zinc-350 capitalize font-bold">
                                                                        <AgtIcon className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                                                                        <span>{agt.agent} Agent</span>
                                                                    </div>
                                                                    <StatusBadge status={agt.status} label={agt.status.toUpperCase()} />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                {isActive && step.id === 5 && orchestratorResult?.decision && (
                                                    <div className="mt-2 text-[10px] text-zinc-400 leading-relaxed bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-900 font-mono">
                                                        <span className="font-bold text-zinc-350">Consolidated reasoning:</span> {orchestratorResult.decision.summary}
                                                    </div>
                                                )}

                                                {isActive && step.id === 6 && orchestratorResult?.decision && (
                                                    <div className="mt-2 text-[10px] text-emerald-400 leading-relaxed bg-emerald-500/[0.02] p-2.5 rounded-lg border border-emerald-500/15 font-bold">
                                                        <span className="font-bold text-emerald-500 block mb-0.5 uppercase tracking-widest text-[8px] font-mono">Decision recommendation</span>
                                                        {orchestratorResult.decision.recommendation}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
