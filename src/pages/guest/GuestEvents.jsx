import React from 'react';
import { images } from '../../data/assets';
import Events from '../Events';

function GuestEvents() {
  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 z-0">
          <img src={images.events[0]} alt="Events" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10">
          <span className="section-label mb-4 block">Celebrations & Conferences</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">Banquet & Events</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto">Magnificent venues for weddings, galas, corporate conferences and every grand celebration.</p>
        </div>
      </div>
      <div className="guest-page-wrapper">
        <Events role="guest" />
      </div>
    </div>
  );
}

export default GuestEvents;
