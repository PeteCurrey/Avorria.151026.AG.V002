"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ArchitecturalMonolithScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = parent.clientWidth || 400;
    let height = parent.clientHeight || 400;

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
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const dirLight1 = new THREE.DirectionalLight(0xfaf8f5, 1.4);
    dirLight1.position.set(4, 8, 4);
    const dirLight2 = new THREE.DirectionalLight(0xa33a4b, 1.8);
    dirLight2.position.set(-5, -2, -3);
    scene.add(ambientLight, dirLight1, dirLight2);

    const group = new THREE.Group();
    scene.add(group);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // Central Monolith
    const boxGeo = new THREE.BoxGeometry(1.8, 3.2, 0.4);
    geometries.push(boxGeo);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x16181a,
      roughness: 0.7,
      metalness: 0.2,
    });
    materials.push(boxMat);
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    group.add(boxMesh);

    // Hairline Edge Accent
    const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.802, 3.202, 0.402));
    geometries.push(edgeGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xa33a4b,
      linewidth: 1,
      opacity: 0.65,
      transparent: true,
    });
    materials.push(edgeMat);
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    group.add(edges);

    // Outer Ring
    const ringGeo1 = new THREE.RingGeometry(2.5, 2.508, 64);
    geometries.push(ringGeo1);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x141517,
      opacity: 0.2,
      transparent: true,
      side: THREE.DoubleSide,
    });
    materials.push(ringMat1);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.2;
    ringMesh1.position.y = -0.2;
    group.add(ringMesh1);

    // Secondary Orbiting Hairline
    const ringGeo2 = new THREE.RingGeometry(3.2, 3.205, 64);
    geometries.push(ringGeo2);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa33a4b,
      opacity: 0.15,
      transparent: true,
      side: THREE.DoubleSide,
    });
    materials.push(ringMat2);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 1.8;
    ringMesh2.rotation.y = Math.PI / 6;
    group.add(ringMesh2);

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

    // RAF Loop
    let animId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      elapsed += delta;

      group.rotation.y += delta * 0.12;
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.08;

      renderer?.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      className="w-full h-full relative"
      aria-hidden="true"
      role="presentation"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none block"
      />
    </div>
  );
}
