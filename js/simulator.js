/* ============================================================
   Rakha Jaya Teknik — Simulator 3D Kanopi & Pagar
   Dibangun dengan Three.js (di-host lokal di /vendor, tidak
   bergantung pada CDN eksternal). Semua model kanopi & pagar
   dibuat prosedural dari primitif geometri Three.js, mengikuti
   bentuk umum desain kanopi/pagar minimalis yang lazim dijumpai
   (flat, lengkung, pelana, kantilever / vertikal, horizontal,
   panel solid, motif lattice).
   ============================================================ */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* ---------------- DOM refs ---------------- */
const viewerEl   = document.getElementById('sim-viewer');
const loadingEl  = document.getElementById('sim-loading');
const canopyGrid = document.getElementById('canopy-grid');
const fenceGrid  = document.getElementById('fence-grid');
const colorRow   = document.getElementById('color-row');
const tabButtons = document.querySelectorAll('.sim-tab');
const panelCanopy = document.getElementById('panel-canopy');
const panelFence   = document.getElementById('panel-fence');
const btnZoomIn  = document.getElementById('btn-zoom-in');
const btnZoomOut = document.getElementById('btn-zoom-out');
const btnReset   = document.getElementById('btn-reset');

/* ---------------- Config ---------------- */
const COLORS = [
  { id: 'black',    label: 'Hitam',            hex: 0x1B1F26 },
  { id: 'graphite', label: 'Abu Grafit',        hex: 0x4B5563 },
  { id: 'orange',   label: 'Oranye Signature',  hex: 0xC6590A }
];

const CANOPY_TYPES = [
  { id: 'flat',       label: 'Flat Minimalis',  icon: 'M6 12H42M10 12V27M38 12V27' },
  { id: 'arc',        label: 'Lengkung (Arc)',  icon: 'M5 19C12 6 36 6 43 19M10 19V27M38 19V27' },
  { id: 'gable',      label: 'Pelana (Gable)',  icon: 'M5 20 24 8 43 20M10 20V27M38 20V27' },
  { id: 'cantilever', label: 'Kantilever',      icon: 'M6 14H42M31 14V27' }
];

const FENCE_TYPES = [
  { id: 'vertical',   label: 'Vertikal Minimalis', icon: 'M4 8H44M4 25H44M8 8V25M15 8V25M22 8V25M29 8V25M36 8V25M43 8V25' },
  { id: 'horizontal', label: 'Horizontal Slat',    icon: 'M6 9H42M6 14.5H42M6 20H42M6 25.5H42' },
  { id: 'solid',       label: 'Panel Solid',        icon: 'M5 8H43V26H5Z' },
  { id: 'lattice',     label: 'Motif Lattice',      icon: 'M5 8H43V26H5ZM5 8 24 26M24 8 5 26M24 8 43 26M43 8 24 26' }
];

const state = { canopy: 'flat', fence: 'vertical', color: 'black' };

/* ---------------- Renderer / Scene / Camera ---------------- */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
viewerEl.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
const initialCamPos = new THREE.Vector3(11, 6.6, 12.5);
const initialTarget = new THREE.Vector3(3.4, 1.5, 0.6);
camera.position.copy(initialCamPos);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(initialTarget);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 6;
controls.maxDistance = 26;
controls.maxPolarAngle = Math.PI / 2 - 0.03;
controls.update();

/* ---------------- Lights ---------------- */
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const hemi = new THREE.HemisphereLight(0xCFE3EC, 0x8a9469, 0.5);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xfff2df, 1.15);
sun.position.set(9, 15, 7);
sun.castShadow = true;
sun.shadow.mapSize.set(1536, 1536);
sun.shadow.camera.left = -16;
sun.shadow.camera.right = 16;
sun.shadow.camera.top = 16;
sun.shadow.camera.bottom = -16;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 40;
sun.shadow.bias = -0.0015;
sun.target.position.set(4, 0, 0);
scene.add(sun);
scene.add(sun.target);

