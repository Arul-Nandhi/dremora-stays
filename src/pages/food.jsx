import React, { useState } from 'react';
import { images } from '../data/assets';
import { FaLeaf, FaStar } from 'react-icons/fa';

const foodNames = [
  "Beef Wellington",
  "Salmon Prawn Risotto",
  "Saltfish and Ackee",
  "Beef Bourguignon",
  "Fish Stew with Rouille",
  "Cajun Spiced Fish Tacos",
  "Baked Salmon with Fennel",
  "Beef Brisket Pot Roast",
  "Seafood Fideuà",
  "Steak Diane",
  "Toad In The Hole",
  "Apple Blackberry Crumble",
  "Chocolate Souffle",
  "Blackberry Fool",
  "Three-Cheese Souffles",
  "Classic Pancakes",
  "Banana Pancakes",
  "Creamy Tomato Soup",
  "Thai Green Curry",
  "Peach Blueberry Grunt"
];

function Food({ role = 'admin' }) {
  const [filter, setFilter] = useState('all');

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gray-800 mb-1">Culinary Gallery</h1>
          <p className="text-gray-400 tracking-wide">
            {role === 'admin' 
              ? 'Manage menu items, daily specials, and culinary gallery.' 
              : 'Explore our world-class culinary offerings from our master chefs.'}
          </p>
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          <div className="flex bg-gray-100 rounded-lg p-1 text-sm font-bold">
            {['all', 'mains', 'desserts'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-md capitalize tracking-wide transition-all ${
                  filter === f ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {role === 'admin' && (
            <button className="bg-amber-600 text-white px-6 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-amber-500 shadow-md transition-all">
              + Add Dish
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.food.map((imgUrl, index) => {
          // Simple mock logic for filtering
          const isDessert = index >= 11 && index <= 16;
          if (filter === 'mains' && isDessert) return null;
          if (filter === 'desserts' && !isDessert) return null;

          return (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={imgUrl} 
                  alt={foodNames[index] || `Dish ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {index % 4 === 0 && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-black px-2 py-1 rounded text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
                    <FaStar className="text-white" /> Signature
                  </div>
                )}
                {index % 7 === 0 && (
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold shadow-md">
                    <FaLeaf />
                  </div>
                )}
              </div>
              <div className="p-5 border-t border-gray-50 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif text-gray-800 mb-1 leading-tight">{foodNames[index] || `Dish ${index + 1}`}</h3>
                  <p className="text-xs tracking-widest uppercase text-gray-400 font-bold mb-4">
                    {isDessert ? 'Dessert' : 'Main Course'}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-serif font-bold text-amber-600 text-lg">${15 + (index % 10) * 5}.00</span>
                  {role === 'admin' ? (
                    <span className="text-xs text-gray-400 font-bold tracking-widest uppercase hover:text-amber-600">Edit →</span>
                  ) : (
                    <span className="text-xs text-amber-600 font-bold tracking-widest uppercase hover:text-amber-700">Order →</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Food;
