import mongoose from "mongoose";
import { DB_URL } from "./env.js";

//Connect to database

try {
  mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("connected to db");
} catch (error) {
  handleError(error);
}
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

export default mongoose;
