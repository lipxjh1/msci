'use client';

import { ReactNode, useCallback } from 'react';
import { useModal } from '@/context/ModalContext';

type OpenModalOptions = {
  title?: string;
  content: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

export function useGlobalModal() {
  const modal = useModal();

  const openModal = useCallback((options: OpenModalOptions) => {
    modal.openModal({
      title: options.title,
      content: options.content,
      size: options.size || 'md',
    });
  }, [modal]);

  return {
    openModal,
    closeModal: modal.closeModal,
    isOpen: modal.isOpen
  };
} 