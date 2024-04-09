import { Hono } from "hono";

import get from "./get";
import create from "./create";
import update from "./update";
import deleteBike from "./deleteBike";
import bikeBookings from "./bikeBookings";

const bikesController = new Hono();

bikesController.get("/bikes", get);
bikesController.get("/bike/:bike_id/bookings", bikeBookings);
bikesController.post("/bike", create);
bikesController.put("/bike/:id", update);
bikesController.delete("/bike/:id", deleteBike);

export default bikesController;
