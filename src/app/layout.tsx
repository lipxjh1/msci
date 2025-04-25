import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "@/context/SupabaseContext";
import { ModalProvider } from '@/context/ModalContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Overwatch Clone - Game Anh Hùng 5v5 Hành Động",
  description: "Overwatch Clone - Game hành động theo đội nhóm 5v5, miễn phí với nhiều anh hùng đa dạng, kỹ năng độc đáo và trải nghiệm chiến đấu đỉnh cao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClasses = `${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`;
  
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={bodyClasses}>
        <SupabaseProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
