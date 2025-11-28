import mongoose from "mongoose"
import User from '../models/user.model.js'
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../config/env.js";
import jwt from 'jsonwebtoken'

// what is req body - req.body is an object containing data from client
export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession(); // sessionn for mongoose atomic operation

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error("user already exist");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{ name, email, password: hashedPassword }], { session })
        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })


        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0]
            }
        })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = User.findOne({ email });

        if (!user) {
            const error = new Error('user not found');
            error.statusCode(401)
            throw error;
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            const error = new Error('invalid password ');
            error.statusCode(401)
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: "user sign in sucessfully",
            data: {
                user,
                token
            }
        })

    } catch (err) {
        next(err)
    }
}

export const signOut = async (req, res, next) => {

}