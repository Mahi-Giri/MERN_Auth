import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", signup);

export default route;
