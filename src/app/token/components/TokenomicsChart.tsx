'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import Chart.js component dynamically để tránh lỗi SSR
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), {
  ssr: false,
});

// Import required Chart.js items
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale);

// Dữ liệu phân bổ token
const tokenDistribution = [
  { id: 1, name: 'Play-to-Earn', percentage: 30, color: '#3B82F6' },
  { id: 2, name: 'Team & Advisors', percentage: 15, color: '#8B5CF6' },
  { id: 3, name: 'Private Sale', percentage: 10, color: '#EC4899' },
  { id: 4, name: 'Public Sale', percentage: 5, color: '#F97316' },
  { id: 5, name: 'Ecosystem Fund', percentage: 15, color: '#10B981' },
  { id: 6, name: 'Marketing', percentage: 10, color: '#F59E0B' },
  { id: 7, name: 'Liquidity', percentage: 10, color: '#6366F1' },
  { id: 8, name: 'Reserve', percentage: 5, color: '#64748B' }
];

const TokenomicsChart = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const chartRef = useRef<any>(null);

  // Cấu hình chart data
  const chartData = {
    labels: tokenDistribution.map(item => item.name),
    datasets: [
      {
        data: tokenDistribution.map(item => item.percentage),
        backgroundColor: tokenDistribution.map(item => item.color),
        borderColor: tokenDistribution.map(item => item.color),
        borderWidth: 1,
        hoverOffset: 15
      }
    ]
  };

  // Cấu hình chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    cutout: '65%',
    animation: {
      animateRotate: true,
      animateScale: true
    },
    onHover: (event: any, elements: any) => {
      if (elements && elements.length > 0) {
        setActiveSegment(elements[0].index);
      } else {
        setActiveSegment(null);
      }
    }
  };

  // Xử lý tương tác giữa chart và legend
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      
      // Khi hover vào legend, highlight phần tương ứng trong chart
      chart.canvas.addEventListener('mousemove', (e: MouseEvent) => {
        const element = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
        if (element.length > 0) {
          setActiveSegment(element[0].index);
        } else {
          setActiveSegment(null);
        }
      });
      
      chart.canvas.addEventListener('mouseout', () => {
        setActiveSegment(null);
      });
    }
  }, [chartRef.current]);

  return (
    <div className="mb-20 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            MÔ HÌNH KINH TẾ TOKEN
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="mb-6">
            <h3 className="font-rajdhani text-xl font-bold text-white mb-3">Thông Số Kỹ Thuật</h3>
            <div className="space-y-3 font-rajdhani text-gray-300">
              <p className="flex justify-between">
                <span>Tên:</span>
                <span className="text-white font-medium">M-SCI Token</span>
              </p>
              <p className="flex justify-between">
                <span>Symbol:</span>
                <span className="text-white font-medium">$MSCI</span>
              </p>
              <p className="flex justify-between">
                <span>Blockchain:</span>
                <span className="text-white font-medium">BNB Chain (BEP-20)</span>
              </p>
              <p className="flex justify-between">
                <span>Tổng cung:</span>
                <span className="text-white font-medium">1,000,000,000 MSCI</span>
              </p>
              <p className="flex justify-between">
                <span>Cung lưu hành ban đầu:</span>
                <span className="text-white font-medium">150,000,000 MSCI</span>
              </p>
              <p className="flex justify-between">
                <span>Độ chính xác:</span>
                <span className="text-white font-medium">18 decimals</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-rajdhani text-xl font-bold text-white mb-3">Cơ Chế Chống Lạm Phát</h3>
            <ul className="list-disc list-inside space-y-2 font-rajdhani text-gray-300">
              <li><span className="text-[var(--accent-blue-bright)]">Đốt token định kỳ:</span> 30% phí giao dịch bị đốt</li>
              <li><span className="text-[var(--accent-blue-bright)]">Vesting schedule:</span> Khóa token team và nhà đầu tư</li>
              <li><span className="text-[var(--accent-blue-bright)]">Dynamic rewards:</span> Điều chỉnh phần thưởng theo cung-cầu</li>
              <li><span className="text-[var(--accent-blue-bright)]">Buyback program:</span> Mua lại và đốt token từ lợi nhuận</li>
            </ul>
          </div>
        </div>
        
        <div>
          <div className="relative h-80 w-full mx-auto">
            {/* Biểu đồ phân bổ token */}
            <Chart ref={chartRef} data={chartData} options={chartOptions} />
            
            {/* Hiển thị tổng token ở giữa biểu đồ */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-white font-bold text-3xl font-orbitron text-shadow-blue">1B</p>
              <p className="text-gray-400 font-medium font-rajdhani">MSCI</p>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {tokenDistribution.map((item, index) => (
              <div 
                key={item.id}
                className={`flex items-center gap-2 transition-opacity duration-200 cursor-pointer ${
                  activeSegment !== null && activeSegment !== index ? 'opacity-60' : 'opacity-100'
                }`}
                onMouseEnter={() => setActiveSegment(index)}
                onMouseLeave={() => setActiveSegment(null)}
                title={`${item.name}: ${item.percentage}%`}
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-rajdhani text-sm text-white whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.name} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsChart; 