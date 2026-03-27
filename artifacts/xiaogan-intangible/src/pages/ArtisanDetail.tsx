import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  MapPin,
  Star,
  BookOpen,
  Brush,
  ShoppingBag,
  ArrowLeft,
  Clock,
  Users,
} from "lucide-react";

// ─── Full artisan profiles ────────────────────────────────────────────────────
const ARTISANS = [
  {
    id: 1,
    name: "\u7ba1\u4e3d\u82b3",
    level: "\u56fd\u5bb6\u7ea7",
    item: "\u5b5d\u611f\u96d5\u82b1\u526a\u7eb8",
    itemEn: "Xiaogan Paper-cutting",
    years: 50,
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.dRKfSe4Fb9n0Jwy89ot7sQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    heroBg:
      "https://ts1.tc.mm.bing.net/th/id/R-C.7b9c4bf7fdfc7a658942b6c2f0a0ce61?rik=dv2N%2fOscc2Hr4g&riu=http%3a%2f%2fhbrbapp.hubeidaily.net%2f59f4fc4c-1f6f-47e4-90c2-27378205e2ad&ehk=H%2b3Du5%2blvXVRNbw0ss4YTpLrjyVVxxTxTseBnVvAR2A%3d&risl=&pid=ImgRaw&r=0",
    location: "\u5b5d\u611f\u5e02\u5b5d\u5357\u533a",
    born: "1954\u5e74",
    bio: "管丽芳，孝感雕花剪纸国家级代表性传承人。1954年3月出生，18岁拜师学艺，从艺50余年。擅长孝感雕花剪纸传统技艺，作品风格细腻精美、富有地域文化特色，多次获得国家级、省级奖项，致力于非遗传承与教学推广。",
    story:
      "管丽芳出生于剪纸氛围浓厚的家庭，18岁拜胡均启大师为师学习剪纸技艺。少年时的剪纸实践经历在她心中埋下了艺术的种子，高中起便潜心钻研剪纸技艺，向前辈大师虚心请教。一位位优秀的剪纸师的技艺与理念，像露水般滋养着她的成长。她的作品花样极多，包括传统吉祥图案、孝感地方特色的云梦皮影、董永与七仙女等孝文化主题剪纸。繁杂的剪刀、清脆的刀声，成了她最熟悉的语言。",
    awards: [
      "全国剪纸艺术大赛金奖",
      "中国非物质文化遗产传承人贡献奖",
      "孝感市工艺美术大师",
      "湖北省工艺美术大师",
    ],
    gallery: [
      {
        url: "https://nate.org.cn/upload/default/20240125/3596780a85d7e76c070ae073b2186c0d.jpg",
        caption: "剪纸作品",
      },
      {
        url: "https://nate.org.cn/upload/default/20240125/c339cf0a4816133d1f90e37ca78cf5ee.jpg",
        caption: "剪纸作品",
      },
      {
        url: "https://ts1.tc.mm.bing.net/th/id/R-C.abfd04315437b9a9cf7dbb8734f84a1a?rik=yPapn7WMp%2fsiVA&riu=http%3a%2f%2fhbrbapp.hubeidaily.net%2f0158121e-fb70-4448-bbb8-6c14492a7cac&ehk=Jz%2bQ3xSfDQvflP%2f%2b1Gs1inqp9EplELQXJiGT8y2YR8M%3d&risl=&pid=ImgRaw&r=0",
        caption: "教学图片",
      },
    ],
    services: [
      {
        icon: BookOpen,
        name: "\u526a\u7eb8\u4f53\u9a8c\u8bfe",
        desc: "\u9762\u5bf9\u9762\u6307\u5bfc\uff0c2\u5c0f\u65f6\u5b8c\u6210\u4e00\u5e45\u4f20\u7edf\u526a\u7eb8\u4f5c\u54c1",
        duration: "2\u5c0f\u65f6",
        capacity: "6\u4eba",
        price: "298",
      },
      {
        icon: Brush,
        name: "\u79c1\u4eba\u5b9a\u5236",
        desc: "\u6839\u636e\u5ba2\u6237\u9700\u6c42\u5b9a\u5236\u4e13\u5c5e\u526a\u7eb8\u4f5c\u54c1\uff0c\u5e26\u4e2a\u4eba\u5316\u4e3b\u9898\u3001\u540d\u5b57\u8bb0\u5f55",
        duration: "7\u5929\u4ea4\u4ed8",
        capacity: "\u4e0d\u9650",
        price: "\u9762\u8bae",
      },
    ],
    milestones: [
      {
        year: "1972",
        event: "进入孝感工艺美术厂，拜剪纸大师胡筠启为师，正式学习雕花剪纸技艺",
      },
      {
        year: "1973",
        event:
          "与师父胡筠启共同革新孝感剪纸技艺，创制出立体剪纸，代表作《百凤图》问世",
      },
      {
        year: "2008",
        event: "被湖北省人民政府授予“湖北省工艺美术名人”称号",
      },
      {
        year: "2011",
        event:
          "受邀参加“全国百名非物质文化遗产代表性传承人迎春展示活动”，作品被国家文化部非遗司永久收藏",
      },
      {
        year: "2012",
        event:
          "被认定为国家级非物质文化遗产项目剪纸（孝感雕花剪纸）代表性传承人",
      },
      {
        year: "近年",
        event: "深耕“破刀”技艺传承，推动孝感雕花剪纸活态传承",
      },
    ],
  },
  {
    id: 2,
    name: "秦礼刚",
    level: "国家级代表性传承人",
    item: "云梦皮影戏",
    itemEn: "Yunmeng Shadow Play",
    years: "48",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/15422/20220506120818-1761484793_jpeg_600_338_42950.jpg/0",
    heroBg:
      "https://ts1.tc.mm.bing.net/th/id/R-C.f4eea1329e1a789ece1fe0816d72e259?rik=vZB6RqI5smnU6A&riu=http%3a%2f%2fimg.ts.cn%2f003%2f525%2f224%2f00352522431_3bbcc7d0.jpg&ehk=wohU064k30eHOemeAyHXszK95l8eu2zuBI%2fJGjH3Bqw%3d&risl=&pid=ImgRaw&r=0",
    location: "\u5b5d\u611f\u5e02\u4e91\u68a6\u53bf",
    born: "1949\u5e74",
    bio: "秦礼刚，云梦皮影戏国家级代表性传承人，深耕皮影艺术四十余载。他 29 岁拜老艺人刘修昌、皮影表演艺术家陆春元为师，正式踏入皮影领域，此后数十年如一日，全身心投入云梦皮影戏的传承、创新与推广，创下了年演出 364 天（仅除夕休息）的惊人纪录。",
    story:
      "秦礼刚与皮影的缘分，始于而立之年的一次偶然邂逅。29 岁那年，他被云梦皮影灯影下活灵活现的人物深深打动，毅然拜老艺人刘修昌、皮影表演艺术家陆春元为师，踏上了这条 “大器晚成” 的从艺之路。彼时的他，早已过了学艺的黄金年龄，却凭着一股不服输的韧劲，日夜钻研雕刻与表演。为了让皮影在灯光下更通透生动，他大胆革新，摒弃了传统昂贵厚重的牛皮，尝试用 X 光胶片、聚乙烯薄膜等现代材料替代，让这门古老艺术在新材料中重获新生。",
    awards: [
      "中国皮影艺术大师荣誉称号",
      "湖北省非遗传承先进个人",
      "首届中国唐山国际皮影艺术展演最佳表演奖",
      "第三十一届国际木偶联合会最佳传承奖",
    ],
    gallery: [
      {
        url: "https://www.banmo.com/upload/default/2019-03-22/6a50efb57a5124bdb481dd1289d65e01.jpg",
        caption: "经典作品",
      },
      {
        url: "https://www.banmo.com/upload/default/2019-03-22/a99128a7d30189ea54fc7f6f7b7d7c64.jpg",
        caption: "刘备",
      },
      {
        url: "https://www.banmo.com/upload/default/2019-03-22/c06369aacfa1b7e7d8856e046e06bef8.jpg",
        caption: "诸葛亮",
      },
    ],
    services: [
      {
        icon: Star,
        name: "百日阅读计划",
        desc: "每天30分钟阅读计划，5305名同学已参与并完成打卡",
        duration: "60分钟",
        capacity: "不限",
        price: "500元",
      },
      {
        icon: Brush,
        name: "百日绘画入门",
        desc: "零基础入门绘画，从线条到色彩，掌握基础绘画技巧，完成百日绘画挑战",
        duration: "3个月",
        capacity: "8人",
        price: "388",
      },
    ],
    milestones: [
      {
        year: "1978",
        event: "拜老艺人刘修昌为师，正式踏入皮影艺术领域",
      },
      {
        year: "1983",
        event: "拜皮影表演艺术家陆春元为师，成为其关门弟子，精进雕刻与表演技艺",
      },
      {
        year: "1985",
        event: "创办“梦泽影戏馆”，坚持常年演出，创下年演364场的纪录",
      },
      {
        year: "2010",
        event: "代表湖北参加中国首届非物质文化遗产博览会，现场展演云梦皮影",
      },
      {
        year: "2012",
        event:
          "被认定为国家级非物质文化遗产项目皮影戏（云梦皮影戏）代表性传承人",
      },
      {
        year: "近年",
        event: "通过进校园、进社区及新媒体传播，推动云梦皮影的传承",
      },
    ],
  },
  {
    id: 3,
    name: "何宣川",
    level: "省级传承人",
    item: "孝感麻糖",
    itemEn: "Xiaogan Sesame Candy",
    years: "30",
    avatar:
      "https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/osbMtC7oBSnD9NQDvFeVfIKeBqMDQACZRwCE8A~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=2089778400&x-signature=q9IgZ0A6YzDnPJvbpQl22WVudRM%3D",
    heroBg:
      "https://img.alicdn.com/i1/523682704/O1CN01GtWgHY1VqTX3d90QD_!!523682704.jpg",
    location: "\u5b5d\u611f\u5e02\u5b5d\u5357\u533a",
    born: "1963\u5e74",
    bio: "何宣川，孝感麻糖省级传承人。自幼投身于孝感麻糖的制作与传承，深耕麻糖制作技艺数十载，在保留传统工艺精髓的基础上，不断探索创新，致力于让这一老字号风味与文化焕发新生。他制作的麻糖甜而不腻、香酥适口，既延续了经典的老味道，又贴合现代口感需求，是孝感麻糖传统技艺的忠实守护者与积极传播者。",
    story: `孝感麻糖已有逾千年历史，八百年前曾被指定为贡品，因其制作工艺复杂，被称为中国四大名糖之一。何宣川主张坚守传统原料、不换山泉水、不调商业化配方。他说，孝感麻糖的灵魂在于“手工”二字，只有完全手工掌控火候和拉麻手法，才能舒展那口独特的香脆味道。为了传承技艺，他将制作孝感麻糖的完整工序整理成图表流程，公开教学传艺，带动了数十位年轻传承人，让这门老手艺在新时代继续飘香。`,
    awards: [
      "孝感麻糖制作技艺省级非物质文化遗产代表性传承人",
      "孝感市非物质文化遗产麻糖制作技艺市级传承人",
      "孝感麻糖米酒厂“终身贡献奖”",
      "湖北省非遗保护工作先进个人",
    ],
    gallery: [
      {
        url: "https://ts4.tc.mm.bing.net/th/id/OIP-C.7cdHfOQdMmnR4XNtY9fcWgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        caption: "麻糖",
      },
      {
        url: "https://ts2.tc.mm.bing.net/th/id/OIP-C.EdP461hDNad5ZE_qo4mJMgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        caption: "麻糖",
      },
      {
        url: "https://ts2.tc.mm.bing.net/th/id/OIP-C.S9Fcbwc_ZQpjBzt_LaqSMQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        caption: "麻糖",
      },
    ],
    services: [
      {
        icon: ShoppingBag,
        name: "手工麻糖礼盒定制",
        desc: "纯手工制作，可创制个性化文字标记，适合企业定制、节日送礼",
        duration: "3天制作",
        capacity: "不限",
        price: 168,
      },
      {
        icon: BookOpen,
        name: "麻糖制作课",
        desc: "亲手体验传统麻糖拉制工艺，带走自己制作的成品",
        duration: "2.5小时",
        capacity: "10人",
        price: 198,
      },
    ],
    milestones: [
      {
        year: "1988",
        event:
          "\u8fdb\u5165\u5b5d\u611f\u6700\u8001\u7684\u9ebb\u7cd6\u5c0f\u5382\u5b66\u5f92\u5e76\u7559\u5382\u4e8b",
      },
      {
        year: "2000",
        event:
          "\u81ea\u7acb\u95e8\u6237\u521b\u529e\u4e2a\u4eba\u5c0f\u4f5c\u574a\uff0c\u5174\u5c45\u5b5d\u611f\u9ebb\u7cd6\u4f20\u627f\u7c7b\u516c\u53f8",
      },
      {
        year: "2012",
        event:
          "\u5b9d\u5e97\u5bbe\u5ea6\u8bc4\u5206\u8fda\u8d85\u540c\u5ea7\u7279\u8272\u4f18\u8d28\u5e97\u94fa\uff0c\u9ebb\u7cd6\u793c\u76d2\u8fdc\u9500\u5168\u56fd",
      },
      {
        year: "2017",
        event:
          "\u5b9e\u73b0\u975e\u9057\u8fdb\u6821\u56ed\u9879\u76ee\u5bfb\u8987\u5b5d\u611f\u6240\u6709\u4e2d\u5b66",
      },
      {
        year: "2023",
        event:
          "\u6258\u4eba\u5efa\u7acb\u7535\u5546\u8ddf\u56fd\u5185\u7535\u5546\u5e73\u53f0\uff0c\u9053\u5730\u67e5\u8bfe\u5c16\u8d27\u8fdc\u9500\u5168\u7403",
      },
    ],
  },
  {
    id: 4,
    name: "伍柏林",
    level: "省级",
    item: "应城膏雕",
    itemEn: "Yingcheng Gypsum Carving",
    years: "40",
    avatar:
      "https://p3-sdbk2-media.byteimg.com/tos-cn-i-xv4ileqgde/a9dce9a00c9f4d2ab12b75af21f3a75d~tplv-xv4ileqgde-cspdq:256:256:q30.image",
    heroBg:
      "https://ts1.tc.mm.bing.net/th/id/R-C.844b2b0d7a7aca18e06f67f9d5ebd53b?rik=zNFfoBSi1PzHJQ&riu=http%3a%2f%2fhbrbapp.hubeidaily.net%2fb51193e5-7871-400f-a262-e394374d2620&ehk=c%2bbJ3GiWkh%2fWtETvRnWfE8OxYjC97%2fm07mZpKFC5cvM%3d&risl=&pid=ImgRaw&r=0",
    location: "\u5b5d\u611f\u5e02\u5e94\u57ce\u5e02",
    born: "1950\u5e74",
    bio: "伍柏林，应城膏雕省级传承人。应城石膏雕刻技艺历史悠久，伍柏林深耕此道四十余年，将传统膏雕技法与现代审美巧妙融合，既保留了古朴厚重的非遗韵味，又赋予作品符合当代市场的实用价值，为应城膏雕的传承与产业化发展开辟了新路径。",
    story:
      "应城是中国内陆最大的天然石膏产地，天然石膏质地细腻、硬度适中。伍柏林 16 岁时跟随父亲学习膏雕技艺，耳濡目染间对这门手艺产生了深厚情缘。早年他在粉笔厂、膏粉厂做工，始终放不下对石膏雕刻的热爱，改革开放后牵头组建应城工艺膏雕厂，潜心钻研近五十年。他走访民间老艺人，改良传统雕刻技法，用树脂法将 “单体” 雕刻升级为 “双层” 雕刻，极大提升了作品表现力；同时融合现代审美与实用需求，设计出 400 余种膏雕产品，让古朴的应城膏雕走向全国、远销海外，形成了兼具传统韵味与时代活力的应城膏雕新流派。",
    awards: [
      "应城膏雕省级非物质文化遗产代表性传承人",
      "湖北工艺美术大师荣誉称号",
      "全国石膏工艺创作大赛金奖",
      "孝感市优秀非遗传承人",
    ],
    gallery: [
      {
        url: "https://p3-doubao-search-sign.byteimg.com/labis/image/940fc78e5bf39d341c638998e5eca7ae~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1779634571&x-signature=hHIyFGHQakRwIJXbTL9lLYutAeg%3D",
        caption: "膏雕",
      },
      {
        url: "https://p26-doubao-search-sign.byteimg.com/labis/47a8cefa03b123d2afb57b88d1765c80~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1790002614&x-signature=hqZnxNnvDBZvouFRWZg1dlhbNbs%3D",
        caption: "膏雕",
      },
      {
        url: "https://p11-doubao-search-sign.byteimg.com/tos-cn-i-tjoges91tu/TZtDSSJFCk1y3P~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1779634571&x-signature=20XeeBwUn1%2FGWCA8DPOWNX70flU%3D",
        caption: "膏雕",
      },
    ],
    services: [
      {
        icon: Brush,
        name: "\u77f3\u818f\u6444\u4ef6\u5b9a\u5236",
        desc: "\u5c0f\u91cf\u6279\u91cf\u5b9a\u5236\u77f3\u818f\u6444\u4ef6\uff0c\u6240\u6709\u72ec\u7acb\u8bbe\u8ba1\u3001\u624b\u5de5\u96d5\u523b\u548c\u5c0a\u8d35\u8d3c\u6599",
        duration: "7\u5929\u4ea4\u4ed8",
        capacity: "\u4e0d\u9650",
        price: "\u9762\u8bae",
      },
      {
        icon: BookOpen,
        name: "\u818f\u96d5\u4f53\u9a8c\u8bfe",
        desc: "\u4eb2\u81ea\u4f53\u9a8c\u5929\u7136\u5e22\u7240\u77f3\u818f\u96d5\u5237\u3001\u6253\u78e8\u5168\u5de5\u5e8f\uff0c\u5e26\u8d70\u81ea\u4e2a\u6027\u5316\u6454\u4ef6",
        duration: "3\u5c0f\u65f6",
        capacity: "6\u4eba",
        price: "358",
      },
    ],
    milestones: [
      {
        year: "1966",
        event: "16岁随父亲学习应城膏雕技艺，开启从艺之路",
      },
      {
        year: "1985",
        event: "牵头组建应城市工艺膏雕厂，推动膏雕产业化发展",
      },
      {
        year: "2009",
        event: "被认定为应城膏雕市级非物质文化遗产代表性传承人",
      },
      {
        year: "2015",
        event: "被认定为应城膏雕省级非物质文化遗产代表性传承人",
      },
      {
        year: "2024",
        event: "参与“百人共刻百寿图”非遗公益活动，现场传艺授徒",
      },
    ],
  },
];

