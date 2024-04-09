import { Hono } from "hono";

import get from "./get";
import add from "./add";

const brandsController = new Hono();

brandsController.get("/brands", get);
brandsController.post("/brand", add);
brandsController.put("/brand/:id", (c) => c.json("update a bike", 200));
brandsController.get("brand/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default brandsController;
