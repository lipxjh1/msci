import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron, Be_Vietnam_Pro, Inter, Roboto } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "@/context/SupabaseContext";
import { ModalProvider } from '@/context/ModalContext';
import { SearchProvider } from '@/context/SearchContext';
import { AuthProvider } from '@/context/AuthContext';
import { SocialLinksProvider } from '@/context/SocialLinksContext';
import SearchModal from '@/components/SearchModal';
import PageTracker from '@/components/analytics/PageTracker';

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
  title: "MSCI GAME",
  description: "MSCI is a tactical sci-fi action game set in 2049, where technology and humanity clash on a global scale. Join the M-SCI forces to protect mankind against the threat of The Ascended and their robot army.",
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
          <AuthProvider>
            <SocialLinksProvider>
              <SearchProvider>
                <ModalProvider>
                  {children}
                  <SearchModal />
                  <PageTracker />
                </ModalProvider>
              </SearchProvider>
            </SocialLinksProvider>
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
