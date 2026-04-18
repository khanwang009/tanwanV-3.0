import { useGameStore } from "@/store/gameStore";
import { units } from "@/data/db";
import { motion } from "framer-motion";
import { Star, Play, Trophy } from "lucide-react";

export default function MapView() {
  const { setView, startNode, completedNodes, stars } = useGameStore();

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#A0D8EF] to-[#E0F7FA] text-[#2C3E50] p-8 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10 bg-white/60 p-6 rounded-[32px] border-4 border-white shadow-lg">
          <h2 className="text-4xl font-extrabold text-[#4A90E2] uppercase tracking-wider flex items-center gap-4">
            <Trophy className="text-[#FFD700]" size={40} />
            数学探索星图
          </h2>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border-4 border-[#FFD700] shadow-[0_4px_0_#F57F17]">
            <Star className="text-[#FFD700] fill-[#FFD700]" size={28} />
            <span className="font-bold text-2xl text-[#8B5A2B]">{stars}</span>
          </div>
        </header>

        <div className="space-y-12 pb-20">
          {units.map((unit) => (
            <div key={unit.id} className="relative">
              <div className="inline-block bg-[#4A90E2] text-white px-6 py-2 rounded-xl font-extrabold shadow-[0_6px_0_#2A60A2] mb-6 tracking-wide text-lg">
                {unit.id}: {unit.name}
              </div>
              <div className="flex flex-wrap gap-6">
                {unit.nodes.map((node) => {
                  const isCompleted = completedNodes.includes(node.id);
                  return (
                    <motion.div
                      key={node.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startNode(unit.id, node.id)}
                      className={`relative w-52 h-40 rounded-[24px] p-5 cursor-pointer flex flex-col items-center justify-center text-center border-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-colors ${
                        isCompleted 
                          ? "bg-[#E8F5E9] border-[#8BC34A] text-[#2E7D32]"
                          : "bg-white/90 border-white text-[#2C3E50] hover:border-[#4A90E2]"
                      }`}
                    >
                      {isCompleted && (
                        <div className="absolute -top-4 -right-4 bg-[#FFD700] border-4 border-white rounded-full p-2 shadow-md z-10">
                          <Star className="text-white fill-white drop-shadow-sm" size={24} />
                        </div>
                      )}
                      
                      <div className="w-12 h-12 bg-black/5 rounded-full mb-3 flex items-center justify-center">
                        {isCompleted ? <Trophy size={24} /> : <div className="w-4 h-4 rounded-full bg-[#4A90E2]" />}
                      </div>

                      <h4 className="font-bold mb-3 break-words text-[15px] leading-tight">
                        {node.name}
                      </h4>

                      <div className="absolute bottom-4">
                        {isCompleted ? (
                           <span className="text-[#4CAF50] text-sm font-extrabold uppercase bg-white/50 px-3 py-1 rounded-full">已掌握</span>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[#4A90E2] bg-blue-50 px-3 py-1 rounded-full font-bold text-sm">
                            <Play size={14} className="fill-current" />
                            <span>开始挑战</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
