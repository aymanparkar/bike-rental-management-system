import { Hono } from "hono";

import login from "./login";
import signup from "./signup";
import updateProfile from "./updateProfile";

const authController = new Hono();

authController.post("/login", login);
authController.post("/sign-up", signup);
authController.put("/update-profile/:id", updateProfile);

export default authController;