/* ---------------- Materials helpers ---------------- */
function metalMat(hex) {
  return new THREE.MeshStandardMaterial({ color: hex, roughness: 0.42, metalness: 0.65 });
}
const panelMat = new THREE.MeshPhysicalMaterial({
  color: 0xE9F2F5, roughness: 0.22, metalness: 0.05,
  transparent: true, opacity: 0.55, side: THREE.DoubleSide
});
const grooveMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.9, transparent: true, opacity: 0.22 });

/* ---------------- Ground ---------------- */
function buildGround() {
  const g = new THREE.Group();
  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(46, 46),
    new THREE.MeshStandardMaterial({ color: 0x93AD73, roughness: 1 })
  );
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = -0.01;
  grass.receiveShadow = true;
  g.add(grass);

  const paving = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 5.4),
    new THREE.MeshStandardMaterial({ color: 0xD7D2C6, roughness: 0.92 })
  );
  paving.rotation.x = -Math.PI / 2;
  paving.position.set(5.6, 0, 0);
  paving.receiveShadow = true;
  g.add(paving);

  const walk = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 2.4),
    new THREE.MeshStandardMaterial({ color: 0xDAD5C9, roughness: 0.92 })
  );
  walk.rotation.x = -Math.PI / 2;
  walk.position.set(-1.6, 0, 3.4);
  walk.receiveShadow = true;
  g.add(walk);

  return g;
}

/* ---------------- House ---------------- */
function buildHouse() {
  const g = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xF1EDE4, roughness: 0.88, metalness: 0.02 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x2A3140, roughness: 0.55, metalness: 0.15 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x14181F, roughness: 0.7 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0xBFD9E6, roughness: 0.12, metalness: 0.1, transparent: true, opacity: 0.65 });

  const wallW = 6, wallH = 3, wallD = 5;
  const walls = new THREE.Mesh(new THREE.BoxGeometry(wallW, wallH, wallD), wallMat);
  walls.position.set(0, wallH / 2, 0);
  walls.castShadow = true;
  walls.receiveShadow = true;
  g.add(walls);

  const roofH = 1.7;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(4.6, roofH, 4), roofMat);
  roof.rotation.y = Math.PI / 4;
  roof.position.set(0, wallH + roofH / 2 - 0.05, 0);
  roof.castShadow = true;
  g.add(roof);

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.0, 0.06), trimMat);
  door.position.set(-1.6, 1.0, wallD / 2 + 0.03);
  g.add(door);

  [-0.05, 1.65].forEach((x) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.03), trimMat);
    frame.position.set(x, 1.7, wallD / 2 + 0.01);
    g.add(frame);
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.88, 0.05), glassMat);
    win.position.set(x, 1.7, wallD / 2 + 0.03);
    g.add(win);
  });

  return g;
}

/* ---------------- Car (scale reference under canopy) ---------------- */
function buildCar() {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xB7C4CC, roughness: 0.35, metalness: 0.35 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 3.6), bodyMat);
  body.position.set(5.6, 0.42, 0);
  body.castShadow = true;
  g.add(body);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.46, 1.7), bodyMat);
  cabin.position.set(5.6, 0.9, -0.2);
  cabin.castShadow = true;
  g.add(cabin);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1B1F26, roughness: 0.85 });
  const wheelGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.22, 16);
  [[-0.85, 1.15], [0.85, 1.15], [-0.85, -1.15], [0.85, -1.15]].forEach(([dx, dz]) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(5.6 + dx, 0.27, dz);
    wheel.castShadow = true;
    g.add(wheel);
  });
  return g;
}

/* ---------------- Canopy builders ---------------- */
const CANOPY_BACK_X = 3.05, CANOPY_FRONT_X = 8.25, CANOPY_HALF_Z = 2.3;

