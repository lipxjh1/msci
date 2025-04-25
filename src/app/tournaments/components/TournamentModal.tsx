'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaTrophy, FaMapMarkerAlt, FaClock, FaTimes, FaShareAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Tournament } from '../types/tournament';
import { fetchTournamentById } from '../api/tournamentApi';

interface TournamentModalProps {
  tournamentId: string | null;
  onClose: () => void;
}

const TournamentModal: React.FC<TournamentModalProps> = ({ tournamentId, onClose }) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tournamentId) return;

    const loadTournament = async () => {
      try {
        const data = await fetchTournamentById(tournamentId);
        setTournament(data);
        setLoading(false);
      } catch (error) {
        console.error('Không thể tải dữ liệu giải đấu:', error);
        setLoading(false);
      }
    };

    loadTournament();
  }, [tournamentId]);

  if (!tournamentId) return null;

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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {tournamentId && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div 
            className="w-full max-w-5xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden relative my-8 mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <button 
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full z-10 hover:bg-black/70 transition-colors"
              onClick={onClose}
            >
              <FaTimes size={18} />
            </button>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 text-white">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : tournament ? (
              <div className="text-white overflow-y-auto max-h-[90vh]">
                {/* Banner */}
                <div className="relative h-60">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${tournament.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/40" />
                  
                  <div className="container relative h-full flex flex-col justify-end p-6 z-10">
                    <div className="flex items-center mb-2">
                      <span className={`${getStatusColor(tournament.status)} text-white text-xs px-3 py-1 rounded-full mr-3`}>
                        {getStatusText(tournament.status)}
                      </span>
                      <span className="text-gray-300 text-sm">
                        {tournament.type === 'GVQ' && 'Giải Vô Địch Quân Đoàn'}
                        {tournament.type === 'ChienDichBangHoi' && 'Chiến Dịch Bang Hội'}
                        {tournament.type === 'AnhHungDon' && 'Giải Anh Hùng Đơn'}
                        {tournament.type === 'Other' && 'Giải Đấu Đặc Biệt'}
                      </span>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold mb-3">{tournament.title}</h1>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-cyan-400 mr-2" />
                        <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FaUsers className="text-cyan-400 mr-2" />
                        <span>{tournament.currentTeams}/{tournament.maxTeams} đội</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FaTrophy className="text-cyan-400 mr-2" />
                        <span>{tournament.prizePool}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      {/* Tournament Info */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-cyan-400">Thông Tin Giải Đấu</h2>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-white font-semibold mb-2">Mô tả</h3>
                            <p className="text-gray-300">{tournament.description}</p>
                          </div>
                          
                          {tournament.specialRules && (
                            <div>
                              <h3 className="text-white font-semibold mb-2">Luật chơi đặc biệt</h3>
                              <ul className="list-disc list-inside space-y-1 text-gray-300">
                                {tournament.specialRules.map((rule, index) => (
                                  <li key={index}>{rule}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div>
                            <h3 className="text-white font-semibold mb-2">Địa điểm</h3>
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex items-start">
                              <div 
                                className="w-16 h-16 rounded-lg bg-cover bg-center mr-4"
                                style={{ backgroundImage: `url(${tournament.venue.imageUrl})` }}
                              />
                              <div>
                                <h4 className="text-white font-medium">{tournament.venue.name}</h4>
                                <p className="text-gray-400 text-sm mt-1">
                                  {tournament.venue.type === 'HocVien' && 'Học Viện M-SCI'}
                                  {tournament.venue.type === 'XCorp' && 'Căn Cứ X-Corp'}
                                  {tournament.venue.type === 'SaoHoa' && 'Sao Hỏa Đỏ'}
                                  {tournament.venue.type === 'Other' && 'Địa Điểm Đặc Biệt'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Rewards */}
                      {tournament.rewards && (
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                          <h2 className="text-xl font-bold mb-4 text-cyan-400">Phần Thưởng</h2>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {tournament.rewards.map((reward, index) => (
                              <div 
                                key={index}
                                className={`bg-gray-900/50 border border-gray-700 rounded-lg p-4 ${
                                  index === 0 ? 'border-amber-500/30' : index === 1 ? 'border-gray-400/30' : 'border-amber-700/30'
                                }`}
                              >
                                <h3 className={`font-semibold mb-2 ${
                                  index === 0 ? 'text-amber-400' : index === 1 ? 'text-gray-300' : 'text-amber-700'
                                }`}>
                                  {reward.title}
                                </h3>
                                <div className="text-lg font-bold text-white mb-2">{reward.prize}</div>
                                <p className="text-gray-400 text-sm">{reward.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      {/* Registration */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
                        <h2 className="text-lg font-bold mb-4 text-center">Đăng Ký Tham Gia</h2>
                        
                        <div className="space-y-4 mb-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">Đăng ký:</span>
                            <span className="text-white">
                              {tournament.currentTeams < tournament.maxTeams ? 'Còn mở' : 'Đã đóng'}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">Hạn đăng ký:</span>
                            <span className="text-white">{formatDate(tournament.registrationDeadline)}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-700 mb-4">
                          <div className="flex items-center mb-2">
                            <FaClock className="text-cyan-400 mr-2" />
                            <h3 className="text-white font-medium">Thời gian còn lại</h3>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-gray-800 rounded p-2">
                              <div className="text-lg font-bold text-white">05</div>
                              <div className="text-xs text-gray-400">Ngày</div>
                            </div>
                            <div className="bg-gray-800 rounded p-2">
                              <div className="text-lg font-bold text-white">12</div>
                              <div className="text-xs text-gray-400">Giờ</div>
                            </div>
                            <div className="bg-gray-800 rounded p-2">
                              <div className="text-lg font-bold text-white">45</div>
                              <div className="text-xs text-gray-400">Phút</div>
                            </div>
                            <div className="bg-gray-800 rounded p-2">
                              <div className="text-lg font-bold text-white">20</div>
                              <div className="text-xs text-gray-400">Giây</div>
                            </div>
                          </div>
                        </div>
                        
                        <button className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 mb-3">
                          Đăng Ký Tham Gia
                        </button>
                        
                        <button className="w-full py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 font-medium rounded-lg transition-all duration-300 flex items-center justify-center">
                          <FaShareAlt className="mr-2" />
                          Chia Sẻ Giải Đấu
                        </button>
                      </div>
                      
                      {/* Categories */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                        <h2 className="text-lg font-bold mb-3">Thể Loại</h2>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tournament.categories.map((category, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-white">
                <FaTrophy className="text-4xl text-gray-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">Không tìm thấy giải đấu</h3>
                <p className="text-gray-400">Giải đấu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TournamentModal; 