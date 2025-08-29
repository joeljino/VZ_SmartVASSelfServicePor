import React from 'react'

export default function Profile(){
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="p-6 border rounded-2xl">
        <div className="mb-3"><span className="text-gray-600 text-sm">Name</span><div className="font-semibold">{user.name || '—'}</div></div>
        <div><span className="text-gray-600 text-sm">Email</span><div className="font-semibold">{user.email || '—'}</div></div>
      </div>
    </div>
  )
}
