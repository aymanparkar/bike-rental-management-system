import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const userBookings: MiddlewareHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const { rows } = await pgPool.query(
      `
      select 
        b.*, 
        u.name as customer_name, u.phone as customer_phone, u.email as customer_email,
        bks.name as bike_name,
        bks.model as bike_model,
        br.name as brand_name,
        bks.bike_number,
        bks.rent_per_day
      from bookings b
      inner join users u on u.id = b.customer_id and u.id = $1
      inner join bikes bks on bks.id = b.bike_id
      inner join brands br on br.id = bks.brand_id
    `,
      [id]
    );
    return c.json(rows);
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default userBookings;
