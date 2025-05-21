import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Đường dẫn đến file TXT
const filePath = path.join(process.cwd(), 'public/data/social_links.txt');

// Khởi tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Hàm đọc file
async function readSocialLinksFile() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    // Nếu file không tồn tại, tạo file mới với dữ liệu mặc định
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      const defaultData = `Facebook=https://facebook.com/mypage
Twitter=https://twitter.com/myhandle
Instagram=https://instagram.com/myprofile
LinkedIn=https://linkedin.com/in/myprofile
YouTube=https://youtube.com/c/mychannel
Discord=https://discord.gg/mycommunity
Telegram=https://t.me/MSCIChannel`;
      await fs.writeFile(filePath, defaultData, 'utf8');
      return defaultData;
    }
    throw error;
  }
}

// Hàm phân tích dữ liệu từ file TXT thành object
export function parseSocialLinksData(data: string) {
  const links: Record<string, string> = {};
  const lines = data.split('\n');
  
  lines.forEach(line => {
    const [name, url] = line.split('=');
    if (name && url) {
      links[name.trim()] = url.trim();
    }
  });
  
  return links;
}

// API endpoint để đọc dữ liệu
export async function GET() {
  try {
    const data = await readSocialLinksFile();
    const links = parseSocialLinksData(data);
    
    return NextResponse.json({ links, raw: data }, { status: 200 });
  } catch (error) {
    console.error('Error reading social links file:', error);
    return NextResponse.json(
      { error: 'Failed to read social links data' }, 
      { status: 500 }
    );
  }
}

// API endpoint để cập nhật dữ liệu
export async function POST(request: NextRequest) {
  try {
    // Xác thực quyền admin
    const { cookies } = request;
    const supabaseCookie = cookies.get('sb-access-token')?.value;
    
    if (!supabaseCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Kiểm tra session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Kiểm tra nếu người dùng là admin
    const { data: adminData } = await supabase
      .from('nguoi_dung')
      .select('vai_tro')
      .eq('id', user.id)
      .single();
      
    if (!adminData || !['super_admin', 'admin_con'].includes(adminData.vai_tro)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Lấy dữ liệu từ request
    const { data } = await request.json();
    
    if (!data || typeof data !== 'string') {
      return NextResponse.json(
        { error: 'Invalid data format' }, 
        { status: 400 }
      );
    }

    // Lưu file backup trước khi ghi đè
    try {
      const originalData = await fs.readFile(filePath, 'utf8');
      const backupPath = path.join(process.cwd(), 'public/data/social_links_backup.txt');
      await fs.writeFile(backupPath, originalData, 'utf8');
    } catch (error) {
      // Bỏ qua nếu không thể tạo file backup
      console.warn('Could not create backup file:', error);
    }

    // Ghi dữ liệu mới vào file
    await fs.writeFile(filePath, data, 'utf8');
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error updating social links file:', error);
    return NextResponse.json(
      { error: 'Failed to update social links data' }, 
      { status: 500 }
    );
  }
} 