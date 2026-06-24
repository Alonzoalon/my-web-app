import "dotenv/config";
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter, log: ["query"] });
const app = express();
const PORT = process.env.PORT || 8888;

app.set("view engine", "ejs");
app.set("views", "./views");
// フォームから送られてきたデータを受け取れるようにする設定
app.use(express.urlencoded({ extended: true }));

// 一覧画面を表示する
app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.render("index", { users });
});

// ユーザーを追加する
app.post("/users", async (req, res) => {
  const name = req.body.name;
  if (name) {
    await prisma.user.create({ data: { name } });
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
