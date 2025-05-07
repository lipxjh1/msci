import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/tien_ich/supabase';
import { BaiViet } from '@/loai/bai_viet';
import { useAuth } from '@/context/AuthContext';

type TinTucFormProps = {
  editingTinTuc: BaiViet | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
};

export default function TinTucForm({
  editingTinTuc,
  onClose,
  onSuccess
}: TinTucFormProps) {
  console.log("TinTucForm đang render", { editingTinTuc });
  
  const { adminInfo } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    id: editingTinTuc?.id || crypto.randomUUID(),
    tieu_de: editingTinTuc?.tieu_de || '',
    noi_dung: editingTinTuc?.noi_dung || '',
    anh_dai_dien: editingTinTuc?.anh_dai_dien || '',
    video: editingTinTuc?.video || '',
    loai: editingTinTuc?.loai || 'tin_tuc' as const,
    nguoi_dung_id: editingTinTuc?.nguoi_dung_id || adminInfo?.id || '',
    ngay_dang: editingTinTuc?.ngay_dang || new Date().toISOString()
  });

  useEffect(() => {
    try {
      // Kiểm tra nếu không có adminInfo thì hiển thị lỗi
      console.log("TinTucForm useEffect chạy, adminInfo:", adminInfo);
      if (!adminInfo) {
        console.warn("Không tìm thấy adminInfo trong context");
        setError('Bạn cần đăng nhập để tạo bài viết');
      }
    } catch (err) {
      console.error("Lỗi trong useEffect của TinTucForm:", err);
      setError(`Lỗi khởi tạo form: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`);
    }
  }, [adminInfo]);

  // Xử lý upload ảnh
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setIsUploadingImage(false);
      return;
    }
    
    const file = files[0];
    const fileSize = file.size / 1024 / 1024; // kích thước tính bằng MB
    
    // Kiểm tra kích thước file (giới hạn 5MB)
    if (fileSize > 5) {
      alert('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
      setIsUploadingImage(false);
      return;
    }
    
    setIsUploadingImage(true);
    
    try {
      setError(null);
      
      // Tạo file name ngẫu nhiên và đẩy về thư mục gốc
      const fileExt = file.name.split('.').pop();
      const fileName = `news-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
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
      console.log("Kết thúc quá trình upload ảnh");
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

  // Xử lý khi nhập liệu vào form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bắt đầu xử lý form submit");
    setError(null);
    setIsSubmitting(true);
    
    try {
      console.log("Kiểm tra thông tin form:", { 
        tieu_de: formData.tieu_de, 
        noi_dung: formData.noi_dung,
        loai: formData.loai,
        adminInfo: adminInfo?.id 
      });

      if (!formData.tieu_de) {
        throw new Error('Vui lòng nhập tiêu đề cho bài viết');
      }

      if (!formData.noi_dung) {
        throw new Error('Vui lòng nhập nội dung cho bài viết');
      }

      if (!formData.loai) {
        throw new Error('Vui lòng chọn loại bài viết');
      }

      if (!adminInfo?.id) {
        throw new Error('Không có thông tin người đăng, vui lòng đăng nhập lại');
      }
      
      // Kiểm tra xem ảnh có phải là URL tạm thời không
      let anhDaiDien = formData.anh_dai_dien;
      if (anhDaiDien && anhDaiDien.startsWith('blob:')) {
        console.warn("Phát hiện URL tạm thời (blob), ảnh có thể chưa được upload xong");
        
        // Hiển thị thông báo xác nhận
        if (window.confirm('Ảnh đại diện chưa được upload lên server. Bạn muốn tiếp tục lưu bài viết mà không có ảnh?')) {
          anhDaiDien = '';
        } else {
          setIsSubmitting(false);
          return;
        }
      }
      
      // Đối với trường hợp cập nhật, giữ nguyên ảnh hiện tại nếu không có thay đổi
      if (editingTinTuc && anhDaiDien === editingTinTuc.anh_dai_dien) {
        console.log("Giữ nguyên ảnh đại diện hiện tại:", anhDaiDien);
      }
      
      // Dữ liệu bài viết để lưu vào database
      const baiVietData = {
        id: formData.id,
        tieu_de: formData.tieu_de,
        noi_dung: formData.noi_dung,
        anh_dai_dien: anhDaiDien || null,
        video: formData.video || null,
        loai: formData.loai as 'tin_tuc' | 'cong_dong' | null,
        nguoi_dung_id: adminInfo.id,
        ngay_dang: editingTinTuc ? editingTinTuc.ngay_dang : new Date().toISOString()
      };
      
      console.log("Dữ liệu sẽ được lưu:", baiVietData);
      
      if (editingTinTuc) {
        // Cập nhật bài viết
        console.log(`Đang cập nhật bài viết ID: ${baiVietData.id}`);
        
        try {
          console.log("Bắt đầu gọi Supabase update");
          const { data: updatedData, error: updateError } = await supabase
            .from('bai_viet')
            .update(baiVietData)
            .eq('id', baiVietData.id)
            .select();
          
          console.log("Kết quả từ Supabase update:", { updatedData, updateError });
          
          if (updateError) {
            console.error("Lỗi khi cập nhật bài viết:", updateError);
            throw new Error(`Không thể cập nhật bài viết: ${updateError.message}`);
          }
          
          console.log("Kết quả cập nhật:", updatedData);
          
          if (!updatedData || updatedData.length === 0) {
            console.warn("Cập nhật thành công nhưng không có dữ liệu trả về");
          }
          
          alert(`Đã cập nhật bài viết "${baiVietData.tieu_de}" thành công!`);
          
          // Đóng form và tải lại dữ liệu
          try {
            console.log("Đang gọi onSuccess callback");
            await onSuccess();
            console.log("Đã tải lại dữ liệu sau khi cập nhật bài viết thành công");
          } catch (loadErr) {
            console.error("Lỗi khi tải lại dữ liệu sau khi cập nhật:", loadErr);
          }
          
          onClose();
        } catch (updateErr) {
          throw updateErr;
        }
      } else {
        // Tạo bài viết mới
        console.log('Đang tạo bài viết mới');
        
        try {
          console.log("Bắt đầu gọi Supabase insert");
          const { data: insertedData, error: insertError } = await supabase
            .from('bai_viet')
            .insert(baiVietData)
            .select();
          
          console.log("Kết quả từ Supabase insert:", { insertedData, insertError });
          
          if (insertError) {
            console.error("Lỗi khi tạo bài viết mới:", insertError);
            throw new Error(`Không thể tạo bài viết: ${insertError.message}`);
          }
          
          console.log("Kết quả tạo mới:", insertedData);
          alert(`Đã tạo bài viết "${baiVietData.tieu_de}" thành công!`);
          
          // Tải lại dữ liệu trước khi đóng form
          try {
            console.log("Đang gọi onSuccess callback");
            await onSuccess();
            console.log("Đã tải lại dữ liệu sau khi lưu bài viết thành công");
          } catch (loadErr) {
            console.error("Lỗi khi tải lại dữ liệu sau khi lưu:", loadErr);
          }
          
          // Đóng form
          onClose();
        } catch (insertErr) {
          throw insertErr;
        }
      }
    } catch (err) {
      console.error('Lỗi khi lưu bài viết:', err);
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(`Không thể lưu bài viết: ${errorMessage}`);
      alert(`Không thể lưu bài viết: ${errorMessage}`);
    } finally {
      console.log("Kết thúc xử lý form submit");
      setIsSubmitting(false);
    }
  };

  // Xử lý khi nhấn nút hủy
  const handleCancel = () => {
    if (isSubmitting || isUploadingImage) {
      if (!window.confirm('Bạn có chắc chắn muốn hủy? Dữ liệu đang được xử lý và có thể bị mất.')) {
        return;
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingTinTuc ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Form content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Tiêu đề */}
              <div>
                <label htmlFor="tieu_de" className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="tieu_de"
                  name="tieu_de"
                  value={formData.tieu_de || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Loại bài viết */}
              <div>
                <label htmlFor="loai" className="block text-sm font-medium text-gray-700 mb-1">
                  Loại bài viết <span className="text-red-500">*</span>
                </label>
                <select
                  id="loai"
                  name="loai"
                  value={formData.loai || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="">-- Chọn loại bài viết --</option>
                  <option value="tin_tuc">Tin tức</option>
                  <option value="cong_dong">Cộng đồng</option>
                </select>
              </div>
              
              {/* Ảnh đại diện */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh đại diện
                </label>
                <div className="mt-1 flex items-center">
                  {formData.anh_dai_dien ? (
                    <div className="relative">
                      <img
                        src={formData.anh_dai_dien}
                        alt="Preview"
                        className="h-32 w-auto object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                        disabled={isSubmitting}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <label className="relative cursor-pointer bg-blue-100 hover:bg-blue-200 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-blue-700 focus:outline-none">
                        <span>{isUploadingImage ? 'Đang tải lên...' : 'Chọn ảnh'}</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          disabled={isSubmitting || isUploadingImage}
                        />
                      </label>
                      <span className="text-xs text-gray-500">
                        Định dạng: JPG, PNG, GIF. Kích thước tối đa: 5MB
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Nội dung */}
              <div>
                <label htmlFor="noi_dung" className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="noi_dung"
                    name="noi_dung"
                    value={formData.noi_dung || ''}
                    onChange={handleInputChange}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                    required
                    placeholder="Nhập nội dung bài viết ở đây..."
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    * Bạn có thể sử dụng HTML để định dạng văn bản. Ví dụ: &lt;b&gt;in đậm&lt;/b&gt;, &lt;i&gt;in nghiêng&lt;/i&gt;, &lt;u&gt;gạch chân&lt;/u&gt;, &lt;a href=&quot;https://example.com&quot;&gt;liên kết&lt;/a&gt;, &lt;h2&gt;Tiêu đề&lt;/h2&gt;
                  </p>
                </div>
              </div>
              
              {/* Video Embed Code */}
              <div>
                <label htmlFor="video_embed" className="block text-sm font-medium text-gray-700 mb-1">
                  Mã nhúng Video (iframe)
                </label>
                <textarea
                  id="video_embed"
                  name="video"
                  value={formData.video || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  placeholder='<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                />
                <p className="mt-2 text-xs text-gray-500">
                  * Dán trực tiếp mã iframe nhúng video từ YouTube, Vimeo, hoặc các dịch vụ khác
                </p>
                {formData.video && (
                  <div className="mt-2 p-2 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-700">Xem trước mã nhúng:</p>
                      <div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, video: '' }))}
                          className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                        >
                          Xóa mã nhúng
                        </button>
                      </div>
                    </div>
                    <div className="aspect-video w-full bg-gray-100 rounded p-2">
                      <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: formData.video || '' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            disabled={isSubmitting || isUploadingImage}
          >
            {isSubmitting ? 'Đang lưu...' : editingTinTuc ? 'Cập nhật' : 'Tạo mới'}
          </button>
        </div>
      </div>
    </div>
  );
} 