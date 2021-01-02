import Phaser from 'phaser';

import { assets } from '../environment/assets';

/**
 *
 */
export class UIButton extends Phaser.GameObjects.GameObject {
    /**
     * Button selection tint.
     */
    public selectionTint: 0xfcba03;

    /**
     * The image representing the button.
     */
    protected image: Phaser.GameObjects.Image;

    /**
     * The text the button displays.
     */
    protected title: Phaser.GameObjects.Text;

    /**
     * @param owner The scene that owns the button.
     * @param text The text of the button.
     * @param x The x coordinate of the button.
     * @param y the y coordinate of the button.
     */
    constructor(owner: Phaser.Scene, text: string, public x: number, public y: number) {
        super(owner, 'ui_button');

        this.image = owner.add.image(x, y, assets.images.ui.buttonMenu.key)
            .setInteractive()
            .on('pointerover', () => this.image.setTint(this.selectionTint))
            .on('pointerout', () => this.image.clearTint());

        this.title = owner.add.text(this.image.x, this.image.y, text)
            .setOrigin(.5, .5);
    }

    /**
     * Shorthand accessor for the image of the button.
     */
    public get Image(): Phaser.GameObjects.Image {
        return this.image;
    }

    /**
     * Shorthand accessor for the title of the button.
     */
    public get Title(): Phaser.GameObjects.Text {
        return this.title;
    }

    /**
     * @inheritdoc
     */
    public destroy(): void {
        super.destroy();
        this.title.destroy();
        this.image.destroy();
    }

    /**
     * Adds an action to the click event of the button.
     * @param fn The function to execute when the button is clicked.
     * @returns The calling button
     */
    public setOnClickListener(fn: Function): UIButton {
        this.image.on('pointerup', fn);
        return this;
    }
}
