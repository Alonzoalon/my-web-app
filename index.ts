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
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.render("index", { users });
});

app.post("/users", async (req, res) => {
  const name = req.body.name;
  const ageStr = req.body.age;
  // 年齢が入力されていたら数値に変え、空なら null にする
  const age = ageStr ? parseInt(ageStr) : null;

  if (name) {
    await prisma.user.create({
      data: { name, age },
    });
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
