'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tournament } from '../types/tournament';
import { FaCalendarAlt, FaTrophy, FaUsers, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import TournamentModal from './TournamentModal';
import Image from 'next/image';

interface TournamentListProps {
  tournaments: Tournament[];
  category: string;
}

const TournamentList: React.FC<TournamentListProps> = ({ tournaments, category }) => {
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  
  useEffect(() => {
    if (category === 'all') {
      setFilteredTournaments(tournaments);
    } else if (category === 'premium') {
      setFilteredTournaments(tournaments.filter(t => 
        t.categories.includes('Premium')
      ));
    } else {
      setFilteredTournaments(tournaments.filter(t => t.type === category));
    }
  }, [tournaments, category]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming': return 'bg-[#3f51b5]/30 border-[#3f51b5]/30 text-[#3f51b5]';
      case 'ongoing': return 'bg-[#4CAF50]/30 border-[#4CAF50]/30 text-[#4CAF50]';
      case 'completed': return 'bg-gray-500/30 border-gray-500/30 text-gray-400';
      default: return 'bg-[#3f51b5]/30 border-[#3f51b5]/30 text-[#3f51b5]';
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'upcoming': return 'Sắp Diễn Ra';
      case 'ongoing': return 'Đang Diễn Ra';
      case 'completed': return 'Đã Kết Thúc';
      default: return 'Sắp Diễn Ra';
    }
  };

  const handleJoinTournament = (tournament: Tournament) => {
    // Xử lý tham gia giải đấu ở đây
    console.log('Tham gia giải đấu:', tournament.title);
    // Thêm code xử lý đăng ký giải đấu
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament) => (
            <div 
              key={tournament.id}
              className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="relative h-48">
                <Image
                  src={tournament.imageUrl}
                  alt={tournament.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                
                <div className="absolute top-4 left-4 p-2 px-3 backdrop-blur-sm rounded-md border" style={{ 
                  backgroundColor: `${getStatusColor(tournament.status).split(' ')[0]}`,
                  borderColor: `${getStatusColor(tournament.status).split(' ')[1]}`,
                }}>
                  <span className="font-medium text-sm" style={{ 
                    color: `${getStatusColor(tournament.status).split(' ')[2].replace('text-', '')}` 
                  }}>
                    {getStatusText(tournament.status)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F44336] transition-colors line-clamp-2">
                  {tournament.title}
                </h3>
                
                <p className="text-white/70 mb-4 line-clamp-2">{tournament.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#F44336]" />
                    <span className="text-white/80">{formatDate(tournament.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-[#F44336]" />
                    <span className="text-white/80">{tournament.currentTeams}/{tournament.maxTeams}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tournament.categories.map((cat, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-[#0f1923]/80 backdrop-blur-sm rounded-md text-sm text-white/80"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <FaTrophy className="text-amber-500" />
                    <span className="text-amber-400 font-semibold">{tournament.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-[#F44336]" />
                    <span className="text-white/60 text-sm">Hạn đăng ký: {formatDate(tournament.registrationDeadline)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-[#F44336]" />
                    <span className="text-white/80 text-sm">{tournament.venue.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedTournamentId(tournament.id)}
                      className="px-4 py-2 bg-[#0f1923]/80 backdrop-blur-sm text-white border border-white/10 hover:border-[#F44336]/30 hover:text-[#F44336] rounded transition-all duration-300 text-sm"
                    >
                      Chi Tiết
                    </button>
                    {tournament.status === 'ongoing' && (
                      <button 
                        className="px-4 py-2 bg-[#F44336]/10 backdrop-blur-sm text-[#F44336] border border-[#F44336]/30 hover:bg-[#F44336]/20 rounded transition-all duration-300 text-sm"
                        onClick={() => handleJoinTournament(tournament)}
                      >
                        Tham Gia
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-[#0f1923]/80 backdrop-blur-sm border border-white/5">
              <FaTrophy className="text-3xl text-[#F44336]/50" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Không tìm thấy giải đấu</h3>
            <p className="text-white/60 max-w-md">
              Hiện không có giải đấu nào thuộc thể loại này. Vui lòng kiểm tra lại sau hoặc chọn thể loại khác.
            </p>
          </div>
        )}
      </div>

      {/* Modal hiển thị chi tiết giải đấu */}
      <TournamentModal 
        tournamentId={selectedTournamentId} 
        onClose={() => setSelectedTournamentId(null)} 
      />
    </>
  );
};

export default TournamentList; 