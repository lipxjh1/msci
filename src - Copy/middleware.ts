import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Chuyển hướng từ /tin-tuc sang /new (thay vì /news)
  if (req.nextUrl.pathname === '/tin-tuc') {
    return NextResponse.redirect(new URL('/new', req.url));
  }

  // Bỏ qua trang setup
  if (req.nextUrl.pathname === '/admin/setup') {
    return res;
  }

  // Kiểm tra session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Nếu đang ở trang login và đã có session, chuyển hướng về trang admin
  if (req.nextUrl.pathname === '/admin/login') {
    if (session) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return res;
  }

  // Nếu không có session và không phải trang login, chuyển hướng đến trang login
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Nếu có session, kiểm tra xem có phải là admin không
  if (session && req.nextUrl.pathname.startsWith('/admin')) {
    const { data: adminData } = await supabase
      .from('nguoi_dung')
      .select('vai_tro')
      .eq('id', session.user.id)
      .single();

    if (!adminData || !['super_admin', 'admin_con'].includes(adminData.vai_tro)) {
      // Nếu không phải admin, đăng xuất và chuyển hướng về trang login
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/tin-tuc'],
}; 