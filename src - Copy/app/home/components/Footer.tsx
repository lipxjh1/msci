"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTwitter, 
  FaFacebookF, 
  FaYoutube, 
  FaInstagram, 
  FaDiscord, 
  FaTelegramPlane
} from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  
  // Lấy link từ thanh điều hướng
  const footerLinks = [
    {
      title: "Game",
      links: [
        { name: "Heroes", href: "/heroes" },
        { name: "Story", href: "/story" },
        { name: "Gameplay", href: "/mechanics" },
        { name: "Download", href: "/download" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "News", href: "/tin-tuc" },
        { name: "Content Creator", href: "/creators" },
        { name: "Partners", href: "/partners" },
        { name: "Roadmap", href: "/roadmap" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ]
    },
  ];

  const socialLinks = [
    { name: "Twitter", icon: <FaTwitter />, href: "#" },
    { name: "Facebook", icon: <FaFacebookF />, href: "#" },
    { name: "Discord", icon: <FaDiscord />, href: "#" },
    { name: "Telegram", icon: <FaTelegramPlane />, href: "https://t.me/MSCIChannel" },
    { name: "YouTube", icon: <FaYoutube />, href: "#" },
    { name: "Instagram", icon: <FaInstagram />, href: "#" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPopup(true);
    setEmailInput("");
    
    // Tự động đóng popup sau 3 giây
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const popupVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.8,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <footer className="relative bg-[#0a141e] text-white overflow-hidden">
      {/* In chìm hình chantran1.jpg */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <Image
          src="/images/banner/chantran1.jpg"
          alt="Background"
          fill
          className="object-contain object-center"
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e] via-[#0a141e]/90 to-[#0f1923] pointer-events-none"></div>
      
      {/* Top glowing border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo và social */}
          <div className="md:col-span-3 flex flex-col">
            <Link href="/" className="inline-block mb-5">
              <Image 
                src="/images/overwatch_logo.png" 
                alt="M-SCI" 
                width={130} 
                height={50} 
                className="object-contain hover:opacity-90 transition-opacity" 
              />
            </Link>
            
            <div className="flex space-x-3 mt-3">
              {socialLinks.map((social, index) => (
                <Link 
                  key={index} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white bg-white/5 hover:bg-blue-600/20 backdrop-blur-sm border border-white/5 transition-all duration-300"
                >
                  <span className="text-sm">
                    {social.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6">
            {footerLinks.map((section, index) => (
              <div key={index} className="flex flex-col">
                <h4 className="text-white font-medium text-base mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-8 after:bg-blue-500">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-white font-medium text-base mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-8 after:bg-blue-500">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest news and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required 
              />
              <button 
                type="submit" 
                className="mt-3 w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-3 md:mb-0">
              © 2025 M-SCI. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">Terms of Use</Link>
              <Link href="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popup thông báo */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mr-2">✓</div>
            <p>Thanks for subscribing to our newsletter!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
} 