import express, { Application } from "express";

const app: Application = express();

app.listen(3005);

app.use((req, res, next) => {
  console.log("In hehrheehe111");
  next();
});

app.use((req, res, next) => {
  console.log("In middlware 2");
});

