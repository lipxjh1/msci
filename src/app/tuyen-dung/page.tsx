'use client';

import { useState } from 'react';
import CallToAction from '@/components/careers/CallToAction';
import Head from 'next/head';

interface JobPosition {
  id: string;
  title: string;
  type: string;
  location: string;
  salary: string;
  requirements: string[];
  responsibilities: string[];
}

const jobPositions: JobPosition[] = [
  {
    id: 'game-developer',
    title: 'Game Developer',
    type: 'Toàn thời gian',
    location: 'Hồ Chí Minh',
    salary: '15-25 triệu VNĐ',
    requirements: [
      'Có ít nhất 2 năm kinh nghiệm phát triển game',
      'Thành thạo Unity hoặc Unreal Engine',
      'Hiểu biết về tối ưu hóa hiệu suất và giải thuật AI cơ bản',
      'Kinh nghiệm với ngôn ngữ C#, C++ là một lợi thế',
      'Portfolio các dự án game đã thực hiện'
    ],
    responsibilities: [
      'Phát triển tính năng gameplay mới',
      'Tối ưu hóa code và cải thiện hiệu suất game',
      'Khắc phục lỗi và cải thiện trải nghiệm người dùng',
      'Làm việc với team thiết kế và nghệ thuật để triển khai tính năng'
    ]
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    type: 'Toàn thời gian',
    location: 'Hồ Chí Minh',
    salary: '15-22 triệu VNĐ',
    requirements: [
      'Có ít nhất 2 năm kinh nghiệm thiết kế UI/UX cho game hoặc ứng dụng',
      'Thành thạo Figma, Adobe XD, Photoshop',
      'Hiểu biết về nguyên tắc thiết kế trải nghiệm người dùng',
      'Portfolio thể hiện khả năng thiết kế',
      'Kỹ năng giao tiếp và làm việc nhóm tốt'
    ],
    responsibilities: [
      'Thiết kế giao diện người dùng hấp dẫn và thân thiện',
      'Tạo wireframes, prototypes, và flow diagrams',
      'Cộng tác với đội ngũ phát triển để thực hiện các thiết kế',
      'Thu thập và phân tích phản hồi người dùng',
      'Cải thiện trải nghiệm người dùng liên tục'
    ]
  },
  {
    id: '3d-artist',
    title: '3D Artist',
    type: 'Toàn thời gian',
    location: 'Hồ Chí Minh',
    salary: '12-20 triệu VNĐ',
    requirements: [
      'Kinh nghiệm 2+ năm trong lĩnh vực tạo mẫu 3D',
      'Thành thạo các công cụ như Blender, Maya, 3DS Max',
      'Kiến thức về quy trình và tối ưu hóa asset cho game',
      'Portfolio thể hiện kỹ năng mô hình hóa 3D, texturing',
      'Hiểu biết về shaders và lighting là một lợi thế'
    ],
    responsibilities: [
      'Tạo mô hình 3D chất lượng cao theo concept art',
      'Tối ưu hóa asset để đảm bảo hiệu suất trong game',
      'Phát triển texture, material và shader',
      'Tham gia vào quá trình thiết kế nghệ thuật và đưa ra ý tưởng',
      'Cộng tác với team để đảm bảo phong cách nghệ thuật nhất quán'
    ]
  }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030a12] to-[#0c1824]">
      <Head>
        <title>Tuyển Dụng | 5MSCI</title>
        <meta name="description" content="Cơ hội nghề nghiệp tại 5MSCI - Hãy tham gia đội ngũ của chúng tôi" />
      </Head>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-[var(--accent-blue-bright)]">Cơ Hội</span> Nghề Nghiệp
          </h1>
          <p className="font-noto-sans text-gray-300 max-w-2xl mx-auto text-lg">
            Chúng tôi luôn tìm kiếm những tài năng đam mê và sáng tạo để cùng xây dựng những tựa game đột phá. Hãy khám phá cơ hội tại 5MSCI và phát triển sự nghiệp của bạn với chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          {jobPositions.map((job) => (
            <div 
              key={job.id}
              className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-[var(--accent-blue-bright)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-blue-bright)]/10"
            >
              <div className="p-6">
                <h2 className="font-orbitron text-2xl font-bold text-white mb-2">{job.title}</h2>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-full text-sm">
                    {job.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {job.location}
                  </span>
                  <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {job.salary}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-orbitron text-lg font-semibold text-white mb-2">Yêu cầu:</h3>
                  <ul className="list-disc list-inside text-gray-300 font-noto-sans space-y-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="text-[var(--accent-blue-bright)] cursor-pointer" onClick={() => setSelectedJob(job)}>
                        Xem thêm...
                      </li>
                    )}
                  </ul>
                </div>
                
                <button
                  onClick={() => setSelectedJob(job)}
                  className="font-noto-sans w-full button-cyber clip-hexagon hexagon-border text-white bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40 transition-all duration-300 py-3 font-medium"
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedJob(null)}></div>
            
            <div className="relative bg-gray-900 border border-[var(--accent-blue-bright)] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg p-6 mx-4">
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <h2 className="font-orbitron text-2xl font-bold text-white mb-6 pr-8">
                {selectedJob.title} - <span className="text-[var(--accent-blue-bright)]">{selectedJob.location}</span>
              </h2>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-full text-sm">
                  {selectedJob.type}
                </span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {selectedJob.salary}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-orbitron text-lg font-semibold text-white mb-3">Yêu cầu công việc:</h3>
                <ul className="list-disc list-inside text-gray-300 font-noto-sans space-y-2 ml-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="font-orbitron text-lg font-semibold text-white mb-3">Trách nhiệm:</h3>
                <ul className="list-disc list-inside text-gray-300 font-noto-sans space-y-2 ml-2">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-noto-sans button-cyber clip-hexagon hexagon-border text-white bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40 transition-all duration-300 py-3 px-8 font-medium"
                >
                  Ứng Tuyển Ngay
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div id="apply-section">
          <CallToAction />
        </div>
      </div>
    </div>
  );
} 