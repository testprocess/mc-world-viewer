import { OrbitControls } from "./jsm/OrbitControls.js";


let state = {
    scene: undefined,
    camera: undefined,
    renderer: undefined,
    controls: undefined,
    blocks: undefined
}


const init = async () => {
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color( 0xa0a0a0 );
    // state.scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

    const clock = new THREE.Clock();


    
    state.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 100 );
    state.camera.position.set( 0, 3, 7 );
    state.scene.add(state.camera);


    state.renderer = new THREE.WebGLRenderer();
    state.renderer.setSize( window.innerWidth, window.innerHeight );
    state.renderer.shadowMap.enabled = true

    document.querySelector("#screen").appendChild( state.renderer.domElement );
    
    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( -40, 400, -70 );
    dirLight.shadow.camera.top = 150;
    dirLight.shadow.camera.right = 150;
    dirLight.shadow.camera.bottom = -150;
    dirLight.shadow.camera.left = -150;
    dirLight.castShadow = true;


    state.scene.add(dirLight);
    
    // const hemiLight = new THREE.HemisphereLight( 0x707070, 0x444444 );
    // hemiLight.position.set( 0, 120, 0 );
    // state.scene.add(hemiLight);
    
    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ),new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: true} ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    state.scene.add(mesh);

    
    state.controls = new OrbitControls( state.camera, state.renderer.domElement );
    state.controls.enableDamping = true;
    state.controls.dampingFactor = 1;

    const helper = new THREE.CameraHelper( dirLight.shadow.camera );
    state.scene.add( helper );
    
    function animate() {
        requestAnimationFrame( animate );

        state.renderer.render( state.scene, state.camera );
    }



    animate();
    state.blocks = await getBlocks()

    await appendBlocks()

    console.log(state.blocks)
    
}


const getBlocks = async () => {
    const req = await fetch("/map")
    const res = await req.json()
    return res
}

const appendBlocks = async () => {
    for (const y in state.blocks) {
        if (Object.hasOwnProperty.call(state.blocks, y)) {
            const element = state.blocks[y];


            for (const xz in element) {
                if (Object.hasOwnProperty.call(element, xz)) {
                    const block = element[xz];
                    const x = xz % 16
                    const z = Math.floor(xz / 16)
                    console.log(block, x, z, y)
                    console.log()

                    if (block != 'air') {
                        createBlock({
                            block: block,
                            x: x,
                            y: y,
                            z: z
                        })
                    }

                }
            }
            
        }
    }
}

const createBlock = async ({ block, x, y, z }) => {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    const material = new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: true} )  // new THREE.MeshBasicMaterial( {color: 0x878787} ); 
    const cube = new THREE.Mesh( geometry, material ); 
    cube.position.set(x, y, z)
    cube.castShadow = true
    cube.receiveShadow = true

    state.scene.add( cube );
}

init()