import React, { useState, useEffect } from 'react';
import { FaFire, FaCheck } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const StreakModal = ({ isOpen, onClose, streakCount = 12 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Fire confetti for celebration
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);

        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const days = [
        { name: 'M', completed: true },
        { name: 'T', completed: true },
        { name: 'W', completed: true },
        { name: 'T', completed: true },
        { name: 'F', completed: true },
        { name: 'S', completed: true }, // Today
        { name: 'S', completed: false }, // Tomorrow
    ];

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`relative w-[90%] max-w-[400px] bg-[#0f172a] border border-white/5 rounded-[30px] p-8 text-center shadow-2xl overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'scale-100' : 'scale-80'}`}>

                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-orange-500/20 blur-[80px] pointer-events-none" />

                <div className="relative z-10">

                    {/* Fire Icon Main */}
                    <div className="mb-4 flex justify-center">
                        <div className="relative">
                            <FaFire className="text-[120px] text-orange-500 drop-shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-pulse-custom" />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-black text-4xl drop-shadow-lg">
                                {streakCount}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-2 text-white">Day Streak</h2>
                    <p className="text-slate-400 mb-8 text-sm">Congratulations on reaching a streak milestone!</p>

                    {/* Weekly Progress */}
                    <div className="flex justify-between mb-8 px-2">
                        {days.map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <span className="text-xs font-bold text-slate-500">{day.name}</span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border ${day.completed ? 'bg-orange-500 border-orange-500 text-white' : 'bg-transparent border-slate-700 text-slate-700'}`}>
                                    {day.completed && <FaCheck />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onClose}
                        className="w-full bg-[#38bdf8] text-slate-900 font-bold py-4 rounded-xl text-lg hover:bg-[#0ea5e9] transition-colors cursor-pointer mb-4"
                    >
                        Continue
                    </button>

                    <button className="text-[#38bdf8] text-sm font-semibold hover:text-white transition-colors cursor-pointer">
                        Share
                    </button>

                </div>
            </div>
        </div>
    );
};

export default StreakModal;
