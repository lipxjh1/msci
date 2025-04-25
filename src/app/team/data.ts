// Type definitions
export interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  achievements: string[];
  quote: string;
  department: 'leadership' | 'creative' | 'technical' | 'operations' | 'expansion';
}

// Sample data - in a real app, this would come from an API
export const teamMembers: TeamMember[] = [
  // Leadership
  {
    id: 1,
    name: 'John Doe',
    title: 'Founder & CEO',
    image: '/images/team/team1.jpg',
    achievements: [
      '15 năm kinh nghiệm trong ngành game',
      'Cựu Game Director tại [Tên Studio Lớn]',
      'Đam mê xây dựng game cộng đồng'
    ],
    quote: 'Tầm nhìn của chúng tôi là tạo ra một vũ trụ game nơi mọi người đều có thể đóng góp và cùng phát triển.',
    department: 'leadership'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    title: 'Co-founder & CTO',
    image: '/images/team/team2.jpg',
    achievements: [
      'Chuyên gia blockchain & game development',
      'Tiến sĩ Khoa học Máy tính',
      '10+ năm phát triển game mobile'
    ],
    quote: 'Công nghệ chỉ có ý nghĩa khi mang lại trải nghiệm tuyệt vời cho người dùng.',
    department: 'leadership'
  },

  // Creative Team
  {
    id: 3,
    name: 'Michael Park',
    title: 'Art Director',
    image: '/images/team/team3.jpg',
    achievements: [
      'Thiết kế nhân vật cho nhiều game AAA',
      'Chuyên gia 2D Spine Animation',
      'Giải thưởng Best Art Direction 2022'
    ],
    quote: 'Mỗi nhân vật trong M-SCI đều có câu chuyện riêng được kể qua từng nét vẽ.',
    department: 'creative'
  },
  {
    id: 4,
    name: 'Lisa Wong',
    title: 'Lead Game Designer',
    image: '/images/team/team4.jpg',
    achievements: [
      '8 năm thiết kế gameplay mobile',
      'Chuyên gia cân bằng game economy',
      'Đam mê tạo trải nghiệm người chơi'
    ],
    quote: 'Game hay là game khiến người chơi quên cả thời gian.',
    department: 'creative'
  },
  {
    id: 5,
    name: 'David Kim',
    title: 'Narrative Director',
    image: '/images/team/team5.jpg',
    achievements: [
      'Tác giả của nhiều tiểu thuyết sci-fi',
      'Xây dựng thế giới quan cho 5+ game lớn',
      'Giải thưởng Best Storytelling 2023'
    ],
    quote: 'Cốt truyện M-SCI là hành trình của niềm tin và hy vọng.',
    department: 'creative'
  },

  // Technical Team
  {
    id: 6,
    name: 'Alex Nguyen',
    title: 'Lead Developer',
    image: '/images/team/team6.jpg',
    achievements: [
      '12 năm phát triển game Unity',
      'Chuyên gia tối ưu mobile performance',
      'Kiến trúc sư hệ thống backend'
    ],
    quote: 'Code không chỉ là logic, mà là nghệ thuật tạo nên trải nghiệm.',
    department: 'technical'
  },
  {
    id: 7,
    name: 'Emma Liu',
    title: 'Blockchain Engineer',
    image: '/images/team/team7.jpg',
    achievements: [
      'Pioneer trong GameFi development',
      'Smart contract specialist',
      'Cố vấn cho nhiều dự án Web3'
    ],
    quote: 'Blockchain mở ra kỷ nguyên mới cho quyền sở hữu tài sản số.',
    department: 'technical'
  },
  {
    id: 8,
    name: 'Tom Wilson',
    title: 'Backend Engineer',
    image: '/images/team/team8.jpg',
    achievements: [
      'Xây dựng hệ thống cho game 10M+ users',
      'Chuyên gia scalable architecture',
      'DevOps & Cloud infrastructure'
    ],
    quote: 'Server ổn định là nền tảng của mọi game online thành công.',
    department: 'technical'
  },

  // Operations Team
  {
    id: 9,
    name: 'Jessica Tran',
    title: 'Community Manager',
    image: '/images/team/team9.jpg',
    achievements: [
      '6 năm quản lý cộng đồng game',
      'Xây dựng community 100k+ members',
      'Chuyên gia social media marketing'
    ],
    quote: 'Cộng đồng không chỉ là người chơi, mà là gia đình M-SCI.',
    department: 'operations'
  },
  {
    id: 10,
    name: 'Kevin Lee',
    title: 'Customer Support Lead',
    image: '/images/team/team10.jpg',
    achievements: [
      'Quản lý đội support 24/7',
      'Giải quyết 10,000+ tickets/tháng',
      'Tỷ lệ hài lòng 98%'
    ],
    quote: 'Mỗi vấn đề của người chơi là cơ hội để chúng tôi làm tốt hơn.',
    department: 'operations'
  },
  {
    id: 11,
    name: 'Maria Garcia',
    title: 'QA Lead',
    image: '/images/team/team11.jpg',
    achievements: [
      '10 năm kinh nghiệm QA gaming',
      'Phát triển automated testing systems',
      'Zero critical bugs policy'
    ],
    quote: 'Chất lượng không phải là mục tiêu, mà là tiêu chuẩn.',
    department: 'operations'
  }
]; 