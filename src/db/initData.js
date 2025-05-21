import db from "./ShopDB";
const mockCart = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 35900,
    quantity: 1,
    image:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
    addedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "MacBook Pro 14",
    price: 49900,
    quantity: 1,
    image:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202",
    addedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 7990,
    quantity: 1,
    image:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
    addedAt: new Date().toISOString(),
  },
];
const initializeMockData = async (instance) => {
  const cart = await instance.getItem("cart");

  if (!cart) {
    instance.setItem("cart", JSON.stringify(mockCart));
  }
};

if (process.env.NODE_ENV === "development") {
  await initializeMockData(db);
}
