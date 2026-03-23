import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Wand2, Download, Share2, Sparkles, Image as ImageIcon, Copy, Check, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GenerateResult {
  generatedText: string;
  imageUrl: string;
  style: string;
  scene: string;
  prompt: string;
  generatedAt: string;
  model?: string;
}

const sectionColors: Record<string, string> = {
  "设计主题": "text-primary",
  "创意概念": "text-[#8B4513]",
  "视觉构成": "text-[#2F4F4F]",
  "非遗元素": "text-primary",
  "文化寓意": "text-[#8B4513]",
  "设计诗句": "text-foreground",
};

function parseGeneratedText(text: string) {
  const sections: { title: string; content: string }[] = [];
  const regex = /【(.+?)】([\s\S]*?)(?=【|$)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    sections.push({ title: match[1].trim(), content: match[2].trim() });
  }
  return sections;
}

export default function AiStudio() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [copied, setCopied] = useState(false);

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

  const handleGenerate = async () => {
    if (!form.prompt.trim()) {
      toast({ title: "请输入创意描述", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "生成失败，请重试");
      }

      const data: GenerateResult = await res.json();
      setResult(data);
      toast({ title: "✨ 创作完成！", description: "Claude 已为您生成专属文创设计方案。" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "生成失败，请重试";
      toast({ title: "生成失败", description: message, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result?.generatedText) return;
    navigator.clipboard.writeText(result.generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "已复制到剪贴板" });
  };

  const sections = result ? parseGeneratedText(result.generatedText) : [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-16">
        <SectionHeading
          title="AI 灵感工坊"
          subtitle="AI Creator Studio"
        >
          融合孝感非遗专属知识，由 Claude 大模型驱动，一键生成独一无二的数字化文创设计方案。传统审美与现代 AI 的完美碰撞。
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-7 bg-card p-6 md:p-8 rounded-3xl border border-border shadow-lg self-start">

            <div>
              <label className="block text-sm font-bold text-foreground mb-3">1. 选择非遗风格模型</label>
              <div className="grid grid-cols-2 gap-3">
                {styles.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setForm({ ...form, style: s.id })}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${form.style === s.id
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
                    onClick={() => setForm({ ...form, scene: s.id })}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${form.scene === s.id
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
                rows={5}
                placeholder="例如：一位慈祥的母亲和孩子在槐荫树下，温馨的氛围，体现孝文化的精髓..."
                className="w-full p-4 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none text-sm"
                value={form.prompt}
                onChange={e => setForm({ ...form, prompt: e.target.value })}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-primary to-[#a00020] text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" /> Claude 正在创作中...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" /> 一键生成设计方案
                </>
              )}
            </button>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <Bot className="w-3.5 h-3.5 shrink-0" />
              <span>由 Claude 大模型驱动 · 使用项目 ANTHROPIC_API_KEY</span>
            </div>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-card rounded-3xl border border-border p-12 flex flex-col items-center justify-center min-h-[500px]"
                >
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground">Claude 正在注入灵感</h3>
                  <p className="text-muted-foreground mt-2 text-sm">融合非遗知识，构建专属设计方案...</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Reference Image */}
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    <img
                      src={result.imageUrl}
                      alt="非遗风格参考"
                      className="w-full h-48 object-cover"
                    />
                    <div className="px-4 py-2 flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {styles.find(s => s.id === result.style)?.name} · {scenes.find(s => s.id === result.scene)?.name} 参考风格图
                      </span>
                    </div>
                  </div>

                  {/* Generated Design Plan */}
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-primary" />
                        <span className="font-bold text-sm">Claude 生成的设计方案</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                        >
                          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied ? "已复制" : "复制全文"}
                        </button>
                        <button
                          onClick={() => {
                            const blob = new Blob([result.generatedText], { type: "text/plain;charset=utf-8" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url; a.download = "文创设计方案.txt"; a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          下载
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-5">
                      {sections.length > 0 ? sections.map((sec, i) => (
                        <div key={i}>
                          <h4 className={`text-sm font-bold mb-1.5 ${sectionColors[sec.title] || "text-primary"}`}>
                            【{sec.title}】
                          </h4>
                          {sec.title === "设计诗句" ? (
                            <div className="bg-muted/50 rounded-xl p-4 font-serif text-base leading-loose text-center whitespace-pre-line text-foreground/90 border border-border/50">
                              {sec.content}
                            </div>
                          ) : sec.title === "非遗元素" ? (
                            <ul className="space-y-1.5">
                              {sec.content.split("\n").filter(l => l.trim()).map((line, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                  {line.replace(/^[-•·\d.、]\s*/, "")}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{sec.content}</p>
                          )}
                        </div>
                      )) : (
                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{result.generatedText}</p>
                      )}
                    </div>

                    <div className="px-6 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {result.model ? `模型: ${result.model}` : "Claude AI 生成"} · {new Date(result.generatedAt).toLocaleTimeString("zh-CN")}
                      </span>
                      <button className="text-xs font-bold text-accent hover:underline">
                        申请投入实体生产 →
                      </button>
                    </div>
                  </div>

                  {/* Share */}
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-2xl text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                    <Share2 className="w-4 h-4" /> 分享设计方案
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-muted/30 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center p-12 min-h-[500px] text-center"
                >
                  <div className="w-20 h-20 mx-auto bg-card rounded-2xl flex items-center justify-center border border-border mb-4 shadow-sm">
                    <ImageIcon className="w-8 h-8 text-primary/40" />
                  </div>
                  <p className="font-medium text-lg text-foreground">作品展示区</p>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                    在左侧选择非遗风格、应用场景并输入创意描述，Claude 将为您生成完整的文创设计方案
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
