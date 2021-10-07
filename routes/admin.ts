import express from "express";

const adminRoutes = express.Router();

adminRoutes.get("/add-game", (req, res, next) => {
  res.send(`
      <form action="/game" method="POST">
          <input type="text" name="title">
          <button type="submit">Add Game</button>
      </form>`);
});

adminRoutes.post("/game", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default adminRoutes;
