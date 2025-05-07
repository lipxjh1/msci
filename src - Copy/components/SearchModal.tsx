'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiExternalLink, FiFilter, FiCheck, FiTag, FiLayers, FiList } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useSearch } from '@/context/SearchContext';
import { SearchService, SearchResult } from '@/services/SearchService';

export default function SearchModal() {
  const {
    isOpen,
    query,
    results,
    isLoading,
    filters,
    groupBy,
    closeSearch,
    setQuery,
    setResults,
    setIsLoading,
    setGroupBy,
    toggleTypeFilter,
    toggleCategoryFilter,
    clearFilters
  } = useSearch();
  
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  
  // Lấy danh sách tất cả các loại và danh mục
  const allTypes = SearchService.getAllTypes();
  const [allCategories, setAllCategories] = useState<string[]>([]);
  
  useEffect(() => {
    if (isOpen) {
      // Lấy tất cả các danh mục khi mở modal
      const categories = SearchService.getAllCategories();
      setAllCategories(categories);
    }
  }, [isOpen]);
  
  // Focus vào ô tìm kiếm khi mở modal
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Xử lý nhấn phím
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeSearch();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          if (selectedIndex >= 0 && results[selectedIndex]) {
            navigateToResult(results[selectedIndex]);
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, closeSearch]);
  
  // Cuộn đến kết quả được chọn
  useEffect(() => {
    if (selectedIndex >= 0 && resultsContainerRef.current) {
      const selectedElement = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);
  
  // Xử lý khi có thay đổi từ khóa tìm kiếm hoặc bộ lọc
  useEffect(() => {
    const searchDebounce = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        const searchResults = await SearchService.search(query, {
          types: filters.types.length > 0 ? filters.types : undefined,
          categories: filters.categories.length > 0 ? filters.categories : undefined
        });
        setResults(searchResults);
        setSelectedIndex(-1);
        setIsLoading(false);
      } else {
        setResults([]);
        setSelectedIndex(-1);
      }
    }, 300);
    
    return () => clearTimeout(searchDebounce);
  }, [query, filters, setIsLoading, setResults]);
  
  // Di chuyển đến kết quả được chọn
  const navigateToResult = (result: SearchResult) => {
    closeSearch();
    router.push(result.url);
  };
  
  // Lấy icon dựa vào loại kết quả
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tin-tuc':
        return '📰';
      case 'hero':
        return '🦸';
      case 'marketplace':
        return '🛒';
      case 'trang':
        return '📄';
      case 'guild':
        return '⚔️';
      case 'tournament':
        return '🏆';
      default:
        return '🔍';
    }
  };
  
  // Định dạng ngày tháng
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };
  
  // Chuyển đổi loại thành tên hiển thị
  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'tin-tuc': return 'News';
      case 'hero': return 'Hero';
      case 'marketplace': return 'Marketplace';
      case 'trang': return 'Page';
      case 'guild': return 'Guild';
      case 'tournament': return 'Tournament';
      case 'other': return 'Other';
      default: return type;
    }
  };
  
  // Nhóm kết quả theo loại hoặc danh mục
  const getGroupedResults = () => {
    if (groupBy === 'none') return { 'All Results': results };
    
    const grouped: Record<string, SearchResult[]> = {};
    
    results.forEach(result => {
      let groupKey: string;
      
      if (groupBy === 'type') {
        groupKey = getTypeDisplayName(result.type);
      } else { // groupBy === 'category'
        groupKey = result.category || 'Uncategorized';
      }
      
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      
      grouped[groupKey].push(result);
    });
    
    return grouped;
  };
  
  // Hiển thị kết quả tìm kiếm
  const renderSearchResult = (result: SearchResult, index: number) => {
    return (
      <motion.div
        key={`${result.type}-${result.id}`}
        data-index={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
        onClick={() => navigateToResult(result)}
        className={`p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${
          selectedIndex === index ? 'bg-blue-900/30 border-l-4 border-blue-500' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          {result.thumbnail ? (
            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={result.thumbnail}
                alt={result.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-md bg-gray-800 flex items-center justify-center flex-shrink-0 text-xl">
              {getTypeIcon(result.type)}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h4 className="text-base font-medium text-white truncate">{result.title}</h4>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-2 flex items-center">
                {result.relevanceScore !== undefined && (
                  <span className="mr-2 px-1.5 py-0.5 bg-blue-900/50 rounded text-blue-300">
                    {result.relevanceScore.toFixed(1)}
                  </span>
                )}
                {result.createdAt && formatDate(result.createdAt)}
              </span>
            </div>
            
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                {getTypeDisplayName(result.type)}
              </span>
              
              {result.category && (
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                  {result.category}
                </span>
              )}
            </div>
            
            {result.description && (
              <p className="mt-1 text-sm text-gray-400 line-clamp-2">{result.description}</p>
            )}
            
            <div className="mt-2 text-xs text-blue-400 flex items-center">
              <FiExternalLink className="w-3 h-3 mr-1" />
              <span className="truncate">{result.url}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
  // Hiển thị nội dung dựa trên trạng thái tìm kiếm
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Searching...</p>
        </div>
      );
    }
    
    if (query.length < 2) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <FiSearch className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Search in M-SCI</h3>
          <p className="text-gray-400">Enter at least 2 characters to start searching</p>
        </div>
      );
    }
    
    if (results.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
          <p className="text-gray-400">Try searching with different keywords or adjusting your filters</p>
          {(filters.types.length > 0 || filters.categories.length > 0) && (
            <button 
              onClick={clearFilters}
              className="mt-4 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      );
    }
    
    const groupedResults = getGroupedResults();
    
    return (
      <div 
        ref={resultsContainerRef}
        className="overflow-y-auto max-h-[60vh]"
      >
        {Object.entries(groupedResults).map(([group, groupResults]) => (
          <div key={group} className="mb-2">
            {/* Hiển thị tiêu đề nhóm nếu có nhiều nhóm */}
            {groupBy !== 'none' && (
              <div className="sticky top-0 z-10 bg-gray-900/95 px-4 py-2 border-b border-gray-800 flex items-center">
                <h3 className="text-sm font-medium text-white">{group}</h3>
                <span className="ml-2 text-xs text-gray-400">({groupResults.length})</span>
              </div>
            )}
            
            {/* Hiển thị kết quả của nhóm */}
            <div className="divide-y divide-gray-800/80">
              {groupResults.map((result, index) => renderSearchResult(
                result, 
                results.findIndex(r => r.id === result.id && r.type === result.type)
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Hiển thị bộ lọc
  const renderFilters = () => {
    return (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="border-t border-gray-800 overflow-hidden bg-gray-900/90"
      >
        <div className="p-4 space-y-4">
          {/* Tùy chọn nhóm kết quả */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2 flex items-center">
              <FiLayers className="mr-2" /> Group Results By
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setGroupBy('none')}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  groupBy === 'none' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FiList className="inline-block mr-1" /> None
              </button>
              <button 
                onClick={() => setGroupBy('type')}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  groupBy === 'type' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FiLayers className="inline-block mr-1" /> Type
              </button>
              <button 
                onClick={() => setGroupBy('category')}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  groupBy === 'category' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FiTag className="inline-block mr-1" /> Category
              </button>
            </div>
          </div>
          
          {/* Bộ lọc loại */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Content Types</h3>
            <div className="flex flex-wrap gap-2">
              {allTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleTypeFilter(type)}
                  className={`px-3 py-1.5 text-xs rounded-full flex items-center ${
                    filters.types.includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {filters.types.includes(type) && <FiCheck className="mr-1" />}
                  {getTypeDisplayName(type)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bộ lọc danh mục */}
          {allCategories.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-white mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategoryFilter(category)}
                    className={`px-3 py-1.5 text-xs rounded-full flex items-center ${
                      filters.categories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {filters.categories.includes(category) && <FiCheck className="mr-1" />}
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Nút xóa tất cả bộ lọc */}
          {(filters.types.length > 0 || filters.categories.length > 0) && (
            <div className="flex justify-center">
              <button 
                onClick={clearFilters}
                className="px-3 py-1.5 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-gray-900 rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-800"
          >
            {/* Search header */}
            <div className="p-4 border-b border-gray-800 flex items-center bg-gray-900/95">
              <FiSearch className="text-gray-400 w-5 h-5 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search in M-SCI..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white focus:outline-none text-lg"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`ml-2 p-2 rounded-full transition-colors ${
                  showFilters 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                } ${filters.types.length > 0 || filters.categories.length > 0 ? 'ring-2 ring-blue-500' : ''}`}
              >
                <FiFilter className="w-5 h-5" />
              </button>
              <button
                onClick={closeSearch}
                className="ml-2 p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            {/* Bộ lọc */}
            <AnimatePresence>
              {showFilters && renderFilters()}
            </AnimatePresence>
            
            {/* Kết quả tìm kiếm */}
            <div className="bg-gray-900/90">
              {renderContent()}
            </div>
            
            {/* Search footer */}
            <div className="p-3 border-t border-gray-800 bg-gray-900/95 text-xs text-gray-500 flex justify-between">
              <span>Press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">↑</kbd> <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">↓</kbd> to navigate, <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Enter</kbd> to select</span>
              <span><kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Esc</kbd> to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 