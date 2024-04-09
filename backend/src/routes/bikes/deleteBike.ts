import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const deleteBike: MiddlewareHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();
    console.log(id);

    await pgPool.query("delete from bikes where id = $1", [id]);

    return c.json({ message: "Bike deleted successfully" });
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default deleteBike;
