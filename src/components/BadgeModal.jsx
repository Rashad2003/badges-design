import React, { useEffect, useState } from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';

const BadgeModal = ({ isOpen, onClose, badge }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;
    if (!badge) return null;

    const { type, title, xp, top, icon: Icon } = badge;

    const getGradient = () => {
        if (type === 'bronze') return 'var(--bronze-gradient)';
        if (type === 'silver') return 'var(--silver-gradient)';
        if (type === 'gold') return 'var(--gold-gradient)';
        return 'none';
    };

    const shieldColor = type === 'silver' ? '#334155' : type === 'gold' ? '#78350f' : '#fff';
    const starCount = type === 'bronze' ? 1 : type === 'silver' ? 2 : 3;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
            <div
                className={`relative w-[90%] max-w-[400px] bg-slate-900 border border-white/10 rounded-2xl p-8 text-center shadow-2xl transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        <div
                            className="w-[80px] h-[90px] flex items-center justify-center text-4xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] relative z-10"
                            style={{
                                background: getGradient(),
                                clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
                                color: shieldColor
                            }}
                        >
                            {Icon && <Icon />}
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
                    <div className="flex gap-1 text-amber-400 text-sm mb-4">
                        {Array(starCount).fill(0).map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-slate-400">Total XP</div>
                        <div className="text-xl font-bold text-white">{xp}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-slate-400">Top %</div>
                        <div className="text-xl font-bold text-[var(--color-accent)]">{top}</div>
                    </div>
                </div>

                <div className="text-slate-400 text-sm leading-relaxed">
                    You have mastered the fundamentals of {title}. Keep practicing to maintain your streak and earn higher tier badges!
                </div>
            </div>
        </div>
    );
};

export default BadgeModal;
