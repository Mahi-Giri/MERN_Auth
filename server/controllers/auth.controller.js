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
