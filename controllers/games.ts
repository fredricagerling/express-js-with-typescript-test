import { Request, Response, NextFunction } from "express";
import Game from "../models/game";

export const getAddGame = (req: Request, res: Response, next: NextFunction) => {
  res.render("add-game", {
    pageTitle: "Add a game!",
    path: "/",
    activeAdd: true,
    editing: false,
  });
};

export const getEditGame = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editMode = req.query.edit;
  console.log(editMode);
  const gameId = req.params.gameId;

  Game.findById(gameId, (game: Game) => {
    res.render("add-game", {
      pageTitle: "Edit a game!",
      path: "/",
      editing: editMode,
      game: game,
    });
    console.log(game);
  });
};

export const postEditGame = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameId = req.body.gameId;
  const updatedTitle = req.body.title;
  const updatedPlatform = req.body.platform;
  const updatedReleaseYear = req.body.releaseYear;
  const updatedSlug = req.body.slug;
  const updatedDescription = req.body.description;

  const updatedGame = new Game(
    gameId,
    updatedTitle,
    updatedPlatform,
    updatedReleaseYear,
    updatedSlug,
    updatedDescription
  );

  updatedGame.save();
  res.redirect("/");
};

export const postAddGame = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqGame: Game = req.body;

  const newGame = new Game(
    (reqGame.id = null),
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
      path: "/games",
      pageTitle: game.title,
      activeHome: true,
    });
  });
};

export const postDeleteGame = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameId = req.body.gameId;
  Game.delete(gameId);
  res.redirect('/');
};
