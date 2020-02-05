import * as Three from 'three';

export function init(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('webgl2', { alpha: false });

    const camera = new Three.PerspectiveCamera(64, canvas.width / canvas.height, 0.1, 1000);
    const renderer = new Three.WebGLRenderer({ canvas, context });
    const scene = new Three.Scene();

    const earthGeometry = new Three.SphereGeometry(3, 32, 32);
    const earthMaterial = new Three.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const earth = new Three.Mesh(earthGeometry, earthMaterial);

    const spaceGeometry  = new Three.SphereGeometry(100, 32, 32);
    const spaceMaterial  = new Three.MeshBasicMaterial({ side: Three.BackSide });
    const space  = new Three.Mesh(spaceGeometry, spaceMaterial);

    renderer.setSize(canvas.width, canvas.height);
    scene.add(earth);
    scene.add(space);

    camera.position.z = 3;
    earth.rotation.y = -1;
    earth.rotation.z += 0.2;
    earthMaterial.map = Three.ImageUtils.loadTexture('textures/earth.jpg');
    spaceMaterial.map = Three.ImageUtils.loadTexture('textures/space.png');
    spaceMaterial.map.wrapS = Three.RepeatWrapping;
    spaceMaterial.map.wrapT = Three.RepeatWrapping;
    spaceMaterial.map.repeat.set(6, 6);

    function paint(): void {
        requestAnimationFrame(paint);

        renderer.render(scene, camera);
    }

    function update(): void {
        setTimeout(update, 1000 / 60);

        if (camera.position.z < 10) {
            camera.position.y += 0.05;
            camera.position.z += 0.05;
            camera.lookAt(scene.position)
        }

        earth.rotation.y += 0.005;

        if (earthMaterial.opacity < 1) {
            earthMaterial.opacity += 0.005;
        }
    }

    paint();
    update();
}
