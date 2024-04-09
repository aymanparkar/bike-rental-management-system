import { Hono } from "hono";

import get from "./getDashboardStats";

const statsController = new Hono();

statsController.get("/dashboard-stats", get);

export default statsController;
