import { Request, Response, NextFunction } from "express";
import { PrismaClient, Game } from ".prisma/client";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE: number = 3;

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
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  await prisma.game.update({
    where: { id: gameId },
    data: {
      title: updatedTitle,
      platform: updatedPlatform,
      releaseYear: updatedReleaseYear,
      imageUrl: updatedImageUrl,
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
      imageUrl: req.body.imageUrl,
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
  let paginatedGames: Game[] = [];
  let skip = 0;
  let page: number;

  if (req.query.page) {
    try {
      page = parseInt(req.query.page.toString());
    } catch (error) {
      console.log(error);
    }

    if (page > 1) {
      skip = page - 1;
    }
  }
  
  const numOfGames = await prisma.game.count();

  paginatedGames = await prisma.game.findMany({
    skip: skip * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  res.render("home", {
    games: paginatedGames,
    pageTitle: "Home",
    path: "/",
    hasGames: paginatedGames.length > 0,
    activeHome: true,
    numOfPages: Math.ceil(numOfGames / ITEMS_PER_PAGE)
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
