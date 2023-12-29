import * as pg from "pg";

const { Pool } = pg.default;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:87SSIfpXPOvxjUBy@db.upxngjsfgvqqgbsapppe.supabase.co:5432/postgres",
});

export default pool;
