"use client"

import { useEffect, useState } from "react"

export default function GoldenAbstractBg() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Tạo ngẫu nhiên 30 điểm sáng
    const arr = Array.from({ length: 30 }).map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      blur: `${Math.random() * 4 + 2}px`,
      opacity: (Math.random() * 0.5 + 0.3).toFixed(2),
    }))
    setParticles(arr)
  }, [])

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* ——————————————————————————————————————————
           1. Thanh gradient nghiêng có animation
      —————————————————————————————————————————— */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute -left-1/4 top-1/4 w-[150%] h-px
            bg-gradient-to-r from-transparent via-yellow-500 to-transparent
            rotate-[15deg]
            opacity-40 animate-slide
          "
        />
        <div
          className="
            absolute -right-1/4 bottom-1/3 w-[150%] h-px
            bg-gradient-to-r from-transparent via-yellow-400 to-transparent
            -rotate-[10deg]
            opacity-30 animate-slide-reverse
          "
        />
      </div>

      {/* ——————————————————————————————————————————
           2. Lưới chấm vàng
      —————————————————————————————————————————— */}
      <div className="absolute grid grid-cols-5 gap-2 top-20 left-20 opacity-25">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="block w-1 h-1 bg-yellow-600" />
        ))}
      </div>

      {/* Lưới chấm thứ 2 ở góc đối diện */}
      <div className="absolute grid grid-cols-5 gap-2 bottom-20 right-20 opacity-25">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="block w-1 h-1 bg-yellow-600" />
        ))}
      </div>

      {/* ——————————————————————————————————————————
           3. Các điểm sáng nhỏ (particles glow)
      —————————————————————————————————————————— */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-yellow-400 rounded-full"
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
           4. Hiệu ứng ánh sáng và bóng mờ
      —————————————————————————————————————————— */}
      <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-yellow-500/10 blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-yellow-500/5 blur-3xl animate-float-slower"></div>
      <div className="absolute top-2/3 left-1/2 w-32 h-32 rounded-full bg-yellow-400/10 blur-3xl animate-float"></div>
    </div>
  );
} 