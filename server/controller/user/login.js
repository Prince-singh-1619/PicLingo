const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function loginController(req, res){
    try {
        const {email, password} = req.body
        if(!email) throw new Error("Please provide email")
        if(!password) throw new Error("Please provide password")

        const user = await userModel.findOne({email})
        if(!user) throw new Error("User does not exist")

        if(user.password==='google-auth-user'){
            return res.status(400).json({
                message: "You signed up with Google. Please log in using Google Sign-In.",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) throw new Error("Incorrect password, please try again")

        const tokenData = { userId: user._id }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60*60*24*7})

        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        }

        const { password: _, ...userWithoutPassword } = user._doc;

        res.status(200).json({
            message: "Login successful",
            token,
            userData: userWithoutPassword,
            success: true,
            error: false
        })
    } 
    catch (err) {
        res.status(401).json({
            error: true, 
            success: false,
            message: err.message || err
        })
    }
}

module.exports = loginController