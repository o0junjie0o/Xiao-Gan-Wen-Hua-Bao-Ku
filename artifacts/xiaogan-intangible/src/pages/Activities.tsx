import { SectionHeading } from "@/components/ui/SectionHeading";
import { Calendar, MapPin, Users } from "lucide-react";

export default function Activities() {
  const activities = [
    {
      id: 1,
      title: "2024 孝感非遗年货节",
      date: "2024-01-25 至 2024-02-15",
      location: "孝感市文化中心广场",
      status: "ongoing",
      img: "https://images.unsplash.com/photo-1542640244-7e672d6cb466?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "秦礼刚皮影艺术进校园展演",
      date: "2024-03-10 14:00",
      location: "湖北工程学院大礼堂",
      status: "upcoming",
      img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "周末传习所：剪纸亲子体验课",
      date: "2024-03-15 09:30",
      location: "孝感市群众艺术馆非遗保护中心",
      status: "upcoming",
      img: "https://images.unsplash.com/photo-1584863231364-2edc166de576?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-16">
        <SectionHeading title="线下活动中心" subtitle="Events & Activities" align="left">
          将线上的热爱转化为线下的相遇。参与非遗大集、大师讲堂、亲子体验课，亲身感受传统文化的温度。
        </SectionHeading>

        <div className="flex flex-col gap-6">
          {activities.map((act) => (
            <div key={act.id} className="flex flex-col md:flex-row bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="md:w-1/3 xl:w-1/4">
                <img src={act.img} alt={act.title} className="w-full h-48 md:h-full object-cover" />
              </div>
              <div className="p-6 md:w-2/3 xl:w-3/4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${act.status === 'ongoing' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {act.status === 'ongoing' ? '进行中' : '即将开始'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{act.title}</h3>
                  
                  <div className="space-y-2 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary/60" /> {act.date}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary/60" /> {act.location}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary/60" /> 名额限制: 50人 (已报23人)</div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
                    立即报名
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
