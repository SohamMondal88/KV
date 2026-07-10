"use client";

import React, { Suspense, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingMountain() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <coneGeometry args={[1.2, 2.5, 7]} />
      <meshStandardMaterial color="#0B5D3B" flatShading />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() => {
    const pos = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4 + 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  return (
    <group>
      <RotatingMountain />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
      </points>
    </group>
  );
}

function MountainSceneInner() {
  return (
    <div className="w-full" style={{ height: 200 }}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 3]} intensity={1} color="#FFD699" />
        <fog attach="fog" args={["#0f1f18", 6, 12]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export const MountainScene = dynamic(() => Promise.resolve(MountainSceneInner), {
  ssr: false,
  loading: () => <div className="h-[200px] w-full animate-pulse rounded-xl bg-muted" />,
});
