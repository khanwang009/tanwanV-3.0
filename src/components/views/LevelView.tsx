import { useGameStore } from "@/store/gameStore";
import { getQuestionsByNode, StageType } from "@/data/db";
import { useState, useMemo } from "react";
import { Check, AlertCircle, Map as MapIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";
import RendererRouter from "../renderers/RendererRouter";

const STAGES: StageType[] = ["诊断关", "理解关", "迁移关", "复测关"];

export default function LevelView() {
  const { currentNode, currentUnit, setView, completeNode, stars } = useGameStore();
  const questions = useMemo(() => currentNode ? getQuestionsByNode(currentNode) : [], [currentNode]);
  
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

  const currentQuestion = questions[currentStageIdx];

  const handleAnswer = (selected: string) => {
    if (feedback) return; 
    
    if (selected === currentQuestion.answer) {
      setFeedback('success');
      const sound = new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3");
      sound.play().catch(() => {});

      if (currentStageIdx === questions.length - 1) {
        setTimeout(() => {
          canvasConfetti({ particleCount: 150, spread: 80, origin: { y: 0.5 }, zIndex: 1000 });
          completeNode(currentNode!, 3); 
        }, 1500);
      } else {
        setTimeout(() => {
          setFeedback(null);
          setCurrentStageIdx(prev => prev + 1);
        }, 1500);
      }
    } else {
      setFeedback('error');
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#A0D8EF] to-[#E0F7FA] text-[#2C3E50] flex flex-col relative overflow-hidden font-sans">
      
      {/* Decorative Gears */}
      <img src="https://img.icons8.com/ios-filled/200/cccccc/gear.png" className="absolute top-[100px] right-[400px] w-[200px] opacity-10 pointer-events-none" alt="" />
      <img src="https://img.icons8.com/ios-filled/500/cccccc/gear.png" className="absolute -bottom-[50px] -left-[50px] w-[300px] opacity-10 pointer-events-none" alt="" />

      {/* Header HUD */}
      <header className="h-[80px] px-10 py-5 flex justify-between items-center z-50">
        <div className="flex gap-4">
          <div className="bg-white/90 px-4 py-2 rounded-[50px] border-[3px] border-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl pt-1">⭐</span>
            <span>{stars}</span>
          </div>
          <button 
            onClick={() => setView('map')} 
            className="bg-white/90 px-4 py-2 rounded-[50px] border-[3px] border-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] flex items-center gap-2 font-bold text-lg hover:bg-gray-50 active:scale-95 transition-all text-[#4A90E2]"
          >
            <MapIcon size={20} />
            <span>返回星图</span>
          </button>
        </div>

        <div className="flex-grow max-w-[400px] h-6 bg-white/30 rounded-full mx-10 relative border-2 border-white">
          <div 
            className="h-full bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] rounded-full transition-all duration-500" 
            style={{ width: `${((currentStageIdx) / STAGES.length) * 100}%` }}
          ></div>
          <div className="absolute -right-14 -top-1 font-bold text-[#4A90E2] text-lg">
            {`${Math.round(((currentStageIdx) / STAGES.length) * 100)}%`}
          </div>
        </div>

        <div className="bg-white/90 px-6 py-2 rounded-[50px] border-[3px] border-[#4A90E2] shadow-[0_4px_10px_rgba(0,0,0,0.1)] font-bold text-lg text-[#4A90E2]">
          <span>{currentUnit ? currentUnit : 'UNIT'} : 阶段挑战</span>
        </div>
      </header>

      {/* Main Play Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 px-10 pb-[60px] z-10">
        
        {/* Visualizer Scene Area */}
        <div className="bg-white/40 rounded-[32px] border-[4px] border-dashed border-white/80 relative flex items-center justify-center overflow-hidden h-full shadow-inner min-h-[400px]">
          <div className="absolute top-6 left-6 bg-[#4A90E2] text-white px-5 py-2 rounded-xl font-extrabold uppercase tracking-widest shadow-[0_6px_0_#2A60A2] z-10 text-sm">
            阶段 0{currentStageIdx + 1}: {STAGES[currentStageIdx]}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-full"
            >
               <RendererRouter question={currentQuestion} onAnswer={() => {}} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interaction Panel (Bento Grid) */}
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 h-full">
          {/* Question Card */}
          <div className="bg-white/90 rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white flex flex-col justify-center">
            <h2 className="text-[#555] text-[18px] font-semibold mb-2">任务目标</h2>
            <p className="text-[#2C3E50] text-[20px] font-bold leading-relaxed">
              {currentQuestion.stem}
            </p>
          </div>

          {/* Options List */}
          <div className="bg-white/90 rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white flex flex-col gap-3 overflow-y-auto">
            {currentQuestion.options.map((opt, idx) => {
              const optionKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="bg-white border-[2px] border-[#E0E0E0] p-4 rounded-2xl text-[18px] font-semibold text-left flex justify-between items-center transition-all hover:bg-[#F0F7FF] hover:border-[#4A90E2] hover:-translate-y-1 active:translate-y-0 text-[#2C3E50]"
                >
                  <span className="flex-1 pr-2">{opt}</span>
                  <span className="text-[#BBB] text-[16px] font-bold shrink-0">{optionKeys[idx]}</span>
                </button>
              );
            })}
          </div>

          {/* Hint Card */}
          <div className="bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] rounded-[24px] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-start gap-2.5">
            <span className="text-[20px] pt-0.5 shadow-sm">💡</span>
            <p className="text-[14px] font-medium leading-relaxed">小提示：仔细观察图形和数字的关系，选择最合适的答案！</p>
          </div>
        </div>
      </main>

      {/* Navigation Island Footer */}
      <div className="absolute bottom-6 left-10 flex gap-2.5 z-20">
        {STAGES.map((_, idx) => (
          <div 
            key={idx}
            className={`h-3 rounded-full transition-all duration-300 ${
              idx === currentStageIdx 
                ? "bg-[#4A90E2] w-20 shadow-md" 
                : idx < currentStageIdx 
                  ? "bg-[#4CAF50] w-10 shadow-sm"
                  : "bg-white/50 w-10"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-6 right-10 font-bold text-black/20 text-sm z-10 pointer-events-none">
        KNOWLEDGE NODE: {currentNode}
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-3 px-8 py-4 rounded-full text-2xl font-bold shadow-[0_10px_40px_rgba(0,0,0,0.2)] z-[100] ${
              feedback === 'success' ? 'bg-[#4CAF50] text-white border-4 border-[#8BC34A]' : 'bg-[#EF5350] text-white border-4 border-[#E57373]'
            }`}
          >
            {feedback === 'success' ? (
              <>
                <Check size={32} strokeWidth={3} />
                完全正确！
              </>
            ) : (
              <>
                <AlertCircle size={32} strokeWidth={3} />
                哎呀，再试一次！
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
