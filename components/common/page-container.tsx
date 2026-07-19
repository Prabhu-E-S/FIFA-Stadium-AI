'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`flex-1 overflow-y-auto px-6 py-8 md:px-8 w-full max-w-7xl mx-auto space-y-8 ${className}`}
        >
            {children}
        </motion.main>
    );
}
