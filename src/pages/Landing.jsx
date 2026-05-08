import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../data/assets';
import { FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaQuoteLeft, FaClock, FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaTimes, FaPen, FaBed, FaUtensils, FaGlassMartini, FaConciergeBell, FaSpa, FaShieldAlt, FaUsers } from 'react-icons/fa';
import GuestNavbar from '../components/GuestNavbar';
import Footer from '../components/Footer';

// ── Food Menu Data — 20 signature dishes ──────────────
const FOOD_MENU = [
  { name: 'Beef Wellington',                    category: 'Grill',       price: '₹3,800', desc: 'Premium beef tenderloin wrapped in duxelles and golden puff pastry — a timeless British classic.', img: images.food[0] },
  { name: 'Salmon Prawn Risotto',               category: 'Seafood',     price: '₹2,100', desc: 'Creamy arborio risotto with pan-seared salmon and tiger prawns in a saffron bisque.', img: images.food[1] },
  { name: 'Saltfish and Ackee',                 category: 'Caribbean',   price: '₹1,600', desc: "Jamaica's national dish — salted codfish with ackee, Scotch bonnet peppers and thyme.", img: images.food[2] },
  { name: 'Beef Bourguignon',                   category: 'French',      price: '₹2,800', desc: 'Slow-braised Burgundy beef with pearl onions, mushrooms and smoky lardons in red wine.', img: images.food[3] },
  { name: 'Fish Stew with Rouille',             category: 'Mediterranean', price: '₹1,900', desc: 'Provençal fish stew with saffron broth, toasted croutons and golden rouille.', img: images.food[4] },
  { name: 'Cajun Spiced Fish Tacos',            category: 'Fusion',      price: '₹1,200', desc: 'Crispy cajun fish in corn tortillas with avocado crema, slaw and pickled jalapeños.', img: images.food[5] },
  { name: 'Baked Salmon with Fennel & Tomatoes', category: 'Seafood',    price: '₹2,400', desc: 'Atlantic salmon baked en papillote with caramelised fennel and cherry tomatoes.', img: images.food[6] },
  { name: 'Beef Brisket Pot Roast',             category: 'Grill',       price: '₹3,200', desc: 'Low-and-slow braised beef brisket with root vegetables in a rich veal jus.', img: images.food[7] },
  { name: 'Seafood Fideuà',                     category: 'Mediterranean', price: '₹2,600', desc: 'Spanish noodle paella with mussels, clams, squid and prawns in a smoky sofrito base.', img: images.food[8] },
  { name: 'Steak Diane',                        category: 'Grill',       price: '₹3,600', desc: 'Pan-seared tenderloin flambéed with cognac, finished in a mushroom cream sauce.', img: images.food[9] },
  { name: 'Toad In The Hole',                   category: 'British',     price: '₹1,400', desc: 'Gourmet sausages nestled in golden Yorkshire pudding batter with onion gravy.', img: images.food[10] },
  { name: 'Apple & Blackberry Crumble',         category: 'Dessert',     price: '₹680',   desc: 'Warm spiced apple and blackberry beneath buttery oat crumble with clotted cream.', img: images.food[11] },
  { name: 'Chocolate Soufflé',                  category: 'Dessert',     price: '₹780',   desc: 'Ethereal dark chocolate soufflé, silky inside, served with vanilla crème anglaise.', img: images.food[12] },
  { name: 'Blackberry Fool',                    category: 'Dessert',     price: '₹580',   desc: 'Fresh blackberry compote folded into whipped Chantilly cream with crushed meringue.', img: images.food[13] },
  { name: 'Three-Cheese Soufflés',              category: 'Vegetarian',  price: '₹920',   desc: 'Individual gruyère, parmesan and aged cheddar soufflés — golden and risen to perfection.', img: images.food[14] },
  { name: 'Classic Pancakes',                   category: 'Breakfast',   price: '₹480',   desc: 'Golden buttermilk pancake stack with maple syrup, fresh berries and whipped butter.', img: images.food[15] },
  { name: 'Banana Pancakes with Syrup',         category: 'Breakfast',   price: '₹520',   desc: 'Fluffy pancakes with caramelised banana and warm toffee-banana syrup drizzle.', img: images.food[16] },
  { name: 'Creamy Tomato Soup',                 category: 'Soups',       price: '₹420',   desc: 'Slow-roasted vine tomato velouté with basil oil, grilled sourdough and crème fraîche.', img: images.food[17] },
  { name: 'Thai Green Curry',                   category: 'Asian',       price: '₹1,100', desc: 'Aromatic coconut green curry with kaffir lime leaves and fragrant jasmine rice.', img: images.food[18] },
  { name: 'Peach & Blueberry Grunt',            category: 'Dessert',     price: '₹640',   desc: 'Warm peach and blueberry grunt with drop dumplings in cast iron, served with ice cream.', img: images.food[19] },
];

