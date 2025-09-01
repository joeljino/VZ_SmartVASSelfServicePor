// //   import React, { useState } from 'react'
// // import { products } from '../data'
// // import { useNavigate } from 'react-router-dom'

// // export default function Product(){
// //   const [category, setCategory] = useState('All')
// //   const navigate = useNavigate()
// //   const cats = ['All', 'Router', 'Tablet', 'Bluetooth Headset']
// //   const list = category==='All' ? products : products.filter(p=>p.category===category)

// //   return (
// //     <div className="max-w-6xl mx-auto px-4 py-10">
// //       <div className="flex items-center gap-3 mb-6">
// //         <label className="text-sm">Category</label>
// //         <select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded-xl px-3 py-2">
// //           {cats.map(c=> <option key={c} value={c}>{c}</option>)}
// //         </select>
// //       </div>
// //       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {list.map(p=>(
// //           <div key={p.id} className="p-4 border rounded-2xl shadow-soft hover-zoom">
// //             <img src={p.image} alt={p.name} className="w-full h-40 object-contain mb-3"/>
// //             <div className="font-semibold">{p.name}</div>
// //             <div className="text-2xl font-bold mt-1">₹{p.price}</div>
// //             <div className="flex gap-2 mt-3">
// //               <button onClick={()=>navigate(`/product/${p.id}`)} className="flex-1 border rounded-xl py-2">View</button>
// //               <button onClick={()=>navigate('/cart', { state: { add: p } })} className="flex-1 bg-brand-red text-white rounded-xl py-2">Add to Cart</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }


// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// export default function Product() {
//   const [category, setCategory] = useState('All')
//   const [products, setProducts] = useState([])
//   const navigate = useNavigate()
//   const cats = ['All', 'Router', 'Tablet', 'Bluetooth']

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem('token') // get token
//         const res = await axios.get('http://localhost:8085/catalog/products', {
//           headers: {
//             Authorization: `Bearer ${token}`, // pass token in header
//           },
//         })
//         setProducts(res.data)
//       } catch (err) {
//         console.error('Error fetching products:', err)
//       }
//     }
//     fetchProducts()
//   }, [])

//   const list =
//     category === 'All'
//       ? products
//       : products.filter(p => p.category === category)

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <div className="flex items-center gap-3 mb-6">
//         <label className="text-sm">Category</label>
//         <select
//           value={category}
//           onChange={e => setCategory(e.target.value)}
//           className="border rounded-xl px-3 py-2"
//         >
//           {cats.map(c => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {list.map(p => (
//           <div
//             key={p.productId}
//             className="p-4 border rounded-2xl shadow-soft hover-zoom"
//           >
//             <img
//               src={p.imageUrl}
//               alt={p.productName}
//               className="w-full h-40 object-contain mb-3"
//             />
//             <div className="font-semibold">{p.productName}</div>
//             <div className="text-2xl font-bold mt-1">₹{p.basePrice}</div>
//             <div className="flex gap-2 mt-3">
//               <button
//                 onClick={() => navigate(`/product/${p.productId}`)}
//                 className="flex-1 border rounded-xl py-2"
//               >
//                 View
//               </button>
//               <button
//                 onClick={() => navigate('/cart', { state: { add: p } })}
//                 className="flex-1 bg-brand-red text-white rounded-xl py-2"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Product() {
  const [category, setCategory] = useState('All')
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const cats = ['All', 'Router', 'Tablet', 'Bluetooth']

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token') // get token
        const res = await axios.get('http://localhost:8085/catalog/products', {
          headers: {
            Authorization: `Bearer ${token}`, // pass token in header
          },
        })
        setProducts(res.data)
      } catch (err) {
        console.error('Error fetching products:', err)
      }
    }
    fetchProducts()
  }, [])

  const list =
    category === 'All'
      ? products
      : products.filter(p => p.category === category)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm">Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          {cats.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(p => (
          <div
            key={p.productId}
            className="p-4 border rounded-2xl shadow-soft hover-zoom"
          >
            <img
              src={p.imageUrl}
              alt={p.productName}
              className="w-full h-40 object-contain mb-3"
            />
            <div className="font-semibold">{p.productName}</div>
            <div className="text-2xl font-bold mt-1">₹{p.basePrice}</div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate(`/product/${p.productId}`)}
                className="flex-1 border rounded-xl py-2"
              >
                View
              </button>
              {/*<button
                onClick={() => navigate('/cart', { state: { add: p } })}
                className="flex-1 bg-brand-red text-white rounded-xl py-2"
              >
                Add to Cart
              </button>*/}

              <button
  onClick={() => navigate('/cart', { 
    state: { add: {
      id: p.productId,
      name: p.productName,
      price: p.basePrice,
      image: p.imageUrl
    }} 
  })}
  className="flex-1 bg-brand-red text-white rounded-xl py-2"
>
  Add to Cart
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
