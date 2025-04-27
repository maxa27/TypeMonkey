import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/Layout';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Records from './pages/Records';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="records" element={<Records/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
