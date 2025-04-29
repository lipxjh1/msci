// Script để tải hình ảnh Pokemon
const fs = require('fs');
const path = require('path');
const https = require('https');

const POKEMON_COUNT = 50; // Số lượng Pokemon cần tải
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'pokemon');

// Đảm bảo thư mục tồn tại
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log(`Đã tạo thư mục: ${IMAGES_DIR}`);
}

function downloadImage(id) {
  return new Promise((resolve, reject) => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const filePath = path.join(IMAGES_DIR, `${id}.png`);
    
    // Kiểm tra xem file đã tồn tại chưa
    if (fs.existsSync(filePath)) {
      console.log(`File đã tồn tại: ${filePath}`);
      resolve();
      return;
    }
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, response => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Đã tải xong Pokemon #${id}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filePath, () => {}); // Xóa file nếu có lỗi
      console.error(`Lỗi khi tải Pokemon #${id}:`, err.message);
      reject(err);
    });
  });
}

async function downloadAllPokemon() {
  console.log(`Bắt đầu tải ${POKEMON_COUNT} hình ảnh Pokemon...`);
  
  const promises = [];
  
  for (let i = 1; i <= POKEMON_COUNT; i++) {
    promises.push(downloadImage(i));
    
    // Đợi một khoảng thời gian để tránh quá tải server
    if (i % 10 === 0) {
      await Promise.all(promises);
      promises.length = 0;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  await Promise.all(promises);
  console.log('Hoàn tất tải hình ảnh Pokemon!');
}

downloadAllPokemon().catch(error => {
  console.error('Có lỗi xảy ra:', error);
}); 