import {
  FaHome,
  FaBed,
  FaCalendar,
  FaUsers,
  FaUtensils,
  FaMoneyBill,
  FaUserTie,
  FaChartBar,
  FaUser,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { images } from "../data/assets";

function Sidebar({ role, setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole('guest');
    navigate('/');
  };

  return (
    <div className="w-64 min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col border-r border-white/10 shadow-2xl">
      <div className="mb-10 text-center">
        <img src={images.logo} alt="Logo" className="h-16 mx-auto mb-4 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
        <h1 className="text-xl font-serif tracking-widest text-white">DREMORA</h1>
        <p className="text-xs text-amber-500 mt-2 tracking-[0.2em] uppercase font-bold bg-amber-500/10 py-1 rounded border border-amber-500/20">{role} Portal</p>
      </div>

      <ul className="space-y-2">
        <li>
          <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <FaHome className="text-amber-500/70 group-hover:text-amber-500 transition-colors" /> Dashboard
          </Link>
        </li>

          {/* Both Admin and User can see these */}
          <li><Link to="/rooms" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaBed className="text-amber-500/70 group-hover:text-amber-500" /> Suites</Link></li>
          <li><Link to="/bookings" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaCalendar className="text-amber-500/70 group-hover:text-amber-500" /> Bookings</Link></li>
          <li><Link to="/restaurant" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaUtensils className="text-amber-500/70 group-hover:text-amber-500" /> Restaurant</Link></li>
          <li><Link to="/food" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaUtensils className="text-amber-500/70 group-hover:text-amber-500" /> Food Gallery</Link></li>
          <li><Link to="/dj" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaCalendar className="text-amber-500/70 group-hover:text-amber-500" /> Events</Link></li>
          <li><Link to="/billing" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaMoneyBill className="text-amber-500/70 group-hover:text-amber-500" /> Billing</Link></li>

          {/* Admin Only Links */}
          {role === 'admin' && (
            <>
              <li><Link to="/guests" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaUsers className="text-amber-500/70 group-hover:text-amber-500" /> Guests</Link></li>
              <li><Link to="/employees" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaUserTie className="text-amber-500/70 group-hover:text-amber-500" /> Employees</Link></li>
              <li><Link to="/reports" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group"><FaChartBar className="text-amber-500/70 group-hover:text-amber-500" /> Reports</Link></li>
            </>
          )}

          <div className="pt-4 mt-4 border-t border-white/10">
            <li>
              <Link to="/profile" className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                <FaUser className="text-amber-500/70 group-hover:text-amber-500" /> Settings
              </Link>
            </li>
          </div>
        </ul>

      <div className="mt-auto pt-8">
        <button onClick={handleLogout} className="flex items-center justify-center gap-3 bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-all w-full py-3 rounded-lg text-sm font-bold tracking-widest uppercase border border-red-500/20">
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;