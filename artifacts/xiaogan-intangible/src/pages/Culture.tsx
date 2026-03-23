import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Culture() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative pt-24 pb-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <SectionHeading title="孝文化专题馆" subtitle="Xiao Culture Hall">
            孝感，因东汉董永卖身葬父，行孝感天动地而得名。这里是全国唯一一座以“孝”命名的地级市。
          </SectionHeading>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="prose prose-lg prose-rose mx-auto max-w-none">
          <p className="lead text-xl text-muted-foreground font-medium mb-12 text-center">
            “孝润千年，非遗新生”。孝文化不仅是孝感的城市灵魂，更是深深烙印在孝感各项非物质文化遗产中的核心基因。
          </p>
          
          <div className="my-16 rounded-3xl overflow-hidden shadow-2xl border-4 border-card relative">
            <img src={`${import.meta.env.BASE_URL}images/dongyong-story.png`} alt="Dong Yong Story" className="w-full object-cover aspect-video" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <h3 className="text-3xl font-serif font-bold text-white m-0">董永与七仙女：传颂千年的天仙配</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h4 className="font-serif text-2xl text-primary font-bold mb-4">董永卖身葬父</h4>
              <p className="text-foreground/80 leading-relaxed">
                汉代董永，千乘人。少失母，独养父，尽力农桑，行迷鹿车。父亡，无以葬，乃自卖为奴，以供丧事。主人知其贤，与钱一万，遣之。董永行三年丧毕，欲还主人，供其奴职。道逢一妇人曰：“愿为子妻。”遂与之俱。
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h4 className="font-serif text-2xl text-primary font-bold mb-4">黄香温席</h4>
              <p className="text-foreground/80 leading-relaxed">
                东汉黄香，江夏安陆（今属孝感）人。年九岁，失母，思慕惟悴，乡人称其孝。香知事亲之理，冬月温衾以待父休，夏月扇席以清暑气。太守刘护表而异之，后召拜郎中。
              </p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="font-serif text-3xl font-bold mb-8">寻迹·孝子祠</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              欢迎亲临孝感董永公园，漫步槐荫树下，感受这座城市的孝爱底色。您可以扫描下方二维码预约全景漫游体验。
            </p>
            <div className="inline-block p-4 bg-white rounded-xl shadow-md border border-border">
              <div className="w-32 h-32 bg-gray-200 border-2 border-dashed flex items-center justify-center text-sm text-gray-500">
                [ 展厅二维码 ]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
