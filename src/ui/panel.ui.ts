import Phaser from 'phaser';

import { Coordinate } from '../types/size';
import { assets } from '../environment/assets';

/**
 *
 */
export class UIPanel extends Phaser.GameObjects.GameObject {
    /**
     * The main image fram displaying the panel.
     */
    private image: Phaser.GameObjects.Image;

    /**
     * The title text of the panel.
     */
    private title: Phaser.GameObjects.Text;

    /**
     * @param owner The scene the ui panel belongs to.
     * @param title The title of the panel.
     * @param x The x coordinate of the panel.
     * @param y The y coordiante of the panel.
     */
    constructor(owner: Phaser.Scene, title: string, x: number, y: number) {
        super(owner, 'ui_panel');

        this.image = this.scene.add.image(x, y, assets.images.ui.menuPanel.key);
        this.title = this.scene.add.text(x, y - (this.image.width / 1.5), title)
            .setOrigin(0.5);
    }

    /**
     * Returns the center coordinate of the main image of the panel.
     * @returns The center coordiante fo the panel, e.g. { x: 33, y: 21 };
     * @see UIPanel#image
     */
    public get center(): Coordinate {
        return new Coordinate(
            this.image.x + (this.image.width / 2),
            this.image.y + (this.image.height / 2));
    }

    /**
     * @inheritdoc
     */
    public destroy(): void {
        super.destroy();
        this.title.destroy();
        this.image.destroy();
    }
}
