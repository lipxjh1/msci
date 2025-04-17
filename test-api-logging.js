const { createClient } = require('@supabase/supabase-js');

// Thay thế bằng URL và API Key của bạn
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Chưa cài đặt NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Hàm để tạo dữ liệu mẫu
async function createSampleApiUsageData() {
  const now = new Date();
  
  // Tạo vài bản ghi mẫu cho các ngày gần đây
  const testData = [];
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Tạo 1-3 bản ghi cho mỗi ngày
    const records = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < records; j++) {
      const tokens = Math.floor(Math.random() * 500) + 100;
      const isSuccess = Math.random() > 0.2; // 80% thành công
      
      testData.push({
        timestamp: date.toISOString(),
        tokens_used: tokens,
        request_type: 'chat_completion',
        status: isSuccess ? 'success' : 'error',
        error: isSuccess ? null : 'DeepSeek API error: rate limited',
        cost: tokens * 0.000001,
        message_content: `Test message ${i}-${j}: Lorem ipsum dolor sit amet`
      });
    }
  }
  
  console.log(`Đang tạo ${testData.length} bản ghi mẫu...`);
  
  // Thêm vào Supabase
  const { data, error } = await supabase
    .from('api_usage_logs')
    .insert(testData);
    
  if (error) {
    console.error('Lỗi khi thêm dữ liệu mẫu:', error);
  } else {
    console.log('Đã thêm dữ liệu mẫu thành công!');
  }
}

// Hàm để kiểm tra kết nối và bảng
async function checkApiLogsTable() {
  try {
    console.log('Kiểm tra bảng api_usage_logs...');
    
    const { count, error } = await supabase
      .from('api_usage_logs')
      .select('*', { count: 'exact', head: true });
      
    if (error) {
      console.error('Lỗi khi kiểm tra bảng:', error);
      return false;
    }
    
    console.log(`Bảng tồn tại và có ${count} bản ghi`);
    return true;
  } catch (err) {
    console.error('Lỗi khi kiểm tra bảng:', err);
    return false;
  }
}

// Chạy kiểm tra
(async () => {
  console.log('Bắt đầu kiểm tra API logging...');
  
  const tableExists = await checkApiLogsTable();
  
  if (!tableExists) {
    console.log('Bảng api_usage_logs không tồn tại hoặc không thể truy cập');
    return;
  }
  
  const shouldCreateSampleData = process.argv.includes('--create-samples');
  
  if (shouldCreateSampleData) {
    await createSampleApiUsageData();
  }
  
  console.log('Kiểm tra hoàn tất');
})(); 