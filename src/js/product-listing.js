import ProductData from "./ProductData.mjs";
import ProductList from "../ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const categoryName = category
    .replace("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const title = document.querySelector(".products h2");
title.textContent = `Top Products: ${categoryName}`;

const dataSource = new ProductData();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

productList.init();
