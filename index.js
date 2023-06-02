import express from "express";
import cors from "cors";
import r_product from "./src/routers/products.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v2", r_product);

app.listen(3003, function () {
  console.log("Server is running");
});
