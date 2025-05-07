'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import { FaLaptopCode, FaGamepad, FaPaintBrush, FaUsers, FaRocket, FaChartLine, FaMobileAlt, FaLink } from 'react-icons/fa';
import { FiArrowLeft, FiClock, FiX, FiSend } from 'react-icons/fi';

// Application form popup component
function ApplicationPopup({ 
  isOpen, 
  onClose, 
  position = "" 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  position?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Tạm thời bỏ qua phần upload file
      let cvUrl = '';
      
      // Gửi thông tin form đến API endpoint
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          position,
          cvUrl: '' // Tạm thời gửi chuỗi rỗng
        }),
      });

      // Kiểm tra xem request có thành công không (debug)
      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);
      
      if (!response.ok) {
        throw new Error(result.error || 'Có lỗi xảy ra khi gửi đơn ứng tuyển');
      }

      // Hiển thị thông báo thành công
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form sau 3 giây
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setName("");
        setEmail("");
        setMessage("");
        setFile(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error submitting application:', err);
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative bg-[#131842] border border-purple-500/30 rounded-xl shadow-xl w-full max-w-xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        >
          <FiX className="w-6 h-6" />
        </button>
        
        {/* Content */}
        <div className="p-8">
          {!isSubmitted ? (
            <>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-2">
                Apply for {position || "a Position"}
              </h2>
              <p className="text-sm text-gray-300 mb-6">
                Your application will be sent to our recruitment team through Telegram.
              </p>
              
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-200 text-sm">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cover Letter / Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white resize-none"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Upload CV / Portfolio (PDF, DOC, DOCX)
                  </label>
                  <div className="relative border border-dashed border-purple-500/30 rounded-md px-4 py-6 text-center">
                    <input
                      type="file"
                      onChange={(e) => e.target.files && setFile(e.target.files[0])}
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-gray-400 flex flex-col items-center justify-center">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm">
                        {file ? file.name : "Click or drag file to upload"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-md flex items-center justify-center transition-all duration-300 shadow-lg shadow-purple-900/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FiSend className="mr-2" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-300 text-center">
                Thank you for your interest! Our team will review your application and get back to you soon.
              </p>
            </div>
          )}
        </div>
        
        {/* Decorative bottom line */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </motion.div>
    </motion.div>
  );
}

// Component for each job position
function JobPosition({ 
  icon, 
  title, 
  description, 
  index,
  onApply
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  index: number;
  onApply: (position: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 transition-all duration-300 transform-gpu hover:shadow-xl hover:bg-white/10 card-neon group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-rajdhani text-xl font-bold text-white tracking-wide mb-2 group-hover:text-purple-400 transition-colors duration-300">{title}</h3>
            <div className="flex items-center justify-center w-8 h-8">
              <svg 
                className={`w-5 h-5 transition-transform duration-300 text-white/70 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="font-rajdhani text-white/80 group-hover:text-white/90 transition-colors duration-300">{description}</p>
          
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <h4 className="font-rajdhani text-lg font-bold text-purple-400 mb-2">Requirements:</h4>
              <ul className="font-rajdhani text-white/80 space-y-2 pl-4">
                <li className="flex items-start gap-2 before:content-['•'] before:text-purple-400 before:mr-2">
                  At least 1 year of experience in a similar role
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-purple-400 before:mr-2">
                  Portfolio/Github demonstrating your capabilities
                </li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-purple-400 before:mr-2">
                  Passion for game development and new technologies
                </li>
              </ul>
              
              <div className="mt-4 flex justify-end">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(title);
                  }}
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
        style={{ 
          boxShadow: 'inset 0 0 20px 5px rgba(147, 51, 234, 0.4)'
        }}
      ></div>
    </motion.div>
  );
}

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    scale: number;
    width: number;
    height: number;
    left: string;
    top: string;
    animX: number;
    animY: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Simulate loading to show animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Create particles with random values only on client side
    const particlesArray = Array.from({ length: 20 }).map(() => {
      return {
        x: Math.random() * 100 - 50, 
        y: Math.random() * 100 - 50,
        scale: Math.random() * 0.2 + 0.1,
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        animX: Math.random() * 20 - 10,
        animY: Math.random() * 20 - 10,
        duration: Math.random() * 5 + 5
      };
    });
    
    setParticles(particlesArray);
    
    return () => clearTimeout(timer);
  }, []);

  // Job categories and positions (in English)
  const jobCategories = [
    {
      id: 'art',
      title: "Artists & Game Designers",
      positions: [
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "2D Spine Animator", description: "Create smooth character animations and special effects" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "3D Artist", description: "Design environments, characters and weapons" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "UI/UX Designer", description: "Design intuitive, user-friendly interfaces" },
        { icon: <FaPaintBrush className="h-6 w-6" />, title: "Concept Artist", description: "Sketch the sci-fi world of M-SCI" },
      ]
    },
    {
      id: 'dev',
      title: "Developers",
      positions: [
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Unity Developer", description: "Build gameplay mechanics and game systems" },
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Backend Engineer", description: "Develop scalable server architecture" },
        { icon: <FaLaptopCode className="h-6 w-6" />, title: "Blockchain Developer", description: "Integrate blockchain technology into the game" },
        { icon: <FaMobileAlt className="h-6 w-6" />, title: "Mobile Developer", description: "Optimize experience on Android/iOS" },
      ]
    },
    {
      id: 'content',
      title: "Content Creators",
      positions: [
        { icon: <FaGamepad className="h-6 w-6" />, title: "Game Writer", description: "Write scripts and character stories" },
        { icon: <FaGamepad className="h-6 w-6" />, title: "Sound Designer", description: "Create sound effects and background music" },
        { icon: <FaUsers className="h-6 w-6" />, title: "Community Manager", description: "Manage and grow the game community" },
      ]
    }
  ];

  // Benefits of joining (in English)
  const benefits = [
    { icon: <FaUsers className="h-6 w-6" />, title: "Creative Community", description: "Work with passionate developers from all over the world" },
    { icon: <FaChartLine className="h-6 w-6" />, title: "Transparent Model", description: "Fair profit sharing based on contributions" },
    { icon: <FaRocket className="h-6 w-6" />, title: "Cutting-edge Technology", description: "Work with 2D Spine, 3D and blockchain" },
    { icon: <FaGamepad className="h-6 w-6" />, title: "Global Vision", description: "Project aimed at international markets" },
    { icon: <FaLaptopCode className="h-6 w-6" />, title: "Skill Development", description: "Learn and grow in a professional environment" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 60,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: 0.5
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Function to handle position application
  const handleApply = (position: string) => {
    setSelectedPosition(position);
    setIsPopupOpen(true);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#0B0E18] via-[#131842] to-[#1A1C32] text-white">
      <NavBar />
      
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 flex items-center justify-center z-50 bg-[#0B0E18]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                rotate: 360,
                transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }}
              className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      {/* Application Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <ApplicationPopup 
            isOpen={isPopupOpen} 
            onClose={() => setIsPopupOpen(false)} 
            position={selectedPosition}
          />
        )}
      </AnimatePresence>
      
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500 opacity-10"
              initial={{ 
                x: particle.x + "%", 
                y: particle.y + "%",
                scale: particle.scale
              }}
              animate={{ 
                y: [0, particle.animY],
                x: [0, particle.animX],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: particle.duration
              }}
              style={{
                width: particle.width,
                height: particle.height,
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
            </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-20">
          {/* Left content */}
          <motion.div 
            className="max-w-2xl mx-auto text-center lg:text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              CAREERS
            </motion.h1>
            
            <motion.div 
              className="h-1 w-32 mb-8 bg-gradient-to-r from-blue-500 to-purple-500"
              variants={itemVariants}
            />
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              variants={itemVariants}
            >
              BUILD THE COMMUNITY-DRIVEN GAME TOGETHER
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.button 
                onClick={() => document.getElementById('careers-content')?.scrollIntoView({behavior: 'smooth'})}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-md flex items-center justify-center group transition-all duration-300 shadow-lg shadow-purple-900/30"
              >
                <span>View Positions</span>
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right content - Character image */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Glow effect behind image */}
              <motion.div 
                animate={{
                  boxShadow: ["0px 0px 0px rgba(147, 51, 234, 0.3)", "0px 0px 20px rgba(147, 51, 234, 0.7)", "0px 0px 0px rgba(147, 51, 234, 0.3)"],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute inset-0 -m-5 rounded-full bg-purple-900/20 blur-xl"
              />
              
              {/* Character floating animation */}
              <motion.div
                animate={floatingAnimation.animate}
                className="relative z-10"
              >
                <div className="relative h-[500px] w-[350px]">
                  <Image
                    src="/images/heronoew/player_13_caitlyn.png"
                    alt="Careers Hero Character"
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-contain"
                    priority
                  />
            </div>
              </motion.div>
              
              {/* Circular decorative elements */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-purple-500/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 0.2 + (i * 0.1),
                    transition: { delay: 0.8 + (i * 0.2), duration: 1 }
                  }}
                  style={{
                    width: `${100 + i * 100}px`,
                    height: `${100 + i * 100}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -i
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* About M-SCI and Project Details Section */}
        <div id="careers-content" className="mb-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              M-SCI CAREERS
            </h2>
            <div className="h-1 w-32 mx-auto mt-2 mb-6 bg-gradient-to-r from-blue-500 to-purple-500" />
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              M-SCI is not just a game - it's a community project where EVERYONE can contribute their creative power to build a unique game universe together. We're developing an action sci-fi game that perfectly combines 2D Spine Animation and 3D graphics, which will launch on Android and iOS platforms.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-purple-400 mb-4">🎮 About M-SCI Project</h3>
              <p className="text-white/80 mb-4">
                M-SCI is an ambitious action sci-fi game set in 2049, when humanity faces its greatest challenge from an army of AI-controlled robots and drones.
              </p>
              <p className="text-white/80 font-bold">
                What's special? We're building the game WITH the community, not just FOR the community.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-bold text-purple-400 mb-4">🚀 Technical Specifications</h3>
              <ul className="text-white/80 space-y-2">
                  <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span><strong>Platform</strong>: Android & iOS</span>
                  </li>
                  <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span><strong>Technology</strong>: 2D Spine Animation + 3D Graphics</span>
                  </li>
                  <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span><strong>Genre</strong>: Sci-fi action shooter with RPG elements</span>
                  </li>
                  <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span><strong>Features</strong>: Hero collection, Guild system, PvP/PvE combat, Blockchain integration</span>
                  </li>
                </ul>
            </motion.div>
              </div>
            </div>

        {/* Open Positions Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              OPEN POSITIONS
            </h2>
            <div className="h-1 w-32 mx-auto mt-2 mb-6 bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
          
          {/* Improved Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="relative inline-block bg-[#0B0E18]/80 p-1 rounded-lg shadow-lg backdrop-blur-sm border border-purple-500/20">
              <div className="flex flex-wrap gap-1">
              <button
                  className={`relative px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 z-10
                    ${activeCategory === 'all' 
                      ? 'text-white' 
                      : 'text-white/70 hover:text-white/90'}`}
                onClick={() => setActiveCategory('all')}
                >
                  All
                  {activeCategory === 'all' && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md -z-10"
                      layoutId="activeCategoryBg"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}
              </button>
              
                {jobCategories.map(category => (
                <button
                  key={category.id}
                    className={`relative px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 z-10
                      ${activeCategory === category.id 
                        ? 'text-white' 
                        : 'text-white/70 hover:text-white/90'}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.title}
                    {activeCategory === category.id && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md -z-10"
                        layoutId="activeCategoryBg"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      />
                    )}
                </button>
              ))}
              </div>
            </div>
          </div>
          
          {/* Job listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobCategories
              .filter(category => activeCategory === 'all' || category.id === activeCategory)
              .flatMap(category => 
                category.positions.map((position, posIndex) => (
                <JobPosition
                    key={`${category.id}-${posIndex}`} 
                  icon={position.icon}
                  title={position.title}
                  description={position.description}
                    index={posIndex}
                    onApply={handleApply}
                />
              ))
            )}
          </div>
        </motion.div>
          
          {/* Benefits Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              BENEFITS OF JOINING M-SCI
              </h2>
            <div className="h-1 w-32 mx-auto mt-2 mb-6 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
              <motion.div 
                  key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                    {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/80">{benefit.description}</p>
              </motion.div>
              ))}
          </div>
        </motion.div>
        
        {/* Apply Now Section with Character */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            className="order-2 lg:order-1"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              animate={floatingAnimation.animate}
              className="relative"
            >
              <div className="relative h-[400px] w-full">
            <Image 
                  src="/images/heronoew/player_02_david.png"
                  alt="Join M-SCI Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="max-w-2xl mx-auto text-center lg:text-left z-10 order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              READY TO JOIN?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              variants={itemVariants}
            >
              Send your CV or portfolio to careers@m-sci.com along with the position you're interested in.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-md flex items-center justify-center text-lg font-bold transition-all duration-300 shadow-lg shadow-purple-900/30"
                onClick={() => handleApply("")}
              >
                APPLY NOW
              </motion.button>
            </motion.div>
          </motion.div>
                  </div>
        
        {/* Bottom caption */}
        <motion.div 
          className="mt-24 relative py-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="h-px w-full max-w-lg mx-auto bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          <div className="absolute -top-px left-1/2 -translate-x-1/2 px-6 bg-[#131842] text-sm text-purple-300 tracking-widest">
            BUILDING THE FUTURE OF GAMING
          </div>
        </motion.div>
      </div>
    </div>
  );
} 