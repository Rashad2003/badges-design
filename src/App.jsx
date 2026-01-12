import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StudentProfile from './components/StudentProfile';
import Scanner from './components/Scanner';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scan" element={<Scanner />} />
                <Route path="/student/:id" element={<StudentProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
