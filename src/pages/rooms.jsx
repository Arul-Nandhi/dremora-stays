import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../data/assets';
import { FaWifi, FaTv, FaCoffee, FaBed, FaUserFriends, FaTimes, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const roomData = [
  { type: "Presidential Suite", price: 1200, beds: "1 King Bed", guests: 4, size: "1,200 sq.ft", view: "Panoramic City", status: "Available" },
  { type: "Ocean Villa", price: 850, beds: "1 King Bed", guests: 2, size: "950 sq.ft", view: "Ocean Front", status: "Occupied" },
  { type: "Executive Penthouse", price: 950, beds: "2 King Beds", guests: 4, size: "1,100 sq.ft", view: "City Skyline", status: "Available" },
  { type: "Garden Suite", price: 650, beds: "1 Queen Bed", guests: 2, size: "750 sq.ft", view: "Garden View", status: "Available" },
  { type: "Deluxe Studio", price: 450, beds: "1 Double Bed", guests: 2, size: "550 sq.ft", view: "Pool View", status: "Occupied" },
  { type: "Luxury Suite", price: 750, beds: "1 King Bed", guests: 3, size: "850 sq.ft", view: "Mountain View", status: "Available" },
  { type: "Family Room", price: 550, beds: "2 Queen Beds", guests: 5, size: "900 sq.ft", view: "City View", status: "Maintenance" },
  { type: "Classic Room", price: 300, beds: "1 Double Bed", guests: 2, size: "400 sq.ft", view: "Garden View", status: "Available" },
  { type: "Junior Suite", price: 500, beds: "1 King Bed", guests: 2, size: "600 sq.ft", view: "Pool View", status: "Available" },
  { type: "Corner Suite", price: 680, beds: "1 King Bed", guests: 3, size: "780 sq.ft", view: "Panoramic", status: "Occupied" },
  { type: "Duplex Suite", price: 1100, beds: "3 King Beds", guests: 6, size: "1,400 sq.ft", view: "Ocean View", status: "Available" },
  { type: "Heritage Room", price: 420, beds: "1 Queen Bed", guests: 2, size: "480 sq.ft", view: "Heritage Wing", status: "Available" },
];

function Rooms({ role = 'admin' }) {
  const navigate = useNavigate();
  const [expandedRoom, setExpandedRoom] = useState(null);
  const [filter, setFilter] = useState('all');
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const filteredRooms = roomData.filter(r => 
    filter === 'all' ? true : r.status.toLowerCase() === filter
  );

  const bgColors = {
    Available: 'bg-emerald-900/60 text-emerald-400 border border-emerald-700',
    Occupied: 'bg-red-900/60 text-red-400 border border-red-700',
    Maintenance: 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]',
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setBookingModal(true);
    setBookingSuccess(false);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    setBookingId('ORD-' + Math.floor(100000 + Math.random() * 900000));
    setBookingSuccess(true);
  };

  return (
    <div className="animate-fade-in bg-black min-h-screen text-white relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-[#d4af37] mb-1">
            {role === 'admin' ? 'Suite Management' : 'Our Suites'}
          </h1>
          <p className="text-gray-400 tracking-wide">
            {role === 'admin' 
              ? 'Manage availability, pricing, and room assignments.' 
              : 'Discover and book your perfect Dremore retreat.'}
          </p>
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          {/* Filter Tabs */}
          <div className="flex bg-[#111] rounded-lg p-1 text-sm font-bold border border-[#333]">
            {['all', 'available', 'occupied'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md capitalize tracking-wide transition-all ${
                  filter === f ? 'bg-[#d4af37] text-black shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {role === 'admin' && (
            <button className="bg-[#d4af37] text-black px-6 py-2.5 rounded font-bold tracking-widest uppercase hover:bg-white shadow-md transition-all text-sm">
              + Add Suite
            </button>
          )}
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room, index) => {
          const imgIndex = roomData.indexOf(room);
          return (
            <div
              key={index}
              className={`bg-[#111] rounded-xl overflow-hidden flex flex-col border border-[#333] group cursor-pointer transition-all duration-300 ${expandedRoom === index ? 'shadow-[0_0_15px_rgba(212,175,55,0.3)] -translate-y-1 ring-1 ring-[#d4af37]' : 'hover:-translate-y-1 hover:border-[#d4af37]'}`}
              onClick={() => setExpandedRoom(expandedRoom === index ? null : index)}
            >
              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={images.rooms[imgIndex % images.rooms.length]}
                  alt={room.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded text-xs font-bold tracking-wide ${bgColors[room.status]}`}>
                  {room.status}
                </div>
              </div>

              {/* Room Info */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-serif text-white mb-1">{room.type}</h3>
                <div className="flex items-center gap-3 text-gray-500 mb-3">
                  <FaWifi title="Free Wi-Fi" className="hover:text-[#d4af37] transition-colors" />
                  <FaTv title="Smart TV" className="hover:text-[#d4af37] transition-colors" />
                  <FaCoffee title="Coffee Maker" className="hover:text-[#d4af37] transition-colors" />
                </div>

                <div className="mt-auto pt-4 border-t border-[#333] flex justify-between items-center">
                  <div className="text-[#d4af37] font-serif font-bold text-xl">
                    ${room.price}<span className="text-xs font-sans font-normal text-gray-500"> / night</span>
                  </div>
                  <span className="text-xs text-gray-500 font-bold tracking-widest uppercase group-hover:text-[#d4af37] transition-colors">{expandedRoom === index ? 'Hide ↑' : 'Details ↓'}</span>
                </div>

                {/* Expanded Details */}
                {expandedRoom === index && (
                  <div className="mt-4 pt-4 border-t border-dashed border-[#444]">
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-5">
                      <div className="flex items-center gap-2"><FaBed className="text-[#d4af37]" /> {room.beds}</div>
                      <div className="flex items-center gap-2"><FaUserFriends className="text-[#d4af37]" /> Max {room.guests}</div>
                      <div className="text-gray-500"><span className="font-bold text-[#d4af37]">Size: </span>{room.size}</div>
                      <div className="text-gray-500"><span className="font-bold text-[#d4af37]">View: </span>{room.view}</div>
                    </div>
                    {room.status !== 'Maintenance' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleBookNow(room); }}
                          className="flex-1 bg-[#d4af37] text-black py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors">
                          Book Now
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
                <p className="text-gray-400 mb-6">Your room has been reserved.</p>
                <div className="bg-black border border-[#333] p-4 text-[#d4af37] font-bold tracking-widest mb-6">
                  Booking ID: {bookingId}
                </div>
                <button onClick={() => { setBookingModal(false); navigate('/'); }} className="bg-[#d4af37] text-black px-8 py-3 uppercase tracking-widest font-bold text-xs hover:bg-white transition-all">Close</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-[#d4af37] mb-2">Complete Booking</h2>
                <p className="text-gray-400 text-sm mb-6">You are booking: <strong className="text-white">{selectedRoom?.type}</strong></p>
                
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
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Quality</label>
                      <select className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]">
                        <option>Standard</option>
                        <option>Premium</option>
                        <option>Extra Premium</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Adults</label>
                      <input type="number" min="1" defaultValue="1" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Children (Opt)</label>
                      <input type="number" min="0" defaultValue="0" className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-1"><FaCalendarAlt className="text-[#d4af37]"/> Check-in Date</label>
                      <input type="date" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-1"><FaCalendarAlt className="text-[#d4af37]"/> Check-out Date</label>
                      <input type="date" required className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Time In (Optional)</label>
                      <input type="time" className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Time Out (Optional)</label>
                      <input type="time" className="w-full bg-black border border-[#333] text-white p-3 focus:outline-none focus:border-[#d4af37]" />
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

export default Rooms;