import { useGameStore } from "@/store/gameStore";

export default function HomeView() {
  const setView = useGameStore(state => state.setView);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#A0D8EF] to-[#E0F7FA] text-[#2C3E50] p-8 font-sans">
      <div className="bg-white/60 p-12 rounded-[40px] border-[6px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col items-center max-w-2xl relative">
        <div className="absolute -top-12 bg-[#FFD700] rounded-full p-6 border-4 border-white shadow-lg">
          <span className="text-6xl">🧩</span>
        </div>
        
        <h1 className="text-[64px] font-extrabold mt-8 mb-6 text-[#4A90E2] tracking-widest text-center" style={{ textShadow: '0 4px 0 rgba(74, 144, 226, 0.2)' }}>
          数学探索岛
        </h1>
        
        <p className="text-[22px] mb-12 opacity-80 text-center leading-relaxed font-medium">
          观察规律、动手实验，成为空间几何与数据推理的大师！
        </p>

        <button 
          onClick={() => setView('map')}
          className="px-14 py-6 bg-[#FFD700] hover:bg-[#FBC02D] text-[#8B5A2B] border-[4px] border-white font-black text-3xl rounded-[50px] shadow-[0_8px_0_#F57F17] hover:shadow-[0_4px_0_#F57F17] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all"
        >
          开始冒险
        </button>
      </div>
    </div>
  );
}
