"use client";

import { useState, useEffect } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { AnhHung } from "@/loai";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";

export default function HeroDetailPage() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const supabase = useSupabase();
  const [hero, setHero] = useState<AnhHung | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Lấy thông tin chi tiết anh hùng
  useEffect(() => {
    async function fetchHero() {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("anh_hung")
          .select(
            `
            *,
            vai_tro(id, ten, mo_ta),
            do_hi_em(id, ma, ten, mau_sac)
          `
          )
          .eq("id", params.id)
          .single();

        if (error) throw error;
        setHero(data as AnhHung);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin anh hùng:", err);
        setError("Không thể lấy thông tin anh hùng");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchHero();
    }
  }, [supabase, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[var(--overwatch-blue)] border-solid"></div>
      </div>
    );
  }

  if (error || !hero) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)] flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-white text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Lỗi</h2>
          <p>{error || "Không tìm thấy anh hùng"}</p>
          <button
            onClick={() => router.push("/heroes")}
            className="mt-6 px-6 py-3 bg-[var(--overwatch-blue)] rounded-lg text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  // Lấy màu từ độ hiếm
  const rarityColor = hero.do_hi_em?.mau_sac || "#4CAF50";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Navigation Bar */}
      <ThanhDieuHuongResponsive />

      {/* Hero Header - Cải tiến với hiệu ứng parallax và glow */}
      <div className="relative py-20">
        {/* Background Effects - Nâng cấp với hiệu ứng parallax và ánh sáng động */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--overwatch-dark-blue)]/50 to-[var(--overwatch-dark-blue)] z-10"></div>
          <div className="w-full h-full bg-gradient-to-br from-[#071a2e] to-[#041019]">
            {/* Enhanced animated background elements based on rarity */}
            <div
              className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse-slow motion-safe:animate-floating"
              style={{ backgroundColor: rarityColor }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-2xl opacity-10 animate-pulse-slow animation-delay-1000 motion-safe:animate-floating-delay"
              style={{ backgroundColor: rarityColor }}
            ></div>
            <div
              className="absolute top-1/3 left-1/2 w-48 h-48 rounded-full blur-xl opacity-10 animate-pulse-slow animation-delay-2000 motion-safe:animate-floating-alt"
              style={{ backgroundColor: rarityColor }}
            ></div>
          </div>

          {/* Enhanced animated particles with more variety */}
          <div className="absolute inset-0 overflow-hidden z-5">
            <div className="absolute top-1/5 left-1/5 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse motion-safe:animate-floating-fast"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-300 motion-safe:animate-floating-fast-alt"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-500 motion-safe:animate-floating-fast-delay"></div>
            <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-red-300 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-700 motion-safe:animate-floating-fast"></div>
            <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-1000 motion-safe:animate-floating-fast-alt"></div>
          </div>
        </div>

        {/* Hero Content - Cải tiến với hiệu ứng và layout mới */}
        <div className="max-w-7xl mx-auto px-4 relative z-10 animate-fadeIn">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Hero Image with Enhanced Effects */}
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl group perspective">
                {/* Enhanced animated border glow */}
                <div
                  className="absolute inset-0 z-0 rounded-xl animate-border-glow-enhanced"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${rarityColor}aa, transparent)`,
                    backgroundSize: "200% 100%",
                  }}
                ></div>

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-12 h-12 z-20 pointer-events-none">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0H20V4H4V20H0V0Z" fill={`${rarityColor}CC`} />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 z-20 pointer-events-none">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M48 48H28V44H44V28H48V48Z"
                      fill={`${rarityColor}CC`}
                    />
                  </svg>
                </div>

                {/* Inner frame with 3D hover effect */}
                <div className="absolute inset-[2px] rounded-xl overflow-hidden z-10 group-hover:transform group-hover:scale-105 transition-all duration-700 ease-out">
                  {hero.anh_dai_dien ? (
                    <Image
                      src={hero.anh_dai_dien}
                      alt={hero.ten}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 filter saturate-[1.1]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-white/30">Không có ảnh</span>
                    </div>
                  )}

                  {/* Enhanced overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                </div>

                {/* Enhanced Rarity Badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-sm text-white text-sm font-bold z-20 backdrop-blur-sm shadow-lg border border-white/20 flex items-center space-x-1 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl"
                  style={{ backgroundColor: `${rarityColor}DD` }}
                >
                  <span className="text-xs mr-1 opacity-80">⭐</span>
                  <span>{hero.do_hi_em?.ma || "C"}</span>
                </div>

                {/* Character name in bottom frame with enhanced design */}
                <div className="absolute bottom-0 inset-x-0 p-4 flex items-end z-20">
                  <div
                    className="w-full py-3 px-4 backdrop-blur-md rounded-lg bg-black/60 border border-white/10 transform transition-all duration-500 group-hover:translate-y-[-4px]"
                    style={{
                      borderColor: `${rarityColor}AA`,
                      boxShadow: `0 4px 20px -2px ${rarityColor}30`,
                    }}
                  >
                    <h2 className="text-2xl font-bold text-white text-shadow-sm">
                      {hero.ten}
                    </h2>
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: rarityColor }}
                      ></div>
                      <p className="text-white/90">
                        {hero.do_hi_em?.ten || "Common"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Info with Enhanced Design - cải tiến với thẻ, hiệu ứng và bố cục */}
            <div className="w-full md:w-2/3 text-white">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 shadow-xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <pattern
                      id="smallGrid"
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 8 0 L 0 0 0 8"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.2"
                      />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                  </svg>
                </div>

                {/* Rarity accent in corner */}
                <div
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl opacity-20"
                  style={{ backgroundColor: rarityColor }}
                ></div>

                {/* Role tag with animation */}
                <div
                  className="inline-flex px-4 py-1.5 rounded-full text-sm bg-[#F44336] text-white mb-4 border border-white/5 items-center"
                  style={{ boxShadow: `0 0 8px rgba(244, 67, 54, 0.3)` }}
                >
                  <span className="font-medium">
                    ● {hero.vai_tro?.ten || "Không xác định"}
                  </span>
                </div>

                {/* Hero name with shimmering effect */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative inline-block">
                  <span className="text-white hero-name-shimmer relative">
                    {hero.ten}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </h1>

                {/* Rarity name with customized color */}
                <p className="text-xl mb-6 flex items-center">
                  <span
                    className="font-bold mr-2"
                    style={{ color: rarityColor }}
                  >
                    {hero.do_hi_em?.ma || "C"}
                  </span>
                  <span className="text-white/80">
                    {hero.do_hi_em?.ten || "Common"}
                  </span>
                </p>

                <div className="border-t border-white/10 pt-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#F44336]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="relative">
                      Details
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#F44336]/50 to-transparent"></span>
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                    <div className="p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                      {/* Decorative corner accent */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0L20 0L0 20L0 0Z"
                            fill={`${rarityColor}50`}
                          />
                        </svg>
                      </div>

                      <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">
                        FIRE RATE
                      </h3>
                      <p className="font-semibold text-lg flex items-center">
                        <span className="text-[#F44336] mr-2">●</span>
                        {hero.toc_do_ban || "1s/10 shots"}
                      </p>
                    </div>

                    <div className="p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                      {/* Decorative corner accent */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0L20 0L0 20L0 0Z"
                            fill={`${rarityColor}50`}
                          />
                        </svg>
                      </div>

                      <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">
                        CHARACTERISTICS
                      </h3>
                      <p className="font-semibold text-lg flex items-center">
                        <span className="text-[#F44336] mr-2">●</span>
                        {hero.dac_diem ||
                          "-50% damage when attacking Drone and Shield"}
                      </p>
                    </div>

                    {hero.ky_nang && (
                      <div className="col-span-2 p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0L20 0L0 20L0 0Z"
                              fill={`${rarityColor}50`}
                            />
                          </svg>
                        </div>

                        <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">
                          SKILLS
                        </h3>
                        <p className="font-semibold flex items-start">
                          <span className="text-[#F44336] mr-2 mt-1.5">●</span>
                          <span>
                            {hero.ky_nang ||
                              "No special skill"}
                          </span>
                        </p>
                      </div>
                    )}

                    {hero.tieu_su && (
                      <div className="col-span-2 p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0L20 0L0 20L0 0Z"
                              fill={`${rarityColor}50`}
                            />
                          </svg>
                        </div>

                        <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">
                          BIOGRAPHY
                        </h3>
                        <p className="font-semibold flex items-start">
                          <span className="text-[#F44336] mr-2 mt-1.5">●</span>
                          <span>{hero.tieu_su || "No information provided"}</span>
                        </p>
                      </div>
                    )}

                    {hero.thu_nhap_chip && (
                      <div className="col-span-2 p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0L20 0L0 20L0 0Z"
                              fill={`${rarityColor}50`}
                            />
                          </svg>
                        </div>

                        <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">
                          CHIP EARNING
                        </h3>
                        <p className="font-semibold flex items-start">
                          <span className="text-[#F44336] mr-2 mt-1.5">●</span>
                          <span>{hero.thu_nhap_chip || "No information provided"}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add the "Back to list" link here - Moved inside the main content div, after the flex layout */}
          <div className="w-full bg-gradient-to-r from-[#041019]/80 to-[#071a2e]/80 backdrop-blur-sm py-3 shadow-md border-b border-white/5 mb-20">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
              <Link
                href="/heroes"
                className="inline-flex items-center text-white hover:text-[#F44336] transition-colors group relative"
              >
                <div className="mr-2 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F44336]/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium text-white">Back to list</span>
              </Link>
            </div>
          </div>

        </div> {/* Closing div for max-w-7xl */}
      </div> {/* Closing div for relative py-20 */}
    </div>
  );
}
