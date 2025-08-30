import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentSuccess(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const isSub = state?.type === 'subscription';
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <span className="text-3xl">✔</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
      <p className="text-gray-600 mb-8">Your {isSub ? 'subscription' : 'order'} is confirmed.</p>
      <div className="flex gap-3 justify-center">
        {isSub ? (
          <button onClick={()=>navigate('/subscription')} className="px-5 py-2 rounded-xl bg-red-500 text-white">Go to Subscription</button>
        ) : (
          <button onClick={()=>navigate('/orders')} className="px-5 py-2 rounded-xl bg-red-500 text-white">Go to Orders</button>
        )}
        <button onClick={()=>navigate('/dashboard')} className="px-5 py-2 rounded-xl border">Home</button>
      </div>
    </div>
  )
}