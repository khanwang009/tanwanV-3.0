import { Question } from "@/data/db";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Environment, Edges } from "@react-three/drei";

interface CubeMeshRendererProps {
  question: Question;
}

function Scene({ dims }: { dims: [number, number, number] }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <Environment preset="city" />
      <group>
        <Box args={dims} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color="#FFD54F" 
            metalness={0.1}
            roughness={0.4}
            clearcoat={0.3}
          />
          <Edges scale={1.01} threshold={15} color="#F57F17" />
        </Box>
      </group>
      <OrbitControls autoRotate autoRotateSpeed={1.5} enableZoom={true} />
    </>
  );
}

export default function CubeMeshRenderer({ question }: CubeMeshRendererProps) {
  const dimensions = question.sceneProps?.dimensions || [3, 2, 2.5];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [5, 4, 6], fov: 45 }}>
          <Scene dims={dimensions} />
        </Canvas>
        <div className="absolute top-4 left-4 right-4 text-center pointer-events-none z-10">
          <div className="bg-[#2C3E50]/70 backdrop-blur-md inline-block px-4 py-2 rounded-xl border-2 border-white/30 shadow-lg text-white">
            <span className="font-bold block text-sm opacity-90">长方体模型</span>
            <span className="font-mono text-lg text-[#FFD700]">
              {dimensions[0]} × {dimensions[1]} × {dimensions[2]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
