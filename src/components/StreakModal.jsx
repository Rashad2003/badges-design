import React, { useState, useEffect, useRef } from 'react';
import { FaFire, FaCheck, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

const StreakModal = ({ isOpen, onClose, streakCount = 100 }) => {
    const [isVisible, setIsVisible] = useState(false);
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
                backgroundColor: '#0f172a', // Explicit HEX for background
                ignoreElements: (element) => element.classList.contains('data-[html2canvas-ignore]'),
                onclone: (clonedDoc) => {
                    const clonedModal = clonedDoc.querySelector('[data-capture-target]');
                    if (clonedModal) {
                        // Force styles for the capture
                        clonedModal.style.backgroundColor = '#0f172a';
                        clonedModal.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        clonedModal.style.color = '#f8fafc';

                        // Fix text colors
                        const titleEl = clonedModal.querySelector('h2');
                        if (titleEl) titleEl.style.color = '#ffffff';

                        // Ensure streak count text is visible/colored correctly
                        const streakNum = clonedModal.querySelector('.streak-number');
                        if (streakNum) streakNum.style.color = '#ffffff';

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
        // 1. Download the image first
        await captureAndDownload();

        // 2. Prepare share text
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

        // 3. Open share window with a small delay
        setTimeout(() => {
            window.open(url, '_blank', 'width=600,height=500,noopener,noreferrer');
            alert("Image downloaded! Attach it to your post.");
        }, 500);
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
                className={`relative w-[90%] max-w-[400px] bg-[#0f172a] border border-white/5 rounded-[30px] p-8 text-center shadow-2xl overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'scale-100' : 'scale-80'}`}
                // Default styles for live view
                onClick={e => e.stopPropagation()}
            >

                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-orange-500/20 blur-[80px] pointer-events-none" />

                <div className="relative z-10">

                    {/* Fire Icon Main */}
                    <div className="mb-4 flex justify-center">
                        <div className="relative">
                            <FaFire className="text-[120px] text-orange-500 drop-shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-pulse-custom" />
                            <div className="streak-number absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-black text-4xl drop-shadow-lg">
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

                    <div className="flex flex-col items-center gap-6 data-[html2canvas-ignore]">
                        <button onClick={onClose} className="bg-[var(--color-accent)] text-slate-900 border-none px-8 py-3 rounded-full font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)]">
                            Continue
                        </button>

                        <div className="border-t border-white/10 pt-6 w-full">
                            <p className="text-slate-400 text-sm mb-4">Share accomplishment</p>
                            <div className="flex justify-center gap-6 text-2xl text-slate-400">
                                <FaFacebook
                                    className="cursor-pointer hover:text-blue-500 transition-colors transform hover:scale-110"
                                    onClick={() => handleShare('facebook')}
                                    title="Share on Facebook"
                                />
                                <FaXTwitter
                                    className="cursor-pointer hover:text-white transition-colors transform hover:scale-110"
                                    onClick={() => handleShare('twitter')}
                                    title="Share on X"
                                />
                                <FaLinkedin
                                    className="cursor-pointer hover:text-blue-600 transition-colors transform hover:scale-110"
                                    onClick={() => handleShare('linkedin')}
                                    title="Share on LinkedIn"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StreakModal;
