import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertexParticles.glsl";
import GUI from "lil-gui";
import gsap from "gsap";
import scene from "../scene.json";
import colorTiles from "../color-tiles.png";
import scaleTexture from "../scale-texture.png";
import anitiles from "../ani-tiles.exr";
const random = require("canvas-sketch-util/random");
const createInputEvents = require("simple-input-events");

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({
      transparent: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    // this.renderer.setClearColor(0x000000, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.event = createInputEvents(this.renderer.domElement);
    this.renderer.autoClear = false;

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      4000
    );

    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera.position.set(0, 250, 325);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.time = 0;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.glow = new THREE.WebGLRenderTarget(this.width, this.height, {});

    this.isPlaying = true;

    this.addObjects();
    this.resize();
    // this.render();
    this.setupResize();
    this.settings();
    this.raycasterEvent();
  }

  raycasterEvent() {
    this.ball = new THREE.Mesh(
      new THREE.SphereBufferGeometry(10, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    this.scene.add(this.ball);

    let testmesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000),
      new THREE.MeshBasicMaterial({ transparent: true })
    );
    testmesh.rotation.x = -Math.PI / 2;
    testmesh.visible = false;
    this.scene.add(testmesh);

    this.event.on("move", ({ position, event, inside, dragging }) => {
      // mousemove / touchmove
      // console.log(position); // [ x, y ]
      // console.log(event); // original mouse/touch event
      // console.log(inside); // true if the mouse/touch is inside the element
      // console.log(dragging); // true if the pointer was down/dragging

      this.pointer.x = (position[0] / window.innerWidth) * 2 - 1;
      this.pointer.y = -(position[1] / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);

      const intersects = this.raycaster.intersectObjects([testmesh]);

      // console.log(intersects[0]);
      if (intersects[0]) {
        let p = intersects[0].point;
        this.material.uniforms.interaction.value.x = p.x;
        this.material.uniforms.interaction.value.y = p.y;
        this.material.uniforms.interaction.value.z = p.z;
        this.material.uniforms.interaction.value.w = 1;
        this.ball.position.copy(p);
      }
    });
  }

  settings() {
    let that = this;
    let preset = {};
    this.settings = {
      fade: 0, //fade
      fdAlpha: 0, //fdAlpha
      glow: false, //glow 亮度
      nebulaAmp: 5, //nebulaAmp
      superScale: 1, //superScale 仅当glow开启时有效
      envStart: 1.25, //envStart 开始时间
      duration: 10, // duration 持续时间
      interpolate: true, //interpolate  是否内插平滑过渡
      scale: 1.0, //scale
      size: 2.6, //size
      nebula: true, //nebula
      focalDistance: 385, //focalDistance
      aperture: 100, //aperture
      maxParticleSize: 8, //maxParticleSize
      tint: new THREE.Color("#ffffff"), //tint
      hoverPoint: new THREE.Vector3(0, 0, 0),
      hover: 0,
      interaction: new THREE.Vector4(0, 0, 0, 0),
      iRadius: 11,
      //fragment
      globalAlpha: 1,
      superOpacity: 1, //superOpacity 透明度

      savePreset() {
        // save current values to an object
        let preset = guiInstance.save();
        DownloadJsonData(Date.now() + ".json", JSON.stringify(preset));
      },
      async loadPreset() {
        // 单元素数组结构
        const [fileHandle] = await window?.showOpenFilePicker({
          types: [
            {
              description: "文本文件",
              accept: { "text/plain": [".txt"], "application/json": [".json"] },
            },
          ],
        });
        // 获取文件File对象
        const file = await fileHandle?.getFile();
        const client = JSON.parse(await file.text());
        console.group("获取到的文件");
        console.log(client);
        console.log(file.text());
        console.groupEnd();
        guiInstance.load(client);
      },
    };

    this.gui = new GUI();
    const guiInstance = this.gui;
    let vertex = this.gui.addFolder("vertex");
    vertex.add(this.settings, "fade", 0, 1, 0.01);
    vertex.add(this.settings, "fdAlpha", 0, 1, 0.01);
    vertex.add(this.settings, "superScale", 0, 3, 0.01);
    vertex.add(this.settings, "glow");
    vertex.add(this.settings, "nebulaAmp", 0, 1000, 0.01);
    vertex.add(this, "time", -5, 5, 0.1);
    vertex.add(this.settings, "envStart", 0, 2, 0.1);
    vertex.add(this.settings, "duration", 0, 100, 0.1);
    vertex.add(this.settings, "interpolate");
    vertex.add(this.settings, "scale");
    vertex.add(this.settings, "size");
    vertex.add(this.settings, "nebula");
    vertex.add(this.settings, "focalDistance", 0, 10000, 0.1);
    vertex.add(this.settings, "aperture", 0, 10000, 0.1);
    vertex.add(this.settings, "maxParticleSize", 0, 100, 1);

    let folderHP = vertex.addFolder("hoverPoint");
    folderHP.addColor(this.settings, "tint", 255);
    folderHP.add(this.settings.hoverPoint, "x", -1000, 1000, 1);
    folderHP.add(this.settings.hoverPoint, "y", -1000, 1000, 1);
    folderHP.add(this.settings.hoverPoint, "z", -1000, 1000, 1);
    folderHP.add(this.settings, "hover");

    let folderI = this.gui.addFolder("interaction");
    // folderI.add(this.settings.interaction, "x", -100, 100, 1);
    // folderI.add(this.settings.interaction, "y", -100, 100, 1);
    // folderI.add(this.settings.interaction, "z", -100, 100, 1);
    // folderI.add(this.settings.interaction, "w", 0, 1, 0.01);
    folderI.add(this.settings, "iRadius", 0, 40, 1);

    let fragment = this.gui.addFolder("fragment");
    fragment.add(this.settings, "globalAlpha", 0, 1, 0.01);
    fragment.add(this.settings, "superOpacity", 0, 1, 0.01);

    this.gui.add(this.settings, "savePreset");
    const loadButton = this.gui.add(this.settings, "loadPreset");

    function DownloadJsonData(filename, text) {
      console.log(filename, text);
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
  }

  addObjects() {
    let that = this;

    this.planets = [];
    this.planetsMeshes = [];
    for (let i = 0; i < 3; i++) {
      let x = 100 * Math.sin((Math.PI * 2 * i) / 3);
      let y = 100 * Math.cos((Math.PI * 2 * i) / 3);
      let z = 0;
      this.planets.push(new THREE.Vector3(x, z, y));
      let planet = new THREE.Mesh(
        new THREE.SphereBufferGeometry(11, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      );
      planet.position.set(x, z, y);
      this.planetsMeshes.push(planet);
      this.scene.add(planet);
    }

    this.material = new THREE.RawShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        time: {
          value: 0,
        },
        duration: {
          value: 10,
        },
        envStart: {
          value: 1.25,
        },
        interpolate: {
          value: false,
        },
        fade: {
          value: 0,
        },
        fdAlpha: {
          value: 0,
        },
        globalAlpha: {
          value: 1,
        },
        posTex: {
          value: null,
        },
        color: {
          value: null,
        },
        scaleTex: {
          value: null,
        },
        scale: {
          value: 1,
        },
        size: {
          value: 2.6,
        },
        nebula: {
          value: true,
        },
        focalDistance: {
          value: 385,
        },
        aperture: {
          value: 100,
        },
        maxParticleSize: {
          value: 8,
        },
        tint: {
          value: new THREE.Color("#fff"),
        },
        glow: {
          value: false,
        },
        superOpacity: {
          value: 1,
        },
        superScale: {
          value: 1,
        },
        hover: {
          value: 0,
        },
        planets: {
          value: this.planets,
        },
        hoverPoint: {
          value: new THREE.Vector3(0, 0, 0),
        },
        interaction: {
          value: new THREE.Vector4(0, 0, 0, 0),
        },
        iRadius: {
          value: 11,
        },
        nebulaAmp: {
          value: 5,
        },
      },
      wireframe: false,
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    new EXRLoader().load(anitiles, (texture) => {
      console.log(texture, "texture");
      texture.generateMipmaps = false;
      texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      this.material.uniforms.posTex.value = texture;

      this.render();
    });

    let scalesT = new THREE.TextureLoader().load(scaleTexture);
    scalesT.minFilter = THREE.NearestFilter;
    scalesT.magFilter = THREE.NearestFilter;

    let colorsT = new THREE.TextureLoader().load(colorTiles);
    colorsT.minFilter = THREE.NearestFilter;
    colorsT.magFilter = THREE.NearestFilter;

    this.material.uniforms.scaleTex.value = scalesT;
    this.material.uniforms.color.value = colorsT;

    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);

    this.geometry = new THREE.BufferGeometry();
    let pos = [];

    // this.plane = new THREE.Points(this.geometry, this.material);
    // this.scene.add(this.plane);

    // - supply uniforms
    // - load exr and rest texture for uniforms
    // - copy shader code for it to work
    // UV?

    let Im = 32768;
    let s = new Float32Array(Im * 3);
    let e = 300;

    for (let r = 0; r < Im; r++) {
      let o = r * 3;
      s[o] = random.range(-e, e);
      s[o + 1] = random.range(-e, e);
      s[o + 2] = random.range(-e, e);
    }
    let t = new Float32Array(Im * 2);
    let n = 0;
    for (let r = 0; r < 128; r++)
      for (let o = 0; o < 256; o++)
        (t[n * 2] = 1 / 256 + o / 257), (t[n * 2 + 1] = 1 / 128 + r / 129), n++;

    let geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(s, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(t, 2));
    this.mesh = new THREE.Points(geo, this.material);

    this.scene.add(this.mesh);
    this.mesh.rotation.x = Math.PI / 2;

    console.log(this.mesh);

    let test = new THREE.Mesh(
      new THREE.BoxBufferGeometry(10, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    // this.scene.add(test)
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.render();
    }
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;

    this.renderer.clear();
    // this.renderer.setClearColor(0x000000, 1);
    // this.material.uniforms.glow.value = 1
    this.material.uniforms.envStart.value = this.settings.envStart;
    this.material.uniforms.duration.value = this.settings.duration;
    this.material.uniforms.interpolate.value = this.settings.interpolate;
    this.material.uniforms.superOpacity.value = this.settings.superOpacity;
    this.material.uniforms.superScale.value = this.settings.superScale;
    this.material.uniforms.scale.value = this.settings.scale;
    this.material.uniforms.size.value = this.settings.size;
    this.material.uniforms.nebula.value = this.settings.nebula;
    this.material.uniforms.focalDistance.value = this.settings.focalDistance;
    this.material.uniforms.focalDistance.value = this.settings.focalDistance;
    this.material.uniforms.aperture.value = this.settings.aperture;
    this.material.uniforms.maxParticleSize.value =
      this.settings.maxParticleSize;
    this.material.uniforms.tint.value = this.settings.tint;
    this.material.uniforms.hoverPoint.value = this.settings.hoverPoint;
    this.material.uniforms.hover.value = this.settings.hover;
    // this.material.uniforms.interaction.value = this.settings.interaction;
    this.material.uniforms.iRadius.value = this.settings.iRadius;
    this.material.uniforms.nebulaAmp.value = this.settings.nebulaAmp;

    // fragment
    this.material.uniforms.globalAlpha.value = this.settings.globalAlpha;

    // this.renderer.setRenderTarget(this.glow);
    this.renderer.render(this.scene, this.camera);
    // this.renderer.setRenderTarget(null);

    // this.renderer.autoClear = false;
    this.renderer.clearDepth();
    // this.material.uniforms.glow.value = 0
    // this.renderer.setClearColor(0x000000, 0);
    this.material.uniforms.tint.value = this.settings.tint;
    // this.time = this.time%1;
    this.material.uniforms.fade.value = this.settings.fade;
    this.material.uniforms.glow.value = this.settings.glow;
    this.material.uniforms.time.value = this.time;

    this.material.uniforms.fdAlpha.value = this.settings.fdAlpha;
    // this.material.uniforms.superOpacity.value = 1;
    // this.material.uniforms.duration.value = this.settings.duration;

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);

    for (let i = 0; i < 3; i++) {
      let x = 100 * Math.sin((Math.PI * 2 * i) / 3 + this.time / 10);
      let y = 100 * Math.cos((Math.PI * 2 * i) / 3 + this.time / 10);
      let z = 0;
      this.planets[i] = new THREE.Vector3(x, z, y);
      this.planetsMeshes[i].position.set(x, z, y);
    }
  }
}

new Sketch({
  dom: document.getElementById("container"),
});
