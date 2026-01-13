import React, { useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { students } from '../data/students';
import BadgeCard from './BadgeCard';
import BadgeModal from './BadgeModal';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaArrowLeft, FaCheckCircle, FaUserCircle, FaFilePdf, FaSpinner } from 'react-icons/fa';

const StudentProfile = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const student = students.find(s => s.id === id);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [isBadgeModalOpen, setIsBadgeModalOpen] = React.useState(false);
    const [selectedBadge, setSelectedBadge] = React.useState(null);

    const handleDownloadPDF = async () => {
        const element = document.getElementById('profile-content');
        if (!element) return;

        setIsGenerating(true);

        try {
            // Wait a moment for images to fully load if auto-triggered
            await new Promise(resolve => setTimeout(resolve, 800));

            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#002147', // Deep Blue Theme
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${student.name.replace(/\s+/g, '_')}_Transcript.pdf`);
        } catch (err) {
            console.error('PDF Generation Failed', err);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        if (student && searchParams.get('download') === 'true') {
            handleDownloadPDF();
        }
    }, [student, searchParams]);

    if (!student) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-3xl font-bold text-slate-300 mb-4">Student Not Found</h2>
                <Link to="/" className="text-[var(--color-accent)] hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 max-w-[1200px] mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <FaArrowLeft /> Back to Home
                </Link>

                <button
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-wait"
                >
                    {isGenerating ? <FaSpinner className="animate-spin" /> : <FaFilePdf />}
                    {isGenerating ? 'Generating...' : 'Download Transcript'}
                </button>
            </div>

            {/* Auto-Download Feedback Banner */}
            {isGenerating && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-bounce">
                    <FaSpinner className="animate-spin" />
                    Preparing your Official Transcript...
                </div>
            )}

            <div id="profile-content" className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-[#002147]"> {/* Wrapper for PDF Capture */}
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-[#002e63] rounded-3xl p-8 border border-[#ffffff1a] flex flex-col items-center text-center sticky top-8 shadow-2xl">
                        <div className="relative mb-6">
                            <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-40 h-40 rounded-full border-4 border-[#30919D] shadow-lg"
                                crossOrigin="anonymous"
                            />
                            <div className="absolute bottom-2 right-2 bg-[#10b981] text-white p-2 rounded-full border-4 border-[#002e63] text-xl">
                                <FaCheckCircle />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2">{student.name}</h1>
                        <p className="text-[#30919D] font-medium text-lg mb-6">{student.role}</p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b9811a] text-[#34d399] rounded-full text-sm font-semibold border border-[#10b98133] w-full justify-center">
                            <FaCheckCircle /> Verified Student
                        </div>
                    </div>
                </div>

                {/* Right Column: Badges & QR */}
                <div className="lg:col-span-2 flex flex-col gap-12">
                    {/* Badges Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-[#ffffff1a] pb-4 text-white">
                            <FaUserCircle className="text-[#30919D]" /> Earned Badges ({student.badges.length})
                        </h2>

                        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,4fr))] gap-6">
                            {student.badges.map((badge, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedBadge(badge);
                                        setIsBadgeModalOpen(true);
                                    }}
                                    className="cursor-pointer transition-transform hover:scale-105"
                                >
                                    <BadgeCard
                                        {...badge}
                                        isProfile={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <BadgeModal
                isOpen={isBadgeModalOpen}
                onClose={() => setIsBadgeModalOpen(false)}
                badge={selectedBadge}
                studentId={student.id}
            />
        </div>
    );
};

export default StudentProfile;
