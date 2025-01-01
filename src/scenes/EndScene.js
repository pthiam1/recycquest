export default class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    init(data) {
        this.finalScore = data.score;
    }

    preload() {
        // Loading the background image
        this.load.image('background', 'images/arrier_plan2.jpg');
    }

    create() {
        // Adding a background image
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'background')
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);


        // Centered text configuration
        const textStyle = { fontSize: '32px', fill: '#ffffff', align: 'center', fontStyle: 'bold' };
        const scoreStyle = { ...textStyle, fontSize: '48px' };
        const buttonStyle = { ...textStyle, fill: '#ff0000' };

        // Displaying the final score
        this.add.text(this.sys.game.config.width / 2, 200, 'Fin du jeu', textStyle)
            .setOrigin(0.5);
        this.add.text(this.sys.game.config.width / 2, 250, `Score final : ${this.finalScore}`, scoreStyle)
            .setOrigin(0.5);

        // "Rejouer" button
        const replayButton = this.add.text(this.sys.game.config.width / 2, 350, 'Rejouer', { ...buttonStyle, fill: '#ffff00' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('LevelScene'));

            //hover
            replayButton.on('pointerover', () => {
                replayButton.setStyle({ fill: '#ff0' });
            });

            //unhover
            replayButton.on('pointerout', () => {
                replayButton.setStyle({ fill: '#fff' });
            });

        // "Menu Principal" button
        const menuButton = this.add.text(this.sys.game.config.width / 2, 400, 'Menu Principal', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}
