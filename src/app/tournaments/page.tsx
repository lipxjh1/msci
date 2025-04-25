'use client';

import { useEffect, useState } from 'react';
import TournamentHeader from './components/TournamentHeader';
import TournamentCategories from './components/TournamentCategories';
import TournamentList from './components/TournamentList';
import TournamentBanner from './components/TournamentBanner';
import UpcomingEvents from './components/UpcomingEvents';
import RankingSystem from './components/RankingSystem';
import BattleArenas from './components/BattleArenas';
import SpecialModes from './components/SpecialModes';
import RewardsSection from './components/RewardsSection';
import FAQ from './components/FAQ';
import CommunitySection from './components/CommunitySection';
import { fetchTournaments } from './api/tournamentApi';
import { Tournament } from './types/tournament';
import LoadingScreen from './components/LoadingScreen';
import { motion } from 'framer-motion';

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        // Giả lập thời gian tải để hiển thị loading screen
        setTimeout(async () => {
          const data = await fetchTournaments();
          setTournaments(data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to load tournaments:', error);
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TournamentHeader />
      <TournamentBanner />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-cyan-400">
            THỂ THAO ĐIỆN TỬ M-SCI
          </h1>
          <p className="text-xl text-center italic text-gray-300">
            "Vượt Qua Giới Hạn - Định Nghĩa Lại Vinh Quang"
          </p>
        </motion.div>

        <TournamentCategories 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
        />
        
        <TournamentList 
          tournaments={tournaments} 
          category={activeCategory}
        />
        
        <UpcomingEvents />
        <RankingSystem />
        <BattleArenas />
        <SpecialModes />
        <RewardsSection />
        <FAQ />
        <CommunitySection />
      </div>
    </motion.div>
  );
} 