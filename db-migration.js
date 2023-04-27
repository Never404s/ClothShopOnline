const { Pool } = require("pg");
const connDB = require("./connDB");
const pool = connDB.getPool();



async function runMigration(pool) {
  // Connect to DB
  console.log("Connecting to the database");

  try {
    // Use pool.connect() as an async function
    const client = await pool.connect();
    
    // Encapsulate all table creations in a try block
    try {
      console.log("Creating table reviews");
      await client.query(      `CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY NOT NULL,
        userName VARCHAR(50),
        isVerified BOOLEAN DEFAULT false,
        date VARCHAR(10),
        rating DECIMAL(2,1) DEFAULT 0,
        delivery VARCHAR(25),
        decoration VARCHAR(100),
        overallRating DECIMAL(2,1),
        fit VARCHAR(25),
        qualityRating DECIMAL(2,1),
        title VARCHAR(50),
        notes TEXT,
        numThumbsUp INTEGER DEFAULT 0,
        numThumbsDown INTEGER DEFAULT 0
    )`);

      console.log("Creating table questions");
      await client.query(      `CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY NOT NULL,
        userNameQ VARCHAR(500),
        isVerified BOOLEAN DEFAULT false,
        dateQuestion VARCHAR(10),
        question TEXT,
        numAnswers INTEGER,
        userNameA VARCHAR(50),
        dateAnswer VARCHAR(10),
        answer TEXT,
        numThumbsUp INTEGER DEFAULT 0,
        numThumbsDown INTEGER DEFAULT 0
    )`);

      console.log("Creating table products");
      await client.query(      `CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY NOT NULL,
        imageLink VARCHAR(250),
        productLink VARCHAR(250),
        style VARCHAR(60),
        productName VARCHAR(60),
        rating DECIMAL(2,1),
        numRatings INTEGER,
        price MONEY
    )`);

      console.log("Creating table sizes");
      await client.query(      `CREATE TABLE IF NOT EXISTS sizes (
        id SERIAL PRIMARY KEY NOT NULL,
        product_ID INTEGER,
        color VARCHAR(25),
        size VARCHAR(5),
        price MONEY,
        salePrice MONEY DEFAULT null,
        numAvailable INTEGER
    )`);
    } catch (err) {
      console.error("Error creating tables:", err);
    } finally {
      // Release the client back to the pool
      client.release();
    }

  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
}

runMigration(pool)
  .then(() => {
    pool.end();
    console.log("Migration Completed");
    console.log("Press [CTRL] + c to stop running.");
  })
  .catch((err) => {
    console.error("Error running migration:", err);
  });