export var reactD;
export var qtproject;
export var calproject;
export var earthproject;
var calP;

export function my_Projects(OBJLoader, MTLLoader, THREE, scene) {
  //outside
  //wireframe
  const obj = new OBJLoader();
  const mtl = new MTLLoader();
  mtl.load("/wireframeLink/wireframe/simulation.mtl", function (mlt) {
    mlt.preload();
    obj.load("/wireframeLink/wireframe/simulation.obj", function (objs) {
      // Yeah there is possibility of loop here as well but i think it will increase
      // the load on cpu or gpu
      //react django project
      var remesh = randomtask(
        "wireobj",
        objs,
        "react",
        "darkblue",
        "reactDjango"
      );
      reactD = remesh;
      remesh[1].position.set(0, -5, -30);

      // Here is some code that i write for solving shape issue until i find
      //clipping plane functionality ;)

      // const vertices = new Float32Array( [
      //     -5.0, 5.0,  0.0,   //123 ---
      //      5.0, 5.0,  0.0,
      //     -5.0,  -5.0,  0.0,
      //      5.0,  -5.0,  0.0,
      //    -5.0,  -5.0,  0.0,
      //      5.0,  -5.0,  0.0,
      //      5.0,  -5.0,  0.0,
      //     -9.0,  -9.0,  0.0,
      //      5.0,  -5.0,  0.0,
      // ] );

      // geometry1.setAttribute("position",new THREE.BufferAttribute(vertices,3))
      // // attributes.position.array
      // const shapeIs = new THREE.Shape()
      // shapeIs.moveTo(0,0)
      // shapeIs.lineTo(10,10)
      // shapeIs.lineTo(10,-4)
      // shapeIs.lineTo(3,-10)
      // shapeIs.lineTo(-10,-10)
      // console.log(geometry1)
      // console.log(geometry)
      // var uvAttribute = geometry.attributes.uv;

      //i went this much depth
      // for ( var i = 0; i < uvAttribute.count; i ++ ) {

      //     var u = uvAttribute.getX( i );
      //    var v = uvAttribute.getY
      //     u = u + 0.2
      //     v = v + 0.2

      //     // write values back to attribute

      //     uvAttribute.setXY( i, u, v );

      // }

      // python's QT framework called PyQt project
      var [qtplane, qtmesh] = randomtask("qtobj", objs, "qt", "teal", "qt");
      qtproject = qtmesh;
      qtplane.translate(new THREE.Vector3(9.8, 0, 0));
      qtmesh.position.set(15, 0, -30);

      // //calculator with just little extra functionality
      var [calplane, calmesh] = randomtask(
        "calobj",
        objs,
        "calc",
        "tomato",
        "calculator"
      );
      calproject = calmesh;
      calP = calplane;
      calplane.translate(new THREE.Vector3(-15.5, 0, 0));
      calmesh.position.set(-15, 0, -30);

      //Well i should not showed up this one because it was just testing to get first in three.js world but
      //four component align very well with each other i added it
      var [earthplane, earthmesh] = randomtask(
        "earthobj",
        objs,
        "earth",
        "green",
        "earthobj"
      );
      earthproject = earthmesh;
      earthmesh.position.set(0, 7, -30);
    });
  });

  //writing same task for all 3 components i thought why dont make a function which take care of all these
  //and if you want to see them saperated then open file name called randomtask.txt
  function randomtask(obj, objs, id, colors, name, option = false) {
    var obj = new THREE.Object3D();
    obj.copy(objs);
    const ref = document.getElementById(id);
    ref.play();
    const vidtexture = new THREE.VideoTexture(ref);
    vidtexture.needsUpdate = true;
    var geometry = new THREE.PlaneGeometry(10, 10, 2, 2);
    var plane = new THREE.Plane();
    plane.normal
      .set(1, 0, 0)
      .applyQuaternion(new THREE.Quaternion(0, 0, -0.3, 1));
    plane.constant = -6.4;
    plane.negate();
    // const helper = new THREE.PlaneHelper( plane, 5, 0xffff00 );
    // scene.add( helper );
    var material = new THREE.MeshBasicMaterial({
      map: vidtexture,
      clippingPlanes: [plane],
      clipShadows: true,
    });
    var mesh = new THREE.Mesh(geometry, material);
    obj.scale.set(0.069, 0.18, 0.1);
    obj.rotation.set(0, 0, -0.03);
    obj.position.set(0.9, -12, 0);
    obj.children[0].material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colors),
      wireframe: true,
    });
    obj.children[0].material.wireframeLinewidth = 1.1;
    mesh.scale.set(1.09, 1, 1);
    mesh.rotation.set(-0.25, 0, 0);
    mesh.add(obj);
    mesh.name = name;
    mesh.visible = option;
    scene.add(mesh);
    return [plane, mesh];
  }
}

export function animation(THREE, TWEEN) {
  reactD[1].visible = true;
  qtproject.visible = true;
  calproject.visible = true;
  earthproject.visible = true;
  var object = {
    x: 0,
    y: 0,
    z: -400,
  };

  //react django
  const tweening = new TWEEN.Tween(object)
    .to({ x: 0, y: -5, z: -50 }, 4500)
    .easing(TWEEN.Easing.Back.Out);
  tweening.onUpdate((object, elapsetime) => {
    reactD[1].position.set(object.x, object.y, object.z);
  });
  tweening.start();

  //qt animation
  new TWEEN.Tween(object)
    .to({ x: 15, y: 0, z: -50 }, 5000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate((object, elapsetime) => {
      qtproject.position.set(object.x, object.y, object.z);
    })
    .start();

  //calculator
  new TWEEN.Tween(object)
    .to({ x: -15, y: 0, z: -50 }, 5000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate((object, elapsetime) => {
      calproject.position.set(object.x, object.y, object.z);
    })
    .start();

  // I dont wanna waste time in sync of wireframe with calculator when animate but here is i have given you a hint
  // how to do it
  // var calwire = {
  //    x:0.03,
  //    y:0,
  //    z:0
  // }
  // new TWEEN.Tween(calwire).to({x:0,y:0,z:0},4500).easing(TWEEN.Easing.Cubic.Out).onUpdate((calwire,elapsetime)=>{
  //    calP.translate(new THREE.Vector3(calwire.x,calwire.y,calwire.z))

  // }).start()

  //earth
  new TWEEN.Tween(object)
    .to({ x: 0, y: 7, z: -50 }, 5000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate((object, elapsetime) => {
      earthproject.position.set(object.x, object.y, object.z);
    })
    .start();
}
