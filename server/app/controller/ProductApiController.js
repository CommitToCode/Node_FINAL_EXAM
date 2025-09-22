const ErrorCode = require("../helper/httpStatusCode");
const { productValidationSchema, ProductModel } = require("../model/Product");
const CategoryModel = require("../model/Category"); 

class ProductApiController {
  
  async createProduct(req, res) {
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const newProduct = new ProductModel({
        ...req.body,
        image: req.file ? "/uploads/" + req.file.filename : null,
      });

      await newProduct.save();
      res.status(201).json({
        message: "Product added successfully",
        data: newProduct,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }

 
async getProduct(req, res) {
  try {
    const products = await ProductModel.find({}).populate("category", "name");
    res.status(200).json({
      status: true,
      message: "Get all products successfully",
      total: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}


async getSingleProduct(req, res) {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id).populate("category", "name"); // ✅ populate category

    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Get single product data",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}


 
  async editProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await ProductModel.findById(productId);
      const categories = await CategoryModel.find();

      if (!product) {
        return res.status(404).send("Product not found");
      }

      res.render("product/edit", { product, categories });
    } catch (err) {
      console.error("Error fetching product:", err);
      res.status(500).send("Server Error");
    }
  }

  
  async updateProduct(req, res) {
    try {
      const id = req.params.id;

      const updatedData = { ...req.body };
      if (req.file) {
        updatedData.image = "/uploads/" + req.file.filename;
      }

      await ProductModel.findByIdAndUpdate(id, updatedData);

      return res.status(ErrorCode.create).json({
        status: true,
        message: "Product Update successfully",
      });
    } catch (error) {
      return res.status(ErrorCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }

  
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      await ProductModel.findByIdAndDelete(id);

      return res.status(ErrorCode.create).json({
        status: true,
        message: "Product delete successfully",
      });
    } catch (error) {
      return res.status(ErrorCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductApiController();
