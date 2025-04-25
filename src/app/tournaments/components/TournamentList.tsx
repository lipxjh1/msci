'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tournament } from '../types/tournament';
import { FaCalendarAlt, FaTrophy, FaUsers, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import TournamentModal from './TournamentModal';

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
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-500';
      case 'ongoing': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-blue-500';
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
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament) => (
            <motion.div 
              key={tournament.id}
              variants={item}
              className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-900/20 transition-all duration-300 border border-gray-700/50 hover:border-cyan-700/50 group"
            >
              <div className="h-48 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${tournament.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
                
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getStatusColor(tournament.status)}`}>
                    {getStatusText(tournament.status)}
                  </span>
                </div>
                
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{tournament.title}</h3>
                  <div className="flex items-center text-xs text-gray-300 gap-3">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-cyan-400" />
                      <span>{formatDate(tournament.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-cyan-400" />
                      <span>{tournament.currentTeams}/{tournament.maxTeams}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{tournament.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tournament.categories.map((cat, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300"
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
                    <FaMapMarkerAlt className="text-cyan-400" />
                    <span className="text-gray-300 text-sm">{tournament.venue.name}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <FaClock />
                    <span>Hạn đăng ký: {formatDate(tournament.registrationDeadline)}</span>
                  </div>
                  <div className="flex space-x-2 mt-auto">
                    <button 
                      onClick={() => setSelectedTournamentId(tournament.id)}
                      className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-sm font-medium rounded transition-all duration-300"
                    >
                      Chi Tiết
                    </button>
                    {tournament.status === 'ongoing' && (
                      <button 
                        className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-sm font-medium rounded transition-all duration-300"
                        onClick={() => handleJoinTournament(tournament)}
                      >
                        Tham Gia
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="col-span-full flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-gray-800">
              <FaTrophy className="text-3xl text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">Không tìm thấy giải đấu</h3>
            <p className="text-gray-500 max-w-md">
              Hiện không có giải đấu nào thuộc thể loại này. Vui lòng kiểm tra lại sau hoặc chọn thể loại khác.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Modal hiển thị chi tiết giải đấu */}
      <TournamentModal 
        tournamentId={selectedTournamentId} 
        onClose={() => setSelectedTournamentId(null)} 
      />
    </>
  );
};

export default TournamentList; 