
function getCart() {
    const savedCart = localStorage.getItem("kolCart");

    if (savedCart) {
        return JSON.parse(savedCart);
    }

    return [];
}

function saveCart(cart) {
    localStorage.setItem("kolCart", JSON.stringify(cart));
}


const addButton = document.getElementById("add-to-cart");

if (addButton) {
    addButton.addEventListener("click", function() {

        // Определяем товар по адресу страницы
        const page = window.location.pathname.split("/").pop();

        // Информация о товарах
        const products = {
            "ring.html": {
                name: "FORM RING",
                price: 8900,
                image: "images/ring.jpg"
            },

            "earrings.html": {
                name: "SILVER STUDS",
                price: 6500,
                image: "images/earrings.jpg"
            },

            "necklace.html": {
                name: "NORTH PENDANT",
                price: 12000,
                image: "images/necklace.jpg"
            }
        };

        // Находим товар для текущей страницы
        const selectedProduct = products[page];

        if (!selectedProduct) {
            alert("Product not found");
            return;
        }

        // Проверяем размер только для кольца
        let size = "";

        if (page === "ring.html") {
            const sizeSelect = document.getElementById("ring-size");

            size = sizeSelect ? sizeSelect.value : "";

            if (size === "") {
                alert("Please select a size");
                return;
            }
        }

        // Получаем текущую корзину
        const cart = getCart();

        // Добавляем выбранный товар
        const product = {
            name: selectedProduct.name,
            size: size,
            price: selectedProduct.price,
            image: selectedProduct.image
        };

        cart.push(product);
        saveCart(cart);

        // Открываем корзину
        window.location.href = "cart.html";
    });
}



// ===== DISPLAY SHOPPING BAG =====

// Находим контейнер товаров и общую сумму
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Функция отображения корзины
function renderCart() {

    // Если мы не на странице корзины,
    // прекращаем выполнение функции
    if (!cartItems || !cartTotal) {
        return;
    }

    // Получаем сохранённые товары
    const cart = getCart();

    // Очищаем старое содержимое
    cartItems.innerHTML = "";

    // Начальная сумма корзины
    let total = 0;

    // Перебираем все товары
    cart.forEach(function(product, index) {

        // Добавляем цену к общей сумме
        total += product.price;

        // Создаём карточку товара
        const item = document.createElement("div");
        item.className = "cart-item";

        // Создаём фотографию
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        // Создаём блок информации
        const info = document.createElement("div");
        info.className = "cart-item-info";

        // Название
        const name = document.createElement("h2");
        name.textContent = product.name;

        
// Размер и цена
const details = document.createElement("p");

const priceText =
    product.price.toLocaleString("en-US") + " RSD";

if (product.size) {
    details.textContent =
        "SIZE: " + product.size + " | " + priceText;
} else {
    details.textContent = priceText;
}


        // Кнопка удаления
        const removeButton = document.createElement("button");
        removeButton.className = "remove-item";
        removeButton.textContent = "REMOVE";

        // Что делать при нажатии REMOVE
        removeButton.addEventListener("click", function() {

            const updatedCart = getCart();

            updatedCart.splice(index, 1);

            saveCart(updatedCart);

            renderCart();
        });

        // Собираем карточку
        info.append(name, details, removeButton);
        item.append(image, info);

        // Добавляем карточку на страницу
        cartItems.appendChild(item);
    });

    // Если корзина пустая
    if (cart.length === 0) {
        cartItems.textContent = "Your bag is empty.";
    }

    // Показываем общую сумму
    cartTotal.textContent =
        total.toLocaleString("en-US") + " RSD";
}

// Запускаем отображение корзины
renderCart();
