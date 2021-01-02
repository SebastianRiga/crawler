import Phaser from 'phaser';
import { BootScene } from './scenes/boot.scene';
import { CharacterCreationScene } from './scenes/character-creation.scene';

import { GameScene } from './scenes/game.scene';
import { TitleScene } from './scenes/title.scene';

/**
 * Central game configuration object for Crawler.
 */
const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Crawler',
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
            },
            debug: true,
        },
    },
    fps: {
        min: 30,
        target: 60,
    },
    parent: 'game',
    backgroundColor: '#000000',
    render: {
        antialias: true,
        pixelArt: true,
        roundPixels: true,
        antialiasGL: true,
    },
    scene: [
        BootScene,
        TitleScene,
        CharacterCreationScene,
        GameScene,
    ],
};

export const game = new Phaser.Game(gameConfig);
