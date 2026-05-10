import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaUsers, FaClock, FaTimes, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { images } from '../data/assets';

const TIME_SLOTS = [
  '07:00','08:00','09:00','10:00','11:00','12:00',
  '13:00','14:00','15:00','16:00','17:00','18:00',
  '19:00','20:00','21:00','22:00','23:00',
];

function Events({ role = 'admin' }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('venues');
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);

  const venues = [
    { name: 'Grand Banquet Hall A', capacity: '500 Guests', desc: 'Our flagship event space for grand weddings.', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80', available: true, price: '$5,000 / day' },
    { name: 'Grand Banquet Hall B', capacity: '350 Guests', desc: 'Elegant and spacious for large receptions.', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80', available: true, price: '$4,000 / day' },
    { name: 'Royal Banquet Hall', capacity: '400 Guests', desc: 'Regal aesthetics for premium celebrations.', img: 'https://images.unsplash.com/photo-1542315132-7209930f3073?auto=format&fit=crop&w=800&q=80', available: true, price: '$4,500 / day' },
    { name: 'Crystal Banquet Hall', capacity: '250 Guests', desc: 'Intimate setting with crystal chandeliers.', img: 'https://images.unsplash.com/photo-1505368589882-74d39f40c740?auto=format&fit=crop&w=800&q=80', available: false, price: '$3,000 / day' },
    
    { name: 'Executive Conference Room 1', capacity: '150 Guests', desc: 'State-of-the-art business meeting room.', img: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=800&q=80', available: true, price: '$2,000 / day' },
    { name: 'Executive Conference Room 2', capacity: '100 Guests', desc: 'Perfect for seminars and training.', img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80', available: true, price: '$1,500 / day' },
    { name: 'Boardroom Alpha', capacity: '50 Guests', desc: 'Premium boardroom setup for executives.', img: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?auto=format&fit=crop&w=800&q=80', available: true, price: '$1,000 / day' },
    { name: 'Boardroom Beta', capacity: '30 Guests', desc: 'Compact boardroom with video conferencing.', img: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=800&q=80', available: true, price: '$800 / day' },
  ];

  const handleBookNow = (venue) => {
    setSelectedVenue(venue);
    setBookingModal(true);
    setBookingSuccess(false);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    setBookingId('ORD-' + Math.floor(100000 + Math.random() * 900000));
    setBookingSuccess(true);
  };

  return (
    <div className="animate-fade-in bg-black min-h-screen text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-[#d4af37] mb-1">Banquet & Events</h1>
          <p className="text-gray-400 tracking-wide">
            {role === 'guest' ? 'Discover and book our magnificent venues for your next celebration.' : 'Manage all your venue bookings and banquet halls.'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-[#333]">
        <button
          onClick={() => setActiveTab('venues')}
          className={`pb-3 text-sm font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === 'venues' ? 'text-[#d4af37] border-[#d4af37]' : 'text-gray-500 border-transparent hover:text-white'}`}
        >
          Our Venues
        </button>
      </div>

      {/* Venues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {venues.map((venue, i) => (
          <div key={i} className="bg-[#111] rounded-xl overflow-hidden border border-[#333] group hover:border-[#d4af37] transition-colors flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded text-xs font-bold tracking-wide ${venue.available ? 'bg-emerald-900/80 text-emerald-400 border border-emerald-700' : 'bg-red-900/80 text-red-400 border border-red-700'}`}>
                {venue.available ? 'Available' : 'Booked'}
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                  <span className="text-[#d4af37] font-bold text-lg">{venue.price}</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-serif text-white mb-1">{venue.name}</h3>
              <div className="flex items-center gap-1.5 text-[#d4af37] text-xs font-bold mb-3 uppercase tracking-widest">
                <FaUsers /> <span>{venue.capacity}</span>
              </div>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed flex-grow">{venue.desc}</p>
              <button 
                onClick={() => handleBookNow(venue)}
                disabled={!venue.available}
                className={`w-full py-3 rounded text-xs font-bold tracking-widest uppercase transition-all ${venue.available ? 'bg-[#d4af37] text-black hover:bg-white' : 'bg-[#222] text-gray-500 cursor-not-allowed border border-[#333]'}`}>
                {venue.available ? 'Book Now' : 'Currently Unavailable'}
              </button>
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
                <p className="text-gray-400 mb-6">Your venue has been reserved.</p>
                <div className="bg-black border border-[#333] p-4 text-[#d4af37] font-bold tracking-widest mb-6">
                  Booking ID: {bookingId}
                </div>
                <button onClick={() => { setBookingModal(false); navigate('/'); }} className="bg-[#d4af37] text-black px-8 py-3 uppercase tracking-widest font-bold text-xs hover:bg-white transition-all">Close</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-[#d4af37] mb-2">Complete Booking</h2>
                <p className="text-gray-400 text-sm mb-6">You are booking: <strong className="text-white">{selectedVenue?.name}</strong></p>
                
                <form onSubmit={submitBooking} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Full Name</label>
                      <input type="text" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Email Address</label>
                      <input type="email" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Number of Participants</label>
                    <input type="number" min="1" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-1"><FaCalendarAlt className="text-[#d4af37]"/> Event Date</label>
                      <input type="date" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Time</label>
                      <select required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]">
                        <option value="">Select a time</option>
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
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

export default Events;
