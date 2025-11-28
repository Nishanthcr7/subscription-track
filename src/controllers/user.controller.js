import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = User.find();

        res.status(200).json({
            sucess: true,
            data: users
        })
    } catch (err) {
        next(err)
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = User.findById(req.param.id).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statuCode = 404;
            throw error;
        }

        res.status(200).json({
            sucess: true,
            data: user
        })
    } catch (err) {
        next(err)
    }
}