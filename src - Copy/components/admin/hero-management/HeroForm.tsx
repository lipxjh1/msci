import { useState, useRef } from 'react';
import { supabase } from '@/tien_ich/supabase';
import type { AnhHung, VaiTro, DoHiEm } from '@/loai';
import Image from 'next/image';

type HeroFormProps = {
  danhSachVaiTro: VaiTro[];
  danhSachDoHiem: DoHiEm[];
  editingHero: AnhHung | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
};

export default function HeroForm({
  danhSachVaiTro,
  danhSachDoHiem,
  editingHero,
  onClose,
  onSuccess
}: HeroFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    id: editingHero?.id || crypto.randomUUID(),
    ten: editingHero?.ten || '',
    vai_tro_id: editingHero?.vai_tro_id !== null && editingHero?.vai_tro_id !== undefined 
      ? String(editingHero.vai_tro_id) 
      : '',
    do_hi_em_id: editingHero?.do_hi_em_id !== null && editingHero?.do_hi_em_id !== undefined 
      ? String(editingHero.do_hi_em_id) 
      : '',
    toc_do_ban: editingHero?.toc_do_ban || '',
    dac_diem: editingHero?.dac_diem || '',
    ky_nang: editingHero?.ky_nang || '',
    anh_dai_dien: editingHero?.anh_dai_dien || '',
    tieu_su: editingHero?.tieu_su || '',
    thu_nhap_chip: editingHero?.thu_nhap_chip || ''
  });

  // Xử lý upload ảnh với signed URL để tránh RLS
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileSize = file.size / 1024 / 1024; // kích thước tính bằng MB
    
    // Kiểm tra kích thước file (giới hạn 5MB)
    if (fileSize > 5) {
      alert('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
      return;
    }
    
    setIsUploadingImage(true);
    
    try {
      setError(null);
      
      // Tạo file name ngẫu nhiên và đẩy về thư mục gốc
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = fileName;
      
      console.log("Đang upload file...", filePath);
      
      // Tạo một ảnh tạm thời để hiển thị ngay
      const objectUrl = URL.createObjectURL(file);
      setFormData(prevState => ({
        ...prevState,
        anh_dai_dien: objectUrl,
      }));
      
      console.log("Đã tạo Object URL tạm thời:", objectUrl);
      
      const { data: authData } = await supabase.auth.getSession();
      if (!authData.session) {
        throw new Error("Bạn cần đăng nhập để upload ảnh");
      }
      
      // Sử dụng storage.createSignedUploadUrl thay vì upload trực tiếp
      const { data, error: signedUrlError } = await supabase.storage
        .from('game-assets')
        .createSignedUploadUrl(filePath);
        
      if (signedUrlError) {
        console.error("Lỗi khi tạo signed URL:", signedUrlError);
        throw new Error(`Không thể tạo signed URL: ${signedUrlError.message}`);
      }
      
      console.log("Đã tạo signed URL:", data);
      
      // Upload file sử dụng signed URL
      const { signedUrl } = data;
      
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'x-upsert': 'true'
        },
        body: file
      });
      
      if (!uploadResponse.ok) {
        throw new Error(`Upload thất bại: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }
      
      console.log("Upload thành công với signed URL");
      
      // Lấy URL công khai của file
      const { data: { publicUrl } } = supabase.storage
        .from('game-assets')
        .getPublicUrl(filePath);
      
      console.log('URL công khai của ảnh:', publicUrl);
      
      // Cập nhật form data với URL ảnh thật từ Supabase
      setFormData(prevState => ({
        ...prevState,
        anh_dai_dien: publicUrl
      }));
      
      // Hủy object URL tạm thời để tránh rò rỉ bộ nhớ
      URL.revokeObjectURL(objectUrl);
      
    } catch (err) {
      console.error('Lỗi khi upload ảnh:', err);
      
      // Sử dụng ảnh mặc định nếu có lỗi
      const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_AVATAR || '/images/avatar-default.png';
      setFormData(prevState => ({
        ...prevState,
        anh_dai_dien: defaultImage
      }));
      
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert(`Không thể upload ảnh: ${errorMessage}\nĐang sử dụng ảnh mặc định thay thế.`);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Xử lý xóa ảnh
  const handleRemoveImage = async () => {
    try {
      // Kiểm tra xem ảnh có phải từ Supabase storage không
      if (formData.anh_dai_dien && formData.anh_dai_dien.includes('supabase.co')) {
        console.log("Đang xóa ảnh từ Supabase:", formData.anh_dai_dien);
        
        // Trích xuất đường dẫn file từ URL
        const urlParts = formData.anh_dai_dien.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        console.log("Tên file cần xóa:", fileName);
        
        // Tạo API để xóa ảnh nếu cần thiết, nhưng hiện tại chỉ cập nhật UI
        // TODO: Thêm API endpoint để xóa ảnh nếu cần
        console.log('Đã xóa ảnh thành công từ UI');
        alert('Đã xóa ảnh khỏi form');
      } else if (formData.anh_dai_dien) {
        console.log('Ảnh không phải từ Supabase, chỉ xóa URL khỏi form');
      }
      
      // Xóa URL ảnh khỏi form data
      setFormData(prevState => ({
        ...prevState,
        anh_dai_dien: ''
      }));
    } catch (err) {
      console.error('Lỗi khi xóa ảnh:', err);
      alert('Có lỗi xảy ra khi xóa ảnh: ' + (err instanceof Error ? err.message : 'Lỗi không xác định'));
      
      // Vẫn xóa URL khỏi form để người dùng có thể tiếp tục
      setFormData(prevState => ({
        ...prevState,
        anh_dai_dien: ''
      }));
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Tạo dữ liệu hero để lưu vào database
      const heroData: Omit<AnhHung, 'vai_tro' | 'do_hi_em'> = {
        id: formData.id,
        ten: formData.ten,
        vai_tro_id: formData.vai_tro_id ? parseInt(formData.vai_tro_id) : null,
        do_hi_em_id: formData.do_hi_em_id ? parseInt(formData.do_hi_em_id) : null,
        toc_do_ban: formData.toc_do_ban || null,
        dac_diem: formData.dac_diem || null,
        ky_nang: formData.ky_nang || null,
        anh_dai_dien: formData.anh_dai_dien || null,
        tieu_su: formData.tieu_su || null,
        thu_nhap_chip: formData.thu_nhap_chip || null

      };
      
      console.log("Dữ liệu hero sẽ được lưu:", heroData);
      
      if (editingHero) {
        // Cập nhật hero
        console.log(`Đang cập nhật hero ID: ${heroData.id}`);
        
        // Kiểm tra xem ID có tồn tại không
        if (!heroData.id) {
          throw new Error("ID của hero không hợp lệ");
        }
        
        try {
          const { data: updatedData, error: updateError } = await supabase
            .from('anh_hung')
            .update(heroData)
            .eq('id', heroData.id)
            .select();
          
          if (updateError) {
            throw updateError;
          }
          
          console.log("Kết quả cập nhật:", updatedData);
          
          if (!updatedData || updatedData.length === 0) {
            console.warn("Cập nhật thành công nhưng không có dữ liệu trả về");
          }
          
          alert(`Đã cập nhật thông tin hero ${heroData.ten} thành công!`);
          
          // Đóng form
          onClose();
          
          // Tải lại dữ liệu
          await onSuccess();
        } catch (err) {
          console.error('Lỗi khi cập nhật hero:', err);
          throw err;
        }
      } else {
        // Tạo hero mới
        console.log('Đang tạo hero mới');
        
        try {
          const { data: insertedData, error: insertError } = await supabase
            .from('anh_hung')
            .insert(heroData)
            .select();
          
          if (insertError) {
            throw insertError;
          }
          
          console.log("Kết quả tạo mới:", insertedData);
          
          alert(`Đã thêm hero ${heroData.ten} thành công!`);
          
          // Đóng form
          onClose();
          
          // Tải lại dữ liệu
          await onSuccess();
        } catch (err) {
          console.error('Lỗi khi tạo hero mới:', err);
          throw err;
        }
      }
    } catch (err) {
      console.error('Lỗi khi lưu thông tin hero:', err);
      setError(err instanceof Error ? err.message : 'Lỗi không xác định khi lưu thông tin hero');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="sr-only">Đóng</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {editingHero ? `Chỉnh sửa Hero: ${editingHero.ten}` : 'Thêm Hero Mới'}
                </h3>
                
                {error && (
                  <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded-md">
                    {error}
                  </div>
                )}
                
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      {/* Form fields */}
                      <div>
                        <label htmlFor="ten" className="block text-sm font-medium text-gray-700">
                          Tên Hero
                        </label>
                        <input
                          type="text"
                          id="ten"
                          value={formData.ten}
                          onChange={e => setFormData({...formData, ten: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="vai_tro_id" className="block text-sm font-medium text-gray-700">
                          Vai trò
                        </label>
                        <select
                          id="vai_tro_id"
                          value={formData.vai_tro_id}
                          onChange={e => setFormData({...formData, vai_tro_id: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="">-- Chọn vai trò --</option>
                          {danhSachVaiTro.map((vaiTro) => (
                            <option key={vaiTro.id} value={vaiTro.id}>
                              {vaiTro.ten}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="do_hi_em_id" className="block text-sm font-medium text-gray-700">
                          Độ hiếm
                        </label>
                        <select
                          id="do_hi_em_id"
                          value={formData.do_hi_em_id}
                          onChange={e => setFormData({...formData, do_hi_em_id: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="">-- Chọn độ hiếm --</option>
                          {danhSachDoHiem.map((doHiem) => (
                            <option key={doHiem.id} value={doHiem.id}>
                              {doHiem.ten}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="toc_do_ban" className="block text-sm font-medium text-gray-700">
                          Tốc độ bắn
                        </label>
                        <input
                          type="text"
                          id="toc_do_ban"
                          value={formData.toc_do_ban}
                          onChange={e => setFormData({...formData, toc_do_ban: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="dac_diem" className="block text-sm font-medium text-gray-700">
                          Đặc điểm
                        </label>
                        <textarea
                          id="dac_diem"
                          value={formData.dac_diem}
                          onChange={e => setFormData({...formData, dac_diem: e.target.value})}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="ky_nang" className="block text-sm font-medium text-gray-700">
                          Kỹ năng
                        </label>
                        <textarea
                          id="ky_nang"
                          value={formData.ky_nang}
                          onChange={e => setFormData({...formData, ky_nang: e.target.value})}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="tieu_su" className="block text-sm font-medium text-gray-700">
                          Tiểu sử
                        </label>
                        <textarea
                          id="tieu_su"
                          value={formData.tieu_su}
                          onChange={e => setFormData({...formData, tieu_su: e.target.value})}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="thu_nhap_chip" className="block text-sm font-medium text-gray-700">
                          Thu nhập chip
                        </label>
                        <textarea
                          id="thu_nhap_chip"
                          value={formData.thu_nhap_chip}
                          onChange={e => setFormData({...formData, thu_nhap_chip: e.target.value})}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ảnh đại diện
                        </label>
                        <div className="mt-1 flex items-center space-x-2">
                          <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-md">
                            {formData.anh_dai_dien ? (
                              <Image
                                src={formData.anh_dai_dien}
                                alt="Hero preview"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-md"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                              accept="image/*"
                              className="sr-only"
                              id="hero-image"
                            />
                            <div className="flex space-x-2">
                              <label
                                htmlFor="hero-image"
                                className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                              >
                                {isUploadingImage ? 'Đang tải...' : 'Chọn ảnh'}
                              </label>
                              {formData.anh_dai_dien && (
                                <button
                                  type="button"
                                  onClick={handleRemoveImage}
                                  className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Xóa ảnh
                                </button>
                              )}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF tối đa 5MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Đang lưu...' : (editingHero ? 'Cập nhật' : 'Thêm mới')}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 