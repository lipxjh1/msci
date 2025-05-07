'use client';

interface VideoSectionProps {
  video: string;
}

export default function VideoSection({ video }: VideoSectionProps) {
  return (
    <div className="mt-10 bg-[#0f1923] rounded-2xl overflow-hidden border border-white/10">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-[#F44336] to-transparent rounded-full"></div>
          <h3 className="text-xl font-bold text-white">Video</h3>
        </div>
      </div>
      <div className="relative group">
        {/* Video container with gradient overlay */}
        <div className="relative w-full aspect-video bg-black/20">
          <div 
            className="absolute inset-0 w-full h-full" 
            dangerouslySetInnerHTML={{ __html: video }} 
          />
          <style jsx global>{`
            iframe {
              width: 100% !important;
              height: 100% !important;
            }
          `}</style>
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#F44336]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#F44336]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#F44336]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#F44336]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      {/* Video description */}
      <div className="p-6 bg-black/20">
        <p className="text-sm text-white/60">
          Video nhúng từ nguồn ngoài. Nếu video không hiển thị, vui lòng kiểm tra lại kết nối internet hoặc làm mới trang.
        </p>
      </div>
    </div>
  );
} 