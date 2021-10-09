import express, { Application } from "express";
import adminRoutes from "./routes/admin";
import publicRoutes from "./routes/home";
import path from "path";
import handlebars from "express-handlebars";
import { get404 } from "./controllers/error";

const app: Application = express();
const PORT: Number = 3005;

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(publicRoutes);

app.use(get404);

app.listen(PORT);
