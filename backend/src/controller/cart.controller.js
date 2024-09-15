import { Cart } from "../model/Cart.model";
import { asyncHandler } from "../utils/AsyncHandler";

export {
    addToCart,
    removeFromCart,
    updateQuantity,
    getUserCart,
};

const addToCart = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId } = req.params;

    let cart = await Cart.findOneAndUpdate(
        {
            user: user._id,
            "products.product": { $ne: productId } 
        },
        {
            $push: {
                products: {
                    product: productId,
                    quantity: 1
                }
            }
        },
        {
            upsert: true, 
            new: true 
        }
    );

    if (!cart) {
        return res.status(400).json({ message: "Unable to add to cart." });
    }

    return res.status(200).json(cart);
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const user = req.user;

    const updatedCart = await Cart.findOneAndUpdate(
        {
            user: user._id, 
            "products.product": productId
        },
        {
            $pull: {
                products: {
                    product: productId
                }
            }
        },
        {
            new: true
        }
    );

    if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found or product not in cart" });
    }

    return res.status(200).json(updatedCart);
});

const updateQuantity = asyncHandler(async (req, res) => {
    const user = req.user;
    const { quantity } = req.body;
    const { productId } = req.params;

    const updatedCart = await Cart.findOneAndUpdate(
        {
            user: user._id,
            "products._id": productId
        },
        {
            $set: { "products.$.quantity": quantity }
        },
        {
            new: true
        }
    );

    if (!updatedCart) {
        return res.status(404).json({ message: "Cart or product not found" });
    }

    return res.status(200).json(updatedCart);
});

const getUserCart = asyncHandler(async (req, res) => {
    const user = req.user;
    const cart = await Cart.findOne({
        user: user._id
    });

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
});
