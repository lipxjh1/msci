"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const GachaInfo: React.FC = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="my-8 py-6">
      {/* Backdrop glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Main title - GACHA SYSTEM */}
      <div className="relative z-10 text-center mb-12 animate-on-scroll fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-gradient">
          GACHA SYSTEM
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6"></div>
        <p className="text-gray-300 md:text-lg max-w-3xl mx-auto px-4">
          Explore M-SCI's unique Gacha system, where you can collect heroes with different powers to build your battle squad.
        </p>
      </div>

      {/* Explore the Heroes Universe */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 p-6 bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 animate-on-scroll slide-right">
            <h3 className="text-2xl font-bold text-white relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-400 before:to-cyan-300 animate-pulse-slow">
              Explore the M-SCI Heroes Universe
            </h3>
            
            <p className="text-gray-300">
              Welcome to M-SCI's premium Gacha system - where humanity's fate is in your hands! With each spin, you have the chance to own legendary warriors, each with their own unique power and story.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-3 bg-blue-900/30 px-4 py-3 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="w-3 h-3 rounded-full bg-cyan-400 pulse-animation"></div>
                <span className="text-cyan-100">Transparent rates</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-900/30 px-4 py-3 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="w-3 h-3 rounded-full bg-purple-400 pulse-animation"></div>
                <span className="text-purple-100">Regular updates</span>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden animate-on-scroll slide-left shadow-glow group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-400/10 z-10 group-hover:opacity-70 transition-opacity duration-700"></div>
            <Image 
              src="/images/ga-cha/anh1.png"
              alt="Gacha Heroes"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent z-20"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-30">
              <p className="text-white font-bold text-xl text-shadow-blue animate-float">Thousands of warriors waiting for you to discover!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Character classifications and classes */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Character Tiers */}
          <div className="space-y-8 animate-on-scroll slide-up p-6 bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20">
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 text-3xl animate-pulse-slow">🌟</span>
              <h3 className="text-2xl font-bold text-white glow-text-yellow">Character Tiers</h3>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white/80 mb-4">Rarity System</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-lg border border-red-500/10 hover:border-red-500/30 transition-all duration-300 transform hover:translate-x-2 hover:shadow-glow-red">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center text-red-500 font-bold animate-pulse-slow">S</div>
                    <span className="font-bold text-red-400 text-lg">Legendary</span>
                  </div>
                  <p className="text-gray-400 ml-11">Akane, Alice, Caitlyn</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 transform hover:translate-x-2 hover:shadow-glow-purple">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-500 font-bold animate-pulse-slow">A</div>
                    <span className="font-bold text-purple-400 text-lg">Epic</span>
                  </div>
                  <p className="text-gray-400 ml-11">Victoria, Elizabeth, Alexandra</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 transform hover:translate-x-2 hover:shadow-glow-blue">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-500 font-bold animate-pulse-slow">B</div>
                    <span className="font-bold text-blue-400 text-lg">Rare</span>
                  </div>
                  <p className="text-gray-400 ml-11">Anna, Julia, Fiona</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/10 hover:border-green-500/30 transition-all duration-300 transform hover:translate-x-2 hover:shadow-glow-green">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center text-green-500 font-bold animate-pulse-slow">C</div>
                    <span className="font-bold text-green-400 text-lg">Common</span>
                  </div>
                  <p className="text-gray-400 ml-11">Marcus, David, Henry</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Three Unique Classes */}
          <div className="space-y-8 animate-on-scroll slide-up delay-300 p-6 bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20">
            <div className="flex items-center gap-3">
              <span className="text-blue-400 text-3xl animate-pulse-slow">🎯</span>
              <h3 className="text-2xl font-bold text-white glow-text-blue">Three Unique Classes</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-900/20 to-transparent rounded-lg overflow-hidden border border-red-500/20 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-glow-red group">
                <div className="flex p-5 items-center gap-5">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image 
                      src="/images/ga-cha/anh1.png" 
                      alt="Gunner" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-red-900/20 group-hover:bg-red-900/10 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">Gunner</h4>
                    <p className="text-gray-300 mb-3">Rapid fire attack (1s/10 shots)</p>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-[80%] animate-pulse-width"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg overflow-hidden border border-blue-500/20 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-glow-blue group">
                <div className="flex p-5 items-center gap-5">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image 
                      src="/images/ga-cha/anh2.png" 
                      alt="Sniper" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">Sniper</h4>
                    <p className="text-gray-300 mb-3">Precise shots (1s/1 shot)</p>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[95%] animate-pulse-width"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-900/20 to-transparent rounded-lg overflow-hidden border border-orange-500/20 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-glow-orange group">
                <div className="flex p-5 items-center gap-5">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image 
                      src="/images/ga-cha/anh3.png" 
                      alt="Rocket" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-orange-900/20 group-hover:bg-orange-900/10 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-orange-400 mb-2 group-hover:text-orange-300 transition-colors duration-300">Rocket</h4>
                    <p className="text-gray-300 mb-3">Area damage (3s/1 shot)</p>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[60%] animate-pulse-width"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drop rates section */}
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <div className="bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 md:p-8 animate-on-scroll fade-up">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Drop Rates</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-b from-red-900/30 to-red-900/10 rounded-xl p-5 text-center border border-red-500/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2 text-red-400">5%</div>
              <div className="text-white font-semibold mb-1">Legendary (S)</div>
              <div className="text-gray-400 text-sm">The rarest heroes</div>
            </div>
            
            <div className="bg-gradient-to-b from-purple-900/30 to-purple-900/10 rounded-xl p-5 text-center border border-purple-500/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2 text-purple-400">10%</div>
              <div className="text-white font-semibold mb-1">Epic (A)</div>
              <div className="text-gray-400 text-sm">Powerful characters</div>
            </div>
            
            <div className="bg-gradient-to-b from-blue-900/30 to-blue-900/10 rounded-xl p-5 text-center border border-blue-500/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2 text-blue-400">30%</div>
              <div className="text-white font-semibold mb-1">Rare (B)</div>
              <div className="text-gray-400 text-sm">Good additions</div>
            </div>
            
            <div className="bg-gradient-to-b from-green-900/30 to-green-900/10 rounded-xl p-5 text-center border border-green-500/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2 text-green-400">55%</div>
              <div className="text-white font-semibold mb-1">Common (C)</div>
              <div className="text-gray-400 text-sm">Standard characters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Special features */}
      <div className="max-w-6xl mx-auto mt-16 mb-8 px-4">
        <div className="text-center mb-10 animate-on-scroll fade-up">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">System Features</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">Our Gacha system offers unique features to enhance your gameplay experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 animate-on-scroll slide-up">
            <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 text-center">Power Fusion</h4>
            <p className="text-gray-300 text-center">Combine duplicate heroes to increase their power level, unlocking new abilities and enhanced stats.</p>
          </div>
          
          <div className="bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 animate-on-scroll slide-up delay-100">
            <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 text-center">Pity System</h4>
            <p className="text-gray-300 text-center">Our pity system increases the chances of obtaining rare heroes after consecutive unsuccessful attempts.</p>
          </div>
          
          <div className="bg-[#041832]/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 animate-on-scroll slide-up delay-200">
            <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-orange-500 to-amber-400 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 text-center">Collection Rewards</h4>
            <p className="text-gray-300 text-center">Earn special rewards by completing hero collections and unlocking synergy bonuses for your team.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GachaInfo; 