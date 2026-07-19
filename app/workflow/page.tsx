'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Terminal,
    Send,
    Loader2,
    ArrowDown,
    Compass,
    Users,
    ShieldAlert,
    Accessibility,
    Sparkles,
    ArrowDownCircle
} from 'lucide-react';
import PageContainer from '@/components/common/page-container';
import SectionHeader from '@/components/common/section-header';
import StatusBadge from '@/components/common/status-badge';
import { callOrchestrator, OrchestratorResponse } from '@/lib/api';

export default function WorkflowPage() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [orchestratorResult, setOrchestratorResult] = useState<OrchestratorResponse | null>(null);

    // Pipeline track steps: 
    // 0: idle, 1: orchestrating, 2: sub_agents_running, 3: decision_running, 4: complete
    const [currentStep, setCurrentStep] = useState(0);

    const handleRunWorkflow = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setOrchestratorResult(null);
        setCurrentStep(1); // Orchestration start

        try {
            // Step 1: Query Orchestrator
            const response = await callOrchestrator(query);

            // Simulate delay for visualization flow
            await new Promise((resolve) => setTimeout(resolve, 800));
            setCurrentStep(2); // Activates agents
            setOrchestratorResult(response);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            setCurrentStep(3); // Decision Agent

            await new Promise((resolve) => setTimeout(resolve, 800));
            setCurrentStep(4); // Finished
        } catch (err) {
            console.error(err);
            setCurrentStep(0);
        } finally {
            setLoading(false);
        }
    };

    const getAgentIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'navigation': return Compass;
            case 'crowd': return Users;
            case 'emergency': return ShieldAlert;
            case 'accessibility': return Accessibility;
            default: return Sparkles;
        }
    };

    const availableAgents = ['navigation', 'crowd', 'emergency', 'accessibility'];

    return (
        <PageContainer>
            <SectionHeader
                title="AI Operational Workflow"
                description="Real-time multi-agent execution pipeline trace showing intent detection, routing paths, and Decision Agent final aggregation."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Playback Query Controller */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-md space-y-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Terminal className="h-4.5 w-4.5 text-blue-400" />
                            <span>Pipeline Controller</span>
                        </h3>
                        <p className="text-xs text-zinc-450 leading-relaxed">
                            Submit an enquiry to see how the multi-agent AI system manages parameters, filters prompts, runs parallel queries, and converges on operational commands.
                        </p>

                        <form onSubmit={handleRunWorkflow} className="space-y-3">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g. Someone is feeling sick near Block 102. Is there a wheelchair path to the medic?"
                                className="w-full min-h-[90px] rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-xs text-white placeholder-zinc-600 outline-none focus:border-blue-500 transition-all resize-none"
                            />
                            <button
                                type="submit"
                                disabled={loading || !query.trim()}
                                className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all disabled:opacity-50 active:scale-95 duration-200"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Processing Pipeline...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Trigger Pipeline</span>
                                        <Send className="h-3 w-3" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Workflow Visualizer Canvas */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/10 p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
                        {/* Glow indicators */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

                        <div className="flex flex-col items-center space-y-6">

                            {/* Step 1: User Query Node */}
                            <motion.div
                                animate={{
                                    borderColor: currentStep >= 1 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(39, 39, 42, 0.8)',
                                    background: currentStep >= 1 ? 'rgba(59, 130, 246, 0.03)' : 'rgba(24, 24, 27, 0.4)'
                                }}
                                className="w-full max-w-lg rounded-2xl border p-4 text-center transition-all duration-300"
                            >
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono mb-1">
                                    1. Query Payload
                                </span>
                                <p className="text-xs text-white italic">
                                    {query ? `"${query}"` : "Waiting for operational instructions input..."}
                                </p>
                            </motion.div>

                            {/* Connecting Arrow */}
                            <div className="flex flex-col items-center">
                                <ArrowDown className={`h-5 w-5 transition-colors duration-300 ${currentStep >= 1 ? 'text-blue-500 animate-bounce' : 'text-zinc-800'}`} />
                            </div>

                            {/* Step 2: Orchestrator Node */}
                            <motion.div
                                animate={{
                                    borderColor: currentStep >= 1 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(39, 39, 42, 0.8)',
                                    background: currentStep >= 1 ? 'rgba(59, 130, 246, 0.05)' : 'rgba(24, 24, 27, 0.4)'
                                }}
                                className="w-full max-w-lg rounded-2xl border p-5 transition-all duration-300 space-y-3"
                            >
                                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">
                                        2. AI Orchestrator Agent
                                    </span>
                                    {currentStep === 1 && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                                            <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                                            Classifying query...
                                        </span>
                                    )}
                                    {currentStep > 1 && (
                                        <StatusBadge status="info" label={`INTENT: ${orchestratorResult?.intent?.toUpperCase()}`} />
                                    )}
                                </div>

                                <p className="text-xs text-zinc-405 leading-relaxed">
                                    {currentStep > 1
                                        ? orchestratorResult?.message
                                        : "Processes query semantically using Google Gemini to classify intent and select target sub-agents (minimizes model call volume)."
                                    }
                                </p>
                            </motion.div>

                            {/* Connecting Arrow */}
                            <div className="flex flex-col items-center">
                                <ArrowDown className={`h-5 w-5 transition-colors duration-300 ${currentStep >= 2 ? 'text-blue-500 animate-bounce' : 'text-zinc-800'}`} />
                            </div>

                            {/* Step 3: Sub-Agents Node Grid */}
                            <div className="w-full space-y-2">
                                <div className="text-center">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                                        3. Activated Specialized Sub-Agents
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                                    {availableAgents.map((agt) => {
                                        const isActivated = orchestratorResult?.selected_agents.includes(agt) && currentStep >= 2;
                                        const isRunning = currentStep === 2 && isActivated;
                                        const Icon = getAgentIcon(agt);
                                        const subResponse = orchestratorResult?.sub_agent_responses?.find(
                                            (r) => r.agent?.toLowerCase() === agt
                                        );

                                        return (
                                            <motion.div
                                                key={agt}
                                                animate={{
                                                    borderColor: isActivated ? 'rgba(59, 130, 246, 0.4)' : 'rgba(39, 39, 42, 0.5)',
                                                    opacity: currentStep < 2 ? 0.5 : isActivated ? 1 : 0.35,
                                                    background: isActivated ? 'rgba(59, 130, 246, 0.02)' : 'rgba(9, 9, 11, 0.2)'
                                                }}
                                                className="rounded-xl border p-3.5 flex flex-col items-center text-center space-y-2 transition-all duration-300"
                                            >
                                                <div className={`p-2 rounded-lg ${isActivated ? 'bg-blue-500/10 text-blue-400' : 'bg-zinc-900 text-zinc-600'}`}>
                                                    <Icon className={`h-4.5 w-4.5 ${isRunning ? 'animate-pulse' : ''}`} />
                                                </div>
                                                <span className="text-xs font-bold text-white capitalize">{agt}</span>

                                                {isRunning && (
                                                    <div className="flex items-center justify-center gap-1 mt-1 text-[9px] font-bold text-zinc-400">
                                                        <Loader2 className="h-2.5 w-2.5 animate-spin text-blue-500" />
                                                        Executing...
                                                    </div>
                                                )}

                                                {currentStep >= 3 && isActivated && subResponse && (
                                                    <div className="w-full text-[9px] text-left text-zinc-450 bg-zinc-950/60 rounded p-1.5 font-mono overflow-hidden truncate">
                                                        {Object.entries(subResponse.data || {}).slice(0, 2).map(([k, v]) => (
                                                            <div key={k} className="truncate">
                                                                <span className="text-zinc-550">{k}:</span> {String(v)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Connecting Arrow */}
                            <div className="flex flex-col items-center">
                                <ArrowDown className={`h-5 w-5 transition-colors duration-300 ${currentStep >= 3 ? 'text-blue-500 animate-bounce' : 'text-zinc-800'}`} />
                            </div>

                            {/* Step 4: Decision Agent Node */}
                            <motion.div
                                animate={{
                                    borderColor: currentStep >= 3 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(39, 39, 42, 0.8)',
                                    background: currentStep >= 3 ? 'rgba(16, 185, 129, 0.02)' : 'rgba(24, 24, 27, 0.4)'
                                }}
                                className="w-full max-w-lg rounded-2xl border p-5 transition-all duration-300 space-y-3"
                            >
                                <div className="flex items-center justify-between border-b border-zinc-805 pb-2">
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                                        4. Decision Agent reasoning
                                    </span>
                                    {currentStep === 3 && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                                            <Loader2 className="h-3 w-3 animate-spin text-emerald-500" />
                                            Evaluating telemetry...
                                        </span>
                                    )}
                                    {currentStep > 3 && orchestratorResult?.decision && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-zinc-405 font-mono">
                                                CONFIDENCE: {orchestratorResult.decision.confidence}%
                                            </span>
                                            <StatusBadge
                                                status={orchestratorResult.decision.priority === 'High' ? 'danger' : 'success'}
                                                label={`${orchestratorResult.decision.priority} PRIORITY`}
                                            />
                                        </div>
                                    )}
                                </div>

                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    {currentStep > 3 && orchestratorResult?.decision
                                        ? orchestratorResult.decision.summary
                                        : "The Decision Agent consolidates the JSON payloads returned by all active specialized agents and writes one final structured result."
                                    }
                                </p>
                            </motion.div>

                            {/* Connecting Arrow */}
                            <div className="flex flex-col items-center">
                                <ArrowDown className={`h-5 w-5 transition-colors duration-300 ${currentStep >= 4 ? 'text-emerald-500 animate-pulse' : 'text-zinc-800'}`} />
                            </div>

                            {/* Step 5: Final Recommendation Output */}
                            <motion.div
                                animate={{
                                    borderColor: currentStep >= 4 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(39, 39, 42, 0.8)',
                                    background: currentStep >= 4 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(24, 24, 27, 0.4)'
                                }}
                                className="w-full max-w-lg rounded-2xl border p-5 text-center transition-all duration-300 space-y-2 bg-gradient-to-r from-emerald-500/[0.03] to-teal-500/[0.03]"
                            >
                                <div className="flex items-center justify-center gap-1.5 text-emerald-450">
                                    <ArrowDownCircle className="h-4.5 w-4.5 animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                                        5. Unified Operational Command
                                    </span>
                                </div>

                                <h4 className="text-sm font-bold text-white mt-2 leading-relaxed">
                                    {currentStep >= 4 && orchestratorResult?.decision
                                        ? orchestratorResult.decision.recommendation
                                        : "Awaiting pipeline activation and execution..."
                                    }
                                </h4>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
