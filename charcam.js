export function positioning(camera,THREE){
    const quaternion = new THREE.Quaternion();
    const vector = new THREE.Vector3();
    const vector1 = new THREE.Vector3();
    window.addEventListener('keydown',function(e){
        // const planewidth = planemesh.geometry.parameters.width/2 - 3, it might be a way to calculate floor
                                                                    //   area interest
        if(e.shiftKey){
            if(e.key === "R"){
                camera.position.set(0,10,12)
            }
        }
        switch(event.code) {
            case "Up":
            case "ArrowUp":
                camera.getWorldQuaternion(quaternion)
                let newvec
                if(quaternion.y < 0){
                    newvec = new THREE.Vector3( 0, 0, quaternion.y );
                }else if(camera.rotation.y == 0 && camera.rotation.z == 0 ){
                    if(camera.position.z >= -20.4 && camera.position.z <= 12){
                        camera.translateZ(-0.1)
                        camera.updateProjectionMatrix()
                    }
                    break;

                }else{
                    newvec = new THREE.Vector3( 0, 0, -quaternion.y );
                }
                if(camera.position.z >= -20.00 && camera.position.z <= 12.00 ){
                    if(camera.position.x <= 16.00 && camera.position.x >= -14.00){
                    camera.translateOnAxis(newvec.normalize(),0.1)
                    camera.updateProjectionMatrix()
                    }
                }else{                                //this 'else' is for low powerful when camera get end of limit 
                    camera.position.z = -15           //it reached below of 20.00 etc limit because taking time to detect 'if' statement in processing i guess 
                    if(camera.position.x <= -14.00){  //then it stucks there so i have provide this code to get back from limit and a reset button CRTL+R :) 
                        camera.position.x = -10
                    }
                    if(camera.position.x >= 16.00){
                        camera.position.x = 10
                    }
                }
                break;
            case "Left":
            case "ArrowLeft":
                camera.getWorldQuaternion(quaternion)
                camera.rotation.y += 0.01
                camera.updateProjectionMatrix()
                break;
            case "Right":
            case "ArrowRight":
                camera.getWorldQuaternion(quaternion)
                camera.rotation.y += -0.01
                camera.updateProjectionMatrix()
                break;
          }
    })
}

