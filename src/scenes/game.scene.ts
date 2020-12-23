import Phaser from 'phaser';

import { Map } from '../maps/map';
import { MouseMarker } from '../controls/mouse-marker.controls';


export const SCENE_KEY_GAME = 'SCENE_GAME';

/**
 *
 */
export class GameScene extends Phaser.Scene {
    private map: Map;
    private marker: MouseMarker;

    /**
     *
     */
    constructor() {
        super(SCENE_KEY_GAME);
    }

    /**
     *
     * @param data f
     */
    public init(data: object): void {
        this.map = data as Map;
        this.map.owner = this;
    }

    /**
     *
     */
    public preload(): void {
        this.map.create();
    }

    /**
     *
     */
    public create(): void {
        this.cameras.main.setBounds(0, 0, this.map.gameMap.widthInPixels, this.map.gameMap.heightInPixels);
        this.marker = new MouseMarker(this, this.map.gameMap);
    }

    /**
     *
     */
    public update(): void {
        this.marker.update();
    }
}
