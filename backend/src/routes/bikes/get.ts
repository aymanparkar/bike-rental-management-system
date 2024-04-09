import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const get: MiddlewareHandler = async (c: Context) => {
  try {
    const { rows } = await pgPool.query(`
      select bi.*, br.name as brand_name from bikes bi 
      inner join brands br on bi.brand_id = br.id 
      order by bi.created_at
    `);
    return c.json(rows);
  } catch (e) {
    throw new HTTPException(400, { message: JSON.stringify(e) });
  }
};

export default get;
