const { Pool } = require("pg");
const connDB = require("./connDB");
const pool = connDB.getPool();

async function testConnection() {
  console.log("Connecting to the database");

  try {
    const client = await pool.connect();
    console.log("Connected to the database");

    // Release the client back to the pool
    client.release();
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  } finally {
    pool.end();
  }
}

testConnection();