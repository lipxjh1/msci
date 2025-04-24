import React from 'react';

const GachaStyles: React.FC = () => {
  return (
    <style jsx global>{`
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      .spinning-cards {
        animation: spinCards 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
      }
      
      @keyframes spinCards {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-100% / 2.5)); /* Cuộn vừa đủ để tạo hiệu ứng vô hạn */
        }
      }
      
      .animate-scaleIn {
        animation: scaleIn 0.3s ease-out;
      }
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      /* Card glow effects */
      .card-legendary {
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
      }
      
      .card-epic {
        box-shadow: 0 0 12px rgba(138, 43, 226, 0.5);
      }
      
      .card-rare {
        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
      }
      
      .card-common {
        box-shadow: 0 0 8px rgba(40, 167, 69, 0.5);
      }
      
      /* Button effects */
      .button-cyber {
        position: relative;
        background: linear-gradient(to right, rgba(0, 123, 255, 0.8), rgba(0, 80, 172, 0.8));
        overflow: hidden;
      }
      
      .button-cyber::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to right,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        transition: left 0.5s;
      }
      
      .button-cyber:hover::before {
        left: 100%;
      }
      
      .clip-hexagon {
        clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
      }
      
      .hexagon-border {
        position: relative;
        background-color: transparent;
        border: 2px solid rgba(0, 123, 255, 0.8);
      }
      
      .hexagon-border::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, rgba(0, 123, 255, 0.2), transparent);
        z-index: -1;
      }
      
      .cyber-halo {
        position: relative;
        display: inline-block;
      }
      
      .cyber-halo::before {
        content: attr(data-text);
        position: absolute;
        left: -2px;
        text-shadow: 0 0 5px rgba(0, 123, 255, 0.7);
        opacity: 0.7;
        z-index: -1;
      }
      
      .text-shadow-blue {
        text-shadow: 0 0 10px rgba(0, 123, 255, 0.7);
      }
      
      .animate-title-glow {
        animation: titleGlow 2s infinite alternate;
      }
      
      @keyframes titleGlow {
        from {
          text-shadow: 0 0 10px rgba(0, 123, 255, 0.7);
        }
        to {
          text-shadow: 0 0 20px rgba(0, 123, 255, 0.9),
                    0 0 30px rgba(0, 123, 255, 0.5);
        }
      }
      
      .animate-fade-in {
        animation: fadeIn 1s ease-out;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  );
};

export default GachaStyles; 