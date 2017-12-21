
/*

   Main 3D visualization routine

*/


var camera, controls, scene, renderer;
var mouse, raycaster;
var systemCanvas, systemTexture, systemMaterial, systemMesh, systemObject;

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

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

    // Controls
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 3.2;
    controls.panSpeed = 0.8;
    controls.dynamicsDampingFactor = 0.2;
    this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];
    controls.addEventListener('change', onControlChange);

    var axisHelper = new THREE.AxesHelper(30);
    scene.add(axisHelper);

    scene.background = new THREE.Color( 0 );
    var geometry = new THREE.SphereBufferGeometry(5, 16, 16);

    //This is for planets
	for ( var i = 0; i < data.length; i ++ ) {
		var data_line = getprops(data[i]);
        var planet = data_line[0];

		var stellar_color = rainbow_colormap(planet.temperature, 580, 10500);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: stellar_color, flatShading: true }));

        mesh.position.x = planet.position[0];
        mesh.position.y = planet.position[1];
        mesh.position.z = planet.position[2];
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
		mesh.userData = {prop: data_line}
        scene.add( mesh );
    }

	var refStarMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
    //This is for reference stars
    for ( var i = 0; i < data_ref.length; i ++ ) {
        var mesh = new THREE.Mesh( geometry, refStarMaterial );

        var refstar = getprops_ref(data_ref[i]);
        mesh.position.x = refstar.position[0];
        mesh.position.y = refstar.position[1];
        mesh.position.z = refstar.position[2];
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

	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
    window.addEventListener('resize', onWindowResize, false);
    document.body.appendChild(renderer.domElement);

	// create a canvas element
	systemCanvas = document.createElement('canvas');
	systemCanvas.width = 512;
	systemCanvas.height = 512;
	// canvas contents will be used for a texture
	systemTexture = new THREE.Texture(systemCanvas);


	systemMaterial = new THREE.MeshBasicMaterial( {map: systemTexture, side:THREE.DoubleSide, depthTest:false} );
	systemMaterial.transparent = true;

	systemMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(systemCanvas.width, systemCanvas.height),
		systemMaterial
	);
	systemMesh.renderOrder = 0;
	systemMesh.matrixAutoUpdate = false;
	scene.add( systemMesh );

    render();
	animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
	render();
}

function render() {
	updateSystemCanvas();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
}

function onDocumentTouchStart(event) {
	event.preventDefault();
	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;
	onDocumentMouseDown(event);
}

function onDocumentMouseDown(event) {
	event.preventDefault();
	mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
	mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	for (var i = 0; i < intersects.length; i++) {
		// console.log(intersects[0]);
		if (intersects[i].object.userData["prop"]) {
			systemObject = intersects[0].object;
			drawSystemCanvas();
			break;
		}
	}
	render();
}

function onControlChange() {
	systemMesh.lookAt(camera.position);
	systemMesh.updateMatrix();
}

function updateSystemCanvas() {
	if (systemObject && systemObject.userData["prop"]) {
		draw_system(systemCanvas, systemObject.userData["prop"][1]);
		if ( systemTexture ) // checks if texture exists
			systemTexture.needsUpdate = true;

	}
}

function drawSystemCanvas() {
	if (systemObject && systemObject.userData["prop"]) {
		draw_system(systemCanvas, systemObject.userData["prop"][1]);
		if ( systemTexture ) // checks if texture exists
			systemTexture.needsUpdate = true;
		var pos = systemObject.position;
		systemMesh.position.set(pos.x, pos.y, pos.z);
		systemMesh.scale.set(0.25, 0.25, 0.25);
		systemMesh.updateMatrix();
	}
}

function rainbow_colormap(fval,fmin,fmax){
    var dx=0.8;
    var fval_nrm = (fval-fmin)/(fmax-fmin);
    var g = (6.0-2.0*dx)*fval_nrm +dx;
    var R = Math.max(0.0,(3.0-Math.abs(g-4.0)-Math.abs(g-5.0))/2.0 );
    var G = Math.max(0.0,(4.0-Math.abs(g-2.0)-Math.abs(g-4.0))/2.0 );
    var B = Math.max(0.0,(3.0-Math.abs(g-1.0)-Math.abs(g-2.0))/2.0 );
	return new THREE.Color(R, G, B);
}
