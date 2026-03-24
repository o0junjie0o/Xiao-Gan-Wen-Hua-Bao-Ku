import { Router, type IRouter } from "express";
import OpenAI from "openai";
import { db } from "@workspace/db";
import { heritageItemsTable, artisansTable, artisanServicesTable, quizQuestionsTable, productsTable, activitiesTable } from "@workspace/db";
import { eq, and, like, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/heritage/items", async (req, res) => {
  const { level, category, page = 1, limit = 12 } = req.query as Record<string, string>;
  const offset = (Number(page) - 1) * Number(limit);

  const conditions = [];
  if (level && level !== "all") conditions.push(eq(heritageItemsTable.level, level));
  if (category) conditions.push(eq(heritageItemsTable.category, category));

  const items = await db.select().from(heritageItemsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(Number(limit))
    .offset(offset);

  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(heritageItemsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json({ items, total: Number(count), page: Number(page), limit: Number(limit) });
});

router.get("/heritage/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [item] = await db.select().from(heritageItemsTable).where(eq(heritageItemsTable.id, id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.get("/heritage/categories", async (_req, res) => {
  const results = await db.select({
    category: heritageItemsTable.category,
    count: sql<number>`count(*)`,
  }).from(heritageItemsTable).groupBy(heritageItemsTable.category);

  const iconMap: Record<string, string> = {
    "民间文学": "📖",
    "传统技艺": "🎨",
    "传统音乐": "🎵",
    "传统舞蹈": "💃",
    "传统戏剧": "🎭",
    "曲艺": "🎤",
    "民俗": "🏮",
    "传统美食": "🍜",
  };

  const categories = results.map(r => ({
    id: r.category,
    name: r.category,
    count: Number(r.count),
    icon: iconMap[r.category] || "🏛️",
  }));

  res.json({ categories });
});

router.get("/artisans", async (req, res) => {
  const { level, page = 1, limit = 12 } = req.query as Record<string, string>;
  const offset = (Number(page) - 1) * Number(limit);

  const conditions = [];
  if (level) conditions.push(eq(artisansTable.level, level));

  const artisans = await db.select().from(artisansTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(Number(limit))
    .offset(offset);

  const artisansWithServices = await Promise.all(
    artisans.map(async (artisan) => {
      const services = await db.select().from(artisanServicesTable)
        .where(eq(artisanServicesTable.artisanId, artisan.id));
      return { ...artisan, services };
    })
  );

  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(artisansTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json({ artisans: artisansWithServices, total: Number(count) });
});

router.get("/artisans/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [artisan] = await db.select().from(artisansTable).where(eq(artisansTable.id, id));
  if (!artisan) return res.status(404).json({ error: "Not found" });

  const services = await db.select().from(artisanServicesTable)
    .where(eq(artisanServicesTable.artisanId, id));

  res.json({ ...artisan, services });
});

router.get("/quiz/questions", async (req, res) => {
  const { difficulty, limit = 10 } = req.query as Record<string, string>;

  const conditions = [];
  if (difficulty) conditions.push(eq(quizQuestionsTable.difficulty, difficulty));

  const questions = await db.select({
    id: quizQuestionsTable.id,
    question: quizQuestionsTable.question,
    options: quizQuestionsTable.options,
    difficulty: quizQuestionsTable.difficulty,
    category: quizQuestionsTable.category,
    points: quizQuestionsTable.points,
  }).from(quizQuestionsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(Number(limit));

  res.json({ questions });
});

router.post("/quiz/submit", async (req, res) => {
  const { questionId, selectedAnswer } = req.body;

  const [question] = await db.select().from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.id, Number(questionId)));

  if (!question) return res.status(404).json({ error: "Question not found" });

  const correct = question.correctAnswer === Number(selectedAnswer);
  const pointsEarned = correct ? (question.points || 10) : 0;

  res.json({
    correct,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    pointsEarned,
    totalPoints: pointsEarned,
  });
});

