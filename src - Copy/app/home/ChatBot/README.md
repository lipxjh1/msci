# Chatbot Akane - Chiến Binh M-SCI

Chatbot này được tạo cho trang web clone Overwatch, với vai trò là Akane - một chiến binh M-SCI 20 tuổi, vui vẻ và thích công nghệ.

## Tính năng

1. **Chatbox hiển thị trên trang chủ**
   - Nút chat ở góc phải dưới màn hình
   - Giao diện đẹp mắt, phù hợp với theme của trang
   - Responsive trên cả desktop và mobile

2. **Kết nối API DeepSeek**
   - Sử dụng DeepSeek API để tạo câu trả lời thông minh
   - Vai trò đã được định nghĩa sẵn là Akane

3. **Database Supabase**
   - Lưu trữ câu hỏi và câu trả lời thường gặp
   - Tìm kiếm nhanh từ database trước khi gọi API

4. **Trang quản lý admin**
   - Quản lý các câu hỏi và câu trả lời
   - Thêm, sửa, xóa nội dung chatbot

## Cách sử dụng

### Người dùng
1. Truy cập trang chủ
2. Nhấn vào nút chat ở góc phải dưới màn hình
3. Nhập câu hỏi và nhận câu trả lời từ Akane

### Admin
1. Truy cập đường dẫn `/admin/chat-qa`
2. Đăng nhập với tài khoản admin
3. Quản lý các câu hỏi và câu trả lời:
   - Thêm mới: Nhấn nút "Thêm mới" và điền form
   - Chỉnh sửa: Nhấn nút edit bên cạnh mục cần sửa
   - Xóa: Nhấn nút xóa bên cạnh mục cần xóa

## Cài đặt và Cấu hình

### 1. Tạo bảng Supabase

Truy cập API endpoint để tạo bảng tự động:
```
/api/supabase/create-chat-qa-table
```

Hoặc sử dụng SQL Editor trong Supabase Dashboard:
```sql
CREATE TABLE IF NOT EXISTS public.chat_qa (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tạo chỉ mục tìm kiếm Full-text để tối ưu hóa tìm kiếm câu hỏi
CREATE INDEX IF NOT EXISTS chat_qa_question_idx ON public.chat_qa USING gin (to_tsvector('vietnamese', question));

-- Enable RLS (Row Level Security)
ALTER TABLE public.chat_qa ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép tất cả người dùng đọc
CREATE POLICY "Allow public read access" ON public.chat_qa
  FOR SELECT USING (true);
  
-- Tạo policy chỉ cho phép authenticated users thêm, sửa, xóa
CREATE POLICY "Allow authenticated users to insert" ON public.chat_qa
  FOR INSERT TO authenticated USING (true);
  
CREATE POLICY "Allow authenticated users to update" ON public.chat_qa
  FOR UPDATE TO authenticated USING (true);
  
CREATE POLICY "Allow authenticated users to delete" ON public.chat_qa
  FOR DELETE TO authenticated USING (true);
```

### 2. Cấu hình biến môi trường

Đảm bảo các biến môi trường sau được cấu hình trong file `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 3. Thay đổi API key DeepSeek

API key DeepSeek được cấu hình trong file `src/app/api/chat/route.ts`:

```typescript
const DEEPSEEK_API_KEY = 'sk-2bfbb38e4faa4fa5b6eb4ae624b3a6d3';
```

### 4. Thay đổi avatar Akane

Thêm hình ảnh avatar vào folder `/public/images/akane-avatar.jpg` hoặc thay đổi đường dẫn trong file `src/app/home/ChatBot/ChatBox.tsx`.

## Tùy chỉnh

### Thay đổi vai trò của bot

Chỉnh sửa system prompt trong file `src/app/api/chat/route.ts`:

```typescript
const systemPrompt = `Bạn là Akane, một chiến binh M-SCI 20 tuổi. Bạn vui vẻ, thích công nghệ...`;
```

### Thay đổi giao diện

Chỉnh sửa CSS trong file `src/app/home/ChatBot/ChatBox.tsx` để tùy chỉnh giao diện chatbot.

## Gỡ lỗi

- **Lỗi kết nối Supabase**: Kiểm tra các biến môi trường trong `.env.local`
- **Lỗi API DeepSeek**: Kiểm tra API key và cấu hình trong `src/app/api/chat/route.ts`
- **Lỗi database**: Kiểm tra bảng `chat_qa` trong Supabase Dashboard 