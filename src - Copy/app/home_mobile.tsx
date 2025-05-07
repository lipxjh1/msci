"use client";

import Image from "next/image";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import Button from "@/components/Button";
import { useState, useEffect, useRef } from "react";
import Footer from "@/app/home/components/Footer";

export default function HomeMobile() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Thêm trạng thái để quản lý việc chuyển đổi nhân vật
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [vfxActive, setVfxActive] = useState(false);
  
  const heroImages = [
    "/images/heroin/player_0_ui_idle.png",
    "/images/heroin/ui 4.png",
    "/images/heroin/ui 5.png",
    "/images/heroin/ui 10.png",
    "/images/heroin/ui11.png",
    "/images/heroin/ui7.png",
    "/images/heroin/uiux 1.png"
  ];

  // Tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  // Tự động chuyển đổi nhân vật
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      // Kích hoạt hiệu ứng VFX khi chuyển đổi
      setVfxActive(true);
      setTimeout(() => setVfxActive(false), 500);
    }, 2000);

    return () => clearInterval(heroInterval);
  }, []);

  // Handle scroll behavior for mobile nav

  const slides = [
    {
      id: 1,
      image: "/images/free.jpg",
      title: "FREE TO PLAY",
      badge: "FREE",
      badgeColor: "var(--accent-blue-bright)",
      description:
        "Free game, constantly evolving. Gather your friends and join the new PvP experience.",
    },
    {
      id: 2,
      image: "/images/new.jpg",
      title: "NEW HEROES",
      badge: "NEW",
      badgeColor: "var(--vaiTroDamage)",
      description:
        "Choose from a variety of heroes with different roles and gameplay styles.",
    },
    {
      id: 3,
      image: "/images/like.jpg",
      title: "NEXT-GEN ACTION",
      badge: "ACTION",
      badgeColor: "var(--vaiTroSupport)",
      description:
        "Intense battles, new heroes, multiple maps and an exciting 3v3 experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)]">
      {/* Navigation Bar - Mobile Version */}

      {/* Hero Section cho Mobile */}
      <section className="relative overflow-hidden h-screen pb-16">
        {/* Background image thay cho video trên mobile */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="Overwatch Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[var(--bg-accent-dark)]/50 to-[var(--bg-dark)] z-10"></div>
        </div>

        {/* Menu điều hướng nổi */}
        <div className="relative z-20">
          <ThanhDieuHuongResponsive />
        </div>

        {/* Nội dung banner cho mobile - tối ưu hóa với các phần tử lớn hơn và dễ tương tác */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 pb-24 mt-12">
          <div className="text-center">
            <h1
              className="text-5xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow"
              style={{ letterSpacing: "-0.025em" }}
            >
              Overwatch
            </h1>
            <p className="text-lg text-[var(--accent-blue-bright)] font-semibold mb-8 tracking-wide uppercase animate-fade-in">
              Action • Combat • Freedom
            </p>
            <div className="flex flex-col gap-4 animate-slide-up w-full">
              <Button
                href="/duong_dan/anh_hung"
                variant="transparent"
                size="lg"
                animate="none"
                className="w-full py-4 text-lg tracking-wider text-shadow-sm button-cyber"
              >
                Play Now
              </Button>
              <Button
                href="/heroes"
                variant="transparent"
                size="lg"
                animate="none"
                className="w-full py-4 text-lg tracking-wider text-shadow-sm button-cyber"
              >
                View Heroes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section - Mobile Optimized with Auto Slider */}
      <section className="py-16 px-5 bg-gradient-to-b from-[#0d2e4b] to-[#071a2e] text-white relative overflow-hidden">
        {/* Hiệu ứng nền */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[var(--bg-dark)] to-transparent"></div>
          <div className="absolute -right-20 top-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
          <div className="absolute -left-20 bottom-1/4 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white mb-5 relative cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                GAME OF THE YEAR
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <div className="h-1 w-20 bg-[var(--accent-blue-bright)]/70 mx-auto mb-6"></div>
            <p className="text-base text-white/80 leading-relaxed">
              M-SCI is a sci-fi tactical action game set in 2049, where technology and humanity clash on a global scale. You will join the M-SCI forces to protect humanity against the threat from The Assended and their robot army.
            </p>
          </div>

          {/* Auto Sliding Cards */}
          <div className="relative overflow-hidden rounded-xl h-[380px] mb-4">
            <div
              className="absolute inset-0 transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="w-full h-full flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-b from-[#0a2544] to-[#061529] rounded-xl overflow-hidden shadow-lg shadow-black/30 border border-white/10 hover:border-[var(--accent-blue-bright)]/30 hover:shadow-[var(--accent-blue-bright)]/5 transition-all">
                    <div className="relative h-48 w-full">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div
                        className="absolute bottom-3 left-3 text-white font-bold py-1 px-3 rounded-full text-sm backdrop-blur-sm"
                        style={{ backgroundColor: `${slide.badgeColor}80` }}
                      >
                        {slide.badge}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4 text-[var(--accent-blue-bright)]">
                        {slide.title}
                      </h3>
                      <p className="text-white/90 text-base">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel navigation dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array(slides.length)
              .fill(0)
              .map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    activeSlide === i ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
          </div>

          {/* Swipe Indicator */}
          <div className="text-white/40 text-xs text-center mt-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-3 h-3 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Swipe to see more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-3 h-3 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Heroes Section - Mobile Optimized */}
      <section className="py-16 px-5 bg-gradient-to-b from-[#0a1a28] to-[#051018] text-white relative overflow-hidden">
        {/* Hiệu ứng nền */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#071a2e] to-transparent"></div>
          <div className="absolute w-full h-full">
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              opacity="0.1"
            >
              <pattern
                id="hexagons-mobile"
                width="40"
                height="70"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(2)"
              >
                <path
                  d="M0,0 L20,0 L20,18 L0,18 L0,0 Z M20,10 L40,10 L40,28 L20,28 L20,10 Z M0,20 L20,20 L20,38 L0,38 L0,20 Z M20,30 L40,30 L40,48 L20,48 L20,30 Z M0,40 L20,40 L20,58 L0,58 L0,40 Z M20,50 L40,50 L40,68 L20,68 L20,50 Z"
                  fill="none"
                  stroke="var(--accent-blue-bright)"
                  strokeWidth="0.5"
                ></path>
              </pattern>
              <rect width="100%" height="100%" fill="url(#hexagons-mobile)" />
            </svg>
          </div>
          <div className="absolute top-1/4 right-0 w-32 h-32 rounded-full bg-[var(--vaiTroTank)]/10 blur-2xl"></div>
          <div className="absolute bottom-10 left-5 w-24 h-24 rounded-full bg-[var(--vaiTroDamage)]/10 blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-4 relative cyber-halo">
              <span className="text-shadow-blue relative inline-block">
                HEROES
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <div className="h-1 w-20 bg-[var(--accent-blue-bright)]/70 mx-auto mb-6"></div>
          </div>

          {/* Hero Cards Grid for Mobile */}
          <div className="grid grid-cols-2 gap-5">
            {/* Hero Card với hiệu ứng chuyển đổi */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0c2341] to-[#071528] shadow-lg shadow-black/30 relative transform hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                <div className={`absolute inset-0 ${vfxActive ? 'bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 animate-flash' : ''}`}></div>
                <Image
                  src={heroImages[currentHeroIndex]}
                  alt="Hero Character"
                  fill
                  className={`object-cover transition-all duration-500 ${vfxActive ? 'scale-105 brightness-125' : ''}`}
                />
                {/* Indicator cho nhân vật đang hiển thị */}
                <div className="absolute top-1 right-1 bg-black/70 rounded-full px-2 py-0.5 text-[10px] text-cyan-400 font-bold">
                  {currentHeroIndex + 1}/{heroImages.length}
                </div>
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-[var(--accent-blue-bright)]">
                  HERO {currentHeroIndex + 1}
                </h3>
                <div className="inline-block mt-1 mb-2 px-2 py-0.5 bg-[var(--vaiTroDamage)]/30 text-white text-xs rounded-full">
                  {currentHeroIndex % 3 === 0 ? 'DAMAGE' : currentHeroIndex % 3 === 1 ? 'SUPPORT' : 'TANK'}
                </div>
              </div>
            </div>

            {/* Hero Card 2 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0c2341] to-[#071528] shadow-lg shadow-black/30 relative transform hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                <Image
                  src="/images/heroin/ui 5.png"
                  alt="Mercy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-[var(--accent-blue-bright)]">
                  MERCY
                </h3>
                <div className="inline-block mt-1 mb-2 px-2 py-0.5 bg-[var(--vaiTroSupport)]/30 text-white text-xs rounded-full">
                  SUPPORT
                </div>
              </div>
            </div>

            {/* Hero Card 3 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0c2341] to-[#071528] shadow-lg shadow-black/30 relative transform hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                <Image
                  src="/images/heroin/ui11.png"
                  alt="Reinhardt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-[var(--accent-blue-bright)]">
                  REINHARDT
                </h3>
                <div className="inline-block mt-1 mb-2 px-2 py-0.5 bg-[var(--vaiTroTank)]/30 text-white text-xs rounded-full">
                  TANK
                </div>
              </div>
            </div>

            {/* Hero Card 4 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0c2341] to-[#071528] shadow-lg shadow-black/30 relative transform hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                <Image
                  src="/images/heroin/ui7.png"
                  alt="Genji"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-bold text-[var(--accent-blue-bright)]">
                  GENJI
                </h3>
                <div className="inline-block mt-1 mb-2 px-2 py-0.5 bg-[var(--vaiTroDamage)]/30 text-white text-xs rounded-full">
                  DAMAGE
                </div>
              </div>
            </div>
          </div>

          {/* View All Heroes Button */}
          <div className="mt-6 text-center">
            <Button
              href="/heroes"
              variant="transparent"
              size="md"
              className="w-full py-3 text-base tracking-wider text-shadow-sm button-cyber bg-gradient-to-r from-[var(--vaiTroTank)]/20 to-[var(--vaiTroTank)]/10 border border-[var(--vaiTroTank)]/30"
            >
              VIEW ALL HEROES
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 px-5 relative overflow-hidden bg-gradient-to-br from-[#0d2e4b] via-[#061224] to-[#050a14] text-white">
        {/* Hiệu ứng nền */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#051018] to-transparent"></div>
          <div className="absolute w-full h-full overflow-hidden">
            <div className="absolute w-40 h-40 rounded-full bg-blue-400/10 blur-2xl -top-10 -right-10"></div>
            <div className="absolute w-32 h-32 rounded-full bg-[var(--accent-blue-bright)]/10 blur-xl bottom-10 left-1/4"></div>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl  text-white mb-4 cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              GET STARTED
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-base text-white/80 mb-8">
            Ready to join the world of M-SCI? Join for free today!
          </p>
          <Button
            href="/duong_dan/anh_hung"
            variant="transparent"
            size="lg"
            animate="pulse"
            className="w-full py-4 text-lg tracking-wider text-shadow-sm button-cyber bg-gradient-to-r from-[var(--accent-blue-bright)]/20 to-[var(--accent-blue-bright)]/10 backdrop-blur-sm border border-[var(--accent-blue-bright)]/30"
          >
            PLAY NOW
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
