"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, MessageSquare, Share2, ThumbsUp, ChevronUp, Trophy, Bell } from "lucide-react";

// Components
import NavBar from "@/components/NavBar";
import ReadingControls from "@/components/story/ReadingControls";
import StoryContent from "@/components/story/StoryContent";
import StoryList from "@/components/story/StoryList";
import StoryNotSelected from "@/components/story/StoryNotSelected";

// Types
interface Chapter {
  id: string;
  title: string; // These titles in sampleStories are English, will remain so for the list
  file: string;
  number: number;
}

interface Story {
  id: string;
  title: string; // These titles in sampleStories are English, will remain so for the list
  author: string;
  category: string;
  cover: string;
  description: string; // These descriptions in sampleStories are English
  createdAt: string;
  likes: number;
  views: number;
  chapters: Chapter[];
}

const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'ko', name: '한국어' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' }
];

// Translations for the Story List title
const storyListTitleTranslations: { [key: string]: string } = {
  vi: 'Danh Sách Truyện',
  en: 'Story List',
  zh: '故事列表',
  ja: '物語一覧',
  ko: '이야기 목록',
  es: 'Lista de Historias',
  fr: 'Liste des Histoires',
  de: 'Geschichtenliste',
  ru: 'Список Историй',
  pt: 'Lista de Histórias'
};

