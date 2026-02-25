import { Link, useParams } from 'react-router-dom'
import properties from '../data/properties.json'
import ImageSlider from '../components/ImageSlider'
import { useState } from 'react'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = properties.find((p) => String(p.id) === String(id))

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 bg-white rounded shadow">Property not found</div>
      </div>
    )
  }

  // Use supplied images for the gallery (served from public/)
  const images = ['/a.png', '/b.png', '/c.png']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="text-emerald-600">Home</Link> &middot; <span>{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images (2/3 width on large) */}
          <div className="lg:col-span-2">
            <ImageSlider images={images} />

            <div className="mt-4 bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Why should you consider this property?</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">Close to School</span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">On-Call Maintenance Staff</span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">Close to Hospital</span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">Parking Available</span>
              </div>
            </div>
          </div>

          {/* Right: Details card */}
          <aside className="bg-white p-6 rounded shadow">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{property.title}</h1>
                <p className="text-gray-600 mt-1">{property.details}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹ {property.price} Lac</div>
                <div className="text-sm text-gray-500">@ 3,733 per sq.ft.</div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <div className="text-xs text-gray-400">Area</div>
                <div className="font-medium">Carpet area: 750 sq.ft.</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Configuration</div>
                <div className="font-medium">2 Bedrooms , 2 Bathrooms, 1 Balcony</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Address</div>
                <div className="font-medium">{property.location}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Floor Number</div>
                <div className="font-medium">3rd of 4 Floors</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Property Age</div>
                <div className="font-medium">5 to 10 Year Old</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded">Contact Owner</button>
              <button className="flex-1 border border-gray-200 px-4 py-2 rounded">Shortlist</button>
            </div>
          </aside>
        </div>

        {/* Owner & Enquiry Section */}
        <div className="mt-12 bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Owner card (left) */}
              <div className="lg:col-span-4 bg-white p-8 rounded shadow">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-3xl text-gray-500">👤</div>
                  <div>
                    <div className="text-lg font-semibold">nitin</div>
                    <div className="text-xs text-gray-400">Owner</div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded">View Phone Number</button>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <div>Properties Listed: <span className="font-medium text-emerald-600">2</span></div>
                  <div className="mt-3">Localities : Sudama Nagar</div>
                </div>
              </div>

              {/* Enquiry form (right) */}
              <div className="lg:col-span-8 bg-white p-8 rounded shadow">
                <h3 className="text-lg font-semibold">Send enquiry to Owner</h3>

                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EnquiryForm(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('I am interested in this Property.')
  const [agree, setAgree] = useState(false)
  const [kind, setKind] = useState('individual')
  const [reason, setReason] = useState('self')

  const submit = (e) => {
    e.preventDefault()
    if(!name) return alert("Please provide your name")
    if(!agree) return alert("Please agree to Terms & Conditions")
    // stub: show data
    alert('Enquiry sent — we will contact you soon')
    setName(''); setEmail(''); setPhone(''); setMessage('I am interested in this Property.'); setAgree(false)
  }

  return (
    <form onSubmit={submit} className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="flex gap-4 items-center">
          <div>
            <div className="text-sm text-gray-500">You are</div>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2"><input type="radio" checked={kind==='individual'} onChange={()=>setKind('individual')} /> <span className="text-sm">Individual</span></label>
              <label className="flex items-center gap-2"><input type="radio" checked={kind==='dealer'} onChange={()=>setKind('dealer')} /> <span className="text-sm">Dealer</span></label>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Your reason to buy is</div>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2"><input type="radio" checked={reason==='investment'} onChange={()=>setReason('investment')} /> <span className="text-sm">Investment</span></label>
              <label className="flex items-center gap-2"><input type="radio" checked={reason==='self'} onChange={()=>setReason('self')} /> <span className="text-sm">Self Use</span></label>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 border rounded" />
            {!name && <div className="text-xs text-red-500 mt-1">What's your name?</div>}
          </div>

          <div>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="col-span-1 sm:col-span-1 flex gap-2">
            <select className="px-3 py-2 border rounded">
              <option>IND (+91)</option>
            </select>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone Number" className="flex-1 px-3 py-2 border rounded" />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={6} className="w-full px-3 py-2 border rounded" />
            <div className="text-xs text-gray-400 mt-1">400 chars</div>
          </div>

          <div className="col-span-1 sm:col-span-2 flex items-center gap-2">
            <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
            <div className="text-sm">I agree to the <span className="text-emerald-600">Terms & Conditions</span> and <span className="text-emerald-600">Privacy Policy</span></div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-gray-50 p-4 rounded border h-full flex flex-col justify-between">
          <div>
            <div className="text-sm text-gray-500">Contact preview</div>
            <div className="mt-3 text-sm text-gray-800">{name || 'Your name'}</div>
            <div className="mt-1 text-xs text-gray-500">{phone || 'Phone number'}</div>
          </div>

          <div>
            <button type="submit" className="w-full bg-sky-600 text-white px-4 py-2 rounded">Send Email & SMS</button>
          </div>
        </div>
      </div>
    </form>
  )
}
