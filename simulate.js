import * as THREE from "./build/three.module.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { models_3D } from "./loadModels.js";
import { positioning } from "./charcam.js";
import {
  my_Projects,
  animation,
  reactD,
  qtproject,
  earthproject,
  calproject,
} from "./myprojects.js";
import TWEEN from "@tweenjs/tween.js";

var scene,
  camera,
  // controls,
  renderer,
  clock;

let models_vars = {
  lightInlamp: null,
  wall1: null,
  wall2: null,
  wall3: null,
  wall4: null,
  p_mesh: null,
  tv: null,
  mirror: null,
  pot: null,
  drawer: null,
  tvStand: null,
  a_roof: null,
  bed: null,
  floorlamp: null,
  books1: null,
  books2: null,
};

// fan;
// let physicsworld, tempTransform;
// let rigidbodies = [];
let state = false;
let music;
let play = true;
let load = false;
let mirrorcomes, mirrorins;

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

async function startit() {
  // tempTransform = new Ammo.btTransform();
  await initialSetup();

  //When rerender function started execution it wont allow any other processes simultaneously
  //so this will make sure rerender run after some necessary global variable initialized :)
  // function callback(){
  // if (reactD,qtproject,earthproject,calproject){

  //     physics();
  //     rerender();

  // }else{
  //     setTimeout(callback,1000)
  //     }
  // }
  // callback();

  positioning(camera, THREE);
  my_Projects(OBJLoader, MTLLoader, THREE, scene);
  document.getElementById("waiting").style.display = "none";
  rerender();
}

startit(); //if physics applied than remove this as Ammo().then take care of it

async function initialSetup() {
  const backgroundColor = "black";
  const color = new THREE.Color(backgroundColor);
  scene = new THREE.Scene();
  scene.background = color;

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.2,
    1000
  );
  camera.position.z = 12;
  camera.position.x = 0;
  camera.position.y = 10;
  camera.lookAt(0, -11, -40);

  //The purpose of this camera was the implementating functionality of camera such as forward movement
  //mouse events and to place according to the house area
  // camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.2, 1000 );
  // camera2.position.z = 19
  // camera2.position.x = 0
  // camera2.position.y = 15
  // camera2.lookAt(0,-11,-40)

  clock = new THREE.Clock(); //for physics

  const ambientlight = new THREE.AmbientLight(0x404040);
  scene.add(ambientlight);

  const light = new THREE.DirectionalLight(0xf7f7f7, 0.8);
  light.position.x = -20;
  light.position.y = 30;
  light.position.z = 1;
  light.rotation.y = -1;

  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;

  let d = 50;

  light.shadow.camera.left = -d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;

  light.shadow.camera.far = 13500;
  scene.add(light);

  const light2 = new THREE.DirectionalLight(0xf7769d, 0.2);
  light2.position.x = 20;
  light2.position.y = 30;
  light2.position.z = 1;
  light2.rotation.y = -1;

  light2.castShadow = true;
  light2.shadow.mapSize.width = 2048;
  light2.shadow.mapSize.height = 2048;

  light2.shadow.camera.left = -d;
  light2.shadow.camera.right = d;
  light2.shadow.camera.top = d;
  light2.shadow.camera.bottom = -d;

  light2.shadow.camera.far = 13500;
  scene.add(light2);

  const light3 = new THREE.DirectionalLight(0xf7f7f7, 0.4);
  light3.position.x = 0;
  light3.position.y = 30;
  light3.position.z = -30;
  light3.rotation.y = -1;

  light3.castShadow = true;
  light3.shadow.mapSize.width = 2048;
  light3.shadow.mapSize.height = 2048;

  light3.shadow.camera.left = -d;
  light3.shadow.camera.right = d;
  light3.shadow.camera.top = d;
  light3.shadow.camera.bottom = -d;

  light3.shadow.camera.far = 13500;
  scene.add(light3);

  models_3D(THREE, scene, models_vars);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.localClippingEnabled = true;
  document.body.appendChild(renderer.domElement);
  // controls = new OrbitControls( camera2, renderer.domElement );
  // controls.enableZoom = true
  // controls.target = new THREE.Vector3( 0, -5, -50 );
  // controls.update();

  //audio
  const btn = document.getElementById("button");
  btn.addEventListener("click", function () {
    const audiolistener = new THREE.AudioListener();
    camera.add(audiolistener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("./assets/simulationVoice.ogg", function (obj) {
      const sound = new THREE.Audio(audiolistener);
      sound.setBuffer(obj);
      sound.setLoop(true);
      sound.setVolume(0.8);
      music = sound;
      audioLoader.load("./assets/mirrorcomes.ogg", function (object) {
        const sound = new THREE.Audio(audiolistener);
        sound.setBuffer(object);
        sound.setLoop(false);
        mirrorcomes = sound;
      });
    });
  });
}

