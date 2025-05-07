class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    create ()
    {
        this.registry.set('highscore', 0);

        this.scene.start('Preloader');
    }
}

class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MainMenu');

        this.music;
    }

    create ()
    {
        let background = this.add.image(400, 300, 'background');

        this.tweens.add({
            targets: background,
            alpha: { from: 0, to: 1 },
            duration: 1000
        });

        const fontStyle = {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            fontStyle: 'bold',
            padding: 16,
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 4
            }
        };

        this.add.text(20, 20, 'High Score: ' + this.registry.get('highscore'), fontStyle);

        let logo = this.add.image(400, -200, 'logo');

        // Comment out audio for now to prevent errors
        /*
        if (!this.music)
        {
            this.music = this.sound.play('music', { loop: true });
        }
        */

        this.tweens.add({
            targets: logo,
            y: 180,
            ease: 'bounce.out',
            duration: 1200
        });

        // Instructions text
        const instructionsStyle = {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            align: 'center',
            padding: 16,
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 1,
                offsetY: 1,
                blur: 2
            }
        };

        this.add.text(400, 380, 'Match pairs of MSCI emojis\nto score points!', instructionsStyle).setOrigin(0.5);
        this.add.text(400, 480, 'Click to Start', instructionsStyle).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('MainGame');
        });
    }
}

class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('Preloader');

        this.loadText;
    }

    preload ()
    {
        this.loadText = this.add.text(400, 360, 'Loading...', { fontFamily: 'Arial', fontSize: 64, color: '#e3f2ed' });

        this.loadText.setOrigin(0.5);
        this.loadText.setStroke('#203c5b', 6);
        this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

        // Load images
        this.load.image('background', '/images/overwatch_bg_2.jpg');
        this.load.image('logo', '/images/overwatch_logo.png');
    }

    create ()
    {
        if (this.sound.locked)
        {
            this.loadText.setText('Click to Start');

            this.input.once('pointerdown', () => {
                this.scene.start('MainMenu');
            });
        }
        else
        {
            this.scene.start('MainMenu');
        }
    }
}

class MainGame extends Phaser.Scene
{
    constructor ()
    {
        super('MainGame');

        this.emojis;

        this.circle1;
        this.circle2;

        this.child1;
        this.child2;

        this.selectedEmoji = null;
        this.matched = false;

        this.score = 0;
        this.highscore = 0;
        this.scoreText;

        this.timer;
        this.timerText;
        
        this.pairs = 0;
        this.totalPairs = 8;
        this.gameStarted = false;
        
        // Create emoji colors and symbols arrays - loại bỏ màu đen và thêm nhiều màu sáng
        this.emojiColors = [
            0xFF5733, // Red
            0x33FF57, // Green
            0x3357FF, // Blue
            0xFFFF33, // Yellow
            0xFF33FF, // Magenta
            0x33FFFF, // Cyan
            0xFF9933, // Orange
            0x9933FF, // Purple
            0x33FF99, // Teal
            0xFF3399, // Pink
            0x99FF33, // Lime
            0x3399FF, // Sky Blue
            0xAA7942, // Brown
            0xFFC0CB, // Light Pink
            0xFFD700, // Gold
            0x40E0D0  // Turquoise
        ];
        
        this.emojiSymbols = ['❤', '★', '♦', '♠', '♣', '♫', '☀', '☁', '☂', '✓', '✕', '✪', '⚡', '⚽', '⚙', '⚓'];
    }

