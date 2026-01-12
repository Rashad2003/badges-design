import React, { useEffect, useState, useRef } from 'react';
import { FaTimes, FaStar, FaDownload, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter, FaShareNodes } from 'react-icons/fa6';
import { IoShieldSharp } from "react-icons/io5";
import html2canvas from 'html2canvas';

const BadgeModal = ({ isOpen, onClose, badge }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const modalRef = useRef(null);

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
                        clonedModal.style.borderColor = 'rgba(255, 255, 255, 0.1)';
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
        const shareText = `I earned the ${title} badge on LMS.Badges! #Learning #Achievement`;
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


    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div
                ref={modalRef}
                data-capture-target
                className={`relative w-[90%] max-w-[400px] border rounded-2xl p-8 text-center shadow-2xl transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
                style={{ backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                onClick={e => e.stopPropagation()}
            >
                <div
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer data-[html2canvas-ignore]"
                >
                    <FaTimes size={20} />
                </div>

                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        <div className="relative w-[80px] h-[90px] flex items-center justify-center z-10 mb-2 transition-transform duration-300 hover:scale-110">
                            <IoShieldSharp
                                className="w-full h-full absolute inset-0 drop-shadow-md"
                                style={{
                                    color: type === 'bronze' ? '#b45309' :
                                        type === 'silver' ? '#cbd5e1' :
                                            '#facc15'
                                }}
                            />
                            <div className="relative z-10 text-4xl" style={{ color: shieldColor }}>
                                {Icon && <Icon />}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-1" style={{ color: '#ffffff' }}>{title}</h2>
                    <div className="flex justify-center gap-1 text-sm mb-4" style={{ color: '#fbbf24' }}>
                        {Array(starCount).fill(0).map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        <div className="text-sm" style={{ color: '#94a3b8' }}>Total XP</div>
                        <div className="text-xl font-bold" style={{ color: '#fff' }}>{xp}</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        <div className="text-sm" style={{ color: '#94a3b8' }}>Top %</div>
                        <div className="text-xl font-bold" style={{ color: '#38bdf8' }}>{top}</div>
                    </div>
                </div>

                <div className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                    You have mastered the fundamentals of {title}. Keep practicing to maintain your streak and earn higher tier badges!
                </div>

                <div className="flex justify-center data-[html2canvas-ignore]">
                    <button
                        onClick={() => setShowShareModal(true)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-lg font-medium"
                    >
                        <FaShareNodes />
                        <span>Share Badge</span>
                    </button>

                    {/* Share Modal Overlay */}
                    {showShareModal && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/95 rounded-2xl animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
                            <div className="relative w-full max-w-[90%] p-6 flex flex-col items-center gap-6">
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="absolute -top-2 -right-2 text-slate-400 hover:text-white p-2"
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

export default BadgeModal;
