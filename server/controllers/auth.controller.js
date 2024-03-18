import { User } from "../models/User.models.js";
import bcrypt from "bcryptjs";

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
