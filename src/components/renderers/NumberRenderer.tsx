import { Question } from "@/data/db";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface NumberRendererProps {
  question: Question;
}

function FloatingNumber({ text, position, color, delay = 0 }: { text: string, position: [number, number, number], color: string, delay?: number }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime() + delay;
    group.current.position.y = position[1] + Math.sin(t * 2) * 0.2;
    group.current.rotation.y = Math.sin(t * 1.5) * 0.1;
  });

  return (
    <group ref={group} position={position}>
      <Text
        fontSize={1.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#ffffff"
        castShadow
      >
        {text}
      </Text>
    </group>
  );
}

function Scene({ numbers, emphasize }: { numbers: (number | string)[], emphasize?: string }) {
  const getZIndex = (index: number, total: number) => {
    return Math.sin((index / total) * Math.PI) * 2;
  };

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 10, 5]} intensity={1.5} />
      <Environment preset="night" />
      <Center>
        <group>
          {numbers.map((num, i) => {
            const isEmphasized = emphasize && String(num) === String(emphasize);
            const x = (i - (numbers.length - 1) / 2) * 2.5;
            const z = (numbers.length > 2) ? getZIndex(i, numbers.length) : 0;
            return (
              <FloatingNumber 
                key={i} 
                text={String(num)} 
                position={[x, 0, z]} 
                color={isEmphasized ? "#FF5252" : "#4A90E2"}
                delay={i * 0.5}
              />
            );
          })}
        </group>
      </Center>
    </>
  );
}

export default function NumberRenderer({ question }: NumberRendererProps) {
  const numbers = question.sceneProps?.numbers || [2, 3, 6];
  const emphasize = question.sceneProps?.emphasize;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1A2980] to-[#26D0CE]">
      <div className="w-full h-full relative">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene numbers={numbers} emphasize={emphasize} />
        </Canvas>
        <div className="absolute top-4 left-4 right-4 text-center pointer-events-none z-10">
          <p className="text-white text-sm font-bold bg-black/30 backdrop-blur-sm inline-block px-4 py-2 rounded-xl shadow-md border border-white/20">
            数字密码阵列
          </p>
        </div>
      </div>
    </div>
  );
}
