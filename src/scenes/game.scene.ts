import { BaseScene } from './base.scene';
import { environment } from '../environment/environment';

/**
 *
 */
export class GameScene extends BaseScene {
    /**
     * @inheritdoc
     */
    constructor() {
        super(environment.scenes.game);
    }
}
