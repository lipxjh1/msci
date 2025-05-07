'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCopy, FaCheckCircle, FaGift, FaTrophy, FaQuestion, FaUsers, FaMedal } from 'react-icons/fa';

// Import các tab component
import HowItWorksTab from './tabs/how_it_works_tab';
import RewardsTab from './tabs/rewards_tab';
import MyReferralsTab from './tabs/my_referrals_tab';
import LeaderboardTab from './tabs/leaderboard_tab';
import FAQTab from './tabs/faq_tab';

// Interface cho các tab
interface TabContentProps {
  activeTab: string;
}

export default function ReferralContent({ activeTab }: TabContentProps) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const referralCode = "MSCI-XYZ789";
  const referralLink = `https://msci.game/register?ref=${referralCode}`;

  // Xử lý sao chép mã giới thiệu
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Xử lý sao chép link giới thiệu
  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Hiển thị nội dung theo tab
  const renderContent = () => {
    switch (activeTab) {
      case 'how-it-works':
        return <HowItWorksTab />;
      case 'rewards':
        return <RewardsTab />;
      case 'my-referrals':
        return <MyReferralsTab 
                 referralCode={referralCode} 
                 referralLink={referralLink} 
                 onCopyCode={handleCopyReferralCode} 
                 onCopyLink={handleCopyReferralLink} 
                 copied={copied} 
               />;
      case 'leaderboard':
        return <LeaderboardTab />;
      case 'faq':
        return <FAQTab />;
      default:
        return <HowItWorksTab />;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl min-h-[500px]">
      {renderContent()}
    </div>
  );
} 