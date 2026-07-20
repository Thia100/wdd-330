import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
    constructor() {
        this.cart = getLocalStorage("so-cart") || [];
    }

    init() {
        this.renderCartContents();
    }

    renderCartContents() {
        const htmlItems = this.cart.map((item) => this.cartItemTemplate(item));
        document.querySelector(".product-list").innerHTML = htmlItems.join("");

        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", (event) => {
                this.removeItem(event.target.dataset.id);
            });
        });
    }

    removeItem(id) {
        this.cart = this.cart.filter((item) => item.Id !== id);

        setLocalStorage("so-cart", this.cart);

        this.renderCartContents();
    }

    cartItemTemplate(item) {
        return `<li class="cart-card divider"> 
            <span class="remove-item" data-id="${item.Id}">X</span>

            <a href="#" class="cart-card__image">
                <img src="${item.Images.PrimaryMedium}" alt="${item.Name}"/>
            </a>
            <a href="#">
                <h2 class="card__name">${item.Name}</h2>
            </a>
            <p class="cart-card__color">${item.Colors[0].ColorName}</p>
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${item.FinalPrice}</p>
        </li>`;
    }
}