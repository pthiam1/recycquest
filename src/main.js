/**
 * Configuration de jeu
 */

import EndScene from './scenes/EndScene.js';
import GameScene from './scenes/GameScene.js';
import InstructionsScene from './scenes/InstructionsScene.js';
import LevelScene from './scenes/LevelScene.js';
import MenuScene from './scenes/MenuScene.js';
import PreloadScene from './scenes/PreloadScene.js';



const config= {

    type :Phaser.AUTO,
    width :window.innerWidth-20,
    height :window.innerHeight-20,
   
    scene :[MenuScene,InstructionsScene,GameScene,EndScene,PreloadScene,LevelScene],
    // scene :[EndScene],
    physics: {
        default: 'arcade', 
        arcade :{
            gravity :{y :0},
            debug : false,


        },
    },    
};
 const game = new Phaser.Game(config);


 

