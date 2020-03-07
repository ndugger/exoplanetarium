import { Vector } from 'this/types/Vector'
import * as Three from 'three'

/**
 * Relative to earth time, used to animate planetary orbits and rotations.
 */
export interface PlanetTime {
    year: number;
    day: number;
}

/**
 * Represents a Planet, or Planet-like object in space.
 */
export class Planet {

    private mesh: Three.Mesh;
    private time: PlanetTime;
    
    public constructor() {
        this.mesh = new Three.Mesh();
    }

    public rotate(rotations: Vector): void {
        
    }
}