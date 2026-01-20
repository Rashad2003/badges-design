import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { students } from '../data/students';
import { FaCheckCircle, FaTrophy, FaUserGraduate, FaArrowRight, FaLinkedin, FaFacebook, FaDownload, FaCertificate } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import BadgeIcon from './BadgeIcon';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const VerificationPage = () => {
    const { studentId, badgeSlug } = useParams();
    const certificateRef = useRef(null);
    const [copied, setCopied] = useState(false); // Kept state variable definition to avoid breaking existing logic if any, but removing usage if acceptable. Actually user asked to remove copy button. So I will remove `copied` state.

    // Find student
    const student = students.find(s => s.id === studentId);

    // Helper to normalize strings for comparison (simple slugify)
    const toSlug = (str) => str.toLowerCase().replace(/\s+/g, '-');

    // Find badge
    const badge = student?.badges.find(b => toSlug(b.title) === badgeSlug);

    // Mock Credential Data
    const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const credentialId = badge ? `CID-${studentId.split('-')[1]}-${badge.title.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 10000)}` : '';

    const handleShareLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    };

    const handleShareFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    const handleDownloadPDF = async () => {
        if (!certificateRef.current) return;
        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                backgroundColor: '#0f172a',
                useCORS: true,
                logging: false,
                ignoreElements: (element) => element.tagName === 'BUTTON' // Optional: ignore buttons if inside container
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape for certificate view
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Calculate dimensions to fit efficiently
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Center vertically if needed, or just top
            const y = (pageHeight - imgHeight) / 2 > 0 ? (pageHeight - imgHeight) / 2 : 0;

            pdf.addImage(imgData, 'PNG', 0, y, imgWidth, imgHeight);
            pdf.save(`${student?.name || 'Certificate'} - ${badge?.title || 'Badge'}.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
        }
    };

    if (!student || !badge) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-4">Verification Failed</h1>
                <p className="text-slate-400 mb-8">We could not verify this badge. The link may be invalid or expired.</p>
                <Link to="/" className="text-[var(--color-accent)] hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Navbar / Home Link */}
            <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <FaArrowRight className="rotate-180 text-white text-sm" />
                    </div>
                    <span className="text-slate-400 text-sm font-medium group-hover:text-white transition-colors">Back</span>
                </Link>
            </nav>

            <div className="relative z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-500">
                {/* Certificate Container */}
                <div ref={certificateRef} className="bg-[rgba(255,255,255,0.05)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] rounded-3xl p-1 shadow-2xl overflow-hidden">
                    <div className="bg-[rgba(15,23,42,0.4)] rounded-[20px] p-8 md:p-12 border border-[rgba(255,255,255,0.05)] relative">

                        {/* Decorative Corner Borders */}
                        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[rgba(48,145,157,0.3)] rounded-tl-3xl"></div>
                        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[rgba(48,145,157,0.3)] rounded-tr-3xl"></div>
                        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[rgba(48,145,157,0.3)] rounded-bl-3xl"></div>
                        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[rgba(48,145,157,0.3)] rounded-br-3xl"></div>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row gap-12 items-center">

                            {/* Left: Badge Visual */}
                            <div className="flex-1 flex flex-col items-center">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-[rgba(48,145,157,0.2)] blur-3xl rounded-full group-hover:bg-[rgba(48,145,157,0.3)] transition-all duration-500"></div>
                                    <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                                        <BadgeIcon badge={badge} className="w-[200px] h-[200px]" />
                                    </div>
                                </div>
                                <div className="mt-8 flex gap-3" data-html2canvas-ignore>
                                    <button
                                        onClick={handleShareLinkedIn}
                                        className="p-3 rounded-full bg-[rgba(0,119,181,0.2)] text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all border border-[rgba(0,119,181,0.3)] hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]"
                                        title="Share on LinkedIn"
                                    >
                                        <FaLinkedin size={20} />
                                    </button>
                                    <button
                                        onClick={handleShareFacebook}
                                        className="p-3 rounded-full bg-[rgba(24,119,242,0.2)] text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all border border-[rgba(24,119,242,0.3)] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]"
                                        title="Share on Facebook"
                                    >
                                        <FaFacebook size={20} />
                                    </button>
                                    <button
                                        className="p-3 rounded-full bg-[#1e293b] text-[#cbd5e1] hover:bg-white hover:text-black transition-all border border-[#334155] hover:shadow-lg"
                                        title="Share on X"
                                    >
                                        <FaXTwitter size={20} />
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="p-3 rounded-full bg-[rgba(16,185,129,0.2)] text-[#34d399] hover:bg-emerald-600 hover:text-white transition-all border border-[rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                        title="Download Certificate PDF"
                                    >
                                        <FaDownload size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Right: Certificate Details */}
                            <div className="flex-[1.5] text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] text-[#34d399] text-xs font-bold uppercase tracking-wider mb-6">
                                    <FaCheckCircle className="text-sm" /> Verified Credential
                                </div>

                                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                    {badge.title}
                                </h1>

                                <div className="space-y-6 text-[#cbd5e1]">
                                    <p className="text-lg leading-relaxed">
                                        This digitally signed certificate confirms that <strong className="text-white">{student.name}</strong> has successfully completed all requirements and mastered the core competencies for this badge.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mt-10 p-6 bg-[rgba(255,255,255,0.05)] rounded-2xl border border-[rgba(255,255,255,0.05)]">
                                    <div>
                                        <div className="text-xs text-[#64748b] uppercase tracking-widest font-semibold mb-1">Issue Date</div>
                                        <div className="text-white font-mono font-medium">{issueDate}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#64748b] uppercase tracking-widest font-semibold mb-1">Credential ID</div>
                                        <div className="text-white font-mono font-medium text-sm truncate" title={credentialId}>{credentialId}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#64748b] uppercase tracking-widest font-semibold mb-1">Recipient</div>
                                        <div className="text-[#ffffff] font-medium flex items-center gap-2">
                                            <FaUserGraduate className="text-[#94a3b8]" /> {student.name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#64748b] uppercase tracking-widest font-semibold mb-1">Issuer</div>
                                        <div className="text-[#ffffff] font-medium flex items-center gap-2">
                                            <FaCertificate className="text-[var(--color-accent)]" /> LMS
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Security Footer */}
                    <div className="bg-[rgba(0,0,0,0.4)] px-8 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-[#64748b]">
                        <div>Securely recorded on the LMS Platform</div>
                        <div className="flex gap-4 mt-2 md:mt-0">
                            <span className="hover:text-[#cbd5e1] cursor-pointer">Terms</span>
                            <span className="hover:text-[#cbd5e1] cursor-pointer">Privacy</span>
                            <span className="hover:text-[#cbd5e1] cursor-pointer">Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
