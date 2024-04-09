import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const get: MiddlewareHandler = async (c: Context) => {
  try {
    const { rows } = await pgPool.query("select * from brands");
    return c.json(rows);
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default get;
