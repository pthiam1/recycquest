import { dechets } from '../data.js';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Chargement des images des déchets
        dechets.forEach((dechet) => {
            const dir = 'images/';
            this.load.image(dechet.nom, dir + dechet.image);
        });
        // Chargement des sons
        this.load.audio('success', 'son/success.mp3');
        this.load.audio('error', 'son/error.mp3');
        this.load.audio('welcome', 'son/welcome.mp3');
        this.load.audio('energy', 'son/energetic.mp3');
        this.load.image('bg', 'images/bg.png');
        this.load.image('roue', 'images/roue.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
