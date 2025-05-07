/* Hàm xử lý tài khoản admin */

import { supabase } from "@/tien_ich/supabase";
import { NguoiDung } from '@/loai/nguoi_dung';
import { User } from '@supabase/supabase-js';

// Danh sách email tồn tại trong Supabase Auth
export const whitelistedEmails = ['vinh@gmail.com', 'super@msci.com', 'admincon@gmail.com'];

/**
 * Lấy danh sách admin
 */
export async function layDanhSachAdmin(): Promise<NguoiDung[]> {
  const { data, error } = await supabase
    .from('nguoi_dung')
    .select('*')
    .in('vai_tro', ['super_admin', 'admin_con'])
    .order('ngay_tao', { ascending: false });

  if (error) {
    console.error('Lỗi khi lấy danh sách admin:', error);
    throw new Error('Không thể lấy danh sách admin');
  }

  return data as NguoiDung[];
}

/**
 * Tạo admin con (chỉ super_admin có quyền)
 */
export async function taoAdminCon(email: string, ten: string, password: string = "Admin@123"): Promise<User> {
  try {
    // Tạo tài khoản trong Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/login`
      }
    });

    if (error) throw error;

    if (!data.user) {
      throw new Error('Không thể tạo tài khoản người dùng');
    }

    // Tạo thông tin admin trong bảng nguoi_dung
    const { error: insertError } = await supabase.from('nguoi_dung').insert({
      id: data.user.id,
      email: email,
      ten: ten,
      vai_tro: 'admin_con',
      ngay_tao: new Date().toISOString(),
      da_kich_hoat: false
    });

    if (insertError) {
      // Nếu lỗi khi thêm vào bảng nguoi_dung, xóa tài khoản đã tạo
      await supabase.auth.admin.deleteUser(data.user.id);
      throw insertError;
    }

    // Gửi thông báo thành công
    alert(`Đã tạo admin con thành công!
    
Email: ${email}
Mật khẩu: ${password}

Lưu ý:
- Tài khoản cần được xác nhận email trước khi đăng nhập
- Super Admin có thể kích hoạt tài khoản từ giao diện quản lý để cho phép đăng nhập ngay lập tức`);

    return data.user;
  } catch (error) {
    console.error('Lỗi khi tạo admin con:', error);
    throw error;
  }
}

/**
 * Xóa admin con (chỉ super_admin có quyền)
 */
