'use client';

import { useState, useEffect, useRef } from 'react';
import ResponsiveNavigation from '@/thanh_phan/responsive_navigation';
import { useSupabase } from '@/context/SupabaseContext';
import { AnhHung } from '@/loai';
import dynamic from 'next/dynamic';
import { Card } from '@/components/gacha/CardInterface';

// Import components
const GachaBanner = dynamic(() => import('@/components/gacha/GachaBanner'), { ssr: false });
const CardSpinner = dynamic(() => import('@/components/gacha/CardSpinner'), { ssr: false });
const ResultPopup = dynamic(() => import('@/components/gacha/ResultPopup'), { ssr: false });
const GachaInfo = dynamic(() => import('@/components/gacha/GachaInfo'), { ssr: false });
const GachaMoreInfo = dynamic(() => import('@/components/gacha/GachaMoreInfo'), { ssr: false });

export default function GachaPage() {
  const supabase = useSupabase();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroes, setHeroes] = useState<AnhHung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Fetch heroes from Supabase
  useEffect(() => {
    async function fetchHeroes() {
      setLoading(true);
      setError(null);
      
      try {
        // Check Supabase connection
        const { data: testConnection, error: connectionError } = await supabase
          .from('vai_tro')
          .select('*')
          .limit(1);
        
        if (connectionError) {
          console.error('Supabase connection error:', connectionError);
          throw new Error(`Unable to connect to Supabase. Details: ${connectionError.message}`);
        }
        
        // Get heroes data with role and rarity information
        let query = supabase
          .from('anh_hung')
          .select(`
            *,
            vai_tro(id, ten, mo_ta),
            do_hi_em(id, ma, ten, mau_sac)
          `)
          .order('ten');
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Data query error:', error);
          throw new Error(`Data query error: ${error.message}`);
        }
        
        console.log("Heroes data for gacha:", data);
        
        if (!data || data.length === 0) {
          console.warn('No hero data found');
          setHeroes([]);
        } else {
          setHeroes(data as AnhHung[]);
        }
      } catch (err: any) {
        console.error('Error fetching heroes list:', err);
        setError(`Unable to fetch heroes list. ${err.message || 'Please check the console for details.'}`);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroes();
  }, [supabase]);

  // Convert AnhHung data to Card format
  const convertHeroesToCards = (heroes: AnhHung[]): Card[] => {
    return heroes.map(hero => {
      // Get rarity from do_hi_em.ma (S, A, B, C)
      const rarity = hero.do_hi_em?.ma as ('S' | 'A' | 'B' | 'C'); 
      
      // Set class color based on vai_tro
      let classType: 'Gunner' | 'Sniper' | 'Rocket' = 'Gunner';
      let classColor = '#FF5252';
      
      if (hero.vai_tro) {
        if (hero.vai_tro.id === 1) {
          classType = 'Gunner';
          classColor = '#FF5252';
        } else if (hero.vai_tro.id === 2) {
          classType = 'Sniper';
          classColor = '#2196F3';
        } else if (hero.vai_tro.id === 3) {
          classType = 'Rocket';
          classColor = '#FF9800';
        }
      }
      
      return {
        id: parseInt(hero.id),
        name: hero.ten,
        class: classType,
        imageUrl: hero.anh_dai_dien || '/images/ga-cha/anh1.png', // Fallback image if none provided
        classColor: classColor,
        rarity: rarity || 'C',
        description: hero.dac_diem || 'No description available',
        skills: hero.ky_nang ? [hero.ky_nang] : [],
        stats: {
          attack: 80,
          defense: 60,
          health: 75,
          speed: 70
        }
      };
    });
  };
  
  // Get cards from heroes data
  const cards = convertHeroesToCards(heroes);
  
  // Create extended card set for continuous movement effect
  const extendedCards = [...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards];

  // Random card with weighted probability
  const getRandomCard = () => {
    const rarityProbabilities = {
      'S': 0.05,  // 5%
      'A': 0.10,  // 10%
      'B': 0.30,  // 30%
      'C': 0.55   // 55%
    };

    // Determine rarity
    const rand = Math.random();
    let rarity: 'S' | 'A' | 'B' | 'C';
    
    if (rand < rarityProbabilities['S']) {
      rarity = 'S';
    } else if (rand < rarityProbabilities['S'] + rarityProbabilities['A']) {
      rarity = 'A';
    } else if (rand < rarityProbabilities['S'] + rarityProbabilities['A'] + rarityProbabilities['B']) {
      rarity = 'B';
    } else {
      rarity = 'C';
    }
    
    // Filter cards by rarity
    const cardsOfRarity = cards.filter(card => card.rarity === rarity);
    
    // If no matching cards, return a random card
    if (cardsOfRarity.length === 0) {
      return cards.length > 0 ? cards[Math.floor(Math.random() * cards.length)] : null;
    }
    
    // Choose a random card from the filtered list
    return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
  };
  
  const closePopup = () => {
    setShowResult(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    // Animation loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Reset container position when component is mounted
    if (cardsContainerRef.current) {
      cardsContainerRef.current.style.transform = 'translateX(0)';
    }
    
    return () => clearTimeout(timer);
  }, []);

  const animateCardSelection = async () => {
    if (!cardsContainerRef.current) return;
    
    // Reset to initial position
    cardsContainerRef.current.style.transition = 'none';
    cardsContainerRef.current.style.transform = 'translateX(0)';
    
    // Force reflow to reset animation
    void cardsContainerRef.current.offsetWidth;
    
    // Add animation class
    cardsContainerRef.current.classList.add('spinning-cards');
    
    // Set spin time to 3 seconds
    setTimeout(() => {
      if (!cardsContainerRef.current) return;
      
      // Stop animation
      cardsContainerRef.current.classList.remove('spinning-cards');
      
      // Select a random card
      const card = getRandomCard();
      setSelectedCard(card);
      
      // Show result after 500ms
      setTimeout(() => {
        setShowResult(true);
        setIsSpinning(false);
      }, 500);
    }, 3000);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    setSelectedCard(null);
    
    // Start card animation
    animateCardSelection();
  };

  return (
    <main className="min-h-screen bg-[#041019] text-white overflow-hidden">
      {/* Navigation Bar */}
      <div className="relative z-30">
        <ResponsiveNavigation />
      </div>

      {/* Hero Banner */}
      <div className="relative min-h-[200px]">
        <GachaBanner />
      </div>

      <div id="gacha-content" className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Main Gacha Container */}
        <div className="bg-[#05121d]/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-[var(--accent-blue-bright)]/30 mb-6 shadow-lg shadow-[var(--accent-blue-bright)]/5">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-3 text-shadow-blue animate-title-glow">
              <span className="relative inline-block">
                LUCKY SPIN SYSTEM
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">Test your luck with our unique Gacha system. Spin for a chance to receive rare characters with different drop rates.</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-32">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[var(--accent-blue-bright)] animate-spin"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 text-white text-center my-12 max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-400 mb-2">An error occurred</h3>
              <p className="text-white/80">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-6 px-6 py-2 tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Cards Container */}
          {!loading && !error && cards.length > 0 && (
            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <CardSpinner 
                extendedCards={extendedCards} 
                isSpinning={isSpinning} 
                cardRefs={cardRefs}
                cardsContainerRef={cardsContainerRef}
              />
              
              {/* Spin Button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className={`font-rajdhani text-lg md:text-xl font-bold tracking-wider px-8 md:px-12 py-3 md:py-4 button-cyber clip-hexagon hexagon-border text-white transition-all duration-300 ${
                    isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40'
                  }`}
                >
                  {isSpinning ? 'SPINNING...' : 'SPIN GACHA'}
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && cards.length === 0 && (
            <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No heroes found</h3>
              <p className="text-white/60 max-w-lg mx-auto">Unable to load heroes data. Please check your Supabase connection.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-6 px-6 py-3 tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
        
        {/* Gacha Information Section */}
        <div className="animate-fade-in mb-4">
          <GachaInfo />
        </div>
        
        {/* Gacha More Information Section */}
        <div className="animate-fade-in delay-300">
          <GachaMoreInfo />
        </div>
      </div>

      {/* Result Popup */}
      <ResultPopup 
        showResult={showResult} 
        selectedCard={selectedCard} 
        closePopup={closePopup} 
        handleSpin={handleSpin} 
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-16 h-16 rotate-45 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow hidden md:block"></div>
      <div className="absolute bottom-1/4 right-8 w-12 h-12 rotate-12 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow delay-300 hidden md:block"></div>

      {/* CSS global styles */}
      <style jsx global>{`
        .spinning-cards {
          animation: spinCards 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
        }
        
        @keyframes spinCards {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2.5));
          }
        }
      `}</style>
    </main>
  );
} 