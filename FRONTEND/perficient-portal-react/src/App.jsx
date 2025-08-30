import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import LoginRegister from './pages/LoginRegister.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Plans from './pages/Plans.jsx'
import Payment from './pages/Payment.jsx'
import Subscription from './pages/Subscription.jsx'
import Profile from './pages/Profile.jsx'
import Notification from './pages/Notification.jsx'
import Product from './pages/Product.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/orders.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentCart from './pages/PaymentCart.jsx'


export default function App() {
  const location = useLocation()
  useEffect(()=>{ window.scrollTo(0,0) }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Render Navbar on all except login */}
      {location.pathname !== '/' && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-cart" element={<PaymentCart />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </main>
      {location.pathname !== '/' && <Footer />}
    </div>
  )
}
