import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import { TransformControls } from 'three/addons/controls/TransformControls.js';
// import {GLTFLoader} from "three/examples/jsm/controls/GLTFLoader.js"
import {VRButton} from "three/addons/webxr/VRButton.js"

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
// import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js"
// import { FBXLoader } from 'three-fbxloader-offical';
// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

let scene, camera, renderer;
let geometry, material, cube;
let geometry1, material1, cube1;
let planeGerometry, planeMaterial, plane;
let gridHelper, orbit, light, helper, transformcontrols, axesHelper
let angle = 0;
let myspace1;

// function init(){
    
    // creating scene
    scene = new THREE.Scene();
    // add backhground colot to the scene
    // scene.background = new THREE.Color(0xff00ff);
    // creating camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

    
    // creting renderer
    // {antialias:true} helps better render quality
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled=true;
    // creating stop texture for cube material start
    // create a texture loader
const textureLoader = new THREE.TextureLoader();

    // load the image
    textureLoader.load('./assets/images/stop.jpg',
    function (texture) {
        // create a material with the loaded texture
        const stopmaterial = new THREE.MeshBasicMaterial({map: texture});

        // create a cube with the material
        // const stopgeometry = new THREE.BoxGeometry(12,12,12);
        // const stopcube = new THREE.Mesh(stopgeometry, stopmaterial);
        // stopcube.position.set(-20,-10,0)
        // stopcube.name = "stopcube"
        // // add the cube to the scene
        // scene.add(stopcube);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened: ' + error);
    }
    );
    // creating stop texture for cube material end
    
    // creating and adding box
    // geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // material = new THREE.MeshStandardMaterial( { color: 0xffcc00} );
    // cube = new THREE.Mesh( geometry, material );
    // cube.position.x=20;
    // cube.position.y=-10
    // cube.position.z=0
    // cube.name = "yell-cube"
    // scene.add(cube );

    // geometry1 = new THREE.BoxGeometry( 10, 10, 10 );
    // material1 = new THREE.MeshStandardMaterial( { color: 0x00fffc } );
    // cube1 = new THREE.Mesh( geometry1, material1 );
    // cube1.position.set(0, -10, 10);
    // cube1.name = "cube1";
    // scene.add(cube1);

// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
    // creating space with planet
    // const geomet = []
    // const mater = []
    // for (let i = 0; i < 100; i++) {
    //     i = new THREE.BoxGeometry( 15, 15, 15 );
    //     geomet.push(i)
    // }
    // for (let m = 0; m < 100; m++) {
    //     m = new THREE.MeshStandardMaterial( { color: 0x00fffc } );
    //     mater.push(m)
    // }
    // for (let render = 0; render < 100; render++) {
    //     let myCube = new THREE.Mesh( geomet[render], mater[render] );
    //     myCube.position.x= render
    //     scene.add(myCube);
    // }
    // console.log(geomet[2])
    // console.log(mater[2])
    // console.log(render)

    // scene.add(myspace)
    // space1 finished
    
   
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
    // *********************************************************************

    // creating space with planet
    const bufgeo1 = new THREE.BufferGeometry();
    const vertices1 = []
    const colors = []

    const planet1 = new THREE.TextureLoader().load("./assets/images/withoutbgstart.png");

    for (let i = 0; i < 10000; i++) {
        const x = 2000 * Math.random() - 1000 ;
        const y = 2000 * Math.random() - 1000;
        const z = 2000 * Math.random() - 1000;
        vertices1.push(x,y,z);
        
        //generating colors
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        colors.push(r,g,b)
    }


    const Alphatextureloader = new THREE.TextureLoader().load("./assets/images/ODC4U.png")

    const material11 = new THREE.PointsMaterial({
        size:5,
        alphaMap:Alphatextureloader,
        alphaTest:0.5,
        // sizeAttenuation:true,
        // map:planet1,
        // transparent: true,
        // alphaTest:0.5,
        vertexColors:true
    });
    bufgeo1.setAttribute('position', new THREE.Float32BufferAttribute(vertices1, 3));
    bufgeo1.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    // material11.color.setHSL(0.5,  1, 1)

    myspace1 = new THREE.Points(bufgeo1, material11);
    scene.add(myspace1)
    // space1 finished
    // *********************************************************************



    // cerating flat plane
    planeGerometry = new THREE.PlaneGeometry(30,30);
    planeMaterial = new THREE.MeshStandardMaterial({color:0xCCCCCC, side:THREE.DoubleSide})
    plane = new THREE.Mesh(planeGerometry, planeMaterial);
    // scene.add(plane)
    plane.rotation.x = -0.5 * Math.PI;


    gridHelper = new THREE.GridHelper(30);
    // scene.add(gridHelper);