// ── Hall Data ───────────────────────────────────────────
const HALLS_DATA = [
  { name: 'Grand Banquet Hall A', capacity: '500 Guests', price: '₹5,00,000 / day', desc: 'Our flagship celebration space for grand weddings and gala dinners with world-class AV.', img: images.events[0] },
  { name: 'Royal Banquet Hall',   capacity: '400 Guests', price: '₹4,50,000 / day', desc: 'Regal crystal chandeliers, ornate décor and a grand stage — perfect for royal occasions.', img: images.events[1] },
  { name: 'Crystal Banquet Hall', capacity: '250 Guests', price: '₹3,00,000 / day', desc: 'Intimate banquet setting with bespoke table arrangements and dedicated event planners.', img: images.events[2] },
];

const SEED_REVIEWS = [
  { name: 'Arjun Mehta',   role: 'Business Traveler', img: images.guests[0], rating: 5,   text: 'An extraordinary experience from check-in to checkout. The attention to detail and personalised service made my business trip feel like a luxury retreat.' },
  { name: 'Priya Sharma',  role: 'Honeymoon Guest',   img: images.guests[1], rating: 5,   text: 'Our honeymoon at Dremore Stays was nothing short of magical. The ambiance, the cuisine, and the spa — everything was absolutely perfect.' },
  { name: 'David Laurent', role: 'Family Vacation',   img: images.guests[2], rating: 4.5, text: 'We travelled with our kids and the staff went above and beyond to make everyone comfortable. The rooms were spacious and the pool area was fantastic.' },
  { name: 'Sneha Iyer',    role: 'Weekend Getaway',   img: images.guests[3], rating: 5,   text: 'From the grand lobby to the rooftop lounge, every corner of Dremore Stays exudes elegance. I have already booked my next visit!' },
  { name: 'Rajesh Nair',   role: 'Corporate Event',   img: images.guests[4], rating: 4.5, text: 'We hosted our annual conference here and the banquet facilities were world-class. The AV setup and catering exceeded all expectations.' },
  { name: 'Ananya Reddy',  role: 'Solo Traveler',     img: images.guests[5], rating: 5,   text: 'As a solo traveler, safety and comfort are my priorities. Dremore delivered on both, plus the restaurant serves the best biryani I have ever had!' },
];

function StarRatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="star-rating-input flex gap-1 text-2xl">
      {[1,2,3,4,5].map(n => (
        <span key={n} className={`star cursor-pointer transition-all ${(hovered || value) >= n ? 'filled' : ''}`}
          onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(0)} onClick={() => onChange(n)}>
          {(hovered || value) >= n ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOK NOW SECTION — 3 premium booking experience cards
   ═══════════════════════════════════════════════════════════ */
function BookNowSection() {
  const options = [
    {
      icon: <FaUtensils />, label: 'Reserve a Table', to: '/guest/restaurant',
      img: images.restaurant[0],
      title: 'Signature Dining',
      desc: 'Five restaurants serving global and regional cuisines prepared by our executive chefs.',
      detail: 'Open 07:00 — 23:00 daily',
      cta: 'Reserve a Table',
    },
    {
      icon: <FaBed />, label: 'Book Suites', to: '/guest/rooms',
      img: images.rooms[0],
      title: 'Luxury Suites & Rooms',
      desc: '12 curated room types from classic elegance to presidential grandeur. Experience unmatched comfort.',
      detail: 'Starting from ₹8,500 / night',
      cta: 'Book Suites',
    },
    {
      icon: <FaGlassMartini />, label: 'Book a Hall', to: '/guest/events',
      img: images.events[0],
      title: 'Grand Banquet Halls',
      desc: 'World-class venues for weddings, galas and corporate conferences — seating 50 to 500 guests.',
      detail: 'Starting from ₹3,00,000 / day',
      cta: 'Reserve a Hall',
    },
  ];
  return (
    <div id="book-now" className="py-24 bg-[#050505] border-y border-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block">Plan Your Stay</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">Book Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {options.map((opt, i) => (
            <div key={i} className="glass-card card-shine rounded-xl overflow-hidden group flex flex-col stagger-item">
              <div className="relative h-52 overflow-hidden">
                <img src={opt.img} alt={opt.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 border border-[#d4af37]/30 rounded-sm px-3 py-1.5">
                  <span className="text-[#d4af37] text-xs">{opt.icon}</span>
                  <span className="text-white text-[11px] font-bold tracking-wide uppercase">{opt.label}</span>
                </div>
                <p className="absolute bottom-3 left-4 text-[#d4af37] font-bold text-sm">{opt.detail}</p>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-white text-xl mb-2 group-hover:text-[#d4af37] transition-colors">{opt.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-5">{opt.desc}</p>
                <Link to={opt.to} className="gold-btn block text-center py-3 rounded-sm text-xs">{opt.cta}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ORDER FOOD SECTION — 20 signature dishes with category filter
   ═══════════════════════════════════════════════════════════ */
function OrderFoodSection() {
  const categories = ['All', ...Array.from(new Set(FOOD_MENU.map(f => f.category)))];
  const [active, setActive] = useState('All');
  const [orderModal, setOrderModal] = useState(null);

  const filtered = active === 'All' ? FOOD_MENU : FOOD_MENU.filter(f => f.category === active);

  return (
    <div id="order-food" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Culinary Excellence</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-3">Order Food</h2>
          <p className="text-gray-500 font-light max-w-xl mx-auto text-sm">
            Signature dishes crafted by our executive chefs — available for dine-in, in-room service and takeaway.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border transition-all duration-200 ${
                active === cat ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-[#333] text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]'
              }`}>{cat}</button>
          ))}
        </div>

        {/* Food grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <div key={item.name} className="food-gallery-card glass-card flex flex-col overflow-hidden rounded-xl group stagger-item">
              <div className="relative h-44 overflow-hidden">
                <img src={item.img} alt={item.name}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#d4af37]/90 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">{item.category}</span>
                <span className="absolute bottom-3 right-3 text-[#d4af37] font-bold text-sm">{item.price}</span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="font-serif text-white text-sm mb-1.5 group-hover:text-[#d4af37] transition-colors leading-snug">{item.name}</h4>
                <p className="text-gray-500 text-xs leading-relaxed flex-grow mb-4">{item.desc}</p>
                <button onClick={() => setOrderModal(item)}
                  className="gold-btn w-full py-2.5 rounded-sm text-[10px]">Order Now</button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/guest/foods" className="gold-outline-btn inline-block px-10 py-3.5 rounded-sm text-xs">
            View Full Menu &amp; Reserve a Table
          </Link>
        </div>
      </div>

      {/* Order confirmation modal */}
      {orderModal && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOrderModal(null)}>
          <div className="modal-content rounded-xl w-full max-w-sm relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="h-40 overflow-hidden">
              <img src={orderModal.img} alt={orderModal.name} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="p-6">
              <button onClick={() => setOrderModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"><FaTimes size={16} /></button>
              <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest">{orderModal.category}</span>
              <h3 className="font-serif text-white text-xl mt-1 mb-2">{orderModal.name}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">{orderModal.desc}</p>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[#d4af37] font-bold text-lg">{orderModal.price}</span>
                <span className="text-gray-500 text-xs">per serving</span>
              </div>
              <Link to="/guest/foods" className="gold-btn block text-center py-3 rounded-sm text-xs w-full">
                View Full Food Menu
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Landing() {
  const [reviews, setReviews]             = useState(SEED_REVIEWS);
  const [reviewModal, setReviewModal]     = useState(false);
  const [reviewForm, setReviewForm]       = useState({ name: '', role: '', rating: 0, text: '' });
  const [reviewError, setReviewError]     = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim())  return setReviewError('Please enter your name.');
    if (reviewForm.rating === 0)  return setReviewError('Please select a star rating.');
    if (!reviewForm.text.trim())  return setReviewError('Please write your review.');
    setReviews(prev => [{ name: reviewForm.name, role: reviewForm.role || 'Valued Guest', img: images.guests[Math.floor(Math.random() * images.guests.length)], rating: reviewForm.rating, text: reviewForm.text }, ...prev]);
    setReviewSuccess(true);
    setTimeout(() => { setReviewModal(false); setReviewSuccess(false); setReviewForm({ name:'', role:'', rating:0, text:'' }); setReviewError(''); }, 1800);
  };

  const SERVICES = [
    { icon: <FaBed />, title: 'Luxury Suites', desc: '12 curated room types from classic elegance to presidential grandeur.' },
    { icon: <FaUtensils />, title: 'Fine Dining', desc: 'Five signature restaurants serving global and regional cuisines.' },
    { icon: <FaGlassMartini />, title: 'Banquet & Events', desc: 'World-class venues for weddings, conferences and celebrations.' },
    { icon: <FaSpa />, title: 'Spa & Wellness', desc: 'Rejuvenating therapies and holistic wellness experiences.' },
    { icon: <FaConciergeBell />, title: '24/7 Concierge', desc: 'Dedicated concierge for personalized guest services.' },
    { icon: <FaShieldAlt />, title: 'Premium Security', desc: 'State-of-the-art security systems for your peace of mind.' },
  ];

  return (
    <div className="min-h-screen font-sans bg-black text-white">
      <GuestNavbar />

      {/* ═══ HERO ═══ */}
      <div className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={images.banners[1]} alt="Luxury Hero" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
        </div>
        <div className="relative z-10 max-w-5xl animate-fade-in-up">
          <div className="flex justify-center text-[#d4af37] mb-6 gap-2 text-lg">
            {[...Array(5)].map((_,i) => <FaStar key={i} />)}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif gold-gradient-text mb-6 leading-tight" style={{textDecoration:'none'}}>
            Stay Beyond Dreams
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled luxury at Dremora Stays. Exquisite rooms, world-class dining, and timeless hospitality — all in one destination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/guest/rooms" className="gold-btn px-10 py-4 rounded-sm text-sm">Explore Suites</Link>
            <a href="#about" className="gold-outline-btn px-10 py-4 rounded-sm text-sm">Discover More</a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#d4af37]/60 to-transparent" />
        </div>
      </div>

      {/* ═══ ABOUT ═══ */}
      <div id="about" className="py-28 bg-black text-center px-6">
        <div className="max-w-5xl mx-auto">
          <span className="section-label mb-6 block">Welcome To</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">DREMORA STAYS:<br/>The Soul of Hospitality</h2>
          <div className="section-divider w-24 mx-auto mb-8" />
          <p className="text-gray-400 leading-relaxed mb-10 font-light text-lg max-w-3xl mx-auto">
            At Dremora Stays, every detail speaks of warmth, creating a unique combination of traditional hospitality and modern conveniences. From opulent accommodations and exquisite dining to versatile event spaces and serene spas, each experience reflects our commitment to heartfelt hospitality.
          </p>
          <a href="#services" className="text-white border-b border-[#d4af37] pb-1 uppercase tracking-widest text-sm font-semibold hover:text-[#d4af37] transition-colors">
            Explore Our Services
          </a>
        </div>
      </div>

      {/* ═══ SERVICES ═══ */}
      <div id="services" className="py-24 bg-[#050505] border-y border-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="glass-card card-shine p-8 text-center group stagger-item">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#d4af37]/20 bg-[#0a0a0a] flex items-center justify-center text-[#d4af37] text-2xl group-hover:scale-110 group-hover:border-[#d4af37]/50 transition-all duration-300">
                  {s.icon}
                </div>
                <h3 className="text-lg font-serif text-white mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BOOK NOW CTA ═══ */}
      <div id="book-now" className="py-20 bg-[#050505] border-y border-[#111]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="section-label mb-4 block">Plan Your Stay</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Ready to Book?</h2>
          <p className="text-gray-500 font-light text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            Reserve a table at our signature restaurants, book a luxury suite, or plan your next grand event — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/guest/booking" className="gold-btn inline-flex items-center gap-2 px-10 py-4 rounded-sm text-sm">
              Book Now
            </Link>
            <Link to="/guest/foods" className="gold-outline-btn inline-flex items-center gap-2 px-10 py-4 rounded-sm text-sm">
              View Food Menu
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ ORDER FOOD ═══ */}
      <OrderFoodSection />

      {/* ═══ OFFERS ═══ */}
      <div id="offers" className="py-28 bg-[#080808] border-y border-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-6 block text-left before:hidden">✦ Special Deals</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white leading-tight">Unlock Irresistible<br/>Deals</h2>
              <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">
                We offer exclusive discounts on rooms, dining, beverages, and spa treatments. Whether it's a last-minute escape or an early booking, our special offers are designed to make your stay even more memorable.
              </p>
              <Link to="/guest/offers" className="gold-btn inline-block px-8 py-3.5 rounded-sm text-sm">View All Offers</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg border border-[#1a1a1a]">
                <img src={images.rooms[2]} alt="Offer 1" className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="overflow-hidden rounded-lg border border-[#1a1a1a] mt-8">
                <img src={images.restaurant[1]} alt="Offer 2" className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ REVIEWS ═══ */}
      <div id="reviews" className="py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">What Our Guests Say</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Reviews & Testimonials</h2>
            <button onClick={() => { setReviewModal(true); setReviewSuccess(false); setReviewError(''); }}
              className="gold-outline-btn inline-flex items-center gap-2 px-7 py-3 text-xs">
              <FaPen className="text-[10px]" /> Write a Review
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, i) => (
              <div key={i} className="review-card rounded-xl p-7 flex flex-col stagger-item">
                <FaQuoteLeft className="text-[#d4af37]/20 text-2xl mb-4" />
                <p className="text-gray-400 font-light leading-relaxed mb-6 flex-1 text-sm">{review.text}</p>
                <div className="flex items-center gap-4 pt-5 border-t border-[#1a1a1a]">
                  <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]/30" />
                  <div className="flex-1">
                    <h6 className="text-white font-semibold text-sm">{review.name}</h6>
                    <span className="text-gray-600 text-xs">{review.role}</span>
                  </div>
                  <div className="flex gap-0.5 text-[#d4af37] text-xs">
                    {Array.from({ length: 5 }, (_, s) => {
                      if (s < Math.floor(review.rating)) return <FaStar key={s} />;
                      if (s < review.rating) return <FaStarHalfAlt key={s} />;
                      return <FaRegStar key={s} />;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ REVIEW MODAL ═══ */}
      {reviewModal && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setReviewModal(false)}>
          <div className="modal-content rounded-xl p-8 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setReviewModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><FaTimes size={18} /></button>
            {reviewSuccess ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🌟</div>
                <h3 className="text-2xl font-serif text-[#d4af37] mb-2">Thank You!</h3>
                <p className="text-gray-400 text-sm">Your review has been published.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-serif text-[#d4af37] mb-1">Share Your Experience</h3>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">Dremora Stays — Guest Review</p>
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs uppercase tracking-widest mb-1.5 block font-semibold">Your Name *</label>
                      <input type="text" value={reviewForm.name} onChange={e => setReviewForm(p => ({...p, name: e.target.value}))} placeholder="John Doe" className="contact-input w-full px-4 py-2.5 rounded-sm text-sm" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs uppercase tracking-widest mb-1.5 block font-semibold">Stay Type</label>
                      <input type="text" value={reviewForm.role} onChange={e => setReviewForm(p => ({...p, role: e.target.value}))} placeholder="e.g. Honeymoon" className="contact-input w-full px-4 py-2.5 rounded-sm text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block font-semibold">Your Rating *</label>
                    <StarRatingInput value={reviewForm.rating} onChange={v => setReviewForm(p => ({...p, rating: v}))} />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1.5 block font-semibold">Your Review *</label>
                    <textarea rows="4" value={reviewForm.text} onChange={e => setReviewForm(p => ({...p, text: e.target.value}))} placeholder="Tell us about your stay..." className="contact-input w-full px-4 py-2.5 rounded-sm text-sm resize-none" />
                  </div>
                  {reviewError && <p className="text-red-400 text-xs font-semibold">{reviewError}</p>}
                  <button type="submit" className="gold-btn w-full py-3 rounded-sm text-sm tracking-widest">Submit Review</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ CONTACT ═══ */}
      <div id="contact" className="py-28 bg-[#080808] border-y border-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Contact Us</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="contact-glass rounded-xl p-8 md:p-10">
              <h4 className="text-xl font-serif text-[#d4af37] mb-6">Send Us a Message</h4>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block font-semibold">Your Name</label>
                    <input type="text" placeholder="John Doe" className="contact-input w-full px-4 py-3 rounded-sm text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block font-semibold">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="contact-input w-full px-4 py-3 rounded-sm text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block font-semibold">Subject</label>
                  <input type="text" placeholder="How can we help?" className="contact-input w-full px-4 py-3 rounded-sm text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block font-semibold">Message</label>
                  <textarea rows="5" placeholder="Tell us about your inquiry..." className="contact-input w-full px-4 py-3 rounded-sm text-sm resize-none" />
                </div>
                <button type="submit" className="gold-btn px-8 py-3.5 rounded-sm text-sm tracking-widest w-full md:w-auto">Send Message</button>
              </form>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: <FaMapMarkerAlt />, title: 'Our Location', info: '431, Palladam, Coimbatore — 641401, Tamil Nadu, India' },
                { icon: <FaPhoneAlt />,     title: 'Call Us',       info: '+91 6346 961 630' },
                { icon: <FaEnvelope />,     title: 'Email Us',      info: 'info@dremorestays.com' },
                { icon: <FaClock />,        title: 'Working Hours', info: '24 / 7 — Front Desk Always Available' },
              ].map((item, i) => (
                <div key={i} className="contact-glass rounded-xl p-5 flex items-start gap-4 group hover:border-[#d4af37]/40 transition-all">
                  <span className="text-[#d4af37] text-lg mt-1 shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <div>
                    <h6 className="text-white font-semibold text-sm mb-1">{item.title}</h6>
                    <p className="text-gray-400 text-sm font-light">{item.info}</p>
                  </div>
                </div>
              ))}
              <div className="contact-glass rounded-xl p-6 mt-auto">
                <h6 className="text-white font-semibold text-sm mb-4">Follow Us</h6>
                <div className="flex gap-4">
                  {[
                    { icon: <FaInstagram />, label: 'Instagram' },
                    { icon: <FaFacebookF />, label: 'Facebook' },
                    { icon: <FaTwitter />,   label: 'Twitter' },
                    { icon: <FaLinkedinIn />,label: 'LinkedIn' },
                  ].map((s, i) => (
                    <a key={i} href="#" aria-label={s.label}
                       className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300 text-sm hover:-translate-y-0.5">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Map */}
          <div className="mt-12 map-embed h-64 flex items-center justify-center bg-[#0a0a0a]">
            <div className="text-center">
              <FaMapMarkerAlt className="text-[#d4af37]/30 text-4xl mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-light">Interactive Map — 431, Palladam, Coimbatore</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
