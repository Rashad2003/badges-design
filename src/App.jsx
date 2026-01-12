import React, { useState } from 'react';
import { FaTrophy, FaCertificate, FaFire } from 'react-icons/fa';
import { FaPython, FaJs, FaReact } from 'react-icons/fa';
import BadgeCard from './components/BadgeCard';
// import CertCard from './components/CertCard';
import BadgeModal from './components/BadgeModal';
import CongratsModal from './components/CongratsModal';
import StreakModal from './components/StreakModal';

function App() {
    const [isCongratsOpen, setIsCongratsOpen] = useState(false);
    const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
    const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState(null);

    return (
        <div className="max-w-[1200px] mx-auto px-8 min-h-screen">

            {/* HEADER */}
            <header className="flex justify-between items-center py-8 mb-12 border-b border-[rgba(255,255,255,0.1)]">
                <div className="text-2xl font-bold tracking-tighter">
                    LMS<span className="text-[var(--color-accent)]">.Badges</span>
                </div>
                <div className="flex items-center gap-8">
                    {/* Streak Indicator */}
                    <div
                        onClick={() => setIsStreakModalOpen(true)}
                        className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
                        title="View Streak"
                    >
                        <FaFire className="text-orange-500 text-lg animate-pulse" />
                        <span className="font-bold text-orange-100">100</span>
                    </div>

                    <nav>
                        <a href="#" className="text-white transition-colors">Showcase</a>
                        <a href="#" className="ml-8 text-slate-400 hover:text-white transition-colors">Documentation</a>
                    </nav>
                </div>
            </header>

            <main>
                {/* HERO */}
                <section className="text-center mb-20">
                    <h1 className="text-6xl font-bold mb-4 leading-tight">
                        Celebrate <span className="bg-gradient-to-r from-[var(--color-accent)] to-teal-200 bg-clip-text text-transparent">Achievement</span>
                    </h1>
                    <p className="text-slate-400 text-xl mb-8">Premium badge system designed for maximum student engagement.</p>
                    <button
                        onClick={() => { setSelectedBadge(null); setIsCongratsOpen(true); }}
                        className="bg-[var(--color-accent)] text-slate-900 border-none px-8 py-3 rounded-full font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)]"
                    >
                        Test "Badge Earned" Animation
                    </button>
                </section>

                {/* SECTION 1: BADGES */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <FaTrophy className="text-[var(--color-accent)]" /> Skill Mastery (HackerRank Style)
                    </h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
                        <div onClick={() => { setSelectedBadge({ type: 'bronze', title: 'Python Basic', xp: 100, top: '25%', icon: FaPython }); setIsBadgeModalOpen(true); }} className="cursor-pointer">
                            <BadgeCard type="bronze" icon={FaPython} title="Python Basic" tier="Bronze Tier" />
                        </div>
                        <div onClick={() => { setSelectedBadge({ type: 'silver', title: 'JS Intermediate', xp: 300, top: '10%', icon: FaJs }); setIsBadgeModalOpen(true); }} className="cursor-pointer">
                            <BadgeCard type="silver" icon={FaJs} title="JS Intermediate" tier="Silver Tier" />
                        </div>
                        <div onClick={() => { setSelectedBadge({ type: 'gold', title: 'React Master', xp: 500, top: '5%', icon: FaReact }); setIsBadgeModalOpen(true); }} className="cursor-pointer">
                            <BadgeCard type="gold" icon={FaReact} title="React Master" tier="Gold Tier" />
                        </div>
                    </div>
                </section>

                {/* SECTION 2: CERTS */}
                {/* <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <FaCertificate className="text-[var(--color-accent)]" /> Course Certifications (LinkedIn Style)
                    </h2>
                    <div className="flex flex-col gap-4 max-w-[800px]">
                        <CertCard
                            issuer="Google"
                            title="Data Analytics Professional"
                            date="Jan 2026"
                            color="google"
                        />
                        <CertCard
                            issuer="AWS"
                            title="AWS Solutions Architect"
                            date="Dec 2025"
                            color="aws"
                        />
                    </div>
                </section> */}

            </main>

            <CongratsModal isOpen={isCongratsOpen} onClose={() => setIsCongratsOpen(false)} badge={selectedBadge} />
            <BadgeModal isOpen={isBadgeModalOpen} onClose={() => setIsBadgeModalOpen(false)} badge={selectedBadge} />
            <StreakModal isOpen={isStreakModalOpen} onClose={() => setIsStreakModalOpen(false)} streakCount={100} />
        </div>
    );
}

export default App;
