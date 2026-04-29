import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../data/assets';
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBars, FaAngleDown } from 'react-icons/fa';

function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-black text-[#d4af37]">


      {/* Cinematic Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={images.banners[1]} alt="Luxury Hero" className="w-full h-full object-cover animate-pulse-slow" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>
        <div className="relative z-10 max-w-5xl animate-fade-in mt-10">
          <div className="flex justify-center text-[#d4af37] mb-6 gap-2 text-xl drop-shadow-md">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-[#d4af37] mb-6 leading-tight drop-shadow-2xl">
            Stay beyond dreams
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 font-light tracking-wide max-w-3xl mx-auto drop-shadow-md">
            Experience unparalleled luxury at Dremore Stays. Book 5-star rooms & the best accommodations globally. Reserve your stay now!
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div id="about" className="py-24 bg-black text-center px-6 max-w-5xl mx-auto">
        <h5 className="text-[#d4af37] tracking-[0.2em] uppercase mb-4 text-sm font-semibold">Welcome To</h5>
        <h3 className="text-4xl md:text-5xl font-serif text-white mb-8">DREMORE STAYS: <br />The Soul of Hospitality</h3>
        <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">
          At Dremore Stays, every detail speaks of warmth, creating a unique combination of traditional hospitality and modern conveniences. From opulent accommodations and exquisite dining to versatile event spaces and serene spas, each experience reflects our commitment to heartfelt hospitality. Discover a world where every touch feels personal and every visit feels like coming home.
        </p>
        <button className="text-white border-b border-[#d4af37] pb-1 uppercase tracking-widest text-sm font-semibold hover:text-[#d4af37] transition-colors">
          Know More
        </button>
      </div>

      {/* Gallery Section */}
      <div className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h5 className="text-[#d4af37] tracking-[0.2em] uppercase mb-4 text-sm font-semibold">Discover Our Spaces</h5>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Gallery</h3>
          </div>

          {/* Rooms */}
          <div id="gallery-rooms" className="mb-20">
            <h4 className="text-2xl font-serif text-[#d4af37] mb-8 border-l-4 border-[#d4af37] pl-4">Luxurious Rooms</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[images.rooms[0], images.rooms[1], images.rooms[3]].map((img, i) => (
                <div key={i} className="group relative overflow-hidden bg-black aspect-[4/3] border border-[#333]">
                  <img src={img} alt={`Room ${i}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-1000" />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/guest/rooms" className="inline-block border border-[#d4af37] text-[#d4af37] px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#d4af37] hover:text-black transition-all">Book a Room</Link>
            </div>
          </div>

          {/* Foods */}
          <div id="gallery-foods" className="mb-20">
            <h4 className="text-2xl font-serif text-[#d4af37] mb-8 border-l-4 border-[#d4af37] pl-4">Exquisite Culinary Arts</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[images.food[0], images.food[1], images.food[2], images.food[3]].map((img, i) => (
                <div key={i} className="group relative overflow-hidden bg-black aspect-square border border-[#333]">
                  <img src={img} alt={`Food ${i}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-1000" />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/guest/restaurant" className="inline-block border border-[#d4af37] text-[#d4af37] px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#d4af37] hover:text-black transition-all">Reserve a Table</Link>
            </div>
          </div>

          {/* Banquet Halls */}
          <div id="gallery-banquet">
            <h4 className="text-2xl font-serif text-[#d4af37] mb-8 border-l-4 border-[#d4af37] pl-4">Grand Banquet Halls & Events</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[images.events[0], images.events[1]].map((img, i) => (
                <div key={i} className="group relative overflow-hidden bg-black aspect-[16/9] border border-[#333]">
                  <img src={img} alt={`Event ${i}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-1000" />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/guest/events" className="inline-block border border-[#d4af37] text-[#d4af37] px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#d4af37] hover:text-black transition-all">Book Banquet Hall</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div id="offers" className="py-24 bg-[#111] text-white border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h5 className="text-[#d4af37] tracking-[0.2em] uppercase mb-4 text-sm font-semibold">Special Deals</h5>
              <h3 className="text-4xl md:text-5xl font-serif mb-8 text-white">Unlock Irresistible Deals</h3>
              <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">
                We offer exclusive discounts on rooms, dining, beverages, and spa treatments. Whether it's a last-minute escape or an early booking, our special offers are designed to make your stay even more memorable. Book now and save big—because at Dremore Stays, the more you stay, the less you spend!
              </p>
              <button className="bg-[#d4af37] text-black px-8 py-3 rounded-sm text-sm tracking-widest uppercase hover:bg-white transition-all font-bold">
                View All Offers
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={images.rooms[2]} alt="Offer 1" className="w-full h-48 md:h-64 object-cover border border-[#333]" />
              <img src={images.restaurant[1]} alt="Offer 2" className="w-full h-48 md:h-64 object-cover border border-[#333] mt-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black pt-20 pb-10 border-t border-[#333] text-gray-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif text-[#d4af37] mb-6 uppercase tracking-widest">DREMORE STAYS</h2>
            <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
              Subscribe to Our Newsletter and be the first to know about the best offers, latest updates, and exclusive news.
            </p>
            <div className="flex w-full border border-[#333]">
              <input type="email" placeholder="Email Address" className="bg-[#111] text-white p-3 w-full focus:outline-none text-sm" />
              <button className="bg-[#d4af37] px-4 text-black hover:bg-white transition-colors">
                <FaEnvelope />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-[#d4af37]">Contact Us</h4>
            <ul className="text-gray-500 text-sm space-y-4 font-light">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-[#d4af37] shrink-0 mt-1" />
                <span>431, Palladam , Coimbatore - 641401</span>
              </li>
              <li className="flex gap-3 items-center">
                <FaPhoneAlt className="text-[#d4af37]" />
                <span>+91 6346961630</span>
              </li>
              <li className="flex gap-3 items-center">
                <FaEnvelope className="text-[#d4af37]" />
                <span>info@dremorestays.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-[#d4af37]">Quick Links</h4>
            <ul className="text-gray-500 text-sm space-y-3 font-light">
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Offers</a></li>
              <li><Link to="/guest/restaurant" className="hover:text-[#d4af37] transition-colors">Dining</Link></li>
              <li><Link to="/guest/events" className="hover:text-[#d4af37] transition-colors">Meetings & Events</Link></li>
              <li><Link to="/guest/rooms" className="hover:text-[#d4af37] transition-colors">Rooms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-[#d4af37]">Information</h4>
            <ul className="text-gray-500 text-sm space-y-3 font-light">
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-light">
            © 2026 DREMORE STAYS. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-[#d4af37] uppercase tracking-widest text-xs">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-[#d4af37] uppercase tracking-widest text-xs">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-[#d4af37] uppercase tracking-widest text-xs">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
