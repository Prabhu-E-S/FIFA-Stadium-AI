'use client';

import React from 'react';
import PriorityBadge from './priority-badge';
import StatusBadge from '../common/status-badge';

export interface Incident {
    id: string;
    title: string;
    priority: string;
    assignedAgent: string;
    status: 'active' | 'resolved' | string;
    location: string;
}

interface IncidentTableProps {
    incidents: Incident[];
    onDispatch?: (id: string) => void;
}

export default function IncidentTable({ incidents, onDispatch }: IncidentTableProps) {
    return (
        <div className="overflow-x-auto w-full -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border border-zinc-850 rounded-2xl bg-zinc-950/20">
                    <table className="min-w-full divide-y divide-zinc-850 text-left text-xs text-zinc-300">
                        <thead className="bg-zinc-900/40 text-zinc-500 font-bold font-mono text-[9px] uppercase tracking-wider">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6">INCIDENT</th>
                                <th scope="col" className="px-3 py-3.5">LOCATION</th>
                                <th scope="col" className="px-3 py-3.5">PRIORITY</th>
                                <th scope="col" className="px-3 py-3.5">ROUTING TARGET</th>
                                <th scope="col" className="px-3 py-3.5">STATUS</th>
                                {onDispatch && <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/60 bg-transparent font-medium">
                            {incidents.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center text-zinc-450 italic">
                                        No active operations incidents reported.
                                    </td>
                                </tr>
                            ) : (
                                incidents.map((incident) => (
                                    <tr key={incident.id} className="hover:bg-zinc-900/10 transition-colors">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 font-bold text-white sm:pl-6">
                                            {incident.title}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-zinc-450">
                                            {incident.location}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            <PriorityBadge priority={incident.priority} />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-blue-400 font-semibold capitalize font-mono text-[10px]">
                                            {incident.assignedAgent} Agent
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            <StatusBadge status={incident.status === 'resolved' ? 'success' : 'danger'} label={incident.status.toUpperCase()} />
                                        </td>
                                        {onDispatch && (
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xs font-bold sm:pr-6">
                                                {incident.status === 'active' && (
                                                    <button
                                                        onClick={() => onDispatch(incident.id)}
                                                        className="text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                                                    >
                                                        Dispatch Team
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
