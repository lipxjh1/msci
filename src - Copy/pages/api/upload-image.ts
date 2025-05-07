import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

// Vô hiệu hóa bodyParser mặc định của Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Khởi tạo Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse form data
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    if (!files.file || !Array.isArray(files.file) || files.file.length === 0) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const file = files.file[0];
    const bucket = Array.isArray(fields.bucket) ? fields.bucket[0] : 'game-assets';
    const filePath = Array.isArray(fields.filePath) ? fields.filePath[0] : `${Date.now()}-${file.originalFilename}`;

    // Đọc file từ đường dẫn tạm thời
    const fileBuffer = fs.readFileSync(file.filepath);

    // Upload lên Supabase Storage sử dụng service role key
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileBuffer, {
        contentType: file.mimetype || 'application/octet-stream',
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Lỗi upload từ API:', error);
      return res.status(500).json({ error: error.message });
    }

    // Lấy URL công khai
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return res.status(200).json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Lỗi server:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 