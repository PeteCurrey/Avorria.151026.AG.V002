"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MonolithStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Architectural Monolith */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 3.2, 0.4]} />
        <meshStandardMaterial
          color="#16181A"
          roughness={0.7}
          metalness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Hairline Edge Accent */}
      <lineSegments ref={wireframeRef} position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.802, 3.202, 0.402)]} />
        <lineBasicMaterial color="#A33A4B" linewidth={1} opacity={0.65} transparent />
      </lineSegments>

      {/* Outer Restrained Coordinate Ring */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[0, -0.2, 0]}>
        <ringGeometry args={[2.5, 2.508, 64]} />
        <meshBasicMaterial color="#141517" opacity={0.2} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Secondary Orbiting Hairline Datum */}
      <mesh rotation={[Math.PI / 1.8, Math.PI / 6, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[3.2, 3.205, 64]} />
        <meshBasicMaterial color="#A33A4B" opacity={0.15} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function ArchitecturalMonolithScene() {
  return (
    <div
      className="w-full h-full relative"
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full pointer-events-none"
      >
        <ambientLight intensity={0.8} />
        {/* Soft Ivory Directional Fill */}
        <directionalLight position={[4, 8, 4]} intensity={1.4} color="#FAF8F5" />
        {/* Single Rose Accent Rim Light */}
        <directionalLight position={[-5, -2, -3]} intensity={1.8} color="#A33A4B" />
        <MonolithStructure />
      </Canvas>
    </div>
  );
}
