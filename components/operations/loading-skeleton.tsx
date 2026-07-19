'use client';

import React from 'react';

interface LoadingSkeletonProps {
    className?: string;
    rows?: number;
}

export default function LoadingSkeleton({ className = '', rows = 1 }: LoadingSkeletonProps) {
    return (
        <div className={`space-y-2 w-full ${className}`}>
            {Array.from({ length: rows }).map((_, idx) => (
                <div key={idx} className="h-4 bg-zinc-800/60 rounded animate-pulse w-full" />
            ))}
        </div>
    );
}
