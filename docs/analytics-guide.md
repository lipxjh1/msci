# Hướng dẫn sử dụng Hệ thống Phân tích Người dùng

## Tổng quan

Hệ thống phân tích người dùng là một công cụ toàn diện để theo dõi và phân tích hành vi người dùng trên trang web của bạn. Hệ thống này cho phép bạn:

- Theo dõi lượt truy cập vào web
- Theo dõi số người nhấn vào nút "Play Now"
- Theo dõi số người truy cập vào các trang con
- Theo dõi số người nhấn vào các nút mạng xã hội
- Xem thống kê theo ngày, tuần, tháng
- Lưu trữ dữ liệu trong Supabase

## Cấu trúc Dữ liệu

Hệ thống sử dụng hai bảng chính trong Supabase:

1. **user_analytics**: Lưu trữ thông tin về các sự kiện người dùng (xem trang, nhấn nút, v.v.)
2. **social_analytics**: Lưu trữ thông tin về tương tác mạng xã hội

## Thiết lập

### 1. Thiết lập Cơ sở dữ liệu

Chạy script SQL trong file `public/code/user-analytics-schema.sql` trong SQL Editor của Supabase để tạo các bảng và chức năng cần thiết.

### 2. Cài đặt các Thư viện cần thiết

Đảm bảo bạn đã cài đặt các thư viện sau:

```bash
npm install @supabase/supabase-js uuid date-fns chart.js react-chartjs-2
```

### 3. Cấu hình Supabase

Đảm bảo thông tin kết nối Supabase đã được thiết lập trong `src/lib/supabase-client.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

## Sử dụng trong Ứng dụng

### Theo dõi Tự động

Để kích hoạt theo dõi cơ bản trong trang web của bạn, thêm hook `useAnalytics` vào component cấp cao nhất:

```javascript
// _app.js hoặc Layout.js
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Layout({ children }) {
  // Khởi tạo analytics (theo dõi tự động page views)
  useAnalytics();
  
  return (
    <div>
      {/* ... */}
      {children}
    </div>
  );
}
```

### Theo dõi Nút và Tương tác

Để theo dõi nhấp chuột vào nút và tương tác khác, hãy sử dụng hook `useAnalytics` trong component:

```javascript
import { useAnalytics } from '@/hooks/useAnalytics';

export default function PlayButton() {
  const { trackPlayNowClick } = useAnalytics();
  
  return (
    <button 
      onClick={() => trackPlayNowClick({ source: 'homepage' })}
      className="play-button"
    >
      Chơi Ngay
    </button>
  );
}
```

### Theo dõi Tương tác Mạng Xã hội

```javascript
import { useAnalytics } from '@/hooks/useAnalytics';

export default function SocialButtons() {
  const { trackSocialClick } = useAnalytics();
  
  return (
    <div className="social-buttons">
      <button onClick={() => trackSocialClick('facebook', 'share')}>
        Chia sẻ Facebook
      </button>
      <button onClick={() => trackSocialClick('twitter', 'follow')}>
        Theo dõi Twitter
      </button>
      {/* ... */}
    </div>
  );
}
```

## Bảng Điều khiển Quản trị

Truy cập bảng điều khiển phân tích tại:

- `/admin/analytics` - Tổng quan chung
- `/admin/analytics/social` - Phân tích mạng xã hội
- `/admin/analytics/pages` - Phân tích trang và tương tác nút

### Tính năng Bảng Điều khiển

- Xem số liệu theo khoảng thời gian khác nhau (24 giờ, 7 ngày, 30 ngày)
- Biểu đồ trực quan về lượt truy cập trang và tương tác người dùng
- Phân tích chi tiết về tương tác mạng xã hội
- Xem các trang được truy cập nhiều nhất
- Xem các nút được nhấp nhiều nhất

## API Phân tích cho Phát triển

### Theo dõi Sự kiện Tùy chỉnh

```javascript
import { trackEvent } from '@/lib/analytics-service';

// Theo dõi sự kiện tùy chỉnh với metadata
trackEvent('custom_event_name', {
  property1: 'value1',
  property2: 'value2'
});
```

### Lấy Dữ liệu Phân tích

```javascript
import { getDailyStats, getUserActions, getSocialStats } from '@/lib/analytics-service';

// Lấy thống kê người dùng theo ngày trong khoảng thời gian
const stats = await getDailyStats('2023-01-01', '2023-01-31');

// Lấy thống kê hành động người dùng
const actions = await getUserActions('2023-01-01', '2023-01-31');

// Lấy thống kê mạng xã hội
const socialStats = await getSocialStats('2023-01-01', '2023-01-31');
```

## Bảo mật và Quyền Riêng tư

- Không lưu trữ thông tin nhận dạng cá nhân trừ khi người dùng đã đăng nhập
- Sử dụng session ID ẩn danh cho người dùng không đăng nhập
- Các biện pháp giới hạn dữ liệu cách đây 90 ngày theo hướng dẫn GDPR
- Chỉ admin mới có thể xem dữ liệu phân tích (thông qua chính sách RLS của Supabase)

## Khắc phục Sự cố

### Vấn đề Phổ biến

1. **Dữ liệu không ghi được**
   - Kiểm tra cấu hình Supabase trong tệp `.env.local`
   - Đảm bảo các bảng và chính sách đã được tạo chính xác

2. **Biểu đồ không hiển thị**
   - Đảm bảo Chart.js đã được cài đặt đúng cách
   - Kiểm tra các lỗi JavaScript trong console trình duyệt

3. **Dữ liệu không được lọc theo ngày**
   - Đảm bảo các hàm trong SQL đã được tạo đúng cách

## Tùy chỉnh và Mở rộng

### Thêm Sự kiện Mới

1. Xác định loại sự kiện trong file `analytics-service.js`
2. Thêm phương thức trợ giúp vào hook `useAnalytics.js`
3. Triển khai gọi sự kiện trong các component UI 