const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// COFFEE DATA
// ===============================

const coffees = [

    {
        id: 1,
        name: "Espresso",
        description:
            "Rich, bold and perfectly balanced.",
        price: 2.00,
        icon: "☕"
    },


    {
        id: 2,
        name: "Cappuccino",
        description:
            "Smooth espresso with creamy milk foam.",
        price: 3.20,
        icon: "🥛"
    },


    {
        id: 3,
        name: "Caffe Latte",
        description:
            "Silky steamed milk with a double espresso.",
        price: 3.50,
        icon: "☕"
    },


    {
        id: 4,
        name: "Mocha",
        description:
            "Chocolate, espresso and steamed milk.",
        price: 3.80,
        icon: "🍫"
    },


    {
        id: 5,
        name: "Flat White",
        description:
            "Velvety microfoam with a strong espresso base.",
        price: 3.40,
        icon: "☕"
    },


    {
        id: 6,
        name: "Americano",
        description:
            "Espresso balanced with hot water.",
        price: 2.50,
        icon: "🫘"
    },


    {
        id: 7,
        name: "Caramel Latte",
        description:
            "Creamy latte with sweet caramel.",
        price: 3.90,
        icon: "🍮"
    },


    {
        id: 8,
        name: "Cold Brew",
        description:
            "Slow brewed for a smooth and refreshing taste.",
        price: 4.00,
        icon: "🧊"
    }

];


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {

    res.json({

        message: "Otto Coffee API is running ☕🐈‍⬛",

        version: "1.0.0"

    });

});


// ===============================
// GET ALL COFFEES
// ===============================

app.get("/api/coffees", (req, res) => {

    res.json(coffees);

});


// ===============================
// GET ONE COFFEE
// ===============================

app.get("/api/coffees/:id", (req, res) => {

    const id = Number(req.params.id);


    const coffee = coffees.find(
        coffee => coffee.id === id
    );


    if (!coffee) {

        return res.status(404).json({

            error: "Coffee not found"

        });

    }


    res.json(coffee);

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

app.get("/api/health", (req, res) => {

    res.json({

        status: "ok",

        service: "otto-coffee-backend"

    });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `☕🐈‍⬛ Otto Coffee API running on http://localhost:${PORT}`
    );

});