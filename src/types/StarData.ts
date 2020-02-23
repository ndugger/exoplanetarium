interface EntityResources {
    texture: string;
}

interface PlanetData {
    id: number;
    name: string;
    description: string;
    resources: EntityResources;
    satellites: unknown[];
}

export interface StarData {
    name: string;
    description: string;
    planets: PlanetData[];
}