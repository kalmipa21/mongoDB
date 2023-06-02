import express from "express";
import cors from "cors";
import { PORT } from "./src/configs/env.js";
import r_product from "./src/routers/products.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v2", r_product);

app.listen(PORT, function () {
  console.log("Server is running");
});