const StoryPage = () => {
  const [allStoriesData, setAllStoriesData] = useState<Story[]>([]); // Renamed from stories
  const [displayableStories, setDisplayableStories] = useState<Story[]>([]); // For filtered list
  const [isFilteringList, setIsFilteringList] = useState<boolean>(true); // Loading state for list filtering

  const [currentStory, setCurrentStory] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [storyContent, setStoryContent] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(18);
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [loading, setLoading] = useState<boolean>(true); // For content loading
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showPointsNotification, setShowPointsNotification] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('vi');

  const contentRef = useRef<HTMLDivElement>(null);

  // Effect for initial setup and fetching all story metadata
  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    
    const savedTheme = localStorage.getItem('reader_theme');
    if (savedTheme) setTheme(savedTheme as 'light' | 'dark' | 'sepia');
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    
    const savedFontSize = localStorage.getItem('reader_font_size');
    if (savedFontSize) setFontSize(parseInt(savedFontSize));

    const savedLanguage = localStorage.getItem('story_language');
    if (savedLanguage) setSelectedLanguage(savedLanguage);
    
    const fetchAllStoryMetadata = async () => {
      setIsFilteringList(true); // Start with list filtering true
      setLoading(true); // Also general loading true
      try {
        const sampleStories = [
          {
            id: "msci_story",
            title: "The Connected Age", 
            author: "Author 1",
            category: "Story",
            cover: "/images/overwatch_bg_2.jpg", 
            description: "A story about a future world with Neuralink technology connecting people.",
            createdAt: "2024-04-01",
            likes: 120,
            views: 500,
            chapters: [
              { id: "1chuongmodau", title: "Prologue: The Connected Age", file: "1chuongmodau.txt", number: 1 },
              { id: "2chuong1", title: "Chapter 1: The Awakening", file: "2chuong1.txt", number: 2 },
              { id: "3chuong2", title: "Chapter 2: The Encounter", file: "3chuong2.txt", number: 3 }
            ]
          }
        ];
        setAllStoriesData(sampleStories);
        // Filtering will happen in another useEffect dependent on allStoriesData and selectedLanguage
      } catch (error) {
        console.error("Error fetching initial story metadata:", error);
        setAllStoriesData([]);
      } finally {
        // setLoading(false); // Loading will be set to false after filtering and content fetch attempt
      }
    };

    fetchAllStoryMetadata();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array for one-time setup

  // Effect for filtering stories based on language availability
  useEffect(() => {
    const filterAndSetStories = async () => {
      if (allStoriesData.length === 0) {
        setDisplayableStories([]);
        setIsFilteringList(false);
        setLoading(false); // No stories, no loading
        // StoryNotSelected will be rendered via JSX based on states, no need to setStoryContent here
        if (!currentStory) setStoryContent(''); // Clear content if no stories to filter
        return;
      }

      setIsFilteringList(true);
      setLoading(true); // Indicate general loading during this process

      const storyAvailabilityChecks = allStoriesData.map(async (story) => {
        if (!story.chapters || story.chapters.length === 0 || !story.chapters[0].file) {
          return { ...story, isAvailable: false };
        }
        const firstChapterFile = story.chapters[0].file;
        const filePath = `/tailieu/truyen/${selectedLanguage}/${firstChapterFile}`;
        try {
          const response = await fetch(filePath);
          return { ...story, isAvailable: response.ok };
        } catch (error) {
          console.warn(`Failed to check availability for ${filePath}`, error);
          return { ...story, isAvailable: false };
        }
      });

      const results = await Promise.all(storyAvailabilityChecks);
      const availableStories = results.filter(story => story.isAvailable);
      setDisplayableStories(availableStories as Story[]);
      setIsFilteringList(false);
      // setLoading is handled by fetchStoryContent

      if (availableStories.length > 0) {
        const currentStoryStillAvailable = availableStories.some(s => s.id === currentStory);
        if (!currentStoryStillAvailable || !currentStory) {
          // If current story is no longer available, or no story was selected, select the first available one
          // fetchStoryContent will be triggered by the dependency change on currentStory/currentChapter
          setCurrentStory(availableStories[0].id);
          setCurrentChapter(1);
        } else {
          // If current story is still available, ensure its content is fetched (already handled by another useEffect)
        }
      } else {
        setCurrentStory(null);
        setCurrentChapter(1);
        setStoryContent(''); // Clear story content
        setLoading(false); // No content to load
      }
    };

    filterAndSetStories();
  }, [allStoriesData, selectedLanguage]); // Removed currentStory from deps to avoid re-triggering selection logic unnecessarily before content fetch


  useEffect(() => { localStorage.setItem('reader_theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('reader_font_size', fontSize.toString()); }, [fontSize]);
  useEffect(() => { localStorage.setItem('story_language', selectedLanguage); }, [selectedLanguage]);

  const fetchStoryContent = useCallback(async (storyId: string, chapterNum: number, language: string) => {
    setLoading(true);
    try {
      const story = allStoriesData.find(s => s.id === storyId); // Use allStoriesData for metadata
      if (!story || !story.chapters || story.chapters.length === 0) {
        throw new Error("Story metadata or chapters not found in application state.");
      }
      
      const chapterData = story.chapters.find(c => c.number === chapterNum);
      if (!chapterData || !chapterData.file || !chapterData.title) {
        throw new Error(`Chapter metadata for chapter number ${chapterNum} not found or incomplete.`);
      }
      
      let chapterFileContent = "";
      let contentFetchedSuccessfully = false;

      try {
        const response = await fetch(`/tailieu/truyen/${language}/${chapterData.file}`);
        if (response.ok) {
           chapterFileContent = await response.text();
           contentFetchedSuccessfully = true;
        } else {
          console.warn(`Story content for ${chapterData.file} (Chapter: "${chapterData.title}") not found in selected language: ${language} (HTTP Status: ${response.status})`);
        }
      } catch(fetchError) {
         console.error(`Error fetching story content /tailieu/truyen/${language}/${chapterData.file}:`, fetchError);
      }
      
      if (contentFetchedSuccessfully) {
        setStoryContent(chapterFileContent);
      } else {
        const languageName = availableLanguages.find(l => l.code === language)?.name || language;
        const titleForMessage = chapterData.title || `Chapter ${chapterNum}`;
        setStoryContent(`Content for "${titleForMessage}" is not yet available in ${languageName}.`);
      }
      
      setCurrentStory(storyId);
      setCurrentChapter(chapterNum);

    } catch (error) {
      console.error("Error processing story/chapter metadata:", error);
      setStoryContent("Error: Could not load story or chapter details. Please contact support or try refreshing.");
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  }, [allStoriesData]); // Depends on allStoriesData for metadata, availableLanguages is stable

  // Effect to refetch content when language, story, or chapter changes by user interaction
  useEffect(() => {
    if (currentStory && displayableStories.some(s => s.id === currentStory)) { // Ensure current story is valid before fetching
      fetchStoryContent(currentStory, currentChapter, selectedLanguage);
    }
    // If currentStory becomes null due to filtering, this won't run, which is fine.
    // If displayableStories is empty, currentStory will be null.
  }, [currentStory, currentChapter, selectedLanguage, fetchStoryContent, displayableStories]);


  const handleSelectStory = (storyId: string) => {
    // fetchStoryContent will be called by the useEffect above when currentStory/currentChapter changes
    setCurrentStory(storyId); 
    setCurrentChapter(1); 
  };

  const handleSelectChapter = (storyId: string, chapter: number) => {
    // fetchStoryContent will be called by the useEffect above
    setCurrentStory(storyId);
    setCurrentChapter(chapter);
  };

  const handleNextChapter = useCallback(() => {
    if (currentStory) {
      const story = allStoriesData.find(s => s.id === currentStory);
      if (story && currentChapter < story.chapters.length) {
        // setCurrentChapter(currentChapter + 1); // Let useEffect handle fetch
         fetchStoryContent(currentStory, currentChapter + 1, selectedLanguage); // direct call to avoid race condition with state update
      }
    }
  }, [currentStory, currentChapter, selectedLanguage, fetchStoryContent, allStoriesData]);

  const handlePrevChapter = useCallback(() => {
    if (currentStory && currentChapter > 1) {
      // setCurrentChapter(currentChapter - 1); // Let useEffect handle fetch
      fetchStoryContent(currentStory, currentChapter - 1, selectedLanguage); // direct call
    }
  }, [currentStory, currentChapter, selectedLanguage, fetchStoryContent, allStoriesData]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const themeStyles = {
    light: { background: '#ffffff', text: '#333333', secondary: '#4a5568' },
    dark: { background: '#111827', text: '#f3f4f6', secondary: '#9ca3af' },
    sepia: { background: '#f8f0e3', text: '#422006', secondary: '#6b5e50' }
  };

  const currentStoryObj = currentStory ? allStoriesData.find(s => s.id === currentStory) : null; // Use allStories for title consistency
  const currentChapterTitle = currentStoryObj?.chapters.find(c => c.number === currentChapter)?.title || '';
  const totalChapters = currentStoryObj?.chapters.length || 0;

  useEffect(() => {
    const points = localStorage.getItem('user_points');
    if (points) setUserPoints(parseInt(points));
    const hasSeenNotification = localStorage.getItem('points_notification_seen');
    if (!hasSeenNotification) setTimeout(() => setShowPointsNotification(true), 3000);
  }, []);
  
  const handleCloseNotification = () => {
    setShowPointsNotification(false);
    localStorage.setItem('points_notification_seen', 'true');
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${themeStyles[theme].background} ${themeStyles[theme].text}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <NavBar />
      <div className="relative h-[50vh] bg-gradient-to-r from-blue-900 to-purple-900 mb-8">
        <Image src="/images/banner/trangchu.jpg" alt="Story background" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 flex items-center justify-center flex-col px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">Story Library</h1>
          <p className="text-lg text-white text-center max-w-2xl drop-shadow">Discover captivating stories in the MSCI universe.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-6 pb-12 relative">
        <div className="mb-6">
          <label htmlFor="language-select" className="mr-2 font-semibold text-lg">Select Language:</label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="mb-4">
              <h2 className="text-xl font-bold flex items-center text-gray-800 dark:text-gray-100">
                <BookOpen className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
                {storyListTitleTranslations[selectedLanguage] || storyListTitleTranslations.en}
              </h2>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
            </div>
            <StoryList 
              stories={displayableStories}
              currentStory={currentStory}
              currentChapter={currentChapter}
              onSelectStory={handleSelectStory}
              onSelectChapter={handleSelectChapter}
              loading={isFilteringList}
            />
          </div>

          <div className="lg:w-3/4">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              {isFilteringList && <StoryNotSelected message="Checking story availability..." />}
              
              {!isFilteringList && !currentStory && displayableStories.length === 0 && 
                <StoryNotSelected message={`No stories available in ${availableLanguages.find(l=>l.code === selectedLanguage)?.name || selectedLanguage}.`} />}
              
              {!isFilteringList && !currentStory && displayableStories.length > 0 && 
                <StoryNotSelected /> /* Default message: Select a story */}
              
              {currentStory && (
                <>
                  <ReadingControls 
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    theme={theme}
                    setTheme={setTheme}
                    title={currentStoryObj?.title || 'Now Reading'}
                    currentChapter={currentChapter}
                    totalChapters={totalChapters}
                    onNextChapter={handleNextChapter}
                    onPrevChapter={handlePrevChapter}
                  />
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentChapterTitle}</h2>
                  </div>
                  <StoryContent content={storyContent} fontSize={fontSize} loading={loading} />
                  <div className="mt-10 flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={handlePrevChapter} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 story-nav-button" disabled={currentChapter <= 1}>
                      <ArrowLeft className="h-5 w-5" /> Previous Chapter
                    </button>
                    <button onClick={handleNextChapter} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 story-nav-button" disabled={!currentStoryObj || currentChapter >= totalChapters}>
                      Next Chapter <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {currentStory && (
              <div className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                  <MessageSquare className="mr-2 text-blue-500" size={20} /> Comments
                </h3>
                <div className="mb-6">
                  <textarea className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" rows={3} placeholder="Write your comment..."></textarea>
                  <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors story-nav-button">Post Comment</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Sample comments */}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 animate-fade-in" aria-label="Scroll to top">
          <ChevronUp size={24} />
        </button>
      )}
      
      {showPointsNotification && (
        <div className="fixed bottom-6 left-6 max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border-l-4 border-yellow-500 z-50 animate-slide-up">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="mt-0.5"><Trophy size={20} className="text-yellow-500" /></div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">New Feature: Earn Points!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Answer questions while reading stories to earn bonus points and unlock special stories.</p>
              </div>
            </div>
            <button onClick={handleCloseNotification} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryPage; 