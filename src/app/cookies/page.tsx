"use client";

import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)]">
      <div className="container mx-auto px-4 py-8 text-white">
        <div className="max-w-4xl mx-auto bg-[#0a1a28]/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-[var(--accent-blue-bright)]/20 p-6 sm:p-8 mb-10">
          <h1
            id="top"
            className="text-4xl sm:text-5xl font-bold mb-10 text-center text-shadow-blue border-b border-[var(--accent-blue-bright)]/30 pb-6"
          >
            CHÍNH SÁCH COOKIE
          </h1>
          <p className="mb-6 text-center">Cập nhật lần cuối: Tháng 4 năm 2025</p>

          {/* Mục lục */}
          <div className="mb-12 pt-6">
            <div className="flex flex-col gap-3 text-[var(--accent-blue-bright)] text-lg">
              <Link
                href="#section1"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                1. Tổng quan về việc sử dụng cookie
              </Link>
              <Link
                href="#section2"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                2. Loại cookie và mục đích sử dụng
              </Link>
              <Link
                href="#section3"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                3. Kiểm soát cookie và sự đồng ý
              </Link>
              <Link
                href="#section4"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                4. Quyền riêng tư của bạn
              </Link>
              <Link
                href="#section5"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                5. Chia sẻ hoặc bán dữ liệu cá nhân
              </Link>
            </div>
          </div>

          <div className="border-b border-[var(--accent-blue-bright)]/30 mb-8"></div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-lg mb-6">
              Để mang đến trải nghiệm website tuyệt vời, chúng tôi sử dụng cookie để cá nhân hóa nội dung và quảng cáo, cung cấp tính năng truyền thông xã hội và phân tích lưu lượng truy cập của chúng tôi. Chúng tôi cũng chia sẻ thông tin về việc sử dụng trang web của bạn với các đối tác truyền thông xã hội, quảng cáo và phân tích của chúng tôi. Cookie bao gồm cookie bắt buộc, cookie chức năng, cookie hiệu suất, cookie truyền thông xã hội và cookie M-SCI & Đối tác. Bạn có thể tìm hiểu thêm về các loại cookie được thu thập và thay đổi cài đặt cookie của bạn bất kỳ lúc nào.
            </p>

            <p className="text-lg mb-6">
              M-SCI sử dụng nhiều đối tác tiếp thị và nhà cung cấp phân tích khác nhau để cá nhân hóa và cải thiện các sản phẩm và dịch vụ trực tuyến mà chúng tôi cung cấp cho bạn.
            </p>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section1"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              1. Tổng quan về việc sử dụng cookie
            </h2>

            <p className="text-lg mb-4">
              Chúng tôi có thể cho phép các công ty bên thứ ba thu thập thông tin về hoạt động của bạn trên trang web của chúng tôi, ví dụ thông qua cookie, pixel và đèn hiệu web. Các công ty này sử dụng thông tin họ thu thập để giúp chúng tôi dự đoán sở thích hoặc mối quan tâm của bạn để cá nhân hóa quảng cáo hoặc tiếp thị cho các mục đích được mô tả trong Chính sách quyền riêng tư của chúng tôi. Bạn có thể kiểm soát việc chia sẻ thông tin cá nhân của mình cho mục đích quảng cáo đó thông qua trang web của chúng tôi theo các cách sau:
            </p>

            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                Để thiết lập kiểm soát cookie và từ chối cookie quảng cáo/tiếp thị, bao gồm cookie quảng cáo của bên thứ ba, bạn có thể thay đổi tùy chọn cài đặt cookie của mình như được liên kết ở trên.
              </li>
              <li className="mb-2">
                Bạn cũng có thể thiết lập kiểm soát cookie thông qua nhiều cài đặt trình duyệt và bạn có thể sử dụng tùy chọn từ chối trên toàn ngành để kiểm soát việc sử dụng cookie cho mục đích quảng cáo dựa trên sở thích. M-SCI tôn trọng các cài đặt cấp trình duyệt này. Điều này có thể ảnh hưởng đến khả năng cá nhân hóa quảng cáo theo sở thích của bạn.
              </li>
            </ul>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section2"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              2. Loại cookie và mục đích sử dụng
            </h2>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--accent-blue-bright)]/80">Cookie bắt buộc</h3>
              <p className="text-lg mb-3">
                Những cookie này cần thiết để trang web hoạt động và không thể tắt trong hệ thống của chúng tôi. Chúng thường chỉ được thiết lập để đáp ứng các hành động bạn thực hiện tương đương với yêu cầu dịch vụ, chẳng hạn như thiết lập tùy chọn quyền riêng tư, đăng nhập hoặc điền vào biểu mẫu.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--accent-blue-bright)]/80">Cookie chức năng</h3>
              <p className="text-lg mb-3">
                Những cookie này cho phép trang web cung cấp chức năng và cá nhân hóa nâng cao. Chúng có thể được thiết lập bởi chúng tôi hoặc các nhà cung cấp bên thứ ba có dịch vụ được chúng tôi thêm vào trang. Nếu bạn không cho phép các cookie này, một số hoặc tất cả các dịch vụ này có thể không hoạt động đúng.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--accent-blue-bright)]/80">Cookie hiệu suất</h3>
              <p className="text-lg mb-3">
                Những cookie này cho phép chúng tôi đếm lượt truy cập và nguồn lưu lượng truy cập để chúng tôi có thể đo lường và cải thiện hiệu suất của trang web. Chúng giúp chúng tôi biết trang nào phổ biến nhất và ít phổ biến nhất và xem cách khách truy cập di chuyển xung quanh trang web.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--accent-blue-bright)]/80">Cookie truyền thông xã hội</h3>
              <p className="text-lg mb-3">
                Những cookie này do các dịch vụ truyền thông xã hội mà chúng tôi đã thêm vào trang web thiết lập để bạn có thể chia sẻ nội dung của chúng tôi với bạn bè và mạng của bạn. Chúng có thể theo dõi trình duyệt của bạn trên các trang web khác và xây dựng hồ sơ về sở thích của bạn.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--accent-blue-bright)]/80">Cookie M-SCI & Đối tác</h3>
              <p className="text-lg mb-3">
                Những cookie này có thể được thiết lập thông qua trang web của chúng tôi bởi các đối tác quảng cáo. Chúng có thể được các công ty đó sử dụng để xây dựng hồ sơ về sở thích của bạn và hiển thị cho bạn quảng cáo phù hợp trên các trang web khác.
              </p>
            </div>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section3"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              3. Kiểm soát cookie và sự đồng ý
            </h2>

            <p className="text-lg mb-4">
              Bạn có quyền chấp nhận hoặc từ chối cookie. Hầu hết các trình duyệt web tự động chấp nhận cookie, nhưng bạn có thể sửa đổi cài đặt trình duyệt của mình để từ chối cookie nếu bạn muốn. Nếu bạn chọn từ chối cookie, bạn có thể không thể trải nghiệm đầy đủ các tính năng tương tác của trang web của chúng tôi.
            </p>

            <p className="text-lg mb-4">
              Bạn có thể thiết lập kiểm soát cookie thông qua các cách sau:
            </p>

            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                <span className="font-medium">Cài đặt trình duyệt:</span> Hầu hết các trình duyệt cho phép bạn kiểm soát cookie thông qua cài đặt của chúng. Xem trợ giúp của trình duyệt của bạn để biết thêm thông tin.
              </li>
              <li className="mb-2">
                <span className="font-medium">Cài đặt cookie trang web:</span> Chúng tôi cung cấp tùy chọn thiết lập tùy chỉnh cookie trên trang web của chúng tôi.
              </li>
              <li className="mb-2">
                <span className="font-medium">Từ chối trên toàn ngành:</span> Bạn có thể sử dụng các cơ chế từ chối trên toàn ngành như Network Advertising Initiative hoặc Digital Advertising Alliance.
              </li>
            </ul>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section4"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              4. Quyền riêng tư của bạn
            </h2>

            <p className="text-lg mb-4">
              Khi bạn truy cập bất kỳ trang web nào, nó có thể lưu trữ hoặc truy xuất thông tin trên trình duyệt của bạn, chủ yếu dưới dạng cookie. Thông tin này có thể liên quan đến bạn, tùy chọn của bạn hoặc thiết bị của bạn và chủ yếu được sử dụng để làm cho trang web hoạt động như bạn mong đợi. Thông tin này thường không trực tiếp nhận dạng bạn, nhưng nó có thể mang đến cho bạn trải nghiệm web được cá nhân hóa hơn.
            </p>

            <p className="text-lg mb-4">
              Vì M-SCI tôn trọng quyền riêng tư của bạn, bạn có thể chọn không cho phép một số loại cookie. Xin lưu ý rằng việc chặn một số loại cookie có thể ảnh hưởng trực tiếp đến trải nghiệm của bạn về trang web của chúng tôi và các dịch vụ mà chúng tôi có thể cung cấp.
            </p>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section5"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              5. Chia sẻ hoặc bán dữ liệu cá nhân
            </h2>

            <p className="text-lg mb-4">
              Theo luật pháp của một số quốc gia và khu vực, bạn có quyền từ chối việc bán hoặc chia sẻ thông tin cá nhân của mình để dự đoán sở thích hoặc mối quan tâm của bạn nhằm cá nhân hóa quảng cáo cho bạn trên các nền tảng bên thứ ba đó. Các cookie này thu thập thông tin để phân tích và cá nhân hóa trải nghiệm của bạn với quảng cáo có mục tiêu.
            </p>

            <p className="text-lg mb-4">
              Bạn có thể thực hiện quyền từ chối việc bán (nếu chúng tôi làm như vậy trong tương lai) hoặc chia sẻ thông tin cá nhân. Nếu bạn chọn từ chối việc M-SCI tiết lộ thông tin cá nhân của bạn cho các mục đích này, chúng tôi sẽ không bán hoặc chia sẻ thông tin cá nhân của bạn được thu thập từ bạn, bao gồm cả với các đối tác tiếp thị bên thứ ba của chúng tôi.
            </p>

            <p className="text-lg mb-4">
              Ngoài ra, bạn có thể xem xét <Link href="/privacy" className="text-[var(--accent-blue-bright)] hover:underline">Chính sách quyền riêng tư</Link> của chúng tôi để làm rõ thêm về quyền của bạn. Nếu bạn đã bật các kiểm soát quyền riêng tư trên trình duyệt của mình (chẳng hạn như plugin), ở các khu vực áp dụng, khi được yêu cầu, chúng tôi công nhận đó là yêu cầu hợp lệ để từ chối các loại cookie này. Do đó, chúng tôi sẽ không thể theo dõi hoạt động của bạn qua web. Điều này có thể ảnh hưởng đến khả năng cá nhân hóa quảng cáo theo sở thích của bạn.
            </p>

            <div className="mt-16 pt-8 border-t border-[var(--accent-blue-bright)]/30 text-center">
              <p className="italic text-lg">
                © 2025 M-SCI Entertainment, Inc. Mọi quyền được bảo lưu.
              </p>
              <p className="italic text-lg">
                Chính sách Cookie này được cập nhật lần cuối vào tháng 4 năm 2025.
              </p>
            </div>

            <div className="text-right mt-8">
              <Link
                href="#top"
                className="text-[var(--accent-blue-bright)] hover:underline"
              >
                Về Đầu Trang
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-10 gap-4">
          <Link
            href="/privacy"
            className="bg-[var(--accent-blue-bright)]/20 hover:bg-[var(--accent-blue-bright)]/30 text-white py-3 px-6 rounded-lg border border-[var(--accent-blue-bright)]/50 transition-colors duration-300"
          >
            Chính sách Quyền riêng tư
          </Link>
          <Link
            href="/terms"
            className="bg-[var(--accent-blue-bright)]/20 hover:bg-[var(--accent-blue-bright)]/30 text-white py-3 px-6 rounded-lg border border-[var(--accent-blue-bright)]/50 transition-colors duration-300"
          >
            Điều khoản Sử dụng
          </Link>
          <Link
            href="/"
            className="bg-[var(--accent-blue-bright)]/20 hover:bg-[var(--accent-blue-bright)]/30 text-white py-3 px-6 rounded-lg border border-[var(--accent-blue-bright)]/50 transition-colors duration-300"
          >
            Trở về Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
} 