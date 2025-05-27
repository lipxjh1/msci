"use client";

import dynamic from 'next/dynamic';
import Loading from "@/components/Loading";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import { Suspense } from "react";

// Import các section desktop
const HeroSection = dynamic(() => import("./home/components/HeroSection"), { loading: () => <Loading />, ssr: false });
const FeatureSection = dynamic(() => import("./home/components/FeatureSection"), { loading: () => <Loading />, ssr: false });
const HeroesSection = dynamic(() => import("./home/components/HeroesSection"), { loading: () => <Loading />, ssr: false });
const NewsSection = dynamic(() => import("./home/components/NewsSection"), { loading: () => <Loading />, ssr: false });
const CTASection = dynamic(() => import("./home/components/CTASection"), { loading: () => <Loading />, ssr: false });
const Footer = dynamic(() => import("./home/components/Footer"), { loading: () => <Loading />, ssr: false });
const ChatBox = dynamic(() => import("./home/ChatBot/ChatBox"), { loading: () => <div></div>, ssr: false });

export default function HomeMobile() {
  return (
    <main className="bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)] min-h-screen flex flex-col w-full overflow-x-hidden">
      {/* Navigation Mobile */}
      <div className="sticky top-0 z-30 w-full">
        <ThanhDieuHuongResponsive />
      </div>
      {/* Hero Section */}
      <section className="w-full max-w-full px-0 sm:px-0">
        <Suspense fallback={<Loading />}>
          <HeroSection />
        </Suspense>
      </section>
      {/* Feature Section */}
      <section className="w-full max-w-full px-0 sm:px-0">
        <Suspense fallback={<Loading />}>
          <FeatureSection />
        </Suspense>
      </section>
      {/* Heroes Section */}
      <section className="w-full max-w-full px-0 sm:px-0">
        <Suspense fallback={<Loading />}>
          <HeroesSection />
        </Suspense>
      </section>
      {/* News Section */}
      <section className="w-full max-w-full px-0 sm:px-0">
        <Suspense fallback={<Loading />}>
          <NewsSection />
        </Suspense>
      </section>
      {/* CTA Section */}
      <section className="w-full max-w-full px-0 sm:px-0">
        <Suspense fallback={<Loading />}>
          <CTASection />
        </Suspense>
      </section>
      {/* Footer */}
      <footer className="w-full max-w-full px-0 sm:px-0 mt-auto">
        <Suspense fallback={<Loading />}>
          <Footer />
        </Suspense>
      </footer>
      {/* ChatBox (nếu cần) */}
      {/* <div className="fixed bottom-4 right-4 z-40">
        <Suspense fallback={<div></div>}>
          <ChatBox />
        </Suspense>
      </div> */}
    </main>
  );
}
