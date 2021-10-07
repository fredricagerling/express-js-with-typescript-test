import { Request, Response, NextFunction } from "express";

export const GAME_STORAGE: Game[] = [];

type Game = {
  title: String;
  platform: String;
  releaseYear: Number;
};

export const getAddGame = (req: Request, res: Response, next: NextFunction) => {
  res.render("add-game", {
    pageTitle: "Add a game!",
    path: "/",
    activeAdd: true,
  });
};

export const postAddGame = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addedGame: Game = req.body;

  GAME_STORAGE.push(addedGame);
  res.redirect("/");
};

export const getGames = (req: Request, res: Response, next: NextFunction) => {
  res.render("home", {
    games: GAME_STORAGE,
    pageTitle: "Home",
    path: "/",
    hasGames: GAME_STORAGE.length > 0,
    activeHome: true,
  });

  console.log(GAME_STORAGE);
};