export async function xoaAdminCon(adminId: string) {
  try {
    if (!adminId) {
      throw new Error('ID admin không hợp lệ');
    }

    // 1. Kiểm tra xem admin cần xóa có tồn tại không
    const { data: adminData, error: checkError } = await supabase
      .from('nguoi_dung')
      .select('vai_tro, email, ten')
      .eq('id', adminId)
      .maybeSingle();
      
    if (checkError) {
      console.error('Lỗi khi kiểm tra admin:', checkError);
      throw new Error(`Không thể kiểm tra thông tin admin: ${checkError.message}`);
    }
    
    if (!adminData) {
      throw new Error(`Không tìm thấy admin với ID: ${adminId}`);
    }
    
    if (adminData.vai_tro === 'super_admin') {
      throw new Error('Không thể xóa tài khoản Super Admin');
    }
    
    // 1.5 Kiểm tra xem admin có bài viết không
    const { data: baiVietData, error: baiVietError } = await supabase
      .from('bai_viet')
      .select('id')
      .eq('nguoi_dung_id', adminId);
    
    if (baiVietError) {
      console.error('Lỗi khi kiểm tra bài viết:', baiVietError);
      throw new Error(`Không thể kiểm tra bài viết của admin: ${baiVietError.message}`);
    }
    
    // 1.6 Nếu có bài viết, xóa các bài viết trước
    if (baiVietData && baiVietData.length > 0) {
      console.log(`Admin có ${baiVietData.length} bài viết, đang xóa...`);
      
      const { error: deleteBaiVietError } = await supabase
        .from('bai_viet')
        .delete()
        .eq('nguoi_dung_id', adminId);
      
      if (deleteBaiVietError) {
        console.error('Lỗi khi xóa bài viết:', deleteBaiVietError);
        throw new Error(`Không thể xóa bài viết của admin: ${deleteBaiVietError.message}`);
      }
      
      console.log(`Đã xóa ${baiVietData.length} bài viết của admin`);
    }
    
    // 2. Kiểm tra các bảng khác có ràng buộc khóa ngoại
    // 2.1 Kiểm tra bảng doi_hinh
    const { data: doiHinhData, error: doiHinhError } = await supabase
      .from('doi_hinh')
      .select('id')
      .eq('nguoi_dung_id', adminId);
    
    if (doiHinhError) {
      console.error('Lỗi khi kiểm tra đội hình:', doiHinhError);
    } else if (doiHinhData && doiHinhData.length > 0) {
      console.log(`Admin có ${doiHinhData.length} đội hình, đang xóa...`);
      
      for (const doiHinh of doiHinhData) {
        // Xóa chi tiết đội hình trước
        const { error: deleteChiTietError } = await supabase
          .from('doi_hinh_chi_tiet')
          .delete()
          .eq('doi_hinh_id', doiHinh.id);
          
        if (deleteChiTietError) {
          console.error(`Lỗi khi xóa chi tiết đội hình ${doiHinh.id}:`, deleteChiTietError);
        }
      }
      
      // Sau đó xóa các đội hình
      const { error: deleteDoiHinhError } = await supabase
        .from('doi_hinh')
        .delete()
        .eq('nguoi_dung_id', adminId);
      
      if (deleteDoiHinhError) {
        console.error('Lỗi khi xóa đội hình:', deleteDoiHinhError);
        throw new Error(`Không thể xóa đội hình của admin: ${deleteDoiHinhError.message}`);
      }
      
      console.log(`Đã xóa ${doiHinhData.length} đội hình của admin`);
    }
    
    // 3. Xóa record trong bảng nguoi_dung
    const { error: deleteError } = await supabase
      .from('nguoi_dung')
      .delete()
      .eq('id', adminId);
      
    if (deleteError) {
      console.error('Lỗi khi xóa admin từ bảng nguoi_dung:', deleteError);
      throw new Error(`Lỗi khi xóa admin từ bảng nguoi_dung: ${deleteError.message || 'Lỗi không xác định'}`);
    }
    
    console.log(`Đã xóa admin '${adminData.email}' (${adminData.ten}) từ bảng nguoi_dung`);
    
    return {
      success: true,
      message: `Đã xóa admin ${adminData.email} khỏi bảng nguoi_dung.`,
      adminData
    };
  } catch (error) {
    console.error('Lỗi xóa admin con:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Lỗi không xác định khi xóa admin: ${JSON.stringify(error)}`);
    }
  }
}

/**
 * Kiểm tra quyền super_admin
 */
export async function kiemTraQuyenSuperAdmin(userId: string) {
  const { data, error } = await supabase
    .from('nguoi_dung')
    .select('vai_tro')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data.vai_tro === 'super_admin';
}

/**
 * Kiểm tra và đảm bảo bảng nguoi_dung có cột da_kich_hoat
 * Cần chạy khi khởi động ứng dụng
 */
export async function khoiTaoCotDaKichHoat() {
  try {
    console.log("Kiểm tra cột da_kich_hoat trong bảng nguoi_dung...");
    
    // Thực hiện truy vấn để kiểm tra cột da_kich_hoat có tồn tại không
    const { error: checkError } = await supabase
      .from('nguoi_dung')
      .select('da_kich_hoat')
      .limit(1);
    
    // Nếu không có lỗi, cột đã tồn tại
    if (!checkError) {
      console.log("Cột da_kich_hoat đã tồn tại trong bảng");
      return true;
    }
    
    // Nếu có lỗi và là lỗi column không tồn tại
    if (checkError && checkError.message.includes("column") && checkError.message.includes("da_kich_hoat")) {
      console.log("Cột da_kich_hoat chưa tồn tại. Đang thêm...");
      
      // Thêm cột bằng cách cập nhật với trường mới
      // Lấy một admin bất kỳ
      const { data: adminData, error: adminError } = await supabase
        .from('nguoi_dung')
        .select('id, vai_tro')
        .limit(1)
        .single();
      
      if (adminError) {
        console.error("Không thể lấy admin để cập nhật:", adminError);
      } else {
        console.log("Thêm cột bằng cách cập nhật với trường mới...");
        
        // Cập nhật với trường mới
        const { error: updateError } = await supabase
          .from('nguoi_dung')
          .update({ da_kich_hoat: adminData.vai_tro === 'super_admin' })
          .eq('id', adminData.id);
        
        if (updateError) {
          console.error("Không thể cập nhật để thêm cột:", updateError);
        } else {
          console.log("Đã thêm cột da_kich_hoat thành công qua phương pháp cập nhật");
          
          // Cập nhật giá trị mặc định cho tất cả các admin
          await _capNhatDaKichHoatMacDinh();
          
          return true;
        }
      }
      
      // Hiển thị hướng dẫn tạo cột thủ công nếu các phương pháp tự động thất bại
      alert(`
Cần thêm cột 'da_kich_hoat' vào bảng nguoi_dung để hệ thống hoạt động đúng.

Vui lòng thực hiện các bước sau trong Supabase:
1. Mở Supabase Dashboard
2. Vào phần Table Editor
3. Chọn bảng nguoi_dung
4. Thêm cột mới:
   - Tên: da_kich_hoat
   - Kiểu: boolean
   - Giá trị mặc định: false
      `);
      
      return false;
    }
    
    console.error("Lỗi không xác định khi kiểm tra cột:", checkError);
    return false;
  } catch (error) {
    console.error("Lỗi khi kiểm tra/thêm cột da_kich_hoat:", error);
    return false;
  }
}

