import * as dao from './dao.js';

function cartRoutes(app) {
    const createCart = async (req, res) => {
        const userId = req.params.userId;
        const items = req.body.items;
        const total = req.body.total;

        console.log("Received userId:", userId);
        console.log("Received items:", items);
        console.log("Received total:", total);
    
        try {
            // Check if a cart exists for the user
            let cart = await dao.getCartByUserId(userId);
    
            if (!cart) {
                // If no cart exists, create a new one
                cart = await dao.createCart(
                    userId,
                    items,
                    total,
                );
            } else {
                // If a cart exists, update it with the new items and total
                for (const newItem of items) {
                    const existingItem = cart.items.find(item => item.id === newItem.id);
    
                    if (existingItem) {
                        // If the item already exists, update the quantity
                        existingItem.quantity += newItem.quantity;
                    } else {
                        // If the item doesn't exist, add it to the cart
                        cart.items.push(newItem);
                    }
                }
    
                // Update the total
                cart.total += total;
    
                await cart.save();
            }
    
            res.json(cart);
        } catch (error) {
            console.error('Error creating/updating cart:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    
    app.post('/api/cart/:userId', createCart);
    

    const getCartByUserId = async (req, res) => {
        const cart = await dao.getCartByUserId(req.params.userId);
        res.json(cart);
    };
    app.get('/api/cart/:userId', getCartByUserId);

    const deleteCartItem = async (req, res) => {
        const userId = req.params.userId;
        const itemId = req.params.itemId;
        await dao.deleteCartById(userId, itemId);
        res.json({ success: true });
    
        // try {
        //     // Locate the user's cart
        //     const cart = await dao.getCartByUserId(userId);
    
        //     // Find the index of the item to be removed
        //     const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
        //     if (itemIndex !== -1) {
        //         // Remove the item from the cart's items array
        //         cart.items.splice(itemIndex, 1);
    
        //         // Update the total (if needed)
        //         // cart.total = calculateNewTotal(cart.items);
    
        //         // Save the updated cart
        //         await cart.save();
    
        //         res.json(cart);
        //     } else {
        //         res.status(404).json({ error: 'Item not found in the cart' });
        //     }
        // } catch (error) {
        //     console.error('Error deleting item from cart:', error);
        //     res.status(500).json({ error: 'Internal Server Error' });
        // }
    };

    // Example route in your cartRoutes.js
app.delete('/api/cart/:userId/items/:itemId', deleteCartItem);

const deleteAllCart = async (req, res) => {
    const status = await dao.deleteAllCart(req.params.userId);
    res.json(status);
};
app.delete('/api/cart/:userId', deleteAllCart);

    

    // const findAllcart = async (req, res) => {
    //     const carts = await dao.findAllcart();
    //     res.json(carts);
    // };
    // app.get('/api/cart', findAllcart);

    // const deleteCart = async (req, res) => {
    //     const status = await dao.deleteCart(req.params.cartId);
    //     res.json(status);
    // };
    // app.delete('/api/cart/:cartId', deleteCart);

    // const updateCart = async (req, res) => {
    //     const { cartId } = req.params;
    //     const status = await dao.updateCart(cartId, req.body);
    //     res.json(status);
    // };
    // app.put('/api/cart/:cartId', updateCart);

    // const deleteAllCart = async (req, res) => {
    //     const status = await dao.deleteAllCart();
    //     res.json(status);
    // };
    // app.delete('/api/cart', deleteAllCart);
}
export default cartRoutes;