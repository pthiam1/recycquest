import { creerPoubelles, dechets, niveaux } from '../data.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.level = data.level || 1; // Niveau récupéré depuis le menu
        this.vies = niveaux[this.level - 1].vies;
        this.vitesse = niveaux[this.level - 1].vitesse;
        this.typesDechets = niveaux[this.level - 1].typesDechets;
        this.score = 80;
    }

    preload() {
        // Chargement des images et sons
        dechets.forEach((dechet) => {
            this.load.image(dechet.nom, 'images/' + dechet.image);
        });

        this.load.audio('success', 'son/success.mp3');
        this.load.audio('error', 'son/error.mp3');
        this.load.audio('energy', 'son/energetic.mp3');
        this.load.image('bg', 'images/bg.png');
    }

    create() {
        this.createBackground();
        this.createMusique();
        this.createDechetsGroup();
        this.createPoubelles();
        this.createTextElements();
        this.createUIButtons();
        this.createDialogBox();

        this.input.keyboard.on('keydown-ESC', this.togglePause, this);

        this.events.on('resume', () => {    
            this.createUIButtons();

            // Réinitialiser le bouton de pause
            this.input.keyboard.on('keydown-ESC', this.togglePause, this);  
        });
    }

    update() {
        // Vérifier si le joueur a perdu toutes ses vies
        if (this.vies <= 0) {
            this.scene.start('EndScene', { score: this.score });
        }
    }

    createBackground() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    }

    createMusique() {
        this.sound.add('energy', { volume: 0.5, loop: true }).play();
    }

    createPoubelles() {
        this.poubelles = creerPoubelles(this);
        this.poubelles.forEach(poubelle => {
            poubelle.setInteractive()
                    .on('pointerover', () => this.zoomPoubelle(poubelle))
                    .on('pointerout', () => poubelle.setScale(1));

            this.physics.add.overlap(this.dechetsGroup, poubelle, this.handleCollision, null, this);
        });
    }

    zoomPoubelle(poubelle) {
        poubelle.setScale(1.2);
    }
    createTextElements() {
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
            fontSize: '24px',
            fill: '#00ff00',
        });

        this.viesText = this.add.text(10, 40, `Vies: ${this.vies}`, {
            fontSize: '24px',
            fill: '#ff0000',
        });

        this.add.text(this.cameras.main.centerX, 10, `Niveau ${this.level}`, {
            fontSize: '32px',
            fill: '#0000ff',
        }).setOrigin(0.5);

    }

    createDechetsGroup() {
        // Créer un groupe pour les déchets
        this.dechetsGroup = this.physics.add.group();

        // Lancer la génération des déchets
        this.time.addEvent({
            delay: 1000 / this.vitesse,
            callback: this.spawnDechet,
            callbackScope: this,
            loop: true
        });
    }

    spawnDechet() {
        const typeDechet = Phaser.Math.RND.pick(this.typesDechets);
        const dechetData = dechets.find(d => d.categorie === typeDechet);

        const dechet = this.dechetsGroup.create(
            Phaser.Math.Between(100, this.sys.game.config.width - 100), 
            -50, 
            dechetData.nom
        );

        dechet.setDisplaySize(100, 100);
        dechet.setVelocityY(this.vitesse * 100);

        dechet.setInteractive()
              .on('pointerdown', (pointer) => this.onDechetDragStart(dechet, pointer))
              .on('pointerup', () => this.onDechetDrop(dechet));

        dechet.setData('checked', false);
        dechet.on('update', () => {
            if (dechet.y > this.sys.game.config.height && !dechet.getData('checked')) {
                this.loseLife(dechet);
            }
        });
    }

    winScore(dechet) {
        dechet.setData('checked', true);
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        this.sound.play('success');
        dechet.destroy();
    }

    loseLife(dechet) {
        dechet.setData('checked', true);
        this.vies -= 1;
        this.viesText.setText(`Vies: ${this.vies}`);
        this.sound.play('error');
        dechet.destroy();
    }

    onDechetDragStart(dechet, pointer) {
        dechet.setAlpha(0.7); 
        this.input.on('pointermove', (pointer) => this.onDechetDragMove(dechet, pointer));
    }

    onDechetDragMove(dechet, pointer) {
        dechet.x = pointer.x;
        dechet.y = pointer.y;
    }

    onDechetDrop(dechet) {
        dechet.setAlpha(1);
        let isCorrectlyPlaced = false;

        this.poubelles.forEach((poubelle) => {
            if (this.physics.overlap(dechet, poubelle)) {
            this.handleCollision(dechet, poubelle);
            isCorrectlyPlaced = true;
            }
        });

        if (!isCorrectlyPlaced) {
            this.loseLife(dechet);
        }
    }

    handleCollision(dechet, poubelle) {
        if (dechet.texture.key === poubelle.categorie) {
            this.winScore(dechet);
        } else {
            this.loseLife(dechet);
        }
    }

    createUIButtons() {
        const pauseButton = this.add.text(this.cameras.main.width - 100, 20, 'Pause', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#333333',
        }).setInteractive();

        const menuButton = this.add.text(this.cameras.main.width - 100, 60, 'Menu', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#1a1a1a',
        }).setInteractive();

        const buyLifeButton = this.add.text(this.cameras.main.width - 200, 100, 'Vie (40 pts)', {
            fontSize: '20px',
            fill: '#ffffff',
            backgroundColor: '#ff6347',
        }).setInteractive();

        pauseButton.on('pointerdown', () => this.togglePause());
        menuButton.on('pointerdown', () => this.showDialogBox());
        buyLifeButton.on('pointerdown', () => this.buyLife());
    }

    buyLife() {
        if (this.score >= 40) {
            this.score -= 40;
            this.vies += 1;
            this.scoreText.setText(`Score: ${this.score}`);
            this.viesText.setText(`Vies: ${this.vies}`);
            this.sound.play('success');
        } else {
            this.sound.play('error');
        }
    }

    createDialogBox() {
        this.dialogContainer = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
        const dialogBox = this.add.graphics();
        dialogBox.fillStyle(0x000000, 0.7);
        dialogBox.fillRoundedRect(-200, -150, 400, 300, 20);
        this.dialogContainer.add(dialogBox);
    
        const dialogText = this.add.text(0, -100, 'Menu', {
            fontSize: '32px',
            fill: '#ffffff',
        }).setOrigin(0.5);
        this.dialogContainer.add(dialogText);
    
        
        const resumeButton = this.add.text(0, 0, 'Reprendre', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#333333',
        }).setOrigin(0.5).setInteractive();
    
      
        const quitButton = this.add.text(0, 50, 'Quitter', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#333333',
        }).setOrigin(0.5).setInteractive();
    
        //hover effect
        resumeButton.on('pointerover', () => {
            resumeButton.setStyle({ fill: '#ff0' });
        });

        resumeButton.on('pointerout', () => {
            resumeButton.setStyle({ fill: '#fff' });
        });

        quitButton.on('pointerover', () => {
            quitButton.setStyle({ fill: '#ff0' });
        });

        resumeButton.on('pointerdown', () => this.hideDialogBox());
        quitButton.on('pointerdown', () => this.quitToMenu());
    
        this.dialogContainer.add(resumeButton);
        this.dialogContainer.add(quitButton);
    
        this.dialogContainer.setAlpha(0);
    }
    

    showDialogBox() {
        this.dialogContainer.setAlpha(1);
        this.scene.pause();
    }

    hideDialogBox() {
        this.dialogContainer.setAlpha(0);
        this.scene.resume();
    }
    quitToMenu() {
        this.scene.start('MenuScene');
    }

    togglePause() {
        if (this.scene.isPaused()) {
            this.scene.resume();
        } else {
            this.scene.pause();
        }
    }
}