/**
 * Cập nhật giá trị mặc định cho cột da_kich_hoat
 * Super admin = true, admin con = false
 */
async function _capNhatDaKichHoatMacDinh() {
  try {
    // Cập nhật super_admin
    const { error: updateSuperAdminError } = await supabase
      .from('nguoi_dung')
      .update({ da_kich_hoat: true })
      .eq('vai_tro', 'super_admin');
    
    if (updateSuperAdminError) {
      console.error("Lỗi khi cập nhật da_kich_hoat cho super_admin:", updateSuperAdminError);
    } else {
      console.log("Đã cập nhật da_kich_hoat = true cho super_admin");
    }
    
    // Cập nhật admin_con
    const { error: updateAdminConError } = await supabase
      .from('nguoi_dung')
      .update({ da_kich_hoat: false })
      .eq('vai_tro', 'admin_con');
    
    if (updateAdminConError) {
      console.error("Lỗi khi cập nhật da_kich_hoat cho admin_con:", updateAdminConError);
    } else {
      console.log("Đã cập nhật da_kich_hoat = false cho admin_con");
    }
    
    return true;
  } catch (error) {
    console.error("Lỗi khi cập nhật giá trị mặc định da_kich_hoat:", error);
    return false;
  }
}

/**
 * Xác nhận email cho tài khoản admin con
 * Được sử dụng sau khi kích hoạt tài khoản
 */