// new light #####################
const pointLight = new THREE.PointLight( 0x00ff00, 10, 100 );
pointLight.position.set( 0, 10, 30 );
scene.add( pointLight );

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );


    // lights
    light = new THREE.DirectionalLight( 0xFFFFFF );
    light.castShadow=true;
    light.position.set(5, 10 , 10)
    helper = new THREE.DirectionalLightHelper( light, 150 );
    // scene.add( helper );
    scene.add( light );

    // cube.castShadow=true; 
    plane.receiveShadow=true; 

    // shows everything
    orbit = new OrbitControls(camera, renderer.domElement)
    orbit.maxDistance=100; //camera distance from object
    orbit.enableRotate= true;
    orbit.enableDamping = true;
    // orbit.minPolarAngle= 1;
    // orbit.maxPolarAngle=1.5;
    // orbit.dampingFactor = 0.25;
    orbit.screenSpacePanning = true;
    orbit.autoRotate = true;

    // new added
    // orbit.maxDistance=300; //camera distance from object
    // orbit.panSpeed = 5; // speed of pan
    orbit.screenSpacePanning = true
    // orbit.dampingFactor = .5;// how much it will dampen the camera movement when user is not interacting with mouse
    // orbit.autoRotate = true;

    // transform control for controling the objects
    transformcontrols = new TransformControls(camera, renderer.domElement);
    transformcontrols.addEventListener('dragging-changed', function(event){
        orbit.enabled = !event.value; 
    })
    transformcontrols.setSize(0.5);
    transformcontrols.attach(pointLight);
    // transformcontrols.attach(cube1);
    scene.add(transformcontrols)



    // helper
    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    camera.position.set(0 , 0 ,40);
    orbit.update();
// } //init function finished here * * *

// function addEventListeners(){
//     window.addEventListener('resize',onWindowResize);
//     document.addEventListener('fullscreenchange', onFullscreenChange);
//     document.addEventListener('webkitfullscreenchanges', onFullscreenChange);
//     document.addEventListener('mozfullscreenchange', onFullscreenChange);
// }

// function onWindowResize(){
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth / window.innerHeight);
// }
// var lii = [cube, cube1]

const loader = new THREE.TextureLoader();
const classjpg = loader.load("./assets/images/class.jpg");
// Create a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
// Create a material with the panoramic picture
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: classjpg,
  side: THREE.BackSide,
});
// Create a mesh with the sphere geometry and material
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene.add(sphereMesh);

// const fbxLoader = new FBXLoader();
// fbxLoader.load('mixamo.fbx', (fbx) => {
//     fbx.scale.set(0.5,0.5,0.5);
//   scene.add(fbx);
// });

const glftLoader = new GLTFLoader()
glftLoader.load('./assets/objects/greenplanet.glb',
    function(glft){
    glft.scene.scale.set(15,15,15);
    glft.scene.position.set(-30,0,0)
    scene.add(glft.scene);

},
// called while loading is progressing
// function ( xhr ) {

//     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// }
)
// glftLoader.load('./assets/objects/Flower.glb',
//     function(glft){
//     glft.scene.scale.set(20,20,20);
//     glft.scene.position.set(0,-20,0)
//     glft.scene.name="flower";
//     scene.add(glft.scene);
// },)
// glftLoader.load('./assets/objects/roooooom.glb',
//     function(glft){
//     glft.scene.scale.set(20,20,20);
//     glft.scene.position.set(0,-30,0)
//     scene.add(glft.scene);
// },
// // called while loading is progressing
// // function ( xhr ) {

// //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// // }
// )

// document.body.appendChild( VRButton.createButton( renderer ) );
// create a video element
// var video = document.createElement('video');
// video.src = 'ajax.mp4';
// video.autoplay = true;

// // create a video texture
// var texture = new THREE.VideoTexture(video);
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;
// texture.format = THREE.RGBFormat;

// // create a plane geometry with the video texture
// var geometryvid = new THREE.PlaneGeometry( 16, 9 );
// var materialvid = new THREE.MeshBasicMaterial( { map: texture } );
// var mesh = new THREE.Mesh( geometryvid, materialvid );
// scene.add( mesh );
// const video1 = document.getElementById('video');
// video1.src = 'ajax.mp4';
// video1.autoplay = true;



// video1.addEventListener('loadedmetadata', function() {
//   geometry1vid = new THREE.PlaneGeometry(video1.videoWidth, video1.videoHeight);
//   mesh1.scale.set(video1.videoWidth, video1.videoHeight, 1);
// });

// const texture1 = new THREE.VideoTexture(video1);
// texture1.minFilter = THREE.LinearFilter;
// texture1.magFilter = THREE.LinearFilter;
// texture1.format = THREE.RGBFormat;

// const geometry1vid = new THREE.PlaneGeometry(32, 18);

// const material1vid = new THREE.MeshStandardMaterial( { 
//     map: texture1,
//     // side: THREE.DoubleSide,
//     side: THREE.FrontSide

// } );

// const mesh1 = new THREE.Mesh(geometry1vid, material1vid);
// mesh1.position.set(0, 0, -50);
// scene.add(mesh1);


