import { Hono } from "hono";

import get from "./get";
import create from "./create";
import userBookings from "./userBookings";

const bookingsController = new Hono();

bookingsController.get("/bookings", get);
bookingsController.get("/user-bookings/:id", userBookings);
bookingsController.post("/booking", create);

export default bookingsController;
