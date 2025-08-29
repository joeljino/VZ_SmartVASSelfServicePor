import React from 'react'
import { useNavigate } from 'react-router-dom'
import { telecomBanners } from '../data'
import { Mail, Phone, MapPin } from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <img src={telecomBanners.home} alt="Home banner" className="w-full h-screen object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Connect Faster. Manage Smarter.</h1>
            <button
              onClick={() => navigate('/plans')}
              className="bg-brand-red px-6 py-3 rounded-xl hover:opacity-90"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* About with animated feature cards */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-40">
        <h2 className="text-16xl md:text-5xl font-bold mb-6">
          Why choose <span className="text-brand-red">FlexiCom</span>?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: '24/7 Support', desc: 'Always-on chat and call assistance.' },
            { title: 'Secure Payments', desc: 'Industry-leading encryption & tokenization.' },
            { title: 'Flexible Plans', desc: 'Data & Wi-Fi bundles to match your usage.' },
            { title: 'Instant Activation', desc: 'Go live within minutes after payment.' },
            { title: 'Smart Notifications', desc: 'Expiry alerts and product updates.' },
            { title: 'Unified Cart', desc: 'Buy plans & devices together.' },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border shadow-soft hover-zoom fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-brand-red font-semibold">{f.title}</div>
              <div className="text-sm text-gray-600 mt-2">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-600 mb-8">
            Any questions or remarks? Contact Us
          </p>

          
          

          {/* Info boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow">
              <Mail className="mx-auto text-brand-red w-10 h-10 mb-4" />
              <h3 className="font-semibold">EMAIL</h3>
              <p className="text-gray-600 text-sm">support@flexicom.com</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <Phone className="mx-auto text-brand-red w-10 h-10 mb-4" />
              <h3 className="font-semibold">PHONE (LANDLINE)</h3>
              <p className="text-gray-600 text-sm">+912 9 876 5432<br />+912 5 252 3356</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <MapPin className="mx-auto text-brand-red w-10 h-10 mb-4" />
              <h3 className="font-semibold">OUR OFFICE LOCATION</h3>
              <p className="text-gray-600 text-sm">
                 FlexiCom<br />
                The Courtyard, Al Quoz 1, Guindy, Chennai
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
