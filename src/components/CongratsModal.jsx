import React, { useEffect, useState, useRef } from 'react';
import { FaCrown, FaTimes, FaFacebook, FaLinkedin, FaDownload } from 'react-icons/fa';
import { FaXTwitter, FaShareNodes } from 'react-icons/fa6';
import { IoShieldSharp } from "react-icons/io5";
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { FaDiamond } from "react-icons/fa6";

const CongratsModal = ({ isOpen, onClose, badge }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
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
            const canvas = await html2canvas(modalRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#002147',
                ignoreElements: (element) => element.classList.contains('data-[html2canvas-ignore]'),
                onclone: (clonedDoc) => {
                    const clonedModal = clonedDoc.querySelector('[data-capture-target]');
                    if (clonedModal) {
                        // Ensure background is set in clone
                        clonedModal.style.backgroundColor = '#002147';
                        clonedModal.style.color = '#ffffff';
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

    const handleShare = (platform) => {
        // Prepare share text
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

        window.open(url, '_blank', 'width=600,height=500,noopener,noreferrer');
    };

    const handleDownload = async () => {
        await captureAndDownload();
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
                className={`relative w-[90%] max-w-[500px] bg-[#002147] border border-white/10 rounded-3xl p-12 text-center shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'scale-100' : 'scale-80'}`}
                style={{ backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
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
                        <FaDiamond
                            className="w-full h-full absolute inset-0 drop-shadow-lg"
                            style={{
                                color: type === 'bronze' ? '#b45309' :
                                    type === 'silver' ? '#cbd5e1' :
                                        '#facc15'
                            }}
                        />
                        {/* Inner Icon */}
                        <div className="relative z-10 text-4xl" style={{ color: '#78350f' }}>
                            {Icon ? <Icon /> : <FaCrown />}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>Congrats!</h2>
                    <p className="text-lg text-slate-300" style={{ color: '#cbd5e1' }}>
                        You've officially earned the <strong className="text-amber-400" style={{ color: '#fbbf24' }}>{title}</strong> badge.
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}>+{xp} XP</span>
                    <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}>Top {top}</span>
                </div>

                <div className="flex flex-col items-center gap-6 data-[html2canvas-ignore]">
                    <button className="bg-[var(--color-accent)] text-slate-900 border-none px-8 py-3 rounded-full font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)]">
                        Add to Profile
                    </button>

                    <div className="border-t border-white/10 pt-6 w-full flex justify-center">
                        <button
                            onClick={() => setShowShareModal(true)}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-lg font-medium"
                        >
                            <FaShareNodes />
                            <span>Share Badge</span>
                        </button>
                    </div>

                    {/* Share Modal Overlay */}
                    {showShareModal && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/95 rounded-3xl animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
                            <div className="relative w-full max-w-[80%] p-6 flex flex-col items-center gap-6">
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="absolute -top-4 -right-4 text-slate-400 hover:text-white p-2"
                                >
                                    <FaTimes />
                                </button>

                                <h3 className="text-xl font-bold text-white mb-2">Share Achievement</h3>

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
    );
};

export default CongratsModal;
