import { Question } from "@/data/db";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Environment } from "@react-three/drei";

interface CubeRendererProps {
  question: Question;
}

function Scene({ cubes }: { cubes: [number, number, number][] }) {
  const colors = ["#4ade80", "#facc15", "#60a5fa", "#f472b6", "#a78bfa"];
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <group position={[0, -0.5, 0]}>
        {cubes.map((pos, i) => (
          <Box key={i} position={pos} args={[1, 1, 1]} castShadow receiveShadow>
            <meshStandardMaterial color={colors[i % colors.length]} />
            <lineSegments>
              <edgesGeometry attach="geometry" args={[new Box().geometry]} />
              <lineBasicMaterial attach="material" color="black" linewidth={2} />
            </lineSegments>
          </Box>
        ))}
      </group>
      <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={true} />
    </>
  );
}

export default function CubeRenderer({ question }: CubeRendererProps) {
  // Default arrangement if not provided
  const cubes = question.sceneProps?.cubes || [
    [-1.1, 0.5, 0], [0, 0.5, 0], [0, 1.6, 0], [1.1, 0.5, 0]
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [4, 4, 6], fov: 40 }}>
          <Scene cubes={cubes} />
        </Canvas>
        <div className="absolute top-4 left-4 right-4 text-center pointer-events-none">
          <p className="text-white/80 text-sm font-bold bg-[#2C3E50]/60 inline-block px-3 py-1 rounded-full shadow-md border border-white/20">
            可以拖拽或缩放视角观察方块结构哦！
          </p>
        </div>
      </div>
    </div>
  );
}
