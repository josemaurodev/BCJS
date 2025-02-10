import express from "express";
import Product from "../models/Product.model.js"; //tem que ser aqui pq é aqui que a gente está de fato mexendo no banco
import {
  createProducts,
  getProducts,
  updateProducts,
  deleteProducts,
} from "../controllers/productController.js"; //aqui importamos o controller

const router = express.Router();

//endpoints dos produtos
//server.js -> productRoutes.js(aqui) -> productController.js
router.get("/getAll/", getProducts);
router.post("/createProduct/", createProducts);
router.put("/updateProduct/:id", updateProducts);
router.delete("/deleteProduct/:id", deleteProducts);

export default router;
