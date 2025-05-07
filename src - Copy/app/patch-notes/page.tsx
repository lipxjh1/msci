import React from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Image from 'next/image';
import Footer from "@/app/home/components/Footer";

export const metadata = {
  title: 'Patch Notes | Overwatch Clone',
  description: 'Latest updates and changes to Overwatch Clone game',
};

export default function PatchNotesPage() {
  return (
    <div className="min-h-screen bg-[#16181D] text-white">
      <ThanhDieuHuongResponsive />

      {/* Hero Banner */}
      <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
        <Image 
          src="/images/banner/trangchu.jpg" 
          alt="Patch Notes Banner" 
          fill 
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#16181D]/70 via-[#16181D]/60 to-[#16181D]"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
              PATCH NOTES
            </h1>
            <div className="w-20 h-1 bg-[#FF7D00] mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#1F2326] rounded-lg overflow-hidden border border-gray-800">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="w-2 h-10 bg-[#FF7D00] rounded-full mr-4"></div>
              <h2 className="text-2xl md:text-3xl font-bold">Latest Updates</h2>
            </div>
            
            {/* Coming Soon Message */}
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Patch Notes Coming Soon</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We're working on our first major update. Patch notes will be available here shortly.
                Stay tuned for exciting new features, balance changes, and bug fixes!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
} 