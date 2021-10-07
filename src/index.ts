import express, { Application } from "express";
import adminRoutes from "../routes/admin";
import publicRoutes from "../routes/shop";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(publicRoutes);

app.listen(3005);
