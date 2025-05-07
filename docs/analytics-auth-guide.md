# Hướng dẫn Theo dõi Đăng nhập & Đăng xuất Người dùng

## Tổng quan

Hệ thống theo dõi đăng nhập và đăng xuất là một phần quan trọng của phân tích người dùng, cho phép quản trị viên theo dõi:

- Thời điểm người dùng đăng nhập/đăng xuất
- Tổng số phiên đăng nhập
- Thời gian trung bình mỗi phiên
- Số người dùng đang hoạt động
- Phương thức đăng nhập phổ biến
- Lý do đăng xuất

## Cấu trúc Dữ liệu

Hệ thống sử dụng các bảng sau trong Supabase:

1. **auth_sessions**: Lưu trữ thông tin về các phiên đăng nhập/đăng xuất
2. **user_analytics**: Lưu trữ các sự kiện đăng nhập/đăng xuất (event_type = 'user_login' hoặc 'user_logout')
3. **nguoi_dung**: Được mở rộng với các trường theo dõi đăng nhập (last_login_at, login_count, v.v.)

## Thiết lập

### 1. Cập nhật Cơ sở dữ liệu

Chạy script SQL trong file `public/code/user-analytics-schema.sql` để tạo/cập nhật bảng `auth_sessions` và thêm các trường vào bảng `nguoi_dung`.

### 2. Tích hợp Theo dõi trong Ứng dụng

#### Sử dụng các Hàm Trợ giúp

Để dễ dàng tích hợp, sử dụng các hàm trợ giúp từ module `AuthenticationTracking.js`:

```javascript
import { 
  trackUserLogin, 
  trackUserSignup, 
  trackUserLogout, 
  setupAuthTracking 
} from '@/components/analytics/AuthenticationTracking';
```

#### Thiết lập Theo dõi Tự động

Trong file `_app.js` hoặc component cấp cao, thêm theo dõi tự động:

```javascript
// _app.js hoặc Layout.js
import { setupAuthTracking } from '@/components/analytics/AuthenticationTracking';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Thiết lập theo dõi tự động đăng nhập/đăng xuất
    const cleanup = setupAuthTracking();
    
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);
  
  return <Component {...pageProps} />;
}
```

#### Theo dõi Đăng nhập Thủ công

Trong các hàm xử lý đăng nhập tùy chỉnh:

```javascript
import { trackUserLogin } from '@/components/analytics/AuthenticationTracking';

async function handleCustomLogin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (data?.user) {
    // Theo dõi sự kiện đăng nhập
    await trackUserLogin(data.user, 'email');
  }
  
  return { data, error };
}
```

#### Theo dõi Đăng ký Người dùng

Khi người dùng đăng ký tài khoản mới:

```javascript
import { trackUserSignup } from '@/components/analytics/AuthenticationTracking';

async function handleSignup(email, password, metadata = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { 
      data: metadata 
    }
  });
  
  if (data?.user) {
    // Theo dõi sự kiện đăng ký
    trackUserSignup(data.user, 'email', metadata.referrer);
  }
  
  return { data, error };
}
```

#### Theo dõi Đăng xuất Thủ công

Khi người dùng đăng xuất thủ công:

```javascript
import { trackUserLogout } from '@/components/analytics/AuthenticationTracking';

async function handleLogout() {
  // Lấy thông tin về phiên làm việc
  const loginTime = localStorage.getItem('login_time');
  const pagesVisited = parseInt(localStorage.getItem('pages_visited') || '0', 10);
  
  // Theo dõi sự kiện đăng xuất
  trackUserLogout('manual', { loginTime, pagesVisited });
  
  // Đăng xuất khỏi Supabase
  await supabase.auth.signOut();
}
```

## Trang Quản trị

Truy cập trang phân tích đăng nhập/đăng xuất tại:

- `/admin/analytics/authentication` - Thống kê toàn diện về đăng nhập/đăng xuất

### Dữ liệu Hiển thị

1. **Tổng quan**
   - Tổng lượt đăng nhập trong khoảng thời gian
   - Số người dùng duy nhất đã đăng nhập
   - Thời gian trung bình mỗi phiên
   - Số người dùng đang hoạt động

2. **Biểu đồ Đăng nhập**
   - Đăng nhập theo thời gian (xem xu hướng)
   - Phân phối phương thức đăng nhập
   - Lý do đăng xuất

3. **Danh sách**
   - Người dùng đang hoạt động
   - Lịch sử đăng nhập gần đây

## API Truy vấn

### Lấy Thống kê Đăng nhập theo Ngày

```javascript
// Lấy thống kê đăng nhập trong 30 ngày
const startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
const endDate = format(new Date(), 'yyyy-MM-dd');

const { data, error } = await supabase.rpc('get_login_stats', { 
  start_date: startDate, 
  end_date: endDate 
});
```

### Lấy Người dùng Đang Hoạt động

```javascript
// Lấy danh sách người dùng đang online
const { data, error } = await supabase
  .from('auth_sessions')
  .select('user_id, login_time')
  .is('logout_time', null)
  .order('login_time', { ascending: false });
```

### Lấy Phiên Đăng nhập của Người dùng

```javascript
// Lấy lịch sử đăng nhập của người dùng cụ thể
const { data, error } = await supabase
  .from('auth_sessions')
  .select('*')
  .eq('user_id', userId)
  .order('login_time', { ascending: false })
  .limit(10);
```

## Xử lý Các Trường hợp Đặc biệt

### Đăng xuất Tự động

Để theo dõi đăng xuất khi phiên hết hạn hoặc tab trình duyệt đóng:

```javascript
// Thêm vào _app.js
useEffect(() => {
  const handleBeforeUnload = () => {
    const user = supabase.auth.getUser();
    if (user) {
      trackUserLogout('browser_closed', {
        loginTime: localStorage.getItem('login_time'),
        pagesVisited: localStorage.getItem('pages_visited')
      });
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);
```

### Đánh dấu Phiên Đăng nhập Hết hạn

Tạo một Cloud Function trong Supabase để kiểm tra và đánh dấu các phiên đã hết hạn:

```javascript
// Supabase Edge Function
export async function expireSessions() {
  const { data, error } = await supabase
    .from('auth_sessions')
    .update({ 
      logout_time: new Date().toISOString(),
      duration_seconds: 3600, // Hoặc tính toán từ login_time
    })
    .is('logout_time', null)
    .lt('login_time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    
  return { data, error };
}
```

## Bảo mật và Quyền Riêng tư

- Chỉ lưu trữ thông tin cần thiết, không lưu dữ liệu nhạy cảm
- Các chính sách RLS đảm bảo người dùng chỉ có thể xem phiên của chính họ
- Chỉ admin mới có thể xem tổng thể dữ liệu đăng nhập/đăng xuất 