import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageSlider({ images = [] }) {
  const [index, setIndex] = useState(0)
  const imgs = images && images.length ? images : ['/a.png', '/b.png', '/c.png']

  const prev = () => setIndex((i) => (i - 1 + imgs.length) % imgs.length)
  const next = () => setIndex((i) => (i + 1) % imgs.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div tabIndex={0} className="outline-none">
      <div className="relative rounded-md overflow-hidden shadow-md">
        <img src={imgs[index]} alt={`slide-${index}`} className="w-full h-[460px] object-cover transition-transform duration-300" />

        <button
          onClick={prev}
          aria-label="previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-white/90"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          aria-label="next"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-white/90"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto">
        {imgs.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-24 h-16 overflow-hidden rounded-lg flex-shrink-0 transform transition-transform duration-200 ${i === index ? 'ring-2 ring-emerald-500 scale-105' : 'hover:scale-105'}`}>
            <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
