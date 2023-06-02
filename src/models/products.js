import mongoose from "../configs/mongoose.js";

const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  price: { type: Number, require: true },
  profile_img: String,
  cloudinary_id: String,
});
export default mongoose.model("Products", productSchema);