const LEVEL_COLOR: Record<string, string> = {
  "\u56fd\u5bb6\u7ea7": "bg-primary text-white",
  "\u7701\u7ea7": "bg-[#8B4513] text-white",
  "\u5e02\u7ea7": "bg-muted-foreground text-white",
};

export default function ArtisanDetail() {
  const [, params] = useRoute("/artisans/:id");
  const artisanId = parseInt(params?.id ?? "0", 10);
  const artisan = ARTISANS.find((a) => a.id === artisanId);

  if (!artisan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
        <p className="text-2xl font-serif text-muted-foreground">
          {"\u4f20\u627f\u4eba\u4e0d\u5b58\u5728"}
        </p>
        <Link
          href="/artisans"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          <ArrowLeft className="w-4 h-4" />{" "}
          {"\u8fd4\u56de\u4f20\u627f\u4eba\u5217\u8868"}
        </Link>
      </div>
    );
  }

  const levelColor = LEVEL_COLOR[artisan.level] ?? "bg-muted text-foreground";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ── Hero banner ────────────────────────────────────────────────────── */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={artisan.heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-6">
          <Link
            href="/artisans"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 w-fit transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {"\u4f20\u627f\u4eba\u5217\u8868"}
          </Link>
          <div className="flex items-end gap-4">
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src={artisan.avatar}
                alt={artisan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColor}`}
                >
                  {artisan.level}
                  {"\u4f20\u627f\u4eba"}
                </span>
                <span className="text-xs text-white/70 bg-white/15 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
                  {"\u4ece\u827a"} {artisan.years} {"\u5e74"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white drop-shadow-sm">
                {artisan.name}
              </h1>
              <p className="text-white/85 text-sm mt-0.5">
                {artisan.item} · {artisan.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="flex-1 space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <SectionLabel
                icon={BookOpen}
                text={"\u4f20\u627f\u4eba\u7b80\u4ecb"}
              />
              <p className="text-foreground/80 leading-8 text-sm mt-3">
                {artisan.bio}
              </p>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <SectionLabel icon={BookOpen} text={"\u4ece\u827a\u6545\u4e8b"} />
              <div className="relative mt-4 pl-4 border-l-2 border-primary/30">
                <span className="absolute -left-3 top-0 text-4xl text-primary/20 font-serif leading-none select-none">
                  {"\u201c"}
                </span>
                <p className="text-foreground/75 leading-8 text-sm italic">
                  {artisan.story}
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <SectionLabel icon={Calendar} text={"\u4ece\u827a\u5386\u7a0b"} />
              <ol className="mt-4 space-y-0">
                {artisan.milestones.map((m, i) => (
                  <li key={i} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center z-10">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      {i < artisan.milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-1" />
                      )}
                    </div>
                    <div className="pb-5">
                      <span className="text-xs font-bold text-primary">
                        {m.year}
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed mt-0.5">
                        {m.event}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <SectionLabel icon={Brush} text={"\u4ee3\u8868\u4f5c\u54c1"} />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {artisan.gallery.map((g, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-border"
                  >
                    <img
                      src={g.url}
                      alt={g.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-2">
                      <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
                        {g.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right column ─────────────────────────────────────────────── */}
          <div className="lg:w-72 shrink-0 space-y-6">
            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-sm"
            >
              <SectionLabel
                icon={Award}
                text={"\u8363\u8a89\u4e0e\u83b7\u5956"}
              />
              <ul className="mt-3 space-y-2.5">
                {artisan.awards.map((a, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-1 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 text-primary" />
                    </span>
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-sm"
            >
              <SectionLabel icon={MapPin} text={"\u57fa\u672c\u4fe1\u606f"} />
              <dl className="mt-3 space-y-3">
                <InfoRow
                  label={"\u4f20\u627f\u9879\u76ee"}
                  value={artisan.item}
                />
                <InfoRow
                  label={"\u4e13\u4e1a\u9886\u57df"}
                  value={artisan.itemEn}
                />
                <InfoRow
                  label={"\u6240\u5728\u5730\u533a"}
                  value={artisan.location}
                />
                <InfoRow
                  label={"\u51fa\u751f\u5e74\u4efd"}
                  value={artisan.born}
                />
                <InfoRow
                  label={"\u4ece\u827a\u5e74\u9650"}
                  value={`${artisan.years} \u5e74`}
                />
                <InfoRow
                  label={"\u4f20\u627f\u7ea7\u522b"}
                  value={`${artisan.level}\u4ee3\u8868\u6027\u4f20\u627f\u4eba`}
                />
              </dl>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
            >
              <div className="bg-primary px-5 py-4">
                <p className="text-white font-bold text-sm">
                  {"\u53ef\u9884\u7ea6\u670d\u52a1"}
                </p>
                <p className="text-white/70 text-xs">
                  {
                    "\u70b9\u51fb\u4e0b\u65b9\u670d\u52a1\u9879\u4e86\u89e3\u8be6\u60c5"
                  }
                </p>
              </div>
              <div className="divide-y divide-border">
                {artisan.services.map((svc, i) => (
                  <div
                    key={i}
                    className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <svc.icon className="w-4 h-4 text-primary shrink-0" />
                      <p className="font-bold text-sm text-foreground">
                        {svc.name}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      {svc.desc}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {svc.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {svc.capacity}
                      </span>
                      <span className="ml-auto font-bold text-primary">
                        {"\uffe5"}
                        {svc.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────
function SectionLabel({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1 h-5 rounded-full bg-primary" />
      <Icon className="w-4 h-4 text-primary" />
      <h2 className="font-bold text-sm text-foreground">{text}</h2>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-xs text-muted-foreground shrink-0 w-20">{label}</dt>
      <dd className="text-xs font-medium text-foreground leading-relaxed">
        {value}
      </dd>
    </div>
  );
}
