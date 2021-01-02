import Phaser from 'phaser';

import { Asset } from '../types/assets';
import { BaseScene } from './base.scene';
import { assets } from '../environment/assets';
import { environment } from '../environment/environment';

/**
 *
 */
export class BootScene extends BaseScene {
    private readonly textSectionOffset = 24;
    private successSound: Phaser.Sound.BaseSound;

    private textY = 0;

    private title = [
        '+++++++++++++++++++++++++++++++++++',
        `+ ${environment.title} ${environment.version}`,
        '+++++++++++++++++++++++++++++++++++',
    ];

    /**
     *
     */
    constructor() {
        super(environment.scenes.boot);
    }

    /**
     * @inheritdoc
     */
    public preload(): void {
        this.printStatusText('Booting phaser...');
        this.printStatusText('-> Phaser version 3', this.textSectionOffset);
        this.printStatusText('Starting game...(+)', this.textSectionOffset);
        this.printStatusText(this.title);
        this.printStatusText('+ Start loading assets...', this.textSectionOffset);
        this.loadAssets();
    }

    /**
     * @inheritdoc
     */
    public create(): void {
        this.successSound = this.sound.add(assets.sounds.effects.ding.key);
        this.input.keyboard.once('keydown', () => this.startTitleScene());
        this.input.once(Phaser.Input.Events.POINTER_UP, this.startTitleScene, this);
    }

    /**
     * Starts the games title scene.
     */
    private startTitleScene(): void {
        this.successSound.play();
        this.input.setDefaultCursor(`url(${assets.cursors.arrow.url}), pointer`);
        this.scene.start(environment.scenes.title);
    }

    /**
     * Writes text to the display list.
     * @param text The text to write to the list.
     * @param offset The offset in y direction for the next textblock. Default is 16.
     * @returns The created text object.
     */
    private printStatusText(text: string | string[], offset: number = 16): Phaser.GameObjects.Text {
        const displayText = this.add.text(4, this.textY, text);

        if (Array.isArray(text)) {
            this.textY += offset * text.length;
            return displayText;
        }

        this.textY += offset;
        return displayText;
    }

    /**
     * Loads alle assets of the game into the phaser cash.
     */
    private loadAssets(): void {
        this.loadImages();
        this.loadSounds();

        this.printStatusText('-> Game ready! Press any key to start...').setTint(0x32a852);
    }

    /**
     * Loads the games image assets to make
     * them available for all following scenes.
     */
    private loadImages(): void {
        this.printStatusText('++ Loading images...');
        const groups = Object.keys(assets.images);

        groups.forEach((group: string) => {
            const images = assets.images[group];

            Object.values(images).forEach((image: Asset) => {
                this.printStatusText(`+++ Parsing ${group}:${image.key}`);
                this.load.image(image.key, image.url);
            });
        });

        this.printStatusText('++ Done loading images', this.textSectionOffset);
    }

    /**
     * Loads all the games sounds to make
     * them available for all following scenes.
     */
    private loadSounds(): void {
        this.printStatusText('++ Loading sounds...');

        const groups = Object.keys(assets.sounds);

        groups.forEach((group) => {
            const sounds = assets.sounds[group];

            Object.values(sounds).forEach((sound: Asset) => {
                this.printStatusText(`+++ Parsing ${group}:${sound.key}`);
                this.load.audio(sound.key, sound.url);
            });
        });

        this.printStatusText('++ Done loading sounds', this.textSectionOffset);
    }
}
