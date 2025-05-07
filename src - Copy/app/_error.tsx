import { NextPage } from 'next';
import Link from 'next/link';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

interface ErrorProps {
  statusCode?: number;
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d14] to-[#121626] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-gradient-to-br from-[#121626] to-[#0d1018] border border-red-900/20 rounded-xl p-8 shadow-xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FaExclamationTriangle className="text-red-500 text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {statusCode ? `Lỗi ${statusCode}` : "Đã xảy ra lỗi"}
          </h2>
          <p className="text-gray-400 mb-8">Chúng tôi đã ghi nhận sự cố này và đang nỗ lực khắc phục.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              Thử lại
            </button>
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 bg-transparent border border-gray-800 hover:border-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              <FaHome /> Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage; 