function canopyFlat(hex) {
  const g = new THREE.Group();
  const mat = metalMat(hex);
  const backY = 2.95, frontY = 2.6;

  const ledger = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, CANOPY_HALF_Z * 2), mat);
  ledger.position.set(CANOPY_BACK_X, backY, 0);
  ledger.castShadow = true;
  g.add(ledger);

  [-1, 1].forEach((s) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, frontY, 12), mat);
    pole.position.set(CANOPY_FRONT_X, frontY / 2, s * (CANOPY_HALF_Z - 0.15));
    pole.castShadow = true;
    g.add(pole);
  });

  const length = CANOPY_FRONT_X - CANOPY_BACK_X;
  const panel = new THREE.Mesh(new THREE.BoxGeometry(length, 0.06, CANOPY_HALF_Z * 2 - 0.1), panelMat);
  panel.position.set((CANOPY_BACK_X + CANOPY_FRONT_X) / 2, (backY + frontY) / 2, 0);
  panel.rotation.z = Math.atan2(backY - frontY, length);
  panel.receiveShadow = true;
  g.add(panel);

  return g;
}

function canopyArc(hex) {
  const g = new THREE.Group();
  const mat = metalMat(hex);
  const baseY = 2.6;

  function archPoints() {
    const pts = [];
    const segs = 16;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const x = CANOPY_BACK_X + t * (CANOPY_FRONT_X - CANOPY_BACK_X);
      const y = baseY + Math.sin(t * Math.PI) * 1.05;
      pts.push(new THREE.Vector3(x, y, 0));
    }
    return pts;
  }
  const curve = new THREE.CatmullRomCurve3(archPoints());
  const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.055, 8, false);

  [-1, 1].forEach((s) => {
    const rib = new THREE.Mesh(tubeGeo, mat);
    rib.position.z = s * CANOPY_HALF_Z;
    rib.castShadow = true;
    g.add(rib);
  });

  const pts = archPoints();
  const purlinCount = 6;
  for (let i = 0; i <= purlinCount; i++) {
    const t = i / purlinCount;
    const idx = Math.round(t * (pts.length - 1));
    const p = pts[idx];
    const purlin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, CANOPY_HALF_Z * 2, 8), mat);
    purlin.rotation.x = Math.PI / 2;
    purlin.position.set(p.x, p.y, 0);
    purlin.castShadow = true;
    g.add(purlin);
  }

  [-1, 1].forEach((s) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, baseY, 12), mat);
    pole.position.set(CANOPY_FRONT_X, baseY / 2, s * CANOPY_HALF_Z);
    pole.castShadow = true;
    g.add(pole);
  });

  return g;
}

function slopedPanel(x0, x1, yHigh, yLow, z0, z1) {
  // Explicit quad (2 triangles) from the ridge edge (z0 @ yHigh) to the eave edge (z1 @ yLow).
  // Built from raw vertex positions so the slope direction is always correct, regardless
  // of rotation-sign bookkeeping.
  const positions = new Float32Array([
    x0, yHigh, z0,   x1, yHigh, z0,   x1, yLow, z1,
    x0, yHigh, z0,   x1, yLow, z1,    x0, yLow, z1
  ]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, panelMat);
}

function canopyGable(hex) {
  const g = new THREE.Group();
  const mat = metalMat(hex);
  const eaveY = 2.5, ridgeY = 3.55;
  const midX = (CANOPY_BACK_X + CANOPY_FRONT_X) / 2;
  const length = CANOPY_FRONT_X - CANOPY_BACK_X;

  [[CANOPY_BACK_X, -1], [CANOPY_BACK_X, 1], [CANOPY_FRONT_X, -1], [CANOPY_FRONT_X, 1]].forEach(([x, s]) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, eaveY, 12), mat);
    pole.position.set(x, eaveY / 2, s * CANOPY_HALF_Z);
    pole.castShadow = true;
    g.add(pole);
  });

  const ridge = new THREE.Mesh(new THREE.BoxGeometry(length, 0.1, 0.1), mat);
  ridge.position.set(midX, ridgeY, 0);
  ridge.castShadow = true;
  g.add(ridge);

  [-1, 1].forEach((s) => {
    const panel = slopedPanel(CANOPY_BACK_X, CANOPY_FRONT_X, ridgeY, eaveY, 0, s * CANOPY_HALF_Z);
    panel.receiveShadow = true;
    g.add(panel);

    const fascia = new THREE.Mesh(new THREE.BoxGeometry(length, 0.08, 0.06), mat);
    fascia.position.set(midX, eaveY, s * CANOPY_HALF_Z);
    fascia.castShadow = true;
    g.add(fascia);
  });

  return g;
}

