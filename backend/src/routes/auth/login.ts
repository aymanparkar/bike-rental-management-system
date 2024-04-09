import { Context, MiddlewareHandler } from "hono";
import { pgPool } from "@/libs/pg";
import { HTTPException } from "hono/http-exception";

const login: MiddlewareHandler = async (c: Context) => {
  try {
    const { userName, password } = await c.req.json();

    const { rows } = await pgPool.query(
      "select * from users where username = $1",
      [userName]
    );

    if (!rows.length) {
      throw new HTTPException(400, { message: "Invalid username or password" });
    }

    const user = rows[0];

    if (user.password !== btoa(password)) {
      throw new HTTPException(400, { message: "Invalid username or password" });
    }

    return c.json({
      id: user.id,
      name: user.name,
      userName: user.username,
      type: user.type,
    });
  } catch (e) {
    throw new HTTPException(400, { message: "Invalid username or password" });
  }
};

export default login;
