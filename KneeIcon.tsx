import React from 'react';

export const KneeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 10V4a2 2 0 0 0-2-2h-2"></path>
        <path d="m15 10-4.5 4.5a2.04 2.04 0 0 1-2.83 0L3 10"></path>
        <path d="M7 10h3a2 2 0 0 1 2 2v10"></path>
    </svg>
);
