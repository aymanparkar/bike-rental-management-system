import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const signup: MiddlewareHandler = async (c: Context) => {
  try {
    const { userName, name, password } = await c.req.json();

    const { rows } = await pgPool.query(
      `insert into public.users (username, name, type, password) values ($1, $2, 'user', $3) 
      returning id, username, name, type, password;`,
      [userName, name, btoa(password)]
    );

    const user = rows[0];

    return c.json({
      id: user.id,
      name: user.name,
      userName: user.username,
      type: user.type,
    });
  } catch (e: any) {
    throw new HTTPException(400, { message: e });
  }
};

export default signup;
