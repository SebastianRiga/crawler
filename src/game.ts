import Phaser from 'phaser';

import { GameScene } from './scenes/game.scene';
import { LoaderScene } from './scenes/loader.scene';

/**
 * Central game configuration object for Crawler.
 */
const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Crawler',
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
            },
            debug: true,
        },
    },
    parent: 'game',
    backgroundColor: '#000000',
    scene: [
        LoaderScene,
        GameScene,
    ],
};

export const game = new Phaser.Game(gameConfig);
