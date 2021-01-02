import Phaser from 'phaser';

/**
 *
 */
export abstract class BasePlugin {
    /**
     * @param owner The scene the plugin belongs to.
     */
    constructor(protected owner: Phaser.Scene) {}
}
