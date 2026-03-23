import { Router, type IRouter } from "express";
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

  const styleImages: Record<string, string[]> = {
    papercut: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800",
      "https://images.unsplash.com/photo-1547226706-b0c4d3dcef7c?w=800",
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
    kiln: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
    ],
  };

  const images = styleImages[style] || styleImages.papercut;
  const imageUrl = images[Math.floor(Math.random() * images.length)];

  await new Promise(resolve => setTimeout(resolve, 1500));

  res.json({
    imageUrl,
    style,
    scene,
    prompt,
    generatedAt: new Date().toISOString(),
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
