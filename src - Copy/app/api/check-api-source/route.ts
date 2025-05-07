import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Lấy thông tin từ biến môi trường
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    // Kiểm tra các thông số cấu hình
    const config = {
      useDirectApiKeys: process.env.NEXT_PUBLIC_USE_DIRECT_API_KEYS === 'true',
      useFallbackResponses: process.env.NEXT_PUBLIC_USE_FALLBACK_RESPONSES === 'true'
    };
    
    // Tạo Supabase client
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        error: 'Thiếu biến môi trường Supabase',
        config
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Kiểm tra quyền truy cập bảng api_keys bằng anon key
    const { data: anonKeysData, error: anonKeysError } = await supabase
      .from('api_keys')
      .select('id, provider, name, is_active, created_at')
      .limit(5);
    
    // Kiểm tra quyền truy cập với service role key
    let serviceRoleData = null;
    let serviceRoleError = null;
    
    if (serviceRoleKey) {
      const adminClient = createClient(supabaseUrl, serviceRoleKey);
      const result = await adminClient
        .from('api_keys')
        .select('id, provider, name, is_active, created_at')
        .limit(5);
      
      serviceRoleData = result.data;
      serviceRoleError = result.error;
    }
    
    // Thử lấy một API key cụ thể cho test
    const provider = 'deepseek';
    const { data: apiKey, error: apiKeyError } = await supabase
      .from('api_keys')
      .select('id, provider, name, is_active')
      .eq('provider', provider)
      .eq('is_active', true)
      .limit(1);
    
    return NextResponse.json({
      success: true,
      config,
      source: config.useDirectApiKeys ? 'environment' : 'database',
      anonKeyAccess: {
        success: !anonKeysError,
        count: anonKeysData?.length || 0,
        error: anonKeysError ? anonKeysError.message : null
      },
      serviceRoleAccess: {
        success: !serviceRoleError,
        count: serviceRoleData?.length || 0,
        error: serviceRoleError ? serviceRoleError.message : null
      },
      testProviderKey: {
        success: !apiKeyError && apiKey && apiKey.length > 0,
        provider,
        keyFound: apiKey && apiKey.length > 0,
        data: apiKey?.map(k => ({
          id: k.id,
          provider: k.provider,
          name: k.name,
          is_active: k.is_active
        }))
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      error: 'Lỗi không xác định',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 