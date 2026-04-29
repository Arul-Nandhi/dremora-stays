import React from 'react';
import { images } from '../data/assets';
import { FaBed, FaUsers, FaWallet, FaCalendarCheck } from 'react-icons/fa';

function Dashboard({ role = 'admin' }) {
  const realNames = ["Emma Watson", "John Doe", "Sophia Patel", "Liam Johnson"];
  
  const stats = [
    { title: "Total Bookings", value: "1,284", icon: <FaCalendarCheck />, color: "bg-blue-500" },
    { title: "Available Rooms", value: "42", icon: <FaBed />, color: "bg-green-500" },
    { title: "Active Guests", value: "312", icon: <FaUsers />, color: "bg-purple-500" },
    { title: "Today's Revenue", value: "$8,450", icon: <FaWallet />, color: "bg-yellow-500" }
  ];

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-48 shadow-lg">
        <img 
          src={images.banners[0]} 
          alt="Dashboard Banner" 
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-10">
          <h1 className="text-4xl font-serif text-white mb-2 drop-shadow-md">
            {role === 'admin' ? 'Welcome back, Administrator' : 'Welcome to Dreamora, Guest'}
          </h1>
          <p className="text-gray-200 font-light tracking-wide">
            {role === 'admin' ? "Here's your comprehensive daily overview." : "We're delighted to have you. Explore our offerings below."}
          </p>
        </div>
      </div>

      {/* Dashboard Content based on Role */}
      {role === 'admin' ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-between hover:-translate-y-1 transition-transform">
                <div>
                  <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-serif text-gray-800">{stat.value}</h3>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
              <h2 className="text-xl font-serif text-gray-800 mb-6">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100 text-xs uppercase tracking-widest">
                      <th className="pb-3 font-bold">Guest Name</th>
                      <th className="pb-3 font-bold">Suite</th>
                      <th className="pb-3 font-bold">Check In</th>
                      <th className="pb-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[0, 1, 2, 3].map((item) => (
                      <tr key={item} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 font-medium text-gray-800 flex items-center gap-4">
                          <img src={images.guests[item]} alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-amber-100" />
                          {realNames[item]}
                        </td>
                        <td className="py-4 text-gray-600 font-medium">Deluxe {item + 1}01</td>
                        <td className="py-4 text-gray-500">Oct {item + 10}, 2023</td>
                        <td className="py-4">
                          <span className="bg-green-100/50 text-green-700 border border-green-200 px-3 py-1 rounded text-xs font-bold tracking-wide">Confirmed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
              <h2 className="text-xl font-serif text-gray-800 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full bg-amber-50 text-amber-700 font-bold tracking-widest text-xs uppercase py-4 rounded hover:bg-amber-100 transition-colors text-left px-5 flex items-center justify-between border border-amber-100">
                  Create New Booking <span>→</span>
                </button>
                <button className="w-full bg-blue-50 text-blue-700 font-bold tracking-widest text-xs uppercase py-4 rounded hover:bg-blue-100 transition-colors text-left px-5 flex items-center justify-between border border-blue-100">
                  Manage Staff Schedule <span>→</span>
                </button>
                <button className="w-full bg-green-50 text-green-700 font-bold tracking-widest text-xs uppercase py-4 rounded hover:bg-green-100 transition-colors text-left px-5 flex items-center justify-between border border-green-100">
                  Financial Report <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 group cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img src={images.rooms[0]} alt="Rooms" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif text-gray-800 mb-2">Book a Suite</h3>
              <p className="text-gray-500 text-sm mb-4">Discover our collection of premium rooms and penthouses.</p>
              <button className="text-amber-600 font-bold text-xs tracking-widest uppercase hover:text-amber-700">Explore Rooms →</button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 group cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img src={images.restaurant[1]} alt="Dining" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif text-gray-800 mb-2">Fine Dining</h3>
              <p className="text-gray-500 text-sm mb-4">Reserve a table at our world-class signature restaurants.</p>
              <button className="text-amber-600 font-bold text-xs tracking-widest uppercase hover:text-amber-700">View Menus →</button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 group cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img src={images.events[0]} alt="Events" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif text-gray-800 mb-2">Host an Event</h3>
              <p className="text-gray-500 text-sm mb-4">From weddings to corporate conferences, we do it all.</p>
              <button className="text-amber-600 font-bold text-xs tracking-widest uppercase hover:text-amber-700">Inquire Now →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;