import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Scanner = () => {
    const navigate = useNavigate();
    const scannerRef = useRef(null);

    useEffect(() => {
        // Prevent multiple initializations
        if (!scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            const onScanSuccess = (decodedText, decodedResult) => {
                // Handle the scanned code
                console.log(`Code matched = ${decodedText}`, decodedResult);

                // Assume the code is a URL or just the ID. 
                // If it's a full URL "https://app.com/student/id", we extract ID.
                // For this demo, let's assume it renders "id" or "URL"
                let studentId = decodedText;

                // Simple parsing logic if it's a URL
                if (decodedText.includes('/student/')) {
                    const parts = decodedText.split('/student/');
                    studentId = parts[1]; // Keeps query params like alex-123?download=true
                }

                scannerRef.current.clear();
                navigate(`/student/${studentId}`);
            };

            const onScanFailure = (error) => {
                // console.warn(`Code scan error = ${error}`);
            };

            scannerRef.current.render(onScanSuccess, onScanFailure);
        }

        // Cleanup
        return () => {
            if (scannerRef.current) {
                try {
                    scannerRef.current.clear();
                } catch (e) {
                    console.error("Failed to clear scanner", e);
                }
            }
        };
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
            <Link to="/" className="fixed top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white z-50 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md transition-colors">
                <FaArrowLeft /> Back
            </Link>

            <div className="w-full max-w-md bg-[var(--color-bg-card)] rounded-3xl p-6 shadow-2xl border border-white/10">
                <h2 className="text-2xl font-bold text-center mb-6 text-white">Scan Student ID</h2>

                {/* Scanner Container */}
                <div id="reader" className="w-full overflow-hidden rounded-xl bg-black"></div>

                <p className="text-center text-slate-400 mt-6 text-sm">
                    Point your camera at a Student's QR Badge to verify their portfolio.
                </p>
            </div>
        </div>
    );
};

export default Scanner;
