import express from "express";
const router = express.Router();

// router.get("/", async (req, res) => {
//   let fixedQueryObject = {
//     country: "us",
//     q: "news",
//   };
//   let queryObject = addApiKey(fixedQueryObject);
//   let url = createUrlFromQueryObject(queryObject);
//   let newsArticles = await fetchData(url);
//   res.send(newsArticles);
// });

// router.post("/", async (req, res) => {
//   let query = req.body;
//   let queryObjectWithApiKey = addApiKey(query);
//   let url = createUrlFromQueryObject(queryObjectWithApiKey);
//   let newsArticles = await fetchData(url);
//   res.send(newsArticles);
// });

router.get("/", async (req, res) => {
  res.send("GET called");
});

router.post("/", async (req, res) => {
  res.send("POST called");
});

export default router;
