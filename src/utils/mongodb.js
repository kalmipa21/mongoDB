import { MongoClient } from "mongodb";

// const url = `mongodb://localhost:27017`;
const url = "mongodb://127.0.0.1:27017";

const connection = new MongoClient(url, { useUnifiedTopology: true });
(async () => {
  try {
    await connection.connect();
  } catch (error) {
    console.log("MongoDB", error);
  }
})();
const db = connection.db("db_tokobapakmu");
export default db;
