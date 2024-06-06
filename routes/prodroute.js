const express = require("express");

const router = express.Router();

const multer = require("multer");
filename = "";
const product = require("../models/product");

//upload product image

const mystorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();
    //image/png tet7AT esmha mithel
    let f1 = date + "." + file.mimetype.split("/")[1];
    redirect(null, f1);
    filename = f1;
  },
});

const upload = multer({ storage: mystorage });

//product crud

router.post("/createprod", upload.any("image"), async (req, res) => {
  try {
    data = req.body;

    prod = new product(data);
    prod.image = filename;
    savedprod = await prod.save();
    filename = "";
    res.status(200).send(savedprod);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getallprod", async (req, res) => {
  try {
    const products = await product.find();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    id = req.params.id;
    newdata = req.body;
    produpdated = await product.findByIdAndUpdate({ _id: id }, newdata);
    res.send(produpdated);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    id = req.params.id;
    deletedprod = product.findOneAndDelete({ _id: id });
    res.send(deletedprod);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
