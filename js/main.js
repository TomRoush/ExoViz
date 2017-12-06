
/*

   Main 3D visualization routine

*/


var camera, controls, scene, renderer;

//MAIN
function main() {
	readingdata();
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 500;
    // camera.lookat

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Controls
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 3.2;
    controls.panSpeed = 0.8;
    controls.dynamicsDampingFactor = 0.2;
    this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];
    controls.addEventListener('change', render);

    var axisHelper = new THREE.AxesHelper(30);
    scene.add(axisHelper);

    scene.background = new THREE.Color( 0 );
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
    var geometry = new THREE.SphereGeometry(5, 16, 16);
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
	for ( var i = 0; i < data.length; i ++ ) {
        var mesh = new THREE.Mesh( geometry, material );

        var planet = getprops(data[i])[0];
        mesh.position.x = planet.position[0];
        mesh.position.y = planet.position[1];
        mesh.position.z = planet.position[2];
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add( mesh );
    }
    // lights
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );
    var light = new THREE.DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    scene.add( light );
    var light = new THREE.AmbientLight( 0x222222 );
    scene.add( light );

    window.addEventListener('resize', onWindowResize, false);
    document.body.appendChild(renderer.domElement);

    render();
	animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
}
