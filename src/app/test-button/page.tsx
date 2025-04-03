"use client";

import React from 'react';
import Button from '@/components/Button';
import ThanhDieuHuong from '@/thanh_phan/thanh_dieu_huong';

export default function TestButtonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      <ThanhDieuHuong />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Overwatch Hexagon Button Test</h1>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Variants</h2>
          <div className="flex flex-wrap gap-8">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Sizes</h2>
          <div className="flex flex-wrap gap-8 items-center">
            <Button size="sm">Small Button</Button>
            <Button size="md">Medium Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Animations</h2>
          <div className="flex flex-wrap gap-8">
            <Button animate="pulse">Pulse Effect</Button>
            <Button animate="glow">Glow Effect</Button>
            <Button animate="shine">Shine Effect</Button>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Links</h2>
          <div className="flex flex-wrap gap-8">
            <Button href="/">Home Link</Button>
            <Button href="/heroes" variant="secondary">Heroes Link</Button>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Full Width</h2>
          <div className="max-w-md space-y-4">
            <Button fullWidth>Full Width Button</Button>
            <Button fullWidth variant="secondary">Full Width Secondary</Button>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Combined Features</h2>
          <div className="flex flex-wrap gap-8">
            <Button 
              variant="primary" 
              size="lg" 
              animate="glow"
              className="tracking-widest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 4.962-.358.655.655 0 0 0 .568-.66 48.05 48.05 0 0 0-.286-5.115.658.658 0 0 1 .646-.677v0c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.035 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25c-.37 0-.713.128-1.003.349-.283.215-.604.401-.959.401v0a.657.657 0 0 1-.647-.677c.021-1.657.115-3.291.287-4.901-1.514-.178-3.042-.301-4.587-.36a.64.64 0 0 0-.61.58v0Z" />
              </svg>
              Play Now
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              animate="shine"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
              </svg>
              Explore Heroes
            </Button>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Overwatch Style Menu Buttons</h2>
          <div className="inline-flex bg-[#1A2526]/70 backdrop-blur-sm p-2 rounded-lg">
            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="m-1">Home</Button>
              <Button variant="secondary" size="sm" className="m-1">Heroes</Button>
              <Button variant="secondary" size="sm" className="m-1">Maps</Button>
              <Button variant="secondary" size="sm" className="m-1">News</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 