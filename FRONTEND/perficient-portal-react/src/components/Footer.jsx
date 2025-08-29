import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-6xl mx-auto p-6 text-center text-sm text-gray-600">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 bg-brand-red rounded-full"></div>
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-black"><span className="font-semibold">Perficient</span> · Smart VAS Self Service Portal</p>
        <p className="text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  )
}
