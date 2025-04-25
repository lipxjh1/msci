'use client';

import React, { useEffect, useCallback, useState, useRef, ReactNode } from 'react';
import './modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnEscape = true,
  closeOnBackdrop = true,
  showCloseButton = true,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Xử lý hiệu ứng hiển thị modal
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Ngăn cuộn trang khi modal mở
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      // Khôi phục cuộn trang khi modal đóng
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Xử lý nhấn phím ESC để đóng modal
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape' && isVisible) {
        onClose();
      }
    },
    [closeOnEscape, onClose, isVisible]
  );

  // Thêm và gỡ bỏ event listener
  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, handleKeyDown]);

  // Xử lý click vào backdrop để đóng modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen && !isVisible) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={`modal-container animate-modalFadeIn modal-${size} custom-scrollbar`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && (
              <h2 id="modal-title" className="modal-title">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Đóng"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

export default Modal; 