import { Question } from "@/data/db";
import { motion } from "framer-motion";

interface ChartRendererProps {
  question: Question;
}

export default function ChartRenderer({ question }: ChartRendererProps) {
  // points data expected as an array of Y values from 0 to 100
  const yValues = question.sceneProps?.points || [30, 80, 50, 90, 60];
  
  // Transform Y values into coordinates mapping 0-100 to SVG height 160-40 (inverted)
  const width = 340;
  const height = 200;
  const xSpacing = 280 / Math.max(1, (yValues.length - 1));
  const xStart = 30;

  const points = yValues.map((val: number, i: number) => ({
    x: xStart + i * xSpacing,
    y: 160 - (val / 100) * 120
  }));

  const pathD = `M ${points.map((p: any) => `${p.x},${p.y}`).join(" L ")}`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#E0F7FA]/50 rounded-[32px]">
      <div className="relative w-[340px] h-[200px] border-l-4 border-b-4 border-[#2C3E50]">
        
        {/* Y Axis Labels */}
        <div className="absolute -left-8 top-[30px] text-xs font-bold text-[#2C3E50]/70">100</div>
        <div className="absolute -left-6 top-[90px] text-xs font-bold text-[#2C3E50]/70">50</div>
        <div className="absolute -left-4 top-[150px] text-xs font-bold text-[#2C3E50]/70">0</div>

        <svg width="100%" height="100%" viewBox="0 0 340 200" className="absolute top-0 left-0">
          {/* Grid lines */}
          {[40, 100, 160].map(y => (
            <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="#4A90E2" strokeOpacity={0.2} strokeDasharray="4 4" strokeWidth={2} />
          ))}
          
          {/* The Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={pathD}
            fill="none"
            stroke="#FFD700"
            strokeWidth="6"
            className="drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
          />
          
          {/* The Points */}
          {points.map((p: any, i: number) => (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.1, type: "spring" }}
              cx={p.x}
              cy={p.y}
              r="8"
              fill="#FFFFFF"
              stroke="#FFD700"
              strokeWidth="4"
              className="drop-shadow-md"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
