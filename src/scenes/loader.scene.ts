import Phaser from 'phaser';

import { Map } from '../maps/map';
import { SCENE_KEY_GAME } from './game.scene';
import { Overworld01Map } from '../maps/overworld-01.map';

export const SCENE_KEY_LOADER = 'SCENE_SETUP';

/**
 *
 */
export class LoaderScene extends Phaser.Scene {
    private map: Map;

    /**
     *
     */
    constructor() {
        super(SCENE_KEY_LOADER);
        this.map = new Overworld01Map(this);
    }

    /**
     *
     */
    public preload(): void {
        this.map?.preload();
    }

    /**
     *
     */
    public create(): void {
        this.scene.start(SCENE_KEY_GAME, this.map);
    }
}
