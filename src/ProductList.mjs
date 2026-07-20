import { renderListWithTemplate } from "./js/utils.mjs";

function productCardTemplate(product, category) {
    const discount =
        product.FinalPrice < product.SuggestedRetailPrice
            ? `<span class="discount">${Math.round(
                ((product.SuggestedRetailPrice - product.FinalPrice) /
                    product.SuggestedRetailPrice) *
                    100
             )}% Off</span>`
            : "";
    
    return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}&category=${category}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discount}
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    renderList(list) {
        const template = (product) => productCardTemplate(product, this.category);

        renderListWithTemplate(
            template,
            this.listElement,
            list
        );
    }
}