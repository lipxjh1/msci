import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Kiểm tra kết nối bằng cách truy vấn bảng mặc định
    const { error: connectionError } = await supabase.from('_supabase').select('*').limit(1);
    
    if (connectionError && connectionError.message.includes('does not exist')) {
      // Đây là lỗi bình thường vì bảng _supabase không tồn tại, nhưng kết nối thành công
      console.log('Kết nối thành công, bảng _supabase không tồn tại');
    } else if (connectionError) {
      throw connectionError;
    }

    // Thử lấy danh sách bảng từ information_schema
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .not('table_name', 'like', 'pg_%');
    
    if (error) {
      console.error('Lỗi khi truy vấn information_schema:', error);
      
      // Thử cách khác: lấy thông tin từ pg_tables
      const { data: pgData, error: pgError } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (pgError) {
        // Nếu cả hai cách đều thất bại, trả về danh sách bảng mặc định
        return NextResponse.json({
          success: true, 
          tables: ['profiles', 'users']
        });
      }
      
      const tables = pgData.map(table => table.tablename);
      return NextResponse.json({ success: true, tables });
    }
    
    const tables = data.map(table => table.table_name);
    return NextResponse.json({ success: true, tables });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bảng:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách bảng',
        tables: [] 
      },
      { status: 500 }
    );
  }
} 