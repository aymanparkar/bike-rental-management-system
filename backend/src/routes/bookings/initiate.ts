import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const initiate: MiddlewareHandler = async (c: Context) => {
  try {
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
          url: `https://bike-rental-management-system.vercel.app/bookings`,
        },
        metadata: {
          id: "1234567890",
        },
        amount: 1289,
        customer: {
          first_name: "awef",
          middle_name: "",
          last_name: "awefea",
          email: "awefawefewa.@gmail.com",
          phone: {
            country_code: 91,
            number: 7507673320,
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
