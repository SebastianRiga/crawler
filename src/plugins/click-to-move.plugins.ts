import Phaser from 'phaser';

import { BasePlugin } from './base-plugin';
import { Coordinate } from '../types/size';

declare type Neighbours = {
    top: Coordinate;
    right: Coordinate;
    left: Coordinate,
    bottom: Coordinate;
}

declare type LookUpTable = {
    [key: string]: {
        id: string;
        position: Coordinate;
    }
}

/**
 *
 */
export class ClickToMovePlugin extends BasePlugin {
    /**
     * ##################################
     * # Propterties
     * ##################################
    */

    private currentPath: Coordinate[] = [];

    /**
     * ##################################
     * # Constructor
     * ##################################
    */

    /**
     * @param owner The scene the plugin belongs to.
     * @param gameObject The game object that should be moved by the plugin.
     * @param tilemap The tilemap wich will be used to determine the coordinates in the world.
     */
    constructor(
        protected owner: Phaser.Scene,
        public gameObject: Phaser.GameObjects.Image | Phaser.GameObjects.Sprite,
        public baseLayer: Phaser.Tilemaps.StaticTilemapLayer | Phaser.Tilemaps.DynamicTilemapLayer,
        public collisionLayers: (Phaser.Tilemaps.StaticTilemapLayer | Phaser.Tilemaps.DynamicTilemapLayer)[]) {
        super(owner);
    }

    /**
     * ##################################
     * # Lifecycle
     * ##################################
    */

    /**
     * Adds the plugins listeners to the scene.
     */
    public install(): void {
        this.owner.input.on(Phaser.Input.Events.POINTER_UP, this.onClick, this);
    }

    /**
     * Removes the plugins listeners from the scene.
     */
    public uninstall(): void {
        this.owner.input.off(Phaser.Input.Events.POINTER_UP);
    }

    /**
     * ##################################
     * # Functions
     * ##################################
    */

    /**
     * Get invoked when the player clicks a tile.
     * @param pointer The pointer object that fired the click event.
     */
    private onClick(pointer: Phaser.Input.Pointer): void {
        const pointerCoord = new Coordinate(pointer.worldX, pointer.worldY);

        const startCoord: Coordinate = this.baseLayer.worldToTileXY(this.gameObject.x, this.gameObject.y);
        const endCoord: Coordinate = this.baseLayer.worldToTileXY(pointerCoord.x, pointerCoord.y);

        this.currentPath = this.findPath(startCoord, endCoord);
    }

    /**
     * Moves the object along the path one tile each update cycle.
     */
    public update(): void {
        if (!this.currentPath.length) {
            return;
        }

        const nextTile = this.currentPath.shift();

        this.gameObject.setPosition(nextTile.x, nextTile.y);
        console.log(this.currentPath);
    }

    /**
     * ##################################
     * # Pathfinding
     * ##################################
    */

    /**
     * Finds a walkable path on the tilemap for the game object to move along using the "Breadth-First Search" algorithm.
     * @param start The starting coordinate.
     * @param end The target coordinate.
     * @returns Array of coordinates representing the path the game object can take to reach its target.
     */
    private findPath(start: Coordinate, end: Coordinate): Coordinate[] {
        if (this.isCoordinateBlocked(end)) {
            return [];
        }

        const queue: Coordinate[] = [start];
        const lookupTable: LookUpTable = {};

        const startId = this.getCoordinateId(start);
        const endId = this.getCoordinateId(end);

        lookupTable[startId] = {
            id: '',
            position: new Coordinate(-1, -1),
        };

        while (queue.length > 0) {
            // Shift next coordinate out of array.
            const coordiante = queue.shift();

            // Break loop if the end has been reached.
            if (coordiante.equals(end)) {
                break;
            }

            // Get id of the current coordinate.
            const currentId = this.getCoordinateId(coordiante);

            // Get neighbouring coordinates
            const neighbours = this.getNeighbours(coordiante);

            Object.values(neighbours).forEach((neighbour) => {
                const id = this.getCoordinateId(neighbour);

                // Check if the coordinate has already been processed.
                if (id in lookupTable) {
                    return;
                }

                // If the tile is blocked, continue.
                if (this.isCoordinateBlocked(neighbour)) {
                    return;
                }

                // Add neighbour to lookup table as a viable path component.
                lookupTable[id] = {
                    id: currentId,
                    position: coordiante,
                };

                // Add neighbour to queue to process its neighbours
                queue.push(neighbour);
            });
        }

        const path: Coordinate[] = [];

        let tileId = endId;
        let tilePosition = lookupTable[endId].position;

        const endPosition = this.baseLayer.tileToWorldXY(end.x, end.y);
        path.push(endPosition);

        while (tileId !== startId) {
            const coordiante = this.baseLayer.tileToWorldXY(tilePosition.x, tilePosition.y);
            path.push(coordiante);

            tileId = lookupTable[tileId].id;
            tilePosition = lookupTable[tileId].position;
        }

        return path.reverse();
    }

    /**
     * Returns the id of the passed coordinate.
     * @param coordiante The coordinate for which an id should be constructed
     * @returns The id of the given coordiante.
     */
    private getCoordinateId(coordiante: Coordinate): string {
        return `${coordiante.x}:${coordiante.y}`;
    }

    /**
     * Returns an object containing all neighbouring coordiantes for a given coordinate.
     * @param coordinate The coordinate for which its neighbours should be calculated.
     * @returns The coordinates neighbours.
     */
    private getNeighbours(coordinate: Coordinate): Neighbours {
        return {
            top: new Coordinate(coordinate.x, coordinate.y - 1),
            right: new Coordinate(coordinate.x + 1, coordinate.y),
            left: new Coordinate(coordinate.x - 1, coordinate.y),
            bottom: new Coordinate(coordinate.x, coordinate.y + 1),
        };
    }

    /**
     * Checks if a coordinate is walkable.
     * @param coordiante The coordinate to check.
     * @returns True if the coordinate is walkable, false otherwise.
     */
    private isCoordinateBlocked(coordiante: Coordinate): boolean {
        // If the tile doesn't exist, consider it blocked and return true.
        const baseTile = this.baseLayer.getTileAt(coordiante.x, coordiante.y);

        if (!baseTile) {
            return true;
        }

        // If a corresponding tile exists in any collision layer, consider it blocked and return true.
        const collisionTile = this.collisionLayers.find((layer) => layer.getTileAt(coordiante.x, coordiante.y));

        if (collisionTile) {
            return true;
        }

        return false;
    }
}
