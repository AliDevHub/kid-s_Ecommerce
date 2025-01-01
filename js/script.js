function cheackLogin() {
    const login = document.querySelector('.login')
    const loginUser = document.querySelector('.login-page')

    login.addEventListener('click', () => {
        loginUser.classList.toggle('dBlock')
    })
}
cheackLogin()

let heartItems = [];
let bagItems = [];
let savedHeartStates = {};

onLoad ()

function onLoad () {
    heartItems = JSON.parse(localStorage.getItem('heartItems')) || [];
    bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
    savedHeartStates = JSON.parse(localStorage.getItem('heartStates')) || {};
    displayCards();
    updateHeartCount() 
    updateCartCount()
}

function displayCards() {
    const newArrivalContainer = document.querySelector(".arival-products .cards");
    const trendingContainer = document.querySelector(".trending-products .cards");
    const topRatedContainer = document.querySelector(".top-rated-products .cards");

    if(!newArrivalContainer || !trendingContainer || !topRatedContainer){
        return;
    }

    let newArrivalCards = "";
    let trendingCards = "";
    let topRatedCards = "";

    Products.forEach((product) => {
        const cardTemplate = `
            <div class="card">
                <div class="product-box flex">
                    <a class="flex" href="#">
                        <img src="${product.thumbnail}" alt="${product.Product_Name}">
                    </a>
                    <span class="heart" heart-id="${product.id}">
                        <i class="fa-solid fa-heart"></i>
                    </span>
                    <button class="m-btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
                <div class="product-content">
                    <a href="#">
                        <div class="product-heading">
                            <p class="heading M-body-tex-2-b M-body-tex-14-b">${product.Product_Name}</p>
                        </div>
                    </a>
                    <div class="rating">
                        <span>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </span>
                    </div>
                    <div class="price">
                        <p class="flex-item">
                            <span class="heading M-body-tex-2-b M-body-tex-14-b">₹${product.current_price}</span>
                            <span class="disable" style='text-decoration: line-through;'>₹${product.original_price}</span>
                            <span class="semantic-green">${product.discount_percentage}% OFF</span>
                        </p>
                    </div>
                </div>
            </div>
        `;

        if (product.category === "newArrival") {
            newArrivalCards += cardTemplate;
        } else if (product.category === "trending") {
            trendingCards += cardTemplate;
        } else if (product.category === "toprated") {
            topRatedCards += cardTemplate;
        }
    });

    newArrivalContainer.innerHTML = newArrivalCards || "<p>No new arrivals available.</p>";
    trendingContainer.innerHTML = trendingCards || "<p>No trending products available.</p>";
    topRatedContainer.innerHTML = topRatedCards || "<p>No top-rated products available.</p>";

    // Attach event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-id");
            addToBag(itemId);
        });
    });

    document.querySelectorAll('.heart').forEach(heart => {

        let heartId = heart.getAttribute('heart-id');
        
        // Add click event listener
        heart.addEventListener('click', () => {
            const isActive = heart.classList.toggle('active');
            
            // Update localStorage
            if (isActive) {
                savedHeartStates[heartId] = 'active';
            } else {
                delete savedHeartStates[heartId];
            }
            addToheart(heartId);

            localStorage.setItem('heartStates', JSON.stringify(savedHeartStates));
        });

        // Apply the saved state from localStorage
        if (savedHeartStates[heartId] === 'active') {
            heart.classList.add('active');
        } else {
            heart.classList.remove('active');
        }
    });
};

function addToheart(heartId) {
    heartItems.push(heartId);
    localStorage.setItem('heartItems', JSON.stringify(heartItems))
    updateHeartCount() 
}

function updateHeartCount() {
    let heart_items_count = document.querySelector('.heartCount')
    if(heartItems.length > 0){
        heart_items_count.style.visibility = 'visible'
        heart_items_count.innerText = heartItems.length
    }else{
        heart_items_count.style.visibility = 'hidden'
    }
}

function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems))
    updateCartCount() 
}

function updateCartCount() {
    let card_items_count = document.querySelector('#card_items_count')
    if(bagItems.length > 0){
        card_items_count.style.visibility = 'visible'
        card_items_count.innerText = bagItems.length
    }else{
        card_items_count.style.visibility = 'hidden'
    }
}

function textmonialSlider () {
    new Swiper('.slide-wrapper', {
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            1024: {
                slidesPerView: 3
            },
        }
      });
}
textmonialSlider()

function countDownTimer() {
    let daysEl = document.getElementById("Days");
    let hoursEl = document.getElementById("hours");
    let minutesEl = document.getElementById("minutes");
    let seconsdEl = document.getElementById("seconds");
    
    let countDown = () => {
    let futureDate = new Date("01 Jan 2025")
    let nowDate = new Date()
    let coutTime = futureDate - nowDate

        let days = Math.floor(coutTime / 1000 / 60 / 60 / 24);
        let hours = Math.floor(coutTime / 1000 / 60 / 60 ) % 24;
        let minutes = Math.floor(coutTime / 1000 / 60) % 60;
        let seconds = Math.floor(coutTime / 1000 ) % 60;
        // console.log(days, hours, minutes, seconds);

        daysEl.innerText = days;
        hoursEl.innerText = hours;
        minutesEl.innerText = minutes;
        seconsdEl.innerText = seconds;
        
    }
    countDown()
    setInterval(countDown, 1000)
}
countDownTimer()





function setupWishlistToggle() {
    const items = document.querySelectorAll('.card');

    items.forEach(item => {

        const strockHeart = item.querySelector('.strockheart');
        const fillHeart = item.querySelector('.fillheart');

        fillHeart.addEventListener('click', () => {
            if (strockHeart.style.display === 'block') {
                strockHeart.style.display = 'none'; // Hide the strockHeart element
                fillHeart.style.display = 'block'; // Show the fillHeart element
            } else {
                strockHeart.style.display = 'block'; // Show the strockHeart element
                fillHeart.style.display = 'none'; // Hide the fillHeart element
            }
        });

        strockHeart.addEventListener('click', () => {
            if (fillHeart.style.display === 'block') {
                strockHeart.style.display = 'block'; // Show the strockHeart element
                fillHeart.style.display = 'none'; // Hide the fillHeart element
            } else {
                strockHeart.style.display = 'none'; // Hide the strockHeart element
                fillHeart.style.display = 'block'; // Show the fillHeart element
            }
        });
    });
}
// setupWishlistToggle()
function productDetailQyt() {
    let qtySubtract = document.querySelector('#qty-subtract');
    let qtyAdd = document.querySelector('#qty-add');
    let resultId = document.querySelector('#result');

    let quantity = parseInt(resultId.innerHTML) || 1;
    resultId.innerHTML = quantity;

    function updateQuantity(newQuantity) {
        quantity = newQuantity;
        resultId.innerHTML = quantity;
    }

    qtySubtract.addEventListener('click', () => {
        if (quantity > 1) { 
            updateQuantity(quantity - 1); 
        }
    });
    qtyAdd.addEventListener('click', () => {
        updateQuantity(quantity + 1); 
    });
}
// productDetailQyt();



