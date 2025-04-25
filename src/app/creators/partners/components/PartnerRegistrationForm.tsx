'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function PartnerRegistrationForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    representativeName: '',
    position: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: '',
    mainActivity: '',
    teamSize: '',
    gamingExperience: '',
    proposal: '',
    attachments: null as FileList | null
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      attachments: e.target.files
    }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Xử lý gửi form
    alert('Đăng ký đối tác thành công! Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.');
    // Reset form
    setFormData({
      companyName: '',
      representativeName: '',
      position: '',
      email: '',
      phone: '',
      website: '',
      partnershipType: '',
      mainActivity: '',
      teamSize: '',
      gamingExperience: '',
      proposal: '',
      attachments: null
    });
  };

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            FORM ĐĂNG KÝ ĐỐI TÁC
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="text-white">
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <h3 className="text-lg text-[var(--accent-blue-bright)] font-medium mb-4 border-b border-white/10 pb-2">
            Thông Tin Cơ Bản
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 mb-2 text-sm" htmlFor="companyName">
                Tên tổ chức/doanh nghiệp*
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2 text-sm" htmlFor="representativeName">
                Người đại diện*
              </label>
              <input
                type="text"
                id="representativeName"
                name="representativeName"
                required
                value={formData.representativeName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2 text-sm" htmlFor="position">
                Chức vụ*
              </label>
              <input
                type="text"
                id="position"
                name="position"
                required
                value={formData.position}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2 text-sm" htmlFor="email">
                Email liên hệ*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2 text-sm" htmlFor="phone">
                Số điện thoại*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2 text-sm" htmlFor="website">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <h3 className="text-lg text-[var(--accent-blue-bright)] font-medium mb-4 border-b border-white/10 pb-2">
            Loại Hình Đối Tác
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="platformPartner"
                name="partnershipType"
                value="Đối tác Nền tảng"
                checked={formData.partnershipType === 'Đối tác Nền tảng'}
                onChange={handleChange}
                className="mr-2 accent-[var(--accent-blue-bright)]"
              />
              <label htmlFor="platformPartner" className="text-white/80 text-sm">
                Đối tác Nền tảng
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="contentPartner"
                name="partnershipType"
                value="Đối tác Nội dung"
                checked={formData.partnershipType === 'Đối tác Nội dung'}
                onChange={handleChange}
                className="mr-2 accent-[var(--accent-blue-bright)]"
              />
              <label htmlFor="contentPartner" className="text-white/80 text-sm">
                Đối tác Nội dung
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="eventPartner"
                name="partnershipType"
                value="Đối tác Sự kiện"
                checked={formData.partnershipType === 'Đối tác Sự kiện'}
                onChange={handleChange}
                className="mr-2 accent-[var(--accent-blue-bright)]"
              />
              <label htmlFor="eventPartner" className="text-white/80 text-sm">
                Đối tác Sự kiện
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="techPartner"
                name="partnershipType"
                value="Đối tác Công nghệ"
                checked={formData.partnershipType === 'Đối tác Công nghệ'}
                onChange={handleChange}
                className="mr-2 accent-[var(--accent-blue-bright)]"
              />
              <label htmlFor="techPartner" className="text-white/80 text-sm">
                Đối tác Công nghệ
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="otherPartner"
                name="partnershipType"
                value="Khác"
                checked={formData.partnershipType === 'Khác'}
                onChange={handleChange}
                className="mr-2 accent-[var(--accent-blue-bright)]"
              />
              <label htmlFor="otherPartner" className="text-white/80 text-sm">
                Khác (vui lòng ghi rõ trong mô tả)
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <h3 className="text-lg text-[var(--accent-blue-bright)] font-medium mb-4 border-b border-white/10 pb-2">
            Thông Tin Chi Tiết
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white/80 mb-2 text-sm" htmlFor="mainActivity">
                Lĩnh vực hoạt động chính*
              </label>
              <input
                type="text"
                id="mainActivity"
                name="mainActivity"
                required
                value={formData.mainActivity}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2 text-sm" htmlFor="teamSize">
                Quy mô tổ chức (nhân sự)*
              </label>
              <input
                type="text"
                id="teamSize"
                name="teamSize"
                required
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-white/80 mb-2 text-sm" htmlFor="gamingExperience">
              Kinh nghiệm trong lĩnh vực gaming
            </label>
            <input
              type="text"
              id="gamingExperience"
              name="gamingExperience"
              value={formData.gamingExperience}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-white/80 mb-2 text-sm" htmlFor="proposal">
              Mô tả ngắn về đề xuất hợp tác*
            </label>
            <textarea
              id="proposal"
              name="proposal"
              required
              value={formData.proposal}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-white/80 mb-2 text-sm" htmlFor="attachments">
              Tài liệu đính kèm (Company profile, Portfolio...)
            </label>
            <input
              type="file"
              id="attachments"
              name="attachments"
              multiple
              onChange={handleFileChange}
              className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-blue-bright)] transition-colors file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[var(--accent-blue-bright)]/80 file:text-white"
            />
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-[var(--accent-blue-bright)] to-purple-600 text-white rounded-md hover:from-[var(--accent-blue-bright)]/90 hover:to-purple-600/90 transition-colors font-medium tracking-wide shadow-lg shadow-purple-600/20"
          >
            GỬI ĐĂNG KÝ
          </button>
        </div>
      </form>
    </div>
  );
} 