import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        firstName: {type: String, requried: true},
        lastName: {type: String},
        email: {type: String, requried: true, unique: [true, 'Email already exist']},
        age: {type: Number, requried: true},
        password: {type: String, requried: true},
        confirmPassword: {type: String, requried: true},
    },
    { timestamps: true}
)

// =================Converting password in Hash=====================
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = this.password;
    }
    next();
})

export const User = mongoose.model("User", UserSchema)