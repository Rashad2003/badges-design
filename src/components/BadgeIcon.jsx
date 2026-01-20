import React from 'react';
import { FaCrown, FaStar } from 'react-icons/fa';
import { FaDiamond } from "react-icons/fa6";

const BadgeIcon = ({ badge, className = "" }) => {
    const { title, type, icon: Icon } = badge || {};

    // Default values if badge is missing properties
    const safeType = type || 'gold';
    const safeTitle = title || 'Badge';
    const SafeIcon = Icon || FaCrown;

    const getBadgeColor = (type) => {
        switch (type) {
            case 'bronze': return '#b45309';
            case 'silver': return '#cbd5e1';
            case 'gold':
            default: return '#D4AF37';
        }
    };

    const getStarCount = (type) => {
        switch (type) {
            case 'bronze': return 1;
            case 'silver': return 2;
            case 'gold':
            default: return 3;
        }
    };

    return (
        <div className={`relative w-[150px] h-[150px] flex items-center justify-center ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.4)_0%,transparent_70%)] animate-pulse-custom" />
            <div className="relative w-[120px] h-[120px] flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110">
                {/* Shield Background */}
                <FaDiamond
                    className="w-full h-full absolute inset-0 drop-shadow-lg"
                    style={{ color: getBadgeColor(safeType) }}
                />
                {/* Inner Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center pt-1" style={{ color: '#78350f' }}>
                    <SafeIcon className="text-2xl mb-1" />
                    <span className="text-xs font-bold uppercase tracking-wider mb-0.5 max-w-[80px] text-center leading-tight">{safeTitle}</span>
                    <div className="flex gap-0.5">
                        {[...Array(getStarCount(safeType))].map((_, i) => (
                            <FaStar key={i} className="text-[8px]" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgeIcon;
