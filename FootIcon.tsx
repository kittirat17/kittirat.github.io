import React from 'react';

export const FootIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.63 20.25a3.5 3.5 0 0 0 5.25 1.5H12a2 2 0 0 1 2 2.25c0 1.5-2 2.25-2 2.25h-1.5"></path>
        <path d="M12.5 13.5a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-6z"></path>
        <path d="M15.5 11.5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1z"></path>
        <path d="M18.5 9.5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1z"></path>
        <path d="M12 11.5V17"></path>
    </svg>
);
