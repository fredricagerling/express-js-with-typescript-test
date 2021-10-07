import express from "express";
import path from "path";
import { GAME_STORAGE } from "../routes/admin";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("home", {
    games: GAME_STORAGE,
    pageTitle: "Home",
    path: "/",
    hasGames: GAME_STORAGE.length > 0,
    activeHome: true,
  });

  console.log(GAME_STORAGE);
});

export default router;
