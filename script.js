
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

        const size = document.getElementById("ring-size").value;

        if (size === "") {
            alert("Please select a size");
            return;
        }

        const cart = getCart();

        const product = {
            name: "FORM RING",
            size: size,
            price: 8900,
            image: "images/ring.jpg"
        };

        cart.push(product);
        saveCart(cart);

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
        details.textContent =
            "SIZE: " + product.size +
            " | " + product.price + " RSD";

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
