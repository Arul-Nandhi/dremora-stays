import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { images } from '../data/assets';
import {
  FaPhoneAlt, FaEnvelope, FaBars, FaTimes,
  FaAngleDown, FaBed, FaUtensils, FaGlassMartini, FaLock
} from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Home',    to: '/' },
  { label: 'About',   to: '/#about' },
  { label: 'Offers',  to: '/#offers' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Contact', to: '/#contact' },
];



function GuestNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.pathname === '/' && location.hash === path.slice(1);
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* ── Top contact bar — hidden HMS admin lock at far right ── */}
      <div className="hidden md:flex bg-[#050505] text-[#d4af37] py-2 px-8 text-xs justify-between items-center font-light tracking-wider border-b border-[#1a1a1a]">
        <div className="flex gap-8">
          <span className="flex items-center gap-2 cursor-default hover:text-white transition-colors">
            <FaPhoneAlt className="text-[10px]" /> +91 6346 961 630
          </span>
          <span className="flex items-center gap-2 cursor-default hover:text-white transition-colors">
            <FaEnvelope className="text-[10px]" /> info@dremorestays.com
          </span>
        </div>
        {/* Hidden staff portal — nearly invisible lock icon */}
        <Link
          to="/login"
          id="admin-portal-trigger"
          title="Staff Portal"
          aria-label="Staff Portal Access"
          className="text-[#2a2a2a] hover:text-[#d4af37]/50 transition-colors duration-500 text-[11px]"
        >
          <FaLock />
        </Link>
      </div>

      {/* ── Main Navbar ── */}
      <nav className={`sticky top-0 w-full z-50 portal-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-[72px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group" style={{textDecoration:'none'}}>
            <img
              src={images.logo}
              alt="Dremora Stays"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-serif text-[#d4af37] tracking-widest uppercase" style={{textDecoration:'none'}}>
                DREMORA STAYS
              </span>
              <span className="text-[9px] tracking-[0.3em] text-gray-500 uppercase hidden md:block">
                Stay beyond dreams
              </span>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(link =>
              link.to.startsWith('/#')
                ? <a key={link.to} href={link.to} className={`nav-link ${isActive(link.to) ? 'active' : ''}`}>{link.label}</a>
                : <Link key={link.to} to={link.to} className={`nav-link ${isActive(link.to) ? 'active' : ''}`}>{link.label}</Link>
            )}

            {/* Order Now + Book Now CTA buttons */}
            <Link to="/guest/foods" className="gold-outline-btn px-5 py-2.5 rounded-sm text-xs">
              Order Now
            </Link>
            <Link to="/guest/booking" className="gold-btn px-5 py-2.5 rounded-sm text-xs">
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[#d4af37] text-2xl p-2 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="mobile-menu lg:hidden border-t border-[#222] max-h-[80vh] overflow-y-auto">
            {NAV_LINKS.map(link =>
              link.to.startsWith('/#')
                ? <a key={link.to} href={link.to} className="mobile-link">{link.label}</a>
                : <Link key={link.to} to={link.to} className={`mobile-link ${isActive(link.to) ? 'active' : ''}`}>{link.label}</Link>
            )}

            <Link to="/guest/foods" className="mobile-link">Order Now</Link>
            <Link to="/guest/booking" className="mobile-link gold-btn text-center rounded-sm text-xs py-3 mx-4 mb-2 block">
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default GuestNavbar;
