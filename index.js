import express from "express";
import cors from "cors";
import r_products from "./src/routers/products.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/v1", r_products);

app.listen(3002, () => console.log("App running"));
