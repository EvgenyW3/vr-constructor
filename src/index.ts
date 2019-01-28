import * as THREE from "three";

import "imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js";
import { LoadingManager } from "three";

// Scene with background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x132533);
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Controls
const controls = new THREE.OrbitControls(camera);
// Renderer
const renderer = new THREE.WebGLRenderer();
// Shadow support
renderer.shadowMap.enabled = true;
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
// Geometry
const geometry = new THREE.BoxGeometry(2, 2, 2);
// Texture
const texture = new THREE.TextureLoader().load("wood-texture-box-4.jpg");
// Material
const material = new THREE.MeshPhongMaterial({ map: texture });
// Creating cube
const cube = new THREE.Mesh(geometry, material);
cube.position.y += 1;
cube.receiveShadow = true;
cube.castShadow = true;

scene.add(cube);
// Creating floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 10, 10),
  new THREE.MeshPhongMaterial({ color: 0xffffff })
);
floor.rotation.x -= Math.PI / 2;
floor.position.y = -2;
floor.receiveShadow = true;

scene.add(floor);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

scene.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 1, 20);
light.position.set(0, 5, 3);
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 25;

scene.add(light);

camera.position.set(0, 10, 5);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
animate();
