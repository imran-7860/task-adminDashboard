
const productModel = require('../model/productModel')

const createProduct = async (req, res) => {
    try {
        const { productName, price, quantity, description } = req.body
        const data = await productModel.create(req.body)
        return res.status(201).send({ status: true, data: data })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }


}

const getProducts = async (req, res) => {
    try {

        const data = await productModel.find()
        return res.status(200).send({ status: true, data: data })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }


}


const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const data = await productModel.findByIdAndUpdate(productId, req.body, { upsert: true , new :true})
        return res.status(200).send({ status: true, data: data })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }


}




module.exports = { createProduct, getProducts , updateProduct }