import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useListHeritageItems } from "@workspace/api-client-react";
import { Search, Map, Utensils, Scissors, Users } from "lucide-react";
import { clsx } from "clsx";

export default function Museum() {
  const [activeLevel, setActiveLevel] = useState<string>("all");
  const { data, isLoading } = useListHeritageItems({ limit: 50 });

  const categories = [
    { id: "taste", name: "舌尖上的孝感", icon: <Utensils className="w-5 h-5" />, desc: "麻糖、米酒、云梦鱼面等美食非遗" },
    { id: "craft", name: "指尖上的孝感", icon: <Scissors className="w-5 h-5" />, desc: "雕花剪纸、应城膏雕、安陆木雕" },
    { id: "folk", name: "民俗里的孝感", icon: <Users className="w-5 h-5" />, desc: "董永传说、皮影戏、高龙旱船" },
  ];

  // Mock data if API fails or returns empty
  const items = data?.items || [
    { id: 1, name: "孝感雕花剪纸", level: "national", category: "指尖上的孝感", imageUrl: "https://images.unsplash.com/photo-1584863231364-2edc166de576?auto=format&fit=crop&q=80", shortDesc: "以刻刀代剪的精湛技艺" },
    { id: 2, name: "孝感麻糖制作技艺", level: "provincial", category: "舌尖上的孝感", imageUrl: "https://images.unsplash.com/photo-1624462966581-1e5638c11eb5?auto=format&fit=crop&q=80", shortDesc: "形似梳子，色白如霜，香甜薄脆" },
    { id: 3, name: "云梦皮影戏", level: "national", category: "民俗里的孝感", imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80", shortDesc: "一张牛皮道尽千古事" },
    { id: 4, name: "应城膏雕", level: "provincial", category: "指尖上的孝感", imageUrl: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80", shortDesc: "以纤维石膏为原料的独特雕刻" },
    { id: 5, name: "董永传说", level: "national", category: "民俗里的孝感", imageUrl: "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?auto=format&fit=crop&q=80", shortDesc: "卖身葬父，天仙绝配" },
    { id: 6, name: "云梦鱼面", level: "provincial", category: "舌尖上的孝感", imageUrl: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80", shortDesc: "面中有鱼，鱼中有面" },
  ];

  const filteredItems = activeLevel === "all" ? items : items.filter(i => i.level === activeLevel);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="孝感非遗数字馆" subtitle="Digital Museum" />
          
          {/* Main Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-background border border-border p-6 rounded-2xl hover:border-primary hover:shadow-lg transition-all text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-serif font-bold text-xl mb-2">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-card p-1 rounded-xl shadow-sm border border-border">
            {[
              { id: "all", label: "全部非遗" },
              { id: "national", label: "国家级" },
              { id: "provincial", label: "省级" },
              { id: "municipal", label: "市级" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveLevel(tab.id)}
                className={clsx(
                  "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
                  activeLevel === tab.id 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-foreground hover:bg-muted"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="搜索非遗项目..." 
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={clsx(
                      "px-2.5 py-1 text-xs font-bold rounded-md shadow-sm",
                      item.level === "national" ? "bg-primary text-white" :
                      item.level === "provincial" ? "bg-accent text-white" :
                      "bg-secondary text-secondary-foreground"
                    )}>
                      {item.level === "national" ? "国家级" : item.level === "provincial" ? "省级" : "市级"}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="text-xs text-primary font-bold mb-2">{item.category}</div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{item.shortDesc}</p>
                  <button className="w-full py-2.5 bg-background border border-border hover:border-primary hover:text-primary rounded-xl text-sm font-medium transition-colors">
                    查看详情
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
