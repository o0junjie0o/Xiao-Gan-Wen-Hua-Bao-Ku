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
      correct: 1,
      explanation: "2009年，孝感雕花剪纸作为中国剪纸的子项目，入选世界级非物质文化遗产名录。"
    },
    {
      id: 2,
      question: "著名的《天仙配》故事发生地，也是董永的故乡在孝感哪个地方？",
      options: ["云梦县", "汉川市", "孝南区", "应城市"],
      correct: 2,
      explanation: "董永传说的核心发源地位于现今的孝感市孝南区，建有董永公园纪念这一经典孝文化故事。"
    },
    {
      id: 3,
      question: "《二十四孝》中「孝感动天」的主人公是谁？",
      options: ["舜", "尧", "禹", "启"],
      correct: 0,
      explanation: "虞舜因至孝感动天地，大象帮他耕田，小鸟帮他除草，尧帝闻其贤德将两女相嫁，后禅位于他。"
    },
    {
      id: 4,
      question: "「亲尝汤药」讲述的是哪位皇帝的孝行故事？",
      options: ["汉高祖刘邦", "汉文帝刘恒", "汉武帝刘彻", "汉光武帝刘秀"],
      correct: 1,
      explanation: "汉文帝刘恒以仁孝闻名，母亲卧病三年期间，他每次煎好汤药必先亲口尝试，确认温度适宜才端给母亲服用。"
    },
    {
      id: 5,
      question: "「啮指痛心」中，母亲咬手指召唤儿子的主人公是？",
      options: ["曾参", "子路", "闵损", "郯子"],
      correct: 0,
      explanation: "曾参入山打柴时，母亲因家中来客无措，咬破手指。曾参心中忽感剧痛，知母召唤，立即赶回家中。"
    },
    {
      id: 6,
      question: "「百里负米」中，子路为了供养父母做了什么？",
      options: ["百里之外打工赚钱", "百里之外背米回家", "百里之外求医问药", "百里之外砍柴卖钱"],
      correct: 1,
      explanation: "子路家贫，父母嗜米，他常常翻越百里山路亲自背米回家供养父母，后来做了大官仍悔恨无法再尽此孝。"
    },
    {
      id: 7,
      question: "「芦衣顺母」中，闵损的继母用什么代替棉花给他做冬衣？",
      options: ["芦花", "柳絮", "棉絮", "鸭绒"],
      correct: 0,
      explanation: "闵损继母用芦花填充冬衣，导致闵损在寒冬驾车时无力控缰。父察真相欲休妻，闵损跪求母在一子寒，母去三子单。"
    },
    {
      id: 8,
      question: "「鹿乳奉亲」中，郯子为了给父母治病，假扮成什么动物取乳？",
      options: ["鹿", "羊", "牛", "马"],
      correct: 0,
      explanation: "郯子父母双目患疾需鹿乳治疗，郯子披上鹿皮混入鹿群取鹿乳，差点被猎人射中，猎人得知真相后深感其孝而放行。"
    },
    {
      id: 9,
      question: "「戏彩娱亲」中，老莱子用什么方式逗父母开心？",
      options: ["唱歌跳舞", "扮婴儿戏耍", "讲笑话", "变魔术"],
      correct: 1,
      explanation: "老莱子年逾七十仍穿五彩衣、持拨浪鼓在父母面前嬉笑，跌倒时故意学婴儿哭声，让父母开怀大笑。"
    },
    {
      id: 10,
      question: "「刻木事亲」中，丁兰用什么材料雕刻父母的像来侍奉？",
      options: ["木头", "石头", "玉石", "青铜"],
      correct: 0,
      explanation: "丁兰幼年父母双亡，用木头刻成双亲像供于堂上，每日三餐前请示、出入必禀告，如同父母仍在世一般。"
    },
    {
      id: 11,
      question: "「涌泉跃鲤」讲述的是哪位汉代女子的孝行？",
      options: ["姜诗之妻庞氏", "董永之妻七仙女", "黄香之母", "闵损之母"],
      correct: 0,
      explanation: "姜诗之妻庞氏与丈夫共同侍奉婆婆，每日跋涉数里取江水供婆婆饮用，孝心感动上苍，家门前涌出清泉并日日跃出鲤鱼。"
    },
    {
      id: 12,
      question: "「怀橘遗亲」中，陆绩在袁术家做客时，偷偷藏了什么送给母亲？",
      options: ["橘子", "桃子", "李子", "梨子"],
      correct: 0,
      explanation: "陆绩六岁随父拜访袁术，将橘子藏入怀中带回给母亲，被袁术发现后坦言欲归以遗母，袁术深为感叹。"
    },
    {
      id: 13,
      question: "「扇枕温衾」中，黄香为父亲做了什么？",
      options: ["夏天扇凉枕席，冬天暖热被褥", "夏天扇风降温，冬天烧火取暖", "夏天打扫房间，冬天铺好被褥", "夏天送水降温，冬天送衣保暖"],
      correct: 0,
      explanation: "黄香九岁丧母后侍父极孝，夏天用扇子扇凉枕席驱走暑气，冬天用体温暖热被褥，再请父亲就寝，乡人称颂。"
    },
    {
      id: 14,
      question: "「行佣供母」中，江革为了供养母亲做了什么？",
      options: ["做佣人打工赚钱", "沿街乞讨", "种地务农", "经商做生意"],
      correct: 0,
      explanation: "江革少年丧父，战乱中背负母亲逃难，后因家贫无牛，自己充当耕牛拉犁，并做佣人赚钱供母，官府征辟皆以母老推辞。"
    },
    {
      id: 15,
      question: "「闻雷泣墓」中，王裒在雷雨时会做什么？",
      options: ["跑到母亲墓前陪伴", "在家中祭拜母亲", "为母亲祈祷", "为母亲扫墓"],
      correct: 0,
      explanation: "王裒的母亲生前惧雷，去世后每逢雷雨，王裒必奔至墓前跪下安慰说儿在此，母亲不要害怕，数十年从未间断。"
    },
    {
      id: 16,
      question: "「哭竹生笋」中，孟宗为了给母亲治病，在冬天哭出了什么？",
      options: ["竹笋", "泉水", "药材", "粮食"],
      correct: 0,
      explanation: "孟宗之母重病想喝竹笋汤，时值严冬笋不生长。孟宗奔入竹林抱竹痛哭，孝心感动上苍，地裂数茎新笋，母亲服后病愈。"
    },
    {
      id: 17,
      question: "「卧冰求鲤」中，王祥为了给继母治病，在冰上做了什么？",
      options: ["卧冰融化取鲤鱼", "凿冰捕鱼", "冰上钓鱼", "破冰取水"],
      correct: 0,
      explanation: "王祥继母病重欲食鲜鱼，时值寒冬河水冻结，王祥解衣卧于冰上以体温融冰，冰忽自裂跃出两条鲤鱼，继母食后病愈。"
    },
    {
      id: 18,
      question: "「扼虎救父」中，杨香为了救父亲，徒手打死了什么？",
      options: ["老虎", "狼", "熊", "豹子"],
      correct: 0,
      explanation: "杨香年仅十四岁，随父割禾时猛虎扑向父亲，杨香手无寸铁，奋不顾身扑上去用双手死死掐住虎颈，老虎终将父亲放开。"
    },
    {
      id: 19,
      question: "「恣蚊饱血」中，吴猛为了让父母睡好，做了什么？",
      options: ["让蚊子吸自己的血", "用扇子驱蚊", "用蚊帐挡蚊", "用艾草熏蚊"],
      correct: 0,
      explanation: "吴猛八岁时家贫无蚊帐，夏夜不驱赶蚊子，让其在自己身上随意叮咬，待蚊子吸饱血后便不再去骚扰父母安睡。"
    },
    {
      id: 20,
      question: "「尝粪忧心」中，庾黔娄为了判断父亲的病情，做了什么？",
      options: ["品尝父亲的粪便", "为父亲把脉", "为父亲煎药", "为父亲祈祷"],
      correct: 0,
      explanation: "庾黔娄遵医嘱亲口品尝父亲粪便以判断吉凶，发现粪味甘甜为凶兆后悲痛不已，当夜向北斗星叩首祈祷以身代父受苦。"
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
