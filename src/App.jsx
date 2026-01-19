import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StudentProfile from './components/StudentProfile';
import Scanner from './components/Scanner';
import VerificationPage from './components/VerificationPage';
import { Modal } from './components/modal';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scan" element={<Scanner />} />
                <Route path="/student/:id" element={<StudentProfile />} />
                <Route path="/verify/:studentId/:badgeSlug" element={<VerificationPage />} />
                <Route path="/modal" element={<Modal />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
