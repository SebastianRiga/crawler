/**
 * TODO: Add documentation!
 */
export interface Dimensions {
    width: number;
    height: number;
}

/**
 * TODO: Add documentation!
 */
export class Coordinate {
    /**
     * @param x Position of the coordinate along the x axis.
     * @param y Position of the coordiante along the y axis.
     */
    constructor(public x: number, public y: number) { }

    /**
     * Check if two cocrdinates have the same x and y positions.
     * @param other The coordinate to compare to.
     * @returns True if both coordiantes have the same x and y positions. False otherwise.
     */
    public equals(other: Coordinate): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

