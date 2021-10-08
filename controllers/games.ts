import { Request, Response, NextFunction } from "express";
import Game from "../models/game";

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
  const reqGame: Game = req.body;

  const newGame = new Game(
    reqGame.title,
    reqGame.platform,
    reqGame.releaseYear
  );

  newGame.save();
  
  res.redirect("/");
};

export const getGames = (req: Request, res: Response, next: NextFunction) => {
  res.render("home", {
    games: Game.fetchAll(),
    pageTitle: "Home",
    path: "/",
    hasGames: Game.fetchAll().length > 0,
    activeHome: true,
  });
};
