import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Subscription(){
  const navigate = useNavigate()
  const purchases = JSON.parse(localStorage.getItem('purchases')||'[]')

  const active = purchases.slice(-2) // last 2 as active for demo
  const inactive = purchases.slice(0, -2)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Active Plans</h2>
        <div className="space-y-3">
          {active.length===0 && <p className="text-sm text-gray-500">No active plans yet.</p>}
          {active.map((p,i)=>(
            <div key={i} className="p-4 border rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-gray-500">{new Date(p.date).toLocaleString()}</div>
              </div>
              <span className="text-green-600 text-sm">ACTIVE</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Inactive Plans</h2>
        <div className="space-y-3">
          {inactive.length===0 && <p className="text-sm text-gray-500">No inactive plans.</p>}
          {inactive.map((p,i)=>(
            <div key={i} className="p-4 border rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-gray-500">{new Date(p.date).toLocaleString()}</div>
              </div>
              <button onClick={()=>navigate('/payment', { state: { item: p } })} className="px-3 py-1 rounded-lg bg-brand-red text-white text-sm">Pay</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