window.addEventListener("resize", onWindowresizing, false);

function onWindowresizing() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function dontmove() {
  state = false;
}
function mousemove(event) {
  state = true;
}
function getcoordinate(event) {
  mouse.x = (event.clientX - window.innerWidth / 2) * 0.09;
  mouse.y = -(event.clientY - window.innerHeight / 2) * 0.09;
  if (state) {
    if (camera.position.z > -19.0) {
      camera.lookAt(mouse.x, -9, -40);
    } else {
      camera.lookAt(mouse.x, -3, -40);
    }

    camera.updateProjectionMatrix();
  }
}

//mirror instruction
function mirrorloader() {
  const fbx = new FBXLoader();
  fbx.load("./Assets/magicalMirro/mirrors.fbx", function (obj) {
    console.log("objeeee mirror ", obj);
    obj.scale.set(0.1, 0.05, 0.05);
    obj.position.set(-1, 0, -17);
    obj.rotation.set(-2.1, 0, 0);
    scene.add(obj);
    mirrorins = obj;
    // tweening
    function mirrorTween() {
      var object = {
        x: -1,
        y: 0,
        z: -20,
      };
      const tweening = new TWEEN.Tween(object)
        .to({ x: -1, y: 0, z: -17 }, 2000)
        .easing(TWEEN.Easing.Bounce.Out);
      tweening.onUpdate((object, elapsetime) => {
        obj.position.set(object.x, object.y, object.z);
      });
      tweening.start();
    }
    mirrorTween();
    if (mirrorcomes) {
      mirrorcomes.setVolume(0.6);
      mirrorcomes.play();
    }
  });
}

window.addEventListener("click", function (event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  if (camera.position.z < -19.0) {
    var arr = [reactD[1], qtproject, earthproject, calproject];
    const intersects = raycaster.intersectObjects(arr, false);
    if (intersects[0].object.name === "reactDjango") {
      window.open("https://dudichatapp.herokuapp.com/");
    } else if (intersects[0].object.name === "qt") {
      window.open("https://photos.app.goo.gl/geCQoc4oQjBjs5cB7"); // it is cross platform desktop software so only thing left is to show videos of the working software
      // if you want to see source code look around here
    } else if (intersects[0].object.name === "calculator") {
      window.open("https://photos.app.goo.gl/jLM2e9yJVLPuZT559"); //same as Qt
    } else {
      //i have given name earthobj but its okay
      window.open("https://duditestproject.netlify.app/");
    }
  }
});

function rerender() {
  // let delta_T = clock.getDelta()
  // updatingPhysics(delta_T)

  // controls.update();

  window.addEventListener("mousedown", mousemove);
  window.addEventListener("mousemove", getcoordinate);
  window.addEventListener("mouseup", dontmove);
  renderer.render(scene, camera);
  raycaster.setFromCamera(pointer, camera);

  //magical mirror instruction
  if (camera.position.z < 5 && load == false) {
    mirrorloader();
    load = true;
  }

  if (
    camera.position.z < -19.0 &&
    camera.position.x <= 1.8 &&
    camera.position.x >= -3.5
  ) {
    if (play) {
      music.play();
      animation(THREE, TWEEN);
      camera.lookAt(0, -3, -40);
      play = false;
    }
    scene.remove(mirrorins);
    scene.remove(models_vars.mirror);
    scene.remove(models_vars.p_mesh);
    scene.remove(models_vars.a_roof);
    scene.remove(models_vars.bed);
    scene.remove(models_vars.pot);
    scene.remove(models_vars.drawer);
    scene.remove(models_vars.books1);
    scene.remove(models_vars.books2);
    scene.remove(models_vars.tvStand);
    scene.remove(models_vars.tv);
    scene.remove(models_vars.floorlamp);
    scene.remove(models_vars.lightInlamp);
    scene.remove(models_vars.wall1);
    scene.remove(models_vars.wall2);
    scene.remove(models_vars.wall3);
    scene.remove(models_vars.wall4);
    // fan.visible = false // I commented it out cos it is just extra burder of application if
    // you want see fan on roof as well just comment it out
  }

  TWEEN.update();
  window.requestAnimationFrame(rerender);
}

