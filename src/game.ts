import * as Phaser from 'phaser';

/**
 * Central game configuration object for Crawler.
 */
const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Crawler',
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
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
    scene: [],
    scale: {
        zoom: 2,
    },
};

export const game = new Phaser.Game(gameConfig);
