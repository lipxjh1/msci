This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# M-SCI Game Website

## Form Ứng Tuyển Tích Hợp Supabase và Telegram

### Thiết lập Supabase

1. Đăng ký tài khoản tại [Supabase](https://supabase.com) nếu bạn chưa có
2. Tạo project mới trong Supabase
3. Sao chép URL và API keys từ trang Settings > API trong Supabase
4. Tạo bảng applications trong SQL Editor của Supabase với đoạn code sau:

```sql
-- Tạo extension để hỗ trợ UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tạo bảng applications để lưu thông tin ứng viên
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  position TEXT,
  cv_url TEXT,
  telegram_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bật Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép insert dữ liệu từ bất kỳ client nào
CREATE POLICY "Allow insert for anyone" 
  ON applications FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Policy chỉ cho admin xem dữ liệu
CREATE POLICY "Allow select for authenticated users" 
  ON applications FOR SELECT 
  TO authenticated
  USING (true);
```

### Thiết lập Telegram Bot

1. Tạo bot mới thông qua [BotFather](https://t.me/botfather) trên Telegram
2. Lấy token của bot
3. Thêm bot vào nhóm chat hoặc chat riêng mà bạn muốn nhận thông báo

### Thiết lập .env.local

Tạo file `.env.local` trong thư mục gốc của dự án với nội dung:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key

# Telegram
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
```

### Lưu ý

- `SUPABASE_SERVICE_KEY` là Service Role key, nên được giữ bí mật và chỉ sử dụng ở phía server
- Thông tin ứng viên sẽ được lưu vào Supabase và gửi thông báo tới Telegram
- Trang `/careers` đã tích hợp form popup để người dùng có thể ứng tuyển

### Cấu trúc API

- `POST /api/submit-application` - Endpoint để xử lý form ứng tuyển, lưu vào Supabase và gửi thông báo đến Telegram
"# msci" 
