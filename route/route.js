const express = require('express');
const {createPostData} = require('../controller/userController');
const {checkPostData} = require('../controller/userController');
const {createProduct, getProducts, updateProduct} = require('../controller/productController');

const router = express.Router();

router.post('/signup' , createPostData)
router.post('/login' , checkPostData)
router.post('/createproduct' , createProduct)
router.get('/getProducts' , getProducts)
router.put('/updateProduct/:productId' , updateProduct )


module.exports = router;