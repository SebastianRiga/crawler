import Phaser from 'phaser';

import { BaseScene } from './base.scene';
import { environment } from '../environment/environment';
import { CharacterClass, HunterClass, MageClass, RougeClass, WarriorClass } from '../types/character-class';

/**
 *
 */
export class CharacterCreationScene extends BaseScene {
    /**
     * ##################################
     * # Properties
     * ##################################
    */

    private classes: CharacterClass[] = [
        WarriorClass,
        RougeClass,
        HunterClass,
        MageClass,
    ];

    private currentClass: CharacterClass;
    private currentClassImage: Phaser.GameObjects.Image;

    /**
     * ##################################
     * # Accessors / Setters
     * ##################################
    */

    /**
     * Shorthand setter for the currently selected character class.
     * @param characterClass The newly selected character class;
     */
    public set selectedClass(characterClass: CharacterClass) {
        this.currentClass = characterClass;
        this.currentClassImage.setTexture(characterClass.image);
    }

    /**
     * Shorthand accessors for the currently selected character class.
     */
    public get selectedClass(): CharacterClass {
        return this.currentClass;
    }

    /**
     * ##################################
     * # Constructor
     * ##################################
    */

    /**
     * @inheritdoc
     */
    constructor() {
        super(environment.scenes.characterCreation);
    }

    /**
     * ##################################
     * # Lifecycle
     * ##################################
    */

    /**
     * @inheritdoc
     */
    public create(): void {
        this.createClassSelection();
        this.createPanels();
        this.createButtons();
    }

    /**
     * ##################################
     * # UI Building
     * ##################################
    */

    /**
     * Creates the class icons for the character class selection.
     * @param x The starting x coordinate to place the icons. Default 48.
     * @param y The starting y coordinate to place the icons. Default 48.
     * @param offset The offset added to the icons y coordinate when placing additonal icons. Default 56.
     * @param scale The scale factor for the icons, applied to both width and height to preserve the aspect ratio. Default 2.
     */
    private createClassSelection(x: number = 48, y: number = 48, offset: number = 56, scale: number = 2): void {
        if (this.classes.length === 0) {
            return;
        }

        let currentX = x;

        this.classes.forEach((clazz, idx) => {
            const currentOffset = idx === 0 ? 0 : offset;

            const icon = this.uiBuilder.imageButton(clazz.icon, currentX + currentOffset, y)
                .setScale(scale)
                .setOnClickListener(() => this.onClassIconClick(clazz));

            currentX = icon.x;
        });

        this.currentClass = this.classes[0];
        this.currentClassImage = this.add.image(this.center.x, this.center.y, this.classes[0].image).setScale(5, 5);
    }

    /**
     * Creates the menu panels for the stat overview and the background story.
     */
    private createPanels(): void {
        this.uiBuilder.panel('Attributes', 128, this.center.y);
        this.uiBuilder.panel('Description', this.dimensions.width - 128, this.center.y);
    }

    /**
     * Creates the back and start game button.
     */
    private createButtons(): void {
        this.uiBuilder.button('Return to Title', this.center.x * .7, this.dimensions.height - 48)
            .setOnClickListener(() => this.scene.start(environment.scenes.title));

        this.uiBuilder.button('Start Game', this.center.x * 1.3, this.dimensions.height - 48)
            .setOnClickListener(() => this.onStartGameClick());
    }

    /**
     * ##################################
     * # Event Handling
     * ##################################
    */

    /**
     * Updates the display data according to the selected class.
     * @param characterClass The newly selected character class with
     * which the display options should be updated.
     */
    private onClassIconClick(characterClass: CharacterClass): void {
        this.selectedClass = characterClass;
    }

    /**
     * Callback for the start game button. Prompts the user to enter a
     * name for their character.
     */
    private onStartGameClick(): void {
        this.uiBuilder.dialog.prompt(`What is thy name ${this.selectedClass.name}?`, 'Bastian')
            .then((name) => {
                this.scene.start(environment.scenes.game);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
