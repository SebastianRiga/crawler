import { Map, MapConfiguration, MapLayerCollection } from './map';

/**
 *
 */
export class Overworld01Map extends Map {
    protected assetConfiguration: MapConfiguration = {
        images: {},
        tilemap: {
            key: 'overworld-01',
            url: 'assets/maps/overworld-01.json',
        },
        layers: {
            floor: {
                key: 'Floor',
                type: 'static',
                tilesets: [
                    {
                        key: 'Floor',
                        url: 'assets/tiles/Objects/Floor.png',
                    },
                ],
            },
            ground: {
                key: 'Ground',
                type: 'static',
                tilesets: [
                    {
                        key: 'Ground0',
                        url: 'assets/tiles/Objects/Ground0.png',
                    },
                ],
            },
        },
    };

    /**
     * f
     * @param layers f
     */
    protected configureLayers(layers: MapLayerCollection): void {
        console.log(this.tilesets.Floor.value.name);
    }
}
