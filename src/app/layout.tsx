import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron, Be_Vietnam_Pro, Inter, Roboto } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "@/context/SupabaseContext";
import { ModalProvider } from '@/context/ModalContext';
import { SearchProvider } from '@/context/SearchContext';
import SearchModal from '@/components/SearchModal';

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

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
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
  const bodyClasses = `${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${beVietnamPro.variable} ${inter.variable} ${roboto.variable} antialiased`;
  
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={bodyClasses}>
        <SupabaseProvider>
          <SearchProvider>
            <ModalProvider>
              {children}
              <SearchModal />
            </ModalProvider>
          </SearchProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
