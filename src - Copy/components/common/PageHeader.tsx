import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imagePath?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, imagePath = '/images/default-header.jpg' }) => {
  return (
    <div className="relative w-full h-[50vh] min-h-[400px]">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-4">
        <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="font-noto-sans text-xl text-gray-300 max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 