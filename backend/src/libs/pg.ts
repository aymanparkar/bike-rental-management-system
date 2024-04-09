import { Pool } from "pg";

export const pgPool = new Pool({
  connectionString:
    "postgresql://postgres.xlixraxxtbfbafdugdiy:UqqznBAHtoMHTNnM@aws-0-ap-south-1.pooler.supabase.com:5432/bike_rental",
});

pgPool.connect();

pgPool.on("error", async () => {
  await pgPool.connect();
});
