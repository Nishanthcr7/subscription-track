import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name is required"],
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'please fill valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: 8
    }
},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User; 