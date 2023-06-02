import mongoose from "mongoose";

//Connect to database
const URL_DB =
  "mongodb+srv://aripsapu:<FBXNCcYbpUNYhuso>@cluster0.huxwes5.mongodb.net/?retryWrites=true&w=majority";
try {
  mongoose.connect(URL_DB, {
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
