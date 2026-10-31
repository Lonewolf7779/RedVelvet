"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type * as THREE from "three";

function ArchitecturalSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1.8, 0]} />
      <meshStandardMaterial
        color="#721B29"
        wireframe={true}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="relative h-72 w-full max-w-md mx-auto sm:h-96">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <ArchitecturalSculpture />
      </Canvas>
    </div>
  );
}
