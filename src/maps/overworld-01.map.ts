import { Map } from './map';

import { PhaserLayerCollection } from '../types/phaser';
import { Overworld01AssetConfig } from '../config/overworld-01-asset.config';

/**
 *
 */
export class Overworld01Map extends Map {
    /**
     * @inheritdoc
     */
    constructor() {
        super(Overworld01AssetConfig);
    }

    /**
     * @inheritdoc
     */
    public configureLayers(layers: PhaserLayerCollection): void {
        layers.Walls.setCollisionByExclusion([-1]);
    }
}
