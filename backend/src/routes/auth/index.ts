import { Hono } from "hono";

import login from "./login";
import signup from "./signup";

const authController = new Hono();

authController.post("/login", login);
authController.post("/sign-up", signup);

export default authController;
