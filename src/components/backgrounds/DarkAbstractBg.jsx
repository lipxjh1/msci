"use client"

import { useEffect, useState } from "react"

export default function DarkAbstractBg() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Tạo ngẫu nhiên 20 điểm sáng
    const arr = Array.from({ length: 20 }).map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.5 + 0.5}px`,
      blur: `${Math.random() * 3 + 1}px`,
      opacity: (Math.random() * 0.3 + 0.1).toFixed(2),
    }))
    setParticles(arr)
  }, [])

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* ——————————————————————————————————————————
           1. Gradient overlay từ đen sang đen-xám
      —————————————————————————————————————————— */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/30 via-black/50 to-black"></div>
      
      {/* ——————————————————————————————————————————
           2. Các đường mờ có hiệu ứng
      —————————————————————————————————————————— */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute -left-1/4 top-1/3 w-[150%] h-px
            bg-gradient-to-r from-transparent via-gray-700/30 to-transparent
            rotate-[15deg]
            opacity-20
          "
        />
        <div
          className="
            absolute -right-1/4 bottom-1/3 w-[150%] h-px
            bg-gradient-to-r from-transparent via-gray-700/30 to-transparent
            -rotate-[10deg]
            opacity-10
          "
        />
      </div>

      {/* ——————————————————————————————————————————
           3. Lưới chấm mờ
      —————————————————————————————————————————— */}
      <div className="absolute grid grid-cols-10 gap-8 top-10 left-20 opacity-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className="block w-px h-px bg-gray-500" />
        ))}
      </div>

      {/* ——————————————————————————————————————————
           4. Các điểm sáng mờ ngẫu nhiên
      —————————————————————————————————————————— */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-gray-400 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            filter: `blur(${p.blur})`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* ——————————————————————————————————————————
           5. Hiệu ứng fog/mist mờ
      —————————————————————————————————————————— */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-gray-800/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full bg-gray-800/5 blur-3xl"></div>
      <div className="absolute top-2/3 left-1/2 w-80 h-80 rounded-full bg-gray-800/5 blur-3xl"></div>
      
      {/* ——————————————————————————————————————————
           6. Overlay vignette
      —————————————————————————————————————————— */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30 pointer-events-none"></div>
    </div>
  );
} 