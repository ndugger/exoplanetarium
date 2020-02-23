import { StarData } from 'this/types/StarData';
import * as Three from 'three';

export function init(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('webgl2', { alpha: false });
    const   scene = new Three.Scene();
    const   webgl = new Three.WebGLRenderer({ canvas, context });

    fetch('/data/sol.json').then(response => response.json()).then((data: StarData) => {
        const camera = new Three.PerspectiveCamera(64, canvas.width / canvas.height, 0.1, 1000);
              camera.position.z = 3;

        const spaceGeometry = new Three.SphereGeometry(100, 32, 32);
        const spaceMaterial = new Three.MeshBasicMaterial({ side: Three.BackSide });
              spaceMaterial.map = new Three.TextureLoader().load('textures/space.jpg');
              spaceMaterial.map.wrapS = Three.RepeatWrapping;
              spaceMaterial.map.wrapT = Three.RepeatWrapping;
              spaceMaterial.map.repeat.set(5, 5);
        const     spaceMesh = new Three.Mesh(spaceGeometry, spaceMaterial);

        scene.add(spaceMesh);

        const space = {
            geometry: spaceGeometry,
            material: spaceMaterial,
                mesh: spaceMesh
        }

        const planets = data.planets.map((planet, i) => {
            const geometry = new Three.SphereGeometry(3, 64, 64);
            const material = new Three.MeshBasicMaterial({ transparent: true, opacity: 0 });
            const     mesh = new Three.Mesh(geometry, material);
                      mesh.position.x = i * 15;
                      mesh.rotation.y = -1;
                      mesh.rotation.z += 0.2;

            if (planet.resources.texture) {
                material.map = new Three.TextureLoader().load(planet.resources.texture);
            }

            scene.add(mesh);

            return {
                geometry,
                material,
                    mesh
            }
        });

        function paint(): void {
            requestAnimationFrame(paint);
            webgl.render(scene, camera);
        }
    
        function update(): void {
            setTimeout(update, 1000 / 60);
    
            if (camera.position.z < 20) {
                camera.position.y += 0.05;
                camera.position.z += 0.15;
                camera.lookAt(planets[1].mesh.position);
            }

            planets.forEach(planet => {
                planet.mesh.rotation.y += 0.005;

                if (planet.material.opacity < 1) {
                    planet.material.opacity += 0.005;
                }
            });
        }

        update();
        paint();
    });
}
