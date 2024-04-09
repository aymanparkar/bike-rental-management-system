import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const create: MiddlewareHandler = async (c: Context) => {
  try {
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
        insert into bikes (brand_id, model, name, seater, engine, fuel_type, mileage, has_side_mirrors, bike_number,
        rent_per_day)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
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
      ]
    );

    return c.json({ message: "Bike created successfully" });
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default create;
