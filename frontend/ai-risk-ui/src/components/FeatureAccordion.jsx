import { useState } from "react"

export default function FeatureAccordion({ title, short, details }) {

  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 hover:scale-105"
      onClick={() => setOpen(!open)}
    >

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-gray-600">{short}</p>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-500 text-sm">
          {details}
        </p>
      </div>

    </div>
  )
}