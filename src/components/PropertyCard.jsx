import { useState } from "react"
import { Heart } from "lucide-react"
import { Link } from 'react-router-dom'

export default function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="w-[280px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-200 group">
      {/* Image */}
      <div className="relative h-[180px] bg-gray-200">
        <img
          src={'/Screenshot 2026-02-16 161408.png'}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Price badge */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-3 py-1 rounded-md shadow text-sm font-semibold">
          ₹ {property.price} L
        </div>

        {/* Heart icon */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked) }}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow"
        >
          <Heart
            size={18}
            className={`${
              liked
                ? "fill-red-500 text-red-500"
                : ""
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
          {property.title}, {property.details}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-600 mt-1">
          In <span className="font-medium">{property.location}</span>
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <span>
            Posted by <span className="font-medium">{property.postedBy}</span>
          </span>
          <span>{property.postedAgo}</span>
        </div>
      </div>
    </div>
    </Link>
  )
}