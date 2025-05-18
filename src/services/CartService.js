function _getCart() {
  return JSON.parse(localStorage.getItem("cart") ?? "[]");
}
function _setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(
  item,
  { getCart = _getCart, setCart = _setCart } = {}
) {
  const cart = getCart();
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
  setCart(cart);
}

export function deleteFromCart(
  id,
  { getCart = _getCart, setCart = _setCart } = {}
) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    setCart(cart);
  }
}

export function getCartTotal({ getCart = _getCart } = {}) {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
