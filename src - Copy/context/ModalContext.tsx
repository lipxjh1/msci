'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Modal from '@/components/ui/Modal';

type ModalContent = {
  title?: string;
  content: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

type ModalContextType = {
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
  isOpen: boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const openModal = useCallback((content: ModalContent) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Chờ animation kết thúc trước khi xóa content
    setTimeout(() => {
      setModalContent(null);
    }, 300);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      {modalContent && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title={modalContent.title}
          size={modalContent.size || 'md'}
        >
          {modalContent.content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}; 