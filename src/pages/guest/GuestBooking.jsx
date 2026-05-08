import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../data/assets';
import { FaUtensils, FaBed, FaGlassMartini, FaArrowRight, FaStar } from 'react-icons/fa';

const BOOKING_OPTIONS = [
  {
    icon: <FaUtensils />,
    label: 'Reserve a Table',
    to: '/guest/restaurant',
    img: images.restaurant[0],
    title: 'Signature Dining',
    badge: 'Restaurant',
    desc: 'Reserve your table at one of our award-winning restaurants. Perfect for romantic dinners, business lunches and family celebrations.',
    detail: 'Open 07:00 — 23:00 daily',
    cta: 'Reserve a Table',
  },
  {
    icon: <FaBed />,
    label: 'Book Suites',
    to: '/guest/rooms',
    img: images.rooms[0],
    title: 'Luxury Suites & Rooms',
    badge: 'Accommodation',
    desc: '12 curated room types from classic elegance to presidential grandeur — every detail crafted for your comfort.',
    detail: 'From ₹8,500 / night',
    cta: 'Book Suites',
  },
  {
    icon: <FaGlassMartini />,
    label: 'Book a Hall',
    to: '/guest/events',
    img: images.events[0],
    title: 'Grand Banquet Halls',
    badge: 'Events',
    desc: 'World-class venues for weddings, galas and corporate conferences — seating 50 to 500 guests in opulent grandeur.',
    detail: 'From ₹3,00,000 / day',
    cta: 'Reserve a Hall',
  },
];

function GuestBooking() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <div className="page-hero relative">
        <div className="absolute inset-0 z-0">
          <img src={images.banners[0]} alt="Booking" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 text-center">
          <div className="flex justify-center text-[#d4af37] mb-4 gap-1">
            {[...Array(5)].map((_,i) => <FaStar key={i} className="text-xs" />)}
          </div>
          <span className="section-label mb-4 block">Your Luxury Journey Begins</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">Book Now</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto text-sm leading-relaxed">
            Choose from world-class dining, luxury accommodations and magnificent event venues — all under one roof.
          </p>
        </div>
      </div>

      {/* Booking Cards */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BOOKING_OPTIONS.map((opt, i) => (
            <div key={i} className="glass-card card-shine rounded-xl overflow-hidden group flex flex-col stagger-item">
              {/* Card Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={opt.img} alt={opt.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                {/* Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 border border-[#d4af37]/30 rounded-sm px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-[#d4af37] text-sm">{opt.icon}</span>
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase">{opt.badge}</span>
                </div>
                {/* Price detail */}
                <p className="absolute bottom-4 left-4 text-[#d4af37] font-bold text-sm">{opt.detail}</p>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="font-serif text-white text-2xl mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                  {opt.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-6">{opt.desc}</p>
                <Link
                  to={opt.to}
                  className="gold-btn flex items-center justify-center gap-2 py-3.5 rounded-sm text-xs group/btn"
                >
                  {opt.cta}
                  <FaArrowRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-600 text-xs mt-12 tracking-widest uppercase">
          All bookings are confirmed within 30 minutes · 24/7 Concierge Support
        </p>
      </div>
    </div>
  );
}

export default GuestBooking;
