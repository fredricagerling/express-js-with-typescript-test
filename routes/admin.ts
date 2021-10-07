import express from "express";
import path from "path";

const router = express.Router();

type Game = {
  title: String;
  platform: String;
  releaseYear: Number;
}

router.get("/add-game", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-game.html"));
});

router.post("/add-game", (req, res, next) => {
  const addedGame: Game = req.body;
  console.log(addedGame);
  res.redirect("/");
});

export default router;
