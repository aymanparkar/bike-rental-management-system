import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const update: MiddlewareHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();

    const {
      brand_id,
      model,
      name,
      seater,
      engine,
      fuel_type,
      mileage,
      has_side_mirrors,
      bike_number,
      rent_per_day,
    } = await c.req.json();

    await pgPool.query(
      `
      update bikes set
        brand_id = $1,
        model = $2,
        name = $3,
        seater = $4,
        engine = $5,
        fuel_type = $6,
        mileage = $7,
        has_side_mirrors = $8,
        bike_number = $9,
        rent_per_day = $10
      where id = $11
    `,
      [
        brand_id,
        model,
        name,
        seater,
        engine,
        fuel_type,
        mileage,
        has_side_mirrors,
        bike_number,
        rent_per_day,
        id,
      ]
    );
    return c.json({ message: "Bike updated successfully" });
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default update;
