// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Dark gray background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), antialias: true });

// Set renderer size
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

// Position the camera
camera.position.z = 5;

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Increased ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9); // Increased directional light
directionalLight.position.set(5, 10, 7.5); // Adjusted light position for better highlights
scene.add(directionalLight);

// Create ice-like material
const iceMaterial = new THREE.MeshPhongMaterial({
    color: 0xadd8e6,    // Light blue
    transparent: true,
    opacity: 0.8,       // Slightly increased opacity for better visibility against dark background
    shininess: 120,     // Increased shininess
    specular: 0x444444  // Slightly increased specular
});

// Create cube geometries
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create and position cubes
const cubes = [];
const cubePositions = [-2.5, 0, 2.5]; // Slightly increased spacing

for (let i = 0; i < 3; i++) {
    const cube = new THREE.Mesh(cubeGeometry, iceMaterial);
    cube.position.x = cubePositions[i];
    cube.position.y = 0;
    scene.add(cube);
    cubes.push(cube);
}

// Initialize OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2; // Set min zoom distance
controls.maxDistance = 15; // Set max zoom distance

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
