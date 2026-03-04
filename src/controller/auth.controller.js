const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const isEmailAlreadyExist = await userModel.findOne({ email })

        if (isEmailAlreadyExist) {
            return res.status(400).json({ message: "Email already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie("token", token)

        return res.status(200).json({ message: "User registered successfully", user })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie("token", token)

        return res.status(200).json({ message: "User logged in successfully", user })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}