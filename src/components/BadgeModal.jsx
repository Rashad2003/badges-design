import React, { useEffect, useState, useRef } from 'react';
import { FaTimes, FaStar, FaDownload } from 'react-icons/fa';
import { IoShieldSharp } from "react-icons/io5";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BadgeModal = ({ isOpen, onClose, badge }) => {
    const [isVisible, setIsVisible] = useState(false);
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

    const handleDownloadImage = async () => {
        if (!modalRef.current) return;
        try {
            const canvas = await html2canvas(modalRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#0f172a', // Explicit HEX
                ignoreElements: (element) => element.classList.contains('data-[html2canvas-ignore]'),
                // Force colors in the clone to avoid oklch from tailwind
                onclone: (clonedDoc) => {
                    const clonedModal = clonedDoc.querySelector('[data-capture-target]');
                    if (clonedModal) {
                        clonedModal.style.backgroundColor = '#0f172a';
                        clonedModal.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        clonedModal.style.color = '#f8fafc';

                        // Fix text colors
                        const titleEl = clonedModal.querySelector('h2');
                        if (titleEl) titleEl.style.color = '#ffffff';

                        const xpEl = clonedModal.querySelectorAll('.text-xl');
                        xpEl.forEach(el => {
                            if (el.textContent.includes('%')) el.style.color = '#38bdf8';
                            else el.style.color = '#ffffff';
                        });
                    }
                }
            });
            const link = document.createElement('a');
            link.download = `badge-${title.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Download failed:', err);
        }
    };

    const handleDownloadPDF = async () => {
        if (!modalRef.current) return;
        try {
            const canvas = await html2canvas(modalRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#0f172a',
                ignoreElements: (element) => element.classList.contains('data-[html2canvas-ignore]'),
                onclone: (clonedDoc) => {
                    const clonedModal = clonedDoc.querySelector('[data-capture-target]');
                    if (clonedModal) {
                        clonedModal.style.backgroundColor = '#0f172a';
                        clonedModal.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        clonedModal.style.color = '#f8fafc';

                        const titleEl = clonedModal.querySelector('h2');
                        if (titleEl) titleEl.style.color = '#ffffff';

                        const xpEl = clonedModal.querySelectorAll('.text-xl');
                        xpEl.forEach(el => {
                            if (el.textContent.includes('%')) el.style.color = '#38bdf8';
                            else el.style.color = '#ffffff';
                        });
                    }
                }
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`badge-${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        } catch (err) {
            console.error('Download failed:', err);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
            <div
                ref={modalRef}
                data-capture-target
                className={`relative w-[90%] max-w-[400px] border rounded-2xl p-8 text-center shadow-2xl transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
                // Default styles using tailwind equivalents for live view, but onclone will enforce hex
                style={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)' }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors data-[html2canvas-ignore]"
                >
                    <FaTimes size={20} />
                </button>

                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        <div className="relative w-[80px] h-[90px] flex items-center justify-center z-10 mb-2 transition-transform duration-300 hover:scale-110">
                            <IoShieldSharp className={`w-full h-full absolute inset-0 drop-shadow-md ${type === 'bronze' ? 'text-amber-700' :
                                    type === 'silver' ? 'text-slate-300' :
                                        'text-yellow-400'
                                }`} />
                            <div className="relative z-10 text-4xl" style={{ color: shieldColor }}>
                                {Icon && <Icon />}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-1" style={{ color: '#fff' }}>{title}</h2>
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

                <div className="flex gap-4 justify-center data-[html2canvas-ignore]">
                    <button
                        onClick={handleDownloadImage}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors cursor-pointer"
                    >
                        <FaDownload /> Image
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors cursor-pointer"
                    >
                        <FaDownload /> PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BadgeModal;
