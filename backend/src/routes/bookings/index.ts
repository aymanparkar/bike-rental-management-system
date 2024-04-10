import { Hono } from "hono";

import get from "./get";
import create from "./verify";
import userBookings from "./userBookings";
import initiate from "./initiate";
import verify from "./verify";

const bookingsController = new Hono();

bookingsController.get("/bookings", get);
bookingsController.get("/user-bookings/:id", userBookings);
bookingsController.post("/booking", create);
bookingsController.post("/initiate", initiate);
bookingsController.post("/verify-booking", verify);

export default bookingsController;
