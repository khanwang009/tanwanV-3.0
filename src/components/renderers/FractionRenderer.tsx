import { Question } from "@/data/db";
import { motion } from "framer-motion";

interface FractionRendererProps {
  question: Question;
}

export default function FractionRenderer({ question }: FractionRendererProps) {
  const totalSlices = question.sceneProps?.total || 8;
  const activeSlices = question.sceneProps?.active ?? 3;
  const secondarySlices = question.sceneProps?.secondary || 0; // for additions/subtractions

  const radius = 100;
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Dynamic Glowing backdrop */}
      <div className="absolute w-[300px] h-[300px] bg-[#A0D8EF]/30 rounded-full blur-3xl"></div>
      
      <svg width="240" height="240" viewBox="-120 -120 240 240" className="z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
        {Array.from({ length: totalSlices }).map((_, i) => {
          const startAngle = (i * 360) / totalSlices;
          const endAngle = ((i + 1) * 360) / totalSlices;
          const startRad = (startAngle - 90) * (Math.PI / 180);
          const endRad = (endAngle - 90) * (Math.PI / 180);
          
          const x1 = radius * Math.cos(startRad);
          const y1 = radius * Math.sin(startRad);
          const x2 = radius * Math.cos(endRad);
          const y2 = radius * Math.sin(endRad);
          
          const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
          
          let fillAttr = "#FFFFFF"; // inactive (white)
          let isActive = false;
          let isSecondary = false;

          if (i < activeSlices) {
            fillAttr = "#4CAF50"; // active (green)
            isActive = true;
          } else if (i < activeSlices + secondarySlices) {
            fillAttr = "#FFD54F"; // secondary (yellow) 
            isSecondary = true;
          }

          const highlight = isActive || isSecondary;

          return (
            <motion.path
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: highlight ? 1.05 : 1, 
                opacity: 1,
                y: highlight ? -2 : 0
              }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 15 }}
              d={`M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={fillAttr}
              stroke="#A0D8EF"
              strokeWidth="3"
              style={{ originX: "0px", originY: "0px" }}
              className={highlight ? "drop-shadow-lg" : "opacity-80"}
            />
          );
        })}
      </svg>
      
      <div className="absolute bottom-6 font-bold text-[#4A90E2] bg-white/80 px-4 py-2 rounded-full border-2 border-white shadow-sm z-20">
        分割总份数: {totalSlices} 
      </div>
    </div>
  );
}
