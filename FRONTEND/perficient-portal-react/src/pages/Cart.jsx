import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Cart(){
  const { state } = useLocation()
  const navigate = useNavigate()
  const [items, setItems] = useState(()=> JSON.parse(localStorage.getItem('cart')||'[]'))

  useEffect(()=>{
    if(state?.add){
      const next = [...items, state.add]
      setItems(next)
      localStorage.setItem('cart', JSON.stringify(next))
      history.replaceState({}, document.title) // clear state
    }
  }, [])

  const remove = (i) => {
    const next = items.filter((_,idx)=> idx!==i)
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const total = items.reduce((a,b)=> a+b.price, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="space-y-3">
        {items.length===0 && <p className="text-sm text-gray-500">Your cart is empty.</p>}
        {items.map((p,i)=>(
          <div key={i} className="p-4 border rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={p.image} alt={p.name} className="w-16 h-16 object-contain"/>
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm">₹{p.price}</div>
              </div>
            </div>
            <button onClick={()=>remove(i)} className="text-sm text-brand-red">Remove</button>
          </div>
        ))}
      </div>
      {items.length>0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-xl font-bold">Total: ₹{total}</div>
          <button onClick={()=>navigate('/payment-cart', { state: { item: {type:'cart', name:`Cart (${items.length})`, price: total} } })} className="bg-brand-red text-white px-5 py-2 rounded-xl">Pay</button>
        </div>
      )}
    </div>
  )
}
