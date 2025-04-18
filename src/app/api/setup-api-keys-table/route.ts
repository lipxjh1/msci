import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang thiết lập bảng api_keys và api_key_config...');
    
    // SQL để tạo bảng api_keys và api_key_config
    const sqlScript = `
      -- Tạo bảng api_keys nếu chưa tồn tại
      CREATE TABLE IF NOT EXISTS api_keys (
        id SERIAL PRIMARY KEY,
        key TEXT NOT NULL,
        provider VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ,
        last_used_at TIMESTAMPTZ,
        usage_count INTEGER DEFAULT 0,
        usage_limit INTEGER,
        remaining_quota INTEGER,
        tags TEXT[],
        priority INTEGER DEFAULT 0
      );

      -- Tạo index
      CREATE INDEX IF NOT EXISTS idx_api_keys_provider ON api_keys(provider);
      CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);
      CREATE INDEX IF NOT EXISTS idx_api_keys_priority ON api_keys(priority);
      
      -- Tạo bảng cấu hình api_key
      CREATE TABLE IF NOT EXISTS api_key_config (
        id SERIAL PRIMARY KEY,
        selection_strategy VARCHAR(20) DEFAULT 'priority',
        fallback_enabled BOOLEAN DEFAULT true,
        max_tries_before_fallback INTEGER DEFAULT 3,
        usage_monitoring_enabled BOOLEAN DEFAULT true,
        auto_rotate_on_limit BOOLEAN DEFAULT true,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      -- Thêm cấu hình mặc định nếu chưa có
      INSERT INTO api_key_config (
        selection_strategy, 
        fallback_enabled, 
        max_tries_before_fallback, 
        usage_monitoring_enabled, 
        auto_rotate_on_limit
      )
      SELECT 'priority', true, 3, true, true
      WHERE NOT EXISTS (SELECT 1 FROM api_key_config);
      
      -- Thêm API key mặc định từ .env nếu chưa có API key nào
      INSERT INTO api_keys (
        key, 
        provider, 
        name, 
        description, 
        is_active, 
        created_at, 
        usage_count, 
        priority
      )
      SELECT 
        '${process.env.DEEPSEEK_API_KEY || ''}', 
        'deepseek', 
        'DeepSeek API Key mặc định', 
        'API key mặc định được cấu hình trong file .env', 
        true, 
        NOW(), 
        0, 
        10
      WHERE 
        '${process.env.DEEPSEEK_API_KEY || ''}' != '' 
        AND NOT EXISTS (SELECT 1 FROM api_keys);
        
      -- Đảm bảo RLS được bật
      ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
      ALTER TABLE api_key_config ENABLE ROW LEVEL SECURITY;
      
      -- Tạo policy (chỉ admin có thể truy cập)
      DROP POLICY IF EXISTS "Enable admin access for api_keys" ON api_keys;
      DROP POLICY IF EXISTS "Enable admin access for api_key_config" ON api_key_config;
      
      CREATE POLICY "Enable admin access for api_keys" ON api_keys
          USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
          
      CREATE POLICY "Enable admin access for api_key_config" ON api_key_config
          USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
    `;
    
    // Thực thi SQL
    console.log('Đang thực thi SQL...');
    const { error: sqlError } = await supabase.rpc('run_sql', { sql: sqlScript });
    
    if (sqlError) {
      console.error('Lỗi SQL:', sqlError);
      
      // Nếu không có quyền chạy SQL, trả về hướng dẫn
      if (sqlError.message.includes('permission') || sqlError.message.includes('function')) {
        return NextResponse.json({
          error: 'Không thể thực thi SQL qua API',
          details: sqlError,
          sql_to_run_manually: sqlScript,
          message: 'Vui lòng chạy đoạn SQL sau trong Supabase SQL Editor'
        }, { status: 400 });
      }
      
      return NextResponse.json({
        error: 'Lỗi khi thực thi SQL',
        details: sqlError
      }, { status: 500 });
    }
    
    // Kiểm tra kết quả
    console.log('Kiểm tra bảng sau khi tạo...');
    const { data: apiKeysData, error: apiKeysError } = await supabase
      .from('api_keys')
      .select('id')
      .limit(1);
      
    const { data: configData, error: configError } = await supabase
      .from('api_key_config')
      .select('id')
      .limit(1);
      
    if (apiKeysError || configError) {
      return NextResponse.json({
        error: 'Đã tạo bảng nhưng không thể truy vấn',
        details: {
          apiKeysError,
          configError
        }
      }, { status: 500 });
    }
    
    // Trả về thành công
    return NextResponse.json({
      success: true,
      message: 'Đã thiết lập thành công bảng api_keys và api_key_config',
      apiKeysRecords: apiKeysData?.length || 0,
      configRecords: configData?.length || 0,
      sql_executed: sqlScript
    });
    
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi thiết lập bảng',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 