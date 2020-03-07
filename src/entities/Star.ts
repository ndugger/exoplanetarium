import { Planet } from "this/entities/Planet";

export class Star {

    private planets: Planet[];

    public constructor() {

    }

    /**
     * Move a planet into a solar system.
     */
    public adopt(planet: Planet): void {
        /**
         * If planet already orbits star, do nothing.
         */
        if (!this.planets.includes(planet)) {
            return;
        }

        this.planets.push(planet);
    }
}