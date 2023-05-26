/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var MC;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/src/jsm/OrbitControls.js":
/*!*****************************************!*\
  !*** ./static/src/jsm/OrbitControls.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MapControls: () => (/* binding */ MapControls),\n/* harmony export */   OrbitControls: () => (/* binding */ OrbitControls)\n/* harmony export */ });\n// This set of controls performs orbiting, dollying (zooming), and panning.\n// Unlike TrackballControls, it maintains the \"up\" direction object.up (+Y by default).\n//\n//    Orbit - left mouse / touch: one-finger move\n//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish\n//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move\n\nconst _changeEvent = { type: 'change' };\nconst _startEvent = { type: 'start' };\nconst _endEvent = { type: 'end' };\n\nclass OrbitControls extends THREE.EventDispatcher {\n\n\tconstructor( object, domElement ) {\n\n\t\tsuper();\n\n\t\tthis.object = object;\n\t\tthis.domElement = domElement;\n\t\tthis.domElement.style.touchAction = 'none'; // disable touch scroll\n\n\t\t// Set to false to disable this control\n\t\tthis.enabled = true;\n\n\t\t// \"target\" sets the location of focus, where the object orbits around\n\t\tthis.target = new THREE.Vector3();\n\n\t\t// How far you can dolly in and out ( PerspectiveCamera only )\n\t\tthis.minDistance = 0;\n\t\tthis.maxDistance = Infinity;\n\n\t\t// How far you can zoom in and out ( OrthographicCamera only )\n\t\tthis.minZoom = 0;\n\t\tthis.maxZoom = Infinity;\n\n\t\t// How far you can orbit vertically, upper and lower limits.\n\t\t// Range is 0 to Math.PI radians.\n\t\tthis.minPolarAngle = 0; // radians\n\t\tthis.maxPolarAngle = Math.PI; // radians\n\n\t\t// How far you can orbit horizontally, upper and lower limits.\n\t\t// If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )\n\t\tthis.minAzimuthAngle = - Infinity; // radians\n\t\tthis.maxAzimuthAngle = Infinity; // radians\n\n\t\t// Set to true to enable damping (inertia)\n\t\t// If damping is enabled, you must call controls.update() in your animation loop\n\t\tthis.enableDamping = false;\n\t\tthis.dampingFactor = 0.05;\n\n\t\t// This option actually enables dollying in and out; left as \"zoom\" for backwards compatibility.\n\t\t// Set to false to disable zooming\n\t\tthis.enableZoom = true;\n\t\tthis.zoomSpeed = 1.0;\n\n\t\t// Set to false to disable rotating\n\t\tthis.enableRotate = true;\n\t\tthis.rotateSpeed = 1.0;\n\n\t\t// Set to false to disable panning\n\t\tthis.enablePan = true;\n\t\tthis.panSpeed = 1.0;\n\t\tthis.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up\n\t\tthis.keyPanSpeed = 7.0;\t// pixels moved per arrow key push\n\n\t\t// Set to true to automatically rotate around the target\n\t\t// If auto-rotate is enabled, you must call controls.update() in your animation loop\n\t\tthis.autoRotate = false;\n\t\tthis.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60\n\n\t\t// The four arrow keys\n\t\tthis.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };\n\n\t\t// Mouse buttons\n\t\tthis.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };\n\n\t\t// Touch fingers\n\t\tthis.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };\n\n\t\t// for reset\n\t\tthis.target0 = this.target.clone();\n\t\tthis.position0 = this.object.position.clone();\n\t\tthis.zoom0 = this.object.zoom;\n\n\t\t// the target DOM element for key events\n\t\tthis._domElementKeyEvents = null;\n\n\t\t//\n\t\t// public methods\n\t\t//\n\n\t\tthis.getPolarAngle = function () {\n\n\t\t\treturn spherical.phi;\n\n\t\t};\n\n\t\tthis.getAzimuthalAngle = function () {\n\n\t\t\treturn spherical.theta;\n\n\t\t};\n\n\t\tthis.getDistance = function () {\n\n\t\t\treturn this.object.position.distanceTo( this.target );\n\n\t\t};\n\n\t\tthis.listenToKeyEvents = function ( domElement ) {\n\n\t\t\tdomElement.addEventListener( 'keydown', onKeyDown );\n\t\t\tthis._domElementKeyEvents = domElement;\n\n\t\t};\n\n\t\tthis.saveState = function () {\n\n\t\t\tscope.target0.copy( scope.target );\n\t\t\tscope.position0.copy( scope.object.position );\n\t\t\tscope.zoom0 = scope.object.zoom;\n\n\t\t};\n\n\t\tthis.reset = function () {\n\n\t\t\tscope.target.copy( scope.target0 );\n\t\t\tscope.object.position.copy( scope.position0 );\n\t\t\tscope.object.zoom = scope.zoom0;\n\n\t\t\tscope.object.updateProjectionMatrix();\n\t\t\tscope.dispatchEvent( _changeEvent );\n\n\t\t\tscope.update();\n\n\t\t\tstate = STATE.NONE;\n\n\t\t};\n\n\t\t// this method is exposed, but perhaps it would be better if we can make it private...\n\t\tthis.update = function () {\n\n\t\t\tconst offset = new THREE.Vector3();\n\n\t\t\t// so camera.up is the orbit axis\n\t\t\tconst quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );\n\t\t\tconst quatInverse = quat.clone().invert();\n\n\t\t\tconst lastPosition = new THREE.Vector3();\n\t\t\tconst lastQuaternion = new THREE.Quaternion();\n\n\t\t\tconst twoPI = 2 * Math.PI;\n\n\t\t\treturn function update() {\n\n\t\t\t\tconst position = scope.object.position;\n\n\t\t\t\toffset.copy( position ).sub( scope.target );\n\n\t\t\t\t// rotate offset to \"y-axis-is-up\" space\n\t\t\t\toffset.applyQuaternion( quat );\n\n\t\t\t\t// angle from z-axis around y-axis\n\t\t\t\tspherical.setFromVector3( offset );\n\n\t\t\t\tif ( scope.autoRotate && state === STATE.NONE ) {\n\n\t\t\t\t\trotateLeft( getAutoRotationAngle() );\n\n\t\t\t\t}\n\n\t\t\t\tif ( scope.enableDamping ) {\n\n\t\t\t\t\tspherical.theta += sphericalDelta.theta * scope.dampingFactor;\n\t\t\t\t\tspherical.phi += sphericalDelta.phi * scope.dampingFactor;\n\n\t\t\t\t} else {\n\n\t\t\t\t\tspherical.theta += sphericalDelta.theta;\n\t\t\t\t\tspherical.phi += sphericalDelta.phi;\n\n\t\t\t\t}\n\n\t\t\t\t// restrict theta to be between desired limits\n\n\t\t\t\tlet min = scope.minAzimuthAngle;\n\t\t\t\tlet max = scope.maxAzimuthAngle;\n\n\t\t\t\tif ( isFinite( min ) && isFinite( max ) ) {\n\n\t\t\t\t\tif ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;\n\n\t\t\t\t\tif ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;\n\n\t\t\t\t\tif ( min <= max ) {\n\n\t\t\t\t\t\tspherical.theta = Math.max( min, Math.min( max, spherical.theta ) );\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tspherical.theta = ( spherical.theta > ( min + max ) / 2 ) ?\n\t\t\t\t\t\t\tMath.max( min, spherical.theta ) :\n\t\t\t\t\t\t\tMath.min( max, spherical.theta );\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\t// restrict phi to be between desired limits\n\t\t\t\tspherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );\n\n\t\t\t\tspherical.makeSafe();\n\n\n\t\t\t\tspherical.radius *= scale;\n\n\t\t\t\t// restrict radius to be between desired limits\n\t\t\t\tspherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );\n\n\t\t\t\t// move target to panned location\n\n\t\t\t\tif ( scope.enableDamping === true ) {\n\n\t\t\t\t\tscope.target.addScaledVector( panOffset, scope.dampingFactor );\n\n\t\t\t\t} else {\n\n\t\t\t\t\tscope.target.add( panOffset );\n\n\t\t\t\t}\n\n\t\t\t\toffset.setFromSpherical( spherical );\n\n\t\t\t\t// rotate offset back to \"camera-up-vector-is-up\" space\n\t\t\t\toffset.applyQuaternion( quatInverse );\n\n\t\t\t\tposition.copy( scope.target ).add( offset );\n\n\t\t\t\tscope.object.lookAt( scope.target );\n\n\t\t\t\tif ( scope.enableDamping === true ) {\n\n\t\t\t\t\tsphericalDelta.theta *= ( 1 - scope.dampingFactor );\n\t\t\t\t\tsphericalDelta.phi *= ( 1 - scope.dampingFactor );\n\n\t\t\t\t\tpanOffset.multiplyScalar( 1 - scope.dampingFactor );\n\n\t\t\t\t} else {\n\n\t\t\t\t\tsphericalDelta.set( 0, 0, 0 );\n\n\t\t\t\t\tpanOffset.set( 0, 0, 0 );\n\n\t\t\t\t}\n\n\t\t\t\tscale = 1;\n\n\t\t\t\t// update condition is:\n\t\t\t\t// min(camera displacement, camera rotation in radians)^2 > EPS\n\t\t\t\t// using small-angle approximation cos(x/2) = 1 - x^2 / 8\n\n\t\t\t\tif ( zoomChanged ||\n\t\t\t\t\tlastPosition.distanceToSquared( scope.object.position ) > EPS ||\n\t\t\t\t\t8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {\n\n\t\t\t\t\tscope.dispatchEvent( _changeEvent );\n\n\t\t\t\t\tlastPosition.copy( scope.object.position );\n\t\t\t\t\tlastQuaternion.copy( scope.object.quaternion );\n\t\t\t\t\tzoomChanged = false;\n\n\t\t\t\t\treturn true;\n\n\t\t\t\t}\n\n\t\t\t\treturn false;\n\n\t\t\t};\n\n\t\t}();\n\n\t\tthis.dispose = function () {\n\n\t\t\tscope.domElement.removeEventListener( 'contextmenu', onContextMenu );\n\n\t\t\tscope.domElement.removeEventListener( 'pointerdown', onPointerDown );\n\t\t\tscope.domElement.removeEventListener( 'pointercancel', onPointerCancel );\n\t\t\tscope.domElement.removeEventListener( 'wheel', onMouseWheel );\n\n\t\t\tscope.domElement.removeEventListener( 'pointermove', onPointerMove );\n\t\t\tscope.domElement.removeEventListener( 'pointerup', onPointerUp );\n\n\n\t\t\tif ( scope._domElementKeyEvents !== null ) {\n\n\t\t\t\tscope._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );\n\n\t\t\t}\n\n\t\t\t//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?\n\n\t\t};\n\n\t\t//\n\t\t// internals\n\t\t//\n\n\t\tconst scope = this;\n\n\t\tconst STATE = {\n\t\t\tNONE: - 1,\n\t\t\tROTATE: 0,\n\t\t\tDOLLY: 1,\n\t\t\tPAN: 2,\n\t\t\tTOUCH_ROTATE: 3,\n\t\t\tTOUCH_PAN: 4,\n\t\t\tTOUCH_DOLLY_PAN: 5,\n\t\t\tTOUCH_DOLLY_ROTATE: 6\n\t\t};\n\n\t\tlet state = STATE.NONE;\n\n\t\tconst EPS = 0.000001;\n\n\t\t// current position in spherical coordinates\n\t\tconst spherical = new THREE.Spherical();\n\t\tconst sphericalDelta = new THREE.Spherical();\n\n\t\tlet scale = 1;\n\t\tconst panOffset = new THREE.Vector3();\n\t\tlet zoomChanged = false;\n\n\t\tconst rotateStart = new THREE.Vector2();\n\t\tconst rotateEnd = new THREE.Vector2();\n\t\tconst rotateDelta = new THREE.Vector2();\n\n\t\tconst panStart = new THREE.Vector2();\n\t\tconst panEnd = new THREE.Vector2();\n\t\tconst panDelta = new THREE.Vector2();\n\n\t\tconst dollyStart = new THREE.Vector2();\n\t\tconst dollyEnd = new THREE.Vector2();\n\t\tconst dollyDelta = new THREE.Vector2();\n\n\t\tconst pointers = [];\n\t\tconst pointerPositions = {};\n\n\t\tfunction getAutoRotationAngle() {\n\n\t\t\treturn 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;\n\n\t\t}\n\n\t\tfunction getZoomScale() {\n\n\t\t\treturn Math.pow( 0.95, scope.zoomSpeed );\n\n\t\t}\n\n\t\tfunction rotateLeft( angle ) {\n\n\t\t\tsphericalDelta.theta -= angle;\n\n\t\t}\n\n\t\tfunction rotateUp( angle ) {\n\n\t\t\tsphericalDelta.phi -= angle;\n\n\t\t}\n\n\t\tconst panLeft = function () {\n\n\t\t\tconst v = new THREE.Vector3();\n\n\t\t\treturn function panLeft( distance, objectMatrix ) {\n\n\t\t\t\tv.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix\n\t\t\t\tv.multiplyScalar( - distance );\n\n\t\t\t\tpanOffset.add( v );\n\n\t\t\t};\n\n\t\t}();\n\n\t\tconst panUp = function () {\n\n\t\t\tconst v = new THREE.Vector3();\n\n\t\t\treturn function panUp( distance, objectMatrix ) {\n\n\t\t\t\tif ( scope.screenSpacePanning === true ) {\n\n\t\t\t\t\tv.setFromMatrixColumn( objectMatrix, 1 );\n\n\t\t\t\t} else {\n\n\t\t\t\t\tv.setFromMatrixColumn( objectMatrix, 0 );\n\t\t\t\t\tv.crossVectors( scope.object.up, v );\n\n\t\t\t\t}\n\n\t\t\t\tv.multiplyScalar( distance );\n\n\t\t\t\tpanOffset.add( v );\n\n\t\t\t};\n\n\t\t}();\n\n\t\t// deltaX and deltaY are in pixels; right and down are positive\n\t\tconst pan = function () {\n\n\t\t\tconst offset = new THREE.Vector3();\n\n\t\t\treturn function pan( deltaX, deltaY ) {\n\n\t\t\t\tconst element = scope.domElement;\n\n\t\t\t\tif ( scope.object.isPerspectiveCamera ) {\n\n\t\t\t\t\t// perspective\n\t\t\t\t\tconst position = scope.object.position;\n\t\t\t\t\toffset.copy( position ).sub( scope.target );\n\t\t\t\t\tlet targetDistance = offset.length();\n\n\t\t\t\t\t// half of the fov is center to top of screen\n\t\t\t\t\ttargetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );\n\n\t\t\t\t\t// we use only clientHeight here so aspect ratio does not distort speed\n\t\t\t\t\tpanLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );\n\t\t\t\t\tpanUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );\n\n\t\t\t\t} else if ( scope.object.isOrthographicCamera ) {\n\n\t\t\t\t\t// orthographic\n\t\t\t\t\tpanLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );\n\t\t\t\t\tpanUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );\n\n\t\t\t\t} else {\n\n\t\t\t\t\t// camera neither orthographic nor perspective\n\t\t\t\t\tconsole.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );\n\t\t\t\t\tscope.enablePan = false;\n\n\t\t\t\t}\n\n\t\t\t};\n\n\t\t}();\n\n\t\tfunction dollyOut( dollyScale ) {\n\n\t\t\tif ( scope.object.isPerspectiveCamera ) {\n\n\t\t\t\tscale /= dollyScale;\n\n\t\t\t} else if ( scope.object.isOrthographicCamera ) {\n\n\t\t\t\tscope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );\n\t\t\t\tscope.object.updateProjectionMatrix();\n\t\t\t\tzoomChanged = true;\n\n\t\t\t} else {\n\n\t\t\t\tconsole.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );\n\t\t\t\tscope.enableZoom = false;\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction dollyIn( dollyScale ) {\n\n\t\t\tif ( scope.object.isPerspectiveCamera ) {\n\n\t\t\t\tscale *= dollyScale;\n\n\t\t\t} else if ( scope.object.isOrthographicCamera ) {\n\n\t\t\t\tscope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );\n\t\t\t\tscope.object.updateProjectionMatrix();\n\t\t\t\tzoomChanged = true;\n\n\t\t\t} else {\n\n\t\t\t\tconsole.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );\n\t\t\t\tscope.enableZoom = false;\n\n\t\t\t}\n\n\t\t}\n\n\t\t//\n\t\t// event callbacks - update the object state\n\t\t//\n\n\t\tfunction handleMouseDownRotate( event ) {\n\n\t\t\trotateStart.set( event.clientX, event.clientY );\n\n\t\t}\n\n\t\tfunction handleMouseDownDolly( event ) {\n\n\t\t\tdollyStart.set( event.clientX, event.clientY );\n\n\t\t}\n\n\t\tfunction handleMouseDownPan( event ) {\n\n\t\t\tpanStart.set( event.clientX, event.clientY );\n\n\t\t}\n\n\t\tfunction handleMouseMoveRotate( event ) {\n\n\t\t\trotateEnd.set( event.clientX, event.clientY );\n\n\t\t\trotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );\n\n\t\t\tconst element = scope.domElement;\n\n\t\t\trotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height\n\n\t\t\trotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );\n\n\t\t\trotateStart.copy( rotateEnd );\n\n\t\t\tscope.update();\n\n\t\t}\n\n\t\tfunction handleMouseMoveDolly( event ) {\n\n\t\t\tdollyEnd.set( event.clientX, event.clientY );\n\n\t\t\tdollyDelta.subVectors( dollyEnd, dollyStart );\n\n\t\t\tif ( dollyDelta.y > 0 ) {\n\n\t\t\t\tdollyOut( getZoomScale() );\n\n\t\t\t} else if ( dollyDelta.y < 0 ) {\n\n\t\t\t\tdollyIn( getZoomScale() );\n\n\t\t\t}\n\n\t\t\tdollyStart.copy( dollyEnd );\n\n\t\t\tscope.update();\n\n\t\t}\n\n\t\tfunction handleMouseMovePan( event ) {\n\n\t\t\tpanEnd.set( event.clientX, event.clientY );\n\n\t\t\tpanDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );\n\n\t\t\tpan( panDelta.x, panDelta.y );\n\n\t\t\tpanStart.copy( panEnd );\n\n\t\t\tscope.update();\n\n\t\t}\n\n\t\tfunction handleMouseWheel( event ) {\n\n\t\t\tif ( event.deltaY < 0 ) {\n\n\t\t\t\tdollyIn( getZoomScale() );\n\n\t\t\t} else if ( event.deltaY > 0 ) {\n\n\t\t\t\tdollyOut( getZoomScale() );\n\n\t\t\t}\n\n\t\t\tscope.update();\n\n\t\t}\n\n\t\tfunction handleKeyDown( event ) {\n\n\t\t\tlet needsUpdate = false;\n\n\t\t\tswitch ( event.code ) {\n\n\t\t\t\tcase scope.keys.UP:\n\t\t\t\t\tpan( 0, scope.keyPanSpeed );\n\t\t\t\t\tneedsUpdate = true;\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase scope.keys.BOTTOM:\n\t\t\t\t\tpan( 0, - scope.keyPanSpeed );\n\t\t\t\t\tneedsUpdate = true;\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase scope.keys.LEFT:\n\t\t\t\t\tpan( scope.keyPanSpeed, 0 );\n\t\t\t\t\tneedsUpdate = true;\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase scope.keys.RIGHT:\n\t\t\t\t\tpan( - scope.keyPanSpeed, 0 );\n\t\t\t\t\tneedsUpdate = true;\n\t\t\t\t\tbreak;\n\n\t\t\t}\n\n\t\t\tif ( needsUpdate ) {\n\n\t\t\t\t// prevent the browser from scrolling on cursor keys\n\t\t\t\tevent.preventDefault();\n\n\t\t\t\tscope.update();\n\n\t\t\t}\n\n\n\t\t}\n\n\t\tfunction handleTouchStartRotate() {\n\n\t\t\tif ( pointers.length === 1 ) {\n\n\t\t\t\trotateStart.set( pointers[ 0 ].pageX, pointers[ 0 ].pageY );\n\n\t\t\t} else {\n\n\t\t\t\tconst x = 0.5 * ( pointers[ 0 ].pageX + pointers[ 1 ].pageX );\n\t\t\t\tconst y = 0.5 * ( pointers[ 0 ].pageY + pointers[ 1 ].pageY );\n\n\t\t\t\trotateStart.set( x, y );\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction handleTouchStartPan() {\n\n\t\t\tif ( pointers.length === 1 ) {\n\n\t\t\t\tpanStart.set( pointers[ 0 ].pageX, pointers[ 0 ].pageY );\n\n\t\t\t} else {\n\n\t\t\t\tconst x = 0.5 * ( pointers[ 0 ].pageX + pointers[ 1 ].pageX );\n\t\t\t\tconst y = 0.5 * ( pointers[ 0 ].pageY + pointers[ 1 ].pageY );\n\n\t\t\t\tpanStart.set( x, y );\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction handleTouchStartDolly() {\n\n\t\t\tconst dx = pointers[ 0 ].pageX - pointers[ 1 ].pageX;\n\t\t\tconst dy = pointers[ 0 ].pageY - pointers[ 1 ].pageY;\n\n\t\t\tconst distance = Math.sqrt( dx * dx + dy * dy );\n\n\t\t\tdollyStart.set( 0, distance );\n\n\t\t}\n\n\t\tfunction handleTouchStartDollyPan() {\n\n\t\t\tif ( scope.enableZoom ) handleTouchStartDolly();\n\n\t\t\tif ( scope.enablePan ) handleTouchStartPan();\n\n\t\t}\n\n\t\tfunction handleTouchStartDollyRotate() {\n\n\t\t\tif ( scope.enableZoom ) handleTouchStartDolly();\n\n\t\t\tif ( scope.enableRotate ) handleTouchStartRotate();\n\n\t\t}\n\n\t\tfunction handleTouchMoveRotate( event ) {\n\n\t\t\tif ( pointers.length == 1 ) {\n\n\t\t\t\trotateEnd.set( event.pageX, event.pageY );\n\n\t\t\t} else {\n\n\t\t\t\tconst position = getSecondPointerPosition( event );\n\n\t\t\t\tconst x = 0.5 * ( event.pageX + position.x );\n\t\t\t\tconst y = 0.5 * ( event.pageY + position.y );\n\n\t\t\t\trotateEnd.set( x, y );\n\n\t\t\t}\n\n\t\t\trotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );\n\n\t\t\tconst element = scope.domElement;\n\n\t\t\trotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height\n\n\t\t\trotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );\n\n\t\t\trotateStart.copy( rotateEnd );\n\n\t\t}\n\n\t\tfunction handleTouchMovePan( event ) {\n\n\t\t\tif ( pointers.length === 1 ) {\n\n\t\t\t\tpanEnd.set( event.pageX, event.pageY );\n\n\t\t\t} else {\n\n\t\t\t\tconst position = getSecondPointerPosition( event );\n\n\t\t\t\tconst x = 0.5 * ( event.pageX + position.x );\n\t\t\t\tconst y = 0.5 * ( event.pageY + position.y );\n\n\t\t\t\tpanEnd.set( x, y );\n\n\t\t\t}\n\n\t\t\tpanDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );\n\n\t\t\tpan( panDelta.x, panDelta.y );\n\n\t\t\tpanStart.copy( panEnd );\n\n\t\t}\n\n\t\tfunction handleTouchMoveDolly( event ) {\n\n\t\t\tconst position = getSecondPointerPosition( event );\n\n\t\t\tconst dx = event.pageX - position.x;\n\t\t\tconst dy = event.pageY - position.y;\n\n\t\t\tconst distance = Math.sqrt( dx * dx + dy * dy );\n\n\t\t\tdollyEnd.set( 0, distance );\n\n\t\t\tdollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );\n\n\t\t\tdollyOut( dollyDelta.y );\n\n\t\t\tdollyStart.copy( dollyEnd );\n\n\t\t}\n\n\t\tfunction handleTouchMoveDollyPan( event ) {\n\n\t\t\tif ( scope.enableZoom ) handleTouchMoveDolly( event );\n\n\t\t\tif ( scope.enablePan ) handleTouchMovePan( event );\n\n\t\t}\n\n\t\tfunction handleTouchMoveDollyRotate( event ) {\n\n\t\t\tif ( scope.enableZoom ) handleTouchMoveDolly( event );\n\n\t\t\tif ( scope.enableRotate ) handleTouchMoveRotate( event );\n\n\t\t}\n\n\t\t//\n\t\t// event handlers - FSM: listen for events and reset state\n\t\t//\n\n\t\tfunction onPointerDown( event ) {\n\n\t\t\tif ( scope.enabled === false ) return;\n\n\t\t\tif ( pointers.length === 0 ) {\n\n\t\t\t\tscope.domElement.setPointerCapture( event.pointerId );\n\n\t\t\t\tscope.domElement.addEventListener( 'pointermove', onPointerMove );\n\t\t\t\tscope.domElement.addEventListener( 'pointerup', onPointerUp );\n\n\t\t\t}\n\n\t\t\t//\n\n\t\t\taddPointer( event );\n\n\t\t\tif ( event.pointerType === 'touch' ) {\n\n\t\t\t\tonTouchStart( event );\n\n\t\t\t} else {\n\n\t\t\t\tonMouseDown( event );\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction onPointerMove( event ) {\n\n\t\t\tif ( scope.enabled === false ) return;\n\n\t\t\tif ( event.pointerType === 'touch' ) {\n\n\t\t\t\tonTouchMove( event );\n\n\t\t\t} else {\n\n\t\t\t\tonMouseMove( event );\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction onPointerUp( event ) {\n\n\t\t    removePointer( event );\n\n\t\t    if ( pointers.length === 0 ) {\n\n\t\t        scope.domElement.releasePointerCapture( event.pointerId );\n\n\t\t        scope.domElement.removeEventListener( 'pointermove', onPointerMove );\n\t\t        scope.domElement.removeEventListener( 'pointerup', onPointerUp );\n\n\t\t    }\n\n\t\t    scope.dispatchEvent( _endEvent );\n\n\t\t    state = STATE.NONE;\n\n\t\t}\n\n\t\tfunction onPointerCancel( event ) {\n\n\t\t\tremovePointer( event );\n\n\t\t}\n\n\t\tfunction onMouseDown( event ) {\n\n\t\t\tlet mouseAction;\n\n\t\t\tswitch ( event.button ) {\n\n\t\t\t\tcase 0:\n\n\t\t\t\t\tmouseAction = scope.mouseButtons.LEFT;\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase 1:\n\n\t\t\t\t\tmouseAction = scope.mouseButtons.MIDDLE;\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase 2:\n\n\t\t\t\t\tmouseAction = scope.mouseButtons.RIGHT;\n\t\t\t\t\tbreak;\n\n\t\t\t\tdefault:\n\n\t\t\t\t\tmouseAction = - 1;\n\n\t\t\t}\n\n\t\t\tswitch ( mouseAction ) {\n\n\t\t\t\tcase THREE.MOUSE.DOLLY:\n\n\t\t\t\t\tif ( scope.enableZoom === false ) return;\n\n\t\t\t\t\thandleMouseDownDolly( event );\n\n\t\t\t\t\tstate = STATE.DOLLY;\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase THREE.MOUSE.ROTATE:\n\n\t\t\t\t\tif ( event.ctrlKey || event.metaKey || event.shiftKey ) {\n\n\t\t\t\t\t\tif ( scope.enablePan === false ) return;\n\n\t\t\t\t\t\thandleMouseDownPan( event );\n\n\t\t\t\t\t\tstate = STATE.PAN;\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tif ( scope.enableRotate === false ) return;\n\n\t\t\t\t\t\thandleMouseDownRotate( event );\n\n\t\t\t\t\t\tstate = STATE.ROTATE;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase THREE.MOUSE.PAN:\n\n\t\t\t\t\tif ( event.ctrlKey || event.metaKey || event.shiftKey ) {\n\n\t\t\t\t\t\tif ( scope.enableRotate === false ) return;\n\n\t\t\t\t\t\thandleMouseDownRotate( event );\n\n\t\t\t\t\t\tstate = STATE.ROTATE;\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tif ( scope.enablePan === false ) return;\n\n\t\t\t\t\t\thandleMouseDownPan( event );\n\n\t\t\t\t\t\tstate = STATE.PAN;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tdefault:\n\n\t\t\t\t\tstate = STATE.NONE;\n\n\t\t\t}\n\n\t\t\tif ( state !== STATE.NONE ) {\n\n\t\t\t\tscope.dispatchEvent( _startEvent );\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction onMouseMove( event ) {\n\n\t\t\tswitch ( state ) {\n\n\t\t\t\tcase STATE.ROTATE:\n\n\t\t\t\t\tif ( scope.enableRotate === false ) return;\n\n\t\t\t\t\thandleMouseMoveRotate( event );\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase STATE.DOLLY:\n\n\t\t\t\t\tif ( scope.enableZoom === false ) return;\n\n\t\t\t\t\thandleMouseMoveDolly( event );\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase STATE.PAN:\n\n\t\t\t\t\tif ( scope.enablePan === false ) return;\n\n\t\t\t\t\thandleMouseMovePan( event );\n\n\t\t\t\t\tbreak;\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction onMouseWheel( event ) {\n\n\t\t\tif ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;\n\n\t\t\tevent.preventDefault();\n\n\t\t\tscope.dispatchEvent( _startEvent );\n\n\t\t\thandleMouseWheel( event );\n\n\t\t\tscope.dispatchEvent( _endEvent );\n\n\t\t}\n\n\t\tfunction onKeyDown( event ) {\n\n\t\t\tif ( scope.enabled === false || scope.enablePan === false ) return;\n\n\t\t\thandleKeyDown( event );\n\n\t\t}\n\n\t\tfunction onTouchStart( event ) {\n\n\t\t\ttrackPointer( event );\n\n\t\t\tswitch ( pointers.length ) {\n\n\t\t\t\tcase 1:\n\n\t\t\t\t\tswitch ( scope.touches.ONE ) {\n\n\t\t\t\t\t\tcase THREE.TOUCH.ROTATE:\n\n\t\t\t\t\t\t\tif ( scope.enableRotate === false ) return;\n\n\t\t\t\t\t\t\thandleTouchStartRotate();\n\n\t\t\t\t\t\t\tstate = STATE.TOUCH_ROTATE;\n\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase THREE.TOUCH.PAN:\n\n\t\t\t\t\t\t\tif ( scope.enablePan === false ) return;\n\n\t\t\t\t\t\t\thandleTouchStartPan();\n\n\t\t\t\t\t\t\tstate = STATE.TOUCH_PAN;\n\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tdefault:\n\n\t\t\t\t\t\t\tstate = STATE.NONE;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase 2:\n\n\t\t\t\t\tswitch ( scope.touches.TWO ) {\n\n\t\t\t\t\t\tcase THREE.TOUCH.DOLLY_PAN:\n\n\t\t\t\t\t\t\tif ( scope.enableZoom === false && scope.enablePan === false ) return;\n\n\t\t\t\t\t\t\thandleTouchStartDollyPan();\n\n\t\t\t\t\t\t\tstate = STATE.TOUCH_DOLLY_PAN;\n\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tcase THREE.TOUCH.DOLLY_ROTATE:\n\n\t\t\t\t\t\t\tif ( scope.enableZoom === false && scope.enableRotate === false ) return;\n\n\t\t\t\t\t\t\thandleTouchStartDollyRotate();\n\n\t\t\t\t\t\t\tstate = STATE.TOUCH_DOLLY_ROTATE;\n\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\tdefault:\n\n\t\t\t\t\t\t\tstate = STATE.NONE;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tdefault:\n\n\t\t\t\t\tstate = STATE.NONE;\n\n\t\t\t}\n\n\t\t\tif ( state !== STATE.NONE ) {\n\n\t\t\t\tscope.dispatchEvent( _startEvent );\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction onTouchMove( event ) {\n\n\t\t\ttrackPointer( event );\n\n\t\t\tswitch ( state ) {\n\n\t\t\t\tcase STATE.TOUCH_ROTATE:\n\n\t\t\t\t\tif ( scope.enableRotate === false ) return;\n\n\t\t\t\t\thandleTouchMoveRotate( event );\n\n\t\t\t\t\tscope.update();\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase STATE.TOUCH_PAN:\n\n\t\t\t\t\tif ( scope.enablePan === false ) return;\n\n\t\t\t\t\thandleTouchMovePan( event );\n\n\t\t\t\t\tscope.update();\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase STATE.TOUCH_DOLLY_PAN:\n\n\t\t\t\t\tif ( scope.enableZoom === false && scope.enablePan === false ) return;\n\n\t\t\t\t\thandleTouchMoveDollyPan( event );\n\n\t\t\t\t\tscope.update();\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tcase STATE.TOUCH_DOLLY_ROTATE:\n\n\t\t\t\t\tif ( scope.enableZoom === false && scope.enableRotate === false ) return;\n\n\t\t\t\t\thandleTouchMoveDollyRotate( event );\n\n\t\t\t\t\tscope.update();\n\n\t\t\t\t\tbreak;\n\n\t\t\t\tdefault:\n\n\t\t\t\t\tstate = STATE.NONE;\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction onContextMenu( event ) {\n\n\t\t\tif ( scope.enabled === false ) return;\n\n\t\t\tevent.preventDefault();\n\n\t\t}\n\n\t\tfunction addPointer( event ) {\n\n\t\t\tpointers.push( event );\n\n\t\t}\n\n\t\tfunction removePointer( event ) {\n\n\t\t\tdelete pointerPositions[ event.pointerId ];\n\n\t\t\tfor ( let i = 0; i < pointers.length; i ++ ) {\n\n\t\t\t\tif ( pointers[ i ].pointerId == event.pointerId ) {\n\n\t\t\t\t\tpointers.splice( i, 1 );\n\t\t\t\t\treturn;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction trackPointer( event ) {\n\n\t\t\tlet position = pointerPositions[ event.pointerId ];\n\n\t\t\tif ( position === undefined ) {\n\n\t\t\t\tposition = new Vector2();\n\t\t\t\tpointerPositions[ event.pointerId ] = position;\n\n\t\t\t}\n\n\t\t\tposition.set( event.pageX, event.pageY );\n\n\t\t}\n\n\t\tfunction getSecondPointerPosition( event ) {\n\n\t\t\tconst pointer = ( event.pointerId === pointers[ 0 ].pointerId ) ? pointers[ 1 ] : pointers[ 0 ];\n\n\t\t\treturn pointerPositions[ pointer.pointerId ];\n\n\t\t}\n\n\t\t//\n\n\t\tscope.domElement.addEventListener( 'contextmenu', onContextMenu );\n\n\t\tscope.domElement.addEventListener( 'pointerdown', onPointerDown );\n\t\tscope.domElement.addEventListener( 'pointercancel', onPointerCancel );\n\t\tscope.domElement.addEventListener( 'wheel', onMouseWheel, { passive: false } );\n\n\t\t// force an update at start\n\n\t\tthis.update();\n\n\t}\n\n}\n\n\n// This set of controls performs orbiting, dollying (zooming), and panning.\n// Unlike TrackballControls, it maintains the \"up\" direction object.up (+Y by default).\n// This is very similar to OrbitControls, another set of touch behavior\n//\n//    Orbit - right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate\n//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish\n//    Pan - left mouse, or arrow keys / touch: one-finger move\n\nclass MapControls extends OrbitControls {\n\n\tconstructor( object, domElement ) {\n\n\t\tsuper( object, domElement );\n\n\t\tthis.screenSpacePanning = false; // pan orthogonal to world-space direction camera.up\n\n\t\tthis.mouseButtons.LEFT = THREE.MOUSE.PAN;\n\t\tthis.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;\n\n\t\tthis.touches.ONE = THREE.TOUCH.PAN;\n\t\tthis.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;\n\n\t}\n\n}\n\n\n\n//# sourceURL=webpack://MC/./static/src/jsm/OrbitControls.js?");

