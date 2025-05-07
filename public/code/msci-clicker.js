export class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image("preloader", "/images/particle_overlay.png");
    }

    create ()
    {
        //  A global value to store the highscore in
        this.registry.set('highscore', 0);

        this.scene.start('Preloader');
    }
}

export class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //  Get the current highscore from the registry
        const score = this.registry.get('highscore');

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(512, 384, 'background');

        const logo = this.add.image(512, -270, 'logo');

        this.tweens.add({
            targets: logo,
            y: 270,
            duration: 1000,
            ease: 'Bounce'
        });

        this.add.text(32, 32, `High Score: ${score}`, textStyle);

        const instructions = [
            "How many MSCI coins can you",
            "collect in 10 seconds?",
            "",
            "Click to Start!"
        ]

        this.add.text(512, 550, instructions, textStyle).setAlign('center').setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('ClickerGame');
        });
    }
}

export class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super("Preloader");
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, "preloader");

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });
    }

    preload ()
    {
        //  Load the assets for the game
        this.load.image("background", "/images/overwatch_bg_2.jpg");
        this.load.image("logo", "/images/overwatch_logo.png");
        this.load.image('coin', "/images/coin/Ellipse 609.png");
    }

    create ()
    {
        // Since we're using a single image for the coin and not an atlas, 
        // we don't need to create animations for coin rotation or vanishing.
        
        // Transition to the MainMenu scene
        this.scene.transition({
            target: 'MainMenu',
            duration: 1000,
            moveBelow: true,
            onUpdate: (progress) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });
    }
}

export class ClickerGame extends Phaser.Scene
{
    constructor ()
    {
        super('ClickerGame');
    }

    create ()
    {
        this.score = 0;
        this.coins = [];

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(512, 384, 'background');

        this.scoreText = this.add.text(32, 32, "MSCI: 0", textStyle).setDepth(1);
        this.timeText = this.add.text(1024 - 32, 32, "Time: 10", textStyle).setOrigin(1, 0).setDepth(1);

        //  Our 10 second timer. It starts automatically when the scene is created.
        this.timer = this.time.addEvent({ delay: 10000, callback: () => this.gameOver() });

        this.physics.world.setBounds(0, -400, 1024, 768 + 310);

        for (let i = 0; i < 32; i++)
        {
            this.dropCoin();
        }

        this.input.on('gameobjectdown', (pointer, gameObject) => this.clickCoin(gameObject));
    }

    dropCoin ()
    {
        const x = Phaser.Math.Between(128, 896);
        const y = Phaser.Math.Between(0, -400);

        const coin = this.physics.add.sprite(x, y, 'coin');
        
        // Add rotation animation using tweens since we don't have atlas frames
        this.tweens.add({
            targets: coin,
            angle: 360,
            duration: 1500,
            repeat: -1
        });

        coin.setVelocityX(Phaser.Math.Between(-400, 400));
        coin.setCollideWorldBounds(true);
        coin.setBounce(0.9);
        coin.setInteractive();

        this.coins.push(coin);
    }

    clickCoin (coin)
    {
        //  Disable the coin from being clicked
        coin.disableInteractive();

        //  Stop it from moving
        coin.setVelocity(0, 0);

        // Instead of playing a vanish animation, just scale down the coin
        this.tweens.add({
            targets: coin,
            scale: 0,
            duration: 300,
            onComplete: () => coin.destroy()
        });

        //  Add 1 to the score
        this.score++;

        //  Update the score text
        this.scoreText.setText("MSCI: " + this.score);

        //  Drop a new coin
        this.dropCoin();
    }

    update ()
    {
        this.timeText.setText("Time: " + Math.ceil(this.timer.getRemainingSeconds()));
    }

    gameOver ()
    {
        this.coins.forEach((coin) => {
            if (coin.active)
            {
                coin.setVelocity(0, 0);
                
                // Scale down and fade out coins
                this.tweens.add({
                    targets: coin,
                    scale: 0,
                    alpha: 0,
                    duration: 300
                });
            }
        });

        this.input.off('gameobjectdown');

        //  Save our highscore to the registry
        const highscore = this.registry.get('highscore');

        if (this.score > highscore)
        {
            this.registry.set('highscore', this.score);
        }

        //  Swap to the GameOver scene after a 2 second delay
        this.time.delayedCall(2000, () => this.scene.start('GameOver'));
    }
}

export class GameOver extends Phaser.Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        //  Get the current highscore from the registry
        const score = this.registry.get('highscore');

        const textStyle = { fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(512, 384, 'background');

        this.add.text(512, 300, `Game Over\n\nHigh Score: ${score}`, textStyle).setAlign('center').setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

// Main game configuration
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: "phaser-container",
    backgroundColor: "#028af8",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 400 }
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        ClickerGame,
        GameOver
    ]
};

export default new Phaser.Game(config); 