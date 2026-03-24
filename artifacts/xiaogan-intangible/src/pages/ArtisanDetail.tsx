import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Award, Calendar, MapPin, Star, BookOpen, Brush, ShoppingBag, ArrowLeft, Clock, Users } from "lucide-react";

// ─── Full artisan profiles ────────────────────────────────────────────────────
const ARTISANS = [
  {
    id: 1,
    name: "\u7ba1\u4e3d\u82b3",
    level: "\u56fd\u5bb6\u7ea7",
    item: "\u5b5d\u611f\u96d5\u82b1\u526a\u7eb8",
    itemEn: "Xiaogan Paper-cutting",
    years: 40,
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80",
    heroBg: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80",
    location: "\u5b5d\u611f\u5e02\u5b5d\u5357\u533a",
    born: "1963\u5e74",
    bio: "\u7ba1\u4e3d\u82b3\uff0c\u5b5d\u611f\u96d5\u82b1\u526a\u7eb8\u56fd\u5bb6\u7ea7\u4ee3\u8868\u6027\u4f20\u627f\u4eba\u3002\u81ea\u5e7c\u968f\u7956\u6bcd\u5b66\u8270\u526a\u7eb8\u6280\u827a\uff0c40\u4f59\u5e74\u6df1\u8015\u4e8e\u4f20\u7edf\u526a\u7eb8\u827a\u672f\u9886\u57df\u3002\u5176\u4f5c\u54c1\u96d5\u5de5\u7cbe\u7ec6\u3001\u56fe\u6848\u5409\u7965\uff0c\u5c06\u5b5d\u611f\u5730\u533a\u7edf\u4e00\u7684\u4e2a\u4eba\u98ce\u683c\u4e0e\u97f5\u811a\u672c\u5f20\u5f20\u878d\u5165\u4f5c\u54c1\u3002\u66fe\u5c06\u5b5d\u611f\u96d5\u82b1\u526a\u7eb8\u5e26\u5165\u56fd\u9645\u6587\u5316\u4ea4\u6d41\u8230\u53f0\uff0c\u8ba9\u8fd9\u9879\u6e90\u81ea\u695a\u695a\u5927\u5730\u7684\u53e4\u8001\u624b\u5de5\u827a\u672f\u8d70\u5411\u4e16\u754c\u3002",
    story: "\u7ba1\u4e3d\u82b3\u51fa\u751f\u4e8e\u4e00\u4e2a\u526a\u7eb8\u4e16\u5bb6\uff0c\u7956\u6bcd\u662f\u65e7\u793e\u6709\u540d\u7684\u526a\u7eb8\u5a46\u5a46\u3002\u516d\u5c81\u65f6\uff0c\u5979\u5c31\u5f00\u59cb\u5728\u7076\u706f\u4e0b\u8ddf\u7740\u7956\u6bcd\u5269\u526a\u7eb8\u82b1\u3002\u521d\u4e2d\u5c55\u7edf\u526a\u7eb8\u624d\u80fd\u53c3\u52a0\u65c5\u6e38\u798f\u5ea6\u6d3b\u52a8\uff0c\u8fd9\u5e7c\u5c0f\u7684\u4e00\u6b21\u7ecf\u5386\u5c31\u6b64\u5728\u5979\u5fc3\u91cc\u8d77\u4e86\u706b\u82d7\u3002\u9ad8\u4e2d\u7684\u524d\u534a\u5374\u5bc6\u5bc6\u5929\u5929\u5278\u526a\u7eb8\uff0c\u5c01\u5c01\u6c42\u7956\u6bcd\u6307\u5bfc\u3002\u4e00\u5765\u6c9f\u7f0d\u7ea7\u526a\u7eb8\u5e08\u50cf\u9742\u6c34\u4e00\u6837\u6d41\u5165\u4e86\u5979\u7684\u5fc3\u91cc\u3002\u5979\u7684\u4f5c\u54c1\u82b1\u6837\u6781\u591a\uff0c\u5305\u62ec\u4f20\u7edf\u5409\u7965\u56fe\u6848\u3001\u5b5d\u611f\u5730\u65b9\u7279\u8272\u7684\u4e91\u68a6\u76ae\u5f71\u3001\u8463\u6c38\u4e0e\u4e03\u4ed9\u5973\u7b49\u5b5d\u6587\u5316\u4e3b\u9898\u526a\u7eb8\u3002\u7e41\u6742\u7684\u526a\u5200\u3001\u5520\u5520\u7684\u5200\u58f0\uff0c\u6210\u4e86\u5979\u6700\u719f\u6089\u7684\u8bed\u8a00\u3002",
    awards: [
      "\u5168\u56fd\u526a\u7eb8\u827a\u672f\u5927\u8d5b\u91d1\u5956",
      "\u4e2d\u56fd\u975e\u7269\u8d28\u6587\u5316\u9057\u4ea7\u4f20\u627f\u4eba\u8d21\u732e\u5956",
      "\u5b5d\u611f\u5e02\u5de5\u8279\u7f8e\u672f\u5927\u5e08",
      "\u6e56\u5317\u7701\u5de5\u8279\u7f8e\u672f\u5927\u5e08",
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80", caption: "\u300a\u69d0\u835f\u60c5\u300b\u526a\u7eb8\u7b3b" },
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80", caption: "\u300a\u767e\u5b5d\u56fe\u300b\u8fde\u5e45\u526a\u7eb8" },
      { url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80", caption: "\u300a\u5929\u4ed9\u914d\u300b\u526a\u7eb8\u753b" },
    ],
    services: [
      { icon: BookOpen, name: "\u526a\u7eb8\u4f53\u9a8c\u8bfe", desc: "\u9762\u5bf9\u9762\u6307\u5bfc\uff0c2\u5c0f\u65f6\u5b8c\u6210\u4e00\u5e45\u4f20\u7edf\u526a\u7eb8\u4f5c\u54c1", duration: "2\u5c0f\u65f6", capacity: "6\u4eba", price: "298" },
      { icon: Brush, name: "\u79c1\u4eba\u5b9a\u5236", desc: "\u6839\u636e\u5ba2\u6237\u9700\u6c42\u5b9a\u5236\u4e13\u5c5e\u526a\u7eb8\u4f5c\u54c1\uff0c\u5e26\u4e2a\u4eba\u5316\u4e3b\u9898\u3001\u540d\u5b57\u8bb0\u5f55", duration: "7\u5929\u4ea4\u4ed8", capacity: "\u4e0d\u9650", price: "\u9762\u8bae" },
    ],
    milestones: [
      { year: "1984", event: "\u968f\u7956\u6bcd\u5b66\u4e60\u526a\u7eb8\uff0c\u6b63\u5f0f\u8e0f\u4e0a\u4f20\u627f\u4e4b\u8def" },
      { year: "1998", event: "\u9996\u6b21\u53c2\u52a0\u5168\u56fd\u9752\u5c11\u5e74\u526a\u7eb8\u5927\u8d5b\uff0c\u8363\u83b7\u91d1\u5956" },
      { year: "2009", event: "\u88ab\u8bc4\u4e3a\u5b5d\u611f\u96d5\u82b1\u526a\u7eb8\u56fd\u5bb6\u7ea7\u4ee3\u8868\u6027\u4f20\u627f\u4eba" },
      { year: "2018", event: "\u4ee3\u8868\u4e2d\u56fd\u53c2\u52a0\u8054\u5408\u56fd\u6559\u79d1\u6587\u7ec4\u975e\u9057\u8bba\u575b\uff0c\u4e2d\u56fd\u526a\u7eb8\u8d70\u5411\u4e16\u754c" },
      { year: "2022", event: "\u5efa\u7acb\u4e2a\u4eba\u5de5\u4f5c\u5ba4\uff0c\u5e26\u5f92\u53d7\u4e1a\u903e\u4e00\u767e\u4e59" },
    ],
  },
  {
    id: 2,
    name: "\u79e6\u793c\u521a",
    level: "\u56fd\u5bb6\u7ea7",
    item: "\u4e91\u68a6\u76ae\u5f71\u620f",
    itemEn: "Yunmeng Shadow Puppetry",
    years: 55,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
    heroBg: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80",
    location: "\u5b5d\u611f\u5e02\u4e91\u68a6\u53bf",
    born: "1952\u5e74",
    bio: "\u79e6\u793c\u521a\uff0c\u4e91\u68a6\u76ae\u5f71\u620f\u56fd\u5bb6\u7ea7\u4ee3\u8868\u6027\u4f20\u627f\u4eba\uff0c\u8fde\u7eed\u641e\u76ae\u5f7155\u5e74\u3002\u5341\u4e09\u5c81\u8ddf\u7236\u4eb2\u5b66\u96d5\u523b\u76ae\u5f71\uff0c\u591a\u5e74\u6765\u5168\u8eab\u5fc3\u5165\u5730\u8d21\u732e\u4e8e\u4e91\u68a6\u76ae\u5f71\u620f\u7684\u4f20\u627f\u3001\u521b\u65b0\u4e0e\u4e1a\u754c\u63a8\u5e7f\u3002\u5176\u76ae\u5f71\u4f5c\u54c1\u5de5\u827a\u7b80\u7ec3\u800c\u5bcc\u6709\u795e\u97f5\uff0c\u88ab\u6536\u85cf\u4e8e\u591a\u5bb6\u535a\u7269\u9986\u3002",
    story: "\u5341\u4e09\u5c81\u7684\u79e6\u793c\u521a\uff0c\u7b2c\u4e00\u6b21\u6478\u5230\u90a3\u5f20\u5c0f\u5c0f\u7684\u724c\u5200\uff0c\u5c31\u518d\u4e5f\u653e\u4e0d\u4e0b\u4e86\u3002\u4e91\u68a6\u76ae\u5f71\u620f\u662f\u4e2d\u56fd\u6700\u53e4\u8001\u7684\u76ae\u5f71\u6d41\u6d3e\u4e4b\u4e00\uff0c\u7528\u5c14\u9e7f\u76ae\u78a7\u523b\u800c\u6210\u7684\u5404\u8272\u76ae\u5f71\uff0c\u5728\u706f\u5149\u4e0b\u6539\u53d8\u5f62\u6001\u3001\u751f\u52a8\u534a\u900f\u660e\u3002\u793c\u521a\u8bf4\uff0c\u6bcf\u4e00\u5f20\u76ae\u5f71\u5c11\u5219\u51e0\u5343\u5200\uff0c\u591a\u5219\u4e0a\u4e07\u5200\uff0c\u5176\u4e2d\u8857\u5934\u5c0f\u5203\u5e93\u4e00\u5c81\u5c31\u4e70\u4e0d\u5230\u7684\u7cbe\u7ec6\u5978\u5de5\u3002\u4f51\u7237\u964d\u670d\u4e4b\u5e74\u4ed6\u4f5c\u51fa\u4e86\u96c6\u5927\u6210\u7684\u76ae\u5f71\u5168\u5957\uff0c\u5171\u8ba1\u6587\u7269\u76ae\u5f71\u4e94\u767e\u591a\u4ef6\uff0c\u6210\u4e3a\u591a\u5bb6\u7701\u7ea7\u3001\u56fd\u5bb6\u7ea7\u6587\u7269\u6536\u85cf\u5b9a\u7684\u767b\u5f55\u5c55\u54c1\u3002",
    awards: [
      "\u4e2d\u56fd\u76ae\u5f71\u827a\u672f\u5927\u5e08\u8363\u8a89\u79f0\u53f7",
      "\u6e56\u5317\u7701\u975e\u9057\u4f20\u627f\u5148\u8fdb\u4e2a\u4eba",
      "\u5168\u56fd\u76ae\u5f71\u5ba4\u5185\u5355\u4eba\u8868\u6f14\u91d1\u5956",
      "\u7b2c\u4e09\u5c4a\u4e2d\u56fd\u6c11\u95f4\u827a\u672f\u5c55\u6f14\u516c\u8def\u9996\u5e24\u5ced",
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=600&q=80", caption: "\u300a\u5929\u4ed9\u914d\u300b\u76ae\u5f71\u5168\u5957" },
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80", caption: "\u8d62\u671b\u5c71\u7b2c\u4e00\u5c45\u76ae\u5f71\u66f2\u76ee\u8868\u6f14" },
      { url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80", caption: "\u5de5\u5f62\u516c\u4e25\u7684\u5168\u5957\u76ae\u5f71\u5f20\u6253\u5c55\u793a" },
    ],
    services: [
      { icon: Star, name: "\u76ae\u5f71\u8868\u6f14\u9884\u7ea6", desc: "\u56e2\u4f53\u5b9a\u5236\u8868\u6f14\uff0c\u5305\u542b\u7ecf\u5178\u5267\u76ee\u4e0e\u4e92\u52a8\u73af\u8282", duration: "60\u5206\u949f", capacity: "\u4e0d\u9650", price: "\u4ece500\u5143" },
      { icon: Brush, name: "\u76ae\u5f71\u5236\u4f5c\u5de5\u574a", desc: "\u5c16\u5200\u5916\u52a0\u5c0f\u5012\u627f\u5c31\u5366\u4e0a\u81ea\u5df1\u4e2a\u6027\u5316\u76ae\u5f71\u4f5c\u54c1", duration: "3\u5c0f\u65f6", capacity: "8\u4eba", price: "388" },
    ],
    milestones: [
      { year: "1965", event: "\u8ddf\u968f\u7236\u4eb2\u5165\u884c\uff0c\u5f00\u59cb\u5c66\u7a76\u4e91\u68a6\u76ae\u5f71\u7b2c\u4e00\u5c42\u5200\u6cd5" },
      { year: "1980", event: "\u4e2d\u8282\u5e74\u4ee3\uff0c\u6210\u5168\u53bf\u76ae\u5f71\u8001\u827a\u4eba\u4e2d\u6280\u8827\u6700\u5168\u8005" },
      { year: "2001", event: "\u4ee3\u8868\u6e56\u5317\u7701\u51fa\u5e2d\u4e2d\u56fd\u9996\u5c4a\u975e\u9057\u535a\u89c8\u4f1a\u5e76\u5f53\u573a\u8868\u6f14" },
      { year: "2008", event: "\u88ab\u6388\u4e91\u68a6\u76ae\u5f71\u620f\u56fd\u5bb6\u7ea7\u4ee3\u8868\u6027\u4f20\u627f\u4eba" },
      { year: "2020", event: "\u5f00\u8bfe\u76f4\u64ad\u5e73\u53f0\uff0c\u5168\u7f51\u76f4\u64ad\u76ae\u5f71\u88fd\u4f5c\u8fc7\u7a0b\u5438\u5f15\u903e\u767e\u4e07\u89c2\u770b" },
    ],
  },
  {
    id: 3,
    name: "\u4f59\u8fbe\u96c4",
    level: "\u7701\u7ea7",
    item: "\u5b5d\u611f\u9ebb\u7cd6",
    itemEn: "Xiaogan Sesame Candy",
    years: 30,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    heroBg: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80",
    location: "\u5b5d\u611f\u5e02\u5b5d\u5357\u533a",
    born: "1970\u5e74",
    bio: "\u4f59\u8fbe\u96c4\uff0c\u5b5d\u611f\u9ebb\u7cd6\u7701\u7ea7\u4f20\u627f\u4eba\u3002\u5341\u516b\u5c81\u8fdb\u5165\u8001\u5c57\u9ebb\u7cd6\u5382\u5b66\u5f92\uff0c30\u5e74\u513f\u53ea\u5e72\u4e00\u4ef6\u4e8b\u2014\u2014\u628a\u5b5d\u611f\u9ebb\u7cd6\u505a\u5230\u6700\u597d\u3002\u5176\u9ebb\u7cd6\u9178\u751c\u5368\u5b9c\u3001\u9999\u8106\u4e0d\u7ca8\u7259\uff0c\u88ab\u8bc4\u4e3a\u5b5d\u611f\u9ebb\u7cd6\u7684\u6d3b\u5316\u5386\u53f2\u6559\u79d1\u4e66\u3002",
    story: "\u5b5d\u611f\u9ebb\u7cd6\u5df2\u6709\u903e\u5343\u5e74\u5386\u53f2\u3002\u516b\u5e74\u524d\u5929\u4e2d\u6307\u5b9a\u4e3a\u8d21\u54c1\uff0c\u56e0\u5176\u5236\u4f5c\u5de5\u827a\u590d\u6742\u3001\u88ab\u79f0\u4e3a\u4e2d\u56fd\u56db\u5927\u540d\u7cd6\u4e4b\u4e00\u3002\u4f59\u8fbe\u96c4\u4e3b\u5f20\u4e0d\u6362\u9a6c\u3001\u4e0d\u6362\u5c71\u6cc9\u6c34\uff0c\u4e0d\u8c03\u5546\u4e1a\u5546\u4e1a\u5316\u914d\u65b9\u3002\u4ed6\u8bf4\uff0c\u5b5d\u611f\u9ebb\u7cd6\u7684\u7075\u9b42\u5728\u4e8e\u201c\u624b\u5de5\u201d\u4e24\u5b57\uff0c\u5b8c\u5168\u624b\u5de5\u638c\u63e7\u706b\u5019\u548c\u62c9\u9ebb\u624b\u6cd5\u624d\u5c55\u5f97\u5f00\u90a3\u53e3\u72ec\u7279\u7684\u9999\u8106\u5473\u9053\u3002\u4e3a\u4e86\u603b\u7ed3\u7ecf\u9a8c\uff0c\u4ed6\u628a\u5236\u5f0f\u5b5d\u611f\u9ebb\u7cd6\u7684\u6574\u4e2a\u5de5\u5e8f\u6574\u7406\u6210\u56fe\u8868\u6d41\u7a0b\uff0c\u7b2c\u4e00\u6b21\u5c06\u5168\u957f\u8fc7\u7a0b\u516c\u5f00\u6559\u5b66\uff0c\u5e26\u52a8\u4e86\u8d76\u8d85\u4e00\u767e\u4eba\u7684\u5c0f\u4f20\u627f\u76d8\u3002",
    awards: [
      "\u5168\u56fd\u98df\u54c1\u5de5\u4e1a\u535a\u89c8\u4f1a\u91d1\u5956",
      "\u6e56\u5317\u7701\u975e\u9057\u9879\u76ee\u4f20\u627f\u4e2a\u4eba\u5956",
      "\u5b5d\u611f\u9ebb\u7cd6\u5236\u4f5c\u6280\u827a\u7701\u7ea7\u4f20\u627f\u4eba",
      "\u5b5d\u611f\u5e02\u5342\u4e1a\u529b\u9e21\u9ec4\u91d1\u8363\u8a89\u8bc1\u4e66",
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80", caption: "\u4f20\u7edf\u624b\u5de5\u76f4\u706b\u70e7\u5236\u9ebb\u7cd6" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80", caption: "\u5b5d\u611f\u9ebb\u7cd6\u793c\u76d2\u5c55\u793a" },
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80", caption: "\u5207\u5272\u5de5\u5e8f\u5c55\u793a" },
    ],
    services: [
      { icon: ShoppingBag, name: "\u624b\u5de5\u9ebb\u7cd6\u793c\u76d2\u5b9a\u5236", desc: "\u7eaf\u624b\u5de5\u5236\u4f5c\uff0c\u53ef\u521b\u5236\u4e2a\u6027\u5316\u6587\u5b57\u6807\u8bb0\uff0c\u9002\u5408\u4f01\u4e1a\u5b9a\u5236\u3001\u8282\u65e5\u9001\u793c", duration: "3\u5929\u5236\u4f5c", capacity: "\u4e0d\u9650", price: "\u4ece168\u5143" },
      { icon: BookOpen, name: "\u9ebb\u7cd6\u5236\u4f5c\u8bfe", desc: "\u4eb2\u624b\u4f53\u9a8c\u4f20\u7edf\u9ebb\u7cd6\u62c9\u5236\u5de5\u827a\uff0c\u5e26\u8d70\u81ea\u5df1\u5236\u4f5c\u7684\u6210\u54c1", duration: "2.5\u5c0f\u65f6", capacity: "10\u4eba", price: "198" },
    ],
    milestones: [
      { year: "1988", event: "\u8fdb\u5165\u5b5d\u611f\u6700\u8001\u7684\u9ebb\u7cd6\u5c0f\u5382\u5b66\u5f92\u5e76\u7559\u5382\u4e8b" },
      { year: "2000", event: "\u81ea\u7acb\u95e8\u6237\u521b\u529e\u4e2a\u4eba\u5c0f\u4f5c\u574a\uff0c\u5174\u5c45\u5b5d\u611f\u9ebb\u7cd6\u4f20\u627f\u7c7b\u516c\u53f8" },
      { year: "2012", event: "\u5b9d\u5e97\u5bbe\u5ea6\u8bc4\u5206\u8fda\u8d85\u540c\u5ea7\u7279\u8272\u4f18\u8d28\u5e97\u94fa\uff0c\u9ebb\u7cd6\u793c\u76d2\u8fdc\u9500\u5168\u56fd" },
      { year: "2017", event: "\u5b9e\u73b0\u975e\u9057\u8fdb\u6821\u56ed\u9879\u76ee\u5bfb\u8987\u5b5d\u611f\u6240\u6709\u4e2d\u5b66" },
      { year: "2023", event: "\u6258\u4eba\u5efa\u7acb\u7535\u5546\u8ddf\u56fd\u5185\u7535\u5546\u5e73\u53f0\uff0c\u9053\u5730\u67e5\u8bfe\u5c16\u8d27\u8fdc\u9500\u5168\u7403" },
    ],
  },
  {
    id: 4,
    name: "\u674e\u5fd7\u660e",
    level: "\u7701\u7ea7",
    item: "\u5e94\u57ce\u818f\u96d5",
    itemEn: "Yingcheng Gypsum Carving",
    years: 25,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    heroBg: "https://images.unsplash.com/photo-1517999349371-1ffe9e8d8a3e?auto=format&fit=crop&q=80",
    location: "\u5b5d\u611f\u5e02\u5e94\u57ce\u5e02",
    born: "1978\u5e74",
    bio: "\u674e\u5fd7\u660e\uff0c\u5e94\u57ce\u818f\u96d5\u7701\u7ea7\u4f20\u627f\u4eba\u3002\u5e94\u57ce\u4ea7\u77f3\u818f\u5386\u53f2\u60a0\u4e45\uff0c\u674e\u5fd7\u660e\u5c06\u4f20\u7edf\u77f3\u818f\u96d5\u523b\u4e0e\u73b0\u4ee3\u8bbe\u8ba1\u7406\u5ff5\u5de7\u5999\u878d\u5408\uff0c\u4f5c\u54c1\u5546\u4e1a\u4ef7\u503c\u548c\u827a\u672f\u8ffd\u6c42\u5747\u5c42\u6b21\u9ad8\uff0c\u4e3a\u5e94\u57ce\u818f\u96d5\u8d70\u5411\u5168\u56fd\u5e02\u573a\u5f00\u8f9f\u4e86\u4e00\u6761\u65b0\u8def\u5f84\u3002",
    story: "\u5e94\u57ce\u662f\u4e2d\u56fd\u5185\u9646\u6700\u5927\u7684\u5929\u7136\u5e38\u5c71\u77f3\u818f\u4ea7\u5730\uff0c\u5929\u7136\u77f3\u818f\u5341\u5206\u7ec6\u814c\uff0c\u8482\u5ea6\u9ad8\u3002\u674e\u5fd7\u660e\u5e74\u8f7b\u65f6\u5728\u77f3\u818f\u62cd\u5356\u884c\u8d44\u4e86\u5e74\uff0c\u53d1\u73b0\u5e22\u7240\u76d2\u5e95\u7684\u6296\u888b\u5965\u79d8\u662f\u9999\u6e29\u540e\u624b\u96d5\u7684\u77f3\u818f\u6d6e\u96d5\u3002\u81ea\u6b64\uff0c\u4ed6\u4ea7\u751f\u4e86\u7528\u77f3\u818f\u96d5\u5200\u62fc\u5c31\u6b64\u957f\u8fdc\u5c42\u91cf\u7684\u60f3\u6cd5\u3002\u4e94\u5e74\u81ea\u5b66\u3001\u8d70\u8bbf\u521a\u5de5\u3001\u8fdb\u8fdb\u51fa\u51fa\u89e3\u6790\u4e2d\u56fd\u4e0e\u897f\u65b9\u96d5\u523b\u725b\u8ddf\u77f3\u818f\u5de5\u827a\u7684\u8de8\u7bc4\u5408\u5f0f\uff0c\u5f62\u6210\u4e86\u72ec\u4e00\u65e0\u4e8c\u7684\u5e94\u57ce\u818f\u96d5\u65b0\u6d41\u6d3e\u3002",
    awards: [
      "\u6e56\u5317\u5de5\u8279\u7f8e\u672f\u5c55\u91d1\u5956",
      "\u5e94\u57ce\u5e02\u53cc\u767e\u5de5\u7a0b\u521b\u5efa\u8001\u5e08\u8363\u8a89\u79f0\u53f7",
      "\u7b2c\u4e8c\u5c4a\u6e56\u5317\u5de5\u8279\u7f8e\u672f\u5de5\u4e1a\u575a\u5b88\u5956",
      "\u5168\u56fd\u77f3\u818f\u4ea7\u54c1\u8bbe\u8ba1\u5927\u8d5b\u91d1\u5956",
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1517999349371-1ffe9e8d8a3e?auto=format&fit=crop&w=600&q=80", caption: "\u300a\u5929\u5730\u4e4b\u5408\u300b\u77f3\u818f\u96d5\u5237\u5e73\u5c55\u5c01\u9762\u4f5c\u54c1" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80", caption: "\u5e94\u57ce\u518d\u751f\u2014\u2014\u4e00\u7cfb\u5217\u77f3\u818f\u56fe\u817e\u5361" },
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80", caption: "\u5c71\u6c34\u4eba\u5c45\u3010\u5e94\u57ce\u3011\u77f3\u818f\u6d6e\u96d5\u4f5c\u54c1\u5c55" },
    ],
    services: [
      { icon: Brush, name: "\u77f3\u818f\u6444\u4ef6\u5b9a\u5236", desc: "\u5c0f\u91cf\u6279\u91cf\u5b9a\u5236\u77f3\u818f\u6444\u4ef6\uff0c\u6240\u6709\u72ec\u7acb\u8bbe\u8ba1\u3001\u624b\u5de5\u96d5\u523b\u548c\u5c0a\u8d35\u8d3c\u6599", duration: "7\u5929\u4ea4\u4ed8", capacity: "\u4e0d\u9650", price: "\u9762\u8bae" },
      { icon: BookOpen, name: "\u818f\u96d5\u4f53\u9a8c\u8bfe", desc: "\u4eb2\u81ea\u4f53\u9a8c\u5929\u7136\u5e22\u7240\u77f3\u818f\u96d5\u5237\u3001\u6253\u78e8\u5168\u5de5\u5e8f\uff0c\u5e26\u8d70\u81ea\u4e2a\u6027\u5316\u6454\u4ef6", duration: "3\u5c0f\u65f6", capacity: "6\u4eba", price: "358" },
    ],
    milestones: [
      { year: "1999", event: "\u5f00\u59cb\u8ddf\u968f\u5e94\u57ce\u521a\u5de5\u82d7\u5c71\u9ad8\u624b\u5c66\u7a76\u5929\u7136\u77f3\u818f\u7279\u6027" },
      { year: "2005", event: "\u9996\u6279\u4e2a\u4eba\u4f5c\u54c1\u5728\u5e94\u57ce\u5e02\u5de5\u8279\u7f8e\u672f\u8282\u4e2d\u8eba\u5c55\uff0c\u83b7\u91d1\u5956" },
      { year: "2010", event: "\u5efa\u7acb\u5e94\u57ce\u818f\u96d5\u5de5\u4f5c\u5ba4\uff0c\u5f15\u5165\u73b0\u4ee3\u8bbe\u8ba1\u7406\u5ff5\u521b\u65b0\u4ea7\u54c1\u7ebf" },
      { year: "2017", event: "\u88ab\u6388\u4e88\u5e94\u57ce\u818f\u96d5\u7701\u7ea7\u4f20\u627f\u4eba\u8d44\u683c" },
      { year: "2023", event: "\u4e2a\u4eba\u4f5c\u54c1\u5165\u9009\u300a\u4e2d\u56fd\u5de5\u8279\u7f8e\u672f\u5aca\u95e8\u4e91\u304e\u5e74\u5ea6\u5c55\u300b" },
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
  const artisan = ARTISANS.find(a => a.id === artisanId);

  if (!artisan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
        <p className="text-2xl font-serif text-muted-foreground">{"\u4f20\u627f\u4eba\u4e0d\u5b58\u5728"}</p>
        <Link href="/artisans" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
          <ArrowLeft className="w-4 h-4" /> {"\u8fd4\u56de\u4f20\u627f\u4eba\u5217\u8868"}
        </Link>
      </div>
    );
  }

  const levelColor = LEVEL_COLOR[artisan.level] ?? "bg-muted text-foreground";

  return (
    <div className="min-h-screen bg-background pb-24">

      {/* ── Hero banner ────────────────────────────────────────────────────── */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={artisan.heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-6">
          <Link href="/artisans" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 w-fit transition-colors">
            <ArrowLeft className="w-4 h-4" /> {"\u4f20\u627f\u4eba\u5217\u8868"}
          </Link>
          <div className="flex items-end gap-4">
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img src={artisan.avatar} alt={artisan.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColor}`}>
                  {artisan.level}{"\u4f20\u627f\u4eba"}
                </span>
                <span className="text-xs text-white/70 bg-white/15 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
                  {"\u4ece\u827a"} {artisan.years} {"\u5e74"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white drop-shadow-sm">{artisan.name}</h1>
              <p className="text-white/85 text-sm mt-0.5">{artisan.item} · {artisan.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="flex-1 space-y-8">

            {/* Bio */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <SectionLabel icon={BookOpen} text={"\u4f20\u627f\u4eba\u7b80\u4ecb"} />
              <p className="text-foreground/80 leading-8 text-sm mt-3">{artisan.bio}</p>
            </motion.div>

            {/* Story */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <SectionLabel icon={BookOpen} text={"\u4ece\u827a\u6545\u4e8b"} />
              <div className="relative mt-4 pl-4 border-l-2 border-primary/30">
                <span className="absolute -left-3 top-0 text-4xl text-primary/20 font-serif leading-none select-none">{"\u201c"}</span>
                <p className="text-foreground/75 leading-8 text-sm italic">{artisan.story}</p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm">
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
                      <span className="text-xs font-bold text-primary">{m.year}</span>
                      <p className="text-sm text-foreground/80 leading-relaxed mt-0.5">{m.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Gallery */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <SectionLabel icon={Brush} text={"\u4ee3\u8868\u4f5c\u54c1"} />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {artisan.gallery.map((g, i) => (
                  <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-border">
                    <img src={g.url} alt={g.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-2">
                      <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">{g.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right column ─────────────────────────────────────────────── */}
          <div className="lg:w-72 shrink-0 space-y-6">

            {/* Awards */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <SectionLabel icon={Award} text={"\u8363\u8a89\u4e0e\u83b7\u5956"} />
              <ul className="mt-3 space-y-2.5">
                {artisan.awards.map((a, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-1 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 text-primary" />
                    </span>
                    <span className="text-sm text-foreground/80 leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Info card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <SectionLabel icon={MapPin} text={"\u57fa\u672c\u4fe1\u606f"} />
              <dl className="mt-3 space-y-3">
                <InfoRow label={"\u4f20\u627f\u9879\u76ee"} value={artisan.item} />
                <InfoRow label={"\u4e13\u4e1a\u9886\u57df"} value={artisan.itemEn} />
                <InfoRow label={"\u6240\u5728\u5730\u533a"} value={artisan.location} />
                <InfoRow label={"\u51fa\u751f\u5e74\u4efd"} value={artisan.born} />
                <InfoRow label={"\u4ece\u827a\u5e74\u9650"} value={`${artisan.years} \u5e74`} />
                <InfoRow label={"\u4f20\u627f\u7ea7\u522b"} value={`${artisan.level}\u4ee3\u8868\u6027\u4f20\u627f\u4eba`} />
              </dl>
            </motion.div>

            {/* Services */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="bg-primary px-5 py-4">
                <p className="text-white font-bold text-sm">{"\u53ef\u9884\u7ea6\u670d\u52a1"}</p>
                <p className="text-white/70 text-xs">{"\u70b9\u51fb\u4e0b\u65b9\u670d\u52a1\u9879\u4e86\u89e3\u8be6\u60c5"}</p>
              </div>
              <div className="divide-y divide-border">
                {artisan.services.map((svc, i) => (
                  <div key={i} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-1.5">
                      <svc.icon className="w-4 h-4 text-primary shrink-0" />
                      <p className="font-bold text-sm text-foreground">{svc.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{svc.desc}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{svc.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{svc.capacity}</span>
                      <span className="ml-auto font-bold text-primary">{"\uffe5"}{svc.price}</span>
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
function SectionLabel({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
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
      <dd className="text-xs font-medium text-foreground leading-relaxed">{value}</dd>
    </div>
  );
}
