import React from 'react';

export const ElbowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 19l-3-3 3-3"></path>
        <path d="M7 22V6.5A4.5 4.5 0 0 1 11.5 2H14"></path>
        <path d="M18 2h4v4"></path>
    </svg>
);
