/**
 * ##################################
 * # Map Module
 * ##################################
*/

/** Imports */

import Phaser from 'phaser';

import { EventEmitter } from 'events';

/**
 * ##################################
 * # Interfaces
 * ##################################
*/

/**
 * Default object interface for any asset type
 * that can be loaded by phaser, such as images,
 * json files and sprites.
 *
 * Example:
 * ```javascript
 *  /// Load image asset
 *  const image: Asset = { key: 'logo', url: 'assets/images/logo.png' };
 *  secene.load.image(image);
 *
 *  /// Reference image asset for a map object
 *  map.addTilesetImage(image.key);
 * ```
 */
export interface Asset {
    key: string,
    url: string,
}

/**
 * Object interface representing a tileset asset, includes all asset properties
 * as well as a value field. It holds a reference to the actual phaser tileset object
 * and gets populateded after the maps create function was called.
 *
 * To access the phaser tileset reference on the value field the following functions mus
 * be executed first on the {@link Map Map} the tileset belongs to:
 * ```javascript
 * map.preload();
 * map.create();
 * ```
 *
 * Than all tilesets can be used via the public accessor on the map object:
 * ```javascript
 * map.tilesets.floor.value.name;
 * ```
 */
export interface Tileset extends Asset {
    value?: Phaser.Tilemaps.Tileset;
}

/**
 * A tile layer on the map, which can either be static or dynamic.
 */
export interface MapLayer {
    key: string;
    type: 'static' | 'dynamic';
    value?: Phaser.Tilemaps.DynamicTilemapLayer | Phaser.Tilemaps.StaticTilemapLayer;
    tilesets: [Tileset];
}

/**
 * Object containing a collection of assets.
 */
export interface AssetCollection {
    [key: string]: Asset;
}

/**
 * Object containing a collection of tilesets.
 */
export interface TilesetCollection {
    [key: string]: Tileset;
}

/**
 * Object containing a collection of map layers.
 */
export interface MapLayerCollection {
    [key: string]: MapLayer;
}

/**
 * Configuration object interface describing all assets that a map needs for display.
 * According to the given configuration images, tiles, sprites, tilesets and tilemaps
 * are loaded and created in the respective functions of the map object.
 */
export interface MapConfiguration {
    images: AssetCollection;
    tilemap: Asset;
    layers: MapLayerCollection;
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
     * Configuration bundle with all assets required by the map for correct display. The defined
     * assets will be loaded in the phasaer cache during the preload function and their corresponding
     * objects will be initialized in the create function.
     */
    protected assetConfiguration: MapConfiguration;

    /**
     * The underlying phaser tilemap. This object will be undefined if accessed before
     * the preload and create functions were called!
     */
    protected map: Phaser.Tilemaps.Tilemap;

    /**
     * ##################################
     * # Constructor
     * ##################################
    */

    /**
     *
     * @param owner The current scene claiming ownership of the map.
     */
    constructor(public owner: Phaser.Scene) {
        super();
    }

    /**
     * ##################################
     * # Accessors
     * ##################################
    */

    /**
     * Accessor for the underlying phaser tilemap object which represents
     * the complete map in the phaser cache.
     * @returns The underlying phaser tilemap object.
     */
    public get gameMap(): Phaser.Tilemaps.Tilemap {
        return this.map;
    }

    /**
     * Accessor for the collection of all assets loaded by the map.
     * @returns Object containing all assets required by the map.
     */
    public get mapAssets(): MapConfiguration {
        return this.assetConfiguration;
    }

    /**
     * Accessors for the maps image assets.
     * @returns Object containing all image assets required by the map.
     */
    public get images(): AssetCollection {
        return this.assetConfiguration.images;
    }

    /**
     * Accessor for the maps tilemap asset.
     * @returns The tilemap object required by the map.
     */
    public get tilemap(): Asset {
        return this.assetConfiguration.tilemap;
    }

    /**
     * Accessor fo the maps layers.
     * @returns Collection of layers available on the map.
     */
    public get layers(): MapLayerCollection {
        return this.assetConfiguration.layers;
    }

    /**
     * Accessor fo the maps tilesets.
     * @returns The tilesets required by the map.
     */
    public get tilesets(): TilesetCollection {
        const tilesets = Object.values(this.assetConfiguration.layers).map((layer) => layer.tilesets).flat();
        return tilesets.reduce((accumulator, value): TilesetCollection => {
            accumulator[value.key] = value;
            return accumulator;
        }, {});
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
    public preload(): void {
        // Load images
        Object.values(this.images).forEach((image) => this.owner.load.image(image));

        // Load tilesets
        Object.values(this.tilesets).forEach((tileset) => this.owner.load.image(tileset));

        // Load tilemap
        this.owner.load.tilemapTiledJSON(this.tilemap);
    }

    /**
     * Creates the tilemap, sprites, tilesets and layers defined in the asset configuration with
     * the data loaded into the phaser scene cache in the preload function.
     * @param owner The current scene claiming ownership of the map.
     */
    public create(): void {
        // Create tilemap
        this.map = this.owner.make.tilemap({ key: this.tilemap.key });

        // Create layers and their corresponding tilesets
        Object.values(this.layers).forEach((layer) => {
            layer.tilesets.forEach((tileset) => {
                tileset.value = this.map.addTilesetImage(tileset.key);
            });

            const tilesetValues = layer.tilesets.map((tileset) => tileset.value);

            if (layer.type === 'static') {
                layer.value = this.map.createStaticLayer(layer.key, tilesetValues);
            } else {
                layer.value = this.map.createDynamicLayer(layer.key, tilesetValues);
            }
        });

        // Pass created layers to implementing child map through the abstract function to enable map specific layer configuration
        this.configureLayers(this.layers);
    }

    /**
     * ##################################
     * # // Abstract Functions
     * ##################################
    */

    /**
     * Gets invoked after the create function has been executed and the map layers are initialized.
     * All additional configuration and setup for the layers should be done in this function.
     * @param layers The initialized map layers which should be configured.
     */
    protected abstract configureLayers(layers: MapLayerCollection): void;
}