export async function xacNhanEmailAdmin(adminId: string) {
  try {
    // Tìm thông tin admin trong bảng nguoi_dung
    const { data: adminData, error: adminError } = await supabase
      .from('nguoi_dung')
      .select('email, ten')
      .eq('id', adminId)
      .single();

    if (adminError) {
      console.error("Lỗi khi tìm thông tin admin:", adminError);
      throw new Error(`Không tìm thấy thông tin admin: ${adminError.message}`);
    }

    if (!adminData) {
      throw new Error("Không tìm thấy thông tin admin với ID này");
    }

    // Phương pháp 1: Thử sử dụng Admin API để cập nhật trạng thái xác nhận email
    try {
      // Tạo lại phiên đăng nhập với một máy chủ xác nhận giả
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: adminData.email,
        options: {
          shouldCreateUser: false
        }
      });

      if (signInError) {
        console.error("Lỗi khi gửi OTP:", signInError);
      } else {
        console.log(`Đã gửi mã OTP tới email ${adminData.email}`);
        return {
          success: true,
          message: `Đã gửi mã xác nhận đến email ${adminData.email}. Vui lòng kiểm tra hộp thư và nhấp vào liên kết xác nhận.`,
          method: "otp"
        };
      }
    } catch (err) {
      console.error("Lỗi khi xác nhận email qua Admin API:", err);
    }

    // Phương pháp 2: Gửi yêu cầu đặt lại mật khẩu, khi đặt lại sẽ tự động xác nhận email
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        adminData.email,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/login`
        }
      );

      if (resetError) {
        console.error("Lỗi khi gửi yêu cầu đặt lại mật khẩu:", resetError);
        throw resetError;
      }

      return {
        success: true,
        message: `Đã gửi email đặt lại mật khẩu đến ${adminData.email}. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để hoàn tất xác nhận tài khoản.`,
        method: "reset_password"
      };
    } catch (resetErr) {
      console.error("Lỗi khi gửi yêu cầu đặt lại mật khẩu:", resetErr);
      throw resetErr;
    }
  } catch (error) {
    console.error("Lỗi khi xác nhận email admin:", error);
    throw error;
  }
}

/**
 * Bỏ qua xác nhận email cho admin con
 * Thực hiện sau khi kích hoạt tài khoản
 * Cách làm: Tạo mới tài khoản với email và mật khẩu tương tự, nhưng không yêu cầu xác nhận email
 */
export async function boQuaXacNhanEmail(adminId: string, matKhauMoi: string = 'Admin@123') {
  try {
    // Tìm thông tin admin trong bảng nguoi_dung
    const { data: adminData, error: adminError } = await supabase
      .from('nguoi_dung')
      .select('email, ten, vai_tro')
      .eq('id', adminId)
      .single();

    if (adminError) {
      console.error("Lỗi khi tìm thông tin admin:", adminError);
      throw new Error(`Không tìm thấy thông tin admin: ${adminError.message}`);
    }

    if (!adminData) {
      throw new Error("Không tìm thấy thông tin admin với ID này");
    }

    // Xóa tài khoản hiện tại trong Supabase Auth (nhưng vẫn giữ trong bảng nguoi_dung)
    try {
      // Gọi API xóa tài khoản
      const { error: deleteError } = await supabase.auth.admin.deleteUser(adminId);
      
      if (deleteError) {
        console.error("Không thể xóa tài khoản cũ do không có quyền admin:", deleteError);
        // Tiếp tục với phương pháp khác
      } else {
        console.log("Đã xóa tài khoản Auth cũ thành công");
      }
    } catch (deleteErr) {
      console.error("Lỗi khi xóa tài khoản cũ:", deleteErr);
      // Tiếp tục với phương pháp khác
    }

    // Tạo mới tài khoản với cùng email nhưng đã xác nhận
    try {
      // Thử tạo với API admin
      const { data: adminCreateData, error: adminCreateError } = await supabase.auth.admin.createUser({
        email: adminData.email,
        password: matKhauMoi,
        email_confirm: true,
        user_metadata: {
          ten: adminData.ten,
          vai_tro: adminData.vai_tro
        }
      });

      if (adminCreateError) {
        console.error("Không thể tạo tài khoản đã xác nhận với API admin:", adminCreateError);
      } else {
        // Cập nhật lại ID trong bảng nguoi_dung
        const { error: updateError } = await supabase
          .from('nguoi_dung')
          .update({ id: adminCreateData.user.id })
          .eq('id', adminId);

        if (updateError) {
          console.error("Lỗi khi cập nhật ID mới cho admin:", updateError);
          return {
            success: false,
            message: `Đã tạo tài khoản mới nhưng không thể cập nhật ID: ${updateError.message}`,
            newId: adminCreateData.user.id,
            oldId: adminId
          };
        }

        return {
          success: true,
          message: `Đã tạo tài khoản mới với email đã xác nhận cho ${adminData.email}. Mật khẩu: ${matKhauMoi}`
        };
      }
    } catch (adminErr) {
      console.error("Lỗi khi tạo tài khoản với API admin:", adminErr);
    }

    // Phương pháp thay thế: Sử dụng signUp thông thường
    // Lưu ý: Phương pháp này vẫn sẽ gửi email xác nhận
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: adminData.email,
      password: matKhauMoi,
      options: {
        data: {
          ten: adminData.ten,
          vai_tro: adminData.vai_tro
        }
      }
    });

    if (signUpError) {
      throw signUpError;
    }

    if (!signUpData.user) {
      throw new Error("Không thể tạo lại tài khoản");
    }

    // Cập nhật ID trong bảng nguoi_dung
    const { error: updateError } = await supabase
      .from('nguoi_dung')
      .update({ id: signUpData.user.id })
      .eq('id', adminId);

    if (updateError) {
      console.error("Lỗi khi cập nhật ID mới cho admin:", updateError);
      return {
        success: false,
        message: `Đã tạo tài khoản mới nhưng không thể cập nhật ID: ${updateError.message}. Vui lòng kiểm tra email để xác nhận tài khoản.`,
        newId: signUpData.user.id,
        oldId: adminId
      };
    }

    return {
      success: true,
      message: `Đã tạo tài khoản mới cho ${adminData.email}. Mật khẩu: ${matKhauMoi}. Vui lòng kiểm tra email để xác nhận tài khoản.`
    };
  } catch (error) {
    console.error("Lỗi khi bỏ qua xác nhận email:", error);
    throw error;
  }
} 