import React, { useState } from 'react'
import { FaCrown, FaStar } from 'react-icons/fa';
import { FaDiamond } from "react-icons/fa6";

const defaultBadge = {
    title: "System Architect",
    icon: FaCrown,
    type: 'gold',
    xp: 500,
    top: '5%'
};

export const Modal = () => {
    const [badgeTitle, setBadgeTitle] = useState("React");
    const [badgeType, setBadgeType] = useState("gold");

    const getBadgeColor = (type) => {
        switch (type) {
            case 'bronze': return '#b45309';
            case 'silver': return '#cbd5e1';
            case 'gold':
            default: return '#facc15';
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
        <div className="flex flex-col items-center justify-center p-8">
            {/* Controls */}
            <div className="mb-8 flex gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-600">Badge Title</label>
                    <input
                        type="text"
                        value={badgeTitle}
                        onChange={(e) => setBadgeTitle(e.target.value)}
                        className="px-2 py-1 border rounded text-sm"
                        placeholder="Enter title"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-600">Badge Type</label>
                    <select
                        value={badgeType}
                        onChange={(e) => setBadgeType(e.target.value)}
                        className="px-2 py-1 border rounded text-sm"
                    >
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                        <option value="bronze">Bronze</option>
                    </select>
                </div>
            </div>

            {/* Modal/Badge */}
            <div className="relative w-[150px] h-[150px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.4)_0%,transparent_70%)] animate-pulse-custom" />
                <div className="relative w-[100px] h-[115px] flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110">
                    {/* Shield Background */}
                    <FaDiamond
                        className="w-full h-full absolute inset-0 drop-shadow-lg"
                        style={{ color: getBadgeColor(badgeType) }}
                    />
                    {/* Inner Icon */}
                    <div className="relative z-10 flex flex-col items-center justify-center pt-1" style={{ color: '#78350f' }}>
                        <FaCrown className="text-2xl mb-1" />
                        <span className="text-xs font-bold uppercase tracking-wider mb-0.5">{badgeTitle}</span>
                        <div className="flex gap-0.5">
                            {[...Array(getStarCount(badgeType))].map((_, i) => (
                                <FaStar key={i} className="text-[8px]" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}