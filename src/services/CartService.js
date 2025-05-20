import db from "../db/ShopDB";

/**
 * 獲取購物車
 * @returns {Promise<Array>} 購物車內容
 */
export async function getCart() {
  try {
    const cartJson = await db.getItem("cart");
    return JSON.parse(cartJson ?? "[]");
  } catch (error) {
    console.error("讀取購物車失敗:", error);
    return [];
  }
}
/**
 * 添加商品到購物車
 * @param {Object} item - 商品對象
 * @param {Object} cart - 存儲對象
 */
export function addToCart(item, cart) {
  const index = cart.findIndex((_item) => _item.id === item.id);
  let updatedCart;
  try {
    if (index === -1) {
      updatedCart = [
        {
          id: item.id,
          name: item.name,
          image: item.image,
          description: item.description,
          price: item.price,
          quantity: 1,
          addedAt: new Date().toISOString(),
        },
        ...cart,
      ];
    } else {
      updatedCart = [...cart];
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity + 1,
      };
    }
    (async () => {
      await db.setItem("cart", JSON.stringify(updatedCart));
    })();
    return updatedCart;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 從購物車刪除商品
 * @param {string|number} id - 商品ID
 * @param {Object} cart - 存儲對象
 */
export function deleteFromCart(id, cart) {
  const filteredCart = cart.filter((item) => item.id !== id);
  (async () => {
    await db.setItem("cart", JSON.stringify(filteredCart));
  })();
  return filteredCart;
}

export function updateQuantityFromCart(id, quantity, cart) {
  const updatedCart = cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  (async () => {
    await db.setItem("cart", JSON.stringify(updatedCart));
  })();
  return updatedCart;
}
