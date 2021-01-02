/* eslint-disable no-redeclare */
/**
 * ##################################
 * # Map Module
 * ##################################
*/

/** Imports */

import Phaser from 'phaser';
import { EventEmitter } from 'events';

import { Asset } from '../types/assets';
import { PhaserLayerCollection, PhaserTilesetCollection } from '../types/phaser';

/**
 * ##################################
 * # Types
 * ##################################
*/

/**
 * A tile layer on the map, which can either be static or dynamic for the maps configuration.
 */
export interface MapLayer extends Asset {
    type: 'static' | 'dynamic';
    tilesets: Asset[];
}

/**
 * Object containing a collection of map layers.
 */
export interface MapLayerCollection {
    [key: string]: MapLayer;
}

/**
 * Configuration object describing all assets that a map needs for display.
 * According to the given configuration images, tiles, sprites, tilesets and tilemaps
 * are loaded and created in the respective functions of the map object.
 */
export interface MapConfiguration {
    tilemap: Asset;
    layers: MapLayerCollection;
}

/**
 * ##################################
 * # Events
 * ##################################
*/

export interface MapEvents {
    preloaded: (map: Map) => void;
    created: (map: Map) => void;
    navigate: (map: Map) => void;
}

export interface Map {
    on<E extends keyof MapEvents>(event: E, listener: MapEvents[E]): this;
    emit<E extends keyof MapEvents>(evnet: E, ...args: Parameters<MapEvents[E]>): boolean;
}

/**
 * ##################################
 * # Classes
 * ##################################
*/

/**
 * A map representing a level in the game containing all assets needed for display and handling
 * their lifecycle like loading and creation.
 */
export abstract class Map extends EventEmitter {
    /**
     * ##################################
     * # Properties
     * ##################################
    */

    /**
     * The underlying phaser tilemap. This object will be undefined if accessed before
     * the preload and create functions were called!
     */
    protected _tilemap: Phaser.Tilemaps.Tilemap;

    /**
     * Collection containing all layers of the tilemap.
     */
    protected _layers: PhaserLayerCollection = {};

    /**
     * Collection of tilesets used for by the layers of the tilemap.
     */
    protected _tilesets: PhaserTilesetCollection = {};

    /**
     * ##################################
     * # Constructor
     * ##################################
    */

    /**
     * @param config The map specific configuration.
     */
    constructor(protected config: MapConfiguration) {
        super();
    }

    /**
     * ##################################
     * # Accessors
     * ##################################
    */

    /**
     * The underlying phaser tilemap. This object will be undefined if accessed before
     * the preload and create functions were called!
     */
    public get tilemap(): Phaser.Tilemaps.Tilemap {
        return this._tilemap;
    }

    /**
     * Collection containing all layers of the tilemap.
     * Will be empty if the map has not finished preloading and creating its assets.
     */
    public get layers(): PhaserLayerCollection {
        return this._layers;
    }

    /**
     * Collection of tilesets used for by the layers of the tilemap.
     * Will be empty if the map has not finished preloading and creating its assets.
     */
    public get tilesets(): PhaserTilesetCollection {
        return this._tilesets;
    }

    /**
     * ##################################
     * # Lifecycle Hooks
     * ##################################
    */

    /**
     * Loads all assets required by the map including images, the tilemap and
     * the tilesets into the cache of the owning phaser scene.
     * @param owner The current scene claiming ownership of the map.
     */
    public preload(owner: Phaser.Scene): void {
        // Load tilesets
        const tilesetsToLoad = Object.values(this.config.layers).map((layer) => layer.tilesets).flat();
        tilesetsToLoad.forEach((tileset) => owner.load.image(tileset));

        // Load tilemap
        owner.load.tilemapTiledJSON(this.config.tilemap);

        // Emit to all listeners, that the maps assets have been preloaded.
        this.emit('preloaded', this);
    }

    /**
     * Creates the tilemap, sprites, tilesets and layers defined in the asset configuration with
     * the data loaded into the phaser scene cache in the preload function.
     *
     * @callback Map#configureLayers
     * @emits MapEvents#created
     *
     * @param owner The current scene claiming ownership of the map.
     */
    public create(owner: Phaser.Scene): void {
        // Create tilemap
        this._tilemap = owner.make.tilemap({ key: this.config.tilemap.key });

        // Create layers and their corresponding tilesets
        Object.values(this.config.layers).forEach((layer) => {
            const layerTilesets = [];

            layer.tilesets.forEach((tileset) => {
                const phaserTileset = this._tilemap.addTilesetImage(tileset.key);
                layerTilesets.push(phaserTileset);
                this._tilesets[tileset.key] = phaserTileset;
            });

            if (layer.type === 'static') {
                this._layers[layer.key] = this._tilemap.createStaticLayer(layer.key, layerTilesets);
            } else {
                this._layers[layer.key] = this._tilemap.createDynamicLayer(layer.key, layerTilesets);
            }
        });

        // Pass created layers to implementing child map through the abstract function to enable map specific layer configuration
        this.configureLayers(this._layers);

        // Emit to all listenrs, that the creation is completed.
        this.emit('created', this);
    }

    /**
     * ##################################
     * # Abstract Functions
     * ##################################
    */

    /**
     * Callback that gets invoked after the map has finished its creation lifecycle hook.
     * It allows implementing child classes to configure the finished layers
     * @param layers The initialized layers that should be configured.
     */
    protected configureLayers(layers: PhaserLayerCollection): void {}
}
