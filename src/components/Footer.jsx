import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaHeart, FaLock } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#050505] pt-20 pb-8 border-t border-[#1a1a1a] text-gray-400 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-serif text-[#d4af37] mb-2 uppercase tracking-widest">DREMORA STAYS</h2>
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] mb-6">Stay beyond dreams</p>
          <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
            Subscribe to Our Newsletter and be the first to know about the best offers, latest updates, and exclusive news.
          </p>
          <div className="flex w-full border border-[#222] rounded-sm overflow-hidden group focus-within:border-[#d4af37] transition-colors">
            <input type="email" placeholder="Email Address" className="bg-[#0a0a0a] text-white p-3 w-full focus:outline-none text-sm placeholder-gray-600" />
            <button className="bg-[#d4af37] px-5 text-black hover:bg-white transition-colors shrink-0">
              <FaEnvelope />
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6 text-[#d4af37]">Contact Us</h4>
          <ul className="text-gray-500 text-sm space-y-4 font-light">
            <li className="flex gap-3">
              <FaMapMarkerAlt className="text-[#d4af37] shrink-0 mt-1" />
              <a href="https://maps.google.com/?q=431,+Palladam,+Coimbatore+-+641401" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors">431, Palladam , Coimbatore - 641401</a>
            </li>
            <li className="flex gap-3 items-center">
              <FaPhoneAlt className="text-[#d4af37]" />
              <a href="tel:+916346961630" className="hover:text-[#d4af37] transition-colors">+91 6346961630</a>
            </li>
            <li className="flex gap-3 items-center">
              <FaEnvelope className="text-[#d4af37]" />
              <a href="mailto:info@dremorastays.com" className="hover:text-[#d4af37] transition-colors">info@dremorastays.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6 text-[#d4af37]">Quick Links</h4>
          <ul className="text-gray-500 text-sm space-y-3 font-light">
            <li><a href="/#about" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30" />About Us</a></li>
            <li><a href="/#offers" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30" />Offers</a></li>
            <li><Link to="/guest/restaurant" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30" />Dining</Link></li>
            <li><Link to="/guest/events" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30" />Meetings & Events</Link></li>
            <li><Link to="/guest/rooms" className="hover:text-[#d4af37] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30" />Rooms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6 text-[#d4af37]">Follow Us</h4>
          <div className="flex gap-3 mb-8">
            {[
              { icon: <FaInstagram />, label: 'Instagram' },
              { icon: <FaFacebookF />, label: 'Facebook' },
              { icon: <FaTwitter />, label: 'Twitter' },
              { icon: <FaLinkedinIn />, label: 'LinkedIn' },
            ].map((s, i) => (
              <a key={i} href="#" aria-label={s.label}
                 className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-gray-500
                            hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
                            transition-all duration-300 text-sm hover:-translate-y-0.5">
                {s.icon}
              </a>
            ))}
          </div>
          <h4 className="font-serif text-xl mb-4 text-[#d4af37]">Information</h4>
          <ul className="text-gray-500 text-sm space-y-3 font-light">
            <li><Link to="/guest/foods" className="hover:text-[#d4af37] transition-colors">Food Menu</Link></li>
            <li><a href="/#book-now" className="hover:text-[#d4af37] transition-colors">Book Now</a></li>
            <li><a href="#" className="hover:text-[#d4af37] transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-[#d4af37] transition-colors">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-[#151515] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-sm font-light flex items-center gap-1">
          © 2026 DREMORA STAYS. Crafted with <FaHeart className="text-[#d4af37] text-xs" /> All Rights Reserved.
        </p>
        <div className="flex gap-6 text-sm items-center">
          <a href="#" className="text-gray-500 hover:text-[#d4af37] uppercase tracking-widest text-xs transition-colors">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-[#d4af37] uppercase tracking-widest text-xs transition-colors">Terms</a>
          <a href="#" className="text-gray-500 hover:text-[#d4af37] uppercase tracking-widest text-xs transition-colors">Sitemap</a>
          {/* Hidden admin portal — discreet staff-only access */}
          <Link
            to="/login"
            id="footer-admin-access"
            title="Staff Portal"
            aria-label="Staff Portal Access"
            className="text-[#1a1a1a] hover:text-[#333] transition-colors duration-700 ml-2"
          >
            <FaLock className="text-[10px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
