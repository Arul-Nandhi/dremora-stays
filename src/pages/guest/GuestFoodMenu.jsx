import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../data/assets';
import { FaShoppingCart, FaTimes, FaCheck, FaMotorcycle, FaUtensils, FaConciergeBell, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const TABLES = [
  { id: 't1',  label: 'Table 01',    type: 'Standard',     seats: '2 Seats' },
  { id: 't2',  label: 'Table 02',    type: 'Window Dining', seats: '2 Seats' },
  { id: 't3',  label: 'Table 03',    type: 'Family Dining', seats: '4–6 Seats' },
  { id: 't4',  label: 'Table 04',    type: 'Standard',     seats: '2 Seats' },
  { id: 't5',  label: 'Table 05',    type: 'Standard',     seats: '2–4 Seats' },
  { id: 'vip', label: 'VIP Table',   type: 'Private VIP',  seats: 'Up to 6' },
  { id: 'fam', label: 'Family Hall', type: 'Family Hall',  seats: 'Up to 10' },
];

const parsePrice = (p) => parseInt(p.replace(/[^\d]/g, '')) || 0;

const FOOD_MENU = [
  { name: 'Beef Wellington',                     category: 'Grill',         price: '₹3,800', desc: 'Premium beef tenderloin wrapped in duxelles and golden puff pastry — a timeless British classic.', img: images.food[0] },
  { name: 'Salmon Prawn Risotto',                category: 'Seafood',       price: '₹2,100', desc: 'Creamy arborio risotto with pan-seared salmon and tiger prawns in a saffron bisque.', img: images.food[1] },
  { name: 'Saltfish and Ackee',                  category: 'Caribbean',     price: '₹1,600', desc: "Jamaica's national dish — salted codfish with ackee, Scotch bonnet peppers and thyme.", img: images.food[2] },
  { name: 'Beef Bourguignon',                    category: 'French',        price: '₹2,800', desc: 'Slow-braised Burgundy beef with pearl onions, mushrooms and smoky lardons in red wine.', img: images.food[3] },
  { name: 'Fish Stew with Rouille',              category: 'Mediterranean', price: '₹1,900', desc: 'Provençal fish stew with saffron broth, toasted croutons and golden rouille.', img: images.food[4] },
  { name: 'Cajun Spiced Fish Tacos',             category: 'Fusion',        price: '₹1,200', desc: 'Crispy cajun fish in corn tortillas with avocado crema, slaw and pickled jalapeños.', img: images.food[5] },
  { name: 'Baked Salmon with Fennel & Tomatoes', category: 'Seafood',       price: '₹2,400', desc: 'Atlantic salmon baked en papillote with caramelised fennel and cherry tomatoes.', img: images.food[6] },
  { name: 'Beef Brisket Pot Roast',              category: 'Grill',         price: '₹3,200', desc: 'Low-and-slow braised beef brisket with root vegetables in a rich veal jus.', img: images.food[7] },
  { name: 'Seafood Fideuà',                      category: 'Mediterranean', price: '₹2,600', desc: 'Spanish noodle paella with mussels, clams, squid and prawns in a smoky sofrito base.', img: images.food[8] },
  { name: 'Steak Diane',                         category: 'Grill',         price: '₹3,600', desc: 'Pan-seared tenderloin flambéed with cognac, finished in a mushroom cream sauce.', img: images.food[9] },
  { name: 'Toad In The Hole',                    category: 'British',       price: '₹1,400', desc: 'Gourmet sausages nestled in golden Yorkshire pudding batter with onion gravy.', img: images.food[10] },
  { name: 'Apple & Blackberry Crumble',          category: 'Dessert',       price: '₹680',   desc: 'Warm spiced apple and blackberry beneath a buttery oat crumble with clotted cream.', img: images.food[11] },
  { name: 'Chocolate Soufflé',                   category: 'Dessert',       price: '₹780',   desc: 'Ethereal dark chocolate soufflé, silky inside, served with vanilla crème anglaise.', img: images.food[12] },
  { name: 'Blackberry Fool',                     category: 'Dessert',       price: '₹580',   desc: 'Fresh blackberry compote folded into whipped Chantilly cream with crushed meringue.', img: images.food[13] },
  { name: 'Three-Cheese Soufflés',               category: 'Vegetarian',    price: '₹920',   desc: 'Individual gruyère, parmesan and aged cheddar soufflés — golden and risen to perfection.', img: images.food[14] },
  { name: 'Classic Pancakes',                    category: 'Breakfast',     price: '₹480',   desc: 'Golden buttermilk pancake stack with maple syrup, fresh berries and whipped butter.', img: images.food[15] },
  { name: 'Banana Pancakes with Syrup',          category: 'Breakfast',     price: '₹520',   desc: 'Fluffy pancakes with caramelised banana and warm toffee-banana syrup drizzle.', img: images.food[16] },
  { name: 'Creamy Tomato Soup',                  category: 'Soups',         price: '₹420',   desc: 'Slow-roasted vine tomato velouté with basil oil, grilled sourdough and crème fraîche.', img: images.food[17] },
  { name: 'Thai Green Curry',                    category: 'Asian',         price: '₹1,100', desc: 'Aromatic coconut green curry with kaffir lime leaves and fragrant jasmine rice.', img: images.food[18] },
  { name: 'Peach & Blueberry Grunt',             category: 'Dessert',       price: '₹640',   desc: 'Warm peach and blueberry grunt with drop dumplings in cast iron, served with ice cream.', img: images.food[19] },
];

function GuestFoodMenu() {
  const categories = ['All', ...Array.from(new Set(FOOD_MENU.map(f => f.category)))];
  const [mode, setMode]       = useState('dine');
  const [active, setActive]   = useState('All');
  const [cart, setCart]       = useState([]);
  const [orderForm, setOrderForm] = useState({ name:'', phone:'', address:'', guests:'2', time:'', notes:'' });
  const [submitted, setSubmitted] = useState(false);

  // Dine-in state
  const [dineTable, setDineTable]               = useState(null);
  const [dineCart, setDineCart]                 = useState([]);
  const [pendingItem, setPendingItem]           = useState(null);
  const [showTablePicker, setShowTablePicker]   = useState(false);
  const [showReserveForm, setShowReserveForm]   = useState(false);
  const [reserveForm, setReserveForm]           = useState({ name:'', guests:'2', date:'', time:'', notes:'' });
  const [dineSubmitted, setDineSubmitted]       = useState(false);

  const filtered   = active === 'All' ? FOOD_MENU : FOOD_MENU.filter(f => f.category === active);
  const addToCart  = (item) => setCart(prev => {
    const ex = prev.find(c => c.name === item.name);
    if (ex) return prev.map(c => c.name === item.name ? {...c, qty: c.qty+1} : c);
    return [...prev, {...item, qty:1}];
  });
  const cartTotal  = cart.reduce((s,i) => s+i.qty, 0);

  // Dine-in helpers
  const addToDineCart = (item, table) => {
    setDineTable(table);
    setDineCart(prev => {
      const ex = prev.find(c => c.name === item.name);
      if (ex) return prev.map(c => c.name === item.name ? {...c, qty:c.qty+1} : c);
      return [...prev, {...item, qty:1}];
    });
  };
  const handleAddToTable = (item) => {
    if (dineTable) addToDineCart(item, dineTable);
    else { setPendingItem(item); setShowTablePicker(true); }
  };
  const handleTableSelect = (table) => {
    setShowTablePicker(false);
    if (pendingItem) { addToDineCart(pendingItem, table); setPendingItem(null); }
  };
  const dineTotal    = dineCart.reduce((s,i) => s + parsePrice(i.price)*i.qty, 0);
  const dineTotalStr = `\u20b9${dineTotal.toLocaleString('en-IN')}`;

  const handleDineReserve = (e) => {
    e.preventDefault();
    setDineSubmitted(true);
    setTimeout(() => {
      setDineSubmitted(false); setDineCart([]); setDineTable(null);
      setReserveForm({ name:'', guests:'2', date:'', time:'', notes:'' });
      setShowReserveForm(false);
    }, 5000);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setCart([]);
    setTimeout(() => { setSubmitted(false); setOrderForm({ name:'', phone:'', address:'', guests:'2', time:'', notes:'' }); }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Hero */}
      <div className="page-hero relative">
        <div className="absolute inset-0 z-0">
          <img src={images.restaurant[0]} alt="Food" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 text-center">
          <span className="section-label mb-4 block">Culinary Excellence</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">Our Signature Menu</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto text-sm leading-relaxed">
            Masterfully crafted dishes — available for dine-in at our restaurants or delivered to your door.
          </p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-sm border border-[#d4af37]/20 overflow-hidden">
            <button
              onClick={() => setMode('dine')}
              className={`flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                mode === 'dine' ? 'bg-[#d4af37] text-black' : 'text-gray-400 hover:text-[#d4af37]'
              }`}
            >
              <FaUtensils className="text-sm" /> Dine In
            </button>
            <button
              onClick={() => setMode('delivery')}
              className={`flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                mode === 'delivery' ? 'bg-[#d4af37] text-black' : 'text-gray-400 hover:text-[#d4af37]'
              }`}
            >
              <FaMotorcycle className="text-sm" /> Home Delivery
            </button>
          </div>
        </div>

        {/* Mode description banner */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          {mode === 'dine' ? (
            <div className="glass-card rounded-xl p-5 border border-[#d4af37]/20">
              {dineTable ? (
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-[#d4af37] font-bold font-serif">{dineTable.label} — {dineTable.type}</p>
                    <p className="text-gray-400 text-xs mt-0.5">Add dishes below. Your order will be assigned to this table.</p>
                  </div>
                  <button onClick={() => { setDineTable(null); setDineCart([]); }} className="text-xs text-gray-500 hover:text-white border border-[#333] px-3 py-1.5 rounded-sm">Change Table</button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-white text-sm font-serif mb-1">Select a table to start ordering</p>
                  <p className="text-gray-500 text-xs mb-3">Click "Add to Table" on any dish — you'll be asked to pick a table.</p>
                  <button onClick={() => setShowTablePicker(true)} className="gold-outline-btn inline-block px-6 py-2 rounded-sm text-[10px]">
                    <FaConciergeBell className="inline mr-1" /> Choose a Table
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-5 border border-[#d4af37]/20">
              <p className="text-white text-sm font-serif mb-1">You are ordering for Home Delivery</p>
              <p className="text-gray-500 text-xs">Select your dishes, add them to your order, then fill in your delivery details below.</p>
            </div>
          )}
        </div>

        {/* Cart bar (delivery only) */}
        {mode === 'delivery' && cart.length > 0 && (
          <div className="glass-card rounded-xl p-4 mb-8 border border-[#d4af37]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-[#d4af37]" />
              <span className="text-white text-sm font-bold">{cartTotal} item{cartTotal !== 1 ? 's' : ''} in your order</span>
              <div className="hidden md:flex gap-2 flex-wrap">
                {cart.map(c => (
                  <span key={c.name} className="bg-[#1a1a1a] text-gray-300 text-xs px-2 py-1 rounded-sm">
                    {c.name} ×{c.qty}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={() => setCart([])} className="text-gray-500 hover:text-white text-xs">Clear</button>
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border transition-all duration-200 ${
                active === cat
                  ? 'bg-[#d4af37] text-black border-[#d4af37]'
                  : 'border-[#333] text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
          {filtered.map((item) => (
            <div key={item.name} className="food-gallery-card glass-card flex flex-col overflow-hidden rounded-xl group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.img} alt={item.name}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#d4af37]/90 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[#d4af37] font-bold text-sm">{item.price}</span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-serif text-white text-sm mb-2 group-hover:text-[#d4af37] transition-colors leading-snug">{item.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-grow mb-4">{item.desc}</p>
                {mode === 'dine' ? (
                  <button onClick={() => handleAddToTable(item)} className="gold-btn w-full py-2.5 rounded-sm text-[10px] flex items-center justify-center gap-1.5">
                    <FaConciergeBell className="text-[9px]" />
                    {dineCart.find(c => c.name === item.name) ? `Add More (×${dineCart.find(c=>c.name===item.name).qty})` : 'Add to Table'}
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="gold-btn w-full py-2.5 rounded-sm text-[10px] flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart className="text-[9px]" />
                    {cart.find(c => c.name === item.name) ? `Add More (×${cart.find(c=>c.name===item.name).qty})` : 'Add to Order'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Delivery Form ── */}
        {mode === 'delivery' && (
          <div className="glass-card rounded-xl p-8 md:p-10 mb-16">
            <h2 className="font-serif text-white text-2xl mb-2">Delivery Details</h2>
            <p className="text-gray-500 text-sm mb-8">Fill in your details and we will prepare and deliver your order</p>

            {submitted && (
              <div className="mb-6 p-4 border border-[#d4af37]/50 bg-[#d4af37]/10 rounded-sm text-[#d4af37] text-sm flex items-center gap-3">
                <FaCheck /> Order placed! We will call you to confirm delivery within 15 minutes.
              </div>
            )}

            <form onSubmit={handleOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Full Name *</label>
                <input required value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})}
                  placeholder="Your name" className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Phone Number *</label>
                <input required value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})}
                  placeholder="+91 XXXXX XXXXX" className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Delivery Address *</label>
                <textarea required value={orderForm.address} onChange={e => setOrderForm({...orderForm, address: e.target.value})}
                  rows={2} placeholder="Full delivery address with landmark..."
                  className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600 resize-none" />
              </div>
              <div>
                <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Preferred Delivery Time</label>
                <input type="time" value={orderForm.time} onChange={e => setOrderForm({...orderForm, time: e.target.value})}
                  className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Delivery Instructions</label>
                <input value={orderForm.notes} onChange={e => setOrderForm({...orderForm, notes: e.target.value})}
                  placeholder="Gate code, floor, special instructions..." className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" disabled={cart.length === 0}
                  className={`w-full py-4 rounded-sm text-sm flex items-center justify-center gap-2 transition-all ${
                    cart.length > 0 ? 'gold-btn' : 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed border border-[#333]'
                  }`}
                >
                  <FaMotorcycle className="text-xs" />
                  {cart.length === 0 ? 'Add items to your order first' : `Place Delivery Order (${cartTotal} item${cartTotal !== 1 ? 's' : ''})`}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ── Dine-in: Table Order Summary ── */}
      {mode === 'dine' && dineCart.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="glass-card rounded-xl p-7 border border-[#d4af37]/30">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h3 className="font-serif text-white text-xl">Your Table Order</h3>
                <p className="text-[#d4af37] text-xs mt-1 font-bold">{dineTable?.label} — {dineTable?.type} · {dineTable?.seats}</p>
              </div>
              <button onClick={() => setShowReserveForm(true)} className="gold-btn px-7 py-3 rounded-sm text-xs">
                Reserve Table
              </button>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {dineCart.map(item => (
                <div key={item.name} className="flex items-center justify-between py-3 gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.img} alt={item.name} className="w-10 h-10 rounded-sm object-cover opacity-80" />
                    <div>
                      <p className="text-white text-sm font-serif">{item.name}</p>
                      <p className="text-gray-500 text-xs">{item.category} · {item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setDineCart(prev => prev.map(c => c.name===item.name ? {...c, qty: Math.max(0,c.qty-1)} : c).filter(c=>c.qty>0))} className="w-6 h-6 rounded-full border border-[#333] text-gray-400 hover:text-white text-xs">−</button>
                    <span className="text-white text-sm w-4 text-center">{item.qty}</span>
                    <button onClick={() => addToDineCart(item, dineTable)} className="w-6 h-6 rounded-full border border-[#333] text-gray-400 hover:text-white text-xs">+</button>
                    <span className="text-[#d4af37] text-sm font-bold w-20 text-right">₹{(parsePrice(item.price)*item.qty).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#222]">
              <span className="text-gray-400 text-sm">Total</span>
              <span className="text-[#d4af37] font-bold text-xl font-serif">{dineTotalStr}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Table Picker Modal ── */}
      {showTablePicker && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowTablePicker(false)}>
          <div className="modal-content rounded-xl w-full max-w-md p-7" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-white text-xl">Select Your Table</h3>
              <button onClick={() => setShowTablePicker(false)} className="text-gray-400 hover:text-white"><FaTimes size={16}/></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TABLES.map(t => (
                <button key={t.id} onClick={() => handleTableSelect(t)}
                  className={`text-left p-4 rounded-sm border transition-all duration-200 ${dineTable?.id===t.id ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#333] hover:border-[#d4af37]/50'}`}>
                  <p className="text-white text-sm font-bold">{t.label}</p>
                  <p className="text-[#d4af37] text-xs">{t.type}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{t.seats}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Reserve Table Form Modal ── */}
      {showReserveForm && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowReserveForm(false)}>
          <div className="modal-content rounded-xl w-full max-w-lg p-7" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-white text-xl">Reserve Table</h3>
                <p className="text-[#d4af37] text-xs mt-1">{dineTable?.label} · {dineTotalStr} · {dineCart.length} dish{dineCart.length!==1?'es':''}</p>
              </div>
              <button onClick={() => setShowReserveForm(false)} className="text-gray-400 hover:text-white"><FaTimes size={16}/></button>
            </div>
            {dineSubmitted ? (
              <div className="p-4 border border-[#d4af37]/50 bg-[#d4af37]/10 rounded-sm text-[#d4af37] text-sm flex items-center gap-3">
                <FaCheck /> Table reserved! Our staff will attend to you shortly.
              </div>
            ) : (
              <form onSubmit={handleDineReserve} className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Full Name *</label>
                  <input required value={reserveForm.name} onChange={e=>setReserveForm({...reserveForm,name:e.target.value})} placeholder="Your name"
                    className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] placeholder-gray-600"/>
                </div>
                <div>
                  <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2"><FaUsers className="inline mr-1"/>Guests *</label>
                  <select required value={reserveForm.guests} onChange={e=>setReserveForm({...reserveForm,guests:e.target.value})}
                    className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37]">
                    {['1','2','3','4','5','6','7','8','9','10+'].map(n=><option key={n}>{n} {n==='1'?'Guest':'Guests'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2"><FaCalendarAlt className="inline mr-1"/>Date *</label>
                  <input required type="date" min={new Date().toISOString().split('T')[0]} value={reserveForm.date} onChange={e=>setReserveForm({...reserveForm,date:e.target.value})}
                    className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37]"/>
                </div>
                <div>
                  <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Dining Time *</label>
                  <select required value={reserveForm.time} onChange={e=>setReserveForm({...reserveForm,time:e.target.value})}
                    className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37]">
                    <option value="">Select time</option>
                    {['07:00','08:00','09:00','10:00','12:00','13:00','14:00','18:00','19:00','20:00','21:00','22:00'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Special Requests</label>
                  <input value={reserveForm.notes} onChange={e=>setReserveForm({...reserveForm,notes:e.target.value})} placeholder="Allergies, occasion, preferences..."
                    className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#d4af37] placeholder-gray-600"/>
                </div>
                <div className="col-span-2">
                  <button type="submit" className="gold-btn w-full py-3.5 rounded-sm text-sm">Confirm Reservation</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GuestFoodMenu;
