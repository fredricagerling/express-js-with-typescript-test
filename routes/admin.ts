import express from "express";
import { getAddGame, postAddGame } from "../controllers/games";

const router = express.Router();

router.get("/add-game", getAddGame);

router.post("/add-game", postAddGame);

export default router;
