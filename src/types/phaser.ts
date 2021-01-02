import Phaser from 'phaser';

/**
 * ##################################
 * # Phaser Collections
 * ##################################
*/

export interface PhaserImageCollection {
    [key: string]: Phaser.GameObjects.Image;
}

export interface PhaserSpriteCollection {
    [key: string]: Phaser.GameObjects.Sprite;
}

export interface PhaserLayerCollection {
    [key: string]: Phaser.Tilemaps.StaticTilemapLayer | Phaser.Tilemaps.DynamicTilemapLayer;
}

export interface PhaserTilesetCollection {
    [key: string]: Phaser.Tilemaps.Tileset;
}

export interface PhaserGameObjectCollection {
    [key: string]: Phaser.GameObjects.GameObject;
}

export interface PhaserSoundCollection {
    [key: string]: Phaser.Sound.BaseSound;
}
