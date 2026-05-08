import React from 'react';
import { Outlet } from 'react-router-dom';
import GuestNavbar from '../components/GuestNavbar';
import Footer from '../components/Footer';

function GuestLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <GuestNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default GuestLayout;
