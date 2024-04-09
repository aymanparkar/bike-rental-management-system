import { Hono } from "hono";

import get from "./get";

const customersController = new Hono();

customersController.get("/customers", get);
customersController.post("/customer", (c) => c.json("create a customer", 201));
customersController.put("/customer/:id", (c) =>
  c.json("update a customer", 200)
);
customersController.get("customer/:id", (c) =>
  c.json(`get ${c.req.param("id")}`)
);

export default customersController;
