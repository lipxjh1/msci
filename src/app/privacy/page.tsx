"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)]">
      {/* Menu điều hướng */}
     

      <div className="container mx-auto px-4 py-8 text-white">
        <div className="max-w-4xl mx-auto bg-[#0a1a28]/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-[var(--accent-blue-bright)]/20 p-6 sm:p-8 mb-10">
          <h1
            id="top"
            className="text-4xl sm:text-5xl font-bold mb-10 text-center text-shadow-blue border-b border-[var(--accent-blue-bright)]/30 pb-6"
          >
            Chính sách Quyền riêng tư M-SCI Entertainment
          </h1>
          <p className="mb-6">Cập nhật lần cuối: Tháng 4 năm 2025</p>

          {/* Mục lục */}
          <div className="mb-12 pt-6">
            <div className="flex flex-col gap-3 text-[var(--accent-blue-bright)] text-lg">
              <Link
                href="#section1"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                1. Giới thiệu
              </Link>
              <Link
                href="#section2"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                2. Thông tin chúng tôi thu thập
              </Link>
              <Link
                href="#section3"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                3. Cách chúng tôi sử dụng thông tin của bạn
              </Link>
              <Link
                href="#section4"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                4. Blockchain và Token $MSCI
              </Link>
              <Link
                href="#section5"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                5. Chia sẻ thông tin
              </Link>
              <Link
                href="#section6"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                6. Bảo mật thông tin
              </Link>
              <Link
                href="#section7"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                7. Quyền của bạn
              </Link>
              <Link
                href="#section8"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                8. Trẻ em
              </Link>
              <Link
                href="#section9"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                9. Chuyển dữ liệu quốc tế
              </Link>
              <Link
                href="#section10"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                10. Thay đổi đối với Chính sách Quyền riêng tư
              </Link>
              <Link
                href="#section11"
                className="hover:underline hover:text-white transition-colors duration-200"
              >
                11. Liên hệ với chúng tôi
              </Link>
            </div>
          </div>

          <div className="border-b border-[var(--accent-blue-bright)]/30 mb-8"></div>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section1"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              1. Giới thiệu
            </h2>

            <p className="text-lg mb-4">
              M-SCI Entertainment, Inc. (&quot;M-SCI&quot;, &quot;chúng tôi&quot;, &quot;của chúng tôi&quot;) 
              tôn trọng quyền riêng tư của người chơi và cam kết bảo vệ thông
              tin cá nhân của bạn. Chính sách Quyền riêng tư này giải thích cách
              chúng tôi thu thập, sử dụng, chia sẻ và bảo vệ thông tin cá nhân
              khi bạn sử dụng game M-SCI, website, ứng dụng di động và các dịch
              vụ khác của chúng tôi (gọi chung là &quot;Dịch vụ&quot;).
            </p>

            <p className="text-lg mb-4">
              M-SCI là game hành động chiến thuật khoa học viễn tưởng kết hợp công nghệ blockchain.
              Vì đặc thù này, chúng tôi xử lý cả thông tin cá nhân thông thường
              và thông tin liên quan đến tài sản số, giao dịch blockchain và token.
            </p>

            <p className="text-lg mb-4">
              Bằng việc sử dụng Dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng 
              thông tin theo Chính sách này. Nếu bạn không đồng ý với Chính sách này, 
              vui lòng không sử dụng Dịch vụ của chúng tôi.
            </p>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section2"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              2. Thông tin chúng tôi thu thập
            </h2>

            <h3 className="text-2xl font-semibold mb-4">Thông tin bạn cung cấp</h3>
            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                <span className="font-medium">Thông tin tài khoản:</span> Khi đăng ký, chúng tôi thu thập tên, email, tên đăng nhập, mật khẩu, ngày sinh và quốc gia cư trú.
              </li>
              <li className="mb-2">
                <span className="font-medium">Thông tin thanh toán:</span> Khi bạn thực hiện giao dịch, chúng tôi có thể thu thập thông tin thanh toán bao gồm tên, địa chỉ, số điện thoại, thông tin thẻ tín dụng, hoặc thông tin ví điện tử.
              </li>
              <li className="mb-2">
                <span className="font-medium">Thông tin ví blockchain:</span> Địa chỉ ví công khai và thông tin liên quan đến giao dịch token $MSCI.
              </li>
              <li className="mb-2">
                <span className="font-medium">Thông tin trong trò chơi:</span> Dữ liệu về hoạt động của bạn trong game như điểm số, nhân vật, tài sản, và tiến trình chơi.
              </li>
              <li className="mb-2">
                <span className="font-medium">Nội dung người dùng tạo:</span> Thông tin bạn chia sẻ trên diễn đàn, chat trong game, hoặc tương tác với người chơi khác.
              </li>
              <li className="mb-2">
                <span className="font-medium">Thông tin giao dịch:</span> Dữ liệu liên quan đến việc mua bán, trao đổi trên Center Market, bao gồm cả thông tin về vật phẩm, nhân vật và token.
              </li>
              <li className="mb-2">
                <span className="font-medium">Thông tin referral:</span> Dữ liệu về hệ thống giới thiệu F1-F5, bao gồm mã giới thiệu và quan hệ giữa người giới thiệu và người được giới thiệu.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Thông tin chúng tôi thu thập tự động</h3>
            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                <span className="font-medium">Thông tin thiết bị:</span> Loại thiết bị, hệ điều hành, định danh thiết bị, địa chỉ IP.
              </li>
              <li className="mb-2">
                <span className="font-medium">Thông tin nhật ký:</span> Dữ liệu về cách bạn sử dụng game và website, bao gồm thời gian truy cập, trang đã xem, và đường dẫn điều hướng.
              </li>
              <li className="mb-2">
                <span className="font-medium">Dữ liệu phân tích game:</span> Thông tin về gameplay, như tương tác với các tính năng, thời gian chơi, và hành vi trong game.
              </li>
              <li className="mb-2">
                <span className="font-medium">Thông tin vị trí:</span> Vị trí gần đúng dựa trên địa chỉ IP.
              </li>
              <li className="mb-2">
                <span className="font-medium">Thông tin blockchain:</span> Dữ liệu công khai trên blockchain liên quan đến các giao dịch token $MSCI.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Thông tin từ bên thứ ba</h3>
            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                Thông tin từ nền tảng mạng xã hội nếu bạn đăng nhập thông qua các nền tảng đó.
              </li>
              <li className="mb-2">
                Thông tin từ các đối tác thanh toán và nhà cung cấp dịch vụ.
              </li>
              <li className="mb-2">
                Thông tin từ sàn giao dịch token và các dịch vụ blockchain khác mà bạn kết nối.
              </li>
            </ul>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section3"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              3. Cách chúng tôi sử dụng thông tin của bạn
            </h2>

            <p className="text-lg mb-4">
              Chúng tôi sử dụng thông tin thu thập để:
            </p>

            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                Cung cấp, duy trì và cải thiện Dịch vụ của chúng tôi.
              </li>
              <li className="mb-2">
                Xử lý giao dịch và quản lý tài khoản.
              </li>
              <li className="mb-2">
                Tạo điều kiện cho các hoạt động trong game như Guild War, Boss Thế Giới, và sự kiện cộng đồng.
              </li>
              <li className="mb-2">
                Xác thực danh tính và ngăn chặn gian lận trong game.
              </li>
              <li className="mb-2">
                Cá nhân hóa trải nghiệm của bạn và hiển thị nội dung phù hợp.
              </li>
              <li className="mb-2">
                Gửi thông báo, cập nhật, thông tin về sự kiện, và các thông tin tiếp thị (nếu bạn không từ chối).
              </li>
              <li className="mb-2">
                Phân tích và tối ưu hóa Dịch vụ của chúng tôi, bao gồm phát triển tính năng mới.
              </li>
              <li className="mb-2">
                Bảo vệ quyền, tài sản hoặc sự an toàn của chúng tôi, người dùng hoặc công chúng.
              </li>
              <li className="mb-2">
                Tuân thủ nghĩa vụ pháp lý.
              </li>
              <li className="mb-2">
                Quản lý hệ thống referral F1-F5 và phân phối hoa hồng.
              </li>
              <li className="mb-2">
                Xác minh và thực hiện các giao dịch blockchain.
              </li>
            </ul>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section4"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              4. Blockchain và Token $MSCI
            </h2>

            <p className="text-lg mb-4">
              Là một game blockchain, M-SCI có một số đặc điểm riêng biệt liên quan đến quyền riêng tư:
            </p>

            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                <span className="font-medium">Tính minh bạch của blockchain:</span> Các giao dịch blockchain, bao gồm chuyển token $MSCI, được ghi lại trên blockchain và có thể được xem bởi công chúng. Địa chỉ ví công khai và lịch sử giao dịch là thông tin công khai.
              </li>
              <li className="mb-2">
                <span className="font-medium">Quản lý token:</span> Chúng tôi xử lý thông tin liên quan đến việc mua bán, staking, và sử dụng token $MSCI trong hệ sinh thái M-SCI.
              </li>
              <li className="mb-2">
                <span className="font-medium">NFT và tài sản số:</span> Thông tin về quyền sở hữu nhân vật và vật phẩm ở dạng NFT được lưu trữ trên blockchain và quản lý bởi hệ thống của chúng tôi.
              </li>
              <li className="mb-2">
                <span className="font-medium">Smart Contracts:</span> Chúng tôi sử dụng smart contracts để thực hiện một số chức năng tự động như phân phối hoa hồng referral và thanh toán token.
              </li>
            </ul>

            <p className="text-lg mb-4">
              Vui lòng lưu ý rằng do bản chất của công nghệ blockchain, một khi thông tin đã được ghi lên blockchain, chúng tôi không thể xóa hoặc sửa đổi nó. Trước khi thực hiện bất kỳ giao dịch blockchain nào, hãy đảm bảo bạn hiểu rõ về tính chất công khai và không thể thay đổi của thông tin này.
            </p>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section5"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              5. Chia sẻ thông tin
            </h2>

            <p className="text-lg mb-4">
              Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:
            </p>

            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                <span className="font-medium">Với các thành viên Guild:</span> Khi bạn tham gia Guild, một số thông tin cơ bản và thông tin game (như lực chiến, thành tựu) có thể được chia sẻ với thành viên Guild khác.
              </li>
              <li className="mb-2">
                <span className="font-medium">Với đối tác kinh doanh:</span> Chúng tôi có thể chia sẻ thông tin với các nhà cung cấp dịch vụ để hỗ trợ hoạt động kinh doanh của chúng tôi, như nhà cung cấp dịch vụ thanh toán, nhà phát triển game, và nhà cung cấp dịch vụ phân tích.
              </li>
              <li className="mb-2">
                <span className="font-medium">Trong hệ thống Referral:</span> Thông tin về hoạt động chơi game và chi tiêu có thể được chia sẻ với người giới thiệu F1-F5 của bạn để tính toán hoa hồng.
              </li>
              <li className="mb-2">
                <span className="font-medium">Với người tham gia Center Market:</span> Khi bạn mua bán trên Center Market, thông tin về giao dịch được chia sẻ với bên tham gia giao dịch.
              </li>
              <li className="mb-2">
                <span className="font-medium">Vì lý do pháp lý:</span> Chúng tôi có thể chia sẻ thông tin để tuân thủ nghĩa vụ pháp lý, bảo vệ an toàn hoặc quyền của chúng tôi, người dùng hoặc công chúng.
              </li>
              <li className="mb-2">
                <span className="font-medium">Trong trường hợp chuyển nhượng kinh doanh:</span> Nếu M-SCI tham gia sáp nhập, mua lại hoặc bán tài sản, thông tin của bạn có thể được chuyển giao như một phần của giao dịch đó.
              </li>
              <li className="mb-2">
                <span className="font-medium">Với sự đồng ý của bạn:</span> Chúng tôi sẽ chia sẻ thông tin cá nhân với bên thứ ba khác khi bạn đồng ý rõ ràng.
              </li>
            </ul>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section6"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              6. Bảo mật thông tin
            </h2>

            <p className="text-lg mb-4">
              Chúng tôi đã triển khai các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn, bao gồm:
            </p>

            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                Mã hóa dữ liệu nhạy cảm sử dụng công nghệ SSL.
              </li>
              <li className="mb-2">
                Hạn chế truy cập vào thông tin cá nhân.
              </li>
              <li className="mb-2">
                Giám sát hệ thống để phát hiện các hoạt động bất thường.
              </li>
              <li className="mb-2">
                Thực hiện đánh giá rủi ro an ninh mạng thường xuyên.
              </li>
              <li className="mb-2">
                Triển khai xác thực hai yếu tố và các biện pháp bảo mật khác.
              </li>
            </ul>

            <p className="text-lg mb-4">
              Đối với ví blockchain và tài sản số, chúng tôi khuyến nghị bạn:
            </p>

            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                Sử dụng ví đáng tin cậy và giữ khóa riêng an toàn.
              </li>
              <li className="mb-2">
                Bật xác thực hai yếu tố cho tài khoản M-SCI.
              </li>
              <li className="mb-2">
                Thường xuyên cập nhật mật khẩu và không chia sẻ với người khác.
              </li>
              <li className="mb-2">
                Cẩn thận với các nỗ lực lừa đảo như phishing.
              </li>
            </ul>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section7"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              7. Quyền của bạn
            </h2>

            <p className="text-lg mb-4">
              Tùy thuộc vào luật áp dụng tại khu vực của bạn, bạn có thể có các quyền sau liên quan đến thông tin cá nhân:
            </p>

            <ol className="list-decimal pl-6 mb-6 text-lg">
              <li className="mb-2">
                <span className="font-medium">Quyền truy cập:</span> Yêu cầu bản sao thông tin cá nhân mà chúng tôi lưu trữ về bạn.
              </li>
              <li className="mb-2">
                <span className="font-medium">Quyền sửa đổi:</span> Yêu cầu sửa đổi thông tin không chính xác hoặc không đầy đủ.
              </li>
              <li className="mb-2">
                <span className="font-medium">Quyền xóa:</span> Yêu cầu xóa thông tin cá nhân của bạn trong một số trường hợp nhất định. Lưu ý rằng dữ liệu đã được ghi lên blockchain không thể xóa.
              </li>
              <li className="mb-2">
                <span className="font-medium">Quyền hạn chế xử lý:</span> Yêu cầu hạn chế việc xử lý thông tin cá nhân của bạn.
              </li>
              <li className="mb-2">
                <span className="font-medium">Quyền di chuyển dữ liệu:</span> Nhận thông tin cá nhân của bạn ở định dạng có cấu trúc, thông dụng.
              </li>
              <li className="mb-2">
                <span className="font-medium">Quyền phản đối:</span> Phản đối việc xử lý thông tin cá nhân của bạn trong một số trường hợp nhất định.
              </li>
              <li className="mb-2">
                <span className="font-medium">Quyền rút lại sự đồng ý:</span> Rút lại sự đồng ý xử lý thông tin cá nhân của bạn bất cứ lúc nào.
              </li>
            </ol>

            <p className="text-lg mb-4">
              Để thực hiện các quyền của mình, vui lòng liên hệ với chúng tôi theo thông tin trong phần &quot;Liên hệ với chúng tôi&quot;. Chúng tôi sẽ trả lời yêu cầu của bạn trong vòng 30 ngày hoặc theo thời hạn quy định bởi luật pháp hiện hành.
            </p>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section8"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              8. Trẻ em
            </h2>

            <p className="text-lg mb-4">
              Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu bạn là phụ huynh hoặc người giám hộ và tin rằng con bạn đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ với chúng tôi để xóa thông tin đó.
            </p>

            <p className="text-lg mb-4">
              Đối với người dùng từ 13 đến dưới 18 tuổi, chúng tôi khuyến khích phụ huynh giám sát hoạt động trực tuyến của con em mình và sử dụng tính năng Kiểm soát của phụ huynh có sẵn trong tài khoản M-SCI.
            </p>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section9"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              9. Chuyển dữ liệu quốc tế
            </h2>

            <p className="text-lg mb-4">
              M-SCI là một dịch vụ toàn cầu. Thông tin cá nhân của bạn có thể được chuyển, lưu trữ và xử lý ở các quốc gia khác ngoài nơi bạn cư trú, bao gồm Singapore và Hoa Kỳ. Các quốc gia này có thể có luật bảo vệ dữ liệu khác với quốc gia của bạn.
            </p>

            <p className="text-lg mb-4">
              Khi chúng tôi chuyển dữ liệu cá nhân qua biên giới, chúng tôi thực hiện các biện pháp bảo vệ phù hợp để đảm bảo dữ liệu của bạn được bảo vệ, bao gồm:
            </p>

            <ul className="list-disc pl-6 mb-6 text-lg">
              <li className="mb-2">
                Sử dụng điều khoản hợp đồng chuẩn được các cơ quan quản lý phê duyệt.
              </li>
              <li className="mb-2">
                Đảm bảo các bên nhận tuân thủ các chương trình chứng nhận bảo vệ dữ liệu quốc tế.
              </li>
              <li className="mb-2">
                Thực hiện đánh giá tác động đến quyền riêng tư khi cần thiết.
              </li>
            </ul>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section10"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              10. Thay đổi đối với Chính sách Quyền riêng tư
            </h2>

            <p className="text-lg mb-4">
              Chúng tôi có thể cập nhật Chính sách Quyền riêng tư này theo thời gian để phản ánh thay đổi về thực tiễn của chúng tôi hoặc vì các lý do hoạt động, pháp lý hoặc quy định khác. Khi có thay đổi quan trọng, chúng tôi sẽ thông báo cho bạn thông qua email hoặc thông báo trong game trước khi thay đổi có hiệu lực.
            </p>

            <p className="text-lg mb-4">
              Chúng tôi khuyến khích bạn xem xét Chính sách này định kỳ để biết thông tin mới nhất về cách chúng tôi bảo vệ thông tin cá nhân của bạn.
            </p>

            <div className="my-12 border-b border-[var(--accent-blue-bright)]/30"></div>

            <h2
              id="section11"
              className="text-3xl font-bold mt-12 mb-6 text-[var(--accent-blue-bright)]"
            >
              11. Liên hệ với chúng tôi
            </h2>

            <p className="text-lg mb-4">
              Nếu bạn có câu hỏi, quan ngại hoặc yêu cầu liên quan đến Chính sách Quyền riêng tư này hoặc cách chúng tôi xử lý thông tin cá nhân của bạn, vui lòng liên hệ với chúng tôi qua:
            </p>

            <div className="mb-6 text-lg">
              <p className="mb-2"><span className="font-medium">Cán bộ Bảo vệ Dữ liệu</span></p>
              <p className="mb-2"><span className="font-medium">Email:</span> Support@m-sci.net</p>
              <p className="mb-2"><span className="font-medium">Địa chỉ:</span> 10 Collyer Quay, Ocean Financial Centre, Singapore 049315</p>
              <p className="mb-2"><span className="font-medium">Điện thoại:</span> +65 6225 8480</p>
            </div>

            <p className="text-lg mb-8">
              Nếu bạn không hài lòng với cách chúng tôi giải quyết khiếu nại của mình, bạn có thể liên hệ với cơ quan bảo vệ dữ liệu tại quốc gia của bạn.
            </p>

            <div className="my-8 p-6 bg-[var(--accent-blue-bright)]/10 rounded-lg border border-[var(--accent-blue-bright)]/20">
              <p className="text-lg mb-0">
                Bằng việc sử dụng Dịch vụ của chúng tôi, bạn xác nhận rằng bạn đã đọc và hiểu Chính sách Quyền riêng tư này và đồng ý với việc thu thập, sử dụng và xử lý thông tin cá nhân của bạn như được mô tả trong tài liệu này.
              </p>
            </div>

            <div className="mt-16 pt-8 border-t border-[var(--accent-blue-bright)]/30 text-center">
              <p className="italic text-lg">
                © 2025 M-SCI Entertainment, Inc. Mọi quyền được bảo lưu.
              </p>
              <p className="italic text-lg">
                Chính sách Quyền riêng tư này được cập nhật lần cuối vào tháng 4 năm 2025.
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

        <div className="flex justify-center mb-10">
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
