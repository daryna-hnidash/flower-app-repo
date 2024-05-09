import { Product, ProductType } from "./types";

const API_URL = "./api/";

export function getProducts(): Promise<Product[]> {
  return fetch(API_URL + "productsFromServer.json").then(res => res.json());
}

export function getProductById(id: number): Promise<Product | undefined> {
  return getProducts().then(res => res.find(product => product.id === id));
}

export function getSuggestedProducts(type: ProductType) {
  return getProducts()
    .then(products => products
      .filter(item => item.type === type)
      .sort(() => 0.5 - Math.random())
    );
}