function canopyCantilever(hex) {
  const g = new THREE.Group();
  const mat = metalMat(hex);
  const roofY = 2.75;
  const backX = 3.4, frontX = 8.35;
  const midX = (backX + frontX) / 2;
  const postX = frontX - 1.7;

  [-1, 1].forEach((s) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, roofY, 0.14), mat);
    post.position.set(postX, roofY / 2, s * 0.55);
    post.castShadow = true;
    g.add(post);
  });

  const panel = new THREE.Mesh(new THREE.BoxGeometry(frontX - backX, 0.07, CANOPY_HALF_Z * 2 - 0.1), panelMat);
  panel.position.set(midX, roofY, 0);
  panel.receiveShadow = true;
  g.add(panel);

  const beam = new THREE.Mesh(new THREE.BoxGeometry(frontX - backX, 0.1, 0.1), mat);
  beam.position.set(midX, roofY - 0.07, CANOPY_HALF_Z - 0.05);
  beam.castShadow = true;
  g.add(beam);

  return g;
}

const CANOPY_BUILDERS = { flat: canopyFlat, arc: canopyArc, gable: canopyGable, cantilever: canopyCantilever };

/* ---------------- Fence builders ---------------- */
const FENCE_X_START = -6, FENCE_X_END = 8.4, FENCE_Z = 5.2, FENCE_H = 1.7;

function fenceVertical(hex) {
  const g = new THREE.Group();
  const mat = metalMat(hex);
  const width = FENCE_X_END - FENCE_X_START;
  const dummy = new THREE.Object3D();

  const postSpacing = 1.6;
  const postCount = Math.max(2, Math.round(width / postSpacing));
  const postMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.09, FENCE_H + 0.12, 0.09), mat, postCount + 1);
  for (let i = 0; i <= postCount; i++) {
    dummy.position.set(FENCE_X_START + i * (width / postCount), (FENCE_H + 0.12) / 2, FENCE_Z);
    dummy.updateMatrix();
    postMesh.setMatrixAt(i, dummy.matrix);
  }
  postMesh.castShadow = true;
  g.add(postMesh);

  [0.08, FENCE_H].forEach((y) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(width, 0.06, 0.06), mat);
    rail.position.set((FENCE_X_START + FENCE_X_END) / 2, y, FENCE_Z);
    rail.castShadow = true;
    g.add(rail);
  });

  const barSpacing = 0.16;
  const barCount = Math.floor(width / barSpacing);
  const barMesh = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.018, 0.018, FENCE_H - 0.14, 6), mat, barCount + 1);
  for (let i = 0; i <= barCount; i++) {
    dummy.position.set(FENCE_X_START + i * barSpacing, FENCE_H / 2 + 0.03, FENCE_Z);
    dummy.updateMatrix();
    barMesh.setMatrixAt(i, dummy.matrix);
  }
  g.add(barMesh);

  return g;
}

function fenceHorizontal(hex) {
  const g = new THREE.Group();
  const mat = metalMat(hex);
  const width = FENCE_X_END - FENCE_X_START;
  const dummy = new THREE.Object3D();

  const postSpacing = 2.0;
  const postCount = Math.max(2, Math.round(width / postSpacing));
  const postMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.1, FENCE_H + 0.12, 0.1), mat, postCount + 1);
  for (let i = 0; i <= postCount; i++) {
    dummy.position.set(FENCE_X_START + i * (width / postCount), (FENCE_H + 0.12) / 2, FENCE_Z);
    dummy.updateMatrix();
    postMesh.setMatrixAt(i, dummy.matrix);
  }
  postMesh.castShadow = true;
  g.add(postMesh);

  const slatH = 0.11, slatGap = 0.06;
  const slatCount = Math.floor(FENCE_H / (slatH + slatGap));
  const slatMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(width - 0.1, slatH, 0.05), mat, slatCount);
  for (let i = 0; i < slatCount; i++) {
    const y = 0.16 + i * (slatH + slatGap);
    dummy.position.set((FENCE_X_START + FENCE_X_END) / 2, y, FENCE_Z);
    dummy.updateMatrix();
    slatMesh.setMatrixAt(i, dummy.matrix);
  }
  slatMesh.castShadow = true;
  g.add(slatMesh);

  return g;
}

