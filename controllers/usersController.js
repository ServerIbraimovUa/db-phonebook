const User = require('../db/models/userModels');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findOne({ email })
    
    if (user) {
        res.status(409).json({ message: "Email in use" });
        return;
    }
    const avatar = gravatar.url(email);

    const newUser = new User({ ...req.body, avatar });
    await newUser.hashPassword();

    await newUser.save();

    const payload = {
        id: newUser._id,
    }
    
    const token = jwt.sign(payload, SECRET_KEY)

    await User.findByIdAndUpdate(newUser._id, { token });
    
    res.status(201).json({
        token,
        user: { name, email, avatar },
    })
}


module.exports = {
    register,
}