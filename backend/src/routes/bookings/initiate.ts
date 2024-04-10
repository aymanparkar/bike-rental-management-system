import { Context, MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import crypto from "crypto";
const initiate: MiddlewareHandler = async (c: Context) => {
  try {
    const { bike_id, start_date, end_date, booking_amount, customer_id, user } =
      await c.req.json();

    const booking_id = crypto.randomUUID();

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer sk_test_pHoevYT4VQ0iMO7ZNw9FhSK1`,
      },
      body: JSON.stringify({
        currency: "SAR",
        customer_initiated: true,
        description: `Payment for Booking`,
        receipt: { email: true, sms: true },
        merchant: { id: "28540338" },
        source: { id: "src_all" },
        post: {
          url: "https://bike-rental-management-system.onrender.com/v1/verify-booking",
        },
        redirect: {
          url: `https://bike-rental-management-system.vercel.app/booking-confirmation/${booking_id}`,
        },
        metadata: {
          booking_id,
          bike_id,
          start_date,
          end_date,
          customer_id,
        },
        amount: booking_amount,
        customer: {
          middle_name: "",
          first_name: user.name,
          last_name: "",
          // email: "",
          phone: {
            country_code: 91,
            number: user.phone,
          },
        },
      }),
    };

    const charge = await fetch(
      "https://api.tap.company/v2/charges/",
      options
    ).then((response) => response.json());

    return c.json({
      message: "Booking initiated successfully",
      charge,
    });
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default initiate;
