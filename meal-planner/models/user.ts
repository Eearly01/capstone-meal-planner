import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email is already taken"],
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    username: {
        type: String,
        unique: [true, "Username is already taken"],
        required: [true, "Full name is required"],
        minLength: [4, "Username should be at least 4 characters long"],
        maxLength: [30, "Username hsould be less than 30 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
})

const User = models.User || model('User', UserSchema)

export default User