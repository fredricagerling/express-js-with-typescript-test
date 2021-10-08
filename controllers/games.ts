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
    reqGame.releaseYear,
    reqGame.slug,
    reqGame.description
  );

  newGame.save();

  res.redirect("/");
};

export const getGames = (req: Request, res: Response, next: NextFunction) => {
  Game.fetchAll((games: Game[]) => {
    res.render("home", {
      games: games,
      pageTitle: "Home",
      path: "/",
      hasGames: games.length > 0,
      activeHome: true,
    });
  });
};

export const getGameById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameId = req.params.gameId;
  Game.findById(gameId, (game: Game) => {
    res.render("game-details", {
      game: game,
      pageTitle: game.title
    });
  });
};
