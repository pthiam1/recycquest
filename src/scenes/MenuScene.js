export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        // Charger le son de bienvenue
        this.load.audio('welcome', './son/welcome.mp3');
        
        // Charger l'image de fond et les images des boutons
        this.load.image('background', './images/arriere_plan.png');
        this.load.image('playButton', './images/commencez.png');
        this.load.image('instructionsButton', './images/information.png');
    }

    create() {

        // Jouer le son de bienvenue au démarrage
        this.playWelcomeSound();
       

        // Ajouter l'image de fond du menu (centrée et couvrant tout l'écran)
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'background')
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // Titre du jeu
        this.add.text(this.sys.game.config.width / 2, 200, 'RecycQuest', {
            fontSize: '58px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);  // Centrer le titre

        
        // Créer les boutons à partir des images
        this.createButton(this.sys.game.config.width / 2, this.sys.game.config.height - 100, 'playButton', () => {
            this.stopWelcomeSound();  // Arrêter le son

            //
            this.scene.start('LevelScene');
        });

       
        this.createButton(this.sys.game.config.width - 100 , this.sys.game.config.height - 50, 'instructionsButton', () => {
            this.scene.start('InstructionsScene');
        });

    }

    // Fonction pour jouer le son de bienvenue
    playWelcomeSound() {
        this.welcomeSound = this.sound.add('welcome');
        this.welcomeSound.play();
    }

    // Fonction pour arrêter le son de bienvenue
    stopWelcomeSound() {
        if (this.welcomeSound) {
            this.welcomeSound.stop();
        }
    }

    // Fonction pour créer un bouton à partir d'une image
    createButton(x, y, imageKey, callback, size = 1) {
        const button = this.add.image(x, y, imageKey)
            .setInteractive()
            .on('pointerdown', callback)
            .setOrigin(0.5) 
            .setScale(size); 

        //hover effect
        button.on('pointerover', () => {
            button.setScale(size * 1.2);
            button.setTint(0x808080); 
        });
        button.on('pointerout', () => {
            button.setScale(size);
            button.clearTint();
        });
    
        return button;
    }
}
