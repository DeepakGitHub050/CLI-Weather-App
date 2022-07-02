//object desctructure

const product = {
  label: "red note book",
  price: 3,
  stock: 201,
  salesPrice: undefined,
  rating: 4.2,
};

const { label: product_label, price, stock, salesPrice, rating } = product;

console.log(product_label);
console.log(price);
