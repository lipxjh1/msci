'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchTournamentById } from '../api/tournamentApi';
import { Tournament } from '../types/tournament';
import { useParams, useRouter } from 'next/navigation';
import { FaCalendarAlt, FaUsers, FaTrophy, FaMapMarkerAlt, FaClock, FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import LoadingScreen from '../components/LoadingScreen';
import Link from 'next/link';

export default function TournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.id as string;

  useEffect(() => {
    const loadTournament = async () => {
      try {
        const data = await fetchTournamentById(id);
        setTournament(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load tournament:', error);
        setLoading(false);
      }
    };

    loadTournament();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy giải đấu</h1>
          <p className="text-gray-400 mb-6">Giải đấu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link href="/tournaments">
            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors">
              Quay lại trang giải đấu
            </button>
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white">
      {/* Banner */}
      <div className="relative h-[60vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${tournament.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/40" />
        
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <FaArrowLeft />
          </button>
        </div>
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-12 z-10">
          <div className="flex items-center mb-4">
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
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{tournament.title}</h1>
          
          <p className="text-gray-300 max-w-3xl mb-6">{tournament.description}</p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
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
            
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-cyan-400 mr-2" />
              <span>{tournament.venue.name}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tournament Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">Thông Tin Giải Đấu</h2>
              
              <div className="space-y-6">
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
                      <a href="#" className="text-cyan-400 text-sm hover:underline mt-2 inline-block">
                        Xem thông tin địa điểm →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Rewards */}
            {tournament.rewards && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Phần Thưởng</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </motion.div>
            )}
            
            {/* Teams */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Đội Tham Gia</h2>
                <span className="text-gray-300">{tournament.currentTeams}/{tournament.maxTeams}</span>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 text-center">
                <p className="text-gray-300 mb-4">
                  Danh sách các đội tham gia sẽ được cập nhật sau khi đóng đăng ký.
                </p>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm transition-colors">
                  Xem danh sách đội
                </button>
              </div>
            </motion.div>
          </div>
          
          <div>
            {/* Registration */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8 sticky top-4"
            >
              <h2 className="text-xl font-bold mb-6 text-center">Đăng Ký Tham Gia</h2>
              
              <div className="space-y-4 mb-6">
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
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Phí đăng ký:</span>
                  <span className="text-white">500 $MSCI</span>
                </div>
              </div>
              
              <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-700 mb-6">
                <div className="flex items-center mb-2">
                  <FaClock className="text-cyan-400 mr-2" />
                  <h3 className="text-white font-medium">Thời gian còn lại để đăng ký</h3>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-gray-800 rounded p-2">
                    <div className="text-xl font-bold text-white">05</div>
                    <div className="text-xs text-gray-400">Ngày</div>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <div className="text-xl font-bold text-white">12</div>
                    <div className="text-xs text-gray-400">Giờ</div>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <div className="text-xl font-bold text-white">45</div>
                    <div className="text-xs text-gray-400">Phút</div>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <div className="text-xl font-bold text-white">20</div>
                    <div className="text-xs text-gray-400">Giây</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 mb-4">
                Đăng Ký Tham Gia
              </button>
              
              <button className="w-full py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 font-medium rounded-lg transition-all duration-300 flex items-center justify-center">
                <FaShareAlt className="mr-2" />
                Chia Sẻ Giải Đấu
              </button>
            </motion.div>
            
            {/* Categories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4">Thể Loại</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {tournament.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
              
              <h2 className="text-xl font-bold mb-4">Giải Đấu Liên Quan</h2>
              
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="block p-3 bg-gray-900/50 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-700"
                >
                  <h3 className="text-white font-medium">Giải Vô Địch Quân Đoàn M-SCI - Mùa Không Gian</h3>
                  <p className="text-gray-400 text-xs mt-1">Sắp diễn ra: 15/06/2049</p>
                </a>
                
                <a 
                  href="#" 
                  className="block p-3 bg-gray-900/50 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-700"
                >
                  <h3 className="text-white font-medium">Giải Vô Địch Quân Đoàn M-SCI - Mùa Sao Hỏa</h3>
                  <p className="text-gray-400 text-xs mt-1">Sắp diễn ra: 15/09/2049</p>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 