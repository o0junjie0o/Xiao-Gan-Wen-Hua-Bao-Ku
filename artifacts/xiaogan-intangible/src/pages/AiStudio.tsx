import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Wand2, Download, Share2, Sparkles, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AiStudio() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    style: "papercut",
    scene: "poster",
    prompt: ""
  });

  const styles = [
    { id: "papercut", name: "雕花剪纸" },
    { id: "shadow_puppet", name: "云梦皮影" },
    { id: "xiao_culture", name: "孝文化工笔" },
    { id: "plaster_carving", name: "应城膏雕" },
  ];

  const scenes = [
    { id: "poster", name: "海报" },
    { id: "phone_case", name: "手机壳" },
    { id: "bookmark", name: "书签" },
    { id: "avatar", name: "社交头像" },
    { id: "greeting_card", name: "贺卡" },
  ];

  const handleGenerate = () => {
    if (!form.prompt) {
      toast({ title: "请输入创意描述", variant: "destructive" });
      return;
    }
    
    setIsGenerating(true);
    // Mock API call
    setTimeout(() => {
      // Return a beautiful unsplash image as mock generated content
      {/* generated art placeholder */}
      setResultImage("https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80");
      setIsGenerating(false);
      toast({ title: "生成成功！", description: "您的专属非遗文创已生成。" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-16">
        <SectionHeading 
          title="AI 灵感工坊" 
          subtitle="AI Creator Studio"
        >
          上传创意，融合孝感非遗专属大模型，一键生成独一无二的数字化文创设计。传统审美与现代科技的完美碰撞。
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-8 bg-card p-6 md:p-8 rounded-3xl border border-border shadow-lg">
            
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">1. 选择非遗风格模型</label>
              <div className="grid grid-cols-2 gap-3">
                {styles.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setForm({...form, style: s.id})}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      form.style === s.id 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-border hover:border-primary/40 text-muted-foreground"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-3">2. 选择应用场景</label>
              <div className="flex flex-wrap gap-2">
                {scenes.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setForm({...form, scene: s.id})}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                      form.scene === s.id 
                        ? "border-accent bg-accent text-accent-foreground shadow-md" 
                        : "border-border bg-background hover:bg-muted text-foreground"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-3">3. 描述你的创意画面</label>
              <textarea 
                rows={4}
                placeholder="例如：一位慈祥的母亲和孩子在槐荫树下，温馨的氛围..."
                className="w-full p-4 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                value={form.prompt}
                onChange={e => setForm({...form, prompt: e.target.value})}
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-primary to-[#a00020] text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" /> 正在创作中...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" /> 一键生成设计
                </>
              )}
            </button>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-7 bg-muted/30 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center p-8 relative overflow-hidden min-h-[500px]">
            {isGenerating ? (
              <div className="text-center flex flex-col items-center">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground">AI 大模型正在注入灵感</h3>
                <p className="text-muted-foreground mt-2">预计需要 10-15 秒...</p>
              </div>
            ) : resultImage ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-card p-4 rounded-2xl shadow-2xl border border-border"
              >
                <img src={resultImage} alt="Generated Art" className="w-full h-auto rounded-xl" />
                
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    <Download className="w-4 h-4" /> 高清下载
                  </button>
                  <button className="px-4 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors">
                    <Share2 className="w-4 h-4" /> 分享
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm font-bold text-accent hover:underline">
                    申请将此设计投入实体生产 →
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="w-20 h-20 mx-auto bg-card rounded-2xl flex items-center justify-center border border-border mb-4 shadow-sm">
                  <ImageIcon className="w-8 h-8 text-primary/40" />
                </div>
                <p className="font-medium text-lg">作品展示区</p>
                <p className="text-sm mt-1">在左侧设置参数并生成您的数字文创</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
