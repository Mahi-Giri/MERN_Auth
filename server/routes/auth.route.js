import { Router } from "express";
import { google, signin, signup } from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.post("/google", google);

export default route;
