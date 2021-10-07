import express from "express";
import path from "path";

const router = express.Router();

export const GAME_STORAGE: Game[] = [];

type Game = {
  title: String;
  platform: String;
  releaseYear: Number;
};

router.get("/add-game", (req, res, next) => {
  res.render("add-game", {
    pageTitle: "Add a game!",
    path: "/",
    activeAdd: true,
  });
});

router.post("/add-game", (req, res, next) => {
  const addedGame: Game = req.body;

  GAME_STORAGE.push(addedGame);
  res.redirect("/");
});

export default router;
