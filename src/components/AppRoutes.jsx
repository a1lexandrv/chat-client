import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Join from '../components/Join/Join';
import Chat from '../components/Chat/Chat';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
}
