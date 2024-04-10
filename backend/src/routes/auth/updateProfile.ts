import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const updateProfile: MiddlewareHandler = async (c: Context) => {
  try {
    const { name, phone, password } = await c.req.json();
    const { id } = c.req.param();

    const query = !!password
      ? `
          update public.users set 
          name = $1, phone = $2, password = $3
          where id = $4
    `
      : `
          update public.users set
          name = $1, phone = $2
          where id = $3
    `;

    const values = !!password
      ? [name, phone, btoa(password), id]
      : [name, phone, id];

    await pgPool.query(query, values);

    return c.json({
      message: "Profile updated successfully",
    });
  } catch (e: any) {
    throw new HTTPException(400, { message: e });
  }
};

export default updateProfile;
