'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaTrophy, FaMapMarkerAlt, FaClock, FaTimes, FaShareAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Tournament } from '../types/tournament';
import { fetchTournamentById } from '../api/tournamentApi';
import Image from 'next/image';

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
            className="w-full max-w-5xl max-h-[90vh] bg-gradient-to-b from-[#0a141e] to-[#1a2634] rounded-xl overflow-hidden relative my-8 mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <button 
              className="absolute top-4 right-4 p-2 bg-[#0f1923]/80 backdrop-blur-sm text-white rounded-full z-10 hover:bg-[#0f1923] transition-colors border border-white/10"
              onClick={onClose}
            >
              <FaTimes size={18} />
            </button>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 text-white">
                <div className="w-16 h-16 border-4 border-[#F44336] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : tournament ? (
              <div className="text-white overflow-y-auto max-h-[90vh]">
                {/* Banner */}
                <div className="relative h-60">
                  <Image
                    src={tournament.imageUrl}
                    alt={tournament.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] to-[#0a141e]/40" />
                  
                  <div className="container relative h-full flex flex-col justify-end p-6 z-10">
                    <div className="flex items-center mb-2">
                      <span className="p-2 px-3 backdrop-blur-sm rounded-md border mr-3" style={{ 
                        backgroundColor: `${getStatusColor(tournament.status).split(' ')[0]}`,
                        borderColor: `${getStatusColor(tournament.status).split(' ')[1]}`,
                        color: `${getStatusColor(tournament.status).split(' ')[2].replace('text-', '')}`
                      }}>
                        {getStatusText(tournament.status)}
                      </span>
                      <span className="text-white/80 text-sm">
                        {tournament.type === 'GVQ' && 'Giải Vô Địch Quân Đoàn'}
                        {tournament.type === 'ChienDichBangHoi' && 'Chiến Dịch Bang Hội'}
                        {tournament.type === 'AnhHungDon' && 'Giải Anh Hùng Đơn'}
                        {tournament.type === 'Other' && 'Giải Đấu Đặc Biệt'}
                      </span>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold mb-3">{tournament.title}</h1>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-[#F44336] mr-2" />
                        <span className="text-white/80">{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FaUsers className="text-[#F44336] mr-2" />
                        <span className="text-white/80">{tournament.currentTeams}/{tournament.maxTeams} đội</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FaTrophy className="text-[#F44336] mr-2" />
                        <span className="text-white/80">{tournament.prizePool}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      {/* Tournament Info */}
                      <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-white relative inline-block">
                          Thông Tin Giải Đấu
                          <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                        </h2>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-white font-semibold mb-2">Mô tả</h3>
                            <p className="text-white/70">{tournament.description}</p>
                          </div>
                          
                          {tournament.specialRules && (
                            <div>
                              <h3 className="text-white font-semibold mb-2">Luật chơi đặc biệt</h3>
                              <ul className="list-disc list-inside space-y-1 text-white/70">
                                {tournament.specialRules.map((rule, index) => (
                                  <li key={index}>{rule}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div>
                            <h3 className="text-white font-semibold mb-2">Địa điểm</h3>
                            <div className="bg-[#0f1923]/80 backdrop-blur-sm rounded-lg p-4 border border-white/5 flex items-start">
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                                <Image
                                  src={tournament.venue.imageUrl}
                                  alt={tournament.venue.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{tournament.venue.name}</h4>
                                <p className="text-white/60 text-sm mt-1">
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
                        <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6">
                          <h2 className="text-xl font-bold mb-4 text-white relative inline-block">
                            Phần Thưởng
                            <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                          </h2>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {tournament.rewards.map((reward, index) => (
                              <div 
                                key={index}
                                className={`bg-[#0f1923]/80 backdrop-blur-sm rounded-lg p-4 border ${
                                  index === 0 ? 'border-amber-500/30' : index === 1 ? 'border-white/10' : 'border-amber-700/30'
                                }`}
                              >
                                <h3 className={`font-semibold mb-2 ${
                                  index === 0 ? 'text-amber-400' : index === 1 ? 'text-white' : 'text-amber-700'
                                }`}>
                                  {reward.title}
                                </h3>
                                <div className="text-lg font-bold text-white mb-2">{reward.prize}</div>
                                <p className="text-white/60 text-sm">{reward.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      {/* Registration */}
                      <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6 mb-6">
                        <h2 className="text-lg font-bold mb-4 text-center text-white">Đăng Ký Tham Gia</h2>
                        
                        <div className="space-y-4 mb-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/70">Đăng ký:</span>
                            <span className="text-white">
                              {tournament.currentTeams < tournament.maxTeams ? 'Còn mở' : 'Đã đóng'}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/70">Hạn đăng ký:</span>
                            <span className="text-white">{formatDate(tournament.registrationDeadline)}</span>
                          </div>
                        </div>
                        
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm rounded-lg p-4 border border-white/5 mb-4">
                          <div className="flex items-center mb-2">
                            <FaClock className="text-[#F44336] mr-2" />
                            <h3 className="text-white font-medium">Thời gian còn lại</h3>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-[#0a141e] rounded p-2 border border-white/5">
                              <div className="text-lg font-bold text-white">05</div>
                              <div className="text-xs text-white/60">Ngày</div>
                            </div>
                            <div className="bg-[#0a141e] rounded p-2 border border-white/5">
                              <div className="text-lg font-bold text-white">12</div>
                              <div className="text-xs text-white/60">Giờ</div>
                            </div>
                            <div className="bg-[#0a141e] rounded p-2 border border-white/5">
                              <div className="text-lg font-bold text-white">45</div>
                              <div className="text-xs text-white/60">Phút</div>
                            </div>
                            <div className="bg-[#0a141e] rounded p-2 border border-white/5">
                              <div className="text-lg font-bold text-white">30</div>
                              <div className="text-xs text-white/60">Giây</div>
                            </div>
                          </div>
                        </div>
                        
                        <button className="w-full py-3 bg-[#F44336]/10 backdrop-blur-sm text-[#F44336] border border-[#F44336]/30 hover:bg-[#F44336]/20 rounded transition-all duration-300 font-medium mb-4">
                          Đăng Ký Ngay
                        </button>
                        
                        <button className="w-full py-3 bg-[#0f1923]/80 backdrop-blur-sm text-white border border-white/10 hover:border-white/20 rounded transition-all duration-300 font-medium flex items-center justify-center gap-2">
                          <FaShareAlt />
                          Chia Sẻ Giải Đấu
                        </button>
                      </div>
                      
                      {/* Tournament Details */}
                      <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-6">
                        <h2 className="text-lg font-bold mb-4 text-white">Thông Tin Thêm</h2>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Thể thức:</span>
                            <span className="text-white">Đấu loại trực tiếp</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Số trận đấu:</span>
                            <span className="text-white">31 trận</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Thời gian trận:</span>
                            <span className="text-white">30 giây/trận</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Bản đồ:</span>
                            <span className="text-white">Ngẫu nhiên</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Yêu cầu:</span>
                            <span className="text-white">Cấp độ 30+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-white">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0f1923]/80 backdrop-blur-sm border border-white/5 mb-4">
                  <FaTrophy className="text-3xl text-[#F44336]/50" />
                </div>
                <p className="text-lg font-medium mb-2">Không tìm thấy thông tin giải đấu</p>
                <p className="text-white/60">Thông tin giải đấu không tồn tại hoặc đã bị xóa.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TournamentModal; 