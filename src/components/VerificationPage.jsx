import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { students } from '../data/students';
import { FaCheckCircle, FaTrophy, FaUserGraduate, FaArrowRight } from 'react-icons/fa';
import BadgeCard from './BadgeCard';

const VerificationPage = () => {
    const { studentId, badgeSlug } = useParams();

    // Find student
    const student = students.find(s => s.id === studentId);

    // Helper to normalize strings for comparison (simple slugify)
    const toSlug = (str) => str.toLowerCase().replace(/\s+/g, '-');

    // Find badge
    const badge = student?.badges.find(b => toSlug(b.title) === badgeSlug);

    if (!student || !badge) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-4">Verification Failed</h1>
                <p className="text-slate-400 mb-8">We could not verify this badge. The link may be invalid or expired.</p>
                <Link to="/" className="text-[var(--color-accent)] hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 border-t-4 border-[var(--color-accent)] animate-in fade-in duration-500">
            <div className="max-w-2xl mx-auto p-8">
                {/* Header Logo */}
                <div className="text-center mb-12">
                    <div className="text-2xl font-bold tracking-tighter text-white">
                        LMS<span className="text-[var(--color-accent)]">.Badges</span>
                    </div>
                    <div className="text-slate-500 text-sm tracking-widest uppercase mt-2">Official Credential Verification</div>
                </div>

                {/* Main Card */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex flex-col items-center text-center relative z-10">
                        {/* Status */}
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/20 font-medium mb-8">
                            <FaCheckCircle /> Verified Credential
                        </div>

                        {/* Badge Display */}
                        <div className="mb-8 scale-110">
                            <BadgeCard {...badge} />
                        </div>

                        {/* Statement */}
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Badge Earned
                        </h1>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            This certifies that <span className="font-bold text-white">{student.name}</span> has successfully completed all requirements for the <span className="text-[var(--color-accent)]">{badge.title}</span> badge.
                        </p>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full bg-slate-800/80 rounded-xl p-6 border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-[var(--color-accent)]">
                                    <FaUserGraduate />
                                </div>
                                <div className="text-left">
                                    <div className="text-xs text-slate-500 uppercase font-bold">Recipient</div>
                                    <div className="font-medium text-white">{student.name}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-[var(--color-accent)]">
                                    <FaTrophy />
                                </div>
                                <div className="text-left">
                                    <div className="text-xs text-slate-500 uppercase font-bold">Achievement Tier</div>
                                    <div className="font-medium text-white">{badge.tier || 'Standard'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer/CTA */}
                <div className="mt-12 text-center">
                    <p className="text-slate-500 mb-4">Want to earn badges like this?</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white font-semibold hover:text-[var(--color-accent)] transition-colors"
                    >
                        Explore Badge Programs <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
