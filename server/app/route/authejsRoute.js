const express = require("express");
const AuthEjsController = require("../controller/AuthEjsController");

const router = express.Router();
const upload = require("../middleware/upload");


router.get("/admin", AuthEjsController.adminDashboard);


router.get("/list", AuthEjsController.productList);
router.get("/add", AuthEjsController.addProduct);
router.post("/create", upload.single("image"), AuthEjsController.createProduct); 

router.get("/edit/:id", AuthEjsController.editProduct);
router.post("/update/:id", upload.single("image"), AuthEjsController.updateProduct); 

router.get("/delete/:id", AuthEjsController.deleteProduct);


router.get("/categories", AuthEjsController.categoryList);
router.get("/add/category", AuthEjsController.addCategory); 
router.post("/create/category", AuthEjsController.createCategory);
router.get("/edit/category/:id", AuthEjsController.editCategory);
router.post("/update/category/:id", AuthEjsController.updateCategory);
router.get("/delete/category/:id", AuthEjsController.deleteCategory);

module.exports = router;
