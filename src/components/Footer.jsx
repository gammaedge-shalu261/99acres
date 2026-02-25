import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function Footer(){
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setEmail('')
  }

  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold">99acres</div>
          <div className="mt-2 text-xs text-gray-500">Find properties, agents and projects near you.</div>
        </div>

        <div className="md:col-span-1">
          <div className="font-medium">Useful Links</div>
          <div className="mt-2 flex gap-4">
            <a className="hover:text-emerald-600">About</a>
            <a className="hover:text-emerald-600">Contact</a>
            <a className="hover:text-emerald-600">Privacy</a>
          </div>
        </div>

        <div>
          <div className="font-medium">Subscribe to updates</div>
          <form onSubmit={subscribe} className="mt-2 flex gap-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="px-3 py-2 border rounded-lg text-sm w-full" />
            <button type="submit" className="px-3 py-2 bg-emerald-600 text-white rounded">Subscribe</button>
          </form>
          {saved && <div className="mt-2 text-sm text-emerald-600">Thanks — we saved your email.</div>}
        </div>

        <div className="md:col-span-3 mt-6 text-xs text-gray-500">© {new Date().getFullYear()} 99acres - Demo</div>

        {showTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed right-6 bottom-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg">
            <ChevronUp size={18} />
          </button>
        )}
      </div>
    </footer>
  )
}
