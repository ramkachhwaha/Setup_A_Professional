import mongoose, { Schema } from "mongoose";
import jst from "jsonwebtoken";
import bcrypt from "bcrypt";
// import mongoose from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avtar: {
        type: String, // cloudinary, URL to the user's avatar image
        required: false,
    },
    coverImage: {
        type: String, // cloudinary, URL to the user's cover image
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String,
    }


}, { timestamps: true }
)

// pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { return next(); } // checking if password is modified

    const salt = await bcrypt.genSalt(10); // generating salt
    this.password = await bcrypt.hash(this.password, salt); /// hashing password === 34:27
    next(); // calling next function
});

// method to compare password
userSchema.methods.isPasswordCorrect = async function (Password) {
    return await bcrypt.compare(Password, this.password);
};

// method to generate JWT tokens
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    )
}

// method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    )
}

export const User = mongoose.model('User', userSchema); 