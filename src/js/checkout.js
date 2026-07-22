import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");

checkout.init();

document.querySelector("#zip").addEventListener("blur", (event) => {
    const zip = event.target.value;
    const message = document.querySelector("#checkout-message");

    if (!/^\d{5}$/.test(zip)) {
        message.textContent = "Please enter a valid 5 digit zip code.";
        message.classList.add("error");
        return;
    }

    message.textContent = "";
    checkout.calculateOrderTotal();
});

document.querySelector("#checkout-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.querySelector("#checkout-message");

    const cardNumber = document.querySelector("#cardNumber").value;

    if (!/^\d{13,19}$/.test(cardNumber)) {
        message.textContent = "Please enter a valid card number.";
        message.classList.add("error");
        return;
    }

    try {
        await checkout.checkout(event.target);

        message.textContent = "Your order was submitted successfully!";
        message.classList.remove("error");
        message.classList.add("success");

    } catch (error) {
        message.textContent = "There was an error processing your order. Please try again.";
        message.classList.remove("success");
        message.classList.add("error");

    }
});