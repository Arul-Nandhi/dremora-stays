import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../data/assets';
import { FaUser, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';

function Login({ setRole }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Authorization Logic
    const userEmail = email.toLowerCase();
    
    if (userEmail.includes('admin')) {
      setRole('admin');
    } else {
      setRole('guest'); 
    }
    
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden font-sans">
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <img src={images.banners[3]} alt="Background" className="w-full h-full object-cover opacity-20 filter blur-sm grayscale" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-[#111]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-[#d4af37]/30 bg-[#0a0a0a]/80 backdrop-blur-2xl min-h-[600px]">
        
        {/* Left Side - Visual Branding */}
        <div className="hidden lg:flex w-1/2 relative p-16 flex-col justify-between border-r border-[#333]">
          <div>
            <img src={images.logo} alt="Logo" className="h-16 w-auto mb-10" />
            <h1 className="text-5xl font-serif text-white leading-tight tracking-wide">
              The Soul of <br/><span className="text-[#d4af37] italic">Hospitality</span>
            </h1>
          </div>
          <div className="mt-12">
            <p className="text-gray-400 font-light tracking-wide text-lg border-l-2 border-[#d4af37] pl-6 py-2">
              Sign in to manage your reservations, explore exclusive suites, and tailor your ultimate getaway at DREMORE STAYS.
            </p>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative">
          
          {/* Toggle Login / Signup */}
          <div className="absolute top-10 right-10 flex gap-4 text-sm font-bold tracking-widest uppercase">
            <button 
              onClick={() => setIsLogin(true)}
              className={`transition-colors pb-1 border-b-2 ${isLogin ? 'text-[#d4af37] border-[#d4af37]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`transition-colors pb-1 border-b-2 ${!isLogin ? 'text-[#d4af37] border-[#d4af37]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-10 mt-10">
            <h2 className="text-3xl font-serif text-white mb-3">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="text-gray-500 text-sm tracking-wide">
              {isLogin 
                ? 'Enter your credentials to access your account.' 
                : 'Join DREMORE STAYS for an unforgettable experience.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37]" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#111] border border-[#333] text-white rounded-md pl-12 pr-4 py-3 focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37]" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] border border-[#333] text-white rounded-md pl-12 pr-4 py-3 focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600"
                  placeholder="user@dremorestays.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111] border border-[#333] text-white rounded-md pl-12 pr-4 py-3 focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                  <input type="checkbox" className="accent-[#d4af37] w-3 h-3" /> Remember me
                </label>
                <a href="#" className="text-xs text-[#d4af37] hover:text-white transition-colors">Forgot Password?</a>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full mt-8 bg-[#d4af37] text-black font-bold tracking-widest uppercase py-4 flex justify-center items-center gap-3 hover:bg-white transition-all rounded-sm shadow-lg"
            >
              {isLogin ? 'Sign In' : 'Create Account'} <FaArrowRight />
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Login;