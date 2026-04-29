import React, { useState } from 'react';
import { FaUserCircle, FaBriefcase, FaIdBadge, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { images } from '../data/assets';

function Profile() {
  const roles = [
    { id: 'admin', name: 'Admin', icon: <FaCog />, desc: 'Full system access & settings' },
    { id: 'manager', name: 'Manager', icon: <FaBriefcase />, desc: 'Operations & reports view' },
    { id: 'hr', name: 'HR', icon: <FaIdBadge />, desc: 'Employee management access' },
    { id: 'staff', name: 'Staff', icon: <FaUserCircle />, desc: 'Basic functional access' }
  ];

  const [activeRole, setActiveRole] = useState('admin');

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and role permissions.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="px-8 pb-8 relative">
          <div className="-mt-16 mb-4 flex justify-between items-end">
            <img 
              src={images.profiles[0]} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white"
            />
            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-100 transition-colors">
              <FaSignOutAlt /> Logout
            </button>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800">System User</h2>
          <p className="text-gray-500 mb-6">Current Role: <span className="font-bold text-blue-600 uppercase">{activeRole}</span></p>

          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Switch Active Role Profile</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div 
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                  activeRole === role.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <div className={`p-3 rounded-full text-xl ${
                  activeRole === role.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {role.icon}
                </div>
                <div>
                  <h4 className={`font-bold ${activeRole === role.id ? 'text-blue-700' : 'text-gray-700'}`}>{role.name}</h4>
                  <p className="text-xs text-gray-500">{role.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Full Name</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50" defaultValue="System User" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Email Address</label>
            <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50" defaultValue="user@dreamorastays.com" />
          </div>
          <div className="md:col-span-2">
            <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;