function fenceSolid(hex) {
  const g = new THREE.Group();
  const mat = metalMat(hex);
  const width = FENCE_X_END - FENCE_X_START;
  const cx = (FENCE_X_START + FENCE_X_END) / 2;

  const panel = new THREE.Mesh(new THREE.BoxGeometry(width, FENCE_H, 0.08), mat);
  panel.position.set(cx, FENCE_H / 2, FENCE_Z);
  panel.castShadow = true;
  panel.receiveShadow = true;
  g.add(panel);

  [0.42, 0.78, 1.14, 1.5].forEach((y) => {
    const groove = new THREE.Mesh(new THREE.BoxGeometry(width, 0.015, 0.09), grooveMat);
    groove.position.set(cx, y, FENCE_Z);
    g.add(groove);
  });

  const dummy = new THREE.Object3D();
  const postCount = 6;
  const postMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.11, FENCE_H + 0.1, 0.11), mat, postCount + 1);
  for (let i = 0; i <= postCount; i++) {
    dummy.position.set(FENCE_X_START + i * (width / postCount), (FENCE_H + 0.1) / 2, FENCE_Z);
    dummy.updateMatrix();
    postMesh.setMatrixAt(i, dummy.matrix);
  }
  postMesh.castShadow = true;
  g.add(postMesh);

  return g;
}

function fenceLattice(hex) {
  const g = new THREE.Group();
  const mat = metalMat(hex);
  const width = FENCE_X_END - FENCE_X_START;
  const dummy = new THREE.Object3D();

  const postSpacing = 1.6;
  const postCount = Math.max(2, Math.round(width / postSpacing));
  const postMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.1, FENCE_H + 0.12, 0.1), mat, postCount + 1);
  for (let i = 0; i <= postCount; i++) {
    dummy.position.set(FENCE_X_START + i * (width / postCount), (FENCE_H + 0.12) / 2, FENCE_Z);
    dummy.updateMatrix();
    postMesh.setMatrixAt(i, dummy.matrix);
  }
  postMesh.castShadow = true;
  g.add(postMesh);

  [0.06, FENCE_H].forEach((y) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(width, 0.06, 0.06), mat);
    rail.position.set((FENCE_X_START + FENCE_X_END) / 2, y, FENCE_Z);
    g.add(rail);
  });

  const cellW = 0.5;
  const cellCount = Math.floor(width / cellW);
  const diagLen = Math.hypot(cellW, FENCE_H) * 1.02;
  const angle = Math.atan2(FENCE_H, cellW);
  const diagMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(diagLen, 0.03, 0.03), mat, cellCount * 2);
  let idx = 0;
  for (let i = 0; i < cellCount; i++) {
    const cx = FENCE_X_START + i * cellW + cellW / 2;
    dummy.position.set(cx, FENCE_H / 2, FENCE_Z);
    dummy.rotation.set(0, 0, angle);
    dummy.updateMatrix();
    diagMesh.setMatrixAt(idx++, dummy.matrix);
    dummy.rotation.set(0, 0, -angle);
    dummy.updateMatrix();
    diagMesh.setMatrixAt(idx++, dummy.matrix);
  }
  g.add(diagMesh);

  return g;
}

const FENCE_BUILDERS = { vertical: fenceVertical, horizontal: fenceHorizontal, solid: fenceSolid, lattice: fenceLattice };

