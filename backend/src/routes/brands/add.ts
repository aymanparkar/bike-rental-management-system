import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const add: MiddlewareHandler = async (c: Context) => {
  try {
    const { name } = await c.req.json();
    await pgPool.query("insert into brands (name) values ($1)", [name]);
    return c.json("Brand added successfully!");
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default add;
