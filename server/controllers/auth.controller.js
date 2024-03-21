import { User } from "../models/User.models.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username) return res.status(404).json({ message: "Please enter a username" });
    if (!email) return res.status(404).json({ message: "Please enter a email" });
    if (!password) return res.status(404).json({ message: "Please enter a password" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        const userAddedInDB = await newUser.save();

        if (!userAddedInDB) throw new Error(500, "Server down please try again");

        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) return res.status(404).json({ message: "Please enter a email" });
    if (!password) return res.status(404).json({ message: "Please enter a password" });

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));

        const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });

        const { password: hashedPassword, ...rest } = validUser._doc;

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            const { password: hashedPassword, ...rest } = user._doc;

            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);

            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const randomString = Math.random().toString(36).substring(7);
            const usernameWithRandom = req.body.name + randomString;

            const newUser = new User({
                username: usernameWithRandom,
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: 86400,
            });

            const { password: hashedPassword2, ...rest } = newUser._doc;

            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).json("Successfully signed out");
    } catch (error) {
        next(error);
    }
};
