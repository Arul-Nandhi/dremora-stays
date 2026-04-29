import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../data/assets';
import { FaUtensils, FaGlassMartini, FaConciergeBell, FaClock, FaTimes, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

function Restaurant({ role = 'admin' }) {
  const navigate = useNavigate();
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [selectedTable, setSelectedTable] = useState('');

  const handleBookNow = (area) => {
    setSelectedTable(area);
    setBookingModal(true);
    setBookingSuccess(false);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    setBookingId('ORD-' + Math.floor(100000 + Math.random() * 900000));
    setBookingSuccess(true);
  };

  const areas = [
    "The Golden Spoon", "Sunset Terrace", "Ocean View Dining", "The Grand Café", "Private Dining Room"
  ];

  return (
    <div className="animate-fade-in bg-black min-h-screen text-white relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-[#d4af37] mb-1">Signature Dining</h1>
          <p className="text-gray-400 tracking-wide">
            {role === 'admin' 
              ? 'Manage dining spaces, menus, and culinary reservations.' 
              : 'Experience world-class culinary excellence prepared by our executive chefs.'}
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { icon: <FaUtensils />, title: "Fine Dining", desc: "Multi-course tasting menus with paired international wines." },
          { icon: <FaGlassMartini />, title: "Lounge Bar", desc: "Signature cocktails and premium spirits in our exclusive lounge." },
          { icon: <FaConciergeBell />, title: "24/7 Room Service", desc: "Enjoy our exquisite menu from the comfort of your own suite." },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#111] rounded-xl p-8 border border-[#333] flex flex-col items-center text-center group hover:-translate-y-1 hover:border-[#d4af37] transition-all">
            <div className="bg-[#222] border border-[#333] p-5 rounded-full text-[#d4af37] text-3xl mb-5 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-serif text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Restaurant Areas Gallery */}
      <h2 className="text-2xl font-serif text-[#d4af37] mb-6 border-l-4 border-[#d4af37] pl-4">Explore Our Dining Spaces</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.restaurant.map((imgUrl, index) => (
          <div key={index} className="bg-[#111] rounded-xl overflow-hidden border border-[#333] group cursor-pointer hover:border-[#d4af37] transition-colors">
            <div className="h-64 overflow-hidden relative">
              <img 
                src={imgUrl} 
                alt={`Restaurant Area ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white font-serif text-2xl mb-1 group-hover:text-[#d4af37] transition-colors">
                  {areas[index] || "Gourmet Section"}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-4 text-[#d4af37] text-xs font-bold tracking-widest uppercase">
                    <span className="flex items-center gap-1.5"><FaClock /> 19:00 - 23:00</span>
                    <span>•</span>
                    <span>{index % 2 === 0 ? 'Smart Casual' : 'Formal'}</span>
                  </div>
                  <button 
                    onClick={() => handleBookNow(areas[index] || "Gourmet Section")}
                    className="opacity-0 group-hover:opacity-100 text-xs font-bold uppercase tracking-widest text-black bg-[#d4af37] px-4 py-2 hover:bg-white transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-[#d4af37] p-8 max-w-md w-full relative">
            <button onClick={() => setBookingModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <FaTimes size={20} />
            </button>
            
            {bookingSuccess ? (
              <div className="text-center py-8">
                <FaCheckCircle className="text-emerald-500 text-6xl mx-auto mb-4" />
                <h2 className="text-2xl font-serif text-white mb-2">Booked Successfully!</h2>
                <p className="text-gray-400 mb-6">Your table has been reserved.</p>
                <div className="bg-black border border-[#333] p-4 text-[#d4af37] font-bold tracking-widest mb-6">
                  Booking ID: {bookingId}
                </div>
                <button onClick={() => { setBookingModal(false); navigate('/'); }} className="bg-[#d4af37] text-black px-8 py-3 uppercase tracking-widest font-bold text-xs hover:bg-white transition-all">Close</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-[#d4af37] mb-2">Reserve a Table</h2>
                <p className="text-gray-400 text-sm mb-6">You are booking: <strong className="text-white">{selectedTable}</strong></p>
                
                <form onSubmit={submitBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Full Name</label>
                    <input type="text" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Number of Guests</label>
                    <select className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]">
                      <option>1-2 Guests</option>
                      <option>3-4 Guests</option>
                      <option>5-8 Guests</option>
                      <option>8+ Guests</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-1"><FaCalendarAlt className="text-[#d4af37]"/> Date</label>
                      <input type="date" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Time</label>
                      <input type="time" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Type of Dish (Optional)</label>
                      <input type="text" placeholder="e.g. Steak, Pasta" className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37] placeholder-gray-700" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Cuisine (Optional)</label>
                      <input type="text" placeholder="e.g. Italian, Indian" className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37] placeholder-gray-700" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#d4af37] text-black py-4 uppercase tracking-widest font-bold mt-4 hover:bg-white transition-all">
                    Confirm Booking
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Restaurant;