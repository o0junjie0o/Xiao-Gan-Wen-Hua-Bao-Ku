import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Palette, ShoppingBag, MapPin, Trophy, Heart } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGetPlatformStats, useListHeritageItems } from "@workspace/api-client-react";

export default function Home() {
  const { data: stats } = useGetPlatformStats();
  const { data: nationalItemsData } = useListHeritageItems({ level: "national", limit: 6 });

  // Fallback data if API is loading or not connected
  const displayStats = stats || {
    nationalItems: 6,
    provincialItems: 30,
    municipalItems: 45,
    artisanCount: 128,
  };

  const nationalItems = nationalItemsData?.items || [
    { id: 1, name: "董永传说", category: "民间文学", imageUrl: "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?auto=format&fit=crop&q=80", shortDesc: "孝文化核心IP，传颂千年的天仙配故事" },
    { id: 2, name: "孝感雕花剪纸", category: "传统美术", imageUrl: "https://images.unsplash.com/photo-1584863231364-2edc166de576?auto=format&fit=crop&q=80", shortDesc: "世界级非遗，精细入微的镂空艺术" },
    { id: 3, name: "云梦皮影戏", category: "传统戏剧", imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80", shortDesc: "光影间的千年传承，国家级皮影艺术" },
    { id: 4, name: "汉川善书", category: "曲艺", imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80", shortDesc: "劝人向善的民间说唱艺术" },
    { id: 5, name: "三节龙·跳鼓", category: "传统舞蹈", imageUrl: "https://images.unsplash.com/photo-1542640244-7e672d6cb466?auto=format&fit=crop&q=80", shortDesc: "气势磅礴的民间阵列舞蹈" },
    { id: 6, name: "楚剧", category: "传统戏剧", imageUrl: "https://images.unsplash.com/photo-1516057747705-0609711c1b31?auto=format&fit=crop&q=80", shortDesc: "地方戏曲瑰宝，唱腔悠扬婉转" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            className="w-full h-full object-cover opacity-90" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium tracking-widest">中华孝文化名城</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground tracking-widest mb-6 drop-shadow-sm">
              <span className="text-primary block mb-2">孝润千年</span> 
              <span>非遗新生</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              探索孝感6项国家级、30项省级、45项市级非物质文化遗产。
              在这里，感受指尖的技艺、舌尖的美味与千年的孝文化传承。
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/museum" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg flex items-center gap-2">
                开启数字漫游 <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/ai-studio" className="px-8 py-4 bg-card text-primary font-bold rounded-xl shadow-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-lg">
                体验 AI 文创
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative pattern bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 opacity-50 pattern-papercut"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/papercut-pattern.png)` }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<Trophy />} value={displayStats.nationalItems} label="国家级非遗" />
            <StatCard icon={<BookOpen />} value={displayStats.provincialItems} label="省级非遗" />
            <StatCard icon={<MapPin />} value={displayStats.municipalItems} label="市级非遗" />
            <StatCard icon={<Users />} value={displayStats.artisanCount} label="代表性传承人" />
          </div>
        </div>
      </section>

      {/* National Heritage Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="国宝瑰宝 · 绝代风华" 
            subtitle="National Intangible Heritage"
          >
            孝感独有的6项国家级非物质文化遗产，承载着这座城市最深厚的文化底蕴与艺术造诣。
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nationalItems.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-primary/10"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg">
                      国家级
                    </span>
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-10 right-6 w-12 h-12 bg-accent rounded-full border-4 border-card flex items-center justify-center text-accent-foreground shadow-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-accent tracking-wider mb-2">{item.category}</div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{item.shortDesc}</p>
                  
                  <Link href={`/museum?id=${item.id}`} className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:gap-3 transition-all">
                    了解更多 <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/museum" className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all">
              浏览全部非遗名录
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/papercut-pattern.png)`, backgroundSize: '400px' }} />
        
        <div className="container relative z-10 mx-auto px-4">
          <SectionHeading title="沉浸式数字体验" subtitle="Digital Experience" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickLinkCard 
              href="/artisans"
              icon={<Users className="w-8 h-8" />}
              title="大匠风范"
              desc="走近非遗传承人，预约线下体验与定制服务"
              color="bg-orange-50 text-orange-600 border-orange-200 hover:border-orange-500"
            />
            <QuickLinkCard 
              href="/ai-studio"
              icon={<Palette className="w-8 h-8" />}
              title="AI 文创工坊"
              desc="一键生成专属孝感风格的非遗数字文创"
              color="bg-primary/5 text-primary border-primary/20 hover:border-primary"
            />
            <QuickLinkCard 
              href="/quiz"
              icon={<Trophy className="w-8 h-8" />}
              title="知识闯关"
              desc="趣味答题挑战，赢取非遗体验券与文创礼品"
              color="bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-500"
            />
            <QuickLinkCard 
              href="/market"
              icon={<ShoppingBag className="w-8 h-8" />}
              title="文创市集"
              desc="选购大师手作与创意青年设计的非遗良品"
              color="bg-green-50 text-green-700 border-green-200 hover:border-green-600"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="text-4xl font-serif font-bold text-foreground mb-2">{value}</div>
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

function QuickLinkCard({ href, icon, title, desc, color }: { href: string, icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <Link href={href}>
      <div className={`p-8 rounded-2xl border-2 transition-all duration-300 h-full hover:shadow-xl hover:-translate-y-1 ${color} group`}>
        <div className="mb-6 transform group-hover:scale-110 transition-transform origin-left">{icon}</div>
        <h3 className="text-xl font-bold font-serif mb-3">{title}</h3>
        <p className="text-sm opacity-80 leading-relaxed">{desc}</p>
        <div className="mt-6 flex items-center gap-2 font-bold text-sm">
          进入体验 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
