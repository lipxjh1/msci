import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Lấy thông tin từ biến môi trường
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    // Kiểm tra các biến môi trường
    const envCheck = {
      supabaseUrl: !!supabaseUrl,
      supabaseAnonKey: !!supabaseAnonKey,
      deepseekApiKey: !!deepseekApiKey,
      serviceRoleKey: !!serviceRoleKey,
      useDirectApiKeys: process.env.NEXT_PUBLIC_USE_DIRECT_API_KEYS
    };
    
    // Tạo Supabase client với anon key
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        error: 'Thiếu biến môi trường Supabase',
        envCheck
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Kiểm tra kết nối Supabase với anon key
    const { data: testData, error: testError } = await supabase
      .from('api_keys')
      .select('count')
      .limit(1);
    
    // Tạo Supabase client với service role key nếu có 
    let adminData = null;
    let adminError = null;
    
    if (serviceRoleKey) {
      const adminClient = createClient(supabaseUrl, serviceRoleKey);
      const result = await adminClient
        .from('api_keys')
        .select('count')
        .limit(1);
      
      adminData = result.data;
      adminError = result.error;
    }
    
    // Trả về thông tin
    return NextResponse.json({
      success: true,
      environment: envCheck,
      anonKeyTest: {
        success: !testError,
        error: testError ? testError.message : null,
        data: testData
      },
      serviceRoleTest: {
        success: !adminError,
        error: adminError ? adminError.message : null,
        data: adminData
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      error: 'Lỗi không xác định',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 