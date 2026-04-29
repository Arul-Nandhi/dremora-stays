import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../data/assets';
import { FaPhoneAlt, FaEnvelope, FaBars, FaAngleDown } from 'react-icons/fa';

function GuestNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Header / Contact Info */}
      <div className="bg-[#111] text-[#d4af37] py-2 px-8 text-xs flex justify-between items-center hidden md:flex font-light tracking-wider border-b border-[#333]">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><FaPhoneAlt /> +91 44 4391 1000</span>
          <span className="flex items-center gap-2"><FaEnvelope /> info@dremorestays.com</span>
        </div>
        <div className="flex gap-6">
          <Link to="/login" className="hover:text-white transition-colors uppercase">Manage Booking</Link>
          <Link to="/login" className="hover:text-white transition-colors uppercase">Login Portal</Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-black shadow-md border-b border-[#333] px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4">
            <img src={images.logo} alt="DREMORE STAYS Logo" className="h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-serif text-[#d4af37] tracking-widest uppercase">DREMORE STAYS</h1>
              <span className="text-[10px] tracking-[0.3em] text-white uppercase">Stay beyond dreams</span>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex gap-8 items-center text-sm font-medium text-white">
          <Link to="/" className="hover:text-[#d4af37] transition-colors uppercase tracking-widest">Home</Link>
          <a href="/#about" className="hover:text-[#d4af37] transition-colors uppercase tracking-widest">About Us</a>
          
          {/* Gallery Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-[#d4af37] transition-colors uppercase tracking-widest">
              Gallery <FaAngleDown />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#111] border border-[#333] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col z-50">
              <a href="/#gallery-foods" className="px-4 py-3 hover:bg-[#222] hover:text-[#d4af37] border-b border-[#333] tracking-widest text-xs uppercase">Foods</a>
              <a href="/#gallery-rooms" className="px-4 py-3 hover:bg-[#222] hover:text-[#d4af37] border-b border-[#333] tracking-widest text-xs uppercase">Rooms</a>
              <a href="/#gallery-banquet" className="px-4 py-3 hover:bg-[#222] hover:text-[#d4af37] tracking-widest text-xs uppercase">Banquet Halls</a>
            </div>
          </div>

          <a href="/#offers" className="hover:text-[#d4af37] transition-colors uppercase tracking-widest">Offers</a>
          
          {/* Booking Dropdown */}
          <div className="group relative">
            <button className="bg-[#d4af37] text-black px-6 py-3 rounded-sm text-sm tracking-widest uppercase hover:bg-white transition-all flex items-center gap-2 font-bold">
              Book Now <FaAngleDown />
            </button>
            <div className="absolute top-full right-0 mt-2 w-56 bg-[#111] border border-[#d4af37] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col z-50">
              <Link to="/guest/rooms" className="px-4 py-3 hover:bg-[#222] text-white hover:text-[#d4af37] border-b border-[#333] tracking-widest text-xs uppercase font-semibold">Book Room</Link>
              <Link to="/guest/events" className="px-4 py-3 hover:bg-[#222] text-white hover:text-[#d4af37] border-b border-[#333] tracking-widest text-xs uppercase font-semibold">Book Banquet Hall</Link>
              <Link to="/guest/restaurant" className="px-4 py-3 hover:bg-[#222] text-white hover:text-[#d4af37] tracking-widest text-xs uppercase font-semibold">Reserve Restaurant Table</Link>
            </div>
          </div>
        </div>
        <div className="lg:hidden text-2xl text-[#d4af37] cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FaBars />
        </div>
      </nav>
    </>
  );
}

export default GuestNavbar;
