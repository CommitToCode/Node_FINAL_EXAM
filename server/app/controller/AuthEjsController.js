const Product = require("../model/Product");
const httpStatusCode = require("../helper/httpStatusCode");
const { CategoryModel } = require("../model/Category");
const Category = require('../model/Category'); 

class AuthEjsController {
  async adminDashboard(req, res) {
    try {
          const products = await Product.ProductModel.find(); 
    const categories = await Category.CategoryModel.find();
      res.render("dashboard",{ products, categories });
    } catch (error) {
      console.log(error.message);
    }
  }

  
  async productList(req, res) {
    try {
    
      const products = await Product.ProductModel.find({ isDeleted: false })
        .populate("category", "name");

      res.render("product/list", { products });
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Server Error");
    }
  }

  
  async addProduct(req, res) {
    try {
      const categories = await CategoryModel.find({ isDeleted: false });
      res.render("product/add", { categories });
    } catch (err) {
      console.error("Error loading add product:", err);
      res.status(500).send("Server Error");
    }
  }


  async createProduct(req, res) {
    try {
      const { name, price, dese, category, brand_name, color, size, status } =
        req.body;

      const newProduct = new Product.ProductModel({
        name,
        price,
        dese,
        category, 
        brand_name,
        color: color.split(",").map((c) => c.trim()),
        size: size.split(",").map((s) => s.trim()),
        status: status === "true",
          image: req.file ? "/uploads/" + req.file.filename : null
      });

      await newProduct.save();
      res.redirect("/list");
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).send("Server Error");
    }
  }


  async editProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.ProductModel.findById(productId);

      if (!product) {
        return res.status(404).send("Product not found");
      }

      const categories = await CategoryModel.find({ isDeleted: false });

      res.render("product/edit", { product, categories });
    } catch (err) {
      console.error("Error fetching product:", err);
      res.status(500).send("Server Error");
    }
  }

  
  async updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const { name, price, dese, category, brand_name, color, size, status } =
      req.body;

    const updatedData = {
      name,
      price,
      dese,
      category,
      brand_name,
      color: color.split(",").map((c) => c.trim()),
      size: size.split(",").map((s) => s.trim()),
      status: status === "true",
    };

    if (req.file) {
      updatedData.image = "/uploads/" + req.file.filename; 
    }

    const updatedProduct = await Product.ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.redirect("/list");
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Server Error");
  }
}



  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;

      const product = await Product.ProductModel.findByIdAndUpdate(
        productId,
        { isDeleted: true },
        { new: true }
      );

      if (!product) {
        return res.status(404).send("Product not found");
      }

      res.redirect("/list");
    } catch (err) {
      console.error("Error performing soft delete:", err);
      res.status(500).send("Server Error");
    }
  }


  async categoryList(req, res) {
    try {
      const categories = await CategoryModel.find({ isDeleted: false }).sort({
        createdAt: -1,
      });

      res.render("category/list", { categories });
    } catch (err) {
      console.error("Error loading categories:", err.message);
      res.status(500).send("Server Error");
    }
  }

  async addCategory(req, res) {
    try {
      res.render("category/add", { error: null });
    } catch (err) {
      console.error("Error rendering add category:", err);
      res.status(500).send("Server Error");
    }
  }

  async createCategory(req, res) {
    try {
      const { name, description, status } = req.body;

      const newCategory = new CategoryModel({
        name,
        description,
        status: status === "true",
      });

      await newCategory.save();
      res.redirect("/categories");
    } catch (err) {
      console.error("Error creating category:", err);
      res.render("category/add", { error: err.message });
    }
  }

  async editCategory(req, res) {
    try {
      const category = await CategoryModel.findById(req.params.id);
      if (!category) return res.status(404).send("Category not found");

      res.render("category/edit", { category, error: null });
    } catch (err) {
      console.error("Error loading edit form:", err);
      res.status(500).send("Server Error");
    }
  }

  async updateCategory(req, res) {
    try {
      const { name, description, status } = req.body;

      await CategoryModel.findByIdAndUpdate(req.params.id, {
        name,
        description,
        status: status === "true",
      });

      res.redirect("/categories");
    } catch (err) {
      console.error("Error updating category:", err);
      const category = await CategoryModel.findById(req.params.id);
      res.render("category/edit", { category, error: err.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      await CategoryModel.findByIdAndUpdate(req.params.id, { isDeleted: true });
      res.redirect("/categories");
    } catch (err) {
      console.error("Error deleting category:", err);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = new AuthEjsController();
