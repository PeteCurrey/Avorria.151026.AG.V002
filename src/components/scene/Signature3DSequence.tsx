"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SLABS_DATA = [
  { id: "foundation", label: "01. Foundation", caption: "Decoupled edge architecture & sub-2.0s LCP guarantee." },
  { id: "framework", label: "02. Framework", caption: "React 19 Server Components with zero hydration overhead." },
  { id: "design", label: "03. Design System", caption: "Restrained Work Sans typography and architectural hairlines." },
  { id: "ai", label: "04. Deterministic AI", caption: "Schema-validated multi-agent state machines with zero hallucination." },
  { id: "deployment", label: "05. Global Deployment", caption: "Immutable edge caching, automated CI gates, and strict WCAG 2.2 AA." },
];

export default function Signature3DSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [contextLost, setContextLost] = useState(false);
  const [frameTimeMs, setFrameTimeMs] = useState(14.2);

  // Keep a ref to progress so RAF loop and resize always have latest
  const progressRef = useRef(0);

  useEffect(() => {
    // 1. Detect WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl2") ||
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced || !containerRef.current) return;

    const element = containerRef.current;

    // 2. Mount only when near viewport using ScrollTrigger
    const mountTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 120%",
      end: "bottom -20%",
      onEnter: () => setIsNearViewport(true),
      onEnterBack: () => setIsNearViewport(true),
    });

    // 3. Pinned scrub sequence
    const pinTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "+=250%",
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;
        setProgress(p);

        // Derive active layer index (0 to 4)
        const step = Math.min(4, Math.floor(p * 5));
        setActiveStep(step);
      },
    });

    return () => {
      mountTrigger.kill();
      pinTrigger.kill();
    };
  }, []);

  // Pure Three.js lifecycle: runs when near viewport and canvas is mounted
  useEffect(() => {
    if (!isNearViewport || isReducedMotion || !hasWebGL || contextLost || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    let width = parent.clientWidth || 600;
    let height = parent.clientHeight || 450;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
    } catch {
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const dirLight1 = new THREE.DirectionalLight(0xfaf8f5, 1.5);
    dirLight1.position.set(5, 8, 4);
    const dirLight2 = new THREE.DirectionalLight(0xa33a4b, 1.8);
    dirLight2.position.set(-6, -4, -3);
    scene.add(ambientLight, dirLight1, dirLight2);

    // Root Group
    const rootGroup = new THREE.Group();
    rootGroup.rotation.set(Math.PI / 6, -Math.PI / 5, 0);
    scene.add(rootGroup);

    // 5 Architectural Slabs
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    const slabBoxes = [0, 1, 2, 3, 4].map((i) => {
      const initialY = (i - 2) * 1.6;
      const targetY = (i - 2) * 0.28;
      const initialRotX = (i - 2) * 0.18;
      const initialRotZ = (i - 2) * 0.12;

      const slabGroup = new THREE.Group();
      slabGroup.position.set(0, initialY, 0);
      slabGroup.rotation.set(initialRotX, 0, initialRotZ);

      // Box body
      const boxGeo = new THREE.BoxGeometry(3.2, 0.12, 1.8);
      geometriesToDispose.push(boxGeo);
      const boxMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x141517 : 0x1e2023,
        roughness: 0.75,
        metalness: 0.15,
      });
      materialsToDispose.push(boxMat);
      const mesh = new THREE.Mesh(boxGeo, boxMat);
      slabGroup.add(mesh);

      // Rose hairline edge
      const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.205, 0.125, 1.805));
      geometriesToDispose.push(edgeGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0xa33a4b,
        opacity: 0.4,
        transparent: true,
        linewidth: 1,
      });
      materialsToDispose.push(edgeMat);
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      slabGroup.add(edges);

      rootGroup.add(slabGroup);

      return {
        slabGroup,
        edgeMat,
        initialY,
        targetY,
        initialRotX,
        initialRotZ,
      };
    });

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        if (cr.width > 0 && cr.height > 0) {
          width = cr.width;
          height = cr.height;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer?.setSize(width, height, false);
        }
      }
    });
    resizeObserver.observe(parent);

    // WebGL context loss listeners
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const handleContextRestored = () => {
      setContextLost(false);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

    // RAF Loop
    let animId: number;
    let lastTime = performance.now();
    let frameCounter = 0;
    let frameAcc = 0;

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const delta = (now - lastTime) / 1000;
      const frameDelta = now - lastTime;
      lastTime = now;

      // Track frame time budget
      frameCounter++;
      frameAcc += frameDelta;
      if (frameCounter >= 30) {
        setFrameTimeMs(parseFloat((frameAcc / frameCounter).toFixed(1)));
        frameCounter = 0;
        frameAcc = 0;
      }

      // Continuous subtle ambient drift
      rootGroup.rotation.y += delta * 0.05;

      // Update slab positions based on current scrub progress
      const p = progressRef.current;
      slabBoxes.forEach((slab) => {
        slab.slabGroup.position.y = THREE.MathUtils.lerp(slab.initialY, slab.targetY, p);
        slab.slabGroup.rotation.x = THREE.MathUtils.lerp(slab.initialRotX, 0, p);
        slab.slabGroup.rotation.z = THREE.MathUtils.lerp(slab.initialRotZ, 0, p);
        slab.edgeMat.opacity = 0.4 + p * 0.4;
      });

      renderer?.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer?.dispose();
    };
  }, [isNearViewport, isReducedMotion, hasWebGL, contextLost]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-ivory text-graphite flex flex-col justify-between overflow-hidden hairline-t hairline-b"
      aria-label="Signature 3D Sequence: Architectural Layers"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 flex items-center justify-between z-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-rose block mb-1">
            02 / Signature 3D Sequence
          </span>
          <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
            The Performance Architecture
          </h2>
        </div>
        <span className="text-xs font-mono text-graphite-muted hidden sm:inline">
          Assemble &middot; 5 Structural Layers
        </span>
      </div>

      {/* Center Visualizer & Synced Captions */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 py-8">
        {/* Captions Stepper */}
        <div className="lg:col-span-5 space-y-6 z-10 order-2 lg:order-1">
          <div className="space-y-4">
            {SLABS_DATA.map((slab, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={slab.id}
                  className={`p-4 border transition-all duration-300 ${
                    isActive
                      ? "border-graphite bg-ivory-subtle translate-x-2"
                      : "border-graphite-hairline/60 opacity-40"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className={isActive ? "text-rose" : "text-graphite-muted"}>
                      {slab.label}
                    </span>
                    {isActive && <span className="text-[10px] uppercase tracking-wider text-rose">Active Layer</span>}
                  </div>
                  <p className="text-xs text-graphite font-light leading-relaxed">
                    {slab.caption}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-graphite-muted">
            <span>Scrub progress: {Math.round(progress * 100)}%</span>
            <span className="text-rose">Frame budget: {frameTimeMs}ms (&lt; 16.6ms)</span>
          </div>
        </div>

        {/* 3D Scene / Fallback Poster Viewport */}
        <div className="lg:col-span-7 h-[380px] sm:h-[480px] lg:h-[560px] relative border border-graphite-hairline bg-ivory-subtle/50 order-1 lg:order-2 flex items-center justify-center overflow-hidden">
          {isReducedMotion || !isNearViewport || !hasWebGL || contextLost ? (
            /* Static Pre-rendered Poster Fallback for Reduced Motion / Initial Mount / WebGL Loss */
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-56 h-40 border border-graphite-hairline relative flex flex-col justify-around p-3 bg-ivory">
                <div className="w-full h-2 bg-graphite" />
                <div className="w-full h-2 bg-graphite-surface" />
                <div className="w-full h-2 bg-rose/40" />
                <div className="w-full h-2 bg-graphite" />
                <div className="w-full h-2 bg-graphite-surface" />
              </div>
              <span className="font-mono text-xs text-graphite-muted">
                {contextLost
                  ? "WebGL Context Interrupted &middot; Recovering..."
                  : !hasWebGL
                  ? "Hardware Acceleration Unavailable &middot; Architectural Poster"
                  : "Static Architectural Projection &middot; Standby Mode"}
              </span>
            </div>
          ) : (
            /* Pure Three.js Canvas */
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
              aria-label="3D Interactive Slabs Model"
            />
          )}
        </div>
      </div>

      {/* Bottom Architectural Rule */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 flex items-center justify-between text-[11px] font-mono text-graphite-muted z-10">
        <span>FRAME-LOCKED SCROLLTRIGGER SCRUB</span>
        <span>AVORRIA SPATIAL DATUM</span>
      </div>
    </section>
  );
}
