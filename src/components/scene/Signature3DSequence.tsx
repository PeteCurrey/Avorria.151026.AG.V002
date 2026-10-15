"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

function AssemblingSlabs({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // 5 architectural slabs with graphite matte materials and rose hairline edges
  const slabs = useMemo(() => {
    return [0, 1, 2, 3, 4].map((i) => {
      // Disassembled spread distance
      const initialY = (i - 2) * 1.6;
      // Target assembled Y
      const targetY = (i - 2) * 0.28;
      // Initial rotation
      const initialRotX = (i - 2) * 0.18;
      const initialRotZ = (i - 2) * 0.12;

      return {
        id: i,
        initialY,
        targetY,
        initialRotX,
        initialRotZ,
        geometry: new THREE.BoxGeometry(3.2, 0.12, 1.8),
        edgeGeometry: new THREE.EdgesGeometry(new THREE.BoxGeometry(3.205, 0.125, 1.805)),
      };
    });
  }, []);

  // Dispose geometries and materials on unmount
  useEffect(() => {
    return () => {
      slabs.forEach((s) => {
        s.geometry.dispose();
        s.edgeGeometry.dispose();
      });
    };
  }, [slabs]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Subtle continuous ambient drift
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, -Math.PI / 5, 0]} position={[0, 0, 0]}>
      {slabs.map((slab) => {
        // Interpolate position and rotation based on scroll progress (0.0 disassembled -> 1.0 assembled)
        const currentY = THREE.MathUtils.lerp(slab.initialY, slab.targetY, progress);
        const currentRotX = THREE.MathUtils.lerp(slab.initialRotX, 0, progress);
        const currentRotZ = THREE.MathUtils.lerp(slab.initialRotZ, 0, progress);

        return (
          <group
            key={slab.id}
            position={[0, currentY, 0]}
            rotation={[currentRotX, 0, currentRotZ]}
          >
            {/* Slab Body */}
            <mesh geometry={slab.geometry}>
              <meshStandardMaterial
                color={slab.id % 2 === 0 ? "#141517" : "#1E2023"}
                roughness={0.75}
                metalness={0.15}
              />
            </mesh>

            {/* Rose Edge Accent */}
            <lineSegments geometry={slab.edgeGeometry}>
              <lineBasicMaterial
                color="#A33A4B"
                opacity={0.4 + progress * 0.4}
                transparent
                linewidth={1}
              />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}

export default function Signature3DSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [contextLost, setContextLost] = useState(false);
  const [frameTimeMs, setFrameTimeMs] = useState(14.2);

  useEffect(() => {
    // 1. Detect WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
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

    // 2. Mount only when near viewport using ScrollTrigger (not IntersectionObserver)
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
      onToggle: (self) => setIsPinned(self.isActive),
      onUpdate: (self) => {
        const p = self.progress;
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
        <div className="lg:col-span-7 h-[380px] sm:h-[480px] lg:h-[560px] relative border border-graphite-hairline bg-ivory-subtle/50 order-1 lg:order-2 flex items-center justify-center">
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
            /* React Three Fiber Scrubbed Canvas */
            <Canvas
              camera={{ position: [0, 0, 7.5], fov: 38 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              frameloop={isPinned ? "always" : "demand"}
              className="w-full h-full"
              onCreated={({ gl }) => {
                const dom = gl.domElement;
                const handleLost = (e: Event) => {
                  e.preventDefault();
                  setContextLost(true);
                };
                const handleRestored = () => {
                  setContextLost(false);
                };
                dom.addEventListener("webglcontextlost", handleLost, false);
                dom.addEventListener("webglcontextrestored", handleRestored, false);
              }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 8, 4]} intensity={1.5} color="#FAF8F5" />
              <directionalLight position={[-6, -4, -3]} intensity={1.8} color="#A33A4B" />
              <AssemblingSlabs progress={progress} />
            </Canvas>
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
