import React, { useState } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaKey, FaDownload } from 'react-icons/fa';

function Bookings({ role = 'admin' }) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-800">
            {role === 'admin' ? 'Booking Management' : 'My Reservations'}
          </h1>
          <p className="text-gray-500 mt-1">
            {role === 'admin' 
              ? 'Manage all reservations, check-ins, and check-outs across the property.'
              : 'View and manage your upcoming stays at Dreamora.'}
          </p>
        </div>
        <button className="bg-amber-600 text-white px-6 py-3 rounded font-bold tracking-widest uppercase hover:bg-amber-500 shadow-md transition-colors text-sm">
          {role === 'admin' ? '+ Create Booking' : 'Book a Suite'}
        </button>
      </div>

      {/* Tabs - Only for Admin */}
      {role === 'admin' && (
        <div className="flex gap-6 mb-6 border-b border-gray-200 pb-2">
          <button className={`font-semibold pb-2 text-sm tracking-wide ${activeTab === 'all' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-800'}`} onClick={() => setActiveTab('all')}>All Bookings</button>
          <button className={`font-semibold pb-2 text-sm tracking-wide ${activeTab === 'checkin' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-800'}`} onClick={() => setActiveTab('checkin')}>Arrivals (Check-in)</button>
          <button className={`font-semibold pb-2 text-sm tracking-wide ${activeTab === 'checkout' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-800'}`} onClick={() => setActiveTab('checkout')}>Departures (Check-out)</button>
        </div>
      )}

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 overflow-x-auto border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100 text-xs uppercase tracking-widest">
              <th className="pb-4 font-bold">Booking ID</th>
              {role === 'admin' && <th className="pb-4 font-bold">Guest Name</th>}
              <th className="pb-4 font-bold">Suite Details</th>
              <th className="pb-4 font-bold">Dates</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[1, 2, 3].map((item) => (
              <tr key={item} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 font-bold text-gray-800">#DREM-100{item}</td>
                {role === 'admin' && <td className="py-5 font-medium text-gray-700">Alexander Wright</td>}
                <td className="py-5 text-gray-600 font-medium">{item === 1 ? 'Presidential Suite' : 'Ocean Villa'}</td>
                <td className="py-5 text-gray-500">Oct {10+item} - Oct {14+item}, 2023</td>
                <td className="py-5">
                  {item % 2 !== 0 ? (
                    <span className="bg-green-100/50 text-green-700 border border-green-200 px-3 py-1 rounded text-xs font-bold tracking-wide">Confirmed</span>
                  ) : (
                    <span className="bg-amber-100/50 text-amber-700 border border-amber-200 px-3 py-1 rounded text-xs font-bold tracking-wide">Completed</span>
                  )}
                </td>
                <td className="py-5 text-right flex justify-end">
                  {role === 'admin' ? (
                    item % 2 !== 0 ? (
                      <button className="text-amber-600 font-bold flex items-center gap-2 hover:text-amber-800 text-xs uppercase tracking-widest"><FaKey /> Check-in</button>
                    ) : (
                      <button className="text-gray-400 font-bold flex items-center gap-2 hover:text-gray-600 text-xs uppercase tracking-widest"><FaCheckCircle /> Checked Out</button>
                    )
                  ) : (
                    <button className="text-gray-500 font-bold flex items-center gap-2 hover:text-amber-600 transition-colors text-xs uppercase tracking-widest"><FaDownload /> Itinerary</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;