export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
    }

    preload() {
        // Charger l'image de fond
        this.load.image('background', './images/arriere_plan2.png');
    }

    create() {
        // Ajouter l'image de fond du menu (centrée et couvrant tout l'écran)
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'background')
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // Titre du jeu
        this.add.text(this.sys.game.config.width / 2, 50, 'RecycQuest', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Introduction et explication du jeu
        const instructionsText = [
            'RecycQuest est un jeu de tri de déchets où vous devez',
            'placer les déchets dans la bonne poubelle.',
            '',
            'Il y a 3 types de déchets :',
            '- Déchets recyclables',
            '- Déchets organiques',
            '- Déchets non recyclables',
            '',
            'Instructions du jeu :',
            '1. Capturez les déchets qui tombent.',
            '2. Placez-les dans la bonne poubelle.',
            '3. Chaque bon tri rapporte 10 points.',
            '4. Une erreur réduit vos vies de 1.'
        ];

        // Ajouter le texte des instructions
        let yPosition = 120;
        instructionsText.forEach(line => {
        const textBackground = this.add.graphics();
        textBackground.fillStyle(0x000000, 0.5); // Noir avec 50% de transparence
        textBackground.fillRect(50, yPosition - 10, this.sys.game.config.width - 100, 30);
            this.add.text(this.sys.game.config.width / 2, yPosition, line, { fontSize: '20px', fill: '#ffffff', fontStyle: 'bold' })
                .setOrigin(0.5);
            yPosition += 30; // Espacement entre les lignes
        });

        // Bouton "Retour au menu"
        const backButton = this.createButton(this.sys.game.config.width / 2, yPosition + 40, 'Retour', () => {
            this.scene.start('MenuScene');
        });
    }

    // Fonction pour créer un bouton à partir d'un texte
    createButton(x, y, text, callback) {
        const button = this.add.graphics();
        button.fillStyle(0xff0000, 1); // Rouge
        button.fillRoundedRect(x - 100, y - 20, 200, 40, 20); // Forme arrondie

        const buttonText = this.add.text(x, y, text, {
            fontSize: '24px',
            fill: '#ffffff', // Texte blanc
            fontStyle: 'bold'
        })
        .setOrigin(0.5) // Centrer le texte sur les coordonnées (x, y)
        .setInteractive()
        .on('pointerdown', callback);

        return button;
    }
}
