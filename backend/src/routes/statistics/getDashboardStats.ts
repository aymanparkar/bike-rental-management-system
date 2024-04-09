import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const get: MiddlewareHandler = async (c: Context) => {
  try {
    const { rows: bikesRows } = await pgPool.query(`
      select count(*) as total_bikes from bikes
    `);
    const { rows: availableBikesRows } = await pgPool.query(`
      select sum(available_bike_count) as available_bikes
      from (select count(*) as available_bike_count from bikes bks where bks.id not in (select distinct bike_id from bookings)
          union
          select count(*) as available_bike_count
          from bikes bks
                   inner join bookings bs on bs.bike_id = bks.id and bs.end_date < now()) iq;
    `);
    const { rows: bookingsRows } = await pgPool.query(`
      select count(*) as total_bookings from bookings
    `);
    const { rows: revenueRows } = await pgPool.query(`
      select sum(booking_amount) as total_booking_amount from bookings where is_paid = true
    `);

    return c.json([
      { name: "Total Bikes", value: bikesRows?.[0]?.total_bikes || "0" },
      {
        name: "Available Bikes",
        value: availableBikesRows?.[0]?.available_bikes || "0",
      },
      {
        name: "Total Bookings",
        value: bookingsRows?.[0]?.total_bookings || "0",
      },
      {
        name: "Total Revenue",
        value:
          `₹${Number(revenueRows?.[0]?.total_booking_amount).toFixed(2)}` ||
          "₹ 0",
      },
    ]);
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default get;
