"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaTwitter, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "M-SCI",
      links: [
        { name: "Về chúng tôi", href: "/about" },
        { name: "Tin tức", href: "/tin-tuc" },
        { name: "Liên hệ", href: "/lien-he" },
        { name: "Tuyển dụng", href: "/careers" }
      ]
    },
    {
      title: "Trợ giúp",
      links: [
        { name: "Hướng dẫn", href: "/huong-dan" },
        { name: "FAQ", href: "/faq" },
        { name: "Hỗ trợ", href: "/ho-tro" },
        { name: "Báo lỗi", href: "/bao-loi" }
      ]
    },
    {
      title: "Pháp lý",
      links: [
        { name: "Điều khoản", href: "/terms" },
        { name: "Bảo mật", href: "/privacy" },
        { name: "Cookies", href: "/cookies" },
        { name: "Bản quyền", href: "/copyright" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaDiscord />, href: "https://discord.gg/msci" },
    { icon: <FaTwitter />, href: "https://twitter.com/msci" },
    { icon: <FaFacebook />, href: "https://facebook.com/msci" },
    { icon: <FaYoutube />, href: "https://youtube.com/msci" },
    { icon: <FaTiktok />, href: "https://tiktok.com/@msci" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src="/logo.png"
                  alt="M-SCI Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-orbitron font-bold text-xl text-white">M-SCI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Game hành động theo đội nhóm 5v5, miễn phí với nhiều anh hùng đa dạng, 
              kỹ năng độc đáo và trải nghiệm chiến đấu đỉnh cao.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Social Link</span>
                  <span className="text-xl">{link.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 className="font-orbitron font-bold text-white mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} M-SCI. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex space-x-6">
            <Link 
              href="/terms"
              className="text-gray-500 hover:text-cyan-400 transition-colors text-sm"
            >
              Điều khoản
            </Link>
            <Link 
              href="/privacy"
              className="text-gray-500 hover:text-cyan-400 transition-colors text-sm"
            >
              Bảo mật
            </Link>
            <Link 
              href="/cookies"
              className="text-gray-500 hover:text-cyan-400 transition-colors text-sm"
            >
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 