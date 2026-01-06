import React, { useEffect, useState } from 'react';
import { FaCrown, FaTimes, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import confetti from 'canvas-confetti';

const CongratsModal = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Trigger confetti shower
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
                zIndex: 100
            };

            function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        } else {
            setTimeout(() => setIsVisible(false), 300); // Animation delay
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`relative w-[90%] max-w-[500px] bg-slate-800 border border-white/10 rounded-3xl p-12 text-center shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'scale-100' : 'scale-80'}`}>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-slate-400 text-3xl hover:text-white transition-colors cursor-pointer"
                >
                    &times;
                </button>

                {/* Badge Visual */}
                <div className="relative w-[150px] h-[150px] mx-auto mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.4)_0%,transparent_70%)] animate-pulse-custom" />
                    <div
                        className="w-[100px] h-[115px] flex items-center justify-center text-5xl text-[#78350f] relative z-10"
                        style={{
                            background: 'var(--gold-gradient)',
                            clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
                        }}
                    >
                        <FaCrown />
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Congrats!</h2>
                    <p className="text-lg text-slate-300">You've officially earned the <strong className="text-amber-400">System Architect</strong> badge.</p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold">+500 XP</span>
                    <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold">Top 5%</span>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <button className="bg-[var(--color-accent)] text-slate-900 border-none px-8 py-3 rounded-full font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)]">
                        Add to Profile
                    </button>

                    <div className="flex gap-6 text-2xl text-slate-400">
                        <FaFacebook className="cursor-pointer hover:text-blue-500 transition-colors" />
                        <FaXTwitter className="cursor-pointer hover:text-white transition-colors" />
                        <FaLinkedin className="cursor-pointer hover:text-blue-600 transition-colors" />
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CongratsModal;
