import Phaser from 'phaser';

import { UIButton } from './button.ui';

/**
 *
 */
export class UIImageButton extends UIButton {
    /**
     * @param owner The scene the image button belongs to.
     * @param image The image the button should display.
     * @param x The x coordinate of the image button.
     * @param y The y coordiante of the image button.
     */
    constructor(owner: Phaser.Scene, image: string, x: number, y: number) {
        super(owner, null, x, y);
        this.image.setTexture(image);
    }

    /**
     * Sets the scale of the image the button displays.
     * @param scale The new scale of the image, applied to both width and height
     * to preserve the aspect ratio.
     * @returns Reference to the calling UIImageButton.
     */
    public setScale(scale: number): UIImageButton {
        this.image.setScale(scale, scale);
        return this;
    }
}
