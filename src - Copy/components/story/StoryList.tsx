"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Book, ChevronDown, ChevronUp } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  file: string;
  number: number;
}

interface Story {
  id: string;
  title: string;
  coverImage?: string;
  cover?: string;
  description?: string;
  chapters: Chapter[];
}

interface StoryListProps {
  stories: Story[];
  currentStory: string | null;
  currentChapter: number;
  onSelectStory: (storyId: string) => void;
  onSelectChapter: (storyId: string, chapter: number) => void;
  loading: boolean;
}

const StoryList: React.FC<StoryListProps> = ({
  stories,
  currentStory,
  currentChapter,
  onSelectStory,
  onSelectChapter,
  loading
}) => {
  const [expandedStory, setExpandedStory] = useState<string | null>(currentStory);

  const toggleExpand = (storyId: string) => {
    if (expandedStory === storyId) {
      setExpandedStory(null);
    } else {
      setExpandedStory(storyId);
      if (currentStory !== storyId) {
        onSelectStory(storyId);
      }
    }
  };

  if (loading && stories.length === 0) {
    return (
      <div className="bg-white/75 dark:bg-gray-800/75 backdrop-blur-md p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800 dark:text-gray-200">Danh Sách Truyện</h2>
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/75 dark:bg-gray-800/75 backdrop-blur-md p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800 dark:text-gray-200">
        <span className="flex items-center">
          <Book className="mr-2 text-blue-500" size={18} />
          Danh Sách Truyện
        </span>
      </h2>
      
      <ul className="space-y-4">
        {stories.map(story => (
          <li key={story.id} className="group transition-all duration-300">
            <div 
              onClick={() => toggleExpand(story.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 cursor-pointer 
                ${currentStory === story.id 
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 pl-2'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/30 border-l-4 border-transparent pl-2'}`}
            >
              <div className="h-16 w-16 relative rounded-lg overflow-hidden shrink-0 shadow-md">
                <Image 
                  src={story.coverImage || story.cover || "/images/overwatch_logo.png"} 
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium block text-blue-700 dark:text-blue-400">
                    {story.title}
                  </span>
                  {expandedStory === story.id ? (
                    <ChevronUp size={16} className="text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                {story.description && (
                  <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {story.description}
                  </span>
                )}
              </div>
            </div>
            
            {/* Chapter list */}
            {expandedStory === story.id && (
              <div className="mt-2 ml-6 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3 pt-2 pb-1">
                {story.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => onSelectChapter(story.id, chapter.number)}
                    className={`w-full text-left py-2 px-3 rounded transition-colors flex items-center text-sm
                      ${currentStory === story.id && currentChapter === chapter.number 
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-medium' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300'}`}
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 mr-2 text-xs font-medium">
                      {chapter.number}
                    </span>
                    {chapter.title}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList; 