// function physics() {
//   // let collisionConf = new Ammo.btDefaultCollisionConfiguration();
//   // let dispatcher = new Ammo.btCollisionDispatcher(collisionConf);
//   // let overlapPair = new Ammo.btDbvtBroadphase();
//   // let solver = new Ammo.btSequentialImpulseConstraintSolver();
//   // physicsworld = new Ammo.btDiscreteDynamicsWorld(dispatcher,overlapPair,solver,collisionConf);
//   // physicsworld.setGravity(new Ammo.btVector3(0,-10,0));
//   // //plane
//   // objectPhysics(p_mesh,"box",0)
//   // //all objects
//   // var arr = [a_roof,mirror,couchs,laptop,bed,pot,drawer,books1,books2,tvStand,
//   // tv,floorlamp,models_vars.lightInlamp,fan,wall1,wall2,wall3,wall4]
//   // //all objects in the house
//   // for(var k=0;k<arr.length;k++){
//   //     if(arr[k].userData.shapeis){
//   //         objectPhysics(arr[k],arr[k].userData.shapeis,1)
//   //     }else{
//   //         objectPhysics(arr[k],"box",0)
//   //     }
//   // }
//   // //btBoxShape // Box defined by the half extents (half length) of its sides
//   // //btSphereShape // Sphere defined by its radius
//   // //btCapsuleShape // Capsule around the Y axis. Also btCapsuleShapeX/Z
//   // //btCylinderShape // Cylinder around the Y axis. Also btCylinderShapeX/Z.
//   // //btConeShape //  Cone around the Y axis. Also btConeShapeX/Z.
//   // //With functional based approach i can reduce variable declaration and it is clean but might
//   // //take little bit time to load fully functional application coz when function gives output then
//   // //next function start initiate that is js thing we know
//   // function objectPhysics(obj,shapes,radius=0,mass){
//   //     var posx = obj.position.x,
//   //     posx = obj.position.y,
//   //     posz = obj.position.z,
//   //     rotx = obj.rotation.x,
//   //     roty = obj.rotation.y,
//   //     rotz = obj.rotation.z,
//   //     rotw = obj.rotation.w,
//   //     scalex = obj.scale.x,
//   //     scaley = obj.scale.y,
//   //     scalez = obj.scale.z
//   //     let transform = new Ammo.btTransform()
//   //     transform.setIdentity()
//   //     transform.setOrigin(new Ammo.btVector3(posx,posy,posz))
//   //     transform.setRotation(new Ammo.btQuaternion(rotx,roty,rotz,rotw))
//   //     let motion = new Ammo.btDefaultMotionState(transform)
//   //     //phisical object shape
//   //     let shape
//   //     switch(shapes){
//   //         case "box":
//   //             shape = new Ammo.btBoxShape(new Ammo.btVector3(scalex*0.5,scaley*0.5,scalez*0.5));
//   //             shape.setMargin( 0.05 );
//   //             break;
//   //         case "sphere":
//   //             shape = new Ammo.btSphereShape(radius);
//   //             break;
//   //         case "capsule":
//   //             // shape = new Ammo.btSphereShape();
//   //             alert("unknow case")
//   //             break;
//   //         case "cylinder":
//   //             // shape = new Ammo.btCylinderShape();
//   //             alert("unknow case")
//   //             break;
//   //         case "cone":
//   //             // shape = new Ammo.btConeShape();
//   //             alert("unknow case")
//   //             break;
//   //     }
//   //     //inertia
//   //     let localInertia = new Ammo.btVector3( 0, 0, 0 );
//   //     shape.calculateLocalInertia(mass,localInertia);
//   //     //for multiple rigid bodies with same costruction info
//   //     let rbodies = new Ammo.btRigidBodyConstructionInfo(mass,motion,shape,localInertia)
//   //     //actuall rigid bodies
//   //     let rigidBody = new Ammo.btRigidBody(rbodies);
//   //     //adding to physics world
//   //     physicsworld.addRigidBody(rigidBody);
//   //     //adding rigid body in three object for accessing later in upadate physics function so
//   //     //i wouldn't have to make a global variable and then access for changing property of object
//   //     obj.userData.physicsbody = rigidBody;
//   //     //for accessing three object itself automatically in update function so i dont have to pass
//   //     //it to manually every single frame on initial setup
//   //     rigidbodies.push(obj)
//   // }
// }
// function updatingPhysics(deltatime) {
//   // physicsworld.stepSimulation(deltatime,10)
//   // for(let i=0;i<rigidbodies.length;i++){
//   //     let obj = rigidbodies[i];
//   //     let physicsobj = obj.userData.physicsbody;
//   //     let motioninfo = physicsobj.getMotionState();
//   //     if (motioninfo){
//   //         motioninfo.getWorldTransform(tempTransform);
//   //         let positions = tempTransform.getOrigin(); //yeah it is long name for variable but it explain itself
//   //         let rotations = tempTransform.getRotation();
//   //         obj.position.set(positions.x(),positions.y(),positions.z());
//   //         obj.rotation.set(rotations.x(),rotations.y(),rotations.z());
//   //     }
//   // }
// }
