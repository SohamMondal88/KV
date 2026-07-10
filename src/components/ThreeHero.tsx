"use client";

import React, { Suspense, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function MountainPeak({ position, scale, color }: { position: [number, number, number]; scale: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
      <coneGeometry args={[1, 2, 6]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20 + 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      if (posArray[i * 3 + 1] > 15) {
        posArray[i * 3 + 1] = -5;
        posArray[i * 3] = (Math.random() - 0.5) * 40;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
        <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const mountains = useMemo(() => {
    const peaks: { position: [number, number, number]; scale: [number, number, number]; color: string }[] = [
      { position: [-6, -2, -5], scale: [3, 4, 3], color: "#0B5D3B" },
      { position: [-3, -1.5, -8], scale: [2.5, 5, 2.5], color: "#14532D" },
      { position: [0, -1, -6], scale: [4, 6, 4], color: "#1a3a2a" },
      { position: [3, -1.5, -7], scale: [3, 4.5, 3], color: "#0B5D3B" },
      { position: [6, -2, -4], scale: [2, 3, 2], color: "#14532D" },
      { position: [-4.5, -1, -3], scale: [1.5, 2.5, 1.5], color: "#1a3a2a" },
      { position: [4.5, -1, -3], scale: [1.8, 2.8, 1.8], color: "#0B5D3B" },
      { position: [-1.5, -0.5, -9], scale: [2, 3.5, 2], color: "#14532D" },
      { position: [1.5, -0.5, -10], scale: [2.5, 4, 2.5], color: "#1a3a2a" },
    ];
    return peaks;
  }, []);

  return (
    <group ref={groupRef}>
      {mountains.map((m, i) => (
        <MountainPeak key={i} position={m.position} scale={m.scale} color={m.color} />
      ))}
      <FloatingParticles />
      <Stars radius={50} depth={50} count={1500} factor={3} saturation={0} fade speed={1} />
    </group>
  );
}

function ThreeHeroInner() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 3, 12], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          color="#FFD699"
          castShadow
        />
        <fog attach="fog" args={["#0f1f18", 15, 35]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export const ThreeHero = dynamic(() => Promise.resolve(ThreeHeroInner), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-b from-primary/20 to-transparent" />,
});
