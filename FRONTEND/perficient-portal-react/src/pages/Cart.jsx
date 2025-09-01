import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Cart() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [items, setItems] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]')
    return saved.map(p => ({
      ...p,
      price: Number(p.price),
      quantity: p.quantity ? p.quantity : 1,
    }))
  })

  useEffect(() => {
    if (state?.add) {
      const product = {
        ...state.add,
        price: Number(state.add.price),
      }
      const existingIndex = items.findIndex(p => p.id === product.id)
      let next
      if (existingIndex !== -1) {
        next = [...items]
        next[existingIndex].quantity += 1
      } else {
        next = [...items, { ...product, quantity: 1 }]
      }
      setItems(next)
      localStorage.setItem('cart', JSON.stringify(next))
      history.replaceState({}, document.title)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCart = (next) => {
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const addOne = (i) => {
    const next = [...items]
    next[i].quantity += 1
    updateCart(next)
  }

  const removeOne = (i) => {
    const next = [...items]
    if (next[i].quantity > 1) {
      next[i].quantity -= 1
    } else {
      next.splice(i, 1) // remove item completely
    }
    updateCart(next)
  }

  const total = items.reduce((a, b) => a + b.price * b.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        )}
        {items.map((p, i) => (
          <div
            key={i}
            className="p-4 border rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm">
                  ₹{p.price} x {p.quantity}
                </div>
                <div className="text-sm font-semibold">
                  Subtotal: ₹{p.price * p.quantity}
                </div>
              </div>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeOne(i)}
                className="px-2 py-1 border rounded text-sm"
              >
                - Remove 1
              </button>
              <button
                onClick={() => addOne(i)}
                className="px-2 py-1 border rounded text-sm"
              >
                + Add 1
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-xl font-bold">Total: ₹{total}</div>
          <button
            onClick={() =>
              navigate('/payment-cart', {
                state: {
                  items: items.map(p => ({
                    id: p.id,
                    name: p.name,
                    unitPrice: p.price,
                    quantity: p.quantity,
                    totalPrice: p.price * p.quantity,
                  })),
                  total: total,
                },
              })
            }
            className="bg-brand-red text-white px-5 py-2 rounded-xl"
          >
            Pay
          </button>
        </div>
      )}
    </div>
  )
}
