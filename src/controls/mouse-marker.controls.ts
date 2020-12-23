import Phaser from 'phaser';

/**
 * Styling options for MouseMarker instances.
 *
 * @example
 * const config: MouseMarkerConfig = {
 *  lineWidth: 2,
 *  color: 0xffffff,
 *  alpha: 0.75,
 * };
 */
export interface MouseMarkerConfig {
    lineWidth: number;
    color: number;
    alpha: number;
}

/**
 * Default styling configuration for MouseMarker instances.
 *
 * Default-Values:
 * ```typescript
 * lineWidth = 1;
 * color = 0xC62828;
 * alpha = 1;
 * ```
 */
const DEFAULT_CONFIGURATION: MouseMarkerConfig = {
    lineWidth: 1,
    color: 0xC62828,
    alpha: 1,
};

/**
 * Marker graphic for the mouse courser to indicate the currently selected tile.
 * @see Phaser.GameObjects.Graphics
 */
export class MouseMarker {
    private graphic: Phaser.GameObjects.Graphics;

    /**
     * @param owner The current scene claiming ownership for the mouse marker.
     * @param map The tilemap on which the mouse marker is drawn.
     * @param [config=defaultConfig] Style configuration for the mouse marker rectangle.
     * @see DEFAULT_CONFIGURATION For the default styling of the mouse marker.
     */
    constructor(
        private owner: Phaser.Scene,
        private map: Phaser.Tilemaps.Tilemap,
        public config: MouseMarkerConfig = DEFAULT_CONFIGURATION) {
        this.graphic = owner.add.graphics();
        this.graphic.lineStyle(config.lineWidth, config.color, config.alpha);
        this.graphic.strokeRect(0, 0, map.tileWidth, map.tileHeight);
    }

    /**
     * Updates the position of the mouse marker on the tilemap according to the new mouse position.
     */
    public update(): void {
        const camera = this.owner.cameras.main;

        const worldVector = new Phaser.Math.Vector2();
        this.owner.input.activePointer.positionToCamera(camera, worldVector);

        const tileCoordinate = this.map.worldToTileXY(worldVector.x, worldVector.y);
        const worldCoordinate = this.map.tileToWorldXY(tileCoordinate.x, tileCoordinate.y);

        this.graphic.setPosition(worldCoordinate.x, worldCoordinate.y);
    }
}
