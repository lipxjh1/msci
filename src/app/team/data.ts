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
    name: 'Sin MSCI',
    title: 'Founder & CEO',
    image: '/team/ceo.png',
    achievements: [
      '3 years of experience in game design',
      'CEO of TNG - Technology, Media, and Artificial Intelligence Company'
    ],
    quote: 'Our vision is to create a game universe where everyone can contribute and grow together.',
    department: 'leadership'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    title: 'Co-founder & CTO',
    image: '/team/mk1.png',
    achievements: [
      'Blockchain & game development expert',
      'Master of Computer Science',
      '10+ years in mobile game development'
    ],
    quote: 'Technology only matters when it brings great experiences to users.',
    department: 'leadership'
  },

  // Creative Team
  {
    id: 3,
    name: 'Michael Park',
    title: 'Art Director',
    image: '/team/st2.png',
    achievements: [
      'Character designer for many AAA games',
      '2D Spine Animation specialist',
      'Best Art Direction Award 2022'
    ],
    quote: 'Every character in M-SCI has their own story told through every stroke.',
    department: 'creative'
  },
  {
    id: 4,
    name: 'Lisa Wong',
    title: 'Lead Game Designer',
    image: '/team/st1.png',
    achievements: [
      '8 years designing mobile gameplay',
      'Game economy balancing expert',
      'Passionate about creating player experiences'
    ],
    quote: 'A great game is one that makes players lose track of time.',
    department: 'creative'
  },
  {
    id: 5,
    name: 'Niva Kim',
    title: 'Narrative Director',
    image: '/team/kim.png',
    achievements: [
      'Author of many sci-fi novels',
      'World-building for 5+ major games',
      'Best Storytelling Award 2021'
    ],
    quote: 'The story of M-SCI is a journey of faith and hope.',
    department: 'creative'
  },

  // Technical Team
  {
    id: 6,
    name: 'Alex Nguyen',
    title: 'Lead Developer',
    image: '/team/giamdockythuat.png',
    achievements: [
      '7 years developing Unity games',
      'Mobile performance optimization specialist',
      'Backend system architect'
    ],
    quote: 'Code is not just logic, it is the art of creating experiences.',
    department: 'technical'
  },
  {
    id: 7,
    name: 'Emma Liu',
    title: 'Blockchain Engineer',
    image: '/team/kt3.png',
    achievements: [
      'Pioneer in GameFi development',
      'Smart contract specialist',
      'Advisor for many Web3 projects'
    ],
    quote: 'Blockchain opens a new era for digital asset ownership.',
    department: 'technical'
  },
  {
    id: 8,
    name: 'Tom Wilson',
    title: 'Backend Engineer',
    image: '/team/dev1.png',
    achievements: [
      'Built systems for games with 10M+ users',
      'Scalable architecture expert',
      'DevOps & Cloud infrastructure'
    ],
    quote: 'A stable server is the foundation of every successful online game.',
    department: 'technical'
  },

  // Operations Team
  {
    id: 9,
    name: 'Jessica Tran',
    title: 'Community Manager',
    image: '/team/vh1.png',
    achievements: [
      '4 years managing game communities',
      'Built a community of 100k+ members',
      'Social media marketing expert'
    ],
    quote: 'Community is not just players, it is the M-SCI family.',
    department: 'operations'
  },
  {
    id: 10,
    name: 'Kevin Lee',
    title: 'Customer Support Lead',
    image: '/team/ChatGPT Image 11_20_40 22 thg 5, 2025.png',
    achievements: [
      'Managed a 24/7 support team',
      'Resolved 10,000+ tickets/month',
      '98% satisfaction rate'
    ],
    quote: 'Every player issue is an opportunity for us to improve.',
    department: 'operations'
  },
  {
    id: 11,
    name: 'Maria Garcia',
    title: 'QA Lead',
    image: '/team/ChatGPT Image 11_08_32 22 thg 5, 2025.png',
    achievements: [
      '3 years of QA experience in gaming'
    ],
    quote: 'Quality is not a goal, it is a standard.',
    department: 'operations'
  }
]; 