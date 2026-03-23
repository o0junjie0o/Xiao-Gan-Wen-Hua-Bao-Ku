import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useGetHeritageItem, useListArtisans } from "@workspace/api-client-react";
import { ArrowLeft, MapPin, Calendar, Users, Tag, Star, BookOpen, PlayCircle } from "lucide-react";
import { clsx } from "clsx";
import MainLayout from "@/components/layout/MainLayout";

const levelLabel: Record<string, string> = {
  national: "国家级",
  provincial: "省级",
  municipal: "市级",
};

const levelColor: Record<string, string> = {
  national: "bg-primary text-white",
  provincial: "bg-[#8B4513] text-white",
  municipal: "bg-[#2F4F4F] text-white",
};

export default function HeritageDetail() {
  const [, params] = useRoute("/museum/:id");
  const id = Number(params?.id);

  const { data: item, isLoading } = useGetHeritageItem(id);
  const { data: artisansData } = useListArtisans({ limit: 20 });

  const relatedArtisans = artisansData?.artisans?.filter(
    (a) => a.heritageItemId === id
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-muted-foreground">未找到该非遗项目</p>
        <Link href="/museum" className="text-primary hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> 返回数字馆
        </Link>
      </div>
    );
  }

  const tags: string[] = Array.isArray(item.tags) ? item.tags as string[] : [];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Banner */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 container mx-auto">
          <Link
            href="/museum"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回非遗数字馆
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={clsx("px-3 py-1 text-sm font-bold rounded-md", levelColor[item.level] || "bg-gray-500 text-white")}>
                {levelLabel[item.level] || item.level}非遗
              </span>
              <span className="px-3 py-1 text-sm font-medium rounded-md bg-white/20 text-white backdrop-blur-sm">
                {item.category}
              </span>
              {item.xiaoTheme && (
                <span className="px-3 py-1 text-sm font-bold rounded-md bg-amber-500/90 text-white">
                  ❤ 孝文化
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">{item.name}</h1>
            {item.nameEn && (
              <p className="text-white/70 text-lg tracking-widest">{item.nameEn}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {item.origin && (
              <div className="py-5 px-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">发源地</p>
                  <p className="font-semibold text-sm">{item.origin}</p>
                </div>
              </div>
            )}
            {item.yearListed && (
              <div className="py-5 px-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">入选年份</p>
                  <p className="font-semibold text-sm">{item.yearListed} 年</p>
                </div>
              </div>
            )}
            {(item.artisanCount !== null && item.artisanCount !== undefined) && (
              <div className="py-5 px-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">传承人数</p>
                  <p className="font-semibold text-sm">{item.artisanCount} 位</p>
                </div>
              </div>
            )}
            <div className="py-5 px-4 flex items-center gap-3">
              <Star className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">保护级别</p>
                <p className="font-semibold text-sm">{levelLabel[item.level] || item.level}非物质文化遗产</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Main Description */}
        <div className="lg:col-span-2 space-y-10">
          {/* 项目简介 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif font-bold">项目简介</h2>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <p className="text-base leading-relaxed text-foreground/80 whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </motion.section>

          {/* 文化价值 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif font-bold">文化价值</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "历史传承", desc: "植根于孝感本土文化，跨越世代传承，是地域文化记忆的活态载体。" },
                { title: "艺术价值", desc: "集中体现了孝感劳动人民的智慧与审美，具有极高的艺术研究与欣赏价值。" },
                { title: "社会功能", desc: "在岁时节令、人生礼仪中发挥重要作用，凝聚社区情感与文化认同。" },
                { title: "传承意义", desc: "作为非物质文化遗产，其保护与传承对维护文化多样性具有重要意义。" },
              ].map((v) => (
                <div key={v.title} className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <h3 className="font-semibold">{v.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 视频展示（演示区）*/}
          {item.videoUrl && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <PlayCircle className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif font-bold">视频展示</h2>
              </div>
              <div className="bg-card rounded-2xl border border-border overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PlayCircle className="w-16 h-16 mx-auto mb-3 text-primary/40" />
                  <p className="text-sm">视频内容即将上线</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* 相关传承人 */}
          {relatedArtisans.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif font-bold">相关传承人</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArtisans.map((a) => (
                  <div key={a.id} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
                    <img src={a.avatarUrl} alt={a.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                    <div>
                      <p className="font-bold text-base">{a.name}</p>
                      <p className="text-xs text-primary font-medium">{a.level}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.heritageItem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* 标签 */}
          {tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-primary" />
                <h3 className="font-bold">标签</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* 预约体验 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white"
          >
            <h3 className="text-lg font-bold mb-2">体验传承</h3>
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              预约线下体验课，亲身感受{item.name}的技艺魅力，带走属于自己的非遗作品。
            </p>
            <Link
              href="/artisans"
              className="block text-center bg-white text-primary font-bold py-2.5 rounded-xl hover:bg-white/90 transition-colors text-sm"
            >
              预约体验课程
            </Link>
          </motion.div>

          {/* AI文创 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <h3 className="font-bold mb-2">✨ AI文创生成</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              以{item.name}为灵感，用AI生成专属文创设计作品。
            </p>
            <Link
              href="/ai-studio"
              className="block text-center bg-foreground text-background font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              前往AI工坊
            </Link>
          </motion.div>

          {/* 相关文创 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <h3 className="font-bold mb-2">🛍️ 相关文创产品</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              探索与{item.name}相关的手艺人原创作品与非遗文创商品。
            </p>
            <Link
              href="/market"
              className="block text-center border border-border hover:border-primary hover:text-primary font-medium py-2.5 rounded-xl transition-colors text-sm"
            >
              逛文创市集
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
