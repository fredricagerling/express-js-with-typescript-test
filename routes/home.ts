import express from "express";
import { getGames, getGameById } from "../controllers/games";

const router = express.Router();

router.get("/", getGames);

router.get("/games/:gameId", getGameById);

export default router;
