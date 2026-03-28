import { useState, useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const QUOTES = [
  {
    text: "\u767E\u5584\u5B5D\u4E3A\u5148\uff0c\u4E07\u6076\u6deb\u4e3a\u9996\u3002",
    source: "\u300a\u56f4\u7089\u591c\u8bdd\u300b",
  },
  {
    text: "\u6811\u6b32\u9759\u800c\u98ce\u4e0d\u6b62\uff0c\u5b50\u6b32\u517b\u800c\u4eb2\u4e0d\u5f85\u3002",
    source:
      "\u300a\u6c49\u00b7\u97e9\u5a74\u00b7\u97e9\u8bd7\u5916\u4f20\u300b",
  },
  {
    text: "\u5b5d\u5b50\u4e4b\u4e8b\u4eb2\u4e5f\uff0c\u5c45\u5219\u81f4\u5176\u656c\uff0c\u517b\u5219\u81f4\u5176\u4e50\uff0c\u75c5\u5219\u81f4\u5176\u5fe7\u3002",
    source: "\u300a\u8bba\u8bed\u00b7\u4e3a\u653f\u300b",
  },
  {
    text: "\u7236\u6bcd\u8005\uff0c\u4eba\u4e4b\u672c\u4e5f\u3002",
    source:
      "\u300a\u53f2\u8bb0\u00b7\u5c48\u539f\u8d3e\u751f\u5217\u4f20\u300b",
  },
];

const STORIES = [
  {
    id: "dongyong",
    seal: "孝",
    title: "董永卖身葬父",
    titleEn: "Dong Yong\u2019s Filial Sacrifice",
    imageUrl:
      "https://ts1.tc.mm.bing.net/th/id/R-C.823ed24d1b9360dcd84bf8ef01fe97d6?rik=MLupodCbPx0pTg&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20200711ac%2f652%2fw400h252%2f20200711%2fc779-iwhseit4064801.jpg&ehk=oauwCZ7ov6vhrzTPU6lS1wg6Tv5qSccfMv%2fqnA7xsPg%3d&risl=&pid=ImgRaw&r=0",
    imageAlt: "孝感雕花剪纸·董永传说",
    summary:
      "汉代董永，千乘人。少失母，独养父，尽力农桑，行迷鹿车……",
    full: "汉代董永，千乘人。少失母，独养父，尽力农桑，行迷鹿车。父亡，无以葬，乃自卖为奴，以供丧事。主人知其贤，与钱一万，遣之。董永行三年丧毕，欲还主人，供其奴职。道逢一妇人曰：【愿为子妻】。遂与之俱。主人谓董永曰：【以钱与汝矣，汝何以来？】永曰：【以供父丧，父丧既毕，当还供职。】主人曰：【妇人何能？】永曰：【能织】主人曰：【若尔，但令织纨百匹】于是永妻为主人家织，十日而毕。织讫，此妇谓永曰：【我，天之织女也。天帝哀君至孝，使我助君偿债耳】语毕，凌空而去，不知所在。",
    quiz: {
      q: "董永卖身葬父是为了什么？",
      a: "父亲去世后家贫无力安葬，董永将自己卖为奴仆以获得钱款，为父亲操办丧事，体现了对父亲深厚的孝心。",
    },
  },
  {
    id: "huangxiang",
    seal: "孝",
    title: "黄香温席",
    titleEn: "Huang Xiang Warms the Bed",
    imageUrl: "https://pic.616pic.com/ys_bnew_img/00/35/48/ASk8dYNW49.jpg",
    imageAlt: "孝文化·黄香温席",
    summary:
      "东汉黄香，江夏安陆（今属孝感）人。年九岁，失母，思慕惟怆……",
    full: "东汉黄香，江夏安陆（今属孝感）人。年九岁，失母，思慕惟怆，乡人称其孝。香知事亲之理，冬月温席以待父休，夏月扇席以清暑气。太守刘护表而异之，后召拜郎中。黄香以孝闻名，传誉乡里，其事迹被收入《二十四孝》，成为中国孝文化的经典象征之一。孝感安陆至今仍保存有黄香墓，供后人凭吊。",
    quiz: {
      q: "黄香在冬天和夏天分别是怎样孝敬父亲的？",
      a: "冬天，黄香先用自己的体温把父亲的被褥暖热再请父亲入睡（温席）；夏天，他用扇子扇凉席子驱走暑气再请父亲就寝（扇席）。",
    },
  },
  {
    id: "shun",
    seal: "孝",
    title: "孝感动天",
    titleEn: "Shun\u2019s Filial Piety Moves Heaven",
    imageUrl:
      "https://ts1.tc.mm.bing.net/th/id/R-C.fc5c7f55ade7f14e87dd08e3e1a2aee1?rik=Uk8QQSMjU0gCwg&riu=http%3a%2f%2fwww.renjian100.com%2fwordpress%2fwp-content%2fuploads%2f2019%2f03%2f2-134.jpg&ehk=bSmAkJd5Gv1fH1axVAtNwp5j2Z5yVoOjdg3MX4zJ7oM%3d&risl=&pid=ImgRaw&r=0",
    imageAlt: "孝感动天·虞舜耕田",
    summary:
      "远古时期，舜的父亲愚顽，继母凶悍，弟弟傲慢，屡次谋害舜，舜却仍以孝道侍奉父母……",
    full: "远古时期，舜的父亲愚顽，继母凶悍，弟弟傲慢，屡次谋害舜，舜却仍以孝道侍奉父母，以友爱对待弟弟。他到历山耕田，感动了大象帮他翻土耕地，小鸟帮他除草；他在雷泽捕鱼，感动了当地渔民。尧帝闻其贤德，将两个女儿嫁给他，后禅位于他，成为一代贤君。后人赞曰：队队春耕象，纷纷耘草禽。嗣尧登宝位，孝感动天心。",
    quiz: {
      q: "舜在历山耕田时感动了哪些动物来帮助他？",
      a: "舜以他的孝心感动了大象帮他翻土耕地，小鸟帮他除草，是孝道感天动地的典型故事。",
    },
  },
  {
    id: "hanwendi",
    seal: "孝",
    title: "亲尝汤药",
    titleEn: "Emperor Wen Tastes Medicine Himself",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/pZA8X45i6Z.jpg",
    imageAlt: "汉文帝亲尝汤药",
    summary:
      "汉文帝刘恒，以仁孝之名闻于天下，侍奉母亲薄太后极为用心。母亲卧病三年……",
    full: "汉文帝刘恒，以仁孝之名闻于天下，侍奉母亲薄太后极为用心。母亲卧病三年，他常常衣不解带，目不交睫，亲自照看母亲。每次煎好汤药，他必先亲口尝试，确认药温适宜、无误之后，才端送给母亲服用。后人赞曰：仁孝临天下，巍巍冠百王。莫庭事贤母，汤药必先尝。",
    quiz: {
      q: "汉文帝每次喂母亲汤药前会做什么？",
      a: "汉文帝每次煎好汤药后，都会先亲口尝一尝，确认药的温度适宜、味道无误之后，才放心地端给母亲服用，体现了他无微不至的孝心。",
    },
  },
  {
    id: "zengshen",
    seal: "孝",
    title: "啮指痛心",
    titleEn: "Zeng Shen Feels Pain at Bitten Finger",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/GCR27F6W5G.jpg",
    imageAlt: "曾参啮指痛心",
    summary:
      "春秋时期，曾参入山打柴，家中来了客人，其母不知如何处理……",
    full: "春秋时期，曾参入山打柴，家中来了客人，其母不知如何是好，便用牙咬自己的手指。曾参忽然觉得心疼，知道母亲在呼唤自己，赶紧背柴返家，跪问缘故。母亲说：有客人忽然到来，我咬手指盼你回来。后人赞曰：母指才方啮，儿心痛不禁。负薪归未晚，骨肉各天心。",
    quiz: {
      q: "曾参在山中突然心痛是什么原因？",
      a: "曾参与母亲心灵相通，母亲因家中来客无法应对而咬手指，曾参在山中突然感到心痛，便知母亲在呼唤自己，立即赶回家中，体现了孝子与母亲的深厚感情。",
    },
  },
  {
    id: "zilu",
    seal: "孝",
    title: "百里负米",
    titleEn: "Zilu Carries Rice a Hundred Li",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/bMi5N6d15k.jpg",
    imageAlt: "子路百里负米",
    summary:
      "周朝时期，仲由字子路，家境贫寒，亲嗜米食，为让父母吃到米饭……",
    full: "周朝时期，仲由字子路，家境贫寒，亲嗜米食。子路为让父母吃到米饭，常常翻越百里山路，亲自背负米回家。后来子路做了大官，父母已相继去世，他感叹道：现在想再为父母负米百里，也做不到了。后人赞曰：负米供甘旨，宁辞百里遥。身荣亲已没，犹念旧劬劳。",
    quiz: {
      q: "子路在父母去世后为何感到遗憾？",
      a: "子路当年家贫，不惜翻越百里山路背米回家供养父母。后来他做了大官，生活富裕了，却再也没有机会为父母背米尽孝，因此感慨万千，悔恨不已。",
    },
  },
  {
    id: "minsun",
    seal: "孝",
    title: "芦衣顺母",
    titleEn: "Min Sun Wears Reed Coat to Please Mother",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/n8kLPh0t9U.jpg",
    imageAlt: "闵损芦衣顺母",
    summary:
      "春秋时期，闵损生母早逝，父亲续娶，继母偏待亲生二子，给闵损穿芦花絮衣……",
    full: "春秋时期，闵损生母早逝，父亲续娶，继母偏待亲生二子，给闵损穿芦花絮衣。一次父亲出行让闵损驾车，闵损因寒冷无力控缰。父察知实情，欲休妻，闵损跪地哀求道：母在一子寒，母去三子单。其孝顺继母之情感动邻里。后人赞曰：闵氏有贤郎，何曾怨晚娘。尊前贤母在，三子免风霜。",
    quiz: {
      q: "闵损为什么阻止父亲休掉继母？",
      a: "闵损说母在一子寒，母去三子单，意思是继母在家只是他一人受苦，如果继母离开，三个孩子就都没有了母亲的照顾。他以宽容和孝道化解了家庭矛盾。",
    },
  },
  {
    id: "tanzi",
    seal: "孝",
    title: "鹿乳奉亲",
    titleEn: "Tan Zi Brings Deer Milk for Parents",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/NnVHQxJ67A.jpg",
    imageAlt: "郯子鹿乳奉亲",
    summary:
      "春秋时期，郯子之父母年老，双目俱患眼疾，需要鹿乳治疗……",
    full: "春秋时期，郯子之父母年老，双目俱患眼疾，需要鹿乳治疗。郯子为求鹿乳，披上鹿皮，混入鹿群之中取鹿乳。一次，猎人见鹿群中有异动，正欲射箭，郯子急忙取下鹿皮说明来意，猎人感叹其孝，放他离去。后人赞曰：亲老思鹿乳，身披鹿皮衣。若不高声语，山中带箭归。",
    quiz: {
      q: "郯子为获取鹿乳想出了什么办法？",
      a: "郯子披上鹿皮，混入鹿群之中，以此接近母鹿获取鹿乳，来为双目患病的父母治眼疾，展现了为父母求医问药不惜一切的孝心。",
    },
  },
  {
    id: "laolaizi",
    seal: "孝",
    title: "戏彩娱亲",
    titleEn: "Lao Laizi Dresses Colorfully to Amuse Parents",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/cUrC5BCL7n.jpg",
    imageAlt: "老莱子戏彩娱亲",
    summary:
      "春秋时期，楚国老莱子，极为孝顺，奉养二亲，事无巨细皆亲力亲为……",
    full: "春秋时期，楚国老莱子，极为孝顺，奉养二亲，事无巨细皆亲力亲为。为使父母开心，他虽已年逾七十，仍常穿五彩斑斓的衣服，手持拨浪鼓，在父母面前嬉笑打诨，如同孩童一般。一次端水不小心跌倒，为免父母担心，他便在地上学孩童哭声，引父母发笑。后人赞曰：戏舞学娇痴，春风动彩衣。双亲开口笑，掌上弄婴儿。",
    quiz: {
      q: "老莱子七十多岁还做哪些事情来逗父母开心？",
      a: "老莱子虽然年逾七十，却穿着五彩衣服，拿着拨浪鼓在父母面前学孩童玩耍。跌倒时故意学婴儿啼哭，让父母开怀大笑，以此减轻父母担忧，让他们心情愉快。",
    },
  },
  {
    id: "dinglan",
    seal: "孝",
    title: "刻木事亲",
    titleEn: "Ding Lan Carves Wooden Statues of Parents",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/MiICpU7z89.jpg",
    imageAlt: "丁兰刻木事亲",
    summary:
      "东汉时期，丁兰幼年父母双亡，无缘尽孝。他思念父母，用木头刻成双亲像……",
    full: "东汉时期，丁兰幼年父母双亡，无缘尽孝。他思念父母，用木头刻成双亲像，供奉于堂，每天三餐前必先请示，出门回家必先禀告，仿若父母仍在世一般。邻居张叔无礼，持杖击伤木像，丁兰愤而将其打伤。此举虽违律，官府深感其孝，从宽处理。后人赞曰：刻木为父母，形容在日时。寄言诸子侄，各要孝亲闱。",
    quiz: {
      q: "丁兰父母去世后，他是如何寄托思念的？",
      a: "丁兰用木头刻成父母的形象，供奉在堂上，每天进餐前先向木像禀报，出门回家也要向木像致告，以此表达对已故父母的思念和敬爱之情。",
    },
  },
  {
    id: "jiangshi",
    seal: "孝",
    title: "涌泉跃鲤",
    titleEn: "Jiang Shi's Spring Yields Leaping Carp",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/T0j18Ld6y9.jpg",
    imageAlt: "姜诗涌泉跃鲤",
    summary:
      "东汉时期，姜诗事母极孝，其妻亦孝顺。母爱鲜鱼和喝江水，姜诗夫妇每日去数里外江中取水……",
    full: "东汉时期，姜诗事母极孝，其妻亦孝顺。母爱鲜鱼和喝江水，姜诗夫妇每日去数里外江中取水做鱼汤。一日妻子取水迟归，姜诗误解将妻逐出，妻在邻居家编织为生，每日仍送食物给婆婆。后来真相大白，婆婆感动，夫妻和好。此后家中忽涌出泉水，每日跃出两条鲤鱼，以供母食。后人赞曰：母好鱼鲤食，夫妇取江行。舍旁涌清泉，跃鲤报孝诚。",
    quiz: {
      q: "姜诗家门前为什么会涌出泉水并跳出鲤鱼？",
      a: "这是上天对姜诗夫妇孝道的嘉奖。因为姜诗夫妇长期为母亲不辞辛劳地远取江水、捕鱼供母，感动了上苍，因此家门前涌出清泉，并且每日都有鲤鱼跃出，方便他们奉养母亲。",
    },
  },
  {
    id: "luji",
    seal: "孝",
    title: "怀橘遗亲",
    titleEn: "Lu Ji Hides Oranges for His Mother",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/4xCbM7E9z0.jpg",
    imageAlt: "陆绩怀橘遗亲",
    summary:
      "三国时期，陆绩六岁时随父亲到袁术处做客，袁术拿出橘子招待……",
    full: "三国时期，陆绩六岁时随父亲到袁术处做客，袁术拿出橘子招待。陆绩吃了橘子，趁人不注意，将三个橘子藏入怀中。临别时，橘子滚落在地，袁术笑问：陆郎为客，怀橘归遗，是何意也？陆绩跪答：吾母性之所爱，欲归以遗母也。袁术深为感叹。后人赞曰：孝悌皆天性，人间六岁儿。袖中怀绿橘，遗母报春晖。",
    quiz: {
      q: "陆绩在宴席上偷偷藏橘子是为了什么？",
      a: "陆绩将橘子藏在怀中，是想带回去给母亲吃，因为母亲喜欢吃橘子。这个发生在六岁孩童身上的故事，展现了童年时期就有如此孝心实属难得。",
    },
  },
  {
    id: "jiangge",
    seal: "孝",
    title: "行佣供母",
    titleEn: "Jiang Ge Works as Laborer to Support Mother",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/jt5Z3JT6tq.jpg",
    imageAlt: "江革行佣供母",
    summary:
      "东汉时期，江革少年丧父，战乱中背负母亲逃难，数遇盗贼……",
    full: "东汉时期，江革少年丧父，战乱中背负母亲逃难，数遇盗贼。贼欲杀之，他哭求说：老母在背，杀我则老母无人奉养。贼心动而释之。后来他租田供母，因家贫无牛，自己充当耕牛拉犁。邻里称赞他，官府多次征辟为官，他皆以母老为由推辞。后人赞曰：负母逃危难，穷途贼犯频。哀求保母命，危困见天心。",
    quiz: {
      q: "江革遇到盗贼时用什么方法保住了自己和母亲的性命？",
      a: "江革向盗贼哀求，说母亲在背上，如果杀死他，老母亲便无人奉养，以此打动了盗贼恻隐之心，使盗贼放走了他们母子。",
    },
  },
  {
    id: "wangpou",
    seal: "孝",
    title: "闻雷泣墓",
    titleEn: "Wang Pou Weeps at Mother's Grave Upon Thunder",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/8FcAT3U3iV.jpg",
    imageAlt: "王裒闻雷泣墓",
    summary:
      "魏晋时期，王裒之母生前惧雷，死后葬于山林。每逢雷雨……",
    full: "魏晋时期，王裒之母生前惧雷，死后葬于山林。每逢雷雨天，王裒必奔到母亲墓前，跪下安慰说：儿在此，母亲不要害怕。历经多年，从未间断。他读《诗经》讲到哀哀父母，生我劬劳时，必掩卷痛哭，学者传为美谈。后人赞曰：慈母怕闻雷，冰魂宿夜台。阿香时一震，到墓绕千回。",
    quiz: {
      q: "王裒每次听到雷声都会做什么？",
      a: "王裒的母亲生前非常怕雷，去世后每当打雷下雨，王裒就会立刻跑到母亲的坟墓前，跪下来对着墓碑说儿子在这里，母亲不要害怕，以此安慰母亲的在天之灵。",
    },
  },
  {
    id: "mengzong",
    seal: "孝",
    title: "哭竹生笋",
    titleEn: "Meng Zong's Tears Grow Bamboo Shoots",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/BoM97tYL0P.jpg",
    imageAlt: "孟宗哭竹生笋",
    summary:
      "三国时期，江夏人孟宗，少年丧父，事母至孝。母患重病，想吃竹笋……",
    full: "三国时期，江夏人孟宗，少年丧父，事母至孝。母患重病，想吃竹笋做汤，时值严冬，笋不生长。孟宗无计可施，奔入竹林，跪倒在地，抱竹痛哭，哀求上苍怜悯。哭毕，只见地上裂出数茎新笋。孟宗大喜，带回做汤，母亲服后病愈。后人赞曰：泪滴朔风寒，萧萧竹数竿。须臾冬笋出，天意感孝端。",
    quiz: {
      q: "孟宗在严冬去竹林是为了什么？结果如何？",
      a: "孟宗的母亲重病时想喝竹笋汤，但当时是严冬没有笋。孟宗抱着竹子痛哭，他的孝心感动了上苍，竹林中冬笋破土而出，孟宗采回做汤，母亲喝了之后病也好了。",
    },
  },
  {
    id: "wangxiang",
    seal: "孝",
    title: "卧冰求鲤",
    titleEn: "Wang Xiang Lies on Ice to Seek Carp",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/JfMvxKe4s9.jpg",
    imageAlt: "王祥卧冰求鲤",
    summary:
      "晋朝时期，王祥继母朱氏不慈，数次在父亲面前说王祥坏话……",
    full: "晋朝时期，王祥继母朱氏不慈，数次在父亲面前说王祥坏话，但王祥仍尽力奉养。继母病重，欲食鲜鱼，时值寒冬，河水冻结。王祥解开衣服，卧在冰上，以体温融冰，祈求得鱼。忽然冰自行开裂，跃出两条鲤鱼，王祥带回供继母食用，继母病愈。后人赞曰：继母人间有，王祥天下无。至今河水上，一片卧冰模。",
    quiz: {
      q: "王祥在寒冬如何获取鱼来给生病的继母吃？",
      a: "王祥在数九寒冬，脱去棉衣，用自己的体温卧在冰面上融化河冰，以诚心感动天地，河冰自动裂开，跃出了两条鲤鱼，王祥便带回来给继母食用，继母病愈。",
    },
  },
  {
    id: "yangxiang",
    seal: "孝",
    title: "扼虎救父",
    titleEn: "Yang Xiang Strangles Tiger to Save Father",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/aIyN7vG6eL.jpg",
    imageAlt: "杨香扼虎救父",
    summary:
      "晋朝时期，杨香十四岁，随父亲去田间割禾，忽然一只猛虎扑向父亲……",
    full: "晋朝时期，杨香十四岁，随父亲去田间割禾，忽然一只猛虎扑向父亲，把父亲拖走。杨香手无寸铁，全不顾自身安危，猛扑上去，用双手死死掐住老虎的脖子，使出全身力气，老虎终于将父亲放开，父亲得救。后人赞曰：深山逢白额，努力搏腥风。父子俱无恙，脱身虎口中。",
    quiz: {
      q: "杨香在什么情况下徒手与老虎搏斗？",
      a: "杨香年仅十四岁，随父亲去田间干活时，突然一只猛虎扑向父亲将其拖走。杨香手无任何武器，完全不顾个人安危，直接扑上去用双手掐住老虎脖子，直到老虎松口放开父亲，救出了父亲。",
    },
  },
  {
    id: "wumeng",
    seal: "孝",
    title: "恣蚊饱血",
    titleEn: "Wu Meng Lets Mosquitoes Feed on His Blood",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/mEp5KHsv3R.jpg",
    imageAlt: "吴猛恣蚊饱血",
    summary:
      "晋朝时期，濮阳人吴猛，八岁时就知孝敬父母。家境贫寒，未能得蚊帐……",
    full: "晋朝时期，濮阳人吴猛，八岁时就知孝敬父母。家境贫寒，未能得蚊帐，蚊虫肆虐。夏夜，吴猛不驱蚊子，任凭蚊子在自己身上叮咬吸血，只为不让蚊子去骚扰父亲安睡。后来吴猛学道，成为著名道士。后人赞曰：夏夜无帷帐，蚊多不敢挥。恣渠膏血饱，免使入亲帏。",
    quiz: {
      q: "吴猛八岁时夏夜是怎么保护父亲不被蚊子叮咬的？",
      a: "吴猛在没有蚊帐的夏夜，不驱赶蚊子，让蚊子在自己身上随意叮咬吸血，这样蚊子吃饱了就不会再去骚扰父亲，让父亲能够安然入睡，体现了年幼就有深厚孝心。",
    },
  },
  {
    id: "yuqianlou",
    seal: "孝",
    title: "尝粪忧心",
    titleEn: "Yu Qianlou Tastes Excrement Out of Worry",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/3T0q9Bf6bO.jpg",
    imageAlt: "庾黔娄尝粪忧心",
    summary:
      "南齐时期，庾黔娄任县令，刚赴任两日，心中忽感不安，立即辞官奔回家……",
    full: "南齐时期，庾黔娄任县令，刚赴任两日，心中忽感不安，立即辞官奔回家，果见父亲病重。医生说：要知病情吉凶，需尝病人粪便，味苦则吉。庾黔娄毫不犹豫亲口品尝，发现粪味甘甜，不禁悲痛。当夜，他向北斗星叩头祈祷，愿以自身替父受苦。后父亲病愈。后人赞曰：到县未旬日，枉称忽忆归。亲尝便旋味，惟恐是安危。",
    quiz: {
      q: "庾黔娄是通过什么特殊方式来判断父亲病情的？",
      a: "庾黔娄听从医生的建议，亲口品尝父亲的粪便来判断病情吉凶。医生说粪便味苦是吉兆，他尝后发现粪便味甘，担心父亲凶多吉少，因此连夜向北斗星祷告，请求以自身代父受苦。",
    },
  },
  {
    id: "tangjunren",
    seal: "孝",
    title: "乳姑不怠",
    titleEn: "Lady Tang Nurses Mother-in-Law Tirelessly",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/5hSzx7K5z0.jpg",
    imageAlt: "唐夫人乳姑不怠",
    summary:
      "唐朝时期，崔山南曾祖母长孙夫人，年高齿落，无法进食……",
    full: "唐朝时期，崔山南曾祖母长孙夫人，年高齿落，无法进食。其祖母唐夫人每日以自己的乳汁奉养长孙夫人，如此数年，长孙夫人身体健朗。长孙夫人临终前，嘱咐家人要善待唐夫人，说：无以报也，愿后人以善事新妇如我所受恩也。后人赞曰：孝敬崔家妇，乳姑晨盥洗。此恩无以报，愿得子孙贤。",
    quiz: {
      q: "唐夫人是如何奉养无法进食的长孙夫人的？",
      a: "唐夫人每天用自己的乳汁来奉养年老齿落无法进食的长孙夫人，如此坚持了多年，使长孙夫人得以健康长寿，体现了儿媳对婆婆的深厚孝道。",
    },
  },
  {
    id: "huangtingjian",
    seal: "孝",
    title: "涤亲溺器",
    titleEn: "Huang Tingjian Cleans Parents' Chamber Pot",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/MoLf8fB4cI.jpg",
    imageAlt: "黄庭坚涤亲溺器",
    summary:
      "北宋诗人黄庭坚，虽身为著名文学家、朝廷官员，对母亲侍奉极为恭敬……",
    full: "北宋诗人黄庭坚，虽身为著名文学家、朝廷官员，对母亲侍奉极为恭敬。无论官职多高，每日必亲自为母亲洗涤便桶，从不假手于人，也从无怨言，数十年如一日，直至母亲去世。朝野上下闻之，皆肃然起敬。他认为，孝道不分贵贱，侍奉父母不应因地位高低而有所区别。后人赞曰：贵显闻天下，平生孝事亲。亲自涤溺器，不让下人亲。",
    quiz: {
      q: "黄庭坚贵为朝廷官员，他每天坚持亲自做什么孝顺之事？",
      a: "黄庭坚虽然身为朝廷高官和著名文人，但每天坚持亲自为母亲洗涤便桶，从不让下人代劳，也从无怨言，数十年如一日，直到母亲去世，体现了不分贵贱的纯粹孝道。",
    },
  },
  {
    id: "zhushouchang",
    seal: "孝",
    title: "弃官寻母",
    titleEn: "Zhu Shouchang Abandons Office to Seek Mother",
    imageUrl:
      "https://pic.616pic.com/ys_bnew_img/00/35/48/Ax5T6vG4l9.jpg",
    imageAlt: "朱寿昌弃官寻母",
    summary:
      "宋代朱寿昌，七岁时，生母刘氏被嫡母妒忌，被迫改嫁，与之分离……",
    full: "宋代朱寿昌，七岁时，生母刘氏被嫡母妒忌，被迫改嫁，与之分离。此后五十年音讯杳然，朱寿昌在朝为官，念母心切，终于弃官入秦，发誓不见母不返。历经艰辛，终在陕州寻见母亲，相认痛哭，母子团聚。朝中上下皆赞其孝，苏轼也有诗赞之。后人赞曰：七岁生离母，参商五十年。一朝相见面，喜气动皇天。",
    quiz: {
      q: "朱寿昌为了寻找母亲做出了什么牺牲？",
      a: "朱寿昌在朝廷做官，但为了寻找分离了五十年的生母，他毅然放弃了官职，离开朝廷，独自踏上寻母之路，发誓找不到母亲决不回头，最终在陕州找到了母亲，母子相认痛哭。",
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
      try {
        setCheckedIn(JSON.parse(stored));
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setQuoteIdx((i) => (i + 1) % QUOTES.length);
    }, 3800);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const toggleExpand = (id: string) =>
    setExpanded((s) => ({ ...s, [id]: !s[id] }));
  const toggleAnswer = (id: string) =>
    setAnswerShown((s) => ({ ...s, [id]: !s[id] }));
  const toggleCheckIn = (id: string) => {
    setCheckedIn((s) => {
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
          <SectionHeading
            title={"\u5b5d\u6587\u5316\u4e13\u9898\u9986"}
            subtitle="Xiao Culture Hall"
          >
            {
              "\u5b5d\u611f\uff0c\u56e0\u4e1c\u6c49\u8463\u6c38\u5356\u8eab\u846c\u7236\uff0c\u884c\u5b5d\u611f\u5929\u52a8\u5730\u800c\u5f97\u540d\u3002\u8fd9\u91cc\u662f\u5168\u56fd\u552f\u4e00\u4e00\u5ea7\u4ee5\u201c\u5b5d\u201d\u547d\u540d\u7684\u5730\u7ea7\u5e02\u3002"
            }
          </SectionHeading>
        </div>
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-6 px-4">
          <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-transparent to-primary/40" />
          <div className="flex items-center gap-1.5 text-primary/60">
            <span className="text-lg">&#10022;</span>
            <span className="text-xs tracking-[0.35em] font-medium">
              {"\u4ee5\u5b5d\u6da6\u57ce \u975e\u9057\u65b0\u751f"}
            </span>
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
              <div
                key={quoteIdx}
                style={{ animation: "fadeSlideIn 0.6s ease" }}
              >
                <p className="font-serif text-base sm:text-lg text-foreground/85 leading-relaxed">
                  {"\u300c"}
                  {QUOTES[quoteIdx].text}
                  {"\u300d"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {"\u2014\u2014 "}
                  {QUOTES[quoteIdx].source}
                </p>
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
          {
            "\u201c\u5b5d\u6da6\u5343\u5e74\uff0c\u975e\u9057\u65b0\u751f\u201d\u3002\u5b5d\u6587\u5316\u4e0d\u4ec5\u662f\u5b5d\u611f\u7684\u57ce\u5e02\u7075\u9b42\uff0c\u66f4\u662f\u6df1\u6df1\u70d9\u5370\u5728\u5b5d\u611f\u5404\u9879\u975e\u7269\u8d28\u6587\u5316\u9057\u4ea7\u4e2d\u7684\u6838\u5fc3\u57fa\u56e0\u3002"
          }
        </p>

        {/* Hero image */}
        <div className="my-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-card relative">
          <img
            src={`${import.meta.env.BASE_URL}images/dongyong-story.png`}
            alt="Dong Yong Story"
            className="w-full object-cover aspect-video"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
            <h3 className="text-3xl font-serif font-bold text-white m-0">
              {
                "\u8463\u6c38\u4e0e\u4e03\u4ed9\u5973\uff1a\u4f20\u9882\u5343\u5e74\u7684\u5929\u4ed9\u914d"
              }
            </h3>
          </div>
        </div>

        {/* Stories + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 mt-14">
          {/* Story cards column */}
          <div className="flex-1 space-y-10">
            {STORIES.map((story) => (
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
                <div
                  className="w-9 h-9 rounded-sm bg-white/20 border-2 border-white/40 flex items-center justify-center"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  <span className="text-white font-serif font-bold text-base">
                    {"\u77e5"}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    {"\u5b5d\u611f\u5b5d\u6587\u5316\u5c0f\u77e5\u8bc6"}
                  </p>
                  <p className="text-white/70 text-xs">Xiao Culture Facts</p>
                </div>
              </div>
              <div className="divide-y divide-border">
                {KNOWLEDGE.map((k, i) => (
                  <div
                    key={i}
                    className="p-5 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{k.icon}</span>
                      <h5 className="font-bold text-sm text-foreground">
                        {k.title}
                      </h5>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {k.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-primary/5 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  {
                    "\ud83d\udccd \u5b5d\u611f \u00b7 \u4e2d\u534e\u5b5d\u6587\u5316\u540d\u57ce"
                  }
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* QR section */}
        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-transparent to-primary/30" />
            <h3 className="font-serif text-3xl font-bold text-foreground whitespace-nowrap">
              {"\u5bfb\u8ff9\u00b7\u5b5d\u5b50\u7960"}
            </h3>
            <div className="flex-1 max-w-xs h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {
              "\u6b22\u8fce\u4eb2\u4e34\u5b5d\u611f\u8463\u6c38\u516c\u56ed\uff0c\u6f2b\u6b65\u69d0\u835f\u6811\u4e0b\uff0c\u611f\u53d7\u8fd9\u5ea7\u57ce\u5e02\u7684\u5b5d\u7231\u5e95\u8272\u3002\u60a8\u53ef\u4ee5\u626b\u63cf\u4e0b\u65b9\u4e8c\u7ef4\u7801\u6b23\u8d4f\u5168\u666f\u6f2b\u6e38\u3002"
            }
          </p>
          <div className="inline-block p-4 bg-white rounded-2xl shadow-lg border border-border">
            <img
              src={`${import.meta.env.BASE_URL}images/qrcode-xiaozici.png`}
              alt="\u5b5d\u5b50\u7960\u5168\u666f\u6f2b\u6e38\u4e8c\u7ef4\u7801"
              className="w-36 h-36 object-contain"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {"\u5168\u666f\u6f2b\u6e38"}
            </p>
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
  story: (typeof STORIES)[number];
  isExpanded: boolean;
  isAnswerShown: boolean;
  isCheckedIn: boolean;
  onToggleExpand: () => void;
  onToggleAnswer: () => void;
  onCheckIn: () => void;
}

function StoryCard({
  story,
  isExpanded,
  isAnswerShown,
  isCheckedIn,
  onToggleExpand,
  onToggleAnswer,
  onCheckIn,
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
            <span className="text-white font-serif font-bold text-xl leading-none">
              {story.seal}
            </span>
          </div>
          <div>
            <h4
              className="font-serif text-2xl font-bold text-primary leading-tight mb-0.5"
              style={{ textShadow: "1px 1px 0 rgba(200,16,46,0.12)" }}
            >
              {story.title}
            </h4>
            <p className="text-xs text-muted-foreground tracking-wider">
              {story.titleEn}
            </p>
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
              <p className="text-sm text-foreground/80 leading-7">
                {isExpanded ? story.full : story.summary}
              </p>
            </div>
            <button
              onClick={onToggleExpand}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/85 active:scale-95 transition-all duration-150 shadow-sm shadow-primary/30"
            >
              {isExpanded ? (
                <>
                  <span>&#8593;</span>
                  {" \u6536\u8d77\u6545\u4e8b"}
                </>
              ) : (
                <>
                  <span>&#128218;</span>
                  {" \u67e5\u770b\u5b8c\u6574\u6545\u4e8b"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground/60 tracking-wider">
            {"\u5b5d\u6587\u5316\u5c0f\u95ee\u7b54"}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Quiz */}
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <p className="text-sm font-medium text-foreground mb-3">
            <span className="inline-block w-5 h-5 bg-primary text-white text-xs font-bold rounded text-center leading-5 mr-1.5">
              Q
            </span>
            {story.quiz.q}
          </p>
          {isAnswerShown && (
            <div className="mt-2 bg-background rounded-lg p-3 border border-primary/15">
              <p className="text-xs text-muted-foreground mb-1 font-medium">
                {"\u7b54\u6848\uff1a"}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {story.quiz.a}
              </p>
            </div>
          )}
          <button
            onClick={onToggleAnswer}
            className="mt-2 text-xs text-primary hover:underline font-medium transition-colors"
          >
            {isAnswerShown
              ? "\u25b2 \u6536\u8d77\u7b54\u6848"
              : "\u25bc \u67e5\u770b\u7b54\u6848"}
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
            {isCheckedIn
              ? "\u2713 \u5df2\u6253\u5361"
              : "\ud83d\udccc \u6211\u5df2\u5b66\u4e60"}
          </button>
        </div>
      </div>
    </div>
  );
}
