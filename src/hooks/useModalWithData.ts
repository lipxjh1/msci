'use client';

import { useState, useCallback } from 'react';

type ModalDataType<T> = T | null;

export function useModalWithData<T>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModalDataType<T>>(null);

  const openModal = useCallback((modalData: T) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay clearing data until after animation completes
    setTimeout(() => {
      setData(null);
    }, 300);
  }, []);

  return {
    isOpen,
    data,
    openModal,
    closeModal
  };
} 