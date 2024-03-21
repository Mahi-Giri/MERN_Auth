import { User } from "../models/User.models.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
    res.send("Hello World!");
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "Invalid User"));

    try {
        if (req.body.password) bcrypt.hashSync(req.body.password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    console.log(req.params.id);
    if (!req.params.id) return next(errorHandler(401, "Invalid User"));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Deleted");
    } catch (error) {
        next(errorHandler(error));
    }
};
