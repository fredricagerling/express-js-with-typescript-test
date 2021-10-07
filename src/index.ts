import express, { Application } from "express";
import adminRoutes from "../routes/admin";
import publicRoutes from "../routes/home";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(publicRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>404 this is not the page you're looking for</h1>");
});

app.listen(3005);
