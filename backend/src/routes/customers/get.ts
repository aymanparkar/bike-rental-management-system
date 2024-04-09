import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const get: MiddlewareHandler = async (c: Context) => {
  try {
    const { rows } = await pgPool.query(`
      select u.id, u.name, count(b.id) as no_of_bookings from users u
      left join bookings b on b.customer_id = u.id
      where u.type = 'user'
      group by u.id, u.name
    `);
    return c.json(rows);
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default get;