    create ()
    {
        this.add.image(400, 300, 'background');

        this.circle1 = this.add.circle(0, 0, 42).setStrokeStyle(3, 0xf8960e);
        this.circle2 = this.add.circle(0, 0, 42).setStrokeStyle(3, 0x00ff00);

        this.circle1.setVisible(false);
        this.circle2.setVisible(false);

        // Create emoji sprites manually instead of loading from a spritesheet
        this.emojis = this.add.group();
        
        // Tạo gradient màu sắc tươi sáng cho các emoji
        const brightColors = [
            0xFF5733, // Red
            0x33FF57, // Green
            0x3357FF, // Blue
            0xFFFF33, // Yellow
            0xFF33FF, // Magenta
            0x33FFFF, // Cyan
            0xFF9933, // Orange
            0x9933FF, // Purple
            0x33FF99, // Teal
            0xFF3399, // Pink
            0x99FF33, // Lime
            0x3399FF, // Sky Blue
            0xAA7942, // Brown
            0xFFC0CB, // Light Pink
            0xFFD700, // Gold
            0x40E0D0  // Turquoise
        ];
        
        // Create a 4x4 grid of emoji sprites
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const posX = 280 + (x * 90);
                const posY = 200 + (y * 90);
                
                // Chọn màu ngẫu nhiên từ danh sách màu sáng
                const colorIndex = Phaser.Math.Between(0, brightColors.length - 1);
                const bg = this.add.circle(0, 0, 30, brightColors[colorIndex]);
                
                // Add stroke around the circle
                bg.setStrokeStyle(2, 0xFFFFFF);
                
                // Add a text symbol in the center
                const symbolIndex = Phaser.Math.Between(0, this.emojiSymbols.length - 1);
                const text = this.add.text(0, 0, this.emojiSymbols[symbolIndex], {
                    fontFamily: 'Arial',
                    fontSize: 24,
                    color: '#FFFFFF'
                }).setOrigin(0.5);
                
                // Group the background and text as a container and position it correctly
                const container = this.add.container(posX, posY, [bg, text]);
                
                // Set data properties to identify matching pairs
                container.setData('colorIndex', colorIndex);
                container.setData('symbolIndex', symbolIndex);
                container.setData('x', posX);
                container.setData('y', posY);
                
                // Make the container interactive
                container.setSize(60, 60); // Set hit area size
                container.setInteractive();
                
                // Add to the group
                this.emojis.add(container);
            }
        }

        const fontStyle = {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            fontStyle: 'bold',
            padding: 16,
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 4
            }
        };

        this.timerText = this.add.text(20, 20, '30:00', fontStyle);
        this.scoreText = this.add.text(530, 20, 'Pairs: 0/' + this.totalPairs, fontStyle);

        this.input.on('gameobjectdown', this.selectEmoji, this);
        
        // Instructions text
        const instructionsStyle = {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            align: 'center',
            padding: 16,
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 1,
                offsetY: 1,
                blur: 2
            }
        };

        this.startText = this.add.text(400, 300, 'Click anywhere to start!', instructionsStyle).setOrigin(0.5);
        
        this.input.once('pointerdown', this.start, this);

        this.highscore = this.registry.get('highscore');

        this.arrangeGrid();
    }

    arrangeGrid ()
    {
        let children = this.emojis.getChildren();
        
        // Chọn 15 loại emoji khác nhau
        let indices = Phaser.Utils.Array.Shuffle([...Array(this.emojiColors.length).keys()]);
        let uniqueIndices = indices.slice(0, 15);
        
        // Gán 14 emoji khác nhau và 1 cặp giống nhau
        // Chọn ngẫu nhiên vị trí cho cặp trùng
        let positions = Phaser.Utils.Array.Shuffle([...Array(16).keys()]);
        let matchPos1 = positions[0];
        let matchPos2 = positions[1];
        let matchIndex = uniqueIndices[0]; // Chọn emoji đầu tiên làm cặp trùng
        
        console.log('Cặp trùng ở vị trí:', matchPos1, matchPos2);
        
        // Gán emoji cho các container
        let currentUnique = 1; // Bắt đầu từ 1 vì đã dùng 0 làm cặp trùng
        
        for (let i = 0; i < 16; i++) {
            const container = children[i];
            let colorIndex;
            
            if (i === matchPos1 || i === matchPos2) {
                // Đây là vị trí của cặp trùng nhau
                colorIndex = matchIndex;
                // Lưu lại để kiểm tra sau này
                if (i === matchPos1) {
                    this.child1 = container;
                } else {
                    this.child2 = container;
                }
            } else {
                // Đây là emoji duy nhất
                colorIndex = uniqueIndices[currentUnique];
                currentUnique++;
            }
            
            // Đảm bảo màu không phải màu đen
            let color = this.emojiColors[colorIndex % this.emojiColors.length];
            
            // Nếu màu quá tối, thay thế bằng màu sáng
            if (this.isColorTooDark(color)) {
                color = this.getBrightColor();
            }
            
            // Cập nhật màu nền
            const bg = container.getAt(0);
            bg.fillColor = color;
            
            // Cập nhật biểu tượng
            const text = container.getAt(1);
            text.setText(this.emojiSymbols[colorIndex % this.emojiSymbols.length]);
            
            // Cập nhật dữ liệu
            container.setData('colorIndex', colorIndex);
            container.setData('symbolIndex', colorIndex);
            
            // Đảm bảo tất cả emoji đều hiển thị
            container.setVisible(true);
        }
    }

    // Kiểm tra màu có quá tối không
    isColorTooDark(color) {
        // Chuyển mã màu hex sang RGB
        const r = (color >> 16) & 0xFF;
        const g = (color >> 8) & 0xFF;
        const b = color & 0xFF;
        
        // Tính độ sáng (luminance)
        // Công thức: 0.299*R + 0.587*G + 0.114*B
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Nếu độ sáng dưới 50, coi là màu tối
        return luminance < 50;
    }
    
    // Lấy một màu sáng ngẫu nhiên
    getBrightColor() {
        const brightColors = [
            0xFF5733, // Red
            0x33FF57, // Green
            0xFFFF33, // Yellow
            0xFF33FF, // Magenta
            0x33FFFF, // Cyan
            0xFF9933, // Orange
            0xFFD700, // Gold
            0xFFC0CB  // Light Pink
        ];
        
        return brightColors[Phaser.Math.Between(0, brightColors.length - 1)];
    }

    start ()
    {
        this.gameStarted = true;
        this.startText.setVisible(false);
        
        this.score = 0;
        this.pairs = 0;
        this.matched = false;

        this.timer = this.time.addEvent({ delay: 30000, callback: this.gameOver, callbackScope: this });
    }

    selectEmoji (pointer, emoji)
    {
        if (!this.gameStarted || this.matched)
        {
            return;
        }

        // Is this the first or second selection?
        if (!this.selectedEmoji)
        {
            // Our first emoji
            this.circle1.setPosition(emoji.x, emoji.y);
            this.circle1.setVisible(true);

            this.selectedEmoji = emoji;
        }
        else if (emoji !== this.selectedEmoji)
        {
            // Our second emoji

            // Is it a match?
            if (emoji.getData('colorIndex') === this.selectedEmoji.getData('colorIndex'))
            {
                this.matched = true;
                this.pairs++;
                
                this.circle1.setStrokeStyle(3, 0x00ff00);
                this.circle2.setPosition(emoji.x, emoji.y);
                this.circle2.setVisible(true);

                this.tweens.add({
                    targets: [this.selectedEmoji, emoji],
                    scale: 1.4,
                    angle: '-=30',
                    yoyo: true,
                    ease: 'sine.inout',
                    duration: 300,
                    completeDelay: 200,
                    onComplete: () => {
                        // Xóa vòng tròn chọn
                        this.circle1.setVisible(false);
                        this.circle2.setVisible(false);
                        this.circle1.setStrokeStyle(3, 0xf8960e);

                        // Tăng điểm
                        this.score += 100;
                        this.scoreText.setText('Pairs: ' + this.pairs + '/' + this.totalPairs);

                        // Nếu chưa đủ số cặp để kết thúc game, tạo màn mới
                        if (this.pairs < this.totalPairs) {
                            // Stagger tween them all out
                            this.tweens.add({
                                targets: this.emojis.getChildren(),
                                scale: 0,
                                ease: 'power2',
                                duration: 600,
                                delay: this.tweens.stagger(100, { grid: [4, 4], from: 'center' }),
                                onComplete: () => {
                                    // Reset và tạo màn mới
                                    this.arrangeGrid();
                                    
                                    // Hiệu ứng xuất hiện
                                    this.tweens.add({
                                        targets: this.emojis.getChildren(),
                                        scale: { start: 0, from: 0, to: 1 },
                                        ease: 'bounce.out',
                                        duration: 600,
                                        delay: this.tweens.stagger(100, { grid: [4, 4], from: 'center' }),
                                        onComplete: () => {
                                            // Reset lại trạng thái
                                            this.matched = false;
                                            this.selectedEmoji = null;
                                        }
                                    });
                                }
                            });
                        } else {
                            // Đã hoàn thành tất cả các cặp, kết thúc game
                            this.gameOver();
                        }
                    }
                });
            }
            else
            {
                // Not a match, reset after a short delay
                this.matched = true;

                this.time.delayedCall(600, () => {
                    this.circle1.setVisible(false);
                    this.matched = false;
                    this.selectedEmoji = null;
                });
            }
        }
    }

    updateTimer ()
    {
        const timeLeft = Math.ceil(this.timer.getRemainingSeconds());
        this.timerText.setText(timeLeft + ':00');
    }

    update ()
    {
        if (this.timer && this.gameStarted)
        {
            this.updateTimer();
        }
    }

    gameOver ()
    {
        this.gameStarted = false;
        
        // Calculate score based on pairs found and time remaining
        let finalScore = this.pairs * 100;
        
        if (this.timer && this.timer.getProgress() < 1)
        {
            // Add bonus for remaining time
            const timeLeft = Math.ceil(this.timer.getRemainingSeconds());
            finalScore += timeLeft * 10;
        }
        
        this.score = finalScore;
        
        if (this.score > this.highscore)
        {
            this.highscore = this.score;
            this.registry.set('highscore', this.highscore);
        }

        // Disable input
        this.input.off('gameobjectdown');

        // Display game over text
        const gameOverStyle = {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            align: 'center',
            padding: 16,
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 4
            }
        };

        const gameOverText = this.add.text(400, 250, 'Game Over!', gameOverStyle).setOrigin(0.5);
        
        const scoreStyle = {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            align: 'center'
        };
        
        const scoreText = this.add.text(400, 320, 'Score: ' + this.score, scoreStyle).setOrigin(0.5);
        const highScoreText = this.add.text(400, 370, 'High Score: ' + this.highscore, scoreStyle).setOrigin(0.5);
        
        this.add.text(400, 450, 'Click to play again', scoreStyle).setOrigin(0.5);

        // Allow restart
        this.input.once('pointerdown', () => {
            this.scene.start('MainGame');
        });
    }
}

// Khởi tạo game Phaser ở cuối file
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#008eb0',
    parent: 'phaser-container',
    scene: [ Boot, Preloader, MainMenu, MainGame ]
};

// Khởi tạo game khi trang đã tải xong
window.onload = function() {
    const game = new Phaser.Game(config);
}; 