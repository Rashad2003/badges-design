import React from 'react';
import { FaPython, FaJs, FaReact, FaStar } from 'react-icons/fa';
import { IoShieldSharp } from "react-icons/io5";

const BadgeCard = ({ type, icon: Icon, title, tier }) => {
    const getGradient = () => {
        if (type === 'bronze') return 'var(--bronze-gradient)';
        if (type === 'silver') return 'var(--silver-gradient)';
        if (type === 'gold') return 'var(--gold-gradient)';
        return 'none';
    };

    const shieldColor = type === 'silver' ? '#334155' : type === 'gold' ? '#78350f' : '#fff';
    const starCount = type === 'bronze' ? 1 : type === 'silver' ? 2 : 3;
    const stars = Array(starCount).fill(0);

    return (
        <div className={`
      relative overflow-hidden rounded-[20px] p-8 text-center transition-all duration-300
      bg-[var(--color-bg-card)] border border-[rgba(255,255,255,0.1)]
      hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]
      ${type === 'bronze' ? 'group/bronze' : ''}
      ${type === 'silver' ? 'group/silver' : ''}
      ${type === 'gold' ? 'group/gold' : ''}
    `}>
            <div className="flex flex-col items-center justify-center mb-6 h-[120px] relative">
                {/* Glare effect for gold */}
                {type === 'gold' && (
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-spin-slow pointer-events-none" />
                )}

                <div className="relative w-[70px] h-[80px] flex items-center justify-center z-10 mb-2 transition-transform duration-300 hover:scale-110">
                    <IoShieldSharp className={`w-full h-full absolute inset-0 drop-shadow-md ${type === 'bronze' ? 'text-amber-700' :
                        type === 'silver' ? 'text-slate-300' :
                            'text-yellow-400'
                        }`} />
                    <div className="relative z-10 text-3xl" style={{ color: shieldColor }}>
                        <Icon />
                    </div>
                </div>

                <div className="flex gap-1 text-xs text-slate-400">
                    {stars.map((_, i) => (
                        <FaStar key={i} className={type !== 'bronze' ? 'text-amber-400' : ''} />
                    ))}
                </div>
            </div>

            <div className="badge-info">
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <span className={`text-xs font-semibold uppercase tracking-widest opacity-70
          ${type === 'bronze' ? 'text-orange-400' : ''}
          ${type === 'silver' ? 'text-slate-300' : ''}
          ${type === 'gold' ? 'text-amber-400' : ''}
        `}>
                    {tier}
                </span>
            </div>
        </div>
    );
};

export default BadgeCard;
