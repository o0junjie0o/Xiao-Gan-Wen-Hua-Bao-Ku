import { useState, useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const QUOTES = [
  { text: "\u767E\u5584\u5B5D\u4E3A\u5148\uff0c\u4E07\u6076\u6deb\u4e3a\u9996\u3002", source: "\u300a\u56f4\u7089\u591c\u8bdd\u300b" },
  { text: "\u6811\u6b32\u9759\u800c\u98ce\u4e0d\u6b62\uff0c\u5b50\u6b32\u517b\u800c\u4eb2\u4e0d\u5f85\u3002", source: "\u300a\u6c49\u00b7\u97e9\u5a74\u00b7\u97e9\u8bd7\u5916\u4f20\u300b" },
  { text: "\u5b5d\u5b50\u4e4b\u4e8b\u4eb2\u4e5f\uff0c\u5c45\u5219\u81f4\u5176\u656c\uff0c\u517b\u5219\u81f4\u5176\u4e50\uff0c\u75c5\u5219\u81f4\u5176\u5fe7\u3002", source: "\u300a\u8bba\u8bed\u00b7\u4e3a\u653f\u300b" },
  { text: "\u7236\u6bcd\u8005\uff0c\u4eba\u4e4b\u672c\u4e5f\u3002", source: "\u300a\u53f2\u8bb0\u00b7\u5c48\u539f\u8d3e\u751f\u5217\u4f20\u300b" },
];

const STORIES = [
  {
    id: "dongyong",
    seal: "\u5b5d",
    title: "\u8463\u6c38\u5356\u8eab\u846c\u7236",
    titleEn: "Dong Yong\u2019s Filial Sacrifice",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    imageAlt: "\u5b5d\u611f\u96d5\u82b1\u526a\u7eb8\u00b7\u8463\u6c38\u4f20\u8bf4",
    summary: "\u6c49\u4ee3\u8463\u6c38\uff0c\u5343\u4e58\u4eba\u3002\u5c11\u5931\u6bcd\uff0c\u72ec\u517b\u7236\uff0c\u5c3d\u529b\u519c\u6851\uff0c\u884c\u8ff7\u9e7f\u8f66\u2026\u2026",
    full: "\u6c49\u4ee3\u8463\u6c38\uff0c\u5343\u4e58\u4eba\u3002\u5c11\u5931\u6bcd\uff0c\u72ec\u517b\u7236\uff0c\u5c3d\u529b\u519c\u6851\uff0c\u884c\u8ff7\u9e7f\u8f66\u3002\u7236\u4ea1\uff0c\u65e0\u4ee5\u846c\uff0c\u4e43\u81ea\u5356\u4e3a\u5974\uff0c\u4ee5\u4f9b\u4e27\u4e8b\u3002\u4e3b\u4eba\u77e5\u5176\u8d24\uff0c\u4e0e\u9322\u4e00\u4e07\uff0c\u9063\u4e4b\u3002\u8463\u6c38\u884c\u4e09\u5e74\u4e27\u6bd5\uff0c\u6b32\u8fd8\u4e3b\u4eba\uff0c\u4f9b\u5176\u5974\u804c\u3002\u9053\u9022\u4e00\u5987\u4eba\u66f0\uff1a\u3010\u613f\u4e3a\u5b50\u59bb\u3011\u3002\u9042\u4e0e\u4e4b\u4fe3\u3002\u4e3b\u4eba\u8c13\u8463\u6c38\u66f0\uff1a\u3010\u4ee5\u9322\u4e0e\u6c5d\u77e3\uff0c\u6c5d\u4f55\u4ee5\u6765\uff1f\u3011\u6c38\u66f0\uff1a\u3010\u4ee5\u4f9b\u7236\u4e27\uff0c\u7236\u4e27\u65e2\u6bd5\uff0c\u5f53\u8fd8\u4f9b\u804c\u3002\u3011\u4e3b\u4eba\u66f0\uff1a\u3010\u5987\u4eba\u4f55\u80fd\uff1f\u3011\u6c38\u66f0\uff1a\u3010\u80fd\u7ec7\u3011\u4e3b\u4eba\u66f0\uff1a\u3010\u82e5\u5c14\uff0c\u4f46\u4ee4\u7ec7\u7f23\u767e\u5339\u3011\u4e8e\u662f\u6c38\u59bb\u4e3a\u4e3b\u4eba\u5bb6\u7ec7\uff0c\u5341\u65e5\u800c\u6bd5\u3002\u7ec7\u8ba2\uff0c\u6b64\u5987\u8c13\u6c38\u66f0\uff1a\u3010\u6211\uff0c\u5929\u4e4b\u7ec7\u5973\u4e5f\u3002\u5929\u5e1d\u54c0\u541b\u81f3\u5b5d\uff0c\u4f7f\u6211\u52a9\u541b\u507f\u503a\u8033\u3011\u8bed\u6bd5\uff0c\u51cc\u7a7a\u800c\u53bb\uff0c\u4e0d\u77e5\u6240\u5728\u3002",
    quiz: {
      q: "\u8463\u6c38\u5356\u8eab\u846c\u7236\u662f\u4e3a\u4e86\u4ec0\u4e48\uff1f",
      a: "\u7236\u4eb2\u53bb\u4e16\u540e\u5bb6\u8d2b\u65e0\u529b\u5b89\u846c\uff0c\u8463\u6c38\u5c06\u81ea\u5df1\u5356\u4e3a\u5974\u4ec6\u4ee5\u83b7\u5f97\u9322\u6b3e\uff0c\u4e3a\u7236\u4eb2\u64cd\u529e\u4e27\u4e8b\uff0c\u4f53\u73b0\u4e86\u5bf9\u7236\u4eb2\u6df1\u539a\u7684\u5b5d\u5fc3\u3002",
    },
  },
  {
    id: "huangxiang",
    seal: "\u5b5d",
    title: "\u9ec4\u9999\u6e29\u5e2d",
    titleEn: "Huang Xiang Warms the Bed",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80",
    imageAlt: "\u5b5d\u6587\u5316\u00b7\u9ec4\u9999\u6e29\u5e2d",
    summary: "\u4e1c\u6c49\u9ec4\u9999\uff0c\u6c5f\u590f\u5b89\u9646\uff08\u4eca\u5c5e\u5b5d\u611f\uff09\u4eba\u3002\u5e74\u4e5d\u5c81\uff0c\u5931\u6bcd\uff0c\u601d\u6155\u60df\u60b4\u2026\u2026",
    full: "\u4e1c\u6c49\u9ec4\u9999\uff0c\u6c5f\u590f\u5b89\u9646\uff08\u4eca\u5c5e\u5b5d\u611f\uff09\u4eba\u3002\u5e74\u4e5d\u5c81\uff0c\u5931\u6bcd\uff0c\u601d\u6155\u60df\u60b4\uff0c\u4e61\u4eba\u79f0\u5176\u5b5d\u3002\u9999\u77e5\u4e8b\u4eb2\u4e4b\u7406\uff0c\u51ac\u6708\u6e29\u887e\u4ee5\u5f85\u7236\u4f11\uff0c\u590f\u6708\u6247\u5e2d\u4ee5\u6e05\u6691\u6c14\u3002\u592a\u5b88\u5218\u62a4\u8868\u800c\u5f02\u4e4b\uff0c\u540e\u53ec\u62dc\u90ce\u4e2d\u3002\u9ec4\u9999\u4ee5\u5b5d\u95fb\u540d\uff0c\u4f20\u8bf5\u4e61\u91cc\uff0c\u5176\u4e8b\u8ff9\u88ab\u6536\u5165\u300a\u4e8c\u5341\u56db\u5b5d\u300b\uff0c\u6210\u4e3a\u4e2d\u56fd\u5b5d\u6587\u5316\u7684\u7ecf\u5178\u8c61\u5f81\u4e4b\u4e00\u3002\u5b5d\u611f\u5b89\u9646\u81f3\u4eca\u4ecd\u4fdd\u5b58\u6709\u9ec4\u9999\u5893\uff0c\u4f9b\u540e\u4eba\u51ed\u540a\u3002",
    quiz: {
      q: "\u9ec4\u9999\u5728\u51ac\u5929\u548c\u590f\u5929\u5206\u522b\u662f\u600e\u6837\u5b5d\u656c\u7236\u4eb2\u7684\uff1f",
      a: "\u51ac\u5929\uff0c\u9ec4\u9999\u5148\u7528\u81ea\u5df1\u7684\u4f53\u6e29\u628a\u7236\u4eb2\u7684\u88ab\u896d\u6696\u70ed\u518d\u8bf7\u7236\u4eb2\u5165\u7761\uff08\u6e29\u887e\uff09\uff1b\u590f\u5929\uff0c\u4ed6\u7528\u6247\u5b50\u6247\u51c9\u5e2d\u5b50\u9a71\u8d70\u6691\u6c14\u518d\u8bf7\u7236\u4eb2\u5c31\u5bf9\uff08\u6247\u5e2d\uff09\u3002",
    },
  },
];

const KNOWLEDGE = [
  {
    icon: "\ud83d\udcdc",
    title: "\u552f\u4e00\u4ee5\u201c\u5b5d\u201d\u547d\u540d",
    body: "\u5b5d\u611f\u662f\u5168\u56fd\u552f\u4e00\u4e00\u5ea7\u4ee5\u201c\u5b5d\u201d\u5b57\u547d\u540d\u7684\u5730\u7ea7\u5e02\uff0c\u56e0\u4e1c\u6c49\u5b5d\u5b50\u8463\u6c38\u611f\u5929\u52a8\u5730\u7684\u5b5d\u884c\u800c\u5f97\u540d\uff0c\u57ce\u5e02\u540d\u79f0\u672c\u8eab\u5373\u662f\u5b5d\u6587\u5316\u7684\u6d3b\u5316\u77f3\u3002",
  },
  {
    icon: "\ud83c\udf33",
    title: "\u5343\u5e74\u69d0\u835f\u6811",
    body: "\u5b5d\u611f\u5e02\u5b5d\u5357\u533a\u8463\u6c38\u516c\u56ed\u5185\u4fdd\u5b58\u6709\u76f8\u4f20\u89c1\u8bc1\u8463\u6c38\u4e0e\u4e03\u4ed9\u5973\u76f8\u9047\u7684\u53e4\u69d0\u6811\u9057\u5740\uff0c\u56ed\u5185\u5b5d\u5b50\u7960\u59cb\u5efa\u4e8e\u5357\u5317\u671d\u65f6\u671f\uff0c\u8ddd\u4eca\u5df2\u903e1500\u5e74\u5386\u53f2\u3002",
  },
  {
    icon: "\ud83c\udfad",
    title: "\u5b5d\u6587\u5316\u5b55\u80b2\u975e\u9057",
    body: "\u5b5d\u611f\u96d5\u82b1\u526a\u7eb8\u4ee3\u8868\u4f5c\u300a\u69d0\u835f\u8bb0\u300b\u300a\u767e\u5b5d\u56fe\u300b\u3001\u695a\u5267\u7ecf\u5178\u5267\u76ee\u300a\u767e\u65e5\u7f18\u300b\uff0c\u5747\u4ee5\u8463\u6c38\u5b5d\u9053\u4f20\u8bf4\u4e3a\u521b\u4f5c\u6bcd\u9898\uff0c\u5b5d\u6587\u5316\u662f\u5b5d\u611f\u975e\u9057\u7684\u6838\u5fc3\u57fa\u56e0\u3002",
  },
];

export default function Culture() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [answerShown, setAnswerShown] = useState<Record<string, boolean>>({});
  const [checkedIn, setCheckedIn] = useState<Record<string, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("xiao-wenhua-checkin");
    if (stored) {
      try { setCheckedIn(JSON.parse(stored)); } catch (_) {}
    }
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setQuoteIdx(i => (i + 1) % QUOTES.length);
    }, 3800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const toggleExpand = (id: string) => setExpanded(s => ({ ...s, [id]: !s[id] }));
  const toggleAnswer = (id: string) => setAnswerShown(s => ({ ...s, [id]: !s[id] }));
  const toggleCheckIn = (id: string) => {
    setCheckedIn(s => {
      const next = { ...s, [id]: !s[id] };
      localStorage.setItem("xiao-wenhua-checkin", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-x-hidden">

      {/* Background auspicious-cloud texture */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Ccircle cx='50' cy='90' r='20' fill='%23C8102E'/%3E%3Ccircle cx='110' cy='90' r='20' fill='%23C8102E'/%3E%3Ccircle cx='80' cy='60' r='20' fill='%23C8102E'/%3E%3Ccircle cx='80' cy='120' r='20' fill='%23C8102E'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Banner */}
      <div className="relative pt-24 pb-14 bg-card border-b border-border z-10">
        <div className="container mx-auto px-4">
          <SectionHeading title={"\u5b5d\u6587\u5316\u4e13\u9898\u9986"} subtitle="Xiao Culture Hall">
            {"\u5b5d\u611f\uff0c\u56e0\u4e1c\u6c49\u8463\u6c38\u5356\u8eab\u846c\u7236\uff0c\u884c\u5b5d\u611f\u5929\u52a8\u5730\u800c\u5f97\u540d\u3002\u8fd9\u91cc\u662f\u5168\u56fd\u552f\u4e00\u4e00\u5ea7\u4ee5\u201c\u5b5d\u201d\u547d\u540d\u7684\u5730\u7ea7\u5e02\u3002"}
          </SectionHeading>
        </div>
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-6 px-4">
          <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-transparent to-primary/40" />
          <div className="flex items-center gap-1.5 text-primary/60">
            <span className="text-lg">&#10022;</span>
            <span className="text-xs tracking-[0.35em] font-medium">{"\u4ee5\u5b5d\u6da6\u57ce \u975e\u9057\u65b0\u751f"}</span>
            <span className="text-lg">&#10022;</span>
          </div>
          <div className="flex-1 max-w-xs h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>

      {/* Quotes carousel */}
      <div className="relative z-10 bg-primary/5 border-b border-primary/10 py-4 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-center gap-1 shrink-0">
              <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-primary/60 to-primary/20" />
              <div className="w-3 h-3 rounded-full border-2 border-primary/40 bg-background" />
              <div className="w-1.5 h-8 rounded-full bg-gradient-to-t from-primary/60 to-primary/20" />
            </div>
            <div className="flex-1 text-center min-h-[3.5rem] flex flex-col justify-center overflow-hidden">
              <div key={quoteIdx} style={{ animation: "fadeSlideIn 0.6s ease" }}>
                <p className="font-serif text-base sm:text-lg text-foreground/85 leading-relaxed">
                  {"\u300c"}{QUOTES[quoteIdx].text}{"\u300d"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{"\u2014\u2014 "}{QUOTES[quoteIdx].source}</p>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-1 shrink-0">
              <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-primary/60 to-primary/20" />
              <div className="w-3 h-3 rounded-full border-2 border-primary/40 bg-background" />
              <div className="w-1.5 h-8 rounded-full bg-gradient-to-t from-primary/60 to-primary/20" />
            </div>
          </div>
          <div className="flex justify-center gap-1.5 mt-2">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === quoteIdx ? "bg-primary w-4" : "bg-primary/25 w-1.5"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-14 max-w-6xl">

        <p className="text-xl text-muted-foreground font-medium mb-14 text-center max-w-2xl mx-auto leading-relaxed">
          {"\u201c\u5b5d\u6da6\u5343\u5e74\uff0c\u975e\u9057\u65b0\u751f\u201d\u3002\u5b5d\u6587\u5316\u4e0d\u4ec5\u662f\u5b5d\u611f\u7684\u57ce\u5e02\u7075\u9b42\uff0c\u66f4\u662f\u6df1\u6df1\u70d9\u5370\u5728\u5b5d\u611f\u5404\u9879\u975e\u7269\u8d28\u6587\u5316\u9057\u4ea7\u4e2d\u7684\u6838\u5fc3\u57fa\u56e0\u3002"}
        </p>

        {/* Hero image */}
        <div className="my-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-card relative">
          <img
            src={`${import.meta.env.BASE_URL}images/dongyong-story.png`}
            alt="Dong Yong Story"
            className="w-full object-cover aspect-video"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
            <h3 className="text-3xl font-serif font-bold text-white m-0">{"\u8463\u6c38\u4e0e\u4e03\u4ed9\u5973\uff1a\u4f20\u9882\u5343\u5e74\u7684\u5929\u4ed9\u914d"}</h3>
          </div>
        </div>

        {/* Stories + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 mt-14">

          {/* Story cards column */}
          <div className="flex-1 space-y-10">
            {STORIES.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                isExpanded={!!expanded[story.id]}
                isAnswerShown={!!answerShown[story.id]}
                isCheckedIn={!!checkedIn[story.id]}
                onToggleExpand={() => toggleExpand(story.id)}
                onToggleAnswer={() => toggleAnswer(story.id)}
                onCheckIn={() => toggleCheckIn(story.id)}
              />
            ))}
          </div>

          {/* Knowledge sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-28 bg-card rounded-2xl border border-border overflow-hidden shadow-md">
              <div className="bg-primary px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-white/20 border-2 border-white/40 flex items-center justify-center"
                  style={{ transform: "rotate(-3deg)" }}>
                  <span className="text-white font-serif font-bold text-base">{"\u77e5"}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{"\u5b5d\u611f\u5b5d\u6587\u5316\u5c0f\u77e5\u8bc6"}</p>
                  <p className="text-white/70 text-xs">Xiao Culture Facts</p>
                </div>
              </div>
              <div className="divide-y divide-border">
                {KNOWLEDGE.map((k, i) => (
                  <div key={i} className="p-5 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{k.icon}</span>
                      <h5 className="font-bold text-sm text-foreground">{k.title}</h5>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{k.body}</p>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-primary/5 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">{"\ud83d\udccd \u5b5d\u611f \u00b7 \u4e2d\u534e\u5b5d\u6587\u5316\u540d\u57ce"}</p>
              </div>
            </div>
          </aside>
        </div>

        {/* QR section */}
        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-transparent to-primary/30" />
            <h3 className="font-serif text-3xl font-bold text-foreground whitespace-nowrap">{"\u5bfb\u8ff9\u00b7\u5b5d\u5b50\u7960"}</h3>
            <div className="flex-1 max-w-xs h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {"\u6b22\u8fce\u4eb2\u4e34\u5b5d\u611f\u8463\u6c38\u516c\u56ed\uff0c\u6f2b\u6b65\u69d0\u835f\u6811\u4e0b\uff0c\u611f\u53d7\u8fd9\u5ea7\u57ce\u5e02\u7684\u5b5d\u7231\u5e95\u8272\u3002\u60a8\u53ef\u4ee5\u626b\u63cf\u4e0b\u65b9\u4e8c\u7ef4\u7801\u9884\u7ea6\u5168\u666f\u6f2b\u6e38\u4f53\u9a8c\u3002"}
          </p>
          <div className="inline-block p-4 bg-white rounded-2xl shadow-lg border border-border">
            <img
              src={`${import.meta.env.BASE_URL}images/qrcode-xiaozici.png`}
              alt="\u5b5d\u5b50\u7960\u5168\u666f\u6f2b\u6e38\u4e8c\u7ef4\u7801"
              className="w-36 h-36 object-contain"
            />
            <p className="text-xs text-muted-foreground mt-2">{"\u626b\u7801\u9884\u7ea6\u00b7\u5168\u666f\u6f2b\u6e38"}</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

interface StoryCardProps {
  story: typeof STORIES[number];
  isExpanded: boolean;
  isAnswerShown: boolean;
  isCheckedIn: boolean;
  onToggleExpand: () => void;
  onToggleAnswer: () => void;
  onCheckIn: () => void;
}

function StoryCard({
  story, isExpanded, isAnswerShown, isCheckedIn,
  onToggleExpand, onToggleAnswer, onCheckIn,
}: StoryCardProps) {
  return (
    <div className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">

      {/* Left national-style decorative strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-[#8B4513] to-primary/30" />

      <div className="pl-5 pr-6 pt-6 pb-5">

        {/* Seal + title row */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="shrink-0 w-11 h-11 rounded-sm bg-primary flex items-center justify-center shadow-md shadow-primary/30"
            style={{ transform: "rotate(-3deg)" }}
          >
            <span className="text-white font-serif font-bold text-xl leading-none">{story.seal}</span>
          </div>
          <div>
            <h4
              className="font-serif text-2xl font-bold text-primary leading-tight mb-0.5"
              style={{ textShadow: "1px 1px 0 rgba(200,16,46,0.12)" }}
            >
              {story.title}
            </h4>
            <p className="text-xs text-muted-foreground tracking-wider">{story.titleEn}</p>
          </div>
        </div>

        {/* Image + text */}
        <div className="flex gap-5 mb-5">
          <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-primary/15 shadow-sm">
            <img
              src={story.imageUrl}
              alt={story.imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: isExpanded ? "600px" : "6rem" }}
            >
              <p className="text-sm text-foreground/80 leading-7">{isExpanded ? story.full : story.summary}</p>
            </div>
            <button
              onClick={onToggleExpand}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/85 active:scale-95 transition-all duration-150 shadow-sm shadow-primary/30"
            >
              {isExpanded ? (<><span>&#8593;</span>{" \u6536\u8d77\u6545\u4e8b"}</>) : (<><span>&#128218;</span>{" \u67e5\u770b\u5b8c\u6574\u6545\u4e8b"}</>)}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground/60 tracking-wider">{"\u5b5d\u6587\u5316\u5c0f\u95ee\u7b54"}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Quiz */}
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <p className="text-sm font-medium text-foreground mb-3">
            <span className="inline-block w-5 h-5 bg-primary text-white text-xs font-bold rounded text-center leading-5 mr-1.5">Q</span>
            {story.quiz.q}
          </p>
          {isAnswerShown && (
            <div className="mt-2 bg-background rounded-lg p-3 border border-primary/15">
              <p className="text-xs text-muted-foreground mb-1 font-medium">{"\u7b54\u6848\uff1a"}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{story.quiz.a}</p>
            </div>
          )}
          <button
            onClick={onToggleAnswer}
            className="mt-2 text-xs text-primary hover:underline font-medium transition-colors"
          >
            {isAnswerShown ? "\u25b2 \u6536\u8d77\u7b54\u6848" : "\u25bc \u67e5\u770b\u7b54\u6848"}
          </button>
        </div>

        {/* Check-in button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onCheckIn}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              isCheckedIn
                ? "bg-[#2F4F4F] text-white shadow-md shadow-[#2F4F4F]/30"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
            }`}
          >
            {isCheckedIn ? "\u2713 \u5df2\u6253\u5361" : "\ud83d\udccc \u6211\u5df2\u5b66\u4e60"}
          </button>
        </div>
      </div>
    </div>
  );
}
