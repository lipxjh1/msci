import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thư Viện Truyện | Overwatch',
  description: 'Đọc những câu chuyện hấp dẫn trong thế giới Overwatch',
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full min-h-screen">
      {children}
    </section>
  );
} 