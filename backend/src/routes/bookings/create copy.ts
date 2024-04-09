import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const create: MiddlewareHandler = async (c: Context) => {
  try {
    const { bike_id, start_date, end_date, booking_amount, customer_id } =
      await c.req.json();

    await pgPool.query(
      `
      insert into bookings (bike_id, start_date, end_date, booking_amount, customer_id)
      values ($1, $2, $3, $4, $5)
    `,
      [bike_id, start_date, end_date, booking_amount, customer_id]
    );
    return c.json({
      message: "Booking created successfully",
    });
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default create;
