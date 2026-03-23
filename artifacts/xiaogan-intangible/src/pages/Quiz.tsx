import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trophy, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { clsx } from "clsx";

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "孝感雕花剪纸于哪一年入选联合国教科文组织人类非物质文化遗产代表作名录？",
      options: ["2006年", "2009年", "2015年", "2020年"],
      correct: 1, // 2009年
      explanation: "2009年，孝感雕花剪纸作为“中国剪纸”的子项目，入选世界级非物质文化遗产名录。"
    },
    {
      id: 2,
      question: "著名的《天仙配》故事发生地，也是董永的故乡在孝感哪个地方？",
      options: ["云梦县", "汉川市", "孝南区", "应城市"],
      correct: 2,
      explanation: "董永传说的核心发源地位于现今的孝感市孝南区，建有董永公园纪念这一经典孝文化故事。"
    }
  ];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[currentQ].correct) {
      setScore(s => s + 10);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // Quiz finished
      alert(`答题结束！得分：${score}`);
    }
  };

  const q = questions[currentQ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary pt-16 pb-32 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-papercut" 
             style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/papercut-pattern.png)` }} />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">非遗知识大闯关</h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            挑战你的非遗知识储备，赢取积分兑换麻糖米酒礼盒与手艺人体验课程！
          </p>
          <div className="mt-8 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-bold">
            <Trophy className="text-yellow-400 w-5 h-5" /> 当前积分: {score}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-card rounded-3xl shadow-2xl border border-border p-8 md:p-12"
          >
            <div className="flex items-center gap-2 text-accent font-bold mb-6 text-sm tracking-wider">
              <HelpCircle className="w-5 h-5" /> 问题 {currentQ + 1} / {questions.length}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8 leading-relaxed">
              {q.question}
            </h2>

            <div className="space-y-4">
              {q.options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = showResult && idx === q.correct;
                const isWrong = showResult && isSelected && idx !== q.correct;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={showResult}
                    className={clsx(
                      "w-full text-left p-5 rounded-xl border-2 font-medium text-lg transition-all flex justify-between items-center",
                      !showResult && "border-border hover:border-primary hover:bg-primary/5",
                      isCorrect && "border-green-500 bg-green-50 text-green-700",
                      isWrong && "border-red-500 bg-red-50 text-red-700",
                      showResult && !isCorrect && !isWrong && "border-border opacity-50"
                    )}
                  >
                    <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                    {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {isWrong && <XCircle className="w-6 h-6 text-red-600" />}
                  </button>
                )
              })}
            </div>

            {showResult && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-8 p-6 bg-muted/50 rounded-xl border border-border"
              >
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> 知识科普
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {q.explanation}
                </p>
                
                <button 
                  onClick={handleNext}
                  className="mt-6 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                >
                  {currentQ < questions.length - 1 ? "下一题" : "查看成绩榜"}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

import { BookOpen } from "lucide-react";
