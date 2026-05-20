import React, { useState } from 'react';

const App = () => {
  // ================= 📝 ১. স্টেটসমূহ (States) =================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('user'); 
  
  // অ্যাডমিন প্যানেল প্রটেকশন লক স্টেট
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const adminSecretKey = "naina2026"; // 🔐 গোপন অ্যাডমিন পাসওয়ার্ড

  // কার্ট ও অর্ডার স্টেট
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]); 
  const [totalSales, setTotalSales] = useState(12450); // 💸 মোট ইনকাম ট্র্যাকিং স্টেট

  // কাস্টমার অর্ডার ইনফো স্টেট
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // পেমেন্ট ইনপুট স্টেট
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const deliveryCharge = 50; 

  // ইউজার প্রোফাইল ডাটা (ডাইনামিক করার জন্য ইনপুট ফিল্ডের সাথে কানেক্টেড)
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    avatar: "", // ইউজার তার নিজের ইমেজের লিংক দিতে পারবেন
    location: "চট্টগ্রাম"
  });

  // ডাইনামিক রিভিউ স্টেট (ইমেজ এবং ডিটেইলস সহ)
  const [reviews, setReviews] = useState([
    { id: 1, name: "আরিফ আহমেদ", location: "ঢাকা", rating: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arif", text: "হায়দ্রাবাদী বিরিয়ানিটা জাস্ট অসাধারণ ছিল! একদম গরম গরম ডেলিভারি পেয়েছি।" },
    { id: 2, name: "নাসরিন সুলতানা", location: "চট্টগ্রাম", rating: 4, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", text: "এদের ক্রিসপি চিকেন বার্গারের সসটা পুরো ইউনিক। ডেলিভারি বয় খুব ফাস্ট ছিল।" },
    { id: 3, name: "জিসান মাহমুদ", location: "সিলেট", rating: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jisan", text: "চকলেট লাভা কেকটা মুখে দিতেই গলে গেল। কাজের চাপের মাঝে এমন একটা ডেজার্ট মন ভালো করে দেয়।" }
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  // ডাইনামিক মেনু ডাটা (অ্যাডমিন যাতে নতুন আইটেম পুশ করতে পারে তাই স্টেট এ নেওয়া হয়েছে)
  const [foodItems, setFoodItems] = useState([
    { id: 1, name: "ক্রিসপি চিকেন বার্গার", price: 199, rating: "৪.৯", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop", description: "জুসি চিকেন প্যাটি, চিডার চিজ এবং স্পেশাল সসের পারফেক্ট কম্বিনেশন।" },
    { id: 2, name: "চিজি পেপারোনি পিজ্জา", price: 499, rating: "৪.৮", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop", description: "মোজারেলা চিজ আর ক্রিসপি পেপারোনি দিয়ে ভরপুর ইতালিয়ান স্বাদের পিজ্জา।" },
    { id: 3, name: "হায়দ্রাবাদী চিকেন বিরিয়ানি", price: 320, rating: "৫.০", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500&auto=format&fit=crop", description: "বাসমতি চাল আর খাঁটি মশলার সুবাসে তৈরি ঐতিহ্যবাহী মেজবানি স্বাদের বিরিয়ানি।" },
    { id: 4, name: "চকলেট লাভা কেক", price: 149, rating: "৪.৯", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500&auto=format&fit=crop", description: "ভেতর থেকে গলে পড়া গরম চকলেটের স্বর্গীয় স্বাদের একটি premium ডেজার্ট।" }
  ]);

  // অ্যাডমিন থেকে নতুন খাবার সাইটে পাবলিশ করার জন্য ফর্ম স্টেট
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState("");
  const [newFoodImage, setNewFoodImage] = useState("");
  const [newFoodDesc, setNewFoodDesc] = useState("");

  // ================= ⚡ ২. ফাংশনসমূহ (Functions) =================
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // যদি ইমেজ না দেয় তবে অটোমেটিক একটি সুন্দর র্যান্ডম অবতার তৈরি হবে
    const finalAvatar = userProfile.avatar.trim() || `https://api.dicebear.com/7.x/bottts/svg?seed=${userProfile.name || 'User'}`;
    setUserProfile({
      ...userProfile,
      avatar: finalAvatar
    });
    
    setIsLoggedIn(true);
    document.getElementById('login_modal').close();
    alert(`👋 স্বাগতম, ${userProfile.name || 'কাস্টমার'}! লগইন/সাইন আপ সফল হয়েছে।`);
  };

  const addToCart = (item) => {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
      setCart(cart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + deliveryCharge : 0;

  // অর্ডার প্লেস করা
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("⚠️ অর্ডার করতে দয়া করে আগে লগইন বা সাইন আপ করুন!");
      document.getElementById('login_modal').showModal();
      setIsCartOpen(false);
      return;
    }

    if (!customerPhone.trim() || !customerAddress.trim()) {
      alert("⚠️ দয়া করে আপনার মোবাইল নম্বর এবং ডেলিভারি ঠিকানা সঠিকভাবে লিখুন!");
      return;
    }

    if (paymentMethod !== 'cod' && (!senderNumber || !transactionId)) {
      alert("⚠️ অনলাইন পেমেন্টের জন্য পেমেন্ট নম্বর এবং TrxID দেওয়া আবশ্যক!");
      return;
    }

    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      customerName: userProfile.name || "নাসরিন সুলতানা",
      customerEmail: userProfile.email || "nasrin@mail.com",
      customerPhone: customerPhone,
      customerAddress: customerAddress,
      items: [...cart],
      total: cartTotal,
      payment: paymentMethod.toUpperCase(),
      senderNumber: paymentMethod === 'cod' ? 'N/A' : senderNumber,
      transactionId: paymentMethod === 'cod' ? 'N/A' : transactionId,
      status: 'Pending'
    };

    setOrders([newOrder, ...orders]);
    setCart([]); 
    setSenderNumber('');
    setTransactionId('');
    setCustomerPhone('');
    setCustomerAddress('');
    setIsCartOpen(false);
    alert(`🎉 অর্ডার সফল হয়েছে! আইডি: #${newOrder.id}। অ্যাডমিন ভেরিফাই করে খাবার পাঠিয়ে দেবেন।`);
  };

  // সিকিউর অ্যাডমিন লগইন ভেরিফিকেশন
  const handleAdminAccess = (e) => {
    e.preventDefault();
    if (adminPasswordInput === adminSecretKey) {
      setActiveTab('admin');
      document.getElementById('admin_lock_modal').close();
      setAdminPasswordInput('');
    } else {
      alert("❌ ভুল পাসওয়ার্ড! আপনি এই অ্যাপের আসল অ্যাডমিন নন।");
    }
  };

  // অ্যাডমিন কনফার্মেশন ও ইনকাম ট্র্যাকিং
  const confirmOrder = (orderId, customerEmail, orderAmount) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'Confirmed' } : order));
    setTotalSales(prevSales => prevSales + orderAmount); // ইনকাম লাইভ যোগ হবে
    alert(`✉️ [SMTP EMAIL SERVER SUCCESS]\n\nTo: ${customerEmail}\nSubject: SwadBox - Order #${orderId} Confirmed! 🎉\n\nঅর্ডারটি Confirm করা হয়েছে এবং ইনকামে ৳${orderAmount} যোগ হয়েছে!`);
  };

  // নতুন ফুড আইটেম পাবলিশ করার ফাংশন (Admin)
  const handlePublishFood = (e) => {
    e.preventDefault();
    if (!newFoodName || !newFoodPrice || !newFoodImage || !newFoodDesc) {
      alert("⚠️ দয়া করে সবগুলো ঘর পূরণ করুন!");
      return;
    }

    const newFood = {
      id: Date.now(),
      name: newFoodName,
      price: parseInt(newFoodPrice),
      rating: "৫.০",
      image: newFoodImage,
      description: newFoodDesc
    };

    setFoodItems([newFood, ...foodItems]);
    setNewFoodName('');
    setNewFoodPrice('');
    setNewFoodImage('');
    setNewFoodDesc('');
    alert(`🚀 "${newFoodName}" খাবারটি সফলভাবে মেইন সাইটে পাবলিশ হয়েছে!`);
  };

  // নতুন ডাইনামিক রিভিউ সাবমিট করা
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    // ইউজার লগইন থাকলে তার নাম, অবতার ও লোকেশন আসবে, না থাকলে গেস্ট অবতার জেনারেট হবে
    const newReview = {
      id: Date.now(),
      name: isLoggedIn && userProfile.name ? userProfile.name : "অতিথি ইউজার",
      location: isLoggedIn ? userProfile.location : "চট্টগ্রাম",
      avatar: isLoggedIn && userProfile.avatar ? userProfile.avatar : `https://api.dicebear.com/7.x/initials/svg?seed=${Math.random()}`,
      rating: parseInt(newReviewRating),
      text: newReviewText
    };

    setReviews([newReview, ...reviews]);
    setNewReviewText('');
    alert("⭐️ আপনার প্রোফাইল ইমেজ ও ডিটেইলস সহ রিভিউটি লাইভ যুক্ত হয়েছে!");
  };

  return (
    <div className="min-h-screen bg-base-100 font-sans text-base-content scroll-smooth">
      
      {/* ================= ৩. নেভিগেশন বার ================= */}
<div className="navbar bg-base-100 shadow-md px-2 sm:px-4 md:px-12 sticky top-0 z-50">
  {/* নেভবার স্টার্ট: লোগো এবং মোড টগল বাটন */}
  <div className="navbar-start flex items-center flex-wrap sm:flex-nowrap gap-1 sm:gap-2">
    <a className="btn btn-ghost text-lg sm:text-xl md:text-2xl font-black tracking-wide p-1 md:p-2" href="#home">
      Swad<span className="text-orange-500">Box</span>
    </a>
    
    <div className="join ml-1 sm:ml-2 md:ml-4 scale-90 sm:scale-100">
      <button 
        onClick={() => setActiveTab('user')} 
        className={`btn btn-[10px] sm:btn-xs px-1.5 sm:px-2 join-item ${activeTab === 'user' ? 'btn-neutral' : 'btn-outline'}`}
      >
        ইউজার
      </button>
      <button 
        onClick={() => document.getElementById('admin_lock_modal').showModal()} 
        className={`btn btn-[10px] sm:btn-xs px-1.5 sm:px-2 join-item ${activeTab === 'admin' ? 'btn-error text-white' : 'btn-outline'}`}
      >
        অ্যাডমিন ({orders.length})
      </button>
    </div>
  </div>

  {/* ネভবার এন্ড: কার্ট এবং প্রোফাইল/লগইন বাটন */}
  <div className="navbar-end gap-1.5 sm:gap-2 md:gap-3">
    {/* কার্ট বাটন */}
    <div className="btn btn-ghost btn-circle btn-sm md:btn-md" onClick={() => setIsCartOpen(true)}>
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="badge badge-xs md:badge-sm badge-error text-white indicator-item font-bold">
          {cart.reduce((sum, i) => sum + i.quantity, 0)}
        </span>
      </div>
    </div>

    {/* লগইন স্ট্যাটাস চেক */}
    {isLoggedIn ? (
      <div className="relative">
        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="btn btn-ghost btn-circle avatar online border border-orange-500 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 overflow-hidden">
          <img src={userProfile.avatar} alt="User Avatar" className="w-full h-full object-cover" />
        </button>
        
        {isProfileOpen && (
          <div className="absolute right-0 mt-3 z-[100] p-4 sm:p-5 shadow-2xl bg-base-100 rounded-2xl border border-base-200 w-64 sm:w-72 text-base-content">
            <div className="text-center border-b border-base-200 pb-3 mb-3 flex flex-col items-center">
              <img src={userProfile.avatar} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-orange-500 mb-2 shadow-sm" alt="" />
              <h4 className="font-black text-base sm:text-lg">{userProfile.name || "নাসরিন সুলতানা"}</h4>
              <p className="text-[11px] sm:text-xs text-base-content/60 max-w-full truncate">{userProfile.email || "example@gmail.com"}</p>
              <span className="badge badge-sm badge-outline mt-1 text-orange-500 font-bold text-[10px] sm:text-xs">📍 {userProfile.location}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <span className="text-[10px] sm:text-xs font-bold text-base-content/40 uppercase block">আমার অর্ডার স্ট্যাটাস</span>
              <div className="flex justify-between items-center bg-warning/10 text-warning-content px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold">
                <span>⏳ পেন্ডিং</span>
                <span className="badge badge-warning text-[10px] sm:text-xs font-bold">{orders.filter(o => o.status === 'Pending').length} টি</span>
              </div>
              <div className="flex justify-between items-center bg-success/10 text-success-content px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold">
                <span>✅ কনফর্মড</span>
                <span className="badge badge-success text-white text-[10px] sm:text-xs font-bold">{orders.filter(o => o.status === 'Confirmed').length} টি</span>
              </div>
            </div>
            
            <button onClick={() => { setIsLoggedIn(false); setIsProfileOpen(false); }} className="btn btn-error btn-outline btn-sm w-full rounded-xl font-bold text-xs">
              লগআউট
            </button>
          </div>
        )}
      </div>
    ) : (
      <button 
        className="btn bg-orange-500 hover:bg-orange-600 text-white border-none text-[10px] sm:btn-xs md:btn-sm rounded-lg font-bold px-2 sm:px-4 h-7 sm:h-auto min-h-0" 
        onClick={() => document.getElementById('login_modal').showModal()}
      >
        লগইন / সাইন আপ
      </button>
    )}
  </div>
</div>

      {/* ================= ৪. ভিউ হ্যান্ডলার (User/Admin) ================= */}
      {activeTab === 'admin' ? (
        
        // 🔴 প্রফেশনাল সিকিউর অ্যাডমিন ড্যাশবোর্ড (পাবলিশিং ও ইনকাম ট্র্যাকিং ফর্ম সহ)
        <div className="py-8 px-3 md:px-12 max-w-7xl mx-auto min-h-[80vh]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-base-300 pb-4 mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-error">📊 SwadBox অ্যাডমিন কন্ট্রোল প্যানেল</h1>
              <p className="text-xs md:text-sm text-base-content/60 mt-1">নতুন আইটেম পাবলিশ করুন এবং কставить টোটাল সেলস হিসাব রাখুন।</p>
            </div>
            <button onClick={() => setActiveTab('user')} className="btn btn-neutral btn-sm rounded-xl text-xs">◀ ইউজার মোড</button>
          </div>

          {/* টপ ইনকাম ও আইটেম স্ট্যাটাস কার্ডস */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-neutral text-neutral-content p-5 rounded-2xl shadow-xl">
              <p className="text-xs uppercase font-bold text-gray-400">🍔 মোট লাইভ আইটেম</p>
              <h3 className="text-3xl font-black mt-1 text-orange-400">{foodItems.length} টি</h3>
            </div>
            <div className="bg-neutral text-neutral-content p-5 rounded-2xl shadow-xl">
              <p className="text-xs uppercase font-bold text-gray-400">💰 মোট ইনকাম (টোটাল সেলস)</p>
              <h3 className="text-3xl font-black mt-1 text-emerald-400">৳{totalSales}</h3>
            </div>
            <div className="bg-neutral text-neutral-content p-5 rounded-2xl shadow-xl">
              <p className="text-xs uppercase font-bold text-gray-400">📋 পেন্ডিং অর্ডার</p>
              <h3 className="text-3xl font-black mt-1 text-amber-400">{orders.filter(o => o.status === 'Pending').length} টি</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ফর্ম: নতুন খাবার পাবলিশ করুন */}
            <div className="bg-base-200 p-5 rounded-2xl shadow-lg border border-base-300 h-fit">
              <h3 className="text-base md:text-lg font-black mb-4 text-orange-500">➕ নতুন খাবার মেনুতে যোগ করুন</h3>
              <form onSubmit={handlePublishFood} className="space-y-3 text-xs">
                <input type="text" placeholder="খাবারের নাম *" className="input input-sm input-bordered w-full rounded-xl bg-base-100" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} required />
                <input type="number" placeholder="মূল্য (টাকা) *" className="input input-sm input-bordered w-full rounded-xl bg-base-100" value={newFoodPrice} onChange={(e) => setNewFoodPrice(e.target.value)} required />
                <input type="text" placeholder="ছবির ইউআরএল (Image URL) *" className="input input-sm input-bordered w-full rounded-xl bg-base-100" value={newFoodImage} onChange={(e) => setNewFoodImage(e.target.value)} required />
                <textarea placeholder="খাবারের আকর্ষণীয় ডেসক্রিপশন লিখুন *" className="textarea textarea-bordered w-full rounded-xl bg-base-100 h-24" value={newFoodDesc} onChange={(e) => setNewFoodDesc(e.target.value)} required></textarea>
                <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 text-white w-full btn-sm rounded-xl font-bold">🚀 সাইটে পাবলিশ করুন</button>
              </form>
            </div>

            {/* টেবিল: অর্ডার লিস্ট ম্যানেজমেন্ট */}
            <div className="lg:col-span-2 overflow-x-auto shadow-xl rounded-2xl border border-base-200 bg-base-100 p-4">
              <h3 className="text-base font-black mb-4 text-error">📋 অর্ডার ম্যানেজমেন্ট ও ভেরিফিকেশন</h3>
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-medium">বর্তমানে কোনো অর্ডার পেন্ডিং নেই!</div>
              ) : (
                <table className="table bg-base-100 w-full min-w-[700px]">
                  <thead className="bg-base-200 text-xs font-bold">
                    <tr>
                      <th>আইডি</th>
                      <th>কাস্টমার বিবরণ</th>
                      <th>ডেলিভারি ঠিকানা</th>
                      <th>মোট বিল</th>
                      <th>পেমেন্ট TrxID</th>
                      <th>অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-base-200/50 transition text-xs">
                        <td className="font-bold text-orange-500">#{order.id}</td>
                        <td>
                          <div className="font-bold">{order.customerName}</div>
                          <div className="text-[10px] text-base-content/60">{order.customerEmail}</div>
                        </td>
                        <td>
                          <div className="font-bold text-error">📞 {order.customerPhone}</div>
                          <div className="text-base-content/80 text-[10px] bg-base-200 p-1 rounded max-w-[150px] break-words">📍 {order.customerAddress}</div>
                        </td>
                        <td className="font-bold text-sm">৳{order.total}</td>
                        <td>
                          {order.payment === 'COD' ? <span className="text-gray-400">COD</span> : <span className="badge badge-ghost font-mono text-error font-bold">{order.transactionId}</span>}
                        </td>
                        <td>
                          {order.status === 'Pending' ? (
                            <button onClick={() => confirmOrder(order.id, order.customerEmail, order.total)} className="btn btn-success btn-xs text-white rounded-lg font-bold">কনফর্ম করুন</button>
                          ) : (
                            <span className="text-success font-bold flex items-center gap-1">✅ কনফর্মড</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

      ) : (

        // 🟢 রেগুলার কাস্টমার ভিউ
        <>
          {/* হিরো সেকশন */}
          <div id="home" className="hero min-h-[calc(100vh-68px)] bg-base-200 px-4 md:px-12 py-10 lg:py-0">
            <div className="hero-content flex-col lg:flex-row-reverse gap-6 lg:gap-16 text-center lg:text-left">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop" className="max-w-[240px] sm:max-w-xs md:max-w-sm rounded-3xl shadow-2xl object-cover" alt="" />
              <div>
                <h1 className="text-3xl md:text-6xl font-black leading-tight">গরম গরম স্বাদ, <br /><span className="text-orange-500">ডেলিভারি হবে ফাস্ট!</span></h1>
                <p className="py-4 text-sm md:text-base text-base-content/80 max-w-md">SwadBox-এ আপনাকে স্বাগতম। আপনার শহরের সেরা সব রেস্তোরাঁর খাবার এক ক্লিকেই পৌঁছে যাবে আপনার দরজায়।</p>
                <a href="#menu" className="btn bg-orange-500 hover:bg-orange-600 text-white border-none btn-sm md:btn-md font-bold rounded-xl shadow-lg">মেনু দেখুন</a>
              </div>
            </div>
          </div>

          {/* মেনু সেকশন */}
          <div id="menu" className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-orange-500 font-bold uppercase text-xs tracking-wider">আমাদের মেনু</span>
              <h2 className="text-2xl md:text-4xl font-black mt-1">জনপ্রিয় সব সুস্বাদু খাবার</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {foodItems.map(item => (
                <div key={item.id} className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-200 flex flex-col justify-between">
                  <figure className="relative h-44 md:h-48">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-orange-500 shadow-md">⭐ {item.rating}</div>
                  </figure>
                  <div className="card-body p-4 md:p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="card-title text-base md:text-lg font-bold">{item.name}</h2>
                      <p className="text-xs text-base-content/70 my-1 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="card-actions justify-between items-center mt-3 border-t border-base-200 pt-2">
                      <span className="text-lg font-black text-orange-500">৳{item.price}</span>
                      <button onClick={() => { addToCart(item); alert(`🛒 "${item.name}" কার্টে যুক্ত হয়েছে!`); }} className="btn bg-orange-500 hover:bg-orange-600 text-white border-none btn-xs md:btn-sm rounded-lg px-3 font-bold">অর্ডার করুন</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= ⭐ রিভিউ সেকশন ================= */}
          <div id="reviews" className="bg-base-200 py-16 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-orange-500 font-bold uppercase text-xs">রিভিউ ও মতামত</span>
                <h2 className="text-2xl md:text-4xl font-black mt-1">খাদ্যরসিকরা আমাদের সম্পর্কে যা বলেন</h2>
              </div>

              {/* রিভিউ দেয়ার ফর্ম */}
              <div className="card bg-base-100 max-w-xl mx-auto shadow-xl p-5 md:p-6 rounded-2xl border border-base-200 mb-10">
                <h3 className="text-base md:text-lg font-black mb-3 flex items-center gap-2">✍️ আপনার মূল্যবান মতামত দিন</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="form-control">
                    <label className="text-xs font-bold text-base-content/70 mb-1">রেটিং সিলেক্ট করুন:</label>
                    <div className="rating rating-sm">
                      {[1,2,3,4,5].map((num) => (
                        <input key={num} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" checked={newReviewRating === num} onChange={() => setNewReviewRating(num)} />
                      ))}
                    </div>
                  </div>
                  <div className="form-control">
                    <textarea 
                      className="textarea textarea-bordered h-20 focus:outline-none rounded-xl bg-base-50 text-xs" 
                      placeholder="খাবারের স্বাদ এবং ডেলিভারি সার্ভিস কেমন ছিল? এখানে লিখুন..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 text-white border-none font-bold btn-xs md:btn-sm rounded-xl px-4 shadow-md">সাবমিট</button>
                </form>
              </div>

              {/* রিভিউ কার্ড গ্রিড (ডাইনামিক ইমেজ ও ডিটেইলস সহ) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="card bg-base-100 shadow-xl p-5 rounded-2xl border border-base-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full border border-orange-200 overflow-hidden">
                            <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{rev.name}</h4>
                          <p className="text-[10px] text-base-content/60">📍 {rev.location}</p>
                        </div>
                      </div>
                      <div className="rating rating-xs mb-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <input key={i} type="radio" className="mask mask-star-2 bg-orange-500" disabled checked />
                        ))}
                      </div>
                      <p className="text-xs text-base-content/80 mt-0.5 italic">"{rev.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= 🛒 ৫. কার্ট সাইড ড্রয়ার ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex justify-end">
          <div className="bg-base-100 h-full w-full max-w-md p-5 md:p-6 shadow-2xl flex flex-col justify-between border-l border-l-base-200 overflow-y-auto text-base-content">
            <div>
              <div className="flex justify-between items-center border-b border-base-200 pb-3 mb-3">
                <h3 className="text-lg md:text-xl font-black">🛒 আপনার শপিং কার্ট</h3>
                <button onClick={() => setIsCartOpen(false)} className="btn btn-xs md:btn-sm btn-circle btn-ghost">✕</button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-base-content/50 text-sm font-medium">কার্ট একদম খালি!</div>
              ) : (
                <div className="space-y-3 max-h-[25vh] overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 bg-base-200 p-2.5 rounded-xl border border-base-300 relative text-xs">
                      <img src={item.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-xs">{item.name}</h4>
                        <div className="text-orange-500 font-bold text-xs mt-1">৳{item.price} × {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <form onSubmit={handlePlaceOrder} className="border-t border-base-200 pt-3 bg-base-100 space-y-3">
                <div className="bg-base-200 p-3 rounded-xl space-y-2 text-xs">
                  <span className="text-[10px] font-bold text-error uppercase block mb-1">🚚 ডেলিভারি বিবরণ (আবশ্যক)</span>
                  <div className="form-control">
                    <input type="text" placeholder="মোবাইল নম্বর (যেমন: 018XXXXXXXX)" className="input input-sm input-bordered rounded-lg bg-base-100" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
                  </div>
                  <div className="form-control">
                    <input type="text" placeholder="পূর্ণাঙ্গ ডেলিভারি ঠিকানা" className="input input-sm input-bordered rounded-lg bg-base-100" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-base-content/50 uppercase block mb-1">২. পেমেন্ট মেথড</span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <button type="button" onClick={() => setPaymentMethod('bkash')} className={`btn btn-xs rounded-lg font-bold ${paymentMethod === 'bkash' ? 'bg-pink-600 text-white' : 'btn-outline'}`}>bKash</button>
                    <button type="button" onClick={() => setPaymentMethod('nogod')} className={`btn btn-xs rounded-lg font-bold ${paymentMethod === 'nogod' ? 'bg-orange-600 text-white' : 'btn-outline'}`}>Nagad</button>
                    <button type="button" onClick={() => setPaymentMethod('rocket')} className={`btn btn-xs rounded-lg font-bold ${paymentMethod === 'rocket' ? 'bg-purple-700 text-white' : 'btn-outline'}`}>Rocket</button>
                    <button type="button" onClick={() => setPaymentMethod('cod')} className={`btn btn-xs rounded-lg font-bold ${paymentMethod === 'cod' ? 'bg-neutral text-white' : 'btn-outline'}`}>Cash on Delivery</button>
                  </div>
                </div>

                {paymentMethod !== 'cod' && (
                  <div className="bg-orange-50/70 p-3 rounded-xl border border-orange-200 text-[11px] space-y-2 text-neutral">
                    <p className="font-bold text-orange-600">📢 পার্সোনাল নাম্বারে (01777393518) সেন্ড মানি করুন:</p>
                    <input type="text" placeholder="যে নম্বর থেকে পেমেন্ট করেছেন" className="input input-xs input-bordered rounded-md bg-white w-full" value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)} required />
                    <input type="text" placeholder="ট্রানজেকশন আইডি (TrxID)" className="input input-xs input-bordered rounded-md bg-white w-full font-mono" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required />
                  </div>
                )}

                <div className="space-y-1 text-xs font-semibold text-base-content/80 bg-base-200 p-2.5 rounded-xl">
                  <div className="flex justify-between"><span>সাবটোটাল:</span><span>৳{cartSubtotal}</span></div>
                  <div className="flex justify-between text-error"><span>ডেলিভারি চার্জ:</span><span>+ ৳{deliveryCharge}</span></div>
                  <div className="flex justify-between text-base font-black border-t border-base-300 pt-1.5 mt-1">
                    <span>সর্বমোট বিল:</span><span className="text-orange-500">৳{cartTotal}</span>
                  </div>
                </div>

                <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 text-white border-none w-full rounded-xl btn-sm font-bold text-sm">
                  📦 অর্ডার প্লেস করুন (৳{cartTotal})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= 🔒 অ্যাডমিন লক মোডাল ================= */}
      <dialog id="admin_lock_modal" className="modal backdrop-blur-sm">
        <div className="modal-box max-w-sm bg-base-100 p-5 rounded-2xl relative border border-error/20 text-base-content">
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button></form>
          <div className="text-center mb-4">
            <span className="text-3xl">🔒</span>
            <h3 className="text-lg font-black mt-1 text-error">অ্যাডমিন প্রটেকশন</h3>
            <p className="text-xs text-base-content/60">সিক্রেট পাসওয়ার্ড দিয়ে ভেরিফাই করুন।</p>
          </div>
          <form onSubmit={handleAdminAccess} className="space-y-3">
            <input type="password" placeholder="পাসওয়ার্ড লিখুন" className="input input-bordered w-full rounded-xl text-center font-mono text-sm" value={adminPasswordInput} onChange={(e) => setAdminPasswordInput(e.target.value)} required />
            <button type="submit" className="btn btn-error btn-sm text-white w-full rounded-xl font-bold">🔓 ভেরিফাই</button>
          </form>
        </div>
      </dialog>

      {/* ================= 👤 লগইন / সাইন আপ মোডাল ================= */}
      <dialog id="login_modal" className="modal backdrop-blur-sm">
        <div className="modal-box max-w-md bg-base-100 p-6 md:p-8 rounded-2xl relative text-base-content">
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button></form>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-black"><span>Swad</span><span className="text-orange-500">Box</span></h3>
            <div className="tabs tabs-boxed justify-center mt-3">
              <button onClick={() => setIsLoginView(true)} type="button" className={`tab tab-sm font-bold ${isLoginView ? 'tab-active' : ''}`}>লগইন</button>
              <button onClick={() => setIsLoginView(false)} type="button" className={`tab tab-sm font-bold ${!isLoginView ? 'tab-active' : ''}`}>নতুন অ্যাকাউন্ট (সাইন আপ)</button>
            </div>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
            {!isLoginView && (
              <>
                <div className="form-control">
                  <label className="label-text font-semibold mb-1">আপনার নাম *</label>
                  <input type="text" className="input input-sm input-bordered w-full rounded-xl" value={userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} required />
                </div>
                <div className="form-control">
                  <label className="label-text font-semibold mb-1">প্রোফাইল ছবির লিংক (Image URL)</label>
                  <input type="text" placeholder="https://example.com/photo.jpg" className="input input-sm input-bordered w-full rounded-xl" value={userProfile.avatar} onChange={(e) => setUserProfile({...userProfile, avatar: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label-text font-semibold mb-1">শহর / লোকেশন</label>
                  <input type="text" className="input input-sm input-bordered w-full rounded-xl" value={userProfile.location} onChange={(e) => setUserProfile({...userProfile, location: e.target.value})} />
                </div>
              </>
            )}
            <div className="form-control">
              <label className="label-text font-semibold mb-1">ইমেইল ঠিকানা *</label>
              <input type="email" className="input input-sm input-bordered w-full rounded-xl" value={userProfile.email} onChange={(e) => setUserProfile({...userProfile, email: e.target.value})} required />
            </div>
            <div className="form-control">
              <label className="label-text font-semibold mb-1">পাসওয়ার্ড *</label>
              <input type="password" placeholder="••••••••" className="input input-sm input-bordered w-full rounded-xl" required />
            </div>
            <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 text-white border-none w-full rounded-xl font-bold btn-sm mt-2">
              {isLoginView ? 'লগইন করুন' : 'অ্যাকাউন্ট খুলুন'}
            </button>
          </form>
        </div>
      </dialog>

      {/* ================= 🌍 ৭. মেগা প্রফেশনাল ফুটার (সোশ্যাল লোগো ও প্লে স্টোর আপডেট) ================= */}
      <footer className="bg-neutral text-neutral-content pt-12 pb-6 px-4 md:px-12 border-t border-base-300 rounded-t-[2rem] mt-16 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <h2 className="text-2xl font-black tracking-wide text-white">Swad<span className="text-orange-500">Box</span></h2>
            <p className="text-neutral-content/70 leading-relaxed text-[11px]">চট্টগ্রামের এক নম্বর প্রিমিয়াম লাইভ ফুড ডেলিভারি প্লাটফর্ম। আপনার ঘরে জিরে জল আনা সেরা স্বাদের গ্যারান্টি আমাদের।</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-black uppercase text-white tracking-wider text-xs">📍 আমাদের লোকেশন</h4>
            <div className="space-y-1.5 text-neutral-content/80 text-[11px]">
              <p>🏠 জিইসি মোড়, সেন্ট্রাল প্লাজার বিপরীতে, চট্টগ্রাম, বাংলাদেশ।</p>
              <p>⏰ খোলা: প্রতিদিন সকাল ১০:০০ - রাত ১১:০০</p>
            </div>
          </div>

          {/* 📞 যোগাযোগ ও সোশ্যাল মিডিয়া এরিয়া (সম্পূর্ণ বাংলা + আসল লোগো ও লিংক সহ) */}
          <div className="space-y-3">
            <h4 className="font-black uppercase text-white tracking-wider text-xs">📞 যোগাযোগ ও সোশ্যাল মিডিয়া</h4>
            <div className="space-y-1 text-neutral-content/80 text-[11px]">
              <p className="font-bold text-orange-400">📱 মোবাইল: +880 1777393518</p>
              <p>✉️ ইমেইল: support@swadbox.com</p>
            </div>
            <div className="flex gap-3 pt-2">
              {/* ফেসবুক লোগো ও লিংক */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                title="ফেসবুক পেজ"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                </svg>
              </a>
              {/* ইনস্টাগ্রাম লোগো ও লিংক */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                title="ইনস্টাগ্রাম প্রোফাইল"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.444-.048-3.298c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.003 1.467c2.146 0 2.397.008 3.246.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.849.047 1.1 0 3.246-.038 2.147-.047 2.397-.046 3.246-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.849.038-1.1.047-3.246.047s-2.397-.009-3.246-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.849-.046-1.1-.046-3.246s.008-2.397.046-3.246c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm0 2.446a4.088 4.088 0 1 0 0 8.175 4.088 4.088 0 0 0 0-8.175m0 6.708A2.62 2.62 0 1 1 8 5.375a2.62 2.62 0 0 1 0 5.238m4.2-6.505a.96.96 0 1 0 0-1.92.96.96 0 0 0 0 1.92"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 📲 গুগল প্লে স্টোর অফিশিয়াল ব্যাজ লোগো এরিয়া */}
          <div className="space-y-2">
            <h4 className="font-black uppercase text-white tracking-wider text-xs">📲 ডাউনলোড SwadBox অ্যাপ</h4>
            <p className="text-[11px] text-neutral-content/70">স্মার্টফোনে আরও ফাস্ট অর্ডারের জন্য আমাদের অফিশিয়াল অ্যাপটি ইনস্টল করুন।</p>
            <div className="pt-2">
              <a 
                href="https://play.google.com/store" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block hover:opacity-80 transition-all duration-200"
              >
                {/* অফিশিয়াল গুগল প্লে স্টোর এসভিজি ব্যাজ */}
                <svg className="w-36 h-auto" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H131C133.209 0 135 1.79086 135 4V36C135 38.2091 133.209 40 131 40H4C1.79086 40 0 38.2091 0 36V4Z" fill="black"/>
                  <path d="M12.3 8.5C12.1 8.7 12 9 12 9.4V30.6C12 31 12.1 31.3 12.3 31.5L12.4 31.6L23.5 20.5V20.3L12.4 9.2L12.3 8.5Z" fill="#00E5FF"/>
                  <path d="M27.2 24.2L23.5 20.5V20.3L27.2 16.6L27.3 16.7L31.7 19.2C33 19.9 33 21 31.7 21.7L27.3 24.2H27.2Z" fill="#FFC107"/>
                  <path d="M27.3 16.7L12.3 8.5C12.7 8.1 13.4 8.1 14.2 8.5L27.3 16.7Z" fill="#FF3D00"/>
                  <path d="M27.3 24.2L14.2 32.4C13.4 32.8 12.7 32.8 12.3 32.4L27.3 24.2Z" fill="#4CAF50"/>
                  <path opacity="0.2" d="M27.2 24L14.2 32.2C13.5 32.6 12.8 32.6 12.4 32.2L12.3 32.3C12.7 32.7 13.4 32.7 14.2 32.3L27.3 24.1L27.2 24Z" fill="black"/>
                  <path opacity="0.2" d="M12 9.4V9.5C12 9.1 12.1 8.8 12.3 8.6L12.4 8.5C12.1 8.7 12 9 12 9.4Z" fill="black"/>
                  <path opacity="0.1" d="M31.7 21.5L27.2 24L27.3 24.1L31.7 21.6C33 20.9 33 19.8 31.7 19.1L31.6 19.2C32.9 19.9 32.9 20.9 31.7 21.5ZM14.2 8.7L27.3 16.9L27.2 16.8L14.2 8.6C13.4 8.2 12.7 8.2 12.3 8.6L12.4 8.7C12.8 8.3 13.5 8.3 14.2 8.7Z" fill="white"/>
                  <text fill="white" font-family="Roboto,Helvetica,Arial,sans-serif" font-size="6" font-weight="500" letter-spacing="0.4" x="42" y="16">GET IT ON</text>
                  <text fill="white" font-family="Roboto,Helvetica,Arial,sans-serif" font-size="13" font-weight="900" x="42" y="29">Google Play</text>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-neutral-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-neutral-content/50">
          <p>Copyright © 2026 - All rights reserved by SwadBox Team.</p>
          <div className="flex gap-3">
            <a href="#home" className="hover:text-orange-500">Privacy Policy</a>
            <a href="#home" className="hover:text-orange-500">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;