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
    url?: string,
}

/**
 * Object containing a collection of map assets for the maps configuration.
 */
export interface AssetCollection {
    [key: string]: Asset;
}

export interface AssetConfiguration {
    images?: AssetCollection;
    sounds?: AssetCollection;
}
