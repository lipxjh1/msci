import React from 'react';

export const BoNhanDienSection = (
  <div className="space-y-8">
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Logo & Branding</h3>
      <p className="text-white/80 mb-6 leading-relaxed">
        Bộ nhận diện thương hiệu của M-SCI được thiết kế với phong cách hiện đại, kết hợp giữa công nghệ và nghệ thuật.
        Dưới đây là các tài nguyên chính thức có thể tải về và sử dụng cho mục đích báo chí:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all shadow group">
          <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center mb-2 border border-blue-500/20 group-hover:border-blue-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <p className="text-white text-sm font-medium mb-1">Logo Chính</p>
          <p className="text-white/50 text-xs mb-3">PNG, SVG</p>
          <button className="px-3 py-1.5 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-all w-full">Tải Xuống</button>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all shadow group">
          <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center mb-2 border border-blue-500/20 group-hover:border-blue-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-white text-sm font-medium mb-1">Icon App</p>
          <p className="text-white/50 text-xs mb-3">1024x1024</p>
          <button className="px-3 py-1.5 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-all w-full">Tải Xuống</button>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all shadow group">
          <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center mb-2 border border-blue-500/20 group-hover:border-blue-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-white text-sm font-medium mb-1">Brand Guidelines</p>
          <p className="text-white/50 text-xs mb-3">PDF</p>
          <button className="px-3 py-1.5 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-all w-full">Tải Xuống</button>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all shadow group">
          <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center mb-2 border border-blue-500/20 group-hover:border-blue-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <p className="text-white text-sm font-medium mb-1">Banner Quảng Cáo</p>
          <p className="text-white/50 text-xs mb-3">PNG, PSD</p>
          <button className="px-3 py-1.5 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-all w-full">Tải Xuống</button>
        </div>
      </div>
    </div>
    
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Screenshots</h3>
      <p className="text-white/80 mb-6 leading-relaxed">
        Các hình ảnh chất lượng cao từ gameplay, UI, và các tính năng đặc biệt của game:
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="group relative">
            <div className="aspect-[9/16] bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center mb-2 overflow-hidden border border-blue-500/20 group-hover:border-blue-500/40 transition-all">
              <span className="text-white/30 group-hover:opacity-0 transition-opacity">Screenshot {item}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <button className="px-3 py-1.5 bg-white/20 text-white text-xs rounded hover:bg-white/30 transition-all">Tải Xuống</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white rounded border border-cyan-500/30 hover:border-cyan-500/50 transition-all">
          Xem Thư Viện Đầy Đủ
        </button>
      </div>
    </div>
    
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Videos</h3>
      <p className="text-white/80 mb-6 leading-relaxed">
        Video chất lượng cao về gameplay, trailer và các tính năng của game:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/50 group-hover:text-white transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white/50 mt-2 group-hover:text-white transition-all">Trailer Chính Thức</span>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/50 group-hover:text-white transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white/50 mt-2 group-hover:text-white transition-all">Gameplay Demo</span>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/50 group-hover:text-white transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white/50 mt-2 group-hover:text-white transition-all">Behind-the-scenes</span>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/50 group-hover:text-white transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white/50 mt-2 group-hover:text-white transition-all">Character Showcases</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Artwork</h3>
      <p className="text-white/80 mb-6 leading-relaxed">
        Concept art và hình ảnh quảng bá chất lượng cao:
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="group relative">
          <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <span className="text-white/30 group-hover:opacity-0 transition-opacity">Key Visual</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <button className="px-3 py-1.5 bg-white/20 text-white text-xs rounded hover:bg-white/30 transition-all">Tải Xuống</button>
            </div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <span className="text-white/30 group-hover:opacity-0 transition-opacity">Character Designs</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <button className="px-3 py-1.5 bg-white/20 text-white text-xs rounded hover:bg-white/30 transition-all">Tải Xuống</button>
            </div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <span className="text-white/30 group-hover:opacity-0 transition-opacity">Environment Art</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <button className="px-3 py-1.5 bg-white/20 text-white text-xs rounded hover:bg-white/30 transition-all">Tải Xuống</button>
            </div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <span className="text-white/30 group-hover:opacity-0 transition-opacity">Concept Art</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <button className="px-3 py-1.5 bg-white/20 text-white text-xs rounded hover:bg-white/30 transition-all">Tải Xuống</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
); 