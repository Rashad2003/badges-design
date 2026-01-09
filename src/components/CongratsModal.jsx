import React, { useEffect, useState, useRef } from 'react';
import { FaCrown, FaTimes, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoShieldSharp } from "react-icons/io5";
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

const CongratsModal = ({ isOpen, onClose, badge }) => {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef(null);

    // Default "Test" badge if none provided
    const defaultBadge = {
        title: "System Architect",
        icon: FaCrown,
        type: 'gold',
        xp: 500,
        top: '5%'
    };

    const activeBadge = badge || defaultBadge;
    const { title, xp, top, icon: Icon, type } = activeBadge;

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

            // Fire multiple rounds
            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        } else {
            setTimeout(() => setIsVisible(false), 300); // Animation delay
        }
    }, [isOpen]);

    const captureAndDownload = async () => {
        if (!modalRef.current) return;
        try {
            // Use same hex-forcing logic as BadgeModal to fix oklch/tailwind issues
            const canvas = await html2canvas(modalRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#1e293b', // Match bg-slate-800
                ignoreElements: (element) => element.classList.contains('data-[html2canvas-ignore]'),
                onclone: (clonedDoc) => {
                    const clonedModal = clonedDoc.querySelector('[data-capture-target]');
                    if (clonedModal) {
                        // Force styles for the capture
                        clonedModal.style.backgroundColor = '#1e293b';
                        clonedModal.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        clonedModal.style.color = '#f8fafc';

                        // Fix text colors
                        const titleEl = clonedModal.querySelector('h2');
                        if (titleEl) titleEl.style.color = '#ffffff';

                        // Fix badge icon gradient container if needed
                        const xpEl = clonedModal.querySelectorAll('.text-sm');
                        xpEl.forEach(el => {
                            if (el.innerText.includes('XP') || el.innerText.includes('Top')) {
                                el.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                el.style.color = '#fff';
                            }
                        });
                    }
                }
            });
            const link = document.createElement('a');
            link.download = `badge-${title.toLowerCase().replace(/\s+/g, '-')}-share.png`;
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
        const shareText = `I just earned the ${title} badge on LMS.Badges! Check it out!`;
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

        // 3. Open share window with a small delay to allow download to start
        setTimeout(() => {
            window.open(url, '_blank', 'width=600,height=500,noopener,noreferrer');
        }, 500);
    };

    if (!isVisible && !isOpen) return null;

    const getGradient = () => {
        if (type === 'bronze') return 'var(--bronze-gradient)';
        if (type === 'silver') return 'var(--silver-gradient)';
        return 'var(--gold-gradient)';
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div
                ref={modalRef}
                data-capture-target
                className={`relative w-[90%] max-w-[500px] bg-slate-800 border border-white/10 rounded-3xl p-12 text-center shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'scale-100' : 'scale-80'}`}
                // Default styles for live view
                onClick={e => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-slate-400 text-3xl hover:text-white transition-colors cursor-pointer data-[html2canvas-ignore]"
                >
                    &times;
                </button>

                {/* Badge Visual */}
                <div className="relative w-[150px] h-[150px] mx-auto mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.4)_0%,transparent_70%)] animate-pulse-custom" />
                    <div className="relative w-[100px] h-[115px] flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110">
                        {/* Shield Background */}
                        <IoShieldSharp
                            className={`w-full h-full absolute inset-0 drop-shadow-lg ${type === 'bronze' ? 'text-amber-700' :
                                type === 'silver' ? 'text-slate-300' :
                                    'text-yellow-400'
                                }`}
                        />
                        {/* Inner Icon */}
                        <div className="relative z-10 text-4xl text-[#78350f]">
                            {Icon ? <Icon /> : <FaCrown />}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Congrats!</h2>
                    <p className="text-lg text-slate-300">You've officially earned the <strong className="text-amber-400">{title}</strong> badge.</p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold">+{xp} XP</span>
                    <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold">Top {top}</span>
                </div>

                <div className="flex flex-col items-center gap-6 data-[html2canvas-ignore]">
                    <button className="bg-[var(--color-accent)] text-slate-900 border-none px-8 py-3 rounded-full font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)]">
                        Add to Profile
                    </button>

                    <div className="border-t border-white/10 pt-6 w-full">
                        <div className="flex justify-center gap-6 text-2xl text-slate-400">
                            <FaFacebook
                                className="cursor-pointer hover:text-blue-500 transition-colors transform hover:scale-110"
                                title="Share on Facebook"
                                onClick={() => handleShare('facebook')}
                            />
                            <FaXTwitter
                                className="cursor-pointer hover:text-white transition-colors transform hover:scale-110"
                                title="Share on X"
                                onClick={() => handleShare('twitter')}
                            />
                            <FaLinkedin
                                className="cursor-pointer hover:text-blue-600 transition-colors transform hover:scale-110"
                                title="Share on LinkedIn"
                                onClick={() => handleShare('linkedin')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CongratsModal;
