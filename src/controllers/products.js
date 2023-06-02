import Products from "../models/products.js";
import messages from "../utils/messages.js";
import Cloudinary from "../configs/cloudinary.js";

const createProduct = async (req, res) => {
  const file = req.file;
  const body = req.body;
  if (file) {
    try {
      const result = await Cloudinary.uploader.upload(file.path);

      let product = await new Products({
        ...body,
        profile_img: result.secure_url,
        cloudinary_id: result.public_id,
      }).save();

      messages(res, 201, "Create product success", product);
    } catch (error) {
      messages(res, 500, error?.messages || "Internal server error");
    }
  } else {
    messages(res, 404, "Image is required");
  }
};

const allProduct = async (req, res) => {
  try {
    const result = await Products.find();
    messages(res, 200, "All Data", result);
  } catch (error) {
    messages(res, 500, error?.message || "Products not found");
  }
};

const detailProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const detail = await Products.findById(id);
    messages(res, 200, "This is your detail product", detail);
  } catch (error) {
    messages(res, 500, error?.message || "Products not found");
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const detail = await Products.findById(id);

    if (!detail) return messages(res, 404, "Product not found");

    //Delete image from cloudinary
    await Cloudinary.uploader.destroy(detail.cloudinary_id);
    //Delete image in local db
    await Products.deleteOne(detail._id);

    messages(res, 200, "Your data has been deleted");
  } catch (error) {
    messages(res, 500, error?.message || "Products not found");
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.file;

  try {
    let detail = await Products.findById(id);
    const data = { ...body };

    if (!detail) return messages(res, 404, "Product not found");

    if (file) {
      // Delete image from cloudinary
      await Cloudinary.uploader.destroy(detail.cloudinary_id);

      // Upload new image to cloudinary
      const result = await Cloudinary.uploader.upload(file.path);

      data.profile_img = result.secure_url;
      data.cloudinary_id = result.public_id;
    }

    const newData = await Products.findByIdAndUpdate(id, data, {
      new: true,
    });

    messages(res, 200, "Update data success", newData);
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

export {
  createProduct,
  allProduct,
  detailProduct,
  deleteProduct,
  updateProduct,
};
