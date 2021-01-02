import Phaser from 'phaser';

import { UIFactory } from '../ui/factory.ui';
import { Coordinate, Dimensions } from '../types/size';

/**
 * Superset of the basic Phaser.Scene with additional functionality for positioning, sizing
 * and UI creation.
 */
export abstract class BaseScene extends Phaser.Scene {
    /**
     * Factory to create ui elements.
     */
    protected uiBuilder: UIFactory;

    /**
     * @param sceneConfig Scene specific configuration settings.
     * @param assetConfig Asset configuration for the scene.
     */
    constructor(sceneConfig: string | Phaser.Types.Scenes.SettingsConfig) {
        super(sceneConfig);
        this.uiBuilder = new UIFactory(this);
    }

    /**
     * Initializes the scene. Optionaly a data bundle can be
     * passed when calling scene.start(data) form the calling scene
     * which can be accessed here.
     * @param data Bundle passed to the scene.
     */
    public init(data: object): void {
        this.events.on('shutdown', this.onShutdown, this);
    }

    /**
     * Loading and setup for the scene.
     */
    public preload(): void {}

    /**
     * Create all game objects for the scene.
     */
    public create(): void {}

    /**
     * Cleanup assets before the scenen gets removed.
     */
    public onShutdown(): void { }


    /**
     * The main camera of the scene.
     */
    public get mainCamera(): Phaser.Cameras.Scene2D.Camera {
        return this.cameras.main;
    }

    /**
     * Returns the dimensions of the scene as an object containing
     * its widht and height.
     */
    public get dimensions(): Dimensions {
        return this.game.canvas;
    }

    /**
     * Returns the center coordinate of the scene.
     */
    public get center(): Coordinate {
        return new Coordinate(this.dimensions.width / 2, this.dimensions.height / 2);
    }
}
