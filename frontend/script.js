const API_URL = "http://localhost:3000";


// ===============================
// LOAD COFFEES
// ===============================

async function loadCoffees() {

    const coffeeList = document.getElementById("coffee-list");

    try {

        const response = await fetch(
            `${API_URL}/api/coffees`
        );


        if (!response.ok) {
            throw new Error("Failed to fetch coffees");
        }


        const coffees = await response.json();


        coffeeList.innerHTML = "";


        coffees.forEach(coffee => {

            const card = document.createElement("article");

            card.className = "coffee-card";


            card.innerHTML = `

                <div class="coffee-image">
                    ${coffee.icon}
                </div>


                <h3>
                    ${coffee.name}
                </h3>


                <p>
                    ${coffee.description}
                </p>


                <div class="coffee-bottom">

                    <span class="price">
                        €${coffee.price.toFixed(2)}
                    </span>


                    <button
                        class="order-button"
                        onclick="orderCoffee('${coffee.name}')"
                    >
                        +
                    </button>

                </div>

            `;


            coffeeList.appendChild(card);

        });

    }


    catch (error) {

        console.error(
            "Error loading coffees:",
            error
        );


        coffeeList.innerHTML = `

            <div class="loading">

                <h3>
                    Could not load the menu.
                </h3>

                <p>
                    Make sure the backend server is running.
                </p>

            </div>

        `;

    }

}


// ===============================
// ORDER COFFEE
// ===============================

function orderCoffee(name) {

    alert(
        `Great choice! ☕\n\nYou selected ${name}.`
    );

}


// ===============================
// LOAD DATA
// ===============================

loadCoffees();