import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from '../models/User.js'
const router = Router();


router.post('/register', async(req, res) => {
    const { firstName, lastName, age, email, password, confirmPassword } = req.body
    try {
        const user = await User.findOne({ email: email });
        if(user) {
            return res.status(302).json({message: "User Already Exist"});
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            age,
            password,
            confirmPassword
        })
        const result = await newUser.save();
        res.status(201).json({ message: 'Registration Successfull, Please Login now' })
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal server Error", error: error})
    }

})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json({message: "invailid User Credentials"});

        const isMatched = await bcrypt.compare(req.body.password, user.password)
        !isMatched && res.status(401).json({message: "invailid User Credentials"})

        res.status(200).json({message: 'Login Successfull', payload: user})

    } catch (err) {
        res.status(500).json(err)
    }
})

export default router