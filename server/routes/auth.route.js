import { Router } from "express";
import { google, signin, signout, signup } from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.post("/google", google);
route.get("/signout", signout);

export default route;
