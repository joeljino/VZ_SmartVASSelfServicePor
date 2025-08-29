import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { products } from '../data'

export default function ProductDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const p = products.find(x=>x.id===id)

  if(!p) return <div className="max-w-3xl mx-auto px-4 py-10">Product not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
      <img src={p.image} alt={p.name} className="w-full h-64 object-contain border rounded-2xl"/>
      <div>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <div className="text-2xl font-bold my-2">₹{p.price}</div>
        <p className="text-gray-700">{p.description}</p>
        <div className="mt-4 flex gap-2">
          <button onClick={()=>navigate('/cart', { state: { add: p } })} className="bg-brand-red text-white px-4 py-2 rounded-xl">Add to Cart</button>
          <button onClick={()=>navigate('/payment', { state: { item: {type:'product', id:p.id, name:p.name, price:p.price} } })} className="border px-4 py-2 rounded-xl">Buy Now</button>
        </div>
      </div>
    </div>
  )
}
