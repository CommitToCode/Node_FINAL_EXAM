const express = require('express');

const router =express.Router()
const ProductApiController= require('../controller/ProductApiController')
const upload = require("../middleware/upload");

router.post("/create/product", upload.single("image"), ProductApiController.createProduct);

router.get('/products', ProductApiController.getProduct)
router.get('/product/edit/:id',ProductApiController.getSingleProduct)
router.post("/product/update/:id", upload.single("image"), ProductApiController.updateProduct);

router.delete('/product/delete/:id', ProductApiController.deleteProduct)

module.exports = router;