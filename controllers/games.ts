import { Request, Response, NextFunction } from "express";
import { PrismaClient, Game } from ".prisma/client";
import { ok } from "assert";

const prisma = new PrismaClient();

export const getAddGame = (req: Request, res: Response, next: NextFunction) => {
  res.render("add-game", {
    pageTitle: "Add a game!",
    path: "/",
    activeAdd: true,
    editing: false,
  });
};

export const getEditGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editMode = req.query.edit;
  const gameId = parseInt(req.params.gameId);

  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  res.render("add-game", {
    pageTitle: "Edit a game!",
    path: "/",
    editing: editMode,
    game: game,
  });
  console.log(game);
};

export const postEditGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameId = parseInt(req.body.gameId);
  const updatedTitle = req.body.title;
  const updatedPlatform = req.body.platform;
  const updatedReleaseYear = parseInt(req.body.releaseYear);
  const updatedSlug = req.body.slug;
  const updatedDescription = req.body.description;

  await prisma.game.update({
    where: { id: gameId },
    data: {
      title: updatedTitle,
      platform: updatedPlatform,
      releaseYear: updatedReleaseYear,
      slug: updatedSlug,
      description: updatedDescription,
    },
  });

  res.redirect("/");
};

export const postAddGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await prisma.game.create({
    data: {
      title: req.body.title,
      platform: req.body.platform,
      releaseYear: parseInt(req.body.releaseYear),
      slug: req.body.slug,
      description: req.body.description,
    },
  });
  res.redirect("/");
};

export const getGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allGames = await prisma.game.findMany();

  res.render("home", {
    games: allGames,
    pageTitle: "Home",
    path: "/",
    hasGames: allGames.length > 0,
    activeHome: true,
  });
};

export const getGameById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameId = parseInt(req.params.gameId);
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  res.render("game-details", {
    game: game,
    path: "/games",
    pageTitle: game.title,
    activeHome: true,
  });
};

export const postDeleteGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gameId = parseInt(req.body.gameId);
  await prisma.game.delete({
    where: { id: gameId },
  });

  res.redirect("/");
};
