'use client';

import { createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/utils/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

// Tạo context
const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

// Provider component
export function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

// Hook để sử dụng supabase
export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase phải được sử dụng trong SupabaseProvider');
  }
  return context;
} 