import { Question } from "@/data/db";

interface GenericChoiceRendererProps {
  question: Question;
  onAnswer?: (answer: string) => void;
}

export default function GenericChoiceRenderer({ question }: GenericChoiceRendererProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
      <div className="text-center text-white/50 text-xl font-bold">
        {/* Placeholder graphic for generic questions */}
        <span className="text-6xl mb-4 block">🧠</span>
        仔细思考题目
      </div>
    </div>
  );
}
