import express from "express";

const app = express();
app.use(express.json());

let items = [];

app.get("/", (req, res) => {
  res.json({ ok: true, service: "products_v1" });
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const it = { id: items.length + 1, ...req.body };
  items.push(it);
  res.json(it);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API running on port", port);
});
