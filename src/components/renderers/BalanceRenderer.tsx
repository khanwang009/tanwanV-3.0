import { Question } from "@/data/db";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface BalanceRendererProps {
  question: Question;
}

export default function BalanceRenderer({ question }: BalanceRendererProps) {
  const tilt = question.sceneProps?.tilt || 0; 
  const leftWeight = question.sceneProps?.left || 3;
  const rightWeight = question.sceneProps?.right || 3;

  const controls = useAnimation();

  useEffect(() => {
    // Initial animation settling into the tilt
    controls.start({
      rotate: [0, tilt > 0 ? tilt + 5 : tilt - 5, tilt],
      transition: { duration: 1.5, type: "spring", stiffness: 60 }
    });
  }, [tilt, controls]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="relative flex flex-col items-center">
        {/* Main Arm */}
        <motion.div 
          animate={controls}
          className="w-[280px] h-4 bg-[#8B5A2B] rounded-full relative shadow-lg origin-center z-10 border-2 border-[#5c3a1b]"
        >
          {/* Left Pan */}
          <motion.div 
            animate={{ rotate: -tilt }} 
            className="absolute -bottom-[80px] left-2 w-1 h-[80px] bg-gray-400 origin-top flex justify-center"
          >
            <div className="absolute bottom-0 w-24 h-8 bg-gradient-to-b from-gray-200 to-gray-400 rounded-b-full shadow-md shrink-0 border-b-2 border-gray-500 flex justify-center items-end pb-1">
              {/* Objects */}
              <div className="flex flex-wrap justify-center gap-1 w-20">
                {Array.from({ length: leftWeight }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-[#4A90E2] rounded-full shadow-sm border border-[#2A60A2]"></div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Pan */}
          <motion.div 
            animate={{ rotate: -tilt }} 
            className="absolute -bottom-[80px] right-2 w-1 h-[80px] bg-gray-400 origin-top flex justify-center"
          >
            <div className="absolute bottom-0 w-24 h-8 bg-gradient-to-b from-gray-200 to-gray-400 rounded-b-full shadow-md shrink-0 border-b-2 border-gray-500 flex justify-center items-end pb-1">
              {/* Objects */}
              <div className="flex flex-wrap justify-center gap-1 w-20">
                {Array.from({ length: rightWeight }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-[#FFD700] rounded-full shadow-sm border border-[#F57F17]"></div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#C0C0C0] rounded-full border-2 border-gray-500 z-20 shadow-inner"></div>
        </motion.div>
        
        {/* Base Stand */}
        <div className="w-8 h-32 bg-gradient-to-r from-[#8B5A2B] to-[#A0522D] rounded-t-full shadow-inner z-0 border-x-2 border-[#5c3a1b]"></div>
        <div className="w-40 h-8 bg-[#8B5A2B] rounded-t-xl z-0 border-t-2 border-x-2 border-[#5c3a1b] shadow-xl flex items-center justify-center">
            <div className="w-24 h-2 bg-[#5c3a1b] rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