/***/ }),

/***/ "./static/src/script.js":
/*!******************************!*\
  !*** ./static/src/script.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _jsm_OrbitControls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsm/OrbitControls.js */ \"./static/src/jsm/OrbitControls.js\");\n\n\n\nlet state = {\n    scene: undefined,\n    camera: undefined,\n    renderer: undefined,\n    controls: undefined,\n    blocks: undefined\n}\n\nconst color = {\n    \"stone\": 0x6e6e6e,\n    \"acacia_leaves\": 0x06801a,\n    \"grass_block\": 0x0bb02,\n    \"dirt\": 0x914f39,\n    \"granite\": 0x6e6e6e,\n}\n\n\nconst init = async () => {\n    state.scene = new THREE.Scene();\n    state.scene.background = new THREE.Color( 0xa0a0a0 );\n    // state.scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );\n\n    const clock = new THREE.Clock();\n\n\n    \n    state.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 100 );\n    state.camera.position.set( 0, 3, 7 );\n    state.scene.add(state.camera);\n\n\n    state.renderer = new THREE.WebGLRenderer();\n    state.renderer.setSize( window.innerWidth, window.innerHeight );\n    state.renderer.shadowMap.enabled = true\n\n    document.querySelector(\"#screen\").appendChild( state.renderer.domElement );\n    \n    const dirLight = new THREE.DirectionalLight( 0xffffff );\n    dirLight.position.set( -40, 400, -70 );\n    dirLight.shadow.camera.top = 150;\n    dirLight.shadow.camera.right = 150;\n    dirLight.shadow.camera.bottom = -150;\n    dirLight.shadow.camera.left = -150;\n    dirLight.castShadow = true;\n\n\n    state.scene.add(dirLight);\n    \n    // const hemiLight = new THREE.HemisphereLight( 0x707070, 0x444444 );\n    // hemiLight.position.set( 0, 120, 0 );\n    // state.scene.add(hemiLight);\n    \n    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ),new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: true} ) );\n    mesh.rotation.x = - Math.PI / 2;\n    mesh.receiveShadow = true;\n    state.scene.add(mesh);\n\n    \n    state.controls = new _jsm_OrbitControls_js__WEBPACK_IMPORTED_MODULE_0__.OrbitControls( state.camera, state.renderer.domElement );\n    state.controls.enableDamping = true;\n    state.controls.dampingFactor = 1;\n\n    const helper = new THREE.CameraHelper( dirLight.shadow.camera );\n    state.scene.add( helper );\n    \n    function animate() {\n        requestAnimationFrame( animate );\n\n        state.renderer.render( state.scene, state.camera );\n    }\n\n\n\n    animate();\n    state.blocks = await getBlocks()\n\n    await appendBlocks()\n\n    console.log(state.blocks)\n    \n}\n\n\nconst getBlocks = async () => {\n    const req = await fetch(\"/map\")\n    const res = await req.json()\n    return res\n}\n\nconst appendBlocks = async () => {\n    for (const y in state.blocks) {\n        if (Object.hasOwnProperty.call(state.blocks, y)) {\n            const element = state.blocks[y];\n\n\n            for (const xz in element) {\n                if (Object.hasOwnProperty.call(element, xz)) {\n                    const block = element[xz];\n                    const x = xz % 16\n                    const z = Math.floor(xz / 16)\n                    const ignoreBlocks = ['air', 'grass']\n                    console.log(block, x, z, y)\n\n                    if (!ignoreBlocks.includes(block)) {\n                        createBlock({\n                            block: block,\n                            x: x,\n                            y: y,\n                            z: z\n                        })\n                    }\n\n                }\n            }\n            \n        }\n    }\n}\n\nconst createBlock = async ({ block, x, y, z }) => {\n    const geometry = new THREE.BoxGeometry( 1, 1, 1 ); \n    const texture = setTexture({ type: \"ss\" })\n    console.log(block)\n    const material = new THREE.MeshPhongMaterial( { color: color[block], depthWrite: true } )  // new THREE.MeshBasicMaterial( {color: 0x878787} ); \n    const cube = new THREE.Mesh( geometry, material ); \n    cube.position.set(x, y, z)\n    cube.castShadow = true\n    cube.receiveShadow = true\n\n    state.scene.add( cube );\n}\n\nconst setTexture = ({ type }) => {\n    const textureLoader = new THREE.TextureLoader();\n\n    const texture = textureLoader.load(\"/static/textures/stone.jpg\", (texture) => {\n        texture.repeat.x = 2;\n        texture.repeat.y = 2;\n        texture.wrapS = THREE.RepeatWrapping;\n        texture.wrapT = THREE.RepeatWrapping;\n    });\n\n\n    return texture\n}\n\ninit()\n\n//# sourceURL=webpack://MC/./static/src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./static/src/script.js");
/******/ 	MC = __webpack_exports__;
/******/ 	
/******/ })()
;