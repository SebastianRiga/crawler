import pkg from '../../package.json';

export const environment = {
    title: pkg.name,
    version: pkg.version,
    paths: {
        base: 'assets/',
        audio: 'assets/audio/',
        images: 'assets/images/',
        cursors: 'assets/cursors/',
        fonts: 'assets/fonts/',
        maps: 'assets/maps/',
        tiles: {
            base: 'assets/tiles/',
            characters: 'assets/tiles/characters/',
            commissions: 'assets/tiles/commissions/',
            gui: 'assets/tiles/gui/',
            items: 'assets/tiles/items/',
            objects: 'assets/tiles/objects/',
        },
    },
    scenes: {
        boot: 'SCENE_BOOT',
        title: 'SCENE_TITLE',
        loader: 'SCENE_LOADER',
        game: 'SCENE_GAME',
        characterCreation: 'SCENE_CHARACTER_CREATION',
    },
};
