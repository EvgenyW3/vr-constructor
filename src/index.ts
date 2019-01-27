import * as THREE from "three";

import "imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js";
import "imports-loader?THREE=three!three/examples/js/loaders/GLTFLoader.js";

// Scene with background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Platform
const helper = new THREE.GridHelper(10, 10, 0xffffff, 0xffffff);
helper.position.y = -2;
scene.add(helper);
// Controls
const controls = new THREE.OrbitControls(camera);
// Renderer
const renderer = new THREE.WebGLRenderer();
// Setting size and adding renderer(canvas) to a document
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Responiveness
window.addEventListener("resize", function() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
animate();
