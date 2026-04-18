import { Question } from "@/data/db";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Environment, Plane } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface RotateRendererProps {
  question: Question;
}

function Scene({ angle }: { angle: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const targetAngle = angle * (Math.PI / 180);
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = (Math.sin(t) * 0.5 + 0.5) * targetAngle; 
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <Environment preset="city" />
      
      {/* Grid Floor */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <meshStandardMaterial color="#E0F7FA" />
      </Plane>
      <gridHelper args={[10, 10, "#A0D8EF", "#ffffff"]} position={[0, -0.49, 0]} />

      {/* Rotating Shape (L-Shape constructed from two boxes) */}
      <group ref={group}>
        <Box args={[1, 1, 1]} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial color="#FFD700" />
        </Box>
        <Box args={[1, 1, 1]} position={[1, 0, 0]} castShadow>
          <meshStandardMaterial color="#FFD700" />
        </Box>
        <Box args={[1, 1, 1]} position={[0, 1, 0]} castShadow>
          <meshStandardMaterial color="#FFD700" />
        </Box>
      </group>
      
      <OrbitControls enableZoom={true} maxPolarAngle={Math.PI/2 - 0.1} />
    </>
  );
}

export default function RotateRenderer({ question }: RotateRendererProps) {
  const angle = question.sceneProps?.angle || 90;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [4, 5, 6], fov: 45 }}>
          <Scene angle={angle} />
        </Canvas>
        <div className="absolute top-4 left-4 right-4 text-center pointer-events-none z-10">
          <p className="text-[#2C3E50] text-sm font-bold bg-[#FFD700]/90 inline-block px-4 py-2 rounded-xl shadow-md border border-white/40">
            自动旋转动画 ( {angle}° )
          </p>
        </div>
      </div>
    </div>
  );
}
