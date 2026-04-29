import React, { useState } from 'react';
import { images } from '../data/assets';
import { FaSearch, FaPhone, FaEnvelope, FaHistory, FaStar, FaPlus } from 'react-icons/fa';

const guestData = [
  { name: "Emma Watson", stays: 8, lastVisit: "Oct 2023", room: "Presidential Suite", spend: "$9,600", status: "VIP", phone: "+1 234 567 1001", rating: 5 },
  { name: "John Doe", stays: 3, lastVisit: "Sep 2023", room: "Ocean Villa", spend: "$2,550", status: "Regular", phone: "+1 234 567 1002", rating: 4 },
  { name: "Sophia Patel", stays: 12, lastVisit: "Oct 2023", room: "Executive Penthouse", spend: "$11,400", status: "VIP", phone: "+1 234 567 1003", rating: 5 },
  { name: "Liam Johnson", stays: 1, lastVisit: "Aug 2023", room: "Classic Room", spend: "$300", status: "New", phone: "+1 234 567 1004", rating: 4 },
  { name: "Olivia Davis", stays: 5, lastVisit: "Sep 2023", room: "Garden Suite", spend: "$3,250", status: "Regular", phone: "+1 234 567 1005", rating: 4 },
  { name: "Noah Miller", stays: 20, lastVisit: "Oct 2023", room: "Luxury Suite", spend: "$15,000", status: "VIP", phone: "+1 234 567 1006", rating: 5 },
];

const statusStyle = {
  VIP: 'bg-amber-100/60 text-amber-700 border border-amber-300',
  Regular: 'bg-blue-100/60 text-blue-700 border border-blue-200',
  New: 'bg-emerald-100/60 text-emerald-700 border border-emerald-200',
};

function Guests() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = guestData.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-800 mb-1">Guest Directory</h1>
          <p className="text-gray-400 tracking-wide">View guest profiles, booking history, and loyalty status.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search guests..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors w-56"
            />
          </div>
          <button className="bg-amber-600 text-white px-6 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-amber-500 shadow-md transition-all flex items-center gap-2">
            <FaPlus /> Add Guest
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Guests', value: guestData.length },
          { label: 'VIP Members', value: guestData.filter(g => g.status === 'VIP').length },
          { label: 'New This Month', value: guestData.filter(g => g.status === 'New').length },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 text-center">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">{s.label}</p>
            <h3 className="text-4xl font-serif text-gray-800">{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Guest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((guest, index) => (
          <div
            key={index}
            onClick={() => setExpanded(expanded === index ? null : index)}
            className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform group"
          >
            {/* Card Top */}
            <div className="relative h-20 bg-gradient-to-r from-gray-800 to-gray-900">
              <div className="absolute -bottom-10 left-6">
                <img
                  src={images.guests[index % images.guests.length]}
                  alt={guest.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded text-xs font-bold tracking-wide ${statusStyle[guest.status]}`}>
                  {guest.status}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="pt-14 px-6 pb-6">
              <h3 className="text-xl font-serif text-gray-800 mb-1">{guest.name}</h3>

              {/* Star Rating */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={`text-xs ${i < guest.rating ? 'text-amber-500' : 'text-gray-200'}`} />
                ))}
              </div>

              <div className="space-y-1.5 text-sm text-gray-500 mb-4">
                <div className="flex justify-between">
                  <span className="text-xs tracking-widest uppercase font-bold text-gray-400">Preferred Suite</span>
                  <span className="font-medium text-gray-700">{guest.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs tracking-widest uppercase font-bold text-gray-400">Total Stays</span>
                  <span className="font-bold text-gray-800">{guest.stays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs tracking-widest uppercase font-bold text-gray-400">Total Spend</span>
                  <span className="font-serif font-bold text-amber-600">{guest.spend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs tracking-widest uppercase font-bold text-gray-400">Last Visit</span>
                  <span className="font-medium text-gray-700">{guest.lastVisit}</span>
                </div>
              </div>

              {/* Expanded Actions */}
              {expanded === index && (
                <div className="mt-4 pt-4 border-t border-dashed border-gray-100 animate-fade-in space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaPhone className="text-amber-500/70" /> {guest.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaEnvelope className="text-amber-500/70" /> {guest.name.toLowerCase().replace(' ', '.')}@mail.com
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-amber-600 text-white py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-amber-500 transition-colors">
                      New Booking
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                      <FaHistory /> History
                    </button>
                  </div>
                </div>
              )}

              {!expanded || expanded !== index ? (
                <p className="text-xs text-center text-amber-500/70 font-bold tracking-widest uppercase mt-2">Click to expand</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guests;