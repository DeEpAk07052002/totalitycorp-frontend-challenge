export const getAllProducts = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};
