import Phaser from 'phaser';

import { BasePlugin } from './base-plugin';
import { Dimensions } from '../types/size';

declare type WeatherEffects = 'rain' | 'fog';

/**
 *
 */
export class WeatherPlugin extends BasePlugin {
    /**
     *
     */
    private fogSprite: Phaser.GameObjects.Sprite = null;

    /**
     *
     */
    private get dimensions(): Dimensions {
        return this.owner.sys.game.canvas;
    }

    /**
     * Creates a new weather effect on the scene owning the plugin.
     * @param effect The weather effect to create.
     */
    public create(effect: WeatherEffects): void {
        switch (effect) {
        case 'fog':
            this.fog();
            break;

        case 'rain':
            this.rain();
            break;
        }
    }

    /**
     * Removes an existing weather effect on the scene owning the plugin.
     * @param effect The type of the weather effect that should be removed.
     */
    public remove(effect: WeatherEffects): void {

    }

    /**
     * Creates a fog effect on the scene using the weather plugin.
     */
    private fog(): void {
        const effect = this.owner.textures.createCanvas('Weather_Fog_Effect', this.dimensions.width, this.dimensions.height);
        effect.context.rect(0, 0, this.dimensions.width, this.dimensions.height);
        effect.context.fillStyle = '#b2ddc8';
        effect.context.fill();

        this.fogSprite = this.owner.add.sprite(0, 0, effect);
        this.fogSprite.alpha = 0;

        this.owner.tweens.add({
            targets: [this.fogSprite],
            props: {
                alpha: 0.7,
            },
            duration: 6000,
            repeat: true,
        });
    }

    /**
     *
     */
    private removeFog(): void {
        const removeFog = this.owner.add.tween({
            targets: [this.fogSprite],
            props: {
                alpha: 0,
            },
            duration: 6000,
            repeat: true,
        });

        removeFog.on('completed', () => {
            this.fogSprite.destroy();
            this.fogSprite = null;
        }, this);
    }

    /**
     *
     */
    private rain(): void {

    }
}
