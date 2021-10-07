import express, { Application } from "express";
import adminRoutes from "./routes/admin";
import publicRoutes from "./routes/home";
import path from "path";
import handlebars from "express-handlebars";

const app: Application = express();

app.engine("handlebars", handlebars({layoutsDir: 'views/layout/', defaultLayout: 'main-layout'}));
app.set("view engine", "handlebars");
app.set("views", 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(publicRoutes);

app.use((req, res, next) => {
  res.status(404).render('404.handlebars', {pageTitle: 'Page Not Found'});
});

app.listen(3005);
