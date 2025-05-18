export function addToCart(item, storage) {
  const cart = JSON.parse(storage.getItem("cart") ?? "[]");
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
  storage.setItem("cart", JSON.stringify(cart));
}

export function deleteFromCart(id, storage) {
  const cart = JSON.parse(storage.getItem("cart") ?? "[]");
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    storage.setItem("cart", JSON.stringify(cart));
  }
}

export function getCartTotal(storage) {
  const cart = JSON.parse(storage.getItem("cart") ?? "[]");
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
