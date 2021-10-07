import express from "express";
import { getGames } from "../controllers/games";

const router = express.Router();

router.get("/", getGames);

export default router;
