import express from "express";
import newsRouter from "./routes/news/news.js";
import usersRouter from "./routes/users/users.js";
import queriesRouter from "./routes/queries/queries.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/news", newsRouter);
app.use("/users", usersRouter);
app.use("/queries", queriesRouter);

app.get("/", (req, res) => {
  res.status(200).send("welcome to the News Reader App");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
