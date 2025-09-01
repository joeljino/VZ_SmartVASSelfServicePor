import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiBell, FiUser } from 'react-icons/fi'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  let storedUser = null;
  try {
    const raw = localStorage.getItem("user");
    storedUser = raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    storedUser = null;
  }
  const username = storedUser?.username || "Guest";

  const Item = ({ to, children }) => (
    <Link 
      to={to} 
      className={`px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
        pathname===to ? 'text-brand-red font-semibold' : ''
      }`}
    >
      {children}
    </Link>
  )

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  const handleAboutClick = () => {
    if (pathname === '/dashboard') {
      const el = document.getElementById('about')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/dashboard')
      setTimeout(() => {
        const el = document.getElementById('about')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    
    {/* Left: Logo */}
    <div 
      onClick={() => navigate('/dashboard')} 
      className="text-2xl font-extrabold tracking-wide cursor-pointer"
    >
      <span className="text-brand-red">FlexiCom</span>
    </div>

    {/* Center: Nav Links */}
    <nav className="flex-1 flex justify-center items-center gap-4 text-m font-medium text-gray-700">
      <Item to="/dashboard">Home</Item>
      <button 
        onClick={handleAboutClick} 
        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        About
      </button>
      <Item to="/plans">Plans</Item>
      <Item to="/subscription">Subscription</Item>
      <Item to="/product">Product</Item>
      <Item to="/orders">Orders</Item>
    </nav>

    {/* Right: Icons + Profile */}
    <div className="flex items-center gap-5">
      {/* Notification */}
      <button 
        onClick={() => navigate('/notification')} 
        className={`relative p-2 rounded-lg hover:bg-gray-100 transition ${
          pathname==='/notification' ? 'text-brand-red' : ''
        }`}
      >
        <FiBell size={20} />
      </button>

      {/* Cart */}
      <button 
        onClick={() => navigate('/cart')} 
        className={`relative p-2 rounded-lg hover:bg-gray-100 transition ${
          pathname==='/cart' ? 'text-brand-red' : ''
        }`}
      >
        <FiShoppingCart size={20} />
      </button>

      {/* Logout */}
      <button 
        onClick={handleLogout} 
        className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 transition"
      >
        Logout
      </button>

      {/* Profile + Username */}
      <button 
        onClick={() => navigate('/profile')} 
        className={`flex items-center gap-2 pl-3 pr-4 py-2 rounded-lg hover:bg-gray-100 transition ${
          pathname==='/profile' ? 'text-brand-red' : ''
        }`}
      >
        <FiUser size={20} />
        <span className="font-bold text-gray-800 text-sm md:text-base tracking-wide">
          Hi, {username[0].toUpperCase() + username.slice(1)}
        </span>
      </button>
    </div>
  </div>
</header>

  )
}