router.get("/products", async (req, res) => {
  const { category, page = 1, limit = 12 } = req.query as Record<string, string>;
  const offset = (Number(page) - 1) * Number(limit);

  const conditions = [];
  if (category) conditions.push(eq(productsTable.category, category));

  const products = await db.select().from(productsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(Number(limit))
    .offset(offset);

  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(productsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json({ products, total: Number(count) });
});

router.get("/activities", async (req, res) => {
  const { status } = req.query as Record<string, string>;

  const conditions = [];
  if (status) conditions.push(eq(activitiesTable.status, status));

  const activities = await db.select().from(activitiesTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json({ activities });
});

router.post("/ai/generate", async (req, res) => {
  const { style, scene, prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";

  if (!apiKey) {
    return res.status(500).json({ error: "DEEPSEEK_API_KEY 未配置，请在项目 Secrets 中添加该密钥" });
  }

  const styleMap: Record<string, string> = {
    papercut: "孝感雕花剪纸（以刻刀代剪、镂空精细、红纸黑线为特征的国家级非遗）",
    shadow_puppet: "云梦皮影（楚皮影流派、牛皮镂刻、夜晚幕布投影演出的传统戏剧）",
    xiao_culture: "孝文化工笔（以孝感董永传说为题材，宋代工笔重彩风格）",
    plaster_carving: "应城膏雕（以天然纤维石膏为原料的独特雕刻技艺，洁白细腻）",
  };

  const sceneMap: Record<string, string> = {
    poster: "艺术海报（竖版，适合展览宣传）",
    phone_case: "手机壳图案（正方形构图，居中主体）",
    bookmark: "书签（细长竖版，精致典雅）",
    avatar: "社交媒体头像（圆形构图，人物或标志性元素为主体）",
    greeting_card: "节日贺卡（横版，温馨祝福主题）",
  };

  const styleName = styleMap[style] || styleMap.papercut;
  const sceneName = sceneMap[scene] || sceneMap.poster;

  const systemPrompt = `你是孝感非遗文化数字化平台的专属AI文创设计师，精通孝感非物质文化遗产与中国传统美学。
你的任务是根据用户的创意描述，生成一份完整的文创设计方案，必须严格按照以下结构输出，每个板块用【】标注：

【设计主题】一句点睛之语（15字以内）

【创意概念】
3-4句话描述设计理念与文化内涵。

【视觉构成】
详细描述画面构图、色彩搭配、主要视觉元素，5-8句话。

【非遗元素】
- 融入的第一个非遗技艺特征
- 融入的第二个非遗技艺特征
- 融入的第三个非遗技艺特征

【文化寓意】
诠释作品所传达的孝文化或地域文化精神，2-3句话。

【设计诗句】
原创一首配套的五言绝句（四句，换行排列）。

请用专业而富有诗意的中文创作，体现湖北孝感的地域文化特色，禁止使用Markdown格式（如**加粗**或#标题）。`;

  const userMessage = `非遗风格：${styleName}
应用场景：${sceneName}
创意描述：${prompt}

请为以上创意生成完整的文创设计方案。`;

  let generatedText = "";
  let modelUsed = "deepseek-chat";
  let usageInfo: unknown = null;

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: baseUrl,
    });

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 1200,
      temperature: 0.85,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    generatedText = completion.choices[0]?.message?.content || "";
    modelUsed = completion.model || "deepseek-chat";
    usageInfo = completion.usage;
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string; code?: string };
    if (e.status === 401 || e.code === "invalid_api_key") {
      return res.status(401).json({ error: "DEEPSEEK_API_KEY 无效，请检查 Secrets 中配置的密钥是否正确" });
    }
    if (e.status === 429) {
      return res.status(429).json({ error: "请求过于频繁，请稍后重试" });
    }
    if (e.status === 402) {
      return res.status(402).json({ error: "DeepSeek 账户余额不足，请充值后重试" });
    }
    return res.status(500).json({ error: `DeepSeek 调用失败: ${e.message || "未知错误"}` });
  }

  const styleImages: Record<string, string[]> = {
    papercut: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800",
    ],
    shadow_puppet: [
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800",
    ],
    xiao_culture: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800",
    ],
    plaster_carving: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
    ],
  };
  const images = styleImages[style] || styleImages.papercut;
  const imageUrl = images[Math.floor(Math.random() * images.length)];

  res.json({
    generatedText,
    imageUrl,
    style,
    scene,
    prompt,
    generatedAt: new Date().toISOString(),
    model: modelUsed,
    usage: usageInfo,
  });
});

router.get("/stats", async (_req, res) => {
  const [nationalCount] = await db.select({ count: sql<number>`count(*)` }).from(heritageItemsTable).where(eq(heritageItemsTable.level, "national"));
  const [provincialCount] = await db.select({ count: sql<number>`count(*)` }).from(heritageItemsTable).where(eq(heritageItemsTable.level, "provincial"));
  const [municipalCount] = await db.select({ count: sql<number>`count(*)` }).from(heritageItemsTable).where(eq(heritageItemsTable.level, "municipal"));
  const [artisanCount] = await db.select({ count: sql<number>`count(*)` }).from(artisansTable);
  const [productCount] = await db.select({ count: sql<number>`count(*)` }).from(productsTable);

  res.json({
    nationalItems: Number(nationalCount.count),
    provincialItems: Number(provincialCount.count),
    municipalItems: Number(municipalCount.count),
    artisanCount: Number(artisanCount.count),
    productCount: Number(productCount.count),
    visitorCount: 128456,
    cityName: "孝感",
  });
});

export default router;
