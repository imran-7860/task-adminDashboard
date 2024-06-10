
const mongoose = require('mongoose')

const productSchema = ({
    productName : {type:String},
    price : {type:String},
    description : {type:String},
    quantity : {type:String},
    isDeleted: { type: Boolean, default: false }, // corrected type and added default value
    deletedAt : {type:Date},
}); // Adding timestamps option


const productModel = mongoose.model('product', productSchema);
module.exports = productModel;