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

module.exports = productRouter;
