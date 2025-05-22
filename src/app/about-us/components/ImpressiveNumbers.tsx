"use client";

import { useEffect, useState } from "react";

export default function ImpressiveNumbers() {
  // Các giá trị số và thông tin
  const numbers = [
    { value: 50000, suffix: "+", label: "Pre-registration" },
    { value: 25000, suffix: "+", label: "Community members" },
    { value: 98, suffix: "%", label: "Satisfaction rate from Beta testers" },
    { value: 20, suffix: "+", label: "Passionate development team" },
    { value: 5, suffix: "", label: "Leading strategic partners" },
  ];
  // State cho từng số
  const [counts, setCounts] = useState(numbers.map(() => 0));

  useEffect(() => {
    // Animation chạy số cho từng số
    const durations = [1200, 1200, 1000, 1000, 800]; // ms
    const intervals = numbers.map((num, idx) => {
      const start = 0;
      const end = num.value;
      const duration = durations[idx];
      const stepTime = Math.max(10, duration / end);
      let current = start;
      return setInterval(() => {
        current += Math.ceil(end / (duration / stepTime));
        if (current >= end) {
          current = end;
          setCounts(prev => {
            const next = [...prev];
            next[idx] = end;
            return next;
          });
          clearInterval(intervals[idx]);
        } else {
          setCounts(prev => {
            const next = [...prev];
            next[idx] = current;
            return next;
          });
        }
      }, stepTime);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="mb-16">
      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              IMPRESSIVE NUMBERS
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
          {numbers.map((num, idx) => (
            <div key={num.label} className="flex flex-col items-center text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent-blue-bright)] mb-2 transition-all duration-500">
                {counts[idx].toLocaleString()}<span>{num.suffix}</span>
              </div>
              <div className="text-gray-300 text-sm">{num.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
