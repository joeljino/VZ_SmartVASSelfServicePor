import React from 'react'

export default function Notification(){
  const purchases = JSON.parse(localStorage.getItem('purchases')||'[]')
  const alerts = [
    ...purchases.slice(-2).map(p=>({ type:'expiry', msg:`Your ${p.name} is expiring soon.` })),
    { type:'product', msg:'New Wi‑Fi 6E routers are now available.' }
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-3">
      <h1 className="text-2xl font-bold mb-2">Notifications</h1>
      {alerts.map((a,i)=>(
        <div key={i} className="p-4 border rounded-xl flex items-center justify-between">
          <div>{a.msg}</div>
          <span className={`text-xs px-2 py-1 rounded-full ${a.type==='expiry'?'bg-yellow-100 text-yellow-800':'bg-blue-100 text-blue-800'}`}>
            {a.type==='expiry'?'Plan':'Product'}
          </span>
        </div>
      ))}
      {alerts.length===0 && <p className="text-sm text-gray-500">No alerts.</p>}
    </div>
  )
}
