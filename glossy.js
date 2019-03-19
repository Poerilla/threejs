var canvas = document.getElementById("canvas");

window.onresize = resizeCanvas;
resizeCanvas();

var scene = new Scene(canvas);

render();

function render() {
  requestAnimationFrame(render);
  scene.update();
}

function resizeCanvas() {
  var canvas = document.getElementById("canvas");
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  if (scene) scene.onWindowResize();
}

function Scene(canvas) {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  // used to move the light
  var time = 0;

  var width = canvas.width;
  var height = canvas.height;

  var scene = new THREE.Scene();
  scene.background = new THREE.Color("#202020");

  var light = buildLights(scene);
  var camera = buildCamera(width, height);
  var renderer = buildRender(width, height);
  var mesh = addObjects(scene);

  function buildLights(scene) {
    var light = new THREE.SpotLight("#fff", 0.8);
    light.position.y = 100;

    light.angle = 1.05;

    light.decacy = 2;
    light.penumbra = 1;

    light.shadow.camera.near = 10;
    light.shadow.camera.far = 1000;
    light.shadow.camera.fov = 30;

    scene.add(light);

    return light;
  }

  function buildCamera(width, height) {
    var aspectRatio = width / height;
    var fieldOfView = 60;
    var nearPlane = 10;
    var farPlane = 500;
    var camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    camera.position.z = 100;

    return camera;
  }

  function buildRender(width, height) {
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    var DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  function addObjects(scene) {
    var geometry = new THREE.SphereGeometry(30, 64, 64);
    var material = new THREE.MeshStandardMaterial({
      color: "#000",
      roughness: 1
    });

    // these images are loaded as data uri. Just copy and paste the string contained in "image.src" in your browser's url bar to see the image.
    // environment map used to fake the reflex
    var image = document.createElement("img");
    var envMap = new THREE.Texture(image);
    image.onload = function() {
      envMap.needsUpdate = true;
    };
    image.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTc1M2NlNy1iZGRlLTY4NGEtODY1Mi0yZDc0MGJmODNiMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI0MzgwNDJCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI0MzgwNDFCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzE3NTNjZTctYmRkZS02ODRhLTg2NTItMmQ3NDBiZjgzYjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxNzUzY2U3LWJkZGUtNjg0YS04NjUyLTJkNzQwYmY4M2IyNiIv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";
    envMap.mapping = THREE.SphericalReflectionMapping;
    material.envMap = envMap;

    // roughnessMap
    var image = document.createElement("img");
    var roughnessMap = new THREE.Texture(image);
    image.onload = function() {
      roughnessMap.needsUpdate = true;
    };
    image.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzNjk1NjkxQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYzNjk1NjkyQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjM2OTU2OEZCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjM2OTU2OTBCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WU2ohAAAAH0lEQVR42mJgoDVg/P//P0kamBgGHRj1w0jxA0CAAQBKrgwBw+YutwAAAABJRU5ErkJggg==";

    roughnessMap.magFilter = THREE.NearestFilter;
    material.roughnessMap = roughnessMap;

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return mesh;
  }

  this.update = function() {
    time++;

    // move the light
    light.position.x = Math.sin(time * 0.01) * 200;

    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;
    mesh.rotation.z += 0.001;

    renderer.clear();
    renderer.render(scene, camera);
  };

  this.onWindowResize = function() {
    var canvas = document.getElementById("canvas");
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    canvas.width = width;
    canvas.height = height;

    camera = buildCamera(width, height);

    renderer.setSize(width, height);
  };
}
