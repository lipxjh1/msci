'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaCircle, FaPlay, FaBook, FaCode, FaImage, FaVideo, FaFileAlt, FaChevronRight, FaChevronLeft, FaClipboardCheck, FaCamera, FaPalette, FaChartLine } from 'react-icons/fa';
import { MdOndemandVideo } from 'react-icons/md';
import { BsMusicNoteBeamed } from 'react-icons/bs';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  image?: string;
  videoUrl?: string;
}

interface Tutorial {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: TutorialStep[];
  estimatedTime: string;
}

interface TutorialModalProps {
  tutorial: Tutorial;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ tutorial, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  useEffect(() => {
    const savedCompletedSteps = localStorage.getItem(`tutorial_${tutorial.id}_completedSteps`);
    if (savedCompletedSteps) {
      setCompletedSteps(JSON.parse(savedCompletedSteps));
    }
  }, [tutorial.id]);
  
  useEffect(() => {
    if (completedSteps.length > 0) {
      localStorage.setItem(`tutorial_${tutorial.id}_completedSteps`, JSON.stringify(completedSteps));
    }
  }, [completedSteps, tutorial.id]);

  // Hàm lấy nhãn và màu cho mức độ khó
  const getLevelInfo = (level: Tutorial['difficulty']) => {
    switch (level) {
      case 'beginner':
        return { label: 'Người mới', color: 'text-green-400 border-green-400/30 bg-green-400/10' };
      case 'intermediate':
        return { label: 'Trung cấp', color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' };
      case 'advanced':
        return { label: 'Nâng cao', color: 'text-red-400 border-red-400/30 bg-red-400/10' };
      default:
        return { label: 'Không xác định', color: 'text-gray-400 border-gray-400/30 bg-gray-400/10' };
    }
  };

  const levelInfo = getLevelInfo(tutorial.difficulty);
  const totalSteps = tutorial.steps.length;
  
  const markStepAsCompleted = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      const newCompletedSteps = [...completedSteps, stepId];
      setCompletedSteps(newCompletedSteps);
      
      if (newCompletedSteps.length === totalSteps) {
        setShowCompletionModal(true);
      }
    }
  };
  
  const markStepAsIncomplete = (stepId: string) => {
    const newCompletedSteps = completedSteps.filter(id => id !== stepId);
    setCompletedSteps(newCompletedSteps);
  };
  
  const isStepCompleted = (stepId: string) => {
    return completedSteps.includes(stepId);
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      markStepAsCompleted(tutorial.steps[currentStep].id);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const completionPercentage = Math.round((completedSteps.length / totalSteps) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };
  
  const getCategoryIcon = (category: Tutorial['category']) => {
    switch (category) {
      case 'video':
        return <MdOndemandVideo className="text-red-400" />;
      case 'audio':
        return <BsMusicNoteBeamed className="text-purple-400" />;
      case 'writing':
        return <FaBook className="text-blue-400" />;
      case 'coding':
        return <FaCode className="text-green-400" />;
      case 'photo':
        return <FaCamera className="text-amber-400" />;
      case 'design':
        return <FaPalette className="text-pink-400" />;
      case 'marketing':
        return <FaChartLine className="text-cyan-400" />;
      default:
        return <FaCircle className="text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-[#041019] border border-white/10 rounded-lg shadow-xl">
        <AnimatePresence mode="wait">
          <div className="p-5 border-b border-white/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/5">
                  {getCategoryIcon(tutorial.category)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{tutorial.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${levelInfo.color}`}>
                      {levelInfo.label}
                    </span>
                    <span className="text-xs text-white/60">
                      {tutorial.estimatedTime}
                    </span>
                    <span className="text-xs text-white/60">
                      {completionPercentage}% hoàn thành
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/5"
              >
                ✕
              </button>
            </div>
            
            <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="bg-black/20 border-r border-white/10 p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <h3 className="text-white/80 text-sm font-medium mb-3">Các bước ({completedSteps.length}/{totalSteps})</h3>
              
              <div className="space-y-1">
                {tutorial.steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm text-left transition-colors ${
                      currentStep === index
                        ? 'bg-blue-500/20 text-blue-400'
                        : isStepCompleted(step.id)
                          ? 'bg-green-500/10 text-green-400 hover:bg-white/5'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isStepCompleted(step.id) ? (
                        <FaCheckCircle className="text-green-400" />
                      ) : (
                        <FaCircle className={currentStep === index ? 'text-blue-400' : 'text-white/30'} />
                      )}
                    </div>
                    <span>{step.title}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="col-span-3 p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium text-white">
                    {tutorial.steps[currentStep].title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => isStepCompleted(tutorial.steps[currentStep].id) 
                        ? markStepAsIncomplete(tutorial.steps[currentStep].id) 
                        : markStepAsCompleted(tutorial.steps[currentStep].id)
                      }
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition-colors ${
                        isStepCompleted(tutorial.steps[currentStep].id)
                          ? 'bg-green-500/10 text-green-400 border-green-500/30'
                          : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {isStepCompleted(tutorial.steps[currentStep].id) ? (
                        <>
                          <FaClipboardCheck /> 
                          <span>Đã hoàn thành</span>
                        </>
                      ) : (
                        <>
                          <FaClipboardCheck />
                          <span>Đánh dấu hoàn thành</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <div className="text-white/80 mb-6" dangerouslySetInnerHTML={{ __html: tutorial.steps[currentStep].content }} />
                  
                  {tutorial.steps[currentStep].image && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={tutorial.steps[currentStep].image}
                        alt={tutorial.steps[currentStep].title}
                        className="w-full object-cover"
                      />
                    </div>
                  )}
                  
                  {tutorial.steps[currentStep].videoUrl && (
                    <div className="mt-4">
                      <div className="relative pt-[56.25%] rounded-lg overflow-hidden border border-white/10">
                        <iframe
                          src={tutorial.steps[currentStep].videoUrl}
                          className="absolute inset-0 w-full h-full"
                          title={tutorial.steps[currentStep].title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              
              <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
                <button
                  onClick={goToPrevStep}
                  disabled={currentStep === 0}
                  className={`px-4 py-2 rounded transition-colors ${
                    currentStep === 0
                      ? 'text-white/30 cursor-not-allowed'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  Bước trước
                </button>
                
                <button
                  onClick={goToNextStep}
                  disabled={currentStep === totalSteps - 1}
                  className={`px-4 py-2 rounded flex items-center gap-2 transition-colors ${
                    currentStep === totalSteps - 1
                      ? 'text-white/30 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  <span>Bước tiếp theo</span>
                  <FaPlay className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </AnimatePresence>
        
        {showCompletionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#041019] border border-green-500/30 rounded-lg p-6 max-w-md text-center shadow-xl"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                  <FaCheckCircle className="text-green-400 text-4xl" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Chúc mừng!</h3>
              <p className="text-white/80 mb-6">
                Bạn đã hoàn thành toàn bộ hướng dẫn "{tutorial.title}". 
                Tiếp tục khám phá các hướng dẫn khác để nâng cao kỹ năng của bạn!
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Tiếp tục
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialModal; 