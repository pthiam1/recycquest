import { niveaux } from '../data.js';

export default class LevelScene extends Phaser.Scene {
    constructor() {
        super('LevelScene');
    }

    preload() {
        // Charger les images de fond et autres ressources nécessaires
        this.load.image('background1', 'images/arrier_plan2.jpg'); 
    }

    create() {
        // Ajouter l'image de fond
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'background1').setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // Ajouter un arrière-plan noir transparent pour le texte
        const textBackground = this.add.graphics();
        textBackground.fillStyle(0x000000, 0.5);
       
        textBackground.fillRect(50, 100, this.sys.game.config.width - 100, 300);

        this.add.text(this.sys.game.config.width / 2, 50, 'Choisissez votre niveau', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Liste des niveaux
        const levelHeight = 150;
        niveaux.forEach((niveau, index) => {
            const levelText = this.add.text(this.sys.game.config.width / 2, levelHeight + index * 60, `${niveau.nom}`, {
                fontSize: '28px',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.startGame(niveau));

            //hover
            levelText.on('pointerover', () => {
                levelText.setStyle({ fill: '#ff0' });
            });

            //unhover
            levelText.on('pointerout', () => {
                levelText.setStyle({ fill: '#fff' });
            });
        });

        // Bouton de retour au menu en bas en vert
        const backButton = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 50, 'Retour', {
            fontSize: '28px',
            fill: '#00ff00',
            fontStyle: 'bold'
        })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('MenuScene'));

        backButton.setOrigin(0.5);
    }

    startGame(niveau) {
        // Passer à la scène de jeu avec le niveau choisi
        this.scene.start('GameScene', { level: niveau.id });
    }
}
