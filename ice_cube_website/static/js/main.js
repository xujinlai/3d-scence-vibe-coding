// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Dark gray background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), antialias: true });

// Set renderer size
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

// Position the camera
camera.position.z = 5;
camera.position.y = 2; // Slightly elevate camera to look down a bit

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Create ice-like material
const iceMaterial = new THREE.MeshPhongMaterial({
    color: 0xadd8e6,    // Light blue
    transparent: true,  // Ensure transparency is enabled
    opacity: 0.6,       // Adjusted opacity
    shininess: 120,
    specular: 0x444444,
    depthWrite: false   // Key for better transparency with other objects
});

// Create cube geometries
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create and position cubes
const cubes = [];
const cubePositions = [-2.5, 0, 2.5];

for (let i = 0; i < 3; i++) {
    const cube = new THREE.Mesh(cubeGeometry, iceMaterial);
    cube.position.x = cubePositions[i];
    cube.position.y = 0; // Cubes at y=0
    scene.add(cube);
    cubes.push(cube);
}

// Add a Background Grid Plane
const planeSize = 20;
const textureLoader = new THREE.TextureLoader();
const gridTexture = textureLoader.load('https://threejs.org/examples/textures/grid.png');
gridTexture.wrapS = THREE.RepeatWrapping;
gridTexture.wrapT = THREE.RepeatWrapping;
gridTexture.repeat.set(planeSize / 2, planeSize / 2); // Adjust texture repeat based on plane size

const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMaterial = new THREE.MeshBasicMaterial({
    map: gridTexture,
    side: THREE.DoubleSide // Render both sides of the plane
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate plane to be horizontal
plane.position.y = -1.5;         // Position plane below the cubes
scene.add(plane);

// Initialize OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 20; // Increased max distance to see more of the grid
controls.target.set(0, 0, 0); // Ensure controls target the center of the cubes

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    cubes.forEach(cube => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
    });

    renderer.render(scene, camera);
}

// Start animation
animate();
