import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const signup: MiddlewareHandler = async (c: Context) => {
  try {
    const { userName, name, phone, password } = await c.req.json();

    const { rows } = await pgPool.query(
      `insert into public.users (username, name, phone, type, password) values ($1, $2, $3, 'user', $4) 
      returning id, username, name, phone, type, password;`,
      [userName, name, phone, btoa(password)]
    );

    const user = rows[0];

    return c.json({
      id: user.id,
      name: user.name,
      phone: user.phone,
      userName: user.username,
      type: user.type,
    });
  } catch (e: any) {
    throw new HTTPException(400, { message: e });
  }
};

export default signup;
