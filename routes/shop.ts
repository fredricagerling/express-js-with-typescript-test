import express from "express";

const publicRoutes = express.Router();

publicRoutes.use("/", (req, res, next) => {
  console.log("In middlware 2");
  res.send("<h1>Home</h1>");
});

export default publicRoutes;
