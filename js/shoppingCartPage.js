let cartContainer = document.querySelector(".cards_wrapper");
let bagItemsObjects;

onLoad ();
function onLoad () {
    displayCartItems();
    displayBagSummary();
}

function removeCartItem(itemId) {
  bagItems = bagItems.filter((item) => item != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  updateCartCount();
  displayCartItems();
  displayBagSummary();
}

function displayBagSummary() {

    let bagSummaryElement = document.querySelector('.Order_Summary')

    let totalItem = bagItems.length;
    let totalMRP = 0;
    let discount = 0;
    let deliveryCharg = 49;
    let couponDiscount = 0;
    
    bagItemsObjects.forEach(item => {
        totalMRP += item.original_price;
        discount += item.original_price -  item.current_price;
    });
    
    let totalPay = totalMRP - discount + deliveryCharg;
    let totalSave = discount;

    bagSummaryElement.innerHTML = `
        <div class="heading">
            <h4 class="sub-heading-3">Order Summary (${totalItem} items)</h4>
        </div>
        <div class="order_content">
            <p class="body-tex-2 flex-space">Total MRP<span class="btsb">₹${totalMRP}</span></p>
            <p class="body-tex-2 flex-space">Discount <span class="btsb">₹-${discount}</span></p>
            <p class="body-tex-2 flex-space">Coupon Discount <label for="coupon" class="btsb">Apply Coupon</label></p>
            <p class="body-tex-2 flex-space">Shipping Free <span class="btsb">${deliveryCharg}</span></p>
        </div>
        <div class="total_amount">
            <p class="btsb flex-space" style="color: #000000;">Total Amount <span class="btsb" style="color: #000000;">₹${totalPay}</span></p>
        </div>
        <button class="large-btn">Place Order</button>
        <p class="M-body-tex-2-b" style="color: #40C351;">You will save this ₹-${totalSave} on this order</p>
    `
}

// Function to display cart items

function displayCartItems() {
  cartContainer.innerHTML = "";

  bagItemsObjects = bagItems
    .map((itemId) => {
      for (let i = 0; i < Products.length; i++) {
        if (itemId == Products[i].id) {
          return Products[i];
        }
      }
    })

  // Generate and render HTML for all cart items
  let cartHTML = bagItemsObjects
    .map((item) => {
        return `<div class="card">
                        <div class="thumbnail flex">
                            <img src="${item.thumbnail}" alt="${item.Product_Name}">
                        </div>
                        <div class="card-content">
                            <div class="top">
                                <div class="heading_price flex-space">
                                    <h5 class="btsb">${item.Product_Name}</h5>
                                    <p class="flex-item">
                                        <span class="heading M-body-tex-2-b M-body-tex-14-b">₹${item.current_price}</span>
                                        <span class="disable" style="text-decoration: line-through;">₹${item.original_price}</span>
                                        <span class="semantic-green">${item.discount_percentage}% OFF</span>
                                    </p>
                                </div>
                                <div class="color flex-item">
                                    <p class="body-tex-2">Color: </p>
                                    <span class="M-body-tex-2">${item.color[0]}</span>
                                </div>
                            </div>
                            <div class="bottom flex-space">
                                <p class="flex-space" style="width: 106px; border-radius: 4px; padding: 0 16px; border: 1px solid #ccc; height: 38px;">
                                    <span class="cursor-pointer qty-subtract">
                                        <i class="fa-solid fa-minus" aria-hidden="true"></i>
                                    </span>
                                    
                                    <span class="body-tex-2 qty-result">1</span>

                                    <span class="cursor-pointer qty-add">
                                        <i class="fa-solid fa-plus" aria-hidden="true"></i>
                                    </span>
                                </p>
                                <p class="remove-btn body-tex-3" onclick="removeCartItem(${item.id})">Remove</p>
                            </div>
                        </div>
                    </div>`;
    })
    .join("");

  // Inject the generated HTML into the container
  cartContainer.innerHTML = cartHTML;
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