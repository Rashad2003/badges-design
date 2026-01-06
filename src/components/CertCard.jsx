import React from 'react';
import { FaGoogle, FaAws, FaExternalLinkAlt } from 'react-icons/fa';

const CertCard = ({ issuer, title, date, color, link }) => {
    return (
        <div className="flex items-center gap-6 p-6 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
            <div className={`w-[60px] h-[60px] flex items-center justify-center text-3xl rounded-lg ${color === 'google' ? 'bg-white text-[#4285F4]' : 'bg-[#232f3e] text-[#FF9900]'}`}>
                {issuer === 'Google' && <FaGoogle />}
                {issuer === 'AWS' && <FaAws />}
            </div>
            <div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-slate-400 text-sm mb-3">Issued by {issuer} • {date}</p>
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-md border border-[rgba(255,255,255,0.1)] text-slate-400 text-xs hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors cursor-pointer">
                    Show Credential <FaExternalLinkAlt className="text-[10px]" />
                </button>
            </div>
        </div>
    );
};

export default CertCard;
