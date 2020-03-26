import { Entity as EntityType } from 'old/types/Entity';

export namespace Data {

    export interface Entity {
        description: string;
        entity: EntityType;
        id: string;
        known: boolean;
        name: string;
        resources: {
            model?: string;
            texture?: string;
        }
        period: {
            day: number;
            year: number;
        }
    }

    export interface Moon extends Entity {
        entity: EntityType.Moon;
    }
    
    export interface Planet extends Entity {
        atmosphere: boolean;
        entity: EntityType.Planet;
        moons: Moon[];
    }

    export interface Star extends Entity {
        entity: EntityType.Star;
        planets: Planet[];
    }
}
