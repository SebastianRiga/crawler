import Phaser from 'phaser';

import { BaseScene } from './base.scene';
import { assets } from '../environment/assets';
import { environment } from '../environment/environment';

/**
 *
 */
export class TitleScene extends BaseScene {
    /**
     * ##################################
     * # Properties
     * ##################################
    */

    /**
     * The main theme to play on the title scene.
     */
    private theme: Phaser.Sound.BaseSound;

    /**
     * Scene specific image asset configuration.
     */
    private readonly images = assets.images.title;

    /**
     * ##################################
     * # Constructor
     * ##################################
    */

    /**
     * @inheritdoc
     */
    constructor() {
        super(environment.scenes.title);
    }

    /**
     * ##################################
     * # Lifecycle
     * ##################################
    */

    /**
     * @inheritdoc
     */
    public create(): void {
        this.theme = this.sound.add(assets.sounds.music.main.key, { loop: true });
        this.theme.play();

        const background = this.add.image(this.center.x, this.center.y, this.images.background.key);
        background.displayWidth = this.sys.game.canvas.width;
        background.displayHeight = this.sys.game.canvas.height;

        this.add.image(this.center.x, this.center.y * 0.4, this.images.title.key);

        this.createMainMenu();
    }

    /**
     * @inheritdoc
     */
    public onShutdown(): void {
        this.theme.stop();
    }

    /**
     * ##################################
     * # Functions
     * ##################################
    */

    /**
     * Creates the main menu.
     */
    private createMainMenu(): void {
        this.uiBuilder.button('New Game', this.center.x, this.center.y * 1.3)
            .setOnClickListener(() => this.scene.start(environment.scenes.characterCreation));

        this.uiBuilder.button('Exit Crawler', this.center.x, this.center.y * 1.5)
            .setOnClickListener(() => window.close());
    }
}
