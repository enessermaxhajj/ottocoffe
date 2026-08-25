const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const PORT = 3000;


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// POSTGRESQL
// ===============================

const pool = new Pool({
    host: process.env.DB_HOST || "postgres",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "ottocoffee"
});


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {

    res.json({
        message: "Otto Coffee API is running ☕🐈‍⬛",
        version: "1.1.0"
    });

});


// ===============================
// GET ALL COFFEES
// ===============================

app.get("/api/coffees", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM coffee ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {

        console.error("Database error:", error);

        res.status(500).json({
            error: "Database error"
        });

    }

});


// ===============================
// GET ONE COFFEE
// ===============================

app.get("/api/coffees/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const result = await pool.query(
            "SELECT * FROM coffee WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                error: "Coffee not found"
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error("Database error:", error);

        res.status(500).json({
            error: "Database error"
        });

    }

});


// ===============================
// ABOUT
// ===============================

app.get("/api/about", (req, res) => {

    res.json({

        name: "Otto Coffee",

        location: "Pristina, Kosovo",

        founded: 2026,

        mascot: "Otto",

        description:
            "A specialty coffee shop run by great people and one very important black cat."

    });

});


// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", async (req, res) => {

    try {

        await pool.query("SELECT 1");

        res.json({

            status: "ok",

            service: "otto-coffee-backend",

            database: "connected"

        });

    } catch (error) {

        console.error("Database connection error:", error);

        res.status(500).json({

            status: "error",

            service: "otto-coffee-backend",

            database: "disconnected"

        });

    }

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `☕🐈‍⬛ Otto Coffee API running on port ${PORT}`
    );

});
