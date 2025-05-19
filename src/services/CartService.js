import db from "../db/ShopDB";

/**
 * 添加商品到購物車
 * @param {Object} item - 商品對象
 * @param {Object} storage - 存儲對象，現在可以是 localStorage 或 db
 */
export async function addToCart(item, storage = db) {
  const cartJson = await storage.getItem("cart");
  const cart = JSON.parse(cartJson ?? "[]");

  const existingItem = cart.find((_item) => _item.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
      quantity: 1,
      addedAt: new Date().toISOString(),
    });
  }

  await storage.setItem("cart", JSON.stringify(cart));
}

/**
 * 從購物車刪除商品
 * @param {string|number} id - 商品ID
 * @param {Object} storage - 存儲對象
 */
export async function deleteFromCart(id, storage = db) {
  const cartJson = await storage.getItem("cart");
  const cart = JSON.parse(cartJson ?? "[]");

  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    await storage.setItem("cart", JSON.stringify(cart));
  }
}

/**
 * 計算購物車總額
 * @param {Object} storage - 存儲對象
 * @returns {Promise<number>} - 購物車總額
 */
export async function getCartTotal(storage = db) {
  const cartJson = await storage.getItem("cart");
  const cart = JSON.parse(cartJson ?? "[]");

  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