// var video = document.getElementById('video');
// video.src = "ajax.mp4";
// video.load();
// video.play();
// var texture = new THREE.VideoTexture(video);
// texture.needsUpdate;
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;
// texture.format = THREE.RGBFormat;
// // texture.crossOrigin = 'anonymous';

// var imageObject = new THREE.Mesh(
//     new THREE.PlaneGeometry(width, height),
//     new THREE.MeshBasicMaterial({ map: texture }),);

// scene.add( imageObject );

let video = document.getElementById('video');

let videotexture = new THREE.VideoTexture(video);
videotexture.minFilter = THREE.LinearFilter;
videotexture.magFilter = THREE.LinearFilter;

const material1vid = new THREE.MeshStandardMaterial( { 
    map: videotexture,
    side: THREE.FrontSide,
    toneMapped : false,
} );
// let videocube = new THREE.BoxGeometry( 100, 0.1, 50 );

// let mainvideocube = new THREE.Mesh( videocube, material1vid );
// mainvideocube.position.set(0,10,-100)
// mainvideocube.rotation.set(-55,0,0)

// scene.add(mainvideocube);

// camera.lookAt(mainvideocube.position)
// create a raycaster object
const raycaster = new THREE.Raycaster();



function showinput(){
    // let voiceinput = document.getElementById("voiceinput");
    // if (voiceinput.style.display === "none") {
    //     voiceinput.style.display = "block";
    //   } else {
    //     voiceinput.style.display = "none";
    //   }
    stopvideo();
    runSpeechRecog();
}

function stopvideo(){
    let stopvideo = document.getElementById("video")
    if (stopvideo.paused) {
        video.play();
      } else {
        stopvideo.pause();
      }
}
function passvideo(){
    let stopvideo = document.getElementById("video")
    stopvideo.currentTime += 5;
}

// add a click event listener to the renderer
renderer.domElement.addEventListener('click', onClick);

// define the onClick function
function onClick(event) {
    function myFunction(selectedObject) {
        console.log(selectedObject.position)
        // check if the selected object is the cube
        if (selectedObject.name === "cube1") {
          // set the color of the cube to red
          selectedObject.material.color.set(0xff0000);
          showinput()
        }else if (selectedObject.name === "stopcube") {
            // selectedObject.material.color.set(0xff0000);
            stopvideo()
        }else if(selectedObject.name === "yell-cube"){
        //    selectedObject.material.color.set(0xff0000);
           passvideo()
            
        }

      }

  // calculate mouse position in normalized device coordinates
//   const mouse = new THREE.Vector2();
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // update the picking ray with the camera and mouse position
//   raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children, true);

  // check if there is an intersection
  if (intersects.length > 0) {
    // get the first intersected object
    const selectedObject = intersects[0].object;

    // call some function with the selected object
    myFunction(selectedObject);

  }
}
// model
// const fbxloader = new FBXLoader();
// fbxloader.load( './assets/objects/Sambadance.fbx', function ( object ) {

//     mixer = new THREE.AnimationMixer( object );

//     const action = mixer.clipAction( object.animations[ 0 ] );
//     action.play();

//     object.traverse( function ( child ) {

//         if ( child.isMesh ) {

//             child.castShadow = true;
//             child.receiveShadow = true;

//         }

//     } );

//     scene.add( object );

// } );


function animate(time) {
	requestAnimationFrame( animate );
	angle += 0.01;
    // THIS for loop is not working in functional  way
	// for (var i = 0; i < lii.length;i++){
	// 	lii[i].rotation.x = time /1000;
	// 	lii[i].rotation.y = time /1000;
	// }
    // cube.rotation.x = time / 1000;
    // cube.rotation.y = time / 1000;

    // myspace1.position += 0.01
    // if (video1.readyState === video1.HAVE_ENOUGH_DATA) {
    //     texture1.needsUpdate = true;
    //   }
    // camera.position.x += 0.1;
    // camera.position.y += 0.1;
    // texture1.needsUpdate = true;
    // mesh1.needsUpdate = true;
    videotexture.needsUpdate = true;

    myspace1.position.x += 0.1;
    

	// var si = Math.sin(angle)
	// cube1.position.x = si;
	// cube1.position.y = si+1;

	renderer.render( scene, camera );
}


// function onFullscreenChange() {
//     var fullscreenElement = 
//      document.fullscreenElement ||
//      document.webkitFullscreenElement ||
//      document.mozFullScreenElement;
//     const isFullscreen = !!isFullscreen;
//     const FullScreenButton = document.getElementById("fullscreen-button");
//     FullScreenButton.textContent = isFullscreen
//     ? "Exit Fullscreen"
//     : "Enter Fullscreen";
//     FullScreenButton.style.display = isFullscreen ? "none" : "block" ;
//   }

// init()
// addEventListeners()
animate();


// var videotag = document.getElementsByTagName("video")
// console.log(videotag)






// speech to text function

