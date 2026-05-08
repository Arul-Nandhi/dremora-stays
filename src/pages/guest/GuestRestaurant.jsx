import React, { useState } from 'react';
import { images } from '../../data/assets';
import { FaUtensils, FaCheck, FaUsers, FaCalendarAlt, FaClock } from 'react-icons/fa';

const TABLE_TYPES = [
  { id: 'standard',  label: 'Standard Dining',   seats: '2 Guests',     desc: 'Elegant table in our main dining hall.',           icon: '🍽' },
  { id: 'family',    label: 'Family Dining',      seats: '4–6 Guests',   desc: 'Spacious family table with extra seating.',        icon: '👨‍👩‍👧' },
  { id: 'window',    label: 'Premium Window',     seats: '2 Guests',     desc: 'Romantic window-side table with garden views.',    icon: '🪟' },
  { id: 'private',   label: 'Private Dining',     seats: 'Up to 10',     desc: 'Exclusive private room for intimate gatherings.',  icon: '🔒' },
  { id: 'rooftop',   label: 'Rooftop Terrace',    seats: '2–4 Guests',   desc: 'Open-air rooftop dining under the stars.',        icon: '🌙' },
  { id: 'bar',       label: 'Bar Lounge',         seats: '2–3 Guests',   desc: 'Sophisticated bar seating with cocktail menu.',   icon: '🍸' },
];

const TIME_SLOTS = [
  '07:00','08:00','09:00','10:00','11:00','12:00',
  '13:00','14:00','15:00','16:00','17:00','18:00',
  '19:00','20:00','21:00','22:00','23:00',
];

function GuestRestaurant() {
  const [tableType, setTableType] = useState('standard');
  const [form, setForm]           = useState({ name: '', phone: '', guests: '2', date: '', time: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Please enter your name.';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number.';
    if (!form.date)         e.date  = 'Please select a date.';
    if (!form.time)         e.time  = 'Please select a time slot.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name:'', phone:'', guests:'2', date:'', time:'', notes:'' }); setTableType('standard'); }, 5000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      {/* Hero */}
      <div className="page-hero relative">
        <div className="absolute inset-0 z-0">
          <img src={images.restaurant[0]} alt="Dining" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 text-center">
          <span className="section-label mb-4 block">Culinary Excellence</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">Reserve a Table</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto text-sm">
            Select your preferred dining experience and we will make it extraordinary.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* ── Step 1: Table Type ── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-full bg-[#d4af37] text-black text-sm font-bold flex items-center justify-center">1</span>
            <div>
              <h2 className="font-serif text-white text-xl">Select Your Table</h2>
              <p className="text-gray-500 text-xs mt-0.5">Choose your preferred dining experience</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TABLE_TYPES.map(t => (
              <div
                key={t.id}
                onClick={() => setTableType(t.id)}
                className={`glass-card rounded-xl p-5 cursor-pointer transition-all duration-300 border ${
                  tableType === t.id
                    ? 'border-[#d4af37] bg-[#d4af37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                    : 'border-[#222] hover:border-[#d4af37]/50'
                }`}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <h4 className="font-serif text-white text-sm mb-1">{t.label}</h4>
                <p className="text-[#d4af37] text-xs font-bold mb-1.5">{t.seats}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
                {tableType === t.id && (
                  <div className="mt-3 flex items-center gap-1.5 text-[#d4af37] text-xs font-bold">
                    <FaCheck className="text-[9px]" /> Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Step 2: Reservation Form ── */}
        <div className="glass-card rounded-xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-full bg-[#d4af37] text-black text-sm font-bold flex items-center justify-center">2</span>
            <div>
              <h2 className="font-serif text-white text-xl">Reservation Details</h2>
              <p className="text-gray-500 text-xs mt-0.5">Fill in your details and we will confirm within 30 minutes</p>
            </div>
          </div>

          {/* Success banner */}
          {submitted && (
            <div className="mb-6 p-4 border border-[#d4af37]/50 bg-[#d4af37]/10 rounded-sm text-[#d4af37] text-sm flex items-center gap-3">
              <FaCheck /> Your reservation has been submitted! We will contact you to confirm shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Full Name *</label>
              <input
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Your full name"
                className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Phone Number *</label>
              <input
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Guests */}
            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">
                <FaUsers className="inline mr-1 text-[9px]" />Number of Guests *
              </label>
              <select
                value={form.guests}
                onChange={e => setForm({...form, guests: e.target.value})}
                className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                {['1','2','3','4','5','6','7','8','9','10+'].map(n => (
                  <option key={n} value={n}>{n} {n === '1' ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">
                <FaCalendarAlt className="inline mr-1 text-[9px]" />Date *
              </label>
              <input
                type="date"
                min={today}
                value={form.date}
                onChange={e => setForm({...form, date: e.target.value})}
                className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">
                <FaClock className="inline mr-1 text-[9px]" />Preferred Time *
              </label>
              <select
                value={form.time}
                onChange={e => setForm({...form, time: e.target.value})}
                className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="">Select a time</option>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
            </div>

            {/* Selected table */}
            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Selected Table Type</label>
              <div className="w-full bg-[#0a0a0a] border border-[#d4af37]/30 text-[#d4af37] px-4 py-3 rounded-sm text-sm font-bold">
                {TABLE_TYPES.find(t => t.id === tableType)?.label} — {TABLE_TYPES.find(t => t.id === tableType)?.seats}
              </div>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Special Requests</label>
              <textarea
                value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})}
                rows={3}
                placeholder="Dietary requirements, allergies, special occasions, seating preferences..."
                className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button type="submit" className="gold-btn w-full py-4 rounded-sm text-sm flex items-center justify-center gap-2">
                <FaUtensils className="text-xs" /> Confirm Reservation
              </button>
              <p className="text-center text-gray-600 text-xs mt-3">We confirm all reservations within 30 minutes via phone</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GuestRestaurant;
