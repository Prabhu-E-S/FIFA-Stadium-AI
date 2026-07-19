'use client';

import React, { Component, ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';

interface Props {
    children?: ReactNode;
    fallbackTitle?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch() {
        // Isolated log tracing can go here in standard setup
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.02] p-6 backdrop-blur-md space-y-4">
                    <div className="flex items-center gap-2 text-red-500">
                        <ShieldAlert className="h-5 w-5" />
                        <h5 className="text-xs font-bold uppercase tracking-wider">{this.props.fallbackTitle || 'Rendering Error'}</h5>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        An isolated UI component exception was caught. Command center operations continue as nominal.
                    </p>
                    {this.state.error && (
                        <pre className="text-[10px] text-red-350 bg-zinc-950/80 p-3 rounded-lg border border-zinc-905 overflow-x-auto font-mono">
                            {this.state.error.message}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
