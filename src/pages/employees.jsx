import React, { useState } from 'react';
import { images } from '../data/assets';
import { FaSearch, FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaTimesCircle, FaPlus } from 'react-icons/fa';

const employeeData = [
  { name: "Rajiv Menon", role: "Hotel Manager", dept: "Management", shift: "Morning", status: "Present", exp: "8 yrs", phone: "+91 98765 43210" },
  { name: "Priya Sharma", role: "Front Desk Receptionist", dept: "Front Office", shift: "Morning", status: "Present", exp: "3 yrs", phone: "+91 98765 43211" },
  { name: "Carlos Fernandez", role: "Executive Chef", dept: "F&B", shift: "Evening", status: "Present", exp: "12 yrs", phone: "+91 98765 43212" },
  { name: "Ananya Krishnan", role: "Housekeeping Supervisor", dept: "Housekeeping", shift: "Morning", status: "On Leave", exp: "5 yrs", phone: "+91 98765 43213" },
  { name: "James Wilson", role: "Concierge", dept: "Front Office", shift: "Night", status: "Present", exp: "4 yrs", phone: "+91 98765 43214" },
  { name: "Meera Nair", role: "HR Manager", dept: "HR", shift: "Morning", status: "Present", exp: "6 yrs", phone: "+91 98765 43215" },
];

const deptColors = {
  Management: 'bg-purple-100/60 text-purple-700 border border-purple-200',
  'Front Office': 'bg-blue-100/60 text-blue-700 border border-blue-200',
  'F&B': 'bg-amber-100/60 text-amber-700 border border-amber-200',
  Housekeeping: 'bg-teal-100/60 text-teal-700 border border-teal-200',
  HR: 'bg-pink-100/60 text-pink-700 border border-pink-200',
};

const shiftColors = {
  Morning: 'text-amber-600',
  Evening: 'text-blue-600',
  Night: 'text-indigo-600',
};

function Employees() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = employeeData.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  );

  const present = employeeData.filter(e => e.status === 'Present').length;
  const onLeave = employeeData.filter(e => e.status === 'On Leave').length;

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-800 mb-1">Staff Management</h1>
          <p className="text-gray-400 tracking-wide">Manage staff profiles, shifts, and attendance records.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search staff..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors w-56"
            />
          </div>
          <button className="bg-amber-600 text-white px-6 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-amber-500 shadow-md transition-all flex items-center gap-2">
            <FaPlus /> Add Staff
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Staff', value: employeeData.length, color: 'text-gray-800' },
          { label: 'Present Today', value: present, color: 'text-emerald-600' },
          { label: 'On Leave', value: onLeave, color: 'text-red-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 text-center">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">{s.label}</p>
            <h3 className={`text-4xl font-serif ${s.color}`}>{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((emp, index) => (
          <div
            key={index}
            onClick={() => setExpanded(expanded === index ? null : index)}
            className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 cursor-pointer hover:-translate-y-1 transition-transform group"
          >
            {/* Employee Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={images.employees[index % images.employees.length]}
                alt={emp.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-white font-serif text-lg leading-tight">{emp.name}</p>
                <p className="text-gray-300 text-xs tracking-wide">{emp.role}</p>
              </div>
              <div className="absolute top-3 right-3">
                {emp.status === 'Present' ? (
                  <FaCheckCircle className="text-emerald-400 text-xl drop-shadow" />
                ) : (
                  <FaTimesCircle className="text-red-400 text-xl drop-shadow" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wide ${deptColors[emp.dept] || 'bg-gray-100 text-gray-600'}`}>
                  {emp.dept}
                </span>
                <span className={`text-xs font-bold tracking-widest uppercase ${shiftColors[emp.shift]}`}>
                  <FaClock className="inline mr-1" />{emp.shift}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span className="font-medium">Experience</span>
                <span className="font-bold text-gray-700">{emp.exp}</span>
              </div>

              {/* Expanded */}
              {expanded === index && (
                <div className="mt-4 pt-4 border-t border-dashed border-gray-100 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaPhone className="text-amber-500/70" /> {emp.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaEnvelope className="text-amber-500/70" /> {emp.name.toLowerCase().replace(' ', '.')}@dreamora.com
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-amber-600 text-white py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-amber-500 transition-colors">
                      Edit Profile
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                      Payslip
                    </button>
                  </div>
                </div>
              )}

              {(!expanded || expanded !== index) && (
                <p className="text-xs text-center text-amber-500/70 font-bold tracking-widest uppercase mt-3">Click to expand</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employees;