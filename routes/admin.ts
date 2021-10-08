import express from "express";
import { getEditGame, getAddGame, postAddGame, postEditGame, postDeleteGame} from "../controllers/games";

const router = express.Router();

router.get("/add-game", getAddGame);

router.post("/add-game", postAddGame);

router.get("/edit-game/:gameId", getEditGame);

router.post("/edit-game/", postEditGame);

router.post("/delete-game/", postDeleteGame);

export default router;
