import React from 'react';

export default function Community() {
  const socialLinks = [
    {
      name: "Telegram Group",
      url: "https://t.me/msci_community",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.83.45-1.18.44-.39-.01-1.13-.22-1.68-.4-.68-.23-1.22-.35-1.17-.74.03-.2.3-.4.82-.62 3.23-1.4 5.37-2.32 6.44-2.78 3.06-1.31 3.7-1.54 4.12-1.54.1 0 .3.02.42.09.11.06.19.19.2.34.02.15.01.35-.01.49z"/>
        </svg>
      ),
      color: "text-blue-400",
      hoverColor: "hover:text-blue-300",
      bgColor: "bg-blue-900/50",
      borderColor: "border-blue-700/50",
      hoverBorderColor: "group-hover:border-blue-500",
      hoverBgColor: "group-hover:bg-blue-800/60"
    },
    {
      name: "Discord Server",
      url: "https://discord.gg/msci",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
      ),
      color: "text-indigo-400",
      hoverColor: "hover:text-indigo-300",
      bgColor: "bg-indigo-900/50",
      borderColor: "border-indigo-700/50",
      hoverBorderColor: "group-hover:border-indigo-500",
      hoverBgColor: "group-hover:bg-indigo-800/60"
    },
    {
      name: "Facebook Page",
      url: "https://facebook.com/msci.official",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: "text-sky-400",
      hoverColor: "hover:text-sky-300",
      bgColor: "bg-sky-900/50",
      borderColor: "border-sky-700/50",
      hoverBorderColor: "group-hover:border-sky-500",
      hoverBgColor: "group-hover:bg-sky-800/60"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/MSCI_Game",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: "text-cyan-400",
      hoverColor: "hover:text-cyan-300",
      bgColor: "bg-cyan-900/50",
      borderColor: "border-cyan-700/50",
      hoverBorderColor: "group-hover:border-cyan-500",
      hoverBgColor: "group-hover:bg-cyan-800/60"
    }
  ];

  return (
    <section className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-lg blur-xl opacity-30"></div>
      
      <div className="relative bg-indigo-950/50 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-700/30 p-6 md:p-8">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-400">
                Kết Nối Với Cộng Đồng
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"></div>
            <p className="mt-3 text-indigo-100 max-w-lg mx-auto">
              Tham gia cộng đồng M-SCI để cập nhật tin tức mới nhất và kết nối với người chơi khác
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className={`relative h-full ${link.bgColor} ${link.hoverBgColor} p-5 rounded-lg border ${link.borderColor} ${link.hoverBorderColor} flex flex-col items-center justify-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg`}>
                  <div className={`w-14 h-14 ${link.color} ${link.hoverColor} flex items-center justify-center rounded-full bg-gray-900/50 p-3 mb-3 transition-all duration-300 group-hover:scale-110`}>
                    {link.icon}
                  </div>
                  <h3 className={`font-orbitron font-bold text-lg ${link.color} ${link.hoverColor} transition-colors duration-300`}>
                    {link.name}
                  </h3>
                  
                  {/* Animated indicator */}
                  <div className="mt-3 flex items-center text-sm text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="mr-1">Tham gia ngay</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-block rounded-lg px-5 py-3 text-sm text-indigo-300 bg-indigo-900/30 border border-indigo-700/30">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Nhận ngay 50 M-Coin khi tham gia đầy đủ cộng đồng!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 