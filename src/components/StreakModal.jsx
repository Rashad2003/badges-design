import React, { useState, useEffect, useRef } from 'react';
import { FaFire, FaCheck, FaFacebook, FaLinkedin, FaDownload, FaTimes } from 'react-icons/fa';
import { FaXTwitter, FaShareNodes } from 'react-icons/fa6';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

const StreakModal = ({ isOpen, onClose, streakCount = 100 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const modalRef = useRef(null);

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

    const captureAndDownload = async () => {
        if (!modalRef.current) return;
        try {
            const canvas = await html2canvas(modalRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#002147', // Explicit HEX for background
                ignoreElements: (element) => element.classList.contains('data-[html2canvas-ignore]'),
                onclone: (clonedDoc) => {
                    const clonedModal = clonedDoc.querySelector('[data-capture-target]');
                    if (clonedModal) {
                        // Force styles for the capture
                        clonedModal.style.backgroundColor = '#002147';
                        clonedModal.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        clonedModal.style.color = '#ffffff';

                        // Fix text colors
                        const titleEl = clonedModal.querySelector('h2');
                        if (titleEl) titleEl.style.color = '#ffffff';

                        // Ensure streak count text is visible/colored correctly
                        const streakNum = clonedModal.querySelector('.streak-number');
                        if (streakNum) streakNum.style.color = '#ffffff';

                        // Fix Fire Icon (orange-500)
                        // SVG paths often inherit color, but we can try setting color on the wrapper or SVG itself
                        const orangeIcons = clonedModal.querySelectorAll('.text-orange-500');
                        orangeIcons.forEach(el => {
                            el.style.color = '#f97316'; // HEX for orange-500
                        });

                        // Fix Progress Pills (bg-orange-500)
                        const orangeBgs = clonedModal.querySelectorAll('.bg-orange-500');
                        orangeBgs.forEach(el => {
                            el.style.backgroundColor = '#f97316';
                            el.style.borderColor = '#f97316';
                        });

                        // Fix Slate Text (text-slate-400 / text-slate-500)
                        const slateText = clonedModal.querySelectorAll('.text-slate-400, .text-slate-500, .text-slate-700');
                        slateText.forEach(el => {
                            // Approximate slate colors in hex
                            if (el.classList.contains('text-slate-400')) el.style.color = '#94a3b8';
                            if (el.classList.contains('text-slate-500')) el.style.color = '#64748b';
                            if (el.classList.contains('text-slate-700')) el.style.color = '#334155';
                        });

                        // Fix Border slate-700
                        const slateBorders = clonedModal.querySelectorAll('.border-slate-700');
                        slateBorders.forEach(el => {
                            el.style.borderColor = '#334155';
                        });

                    }
                }
            });
            const link = document.createElement('a');
            link.download = `streak-${streakCount}-days.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            return true;
        } catch (err) {
            console.error('Capture failed:', err);
            return false;
        }
    };

    const handleShare = async (platform) => {
        // Prepare share text
        const shareText = `I just hit a ${streakCount} day learning streak! 🔥 #KeepLearning`;
        const shareUrl = "https://lms-badges.demo";
        const encodedText = encodeURIComponent(shareText);
        const encodedUrl = encodeURIComponent(shareUrl);
        let url = '';

        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}%20${encodedUrl}`;
                break;
            default:
                return;
        }

        window.open(url, '_blank', 'width=600,height=500,noopener,noreferrer');
    };

    const handleDownload = async () => {
        await captureAndDownload();
    };

    if (!isVisible && !isOpen) return null;

    const days = [
        { name: 'M', completed: true },
        { name: 'T', completed: true },
        { name: 'W', completed: true },
        { name: 'T', completed: true },
        { name: 'F', completed: false },
        { name: 'S', completed: false },
        { name: 'S', completed: false },
    ];

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div
                ref={modalRef}
                data-capture-target
                className={`relative w-[90%] max-w-[400px] bg-[#002147] border border-white/5 rounded-[30px] p-8 text-center shadow-2xl overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'scale-100' : 'scale-80'}`}
                // Default styles for live view
                style={{ backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.05)', color: '#ffffff' }}
                onClick={e => e.stopPropagation()}
            >

                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] blur-[80px] pointer-events-none" style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)' }} />

                <div className="relative z-10">

                    {/* Fire Icon Main */}
                    <div className="mb-4 flex justify-center">
                        <div className="relative">
                            {/* Explicit inline color for icon */}
                            <FaFire className="text-[120px] drop-shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-pulse-custom" style={{ color: '#f97316' }} />
                            <div className="streak-number absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-black text-4xl drop-shadow-lg">
                                {streakCount}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-2 text-white">Day Streak</h2>
                    <p className="mb-8 text-sm" style={{ color: '#94a3b8' }}>Congratulations on reaching a streak milestone!</p>

                    {/* Weekly Progress */}
                    <div className="flex justify-between mb-8 px-2">
                        {days.map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <span className="text-xs font-bold" style={{ color: '#64748b' }}>{day.name}</span>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border`}
                                    style={{
                                        backgroundColor: day.completed ? '#f97316' : 'transparent',
                                        borderColor: day.completed ? '#f97316' : '#334155',
                                        color: day.completed ? '#ffffff' : '#334155'
                                    }}
                                >
                                    {day.completed && <FaCheck />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}

                    <div className="flex flex-col items-center gap-6 data-[html2canvas-ignore]">
                        <button onClick={onClose} className="bg-[var(--color-accent)] text-slate-900 border-none px-8 py-3 rounded-full font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)]">
                            Continue
                        </button>

                        <div className="border-t border-white/10 pt-6 w-full flex justify-center">
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-lg font-medium"
                            >
                                <FaShareNodes />
                                <span>Share Streak</span>
                            </button>
                        </div>

                        {/* Share Modal Overlay */}
                        {showShareModal && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/95 rounded-[30px] animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
                                <div className="relative w-full max-w-[90%] p-6 flex flex-col items-center gap-6">
                                    <button
                                        onClick={() => setShowShareModal(false)}
                                        className="absolute -top-2 -right-2 text-slate-400 hover:text-white p-2"
                                    >
                                        <FaTimes />
                                    </button>

                                    <h3 className="text-xl font-bold text-white mb-2">Share Streak</h3>

                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        <button
                                            onClick={() => handleShare('linkedin')}
                                            className="flex flex-col items-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-white/5"
                                        >
                                            <FaLinkedin className="text-2xl text-blue-500" />
                                            <span className="text-sm font-medium text-slate-300">LinkedIn</span>
                                        </button>

                                        <button
                                            onClick={() => handleShare('twitter')}
                                            className="flex flex-col items-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-white/5"
                                        >
                                            <FaXTwitter className="text-2xl text-white" />
                                            <span className="text-sm font-medium text-slate-300">X (Twitter)</span>
                                        </button>

                                        <button
                                            onClick={() => handleShare('facebook')}
                                            className="flex flex-col items-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-white/5"
                                        >
                                            <FaFacebook className="text-2xl text-blue-600" />
                                            <span className="text-sm font-medium text-slate-300">Facebook</span>
                                        </button>

                                        <button
                                            onClick={handleDownload}
                                            className="flex flex-col items-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-white/5"
                                        >
                                            <FaDownload className="text-2xl text-emerald-500" />
                                            <span className="text-sm font-medium text-slate-300">Download</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreakModal;
