"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, HelpCircle, Trophy, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface StoryContentProps {
  content: string;
  fontSize: number;
  loading: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

const StoryContent: React.FC<StoryContentProps> = ({
  content,
  fontSize,
  loading
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const CONTENT_PER_PAGE = 2000; // ~1 trang A4
  
  // Thêm state cho tính năng quiz
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Mock quiz questions - trong thực tế nên lấy từ API
  const mockQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'Ai là nhân vật chính trong câu chuyện này?',
      options: ['Trần Hưng', 'Minh Tú', 'Nguyễn Anh', 'Không đề cập'],
      correctAnswer: 2,
      points: 10
    },
    {
      id: 'q2',
      question: 'Công nghệ được đề cập trong truyện là gì?',
      options: ['AI', 'VR', 'Neuralink', 'Blockchain'],
      correctAnswer: 2,
      points: 15
    }
  ];

  useEffect(() => {
    // Highlight active section based on scroll position
    if (contentRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reading-highlight');
            } else {
              entry.target.classList.remove('reading-highlight');
            }
          });
        },
        { threshold: 0.3 }
      );

      const headers = contentRef.current.querySelectorAll('h2, h3');
      headers.forEach((header) => observer.observe(header));

      return () => {
        headers.forEach((header) => observer.unobserve(header));
      };
    }
  }, [content, currentPage]);

  // Tính tổng số trang dựa trên nội dung
  useEffect(() => {
    if (content) {
      const contentLength = content.length;
      const pages = Math.ceil(contentLength / CONTENT_PER_PAGE);
      setTotalPages(pages || 1);
      
      // Hiển thị câu hỏi khi đọc đến trang 2
      if (currentPage === 2 && !quizCompleted) {
        const timeoutId = setTimeout(() => {
          setShowQuiz(true);
          setCurrentQuestion(mockQuestions[0]);
        }, 5000); // Hiển thị sau 5 giây đọc
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [content, currentPage, quizCompleted]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (currentQuestion && selectedAnswer !== null) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setIsAnswerCorrect(isCorrect);
      
      if (isCorrect) {
        setUserPoints(prev => prev + currentQuestion.points);
      }
      
      // Chuyển sang câu hỏi tiếp theo hoặc kết thúc
      setTimeout(() => {
        const currentIndex = mockQuestions.findIndex(q => q.id === currentQuestion.id);
        if (currentIndex < mockQuestions.length - 1) {
          setCurrentQuestion(mockQuestions[currentIndex + 1]);
          setSelectedAnswer(null);
          setIsAnswerCorrect(null);
        } else {
          // Kết thúc quiz
          setQuizCompleted(true);
          setShowQuiz(false);
          
          // Lưu điểm vào localStorage
          const currentPoints = parseInt(localStorage.getItem('user_points') || '0');
          localStorage.setItem('user_points', (currentPoints + userPoints).toString());
        }
      }, 2000);
    }
  };

  const closeQuiz = () => {
    setShowQuiz(false);
    setQuizCompleted(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">Đang tải nội dung...</p>
      </div>
    );
  }

  // Process the content to enhance formatting and paginate
  const formatContent = () => {
    if (!content) return [];

    // Phân trang nội dung
    const paragraphs = content.split('\n');
    let currentLength = 0;
    let pagesContent: string[][] = [[]];
    let pageIndex = 0;

    for (const paragraph of paragraphs) {
      currentLength += paragraph.length;
      pagesContent[pageIndex].push(paragraph);
      
      // Nếu vượt quá kích thước trang, tạo trang mới
      if (currentLength > CONTENT_PER_PAGE) {
        pageIndex++;
        pagesContent[pageIndex] = [];
        currentLength = 0;
      }
    }

    // Chỉ xử lý nội dung của trang hiện tại
    const currentPageContent = pagesContent[currentPage - 1] || [];
    
    // Preprocessing to identify chapter/section structure
    let chapterIndex = 0;
    let sectionIndex = 0;
    const formattedContent: React.ReactNode[] = [];

    let inBlockquote = false;

    for (let i = 0; i < currentPageContent.length; i++) {
      const paragraph = currentPageContent[i];
      const trimmedParagraph = paragraph.trim();
      
      // Skip empty paragraphs but add spacing
      if (trimmedParagraph === '') {
        if (inBlockquote) {
          inBlockquote = false;
          formattedContent.push(<div key={`space-${i}`} className="my-4"></div>);
        } else {
          formattedContent.push(<div key={`space-${i}`} className="my-2"></div>);
        }
        continue;
      }

      // Detect chapter headings
      if (trimmedParagraph.startsWith('MỞ ĐẦU:')) {
        formattedContent.push(
          <motion.h2 
            key={`chapter-${chapterIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold my-8 text-blue-700 dark:text-blue-300 text-center"
            id={`chapter-${chapterIndex}`}
          >
            {trimmedParagraph}
          </motion.h2>
        );
        chapterIndex++;
        continue;
      }

      // Format section breaks - replace with elegant dividers and proper heading
      if (trimmedParagraph.startsWith('________________________________________')) {
        sectionIndex++;
        formattedContent.push(
          <div key={`section-${sectionIndex}`} className="my-12 relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
            <div className="relative mx-auto w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 flex items-center justify-center shadow-lg z-10">
              <span className="text-white text-lg font-semibold">{sectionIndex}</span>
            </div>
            <h3 className="text-center text-lg font-medium text-gray-600 dark:text-gray-400 mt-4">
              Hồi {sectionIndex}
            </h3>
          </div>
        );
        continue;
      }

      // Specially format paragraphs that start with a single letter or character followed by quotes
      if (/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/.test(trimmedParagraph) && 
          (trimmedParagraph.includes('"') || trimmedParagraph.includes('"') || trimmedParagraph.includes('"')) && 
          paragraph.length < 300) {
          
        // Lấy chữ cái đầu tiên
        const firstChar = trimmedParagraph.charAt(0);
        const restOfParagraph = trimmedParagraph.slice(1);
          
        formattedContent.push(
          <div 
            key={`dialogue-${i}`} 
            className="relative pl-5 pr-2 py-2 my-4 border-l-4 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-r-md"
          >
            <span className="absolute left-2 top-0 text-blue-500 dark:text-blue-400 text-3xl opacity-20">"</span>
            <p className="text-blue-800 dark:text-blue-200 relative z-10">
              <span className="text-3xl font-bold float-left mr-1 text-blue-600 dark:text-blue-300 leading-6">{firstChar}</span>
              {restOfParagraph}
            </p>
            <span className="absolute right-2 bottom-0 text-blue-500 dark:text-blue-400 text-3xl opacity-20">"</span>
          </div>
        );
        continue;
      }

      // Regular dialogue formatting for paragraphs that have quotes but don't start with a capital letter
      if ((paragraph.includes('"') || paragraph.includes('"') || paragraph.includes('"')) && 
           paragraph.length < 300) {
        formattedContent.push(
          <div 
            key={`dialogue-${i}`} 
            className="relative pl-5 pr-2 py-2 my-4 border-l-4 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-r-md"
          >
            <span className="absolute left-2 top-0 text-blue-500 dark:text-blue-400 text-3xl opacity-20">"</span>
            <p className="text-blue-800 dark:text-blue-200 relative z-10">
              {trimmedParagraph}
            </p>
            <span className="absolute right-2 bottom-0 text-blue-500 dark:text-blue-400 text-3xl opacity-20">"</span>
          </div>
        );
        continue;
      }

      // Check for emphasized text that should be blockquotes
      if ((paragraph.startsWith('"') && paragraph.endsWith('"')) || 
          (i > 0 && currentPageContent[i-1].trim() === '' && paragraph.startsWith('"'))) {
        if (!inBlockquote) {
          inBlockquote = true;
          formattedContent.push(
            <blockquote 
              key={`blockquote-${i}`}
              className="border-l-4 border-gray-400 dark:border-gray-600 pl-4 py-2 my-6 italic text-gray-700 dark:text-gray-300"
            >
              {trimmedParagraph}
            </blockquote>
          );
        } else {
          // Continue the blockquote
          const lastIndex = formattedContent.length - 1;
          const lastElement = formattedContent[lastIndex];
          
          // Type checking and creating new blockquote
          if (React.isValidElement(lastElement) && lastElement.type === 'blockquote') {
            formattedContent[lastIndex] = (
              <blockquote 
                key={`blockquote-${i}`}
                className="border-l-4 border-gray-400 dark:border-gray-600 pl-4 py-2 my-6 italic text-gray-700 dark:text-gray-300"
              >
                {lastElement.props.children}<br />{trimmedParagraph}
              </blockquote>
            );
          } else {
            inBlockquote = false;
            formattedContent.push(
              <p key={i} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
                {trimmedParagraph}
              </p>
            );
          }
        }
        continue;
      }

      // Check for emphasize paragraphs (italics)
      if (paragraph.includes('*') && paragraph.split('*').length > 2) {
        formattedContent.push(
          <p 
            key={i} 
            className="mb-4 leading-relaxed" 
            dangerouslySetInnerHTML={{ 
              __html: trimmedParagraph.replace(/\*(.*?)\*/g, '<em class="text-blue-700 dark:text-blue-300">$1</em>') 
            }} 
          />
        );
        continue;
      }
      
      // Detect location/time markers
      if (trimmedParagraph.includes('Tại ') || 
          /^Ở [\w\s]+, /.test(trimmedParagraph) || 
          /^Trong [\w\s]+, /.test(trimmedParagraph) ||
          /^Năm \d{4}/.test(trimmedParagraph)) {
        formattedContent.push(
          <p 
            key={i} 
            className="my-6 font-medium text-gray-600 dark:text-gray-400 text-center italic"
          >
            {trimmedParagraph}
          </p>
        );
        continue;
      }
      
      // Regular paragraph with improved styling
      formattedContent.push(
        <p 
          key={i} 
          className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200 first-letter:text-lg first-letter:font-medium"
        >
          {trimmedParagraph}
        </p>
      );
    }

    return formattedContent;
  };

  return (
    <div className="relative">
      <div 
        ref={contentRef}
        className="prose prose-lg max-w-none dark:prose-invert custom-scrollbar"
        style={{ 
          fontSize: `${fontSize}px`, 
          lineHeight: 1.8,
        }}
      >
        {formatContent()}
        
        {/* Pagination UI */}
        <div className="flex justify-between items-center mt-8 border-t pt-4 border-gray-200 dark:border-gray-700">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
            Trang trước
          </button>
          
          <div className="text-gray-700 dark:text-gray-300">
            Trang {currentPage} / {totalPages}
          </div>
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trang sau
            <ChevronRight size={18} />
          </button>
        </div>
        
        {/* Hiển thị điểm của người dùng */}
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-600 dark:text-gray-400">
          <Trophy size={16} className="text-yellow-500" />
          <span>Điểm của bạn: {userPoints}</span>
        </div>
      </div>
      
      {/* Quiz Modal */}
      {showQuiz && currentQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                <HelpCircle size={20} className="text-blue-500 mr-2" />
                Câu hỏi điểm thưởng
              </h3>
              <button 
                onClick={closeQuiz}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">{currentQuestion.question}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Trả lời đúng nhận {currentQuestion.points} điểm</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    selectedAnswer === index 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-gray-300 dark:border-gray-600'
                  } hover:border-blue-500 transition-colors flex justify-between items-center`}
                  disabled={isAnswerCorrect !== null}
                >
                  <span className="text-gray-800 dark:text-gray-200">{option}</span>
                  {selectedAnswer === index && isAnswerCorrect === true && (
                    <CheckCircle size={20} className="text-green-500" />
                  )}
                  {selectedAnswer === index && isAnswerCorrect === false && (
                    <XCircle size={20} className="text-red-500" />
                  )}
                </button>
              ))}
            </div>
            
            {isAnswerCorrect === true && (
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg text-green-800 dark:text-green-300 mb-4 flex items-center">
                <CheckCircle size={18} className="mr-2" />
                Chính xác! Bạn nhận được {currentQuestion.points} điểm
              </div>
            )}
            
            {isAnswerCorrect === false && (
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg text-red-800 dark:text-red-300 mb-4 flex items-center">
                <AlertCircle size={18} className="mr-2" />
                Rất tiếc, đáp án chưa chính xác
              </div>
            )}
            
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || isAnswerCorrect !== null}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trả lời
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StoryContent; 