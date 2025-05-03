import { supabase } from '@/utils/supabase';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'tin-tuc' | 'hero' | 'marketplace' | 'trang' | 'guild' | 'tournament' | 'other';
  thumbnail?: string;
  createdAt?: string;
  category?: string;
  keywords?: string[];
  content?: string;
  relevanceScore?: number;
}

interface TinTucItem {
  id: string;
  tieu_de: string;
  tom_tat?: string;
  noi_dung?: string;
  hinh_anh?: string;
  created_at?: string;
  slug?: string;
  danh_muc?: string;
}

interface HeroItem {
  id: string;
  ten: string;
  mo_ta?: string;
  hinh_anh?: string;
  vai_tro?: string;
  slug?: string;
}

interface MarketplaceItem {
  id: string;
  ten: string;
  mo_ta?: string;
  hinh_anh?: string;
  gia?: number;
  loai?: string;
  slug?: string;
}

export class SearchService {
  static async search(query: string, filters?: { types?: string[], categories?: string[] }): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];
    
    try {
      const allData = this.getAllData();
      const searchTerms = query.toLowerCase().trim().split(/\s+/);
      
      let filteredData = allData;
      if (filters) {
        if (filters.types && filters.types.length > 0) {
          filteredData = filteredData.filter(item => filters.types!.includes(item.type));
        }
        if (filters.categories && filters.categories.length > 0) {
          filteredData = filteredData.filter(item => 
            item.category && filters.categories!.includes(item.category)
          );
        }
      }
      
      const results = filteredData.map(item => {
        const relevanceScore = this.calculateRelevanceScore(item, searchTerms);
        
        if (relevanceScore > 0) {
          return {
            ...item,
            relevanceScore
          };
        }
        return null;
      }).filter(item => item !== null) as SearchResult[];
      
      return results.sort((a, b) => 
        (b.relevanceScore || 0) - (a.relevanceScore || 0)
      );
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }
  
  private static calculateRelevanceScore(item: SearchResult, searchTerms: string[]): number {
    const searchableText = [
      item.title || '',
      item.description || '',
      item.category || '',
      item.content || '',
      ...(item.keywords || [])
    ].join(' ').toLowerCase();
    
    let totalScore = 0;
    
    for (const term of searchTerms) {
      let termScore = 0;
      
      if (searchableText.includes(` ${term} `) || 
          searchableText.startsWith(term + ' ') || 
          searchableText.endsWith(' ' + term) || 
          searchableText === term) {
        termScore += 10;
      }
      
      if (item.title.toLowerCase().includes(term)) {
        termScore += 5;
      }
      
      if (item.keywords && item.keywords.some(keyword => 
        keyword.toLowerCase().includes(term)
      )) {
        termScore += 4;
      }
      
      if (item.category && item.category.toLowerCase().includes(term)) {
        termScore += 3;
      }
      
      if (item.description && item.description.toLowerCase().includes(term)) {
        termScore += 2;
      }
      
      if (item.content && item.content.toLowerCase().includes(term)) {
        termScore += 1;
      }
      
      if (termScore === 0) {
        if (this.hasFuzzyMatch(item.title.toLowerCase(), term)) {
          termScore += 2;
        }
        
        if (item.keywords && item.keywords.some(keyword => 
          this.hasFuzzyMatch(keyword.toLowerCase(), term)
        )) {
          termScore += 1.5;
        }
        
        if (item.category && this.hasFuzzyMatch(item.category.toLowerCase(), term)) {
          termScore += 1;
        }
        
        if (item.description && this.hasFuzzyMatch(item.description.toLowerCase(), term)) {
          termScore += 0.8;
        }
        
        if (item.content && this.hasFuzzyMatch(item.content.toLowerCase(), term)) {
          termScore += 0.5;
        }
      }
      
      totalScore += termScore;
    }
    
    return totalScore;
  }
  
  private static hasFuzzyMatch(text: string, term: string): boolean {
    if (term.length >= 3 && text.includes(term)) {
      return true;
    }
    
    if (term.length < 3) {
      const words = text.split(/\s+/);
      return words.some(word => word.startsWith(term) || word.endsWith(term));
    }
    
    return false;
  }
  
  static getAllTypes(): string[] {
    return ['tin-tuc', 'hero', 'marketplace', 'trang', 'guild', 'tournament', 'other'];
  }
  
  static getAllCategories(): string[] {
    const allData = this.getAllData();
    const categories = new Set<string>();
    
    allData.forEach(item => {
      if (item.category) {
        categories.add(item.category);
      }
    });
    
    return Array.from(categories);
  }
  
  private static getAllData(): SearchResult[] {
    return [
      ...this.getPages(),
      ...this.getHeroes(),
      ...this.getNewsPages(),
      ...this.getMarketplaceItems(),
      ...this.getCommunityPages(),
      ...this.getFeaturePages(),
      ...this.getTokenPages()
    ];
  }
  
  private static getPages(): SearchResult[] {
    return [
      { 
        id: 'home', 
        title: 'Home', 
        url: '/', 
        description: 'Main homepage of M-SCI Game', 
        type: 'trang',
        keywords: ['home', 'main', 'start', 'homepage', 'landing'],
        content: 'Welcome to M-SCI Game - the next generation web3 gaming platform. Discover heroes, join battles, earn rewards and connect with players worldwide.'
      },
      { 
        id: 'about', 
        title: 'About Us', 
        url: '/about', 
        description: 'Information about our development team and M-SCI Game project', 
        type: 'trang',
        keywords: ['about', 'information', 'team', 'company', 'project'],
        content: 'M-SCI is a team of passionate developers, designers and gamers creating the next generation of web3 gaming experience. Our mission is to bring blockchain gaming to the mainstream while offering exciting gameplay and economic opportunities.'
      },
      { 
        id: 'about-us', 
        title: 'Introduction', 
        url: '/about-us', 
        description: 'Introduction to the project and team', 
        type: 'trang',
        keywords: ['about', 'introduction', 'info']
      },
      { 
        id: 'guild', 
        title: 'Guild', 
        url: '/guild', 
        description: 'Join and manage your guild', 
        type: 'trang',
        keywords: ['guild', 'clan', 'team', 'group']
      },
      { 
        id: 'tournaments', 
        title: 'Tournaments', 
        url: '/tournaments', 
        description: 'Ongoing tournaments and events', 
        type: 'trang',
        keywords: ['tournament', 'competition', 'event', 'esports']
      },
      { 
        id: 'marketplace', 
        title: 'Marketplace', 
        url: '/marketplace', 
        description: 'Buy, sell and trade game items', 
        type: 'trang',
        keywords: ['marketplace', 'shop', 'store', 'buy', 'sell', 'trade', 'items']
      },
      { 
        id: 'hall-of-fame', 
        title: 'Hall of Fame', 
        url: '/hall-of-fame', 
        description: 'Honoring the best players', 
        type: 'trang',
        keywords: ['hall of fame', 'top players', 'leaderboard', 'best', 'ranking']
      },
      { 
        id: 'support', 
        title: 'Support', 
        url: '/support', 
        description: 'Help center and FAQ', 
        type: 'trang',
        keywords: ['support', 'help', 'faq', 'assistance', 'contact']
      },
      { 
        id: 'team', 
        title: 'Team', 
        url: '/team', 
        description: 'Our development team', 
        type: 'trang',
        keywords: ['team', 'developers', 'staff', 'creators']
      },
      { 
        id: 'careers', 
        title: 'Careers', 
        url: '/careers', 
        description: 'Career opportunities at M-SCI', 
        type: 'trang',
        keywords: ['careers', 'jobs', 'work', 'employment', 'hiring']
      },
      { 
        id: 'contact', 
        title: 'Contact', 
        url: '/contact', 
        description: 'Get in touch with us', 
        type: 'trang',
        keywords: ['contact', 'reach out', 'email', 'message']
      }
    ];
  }
  
  private static getHeroes(): SearchResult[] {
    return [
      { 
        id: 'heroes', 
        title: 'All Heroes', 
        url: '/heroes', 
        description: 'Complete list of heroes in the game', 
        type: 'hero', 
        category: 'Heroes',
        keywords: ['heroes', 'characters', 'champions', 'roster', 'all heroes']
      },
      { 
        id: 'hero-tracer', 
        title: 'Tracer', 
        url: '/heroes/tracer', 
        description: 'Fast attack hero with time-shifting abilities', 
        type: 'hero', 
        category: 'Attack', 
        thumbnail: '/images/heroes/tracer.png',
        keywords: ['tracer', 'attack', 'dps', 'time shift', 'mobility']
      },
      { 
        id: 'hero-reinhardt', 
        title: 'Reinhardt', 
        url: '/heroes/reinhardt', 
        description: 'Tank hero with a protective shield', 
        type: 'hero', 
        category: 'Tank', 
        thumbnail: '/images/heroes/reinhardt.png',
        keywords: ['reinhardt', 'tank', 'shield', 'protection', 'barrier']
      },
      { 
        id: 'hero-mercy', 
        title: 'Mercy', 
        url: '/heroes/mercy', 
        description: 'Support hero with healing and resurrection abilities', 
        type: 'hero', 
        category: 'Support', 
        thumbnail: '/images/heroes/mercy.png',
        keywords: ['mercy', 'support', 'healer', 'heal', 'resurrect', 'resurrection']
      },
      { 
        id: 'hero-hanzo', 
        title: 'Hanzo', 
        url: '/heroes/hanzo', 
        description: 'Long-range attack hero with bow and arrow', 
        type: 'hero', 
        category: 'Attack', 
        thumbnail: '/images/heroes/hanzo.png',
        keywords: ['hanzo', 'attack', 'sniper', 'archer', 'bow', 'arrow']
      },
      { 
        id: 'hero-dva', 
        title: 'D.Va', 
        url: '/heroes/dva', 
        description: 'Tank hero with mobile mech suit', 
        type: 'hero', 
        category: 'Tank', 
        thumbnail: '/images/heroes/dva.png',
        keywords: ['dva', 'd.va', 'tank', 'mech', 'defense matrix']
      }
    ];
  }
  
  private static getNewsPages(): SearchResult[] {
    return [
      { 
        id: 'news', 
        title: 'News', 
        url: '/tin-tuc', 
        description: 'All game news and updates', 
        type: 'tin-tuc', 
        category: 'News',
        keywords: ['news', 'updates', 'articles', 'announcements', 'blog']
      },
      { 
        id: 'news-update', 
        title: 'Latest Update', 
        url: '/tin-tuc/cap-nhat-moi', 
        description: 'Information about the latest update and new features', 
        type: 'tin-tuc', 
        category: 'Update', 
        createdAt: '2023-07-15',
        keywords: ['update', 'patch', 'version', 'new features', 'changes']
      },
      { 
        id: 'news-event', 
        title: 'Summer Event', 
        url: '/tin-tuc/su-kien-mua-he', 
        description: 'Join the summer event with exciting rewards', 
        type: 'tin-tuc', 
        category: 'Event', 
        createdAt: '2023-06-20',
        keywords: ['summer', 'event', 'seasonal', 'rewards', 'limited time']
      },
      { 
        id: 'news-tournament', 
        title: 'International Tournament', 
        url: '/tin-tuc/giai-dau-quoc-te', 
        description: 'Information about the upcoming international tournament', 
        type: 'tin-tuc', 
        category: 'Tournament', 
        createdAt: '2023-05-10',
        keywords: ['tournament', 'competition', 'championship', 'international', 'esports']
      },
      { 
        id: 'news-token-launch', 
        title: 'MSCI Token Launch', 
        url: '/tin-tuc/token-launch', 
        description: 'Announcement of our MSCI token launch and initial offering', 
        type: 'tin-tuc', 
        category: 'Token', 
        createdAt: '2023-04-20',
        keywords: ['token', 'launch', 'crypto', 'ico', 'offering', 'msci token'],
        content: 'We are excited to announce the launch of our MSCI token! The token will be used for transactions in the game, governance voting, and staking rewards. Initial offering will begin next month with special bonuses for early adopters.'
      }
    ];
  }
  
  private static getMarketplaceItems(): SearchResult[] {
    return [
      { 
        id: 'marketplace-main', 
        title: 'Marketplace', 
        url: '/marketplace', 
        description: 'Buy, sell and trade game items', 
        type: 'marketplace', 
        category: 'Marketplace',
        keywords: ['marketplace', 'shop', 'store', 'items', 'trading']
      },
      { 
        id: 'skin-tracer', 
        title: 'Tracer Legendary Skin', 
        url: '/marketplace/skin-legendary-tracer', 
        description: '2000 $MSCI - Exclusive skin for Tracer', 
        type: 'marketplace', 
        category: 'Skin', 
        thumbnail: '/images/marketplace/tracer-skin.jpg',
        keywords: ['tracer', 'skin', 'legendary', 'cosmetic', 'outfit']
      },
      { 
        id: 'skin-reinhardt', 
        title: 'Reinhardt Rare Skin', 
        url: '/marketplace/skin-rare-reinhardt', 
        description: '1000 $MSCI - Rare skin for Reinhardt', 
        type: 'marketplace', 
        category: 'Skin', 
        thumbnail: '/images/marketplace/reinhardt-skin.jpg',
        keywords: ['reinhardt', 'skin', 'rare', 'cosmetic', 'outfit']
      },
      { 
        id: 'emote-mercy', 
        title: 'Mercy Emote', 
        url: '/marketplace/emote-mercy', 
        description: '500 $MSCI - Special emote for Mercy', 
        type: 'marketplace', 
        category: 'Emote', 
        thumbnail: '/images/marketplace/mercy-emote.jpg',
        keywords: ['mercy', 'emote', 'animation', 'expression']
      },
      { 
        id: 'token-pack', 
        title: 'MSCI Token Pack', 
        url: '/marketplace/token-pack', 
        description: 'Purchase MSCI tokens for use in the game marketplace', 
        type: 'marketplace', 
        category: 'Token', 
        thumbnail: '/images/marketplace/token-pack.jpg',
        keywords: ['token', 'msci', 'currency', 'pack', 'purchase'],
        content: 'Token packs are available in different sizes. Buy MSCI tokens to use in the game for purchasing skins, emotes, battle passes and other items. Special discounts available for larger purchases.'
      }
    ];
  }
  
  private static getCommunityPages(): SearchResult[] {
    return [
      { 
        id: 'community', 
        title: 'Community', 
        url: '/community', 
        description: 'Join the M-SCI community', 
        type: 'other', 
        category: 'Community',
        keywords: ['community', 'social', 'players', 'fans']
      },
      { 
        id: 'creators', 
        title: 'Content Creator', 
        url: '/creators', 
        description: 'Information about the content creator program', 
        type: 'other', 
        category: 'Community',
        keywords: ['content creator', 'streamer', 'youtuber', 'influencer']
      },
      { 
        id: 'forum', 
        title: 'Forum', 
        url: '/forum', 
        description: 'Community discussion forum', 
        type: 'other', 
        category: 'Community',
        keywords: ['forum', 'discussion', 'community', 'chat', 'board']
      }
    ];
  }
  
  private static getFeaturePages(): SearchResult[] {
    return [
      { 
        id: 'game', 
        title: 'Game', 
        url: '/game', 
        description: 'Information about the game', 
        type: 'other', 
        category: 'Game',
        keywords: ['game', 'play', 'gameplay', 'gaming']
      },
      { 
        id: 'story', 
        title: 'Story', 
        url: '/story', 
        description: 'The story of M-SCI world', 
        type: 'other', 
        category: 'Game',
        keywords: ['story', 'lore', 'narrative', 'plot', 'background']
      },
      { 
        id: 'gameplay', 
        title: 'Gameplay', 
        url: '/mechanics', 
        description: 'Information about gameplay and game mechanics', 
        type: 'other', 
        category: 'Game',
        keywords: ['gameplay', 'mechanics', 'how to play', 'game play', 'controls', 'tutorial']
      },
      { 
        id: 'gacha', 
        title: 'Gacha', 
        url: '/gacha', 
        description: 'Character and item summoning system', 
        type: 'other', 
        category: 'Game',
        keywords: ['gacha', 'summon', 'pull', 'lottery', 'random', 'loot box']
      },
      { 
        id: 'minigames', 
        title: 'Mini Games', 
        url: '/minigames', 
        description: 'Small games within the main game', 
        type: 'other', 
        category: 'Game',
        keywords: ['minigames', 'mini games', 'arcade', 'casual', 'games']
      },
      { 
        id: 'roadmap', 
        title: 'Roadmap', 
        url: '/roadmap', 
        description: 'Development roadmap for the project', 
        type: 'other', 
        category: 'Investment',
        keywords: ['roadmap', 'development', 'future', 'plans', 'timeline']
      },
      { 
        id: 'referral', 
        title: 'Referral Program', 
        url: '/referral', 
        description: 'Information about the referral program for new players', 
        type: 'other', 
        category: 'Investment',
        keywords: ['referral', 'refer', 'invite', 'friends', 'rewards']
      }
    ];
  }
  
  private static getTokenPages(): SearchResult[] {
    return [
      {
        id: 'token-overview',
        title: 'MSCI Token',
        url: '/token',
        description: 'Overview of the MSCI token, our native cryptocurrency',
        type: 'other',
        category: 'Token',
        keywords: ['token', 'crypto', 'cryptocurrency', 'msci', 'coin'],
        content: 'MSCI Token is the native cryptocurrency of our platform. It can be used for in-game purchases, trading on our marketplace, staking for rewards, and governance voting. The token follows the ERC-20 standard and has a total supply of 1 billion tokens.'
      },
      {
        id: 'tokenomics',
        title: 'Tokenomics',
        url: '/tokenomics',
        description: 'Detailed information about MSCI token economics',
        type: 'other',
        category: 'Token',
        keywords: ['tokenomics', 'token economics', 'distribution', 'vesting', 'supply'],
        content: 'Our tokenomics is designed to create a sustainable ecosystem. Initial token distribution: 40% for players and community, 20% for team (vested over 2 years), 15% for development, 15% for marketing, 10% for partnerships. The token has deflationary mechanisms including burning 2% of marketplace fees.'
      },
      {
        id: 'token-staking',
        title: 'Token Staking',
        url: '/staking',
        description: 'Stake your MSCI tokens to earn rewards',
        type: 'other',
        category: 'Token',
        keywords: ['staking', 'stake', 'rewards', 'earn', 'yield', 'apr'],
        content: 'Stake your MSCI tokens to earn rewards and exclusive benefits. Our staking program offers flexible and locked staking options with APRs ranging from 5% to 25% depending on lock period. Stakers also get exclusive access to special events and NFT drops.'
      },
      {
        id: 'token-exchange',
        title: 'Buy MSCI Token',
        url: '/buy-token',
        description: 'How to buy MSCI tokens on exchanges',
        type: 'other',
        category: 'Token',
        keywords: ['buy', 'purchase', 'exchange', 'swap', 'trade', 'dex', 'cex'],
        content: 'MSCI tokens are available on multiple exchanges including Binance, KuCoin, Gate.io, and Uniswap. You can buy tokens using cryptocurrencies like ETH, USDT, or BNB, or directly with fiat currencies on some exchanges. The tokens can be stored in any ERC-20 compatible wallet.'
      }
    ];
  }
} 