import express, { Application } from "express";
import adminRoutes from "../routes/admin";
import publicRoutes from "../routes/home";
import path from "path";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../", "public")));

app.use("/admin", adminRoutes);
app.use(publicRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../", "views", "404.html"));
});

app.listen(3005);
