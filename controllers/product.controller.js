const { Router } = require("express");
const productModal = require("../models/product.model");

const productRouter = Router();

productRouter.get("", async (req, res) => {
  try {
    const products = await productModal.find({});
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModal.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
});

module.exports = productRouter;
