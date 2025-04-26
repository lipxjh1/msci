import React from 'react';

export default function QuickGuide() {
  const steps = [
    {
      title: "Mở Telegram",
      description: "Mở Telegram trên điện thoại hoặc máy tính của bạn",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Truy cập link",
      description: "Truy cập liên kết t.me/musksci_bot/game",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      title: "Nhấn 'Start'",
      description: "Nhấn 'Start' hoặc 'Play' để bắt đầu game",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Tạo nhân vật",
      description: "Tạo nhân vật và tham gia chiến đấu",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-xl opacity-50"></div>
      
      <div className="relative bg-gray-900/80 rounded-lg border border-purple-500/30 backdrop-blur-sm overflow-hidden p-6 md:p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-purple-500 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              Hướng Dẫn Nhanh
            </h2>
            <div className="w-8 h-1 bg-purple-500 rounded-full"></div>
          </div>
          <p className="text-indigo-200 text-center max-w-xl">
            Chỉ 4 bước đơn giản để bắt đầu hành trình chiến đấu bên cạnh Elon Musk
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-gray-800/80 border border-purple-500/20 rounded-lg p-5 h-full flex flex-col hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center mb-4 border border-purple-500/40 group-hover:border-purple-500 transition duration-300">
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <div className="text-purple-400 group-hover:text-purple-300 transition duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2 font-orbitron">{step.title}</h3>
                <p className="text-indigo-100 text-sm flex-grow">{step.description}</p>
                
                {/* Animated bottom line */}
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-indigo-500 mt-4 transition-all duration-500 ease-out"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Decorative dots */}
        <div className="hidden lg:block absolute top-12 right-10">
          <div className="grid grid-cols-3 gap-1.5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-500/50"></div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-12 left-10">
          <div className="grid grid-cols-3 gap-1.5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 