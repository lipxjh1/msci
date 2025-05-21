'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSocialLinks, getSocialIconColor } from '@/context/SocialLinksContext';

export default function JoinUsFooter() {
  const { socialLinks, loading } = useSocialLinks();
  
  return (
    <div className="relative w-full overflow-hidden">
      {/* Battlefield Image Background */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image 
          src="/images/banner/chantran1.jpg" 
          alt="Heroes battlefield" 
          fill
          sizes="100vw"
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
        
        <div className="absolute inset-0 z-10">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
              FIGHT FOR HUMANITY'S FUTURE. JOIN M-SCI!
            </h2>
            
            <Link 
              href="/play"
              className="mt-4 mb-8 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
            >
              PLAY NOW
            </Link>
            
            <div className="mt-8">
              <h3 className="text-gray-300 uppercase text-sm tracking-widest mb-4">FOLLOW US</h3>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white hover:text-[#FF7D00] transition-colors ${getSocialIconColor(social.name)}`}
                    title={social.name}
                  >
                    <span className="text-2xl">
                      {social.icon || social.name.charAt(0)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 