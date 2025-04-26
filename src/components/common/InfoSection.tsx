import React, { ReactNode } from 'react';

interface InfoSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  width?: string;
  customStyles?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ 
  title, 
  subtitle, 
  children, 
  bgColor = 'bg-gray-100',
  textColor = 'text-gray-900',
  width = 'max-w-6xl',
  customStyles = ''
}) => {
  return (
    <section className={`${bgColor} py-16 px-4 ${customStyles}`}>
      <div className={`container mx-auto ${width}`}>
        <div className="text-center mb-12">
          <h2 className={`font-orbitron text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
          {subtitle && <p className={`font-noto-sans text-lg ${textColor}/70 max-w-3xl mx-auto`}>{subtitle}</p>}
        </div>
        <div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default InfoSection; 