/* ---------------- Scene assembly ---------------- */
scene.add(buildGround());
scene.add(buildHouse());
scene.add(buildCar());

let canopyGroup = null;
let fenceGroup = null;

function currentColorHex() {
  return (COLORS.find((c) => c.id === state.color) || COLORS[0]).hex;
}

function refreshCanopy() {
  if (canopyGroup) scene.remove(canopyGroup);
  canopyGroup = CANOPY_BUILDERS[state.canopy](currentColorHex());
  scene.add(canopyGroup);
}
function refreshFence() {
  if (fenceGroup) scene.remove(fenceGroup);
  fenceGroup = FENCE_BUILDERS[state.fence](currentColorHex());
  scene.add(fenceGroup);
}
refreshCanopy();
refreshFence();

/* ---------------- Resize ---------------- */
function resize() {
  const w = viewerEl.clientWidth, h = viewerEl.clientHeight;
  if (!w || !h) return;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', resize);
resize();

/* ---------------- Animation loop ---------------- */
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

requestAnimationFrame(() => requestAnimationFrame(() => {
  loadingEl.style.opacity = '0';
  setTimeout(() => { loadingEl.style.display = 'none'; }, 300);
}));

/* ---------------- Viewer controls ---------------- */
function dolly(factor) {
  const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
  const newLen = THREE.MathUtils.clamp(dir.length() * factor, controls.minDistance, controls.maxDistance);
  dir.setLength(newLen);
  camera.position.copy(controls.target).add(dir);
  controls.update();
}
btnZoomIn.addEventListener('click', () => dolly(0.82));
btnZoomOut.addEventListener('click', () => dolly(1.22));
btnReset.addEventListener('click', () => {
  camera.position.copy(initialCamPos);
  controls.target.copy(initialTarget);
  controls.update();
});

/* ---------------- UI: panels ---------------- */
function iconSvg(d) {
  return `<svg viewBox="0 0 48 30" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
}

function renderStyleGrid(container, items, key) {
  container.innerHTML = items.map((item) => `
    <button class="sim-style-card${state[key] === item.id ? ' active' : ''}" data-key="${key}" data-id="${item.id}" type="button">
      <span class="chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
      <span class="icn">${iconSvg(item.icon)}</span>
      <span>${item.label}</span>
    </button>`).join('');
}
renderStyleGrid(canopyGrid, CANOPY_TYPES, 'canopy');
renderStyleGrid(fenceGrid, FENCE_TYPES, 'fence');

function onStyleCardClick(e) {
  const btn = e.target.closest('.sim-style-card');
  if (!btn) return;
  const key = btn.dataset.key;
  const id = btn.dataset.id;
  if (state[key] === id) return;
  state[key] = id;
  btn.parentElement.querySelectorAll('.sim-style-card').forEach((c) => c.classList.remove('active'));
  btn.classList.add('active');
  if (key === 'canopy') refreshCanopy();
  else refreshFence();
}
canopyGrid.addEventListener('click', onStyleCardClick);
fenceGrid.addEventListener('click', onStyleCardClick);

/* ---------------- UI: color swatches ---------------- */
colorRow.innerHTML = COLORS.map((c) => `
  <button class="sim-color-swatch${state.color === c.id ? ' active' : ''}" data-id="${c.id}" type="button"
    style="background:#${c.hex.toString(16).padStart(6, '0')};" aria-label="${c.label}" title="${c.label}"></button>`).join('');
colorRow.addEventListener('click', (e) => {
  const btn = e.target.closest('.sim-color-swatch');
  if (!btn) return;
  state.color = btn.dataset.id;
  colorRow.querySelectorAll('.sim-color-swatch').forEach((c) => c.classList.remove('active'));
  btn.classList.add('active');
  refreshCanopy();
  refreshFence();
});

/* ---------------- UI: tabs ---------------- */
tabButtons.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabButtons.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    const isCanopy = tab.dataset.tab === 'canopy';
    panelCanopy.style.display = isCanopy ? '' : 'none';
    panelFence.style.display = isCanopy ? 'none' : '';
  });
});
