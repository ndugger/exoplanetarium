import * as Babylon from 'babylonjs';
import { StarData } from 'this/types/StarData';
import * as Three from 'three';

const starColors = [
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffaaaa',
    '#ffffaa',
    '#aaaaff'
];

function getRandomStarField(scene: Babylon.Scene, stars: number, size: number) {
    const texture = new Babylon.DynamicTexture('starfield', size, scene, false);

	const context = texture.getContext();
    context.fillStyle = '#000207';
	context.fillRect(0, 0, size, size);

	for (let i = 0; i < stars; ++i) {
		const radius = Math.random() * 2.5;
		const x = Math.floor(Math.random() * size);
		const y = Math.floor(Math.random() * size);

		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = starColors[Math.round(Math.random() * starColors.length)];
        context.globalAlpha = Math.random();
		context.fill();
    }
    
    texture.update();
    
	return texture;
}

function babylon(canvas: HTMLCanvasElement) {
    const engine = new Babylon.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    const scene = new Babylon.Scene(engine);
    const camera = new Babylon.FreeCamera('viewport', new Babylon.Vector3(0, 5, -10), scene);

    camera.position = Babylon.Vector3.Zero();
    
    fetch('/data/sol.json').then(response => response.json()).then((data: StarData) => {
        const space = Babylon.Mesh.CreateBox('space_mesh', 256, scene, false, Babylon.Mesh.BACKSIDE);
        const spaceMaterial = new Babylon.BackgroundMaterial('space_material', scene);
        const spaceTexture = getRandomStarField(scene, 4096, 4096);

        spaceMaterial.diffuseTexture = spaceTexture;
        space.material = spaceMaterial;

        const sun = Babylon.Mesh.CreateSphere('sun', 32, 5, scene, false, Babylon.Mesh.FRONTSIDE);
        const sunLight = new Babylon.PointLight('sun_light', sun.position, scene);
        const sunMaterial = new Babylon.BackgroundMaterial('sun_material', scene);
        const sunTexture = new Babylon.Texture('/textures/sun.jpg', scene);

        sunLight.radius = 256;
        sunMaterial.diffuseTexture = sunTexture;
        sun.material = sunMaterial;
        sun.position = Babylon.Vector3.Zero();
        sun.rotation.z = 0.2;

        const planets = data.planets.map((planet, i) => {
            const sphere = Babylon.MeshBuilder.CreateSphere(`planet_${ i }`, {
                segments: 32,
                diameter: 2,
                sideOrientation: Babylon.Mesh.FRONTSIDE
            }, scene);
            const sphereMaterial = new Babylon.StandardMaterial(`planet_${ i }_material`, scene);

            sphere.rotation.y = -1;
            sphere.rotation.z += 0.2;

            if (planet.resources.texture) {
                sphereMaterial.diffuseTexture = new Babylon.Texture(planet.resources.texture, scene);
            }

            sphere.material = sphereMaterial;
            sphere.position.x = (i + 1) * 2;
            
            return sphere;
        });
        
        engine.runRenderLoop(() => {
            sun.rotation.y += 0.005;

            if (camera.position.z < 33) {
                camera.position.y += 0.25;
                camera.position.z += 0.25;
            }
                
            if (space.material.alpha < 1) {
                space.material.alpha += 0.01;
            }
                
            if (sun.material.alpha < 1) {
                sun.material.alpha += 0.005;
            }
                
            planets.forEach((planet, i) => {
                planet.rotation.y += 0.005;

                if (planet.material.alpha < 1) {
                    planet.material.alpha += 0.005;
                }

                planet.position.set(
                    Math.cos((Date.now() - (1000 * i)) * 0.0001) * -(12.1212 * (i + 1)), 0, 
                    Math.sin((Date.now() - (1000 * i)) * 0.0001) * (6.66 * (i + 1))
                );
            });

            camera.setTarget(sun.position);
            scene.render();
        });
    });
}

function main(): void {
    addEventListener('message', message => {
        try {
            switch (message.data.type) {
                case 'init': 
                    babylon(message.data.canvas);
            }
        } catch (error) {
            console.error(error);
        }
    });
}

main();