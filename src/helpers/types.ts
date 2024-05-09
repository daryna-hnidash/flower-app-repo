export type Product = {
  id: number;
  colors: Color[];
  type: ProductType;
  season: Season[];
  contains: string[];
  discount: number;
  size: Size;
  name: string;
  product_name_Id: string;
  isbn: string;
  price: number;
  description: string;
  coverImage: string;
};

// export type ProductFromServer = {
//   id: number;
//   colorIds: number[];
//   typeIds: number[];
//   seasonIds: number[];
//   containsIds: number[];
//   discountsIds: number[];
//   sizesIds: number[];
//   name: string;
//   product_name_Id: string;
//   isbn: string;
//   price: number;
//   description: string;
//   coverImage: string;
// };

export type CartItem = {
  id: number;
  name: string;
  price: number;
  discount: number;
  amount: number;
  coverImage: string;
  product_name_Id: string;
};

// export type DescriptionData = {
//   id: number;
//   name: "string";
//   description: "string";
// };

// export type CatalogPageParams = {
//   page: number;
//   sort?: string;
// };

// export enum PropertyType {
//   type = "product-type",
//   size = "product-size",
//   season = "product-season",
//   discount = "product-discount",
//   contain = "product-contain",
//   color = "product-color",
// }

export type User = {
  id: number;
  email: string;
  numberPhone: string;
  firstName: string;
  lastName: string;
  orderDetails: OrderInfo | null;
};

export type LogInData = {
  email: string;
  password: string;
};

// export type CartItemFromServer = {
//   id: number;
//   productId: number;
//   productName: string;
//   productPrice: number,
//   quantity: number;
// };

// export type Cart = {
//   id: number;
//   userId: number;
//   cartItems: CartItemFromServer[];
//   total: number;
// };

export type OrderInfo = {
  country: string;
  street: string;
  city: string;
  apartment: string;
  cardNumber: string;
  mmyy: string;
  cvvCode: string;
};

// export type OrderItem = {
//   id: number;
//   productId: number;
//   quantity: number;
// };

// export type OrderFromServer = {
//   id: number;
//   userId: number;
//   orderItems: OrderItem[];
//   orderDate: string;
//   total: number;
//   status: string;
// };

export type Order = {
  id: number;
  userId: number;
  orderItems: CartItem[];
  orderDate: string;
  total: number;
  status: string;
};

export const colorsArr = ["Blue", "Green", "Orange", "Red", "Yellow", "Pink", "White", "Violet"]
export type Color = typeof colorsArr[number];

export const productTypesArr = ["Fresh", "Potted"]
export type ProductType = typeof productTypesArr[number];

export const seasonsArr = ["Winter", "Spring", "Summer", "Autumn"]
export type Season = typeof seasonsArr[number];

export const sizesArr = ["S", "M", "L"]
export type Size = typeof sizesArr[number];
