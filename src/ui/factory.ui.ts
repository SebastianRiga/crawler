import Phaser from 'phaser';

import { UIPanel } from './panel.ui';
import { UIButton } from './button.ui';
import { UIDialog } from './dialog.ui';
import { UIImageButton } from './image-button.ui';

/**
 * Factory for building UI elements. Implemented by the {@link BaseScene|BaseScene} and available for inheriting
 * scenes to create the ui of the calling scene.
 */
export class UIFactory {
    /**
     * Shorthand accessor for the ui dialog api. Able to present
     * 'alerts', 'confirmation dialogs' and 'prompts'.
     */
    public readonly dialog = new UIDialog();

    /**
     * @param scene The scene the factory belongs to.
     */
    constructor(private scene: Phaser.Scene) {}

    /**
     * Creates a new button and adds it to the scenes display list.
     * @param text The text of the button.
     * @param x The x coordinate of the button.
     * @param y the y coordinate of the button.
     * @returns Reference to the new button.
     */
    public button(text: string, x: number, y: number): UIButton {
        return new UIButton(this.scene, text, x, y);
    }

    /**
     * Creates a new image button and adds it to the scenes display list.
     * @param image The image the button should display.
     * @param x The x coordinate of the image button.
     * @param y The y coordiante of the image button.
     * @returns Reference to the new image button.
     */
    public imageButton(image: string, x: number, y: number): UIImageButton {
        return new UIImageButton(this.scene, image, x, y);
    }

    /**
     * Creates a new panel and adds it to the scenes display list.
     * @param title The title of the panel
     * @param x The x coordiante of the panel.
     * @param y The y coordiante of the panel.
     * @returns Reference to the new panel.
     */
    public panel(title: string, x: number, y: number): UIPanel {
        return new UIPanel(this.scene, title, x, y);
    }
}
