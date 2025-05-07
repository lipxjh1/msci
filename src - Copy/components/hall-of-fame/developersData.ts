import { DeveloperData } from './DeveloperCard';

// Hàm tạo điểm ngẫu nhiên cho mục đích demo
const generatePoints = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Chuẩn bị dữ liệu developers với điểm số và xếp hạng
export const getAllDevelopers = (): DeveloperData[] => {
  // Tạo danh sách developers
  const developers: DeveloperData[] = [
    // Team leads & Architects
    {
      id: 'dev-1',
      name: 'Alex Johnson',
      role: 'Chief Technology Officer',
      description: 'Kiến trúc sư chính và người lãnh đạo công nghệ cho M-SCI Universe, với hơn 15 năm kinh nghiệm trong phát triển game và ứng dụng web.',
      imageUrl: '/images/hall-of-fame/developers/alex-johnson.jpg',
      technologies: ['TypeScript', 'React', 'Node.js', 'AWS'],
      github: 'https://github.com/alexjohnson',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      contributions: ['Platform Architecture', 'Technical Strategy'],
      projects: ['Core Platform', 'Cloud Infrastructure'],
      points: generatePoints(9000, 10000),
      type: 'lead'
    },
    {
      id: 'dev-2',
      name: 'Sophia Chen',
      role: 'Lead Game Developer',
      description: 'Chuyên gia phát triển game với nhiều năm kinh nghiệm tại các studio lớn. Đứng đầu đội ngũ phát triển gameplay cho M-SCI.',
      imageUrl: '/images/hall-of-fame/developers/sophia-chen.jpg',
      technologies: ['Unity', 'C#', 'Game AI', 'Shader Programming'],
      github: 'https://github.com/sophiachen',
      contributions: ['Combat System', 'Character Controller'],
      projects: ['Battle Arenas', 'PvP System'],
      points: generatePoints(8500, 9500),
      type: 'game'
    },
    {
      id: 'dev-3',
      name: 'David Park',
      role: 'Frontend Lead',
      description: 'Chuyên gia về phát triển giao diện người dùng với kinh nghiệm trong việc xây dựng các ứng dụng web phức tạp và hiệu suất cao.',
      imageUrl: '/images/hall-of-fame/developers/david-park.jpg',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      github: 'https://github.com/davidpark',
      linkedin: 'https://linkedin.com/in/davidpark',
      contributions: ['UI Components', 'Performance Optimization'],
      projects: ['Dashboard', 'Marketplace UI'],
      points: generatePoints(8200, 9200),
      type: 'frontend'
    },
    {
      id: 'dev-4',
      name: 'Maria Rodriguez',
      role: 'Backend Architect',
      description: 'Kiến trúc sư hệ thống backend với kinh nghiệm trong việc xây dựng các API hiệu suất cao và hệ thống xử lý dữ liệu lớn.',
      imageUrl: '/images/hall-of-fame/developers/maria-rodriguez.jpg',
      technologies: ['Node.js', 'PostgreSQL', 'GraphQL', 'Microservices'],
      github: 'https://github.com/mariarodriguez',
      linkedin: 'https://linkedin.com/in/mariarodriguez',
      contributions: ['API Architecture', 'Database Design'],
      projects: ['Game Backend', 'Analytics Platform'],
      points: generatePoints(8000, 9000),
      type: 'backend'
    },
    
    // Frontend Developers
    {
      id: 'dev-5',
      name: 'Michael Lee',
      role: 'Senior Frontend Developer',
      description: 'Chuyên gia về xây dựng giao diện người dùng với React và Next.js, tập trung vào trải nghiệm người dùng và animations.',
      imageUrl: '/images/hall-of-fame/developers/michael-lee.jpg',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'WebGL'],
      github: 'https://github.com/michaellee',
      contributions: ['Animation System', 'Responsive UI'],
      projects: ['Character Profiles', 'Achievements'],
      points: generatePoints(7500, 8500),
      type: 'frontend'
    },
    {
      id: 'dev-6',
      name: 'Emily Wang',
      role: 'UI/UX Developer',
      description: 'Developer giàu kinh nghiệm trong việc kết hợp thiết kế UI/UX với phát triển frontend, tập trung vào accessibility và user experience.',
      imageUrl: '/images/hall-of-fame/developers/emily-wang.jpg',
      technologies: ['React', 'CSS/SCSS', 'Storybook', 'Figma'],
      github: 'https://github.com/emilywang',
      linkedin: 'https://linkedin.com/in/emilywang',
      contributions: ['Component Library', 'Design System'],
      projects: ['UI Framework', 'Accessibility'],
      points: generatePoints(7200, 8200),
      type: 'frontend'
    },
    {
      id: 'dev-7',
      name: 'Ryan Kim',
      role: 'Frontend Developer',
      description: 'Developer chuyên về xây dựng giao diện người dùng phức tạp với hiệu suất cao và trải nghiệm mượt mà.',
      imageUrl: '/images/hall-of-fame/developers/ryan-kim.jpg',
      technologies: ['React', 'Redux', 'TypeScript', 'Next.js'],
      github: 'https://github.com/ryankim',
      contributions: ['State Management', 'Client-side Caching'],
      projects: ['Inventory System', 'User Profiles'],
      points: generatePoints(6800, 7800),
      type: 'frontend'
    },

    // Backend Developers
    {
      id: 'dev-8',
      name: 'Jennifer Lopez',
      role: 'Senior Backend Developer',
      description: 'Chuyên gia về hệ thống backend với kinh nghiệm trong việc xây dựng API hiệu suất cao và hệ thống xử lý dữ liệu thời gian thực.',
      imageUrl: '/images/hall-of-fame/developers/jennifer-lopez.jpg',
      technologies: ['Node.js', 'MongoDB', 'Redis', 'Socket.IO'],
      github: 'https://github.com/jenniferlopez',
      contributions: ['Real-time Systems', 'Data Processing'],
      projects: ['Chat System', 'Notification Service'],
      points: generatePoints(7000, 8000),
      type: 'backend'
    },
    {
      id: 'dev-9',
      name: 'Robert Chen',
      role: 'Backend Developer',
      description: 'Developer có kinh nghiệm trong việc xây dựng và tối ưu hóa cơ sở dữ liệu cũng như API cho ứng dụng web quy mô lớn.',
      imageUrl: '/images/hall-of-fame/developers/robert-chen.jpg',
      technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      github: 'https://github.com/robertchen',
      linkedin: 'https://linkedin.com/in/robertchen',
      contributions: ['Database Optimization', 'API Development'],
      projects: ['User Authentication', 'Payment System'],
      points: generatePoints(6500, 7500),
      type: 'backend'
    },
    {
      id: 'dev-10',
      name: 'Sarah Johnson',
      role: 'Cloud Infrastructure Engineer',
      description: 'Kỹ sư hạ tầng đám mây với chuyên môn về triển khai và quản lý các ứng dụng quy mô lớn trên AWS và Azure.',
      imageUrl: '/images/hall-of-fame/developers/sarah-johnson.jpg',
      technologies: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      github: 'https://github.com/sarahjohnson',
      contributions: ['Cloud Architecture', 'Deployment Automation'],
      projects: ['Server Infrastructure', 'CI/CD Pipeline'],
      points: generatePoints(6800, 7800),
      type: 'backend'
    },

    // Game Developers
    {
      id: 'dev-11',
      name: 'Daniel Lee',
      role: 'Senior Game Developer',
      description: 'Developer game với kinh nghiệm phong phú trong việc phát triển các hệ thống gameplay và mechanics phức tạp.',
      imageUrl: '/images/hall-of-fame/developers/daniel-lee.jpg',
      technologies: ['Unity', 'C#', 'Game Physics', 'AI'],
      github: 'https://github.com/daniellee',
      linkedin: 'https://linkedin.com/in/daniellee',
      contributions: ['Combat System', 'NPC AI'],
      projects: ['Boss Battles', 'Enemy System'],
      points: generatePoints(7200, 8200),
      type: 'game'
    },
    {
      id: 'dev-12',
      name: 'Lisa Wang',
      role: 'Game Developer',
      description: 'Developer chuyên về hệ thống gameplay và tương tác người dùng trong các game nhập vai và chiến thuật.',
      imageUrl: '/images/hall-of-fame/developers/lisa-wang.jpg',
      technologies: ['Unity', 'C#', 'Game UI', 'Gameplay Systems'],
      github: 'https://github.com/lisawang',
      contributions: ['Character Progression', 'Quest System'],
      projects: ['RPG Elements', 'Skill Trees'],
      points: generatePoints(6500, 7500),
      type: 'game'
    },
    {
      id: 'dev-13',
      name: 'Kevin Park',
      role: 'Technical Game Artist',
      description: 'Nghệ sĩ kỹ thuật với chuyên môn trong việc tạo các hiệu ứng đặc biệt, shader và kết hợp nghệ thuật với kỹ thuật trong game.',
      imageUrl: '/images/hall-of-fame/developers/kevin-park.jpg',
      technologies: ['Unity', 'Shader Programming', 'VFX', '3D Modeling'],
      github: 'https://github.com/kevinpark',
      contributions: ['Visual Effects', 'Environment Art'],
      projects: ['Skill Effects', 'World Design'],
      points: generatePoints(6300, 7300),
      type: 'game'
    },

    // Designers
    {
      id: 'dev-14',
      name: 'Anna Kim',
      role: 'Lead UI/UX Designer',
      description: 'Nhà thiết kế UI/UX với con mắt nhạy bén về thẩm mỹ và tập trung vào trải nghiệm người dùng tối ưu cho game và ứng dụng web.',
      imageUrl: '/images/hall-of-fame/developers/anna-kim.jpg',
      technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Prototyping'],
      portfolio: 'https://annakim.design',
      linkedin: 'https://linkedin.com/in/annakim',
      contributions: ['UI Design System', 'User Flows'],
      projects: ['Game Interface', 'Website Redesign'],
      points: generatePoints(7500, 8500),
      type: 'designer'
    },
    {
      id: 'dev-15',
      name: 'James Rodriguez',
      role: 'Visual Designer',
      description: 'Nhà thiết kế đồ họa với kinh nghiệm phong phú trong việc tạo ra các tài sản thị giác hấp dẫn cho game và ứng dụng web.',
      imageUrl: '/images/hall-of-fame/developers/james-rodriguez.jpg',
      technologies: ['Photoshop', 'Illustrator', 'After Effects', 'Motion Design'],
      portfolio: 'https://jamesrodriguez.design',
      contributions: ['Icon Design', 'Marketing Assets'],
      projects: ['Game Assets', 'Brand Identity'],
      points: generatePoints(6700, 7700),
      type: 'designer'
    },
    {
      id: 'dev-16',
      name: 'Michelle Park',
      role: 'UI/UX Designer',
      description: 'Nhà thiết kế giao diện người dùng với niềm đam mê tạo ra trải nghiệm dễ sử dụng và trực quan cho người dùng.',
      imageUrl: '/images/hall-of-fame/developers/michelle-park.jpg',
      technologies: ['Figma', 'Sketch', 'InVision', 'User Testing'],
      portfolio: 'https://michellepark.design',
      linkedin: 'https://linkedin.com/in/michellepark',
      contributions: ['Wireframing', 'User Research'],
      projects: ['Mobile App Design', 'Responsive Web'],
      points: generatePoints(6300, 7300),
      type: 'designer'
    },

    // Fullstack Developers
    {
      id: 'dev-17',
      name: 'Thomas Lee',
      role: 'Fullstack Developer',
      description: 'Developer toàn diện với kinh nghiệm phong phú trong việc xây dựng ứng dụng từ đầu đến cuối với các công nghệ hiện đại.',
      imageUrl: '/images/hall-of-fame/developers/thomas-lee.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      github: 'https://github.com/thomaslee',
      linkedin: 'https://linkedin.com/in/thomaslee',
      contributions: ['Full App Development', 'API Integration'],
      projects: ['Community Forum', 'Admin Dashboard'],
      points: generatePoints(7000, 8000),
      type: 'fullstack'
    },
    {
      id: 'dev-18',
      name: 'Jessica Chen',
      role: 'Fullstack Developer',
      description: 'Developer toàn diện với chuyên môn trong cả frontend và backend, tập trung vào việc xây dựng các ứng dụng web hiệu suất cao.',
      imageUrl: '/images/hall-of-fame/developers/jessica-chen.jpg',
      technologies: ['React', 'Express', 'PostgreSQL', 'GraphQL'],
      github: 'https://github.com/jessicachen',
      contributions: ['Authentication System', 'Data Visualization'],
      projects: ['Analytics Dashboard', 'User Management'],
      points: generatePoints(6800, 7800),
      type: 'fullstack'
    },
  ];

  // Sắp xếp theo điểm và gán xếp hạng
  const sortedDevelopers = developers.sort((a, b) => (b.points || 0) - (a.points || 0));
  return sortedDevelopers.map((dev, index) => ({
    ...dev,
    rank: index + 1
  }));
}; 