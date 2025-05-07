import React from 'react';

export default function Footer() {
  return (
    <footer className="relative mt-16 pt-6 pb-4">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      
      <div className="relative border-t border-gray-800 pt-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 mb-1">
              © {new Date().getFullYear()} M-SCI. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 italic">
              Developed by M-SCI Studio team with advisory from Elon Musk.
            </p>
          </div>
          
          <div className="mt-3 flex items-center space-x-4">
            {["Terms", "Privacy", "Cookies", "Contact"].map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-700">•</span>}
                <a href="#" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors duration-300">
                  {item}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 