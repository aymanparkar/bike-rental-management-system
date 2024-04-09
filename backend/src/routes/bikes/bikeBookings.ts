import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const bikeBookings: MiddlewareHandler = async (c: Context) => {
  try {
    const { bike_id } = c.req.param();
    const { rows } = await pgPool.query(
      `
      select start_date, end_date
      from bookings
      where bike_id = $1
      and end_date > now()
      order by start_date;
    `,
      [bike_id]
    );
    return c.json(rows);
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default bikeBookings;
