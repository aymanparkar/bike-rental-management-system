import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const userDashStats: MiddlewareHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();

    const { rows: bikesRows } = await pgPool.query(
      `
      select count(*) as total_bookings from bookings where customer_id = $1
    `,
      [id]
    );

    const { rows: availableBikesRows } = await pgPool.query(
      `
      select count(*) as active_bookings from bookings where end_date > now() and customer_id = $1;
    `,
      [id]
    );

    return c.json([
      { name: "Total Bookings", value: bikesRows?.[0]?.total_bookings || "0" },
      {
        name: "Active Bookings",
        value: availableBikesRows?.[0]?.active_bookings || "0",
      },
    ]);
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default userDashStats;
