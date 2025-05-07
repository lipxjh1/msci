/* Hàm xử lý dữ liệu anh hùng */ 

import { AnhHung, VaiTro, DoHiEm } from '../loai';

/**
 * Dữ liệu mẫu các vai trò
 */
export const DU_LIEU_VAI_TRO: VaiTro[] = [
  {
    id: 1,
    ten: 'Gunner',
    mo_ta: 'Tấn công tầm xa, tốc độ cao'
  },
  {
    id: 2,
    ten: 'Sniper',
    mo_ta: 'Sát thương đơn mục tiêu chính xác'
  },
  {
    id: 3,
    ten: 'Rocket',
    mo_ta: 'Sát thương diện rộng, tốc độ chậm'
  }
];

/**
 * Dữ liệu mẫu các độ hiếm
 */
export const DU_LIEU_DO_HIEM: DoHiEm[] = [
  {
    id: 1,
    ma: 'C',
    ten: 'Common',
    mau_sac: '#4CAF50'
  },
  {
    id: 2,
    ma: 'B',
    ten: 'Rare',
    mau_sac: '#2196F3'
  },
  {
    id: 3,
    ma: 'A',
    ten: 'Epic',
    mau_sac: '#9C27B0'
  },
  {
    id: 4,
    ma: 'S',
    ten: 'Legendary',
    mau_sac: '#F44336'
  }
];

/**
 * Dữ liệu mẫu của các anh hùng
 */
export const DU_LIEU_ANH_HUNG: AnhHung[] = [
  {
    id: '1',
    ten: 'Marcus',
    vai_tro_id: 1,
    do_hi_em_id: 1,
    toc_do_ban: '1s/10 phát bắn',
    dac_diem: '-50% ứng khí tấn công Drone và Shield',
    ky_nang: null,
    anh_dai_dien: '/tai_nguyen/anh_hung/marcus.png',
    // Dữ liệu join
    vai_tro: DU_LIEU_VAI_TRO[0],
    do_hi_em: DU_LIEU_DO_HIEM[0]
  },
  {
    id: '2',
    ten: 'David',
    vai_tro_id: 2,
    do_hi_em_id: 1,
    toc_do_ban: '1s/1 phát bắn',
    dac_diem: '+10 ứng vào Drone',
    ky_nang: null,
    anh_dai_dien: '/tai_nguyen/anh_hung/david.png',
    // Dữ liệu join
    vai_tro: DU_LIEU_VAI_TRO[1],
    do_hi_em: DU_LIEU_DO_HIEM[0]
  },
  {
    id: '3',
    ten: 'Fiona',
    vai_tro_id: 3,
    do_hi_em_id: 2,
    toc_do_ban: '3s/1 phát bắn',
    dac_diem: '+10 ứng vào Shield',
    ky_nang: null,
    anh_dai_dien: '/tai_nguyen/anh_hung/fiona.png',
    // Dữ liệu join
    vai_tro: DU_LIEU_VAI_TRO[2],
    do_hi_em: DU_LIEU_DO_HIEM[1]
  },
  {
    id: '4',
    ten: 'Asane',
    vai_tro_id: 1,
    do_hi_em_id: 4,
    toc_do_ban: '1s/10 phát bắn',
    dac_diem: '-50% ứng khí tấn công Drone và Shield',
    ky_nang: 'Shooting Star: Bắn tất cả Robot trong 3s nhưng giảm sát thương',
    anh_dai_dien: '/tai_nguyen/anh_hung/asane.png',
    // Dữ liệu join
    vai_tro: DU_LIEU_VAI_TRO[0],
    do_hi_em: DU_LIEU_DO_HIEM[3]
  }
]; 