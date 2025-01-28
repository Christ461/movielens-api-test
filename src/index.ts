import express from "express";
import { Pool } from "pg";

const app = express();
const port = 3000;

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "movielens",
  password: "movie123",
  port: 5432,
});

app.get("/", (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.send("hola express");
});

app.get("/movies", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("database query failed");
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies WHERE id = $1', [req.params.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("database query failed");
  }
});


app.get("/users", async (_req, res) => {
  const query_users = "SELECT users.*, occupations.name FROM users INNER JOIN occupations ON users.occupation_id = occupations.id"
  try {
    const result = await pool.query(query_users);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("database query failed");
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
