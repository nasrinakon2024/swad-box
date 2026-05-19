import React from 'react';

const FoodCard = ({ image, name, price, rating, description }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 group rounded-2xl overflow-hidden">
      {/* খাবারের ছবি */}
      <figure className="overflow-hidden h-48 relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {/* টপ রেটিং ব্যাজ */}
        <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-orange-500 shadow-sm flex items-center gap-1">
          ⭐ {rating}
        </div>
      </figure>

      {/* কার্ড বডি */}
      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold text-neutral dark:text-white group-hover:text-orange-500 transition">
          {name}
        </h2>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {description}
        </p>
        
        {/* দাম এবং বাটন সেকশন */}
        <div className="card-actions justify-between items-center mt-4">
          <div>
            <span className="text-xs text-base-content/50 block">মূল্য</span>
            <span className="text-xl font-black text-orange-500">৳{price}</span>
          </div>
          <button className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white btn-sm px-4 rounded-xl shadow-md shadow-orange-500/10">
            অর্ডার করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;