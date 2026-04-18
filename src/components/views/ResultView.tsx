import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";
import { Star, Map as MapIcon } from "lucide-react";

export default function ResultView() {
  const { setView } = useGameStore();

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#A0D8EF] to-[#E0F7FA] text-[#2C3E50] flex flex-col items-center justify-center p-8 font-sans">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white/60 p-12 rounded-[40px] border-[6px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col items-center max-w-xl"
      >
        <h2 className="text-[54px] font-extrabold mb-8 text-[#4CAF50] drop-shadow-md text-center tracking-wide" style={{ textShadow: '0 4px 0 rgba(76, 175, 80, 0.2)' }}>
          挑战成功！
        </h2>
        
        <div className="flex gap-4 mb-10">
          {[1, 2, 3].map((star, idx) => (
            <motion.div
              key={star}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: idx * 0.2 + 0.3, type: "spring" }}
            >
              <Star className="text-[#FFD700] fill-[#FFD700] drop-shadow-[0_4px_10px_rgba(255,215,0,0.6)]" size={72} strokeWidth={1} />
            </motion.div>
          ))}
        </div>

        <p className="text-[22px] text-[#2C3E50] mb-12 font-bold opacity-80 text-center">
          太棒了！你完美掌握了这个知识点！
        </p>

        <button 
          onClick={() => setView('map')}
          className="flex items-center justify-center gap-3 w-full py-5 bg-[#4A90E2] hover:bg-[#357ABD] text-white border-[4px] border-white rounded-[50px] font-black text-2xl shadow-[0_8px_0_#2A60A2] hover:shadow-[0_4px_0_#2A60A2] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all"
        >
          <MapIcon size={28} />
          返回地图
        </button>
      </motion.div>
    </div>
  );
}
