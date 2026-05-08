import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../data/assets';
import { FaArrowRight, FaTag, FaUsers, FaGlassCheers } from 'react-icons/fa';

const OFFERS = [
  {
    id: 'weekend',
    tag: 'Limited Time',
    icon: <FaTag />,
    title: 'Weekend Luxury Escape',
    desc: 'Enjoy two nights in our signature suite with complimentary breakfast, evening spa access and a bottle of champagne on arrival.',
    price: '₹18,500',
    was: '₹26,000',
    saving: 'Save 29%',
    validity: 'Valid Fri–Sun · Booking required 48hrs in advance',
    img: images.rooms[1],
    perks: ['Complimentary Breakfast', 'Spa Access (2hrs)', 'Welcome Champagne', 'Late Checkout 1PM'],
    cta: 'Book This Offer',
    to: '/guest/rooms',
  },
  {
    id: 'dining',
    tag: 'Family Special',
    icon: <FaUsers />,
    title: 'Family Dining Combo',
    desc: 'Treat the whole family to a curated 4-course signature meal at our award-winning restaurant — starters, mains, dessert and mocktails included.',
    price: '₹4,800',
    was: '₹7,200',
    saving: 'Save 33%',
    validity: 'Valid daily · Table reservation required',
    img: images.restaurant[1],
    perks: ['4-Course Meal for 4', 'Kids Meal Included', 'Complimentary Mocktails', 'Priority Seating'],
    cta: 'Reserve a Table',
    to: '/guest/restaurant',
  },
  {
    id: 'banquet',
    tag: 'Event Package',
    icon: <FaGlassCheers />,
    title: 'Banquet Hall Celebration',
    desc: 'Book our Grand Banquet Hall for your celebration — weddings, corporate galas or milestone events — and receive exclusive décor and catering packages.',
    price: '₹2,20,000',
    was: '₹3,00,000',
    saving: 'Save 27%',
    validity: 'Valid for bookings above 100 guests · Advance booking required',
    img: images.events[1],
    perks: ['Full Day Hall Access', 'Catering for 100 Guests', 'Premium Décor Setup', 'Dedicated Event Manager'],
    cta: 'Book the Hall',
    to: '/guest/events',
  },
];

function GuestOffers() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Hero */}
      <div className="page-hero relative">
        <div className="absolute inset-0 z-0">
          <img src={images.rooms[0]} alt="Offers" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 text-center">
          <span className="section-label mb-4 block">Exclusive Deals</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">Special Offers</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto text-sm leading-relaxed">
            Handpicked luxury packages — crafted to make every moment extraordinary at Dremora Stays.
          </p>
        </div>
      </div>

      {/* Offer Cards */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-10">
        {OFFERS.map((offer, i) => (
          <div key={offer.id} className={`glass-card card-shine rounded-xl overflow-hidden group flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

            {/* Image */}
            <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden shrink-0">
              <img src={offer.img} alt={offer.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                {offer.icon} {offer.tag}
              </div>
              {/* Saving badge */}
              <div className="absolute bottom-4 left-4 bg-black/80 border border-[#d4af37]/40 rounded-sm px-3 py-1.5">
                <span className="text-[#d4af37] text-xs font-bold">{offer.saving}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col flex-grow">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <h2 className="font-serif text-white text-2xl md:text-3xl group-hover:text-[#d4af37] transition-colors">{offer.title}</h2>
                <div className="text-right shrink-0">
                  <p className="text-[#d4af37] font-bold text-2xl font-serif">{offer.price}</p>
                  <p className="text-gray-500 text-xs line-through">{offer.was}</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">{offer.desc}</p>

              {/* Perks */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {offer.perks.map(perk => (
                  <div key={perk} className="flex items-center gap-2 text-gray-300 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                    {perk}
                  </div>
                ))}
              </div>

              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-6">{offer.validity}</p>

              <div className="mt-auto">
                <Link to={offer.to} className="gold-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-xs">
                  {offer.cta} <FaArrowRight className="text-[9px]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuestOffers;
