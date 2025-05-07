import React from 'react';

export default function SupportSection() {
  const supportChannels = [
    {
      title: "Email",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      content: "support@m-sci.game",
      gradient: "from-green-600 to-teal-600",
      borderGradient: "from-green-500 to-teal-500"
    },
    {
      title: "Hotline",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      content: "1900-MSCI (1900-6724)",
      gradient: "from-teal-600 to-cyan-600",
      borderGradient: "from-teal-500 to-cyan-500"
    },
    {
      title: "Live Chat",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      content: "Trong game hoặc trên website",
      gradient: "from-cyan-600 to-blue-600",
      borderGradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-600/10 to-teal-600/10 rounded-lg blur-xl opacity-30"></div>
      
      <div className="relative bg-gradient-to-r from-gray-900/90 via-emerald-950/30 to-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-green-700/20 p-6 md:p-8">
        {/* Decorative accents */}
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-green-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        
        <div className="text-center mb-8">
          <div className="inline-block mb-2">
            <div className="relative">
              <span className="absolute inset-0 blur-sm bg-gradient-to-r from-green-500/50 to-teal-500/50 animate-pulse-subtle rounded-md"></span>
              <h2 className="relative text-2xl md:text-3xl font-orbitron font-bold py-1 px-4 rounded-md bg-gray-900/80">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300">
                  Hỗ Trợ
                </span>
              </h2>
            </div>
          </div>
          
          <p className="text-green-100/80 max-w-xl mx-auto mt-3">
            Gặp vấn đề khi chơi game? Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => (
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${channel.borderGradient} rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              <div className="relative bg-gray-900/60 hover:bg-gray-900/40 border border-green-700/30 rounded-lg p-6 flex flex-col items-center transition-colors duration-300">
                <div className={`w-14 h-14 flex-shrink-0 rounded-lg bg-gradient-to-r ${channel.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {channel.icon}
                  </div>
                </div>
                
                <h3 className="text-green-300 font-orbitron font-semibold text-lg mb-2">{channel.title}</h3>
                <p className="text-green-100 text-center">{channel.content}</p>
                
                {/* Hover indicator line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500/0 via-teal-500/70 to-green-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="https://t.me/msci_community" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-block cyber-halo"
          >
            <span className="relative py-2 px-6 bg-gray-900 border border-green-500/50 rounded text-green-300 hover:text-green-100 transition-colors duration-300 inline-flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Trung tâm trợ giúp</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
} 