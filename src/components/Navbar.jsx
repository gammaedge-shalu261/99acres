import { useState, useRef, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const loc = useLocation()
  const inputRef = useRef(null)

  const suggestions = [
    'Indore', 'Mumbai', 'Bengaluru', 'Delhi', 'Kolkata', 'Pune', 'Chennai'
  ].filter(s => s.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const onDoc = (e) => {
      if (!inputRef.current) return
      if (!inputRef.current.contains(e.target)) setShowSuggestions(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  return (
    <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded hover:bg-gray-100">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="text-emerald-600 font-bold text-xl">99acres</Link>

          <nav className={`hidden md:flex gap-6 text-sm text-gray-700 ${open ? 'block' : ''}`}>
            <Link to="/" className={`hover:text-emerald-600 ${loc.pathname === '/' ? 'text-emerald-600 font-medium' : ''}`}>Buy</Link>
            <a className="hover:text-emerald-600">Rent</a>
            <a className="hover:text-emerald-600">Sell</a>
            <a className="hover:text-emerald-600">Agents</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block relative" ref={inputRef}>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <input value={query} onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true) }} placeholder="Search city, project, or locality" className="px-3 py-2 w-72 text-sm focus:outline-none" />
              <div className="px-2 border-l">
                <Search size={16} className="text-gray-400" />
              </div>
            </div>

            {showSuggestions && query && (
              <div className="absolute mt-1 w-full bg-white border rounded shadow z-40">
                {suggestions.length ? suggestions.map((s) => (
                  <button key={s} onClick={() => { setQuery(s); setShowSuggestions(false) }} className="w-full text-left px-3 py-2 hover:bg-emerald-50">{s}</button>
                )) : <div className="px-3 py-2 text-sm text-gray-500">No suggestions</div>}
              </div>
            )}
          </div>

          <button className="text-emerald-600 border border-emerald-600 px-3 py-1 rounded">Login</button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">Buy</Link>
            <button onClick={() => setOpen(false)} className="py-2 text-left">Rent</button>
            <button onClick={() => setOpen(false)} className="py-2 text-left">Sell</button>
            <button onClick={() => setOpen(false)} className="py-2 text-left">Agents</button>
          </div>
        </div>
      )}
    </header>
  )
}
