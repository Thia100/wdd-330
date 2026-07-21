import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce(
            (sum, item) => sum + item.FinalPrice,
            0
        );

        this.calculateOrderTotal();
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;

        if (this.list.length > 0) {
            this.shipping = 10 + (this.list.length - 1) * 2;
        } else {
            this.shipping = 0;
        }

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const subtotal = document.querySelector(`${this.outputSelector} .summary-subtotal`);
        const tax = document.querySelector(`${this.outputSelector} .summary-tax`);
        const shipping = document.querySelector(`${this.outputSelector} .summary-shipping`);
        const total = document.querySelector(`${this.outputSelector} .summary-total`);

        subtotal.textContent = `Subtotal: $${this.itemTotal.toFixed(2)}`;
        tax.textContent = `Tax: $${this.tax.toFixed(2)}`;
        shipping.textContent = `Shipping Estimate: $${this.shipping.toFixed(2)}`;
        total.textContent = `Order Total: $${this.orderTotal.toFixed(2)}`;
    }
}