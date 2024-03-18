import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export function models_3D(THREE, scene, objects) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    "./assets/floorTexturing/Wood_Herringbone_Tiles_002_basecolor.jpg"
  );
  const texturenormal = textureLoader.load(
    "./assets/floorTexturing/Wood_Herringbone_Tiles_002_normal.jpg"
  );
  const texturough = textureLoader.load(
    "./assets/floorTexturing/Wood_Herringbone_Tiles_002_roughness.jpg"
  );
  const textaoMap = textureLoader.load(
    "./assets/floorTexturing/Wood_Herringbone_Tiles_002_ambientOcclusion.jpg"
  );
  const textdisplace = textureLoader.load(
    "./assets/floorTexturing/Wood_Herringbone_Tiles_002_height.png"
  );

  const planggeo = new THREE.PlaneGeometry(47.3, 40);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    normalMap: texturenormal,
  });
  material.reflectivity = 0;
  material.roughnessMap = texturough;
  material.aoMap = textaoMap;
  material.displacementMap = textdisplace;
  const planeMesh = new THREE.Mesh(planggeo, material);
  planeMesh.receiveShadow = true;
  planeMesh.rotation.x = -2;
  planeMesh.position.set(1, -6, 0);
  planeMesh.castShadow = true;
  planeMesh.receiveShadow = true;
  scene.add(planeMesh);
  objects.p_mesh = planeMesh;

  const fbx = new FBXLoader();
  const mtl = new MTLLoader();
  const obj = new OBJLoader();

  // wall loading with OBJ
  mtl.load("./assets/wall/simulation.mtl", function (walls) {
    walls.preload();

    obj.load("./assets/wall/simulation.obj", function (object) {
      object.children[0].material.opacity = 0;
      object.children[0].material.transparent = true;
      object.children[2].material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x88878d),
      });
      object.children[1].material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xf6f4fc),
      });
      object.children[2].material.metalness = 5.5;
      object.children[2].material.roughness = 0.1;
      object.position.set(25, -6.5, -0.49);
      object.rotation.set(-0.437, 0, 0);
      object.scale.set(0.03, 0.05, 0.032);
      scene.add(object);
      objects.wall1 = object;
    });
    obj.setMaterials(walls);
  });

  // wall without window obj
  mtl.load("./assets/justwall/wall.mtl", function (walls) {
    walls.preload();
    obj.load("./assets/justwall/wall.obj", function (object) {
      // const texture = new THREE.TextureLoader().load('./assets/wallTexture/Wallpaper_ArtDeco_001_basecolor.jpg');
      // const texture2 = new THREE.TextureLoader().load('./assets/brickWall/Wood_Ceiling_001_height.png');
      // const texture3 = new THREE.TextureLoader().load('./assets/brickWall/Wood_Ceiling_001_ambientOcclusion.jpg');

      // object.children[50].material.map = texture
      // object.children[3].material = new THREE.MeshPhongMaterial( { map: texture2 } );
      object.children[0].material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x88878d),
      });
      // object.children[0].material.metalnessMap = texture6
      // object.children[0].material.displacementMap = texture2
      // object.children[0].aoMap = texture3
      // object.children[0].normalMap = texture4
      // object.children[0].roughnessMap = texture5

      object.position.set(1.3, -14.5, -18);
      object.rotation.set(-0.45, 0, 0);
      object.scale.set(0.1, 0.095, 0.025);
      scene.add(object);
      objects.wall2 = object;
    });
    obj.setMaterials(walls);
  });

  mtl.load("./assets/justwall/wall.mtl", function (walls) {
    walls.preload();
    obj.load("./assets/justwall/wall.obj", function (object) {
      object.children[0].material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x88878d),
      });
      object.position.set(-22.8, -6, -0.1);
      object.rotation.set(-0.43, -1.57, 0);
      object.scale.set(0.0831, 0.095, 0.025);
      scene.add(object);
      objects.wall3 = object;
    });
    obj.setMaterials(walls);
  });

  mtl.load("./assets/justwall/wall.mtl", function (walls) {
    walls.preload();
    obj.load("./assets/justwall/wall.obj", function (object) {
      // const gui = new dat.GUI()
      //     const gui = new dat.GUI()
      //     var val = {
      //                     x:0,
      //                     y:0,
      //                     z:0
      //                 }
      // gui.add(val,'x',1,20).onChange(
      //     // object.position.dispose()
      //     object.position.set(val.x,3,18)
      //     )
      // gui.add(val,'y',0.1,20).onChange(
      //     object.position.y = val.y
      //     )
      // gui.add(val,'z',0.1,20).onChange(
      //     object.position.z = val.z
      //     )
      object.children[0].material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x88878d),
      });
      object.position.set(1.2, 2.3, 17.8);
      object.rotation.set(-0.45, 0.01, -0.001);
      object.scale.set(0.101, 0.095, 0.08);
      scene.add(object);
      objects.wall4 = object;
    });
    obj.setMaterials(walls);
  });

  //bed o fbx
  fbx.load("./assets/bed/Bed-Only.fbx", function (object) {
    const blanket = textureLoader.load("./assets/bed/bedsheet.jpg");
    const mainsheet = textureLoader.load("./assets/bed/mainsheet.jpg");

    object.position.set(15, -2.5, 0);
    object.rotation.set(-0.4, -1.5, 0);
    object.children[5].material.map = blanket;
    object.children[0].material.map = mainsheet;

    object.scale.set(0.09, 0.09, 0.09);
    scene.add(object);
    objects.bed = object;
  });

  // tv furniture obj
  const tfurniture = new MTLLoader();
  tfurniture.load(
    "./assets/tfurniture/10256_TV_Cabinet_v1_max2011.mtl",
    (mtl) => {
      mtl.preload();
      const texture = textureLoader.load(
        "./assets/tfurniture/whiteTexture.png"
      );

      obj.load(
        "./assets/tfurniture/10256_TV_Cabinet_v1_max2011.obj",
        function (obj) {
          obj.children[0].material.map = texture;
          obj.rotation.set(-2, 0, 1.57);
          obj.position.set(-19.5, -4.3, 2);
          obj.scale.set(0.09, 0.09, 0.09);
          scene.add(obj);
          objects.tvStand = obj;
        }
      );
      obj.setMaterials(mtl);
    }
  );

  // tv itself fbx
  fbx.load("./assets/tv/uploads_files_37044_TV.FBX", function (object) {
    const texture = textureLoader.load("./assets/tv/Screen1.jpg");
    object.children[0].material[2] = new THREE.MeshPhongMaterial({
      name: "Screen",
      emissive: new THREE.Color("white"),
      emissiveMap: texture,
    });
    object.rotation.set(-0.45, 0, 0);
    object.position.set(-20, 0.6, 0);
    object.scale.set(0.19, 0.19, 0.19);
    scene.add(object);
    objects.tv = object;
  });

  // floor lamp fbx
  fbx.load("./assets/tableLight/floorlamp001.FBX", function (object) {
    const texture = textureLoader.load("./assets/tableLight/holder.jpg");
    const cyn = textureLoader.load("./assets/tableLight/lightpass.jpg");

    const pointlight = new THREE.PointLight(0xf8fc0f, 0.3, 30);
    pointlight.position.set(-18, 0, -21.5);
    objects.lightInlamp = pointlight;

    pointlight.scale.set(0.1, 0.1, 0.1);

    scene.add(pointlight);

    object.children[0].material = new THREE.MeshPhongMaterial({
      name: "Cylinder001",
      map: cyn,
    });
    // object.children[0].material.wireframe = true
    object.children[2].children[0].material = new THREE.MeshPhongMaterial({
      map: texture,
    });
    object.children[2].children[1].material = new THREE.MeshPhongMaterial({
      map: texture,
    });
    object.children[2].children[2].material = new THREE.MeshPhongMaterial({
      map: texture,
    });

    object.rotation.set(-0.5, 0, 0);
    object.position.set(-18, -12, -15);
    object.scale.set(0.2, 0.2, 0.2);
    // obj.userData.shapeis = "cylinder"
    scene.add(object);
    objects.floorlamp = object;
  });

  // drawer fbx
  fbx.load("./assets/drawer/drawerforBooks.fbx", function (object) {
    const texture = textureLoader.load("./assets/drawer/redtexture.jpeg");

    object.position.set(10, -11, -13.5);
    object.rotation.set(-0.5, 0, 0);

    object.children[0].children[0].children[0].material.map = texture;
    object.scale.set(0.01, 0.01, 0.01);

    scene.add(object);
    objects.drawer = object;
  });

  //pots fbx
  fbx.load("./assets/pots/pot.fbx", function (object) {
    const texture = textureLoader.load("./assets/pots/pot.jpg"),
      texture1 = textureLoader.load("./assets/pots/potsColor.jpg"),
      texture2 = textureLoader.load("./assets/pots/soil.jpg");

    object.position.set(16, -6.4, -19);
    object.rotation.set(-0.5, 0.5, 0);

    object.children[4].material.map = texture;
    object.children[0].material.map = texture;
    object.children[1].material.map = texture;
    object.children[2].material.map = texture1;
    object.children[3].material.map = texture2;

    object.scale.set(0.0135, 0.0135, 0.0135);
    //object.userData.shapeis = "cone"
    scene.add(object);
    objects.pot = object;
  });

  //books
  mtl.load("./assets/books/simulation.mtl", function (mtl) {
    mtl.preload();
    obj.load("./assets/books/simulation.obj", function (object) {
      object.rotation.set(-0.5, -1.6, 0);
      object.position.set(15.5, -8, -16.5);
      object.scale.set(0.009, 0.007, 0.008);
      scene.add(object);
      objects.books1 = object;
    });
    obj.setMaterials(mtl);
  });

  //books
  mtl.load("./assets/books/simulation.mtl", function (mtl) {
    mtl.preload();
    obj.load("./assets/books/simulation.obj", function (object) {
      object.position.set(13.5, -4.5, -20);
      object.rotation.set(1.1, 0, 1.55);
      object.scale.set(0.009, 0.009, 0.009);
      scene.add(object);
      objects.books2 = object;
    });
    obj.setMaterials(mtl);
  });

  // couch
  //   fbx.load("./assets/sofa/sofa.fbx", function (obj) {
  //     obj.position.set(-1, -4.3, 2);
  //     obj.rotation.set(-0.43, -1.55, 0);
  //     obj.scale.set(0.05, 0.08, 0.05);
  //     // obj.userData.shapeis = "convexhullShape" //not known in context of what i have implement in physics function
  //     o.add(obj);
  //     couchs = obj;
  //   });

  //mirror

  //https://yourusername.github.io/repositoryname/branchname/path/to/image.jpg
  //https://ananddudi.github.io/earth-three/earthtexture.jpg

  mtl.load("./Assets/mirror/simulation.mtl", function (mtl) {
    mtl.preload();
    obj.load("./Assets/mirror/simulation.obj", function (object) {
      const texture = textureLoader.load(
        "./Assets/mirror/colorTexture&opacityTexture.jpg"
      );
      object.children = object.children.map((val) => {
        if (val.material.name.includes("Gold")) {
          val.material.map = texture;
        }
        return val;
      });
      object.position.set(-3, -11, -14);
      object.rotation.set(-0.7, 0, 0);
      object.scale.set(0.1, 0.128, 0.1);
      object.children[121].material.transparent = true;
      object.children[121].material.opacity = 0.9;
      scene.add(object);
      objects.mirror = object;
    });
    obj.setMaterials(mtl);
  });

  // roof
  mtl.load("./assets/roof/simulation.mtl", function (roof) {
    roof.preload();
    obj.load("./assets/roof/simulation.obj", function (object) {
      object.position.set(-11.5, -24.6, -14);
      object.rotation.set(1.14, 0.01, -0.001);
      object.scale.set(0.27, 0.206, 0.21);
      object.children[0].material = new THREE.MeshPhongMaterial({
        color: new THREE.Color("white"),
        side: THREE.DoubleSide,
      });
      scene.add(object);
      objects.a_roof = object;
    });
    obj.setMaterials(roof);
  });

  // // // fan
  // fbx.load("./assets/fan/fan.fbx", function (obj) {
  //   obj.position.set(0, 14, 0);
  //   obj.rotation.set(-0.4, 0, 0);
  //   obj.scale.set(0.08, 0.03, 0.05);
  //   //obj.userData.shapeis = "cone" //not known in context of ammo.js bs kuch bhi huh!
  //   o.add(obj);
  //   fan = obj;
  // });

  // tested with ammo so it works but i had to commented out beacause my laptop' have limitations

  // // laptop load with FBX
  // fbx.load('assets/Dell_Laptop_FBX/Dell_Laptop.fbx',function(object){
  //     const keyboard = textureLoader.load('./assets/Dell_Laptop_FBX/keyboard_txt.jpg');
  //     const body = textureLoader.load('./assets/Dell_Laptop_FBX/body_txt.jpg');
  //     const display = textureLoader.load('./assets/Dell_Laptop_FBX/display_txt.jpg');

  //     object.children[3].material = new THREE.MeshBasicMaterial({map:keyboard});
  //     object.children[1].material = new THREE.MeshBasicMaterial({map:body});
  //     object.children[0].children[3].material = new THREE.MeshBasicMaterial({map:display});

  //     object.position.set(10,0,0);
  //     object.rotation.set(0,-0.5,0.1);
  //     lshapex = 0.2;
  //     lshapey = 0.2;
  //     lshapez = 0.2
  //     object.scale.set(0.2,0.2,0.2);
  //     object.userData.shapeis = "box"
  //     o.add(object);
  //     laptop = object;
  // });

  //i have also tried to load a character object that can walk,sit,and pick object using ammo.js but
  //because of my 2gb cpu and no gpu laptop's limitation i couldn't make it :(

  // const character = new GLTFLoader()
  // character.load('./assets/maleCharacter/gltf/rp_nathan_animated_003_walking.gltf',function(man){
  //     console.log(man.o)
  //     o.add(man.o)
  // })
}
