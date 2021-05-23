import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as fontJson  from 'three/examples/fonts/helvetiker_regular.typeface.json';
const font = new THREE.Font( fontJson );

import imgUrl from './william.jpeg'

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

// Mouse
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2()

document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousedown', onMouseDown, false);

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function manageRaycasterIntersections(scene, camera) {
  camera.updateMatrixWorld();
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {

  } 
  else {

  }
}

let objectRotation = 0.01

function onMouseDown(event){
  objectRotation = -objectRotation
  console.log(objectRotation)
//  customLog("mouse position: (" + mouse.x + ", "+ mouse.y + ")");
}

function addStar() {
  // const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const geometry = new THREE.TextGeometry( 'WILLIAM', {
    font: font,
    size: 0.5,
    height: 0.1,
  } );
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(10));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(5).fill().forEach(addStar);


// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// Avatar

const williamTexture = new THREE.TextureLoader().load('/assets/william.ab98960b.jpeg');

const william = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: williamTexture }));

scene.add(william);

// Sphere

const sphereTexture = new THREE.TextureLoader().load('/assets/william.ab98960b.jpeg');
// const normalTexture = new THREE.TextureLoader().load('normal.png');

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sphereTexture
  })
);

scene.add(sphere);

william.position.z = 28;
william.position.setX(-5);

sphere.position.z = -2;
sphere.position.x = 3;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // sphere.rotation.x += 0.05;
  sphere.rotation.y += (objectRotation*7.5);
  // sphere.rotation.z += 0.05;

  // william.rotation.y += 0.01;
  // william.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// const mouse;

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  sphere.rotation.y += objectRotation;
  
  william.rotation.y = mouse.x
  william.rotation.z = mouse.y

  // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // console.log(mouse)


  // controls.update();

  renderer.render(scene, camera);
}

animate();