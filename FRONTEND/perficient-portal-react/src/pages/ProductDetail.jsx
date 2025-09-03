import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`http://localhost:8085/catalog/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProduct(res.data)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch product details.")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-10">Loading...</div>
  if (error) return <div className="max-w-3xl mx-auto px-4 py-10">{error}</div>
  if (!product) return <div className="max-w-3xl mx-auto px-4 py-10">Product not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
      <img 
        src={product.imageUrl} 
        alt={product.productName} 
        className="w-full h-64 object-contain border rounded-2xl"
      />
      <div>
        <h1 className="text-2xl font-bold">{product.productName}</h1>
        <div className="text-2xl font-bold my-2">₹{product.basePrice}</div>
        <p className="text-gray-700">{product.productDescription}</p>
        <p className="mt-2 text-sm text-gray-600 font-semibold">Specifications:</p>
            <ul className="list-disc pl-6 text-gray-700">
              {product.specifications &&
                Object.entries(
                  typeof product.specifications === "string"
                    ? JSON.parse(product.specifications) // parse JSON if it's a string
                    : product.specifications             // already object
                ).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
            </ul>

        <div className="mt-4 flex gap-2">
          {/*<button 
            onClick={() => navigate('/cart', { state: { add: product } })} 
            className="bg-brand-red text-white px-4 py-2 rounded-xl"
          >
            Add to Cart
          </button>*/}


          <button 
  onClick={() => navigate('/cart', { 
    state: { add: {
      id: product.productId,
      name: product.productName,
      price: product.basePrice,
      image: product.imageUrl
    }} 
  })} 
  className="bg-brand-red text-white px-4 py-2 rounded-xl"
>
  Add to Cart
</button>

          {/* <button 
            // onClick={() => navigate('/payment', { state: { item: {type:'product', id:product.productId, name:product.productName, price:product.basePrice} } })} 
            className="border px-4 py-2 rounded-xl"
          >
            {/* Buy Now */}
          {/* </button> */} 
        </div>
      </div>
    </div>
  )
}