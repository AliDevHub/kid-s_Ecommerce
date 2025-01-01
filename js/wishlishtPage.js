let heartContainer = document.querySelector(".wish-lish-pro-content");
 heartItems = JSON.parse(localStorage.getItem("heartItems")) || [];
let heartItemsObjects = [];

onLoad();
function onLoad() {
    displayHeartItems();
}

// Function to remove a heart item
function removeHeartItem(heartId) {
    // Remove the item from heartItems
    heartItems = heartItems.filter((item) => item != heartId);
    localStorage.setItem("heartItems", JSON.stringify(heartItems));
    updateHeartCount();
    displayHeartItems();
}


// Function to display heart items
function displayHeartItems() {
    heartContainer.innerHTML = "";

    // Map heartItems to corresponding products
    heartItemsObjects = heartItems.map((heartId) => {
        return Products.find((product) => product.id == heartId);
    });

    // Generate and render HTML for all heart items
    let heartHTML = heartItemsObjects
        .map((item) => {
            if (!item) return ""; // Skip if item is undefined
            return `
            <div class="wish-add-pro flex-space">
                <div class="wish-image">
                    <div class="image flex">
                        <img src="${item.thumbnail}" alt="${item.Product_Name}">
                    </div>
                </div>
                <div class="wish-pro-name">
                    <span class="body-tex-2">${item.Product_Name}</span>
                </div>
                <div class="wish-price">
                    <span class="body-tex-2">₹${item.current_price}</span>
                </div>
                <div class="wish-qty">
                    <p class="flex-space" style="width: 106px; border-radius: 4px; padding: 0 16px; border: 1px solid #ccc; height: 38px;">
                        <span class="cursor-pointer qty-subtract"><i class="fa-solid fa-minus" aria-hidden="true"></i></span>
                        <span class="body-tex-2 qty-result">1</span>
                        <span class="cursor-pointer qty-add"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>
                    </p>
                </div>
                <div class="wish-action">
                    <button class="m-btn add-btn" data-id="${item.id}">Add to Cart</button>
                    <button class="s-btn" onclick="removeHeartItem(${item.id})">Remove</button>
                </div>
            </div>`;
        })
        .join("");

    // Inject the generated HTML into the container
    heartContainer.innerHTML = heartHTML;

    // Attach event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-id");
            addToBag(itemId);
        });
    });

    attachQuantityListeners()
}

function attachQuantityListeners() {
    document.querySelectorAll(".qty-add").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let resultElem = e.target.closest("p").querySelector(".qty-result");
            let currentQty = parseInt(resultElem.innerText);
            resultElem.innerText = currentQty + 1;
        });
    });

    document.querySelectorAll(".qty-subtract").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let resultElem = e.target.closest("p").querySelector(".qty-result");
            let currentQty = parseInt(resultElem.innerText);
            if (currentQty > 1) {
                resultElem.innerText = currentQty - 1;
            }
        });
    });
}