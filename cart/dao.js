import Cart from "./model.js";

// export const createCart = (itemCart) => Cart.create(itemCart);
export const createCart = (userId, items, total) => Cart.create({ userId, items, total });
export const getCartByUserId = (userId) => Cart.findOne({ userId });
// export const getCartById = (id) => Cart.findById(id);
export const deleteCartById = (userId, itemId) => Cart.findOneAndUpdate({ userId }, { $pull: { items: { id: itemId } } }, { new: true });
export const deleteAllCart = (id) => Cart.deleteMany({ userId: id });

export const updateCart = (id, cart) =>
  Cart.findByIdAndUpdate(id, cart, { new: true });


