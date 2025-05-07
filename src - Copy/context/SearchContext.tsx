'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { SearchResult } from '@/services/SearchService';

interface SearchContextType {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  filters: {
    types: string[];
    categories: string[];
  };
  groupBy: 'none' | 'type' | 'category';
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFilters: (filters: { types?: string[], categories?: string[] }) => void;
  setGroupBy: (groupBy: 'none' | 'type' | 'category') => void;
  toggleTypeFilter: (type: string) => void;
  toggleCategoryFilter: (category: string) => void;
  clearFilters: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFiltersState] = useState<{ types: string[], categories: string[] }>({
    types: [],
    categories: []
  });
  const [groupBy, setGroupBy] = useState<'none' | 'type' | 'category'>('none');

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  const setFilters = useCallback((newFilters: { types?: string[], categories?: string[] }) => {
    setFiltersState(prev => ({
      types: newFilters.types !== undefined ? newFilters.types : prev.types,
      categories: newFilters.categories !== undefined ? newFilters.categories : prev.categories
    }));
  }, []);

  const toggleTypeFilter = useCallback((type: string) => {
    setFiltersState(prev => {
      const typeExists = prev.types.includes(type);
      return {
        ...prev,
        types: typeExists 
          ? prev.types.filter(t => t !== type) 
          : [...prev.types, type]
      };
    });
  }, []);

  const toggleCategoryFilter = useCallback((category: string) => {
    setFiltersState(prev => {
      const categoryExists = prev.categories.includes(category);
      return {
        ...prev,
        categories: categoryExists 
          ? prev.categories.filter(c => c !== category) 
          : [...prev.categories, category]
      };
    });
  }, []);
  
  const clearFilters = useCallback(() => {
    setFiltersState({
      types: [],
      categories: []
    });
  }, []);

  const value = {
    isOpen,
    query,
    results,
    isLoading,
    filters,
    groupBy,
    openSearch,
    closeSearch,
    setQuery,
    setResults,
    setIsLoading,
    setFilters,
    setGroupBy,
    toggleTypeFilter,
    toggleCategoryFilter,
    clearFilters
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 