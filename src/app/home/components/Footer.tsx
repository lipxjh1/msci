"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0b0d12] py-6 relative">
      {/* Top navigation */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
            <Link href="/careers" className="text-gray-300 hover:text-white text-sm">Careers</Link>
            <Link href="/about" className="text-gray-300 hover:text-white text-sm">About</Link>
            <Link href="/support" className="text-gray-300 hover:text-white text-sm">Support</Link>
            <Link href="/contact-us" className="text-gray-300 hover:text-white text-sm">Contact Us</Link>
            <Link href="/press" className="text-gray-300 hover:text-white text-sm">Press</Link>
            <Link href="/api" className="text-gray-300 hover:text-white text-sm">API</Link>
          </div>
          <div className="flex items-center pr-16">
            <FaGlobe className="text-gray-400 mr-2 h-4 w-4" />
            <span className="text-gray-300 text-sm">English (US)</span>
          </div>
        </div>
        
        {/* Logo and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Image 
                src="/images/overwatch_logo.png" 
                alt="Blizzard" 
                width={120} 
                height={50} 
                className="object-contain"
              />
            </Link>
          </div>
          
          <div className="text-gray-500 text-xs mb-4 md:mb-0 text-center md:text-left">
            <p>©2024 M-SCI ENTERTAINMENT, INC.</p>
            <p>All rights reserved. All trademarks referenced herein are the properties of their respective owners.</p>
          </div>
          
          {/* Social links */}
          <div className="flex gap-4 pr-16">
            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebookF className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
              <FaYoutube className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Legal links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-xs">
          <Link href="/privacy" className="text-gray-500 hover:text-white">Privacy</Link>
          <Link href="/legal" className="text-gray-500 hover:text-white">Legal</Link>
          <Link href="/terms" className="text-gray-500 hover:text-white">Terms</Link>
          <Link href="/cookie-policy" className="text-gray-500 hover:text-white">Cookie Policy</Link>
          <Link href="/cookie-settings" className="text-gray-500 hover:text-white">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
} 