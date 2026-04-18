import { Question } from "@/data/db";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Environment } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

interface WaterCubeRendererProps {
  question: Question;
}

function Scene({ dims, level }: { dims: [number, number, number], level: number }) {
  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    transmission: 1,
    opacity: 1,
    metalness: 0,
    roughness: 0.1,
    ior: 1.5,
    thickness: 0.2,
    color: '#E0F7FA'
  }), []);

  const waterMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    transmission: 0.9,
    opacity: 0.9,
    roughness: 0.2,
    ior: 1.33,
    color: '#4A90E2',
    depthWrite: false
  }), []);

  // Compute water dimensions and position relative to the container
  const w = dims[0] - 0.2;
  const d = dims[2] - 0.2;
  const maxH = dims[1] - 0.2;
  const waterH = maxH * level;
  const waterYOffset = (waterH - maxH) / 2;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <Environment preset="city" />
      
      <group position={[0, -dims[1]/2, 0]}>
        {/* Glass container */}
        <Box args={dims} position={[0, dims[1]/2, 0]} material={glassMaterial} />
        {/* Water inside */}
        {level > 0 && (
          <Box 
            args={[w, waterH, d]} 
            position={[0, dims[1]/2 + waterYOffset, 0]} 
            material={waterMaterial} 
          />
        )}
      </group>
      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
    </>
  );
}

export default function WaterCubeRenderer({ question }: WaterCubeRendererProps) {
  const dimensions = question.sceneProps?.dimensions || [2.4, 3.6, 2.4];
  const level = question.sceneProps?.level || 0.5;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [4, 4, 6], fov: 50 }}>
          <Scene dims={dimensions} level={level} />
        </Canvas>
        <div className="absolute top-4 left-4 right-4 text-center pointer-events-none z-10">
          <p className="text-white text-sm font-bold bg-[#4A90E2]/80 inline-block px-4 py-2 rounded-xl shadow-md border border-white/40">
            内部水位: {Math.round(level * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}
