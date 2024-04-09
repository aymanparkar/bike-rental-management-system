import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import bikesController from "./routes/bikes";
import brandsController from "./routes/brands";
import bookingsController from "./routes/bookings";
import customersController from "./routes/customers";
import statsController from "./routes/statistics";
import authController from "./routes/auth";

const app = new Hono();

app.use(
  "/v1/*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://bike-rental-management-system.vercel.app",
    ],
  })
);

app.route("/v1", authController);
app.route("/v1", brandsController);
app.route("/v1", bikesController);
app.route("/v1", bookingsController);
app.route("/v1", customersController);
app.route("/v1", statsController);

const port = 4200;
console.log(`Hono Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
