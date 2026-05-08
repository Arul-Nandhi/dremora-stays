import React from 'react';
import { images } from '../../data/assets';
import Rooms from '../rooms';

function GuestRooms() {
  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 z-0">
          <img src={images.rooms[0]} alt="Rooms" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10">
          <span className="section-label mb-4 block">Accommodation</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">Our Luxury Suites</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto">Discover handcrafted comfort in every room — from classic elegance to presidential grandeur.</p>
        </div>
      </div>
      <div className="guest-page-wrapper">
        <Rooms role="guest" />
      </div>
    </div>
  );
}

export default GuestRooms;
