import Products from "../models/products.js";
import messages from "../utils/messages.js";
import { ObjectId } from "mongodb";

const allData = async (req, res) => {
  try {
    const data = await Products.find().toArray();
    messages(res, 200, "all data", data);
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

const detailProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const detail = await Products.findOne({ _id: new ObjectId(id) });
    if (detail) return messages(res, 200, "Detail data", detail);
    messages(res, 404, "Product not found!");
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const detail = await Products.deleteOne({ _id: new ObjectId(id) });
    if (detail) return messages(res, 200, "Product has been deleted");
    messages(res, 404, "Product not found!");
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

const createProduct = async (req, res) => {
  const name = req.body.name;
  const Price = req.body.Price;
  const Stock = req.body.Stock;
  try {
    const createData = await Products.insertOne({ name, Price, Stock });
    messages(res, 201, "Product has been added", createData);
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const _id = new ObjectId(id);
    const detail = await Products.findOne({ _id });
    if (detail) {
      const result = Products.updateOne({ _id }, { $set: { ...data } });
      messages(res, 200, "Edit success", detail);
    }
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

export { allData, detailProduct, deleteProduct, createProduct, updateProduct };
