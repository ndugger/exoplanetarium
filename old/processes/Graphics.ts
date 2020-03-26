import * as Fusion from 'fusion';
import { Data } from 'old/types/Data';

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

function getRandomStarField(scene: Fusion.GFX.Scene, stars: number, size: number) {
    const texture = new Fusion.GFX.DynamicTexture('starfield', size, scene, false);

	const context = texture.getContext();
    context.fillStyle = '#000207';
	context.fillRect(0, 0, size, size);

	for (let i = 0; i < stars; ++i) {
		const radius = Math.random() * 3;
		const x = Math.floor(Math.random() * size);
		const y = Math.floor(Math.random() * size);

		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = starColors[Math.round(Math.random() * starColors.length)];
        context.globalAlpha = Math.random() * 0.66;
		context.fill();
    }
    
    texture.update();
    
	return texture;
}

function render(canvas: HTMLCanvasElement) {
    const engine = new Fusion.GFX.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    const scene = new Fusion.GFX.Scene(engine);
    const camera = new Fusion.GFX.FreeCamera('viewport', new Fusion.GFX.Vector3(0, 5, -10), scene);

    camera.position = Fusion.GFX.Vector3.Zero();
    
    fetch('/data/sol.json').then(response => response.json()).then((data: Data.Star) => {
        const space = Fusion.GFX.Mesh.CreateBox('space_mesh', 256, scene, false, Fusion.GFX.Mesh.BACKSIDE);
        const spaceMaterial = new Fusion.GFX.BackgroundMaterial('space_material', scene);
        const spaceTexture = getRandomStarField(scene, 4096 * 1.33, 4096);

        spaceMaterial.alpha = 0;
        spaceMaterial.diffuseTexture = spaceTexture;
        space.material = spaceMaterial;

        const sun = Fusion.GFX.Mesh.CreateSphere('sun', 32, 5, scene, false, Fusion.GFX.Mesh.FRONTSIDE);
        const sunLight = new Fusion.GFX.PointLight('sun_light', sun.position, scene);
        const sunMaterial = new Fusion.GFX.StandardMaterial('sun_material', scene);
        const sunTexture = new Fusion.GFX.Texture('/textures/sun.jpg', scene);

        sun.material = sunMaterial;
        sun.position = Fusion.GFX.Vector3.Zero();
        sun.rotation.z = 0.2;
        sunLight.radius = 1024;
        sunMaterial.alpha = 0;
        sunMaterial.emissiveTexture = sunTexture;

        const planets = data.planets.map((planet, i) => {
            const sphere = Fusion.GFX.MeshBuilder.CreateSphere(`planet_${ i }`, {
                segments: 32,
                diameter: 2,
                sideOrientation: Fusion.GFX.Mesh.FRONTSIDE
            }, scene);
            const sphereMaterial = new Fusion.GFX.StandardMaterial(`planet_${ i }_material`, scene);

            sphere.rotation.y = -1;
            sphere.rotation.z += 0.2;

            if (planet.resources.texture) {
                sphereMaterial.diffuseTexture = new Fusion.GFX.Texture(planet.resources.texture, scene);
            }

            sphere.material = sphereMaterial;
            sphere.material.alpha = 0;
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
                    Math.cos(Date.now() * 0.0001) * -(5 * (i + 1)), 
                    0, 
                    Math.sin(Date.now() * 0.0001) * (5 * (i + 1))
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
                    render(message.data.canvas);
            }
        } catch (error) {
            console.error(error);
        }
    });
}

main();