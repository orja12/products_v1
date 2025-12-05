
import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
app.use(express.json());
const db = new PrismaClient();

app.get("/", (req, res) => res.json({ ok: true, message: "Products API working" }));

app.post("/products", async (req, res) => {
  try {
    const product = await db.product.create({ data: req.body });
    res.json(product);
  } catch (e) {
    res.json({ error: String(e) });
  }
});

app.get("/products", async (req, res) => {
  const products = await db.product.findMany();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const product = await db.product.findUnique({
    where: { id: Number(req.params.id) }
  });
  res.json(product);
});

app.put("/products/:id", async (req, res) => {
  const product = await db.product.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  const product = await db.product.delete({
    where: { id: Number(req.params.id) }
  });
  res.json(product);
});

app.listen(3000, () => console.log("Products API running on port 3000"));
