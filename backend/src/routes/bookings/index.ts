import { Hono } from "hono";

import get from "./get";
import create from "./create";
import userBookings from "./userBookings";
import initiate from "./initiate";

const bookingsController = new Hono();

bookingsController.get("/bookings", get);
bookingsController.get("/user-bookings/:id", userBookings);
bookingsController.post("/booking", create);
bookingsController.post("/initiate", initiate);

export default bookingsController;
