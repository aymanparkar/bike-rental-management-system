import { Hono } from "hono";

import get from "./getDashboardStats";
import userDashStats from "./getUserDashboardStats";

const statsController = new Hono();

statsController.get("/dashboard-stats", get);
statsController.get("/user-stats/:id", userDashStats);

export default statsController;
