"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronUp, FiX, FiPlay } from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";
import Image from "next/image";

const menuItems = [
  {
    label: "GAME",
    submenu: [
      { href: "/", label: "Home" },
      { href: "/heroes", label: "Heroes" },
      { href: "/story", label: "Story" },
      { href: "/mechanics", label: "Gameplay" },
      { href: "/gacha", label: "Gacha (Summon)" },
      { href: "/minigames", label: "Mini Games", badge: "NEW" },
      { href: "/download", label: "Download Game", badge: "HOT" },
    ],
  },
  {
    label: "MARKETPLACE",
    href: "/coming-soon",
    badge: "Coming Soon",
  },
  {
    label: "COMMUNITY",
    submenu: [
      { href: "/new", label: "News" },
      { href: "/forum-coming-soon", label: "Forum", badge: "Coming Soon" },
      { href: "/social-hub-coming-soon", label: "Social Hub", badge: "Coming Soon" },
      { href: "/tournaments-coming-soon", label: "Tournaments", badge: "Coming Soon" },
      { href: "/creators-coming-soon", label: "Content Creator", badge: "Coming Soon" },
      { href: "/hall-of-fame-coming-soon", label: "Hall of Fame", badge: "Coming Soon" },
    ],
  },
  {
    label: "INVEST & DONATE",
    submenu: [
      { href: "/token-coming-soon", label: "$MSCI Token", badge: "Coming Soon" },
      { href: "/tokenomics-coming-soon", label: "Tokenomics", badge: "Coming Soon" },
      { href: "/donate-coming-soon", label: "Donation Packages", badge: "VIP" },
      { href: "/roadmap", label: "Roadmap" },
      { href: "/referral-coming-soon", label: "Referral Program", badge: "Coming Soon" },
      { href: "/staking-coming-soon", label: "Staking & Rewards", badge: "Coming Soon" },
      { href: "/partners", label: "Partners & Backers" },
    ],
  },
  {
    label: "ABOUT",
    submenu: [
      { href: "/about-us", label: "About Us" },
      { href: "/team", label: "Team" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press Kit", badge: "Coming Soon" },
      { href: "/contact", label: "Contact" },
      { href: "/support", label: "Support" },
    ],
  },
];

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black/70 transition-all duration-300 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={onClose}
    >
      <nav
        className={`absolute right-0 top-0 h-full w-4/5 max-w-xs bg-[#10131a] shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/overwatch_logo.png" alt="Logo" width={40} height={40} />
            <span className="font-bold text-lg text-white">M-SCI</span>
          </Link>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800 text-white">
            <FiX size={24} />
          </button>
        </div>

        {/* Play Now */}
        <div className="px-4 py-3">
          <Link
            href="https://t.me/MSCIChannel"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base shadow hover:from-blue-500 hover:to-purple-500 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiPlay />
            Play Now
          </Link>
        </div>

        {/* Menu */}
        <ul className="flex flex-col gap-1 px-2 py-2">
          {menuItems.map((item, idx) => (
            <li key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-900 text-white font-semibold text-base focus:outline-none"
                    onClick={() => handleToggle(idx)}
                  >
                    <span>{item.label}</span>
                    {openIndex === idx ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openIndex === idx && (
                    <ul className="flex flex-col gap-1 mt-1 ml-2 border-l-2 border-purple-700/40 pl-2">
                      {item.submenu.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className="flex items-center justify-between w-full px-4 py-2 rounded bg-gray-800 text-white text-base hover:bg-purple-800 transition"
                            onClick={onClose}
                          >
                            <span className="flex items-center gap-2">
                              {sub.badge === "NEW" && (
                                <RiSparklingFill className="text-yellow-400" />
                              )}
                              {sub.label}
                            </span>
                            {sub.badge && (
                              <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded bg-blue-600 text-white">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-900 text-white font-semibold text-base hover:bg-purple-800 transition"
                  onClick={onClose}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded bg-blue-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Footer (optional) */}
        <div className="mt-auto px-4 py-4 border-t border-gray-800 text-center text-xs text-gray-400">
          © 2025 M-SCI. All rights reserved.
        </div>
      </nav>
    </div>
  );
} 