const adminModel = require("../model/userModel");

const createPostData = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userData = new adminModel({
            name,
            email,
            password
        });

        await userData.save();
        return res.status(200).send({ status: true, data: userData });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, message: 'Server error while creating user' });
    }
};

const checkPostData = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const userData = await adminModel.findOne({ email, password });
        console.log(userData);

        if (userData) {
            return res.json({message : 'user successfully login'})
        } else {
            return res.status(400).send({  message: "user invalid" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({  message: 'Server error while logging in' });
    }
};

module.exports = { createPostData , checkPostData };
