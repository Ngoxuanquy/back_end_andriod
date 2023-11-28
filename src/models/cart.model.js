const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'carts';

const cartSchema = new Schema(
    {
        cart_state: {
            type: String,
            required: true,
            enum: ['active', 'completed', 'failed', 'order'],
            default: 'active',
        },
        cart_products: {
            type: Array,
            required: true,
            default: [],
        },

        cart_count_product: {
            type: Number,
            default: 0,
        },

        cart_userId: {
            type: String,
            required: true,
        },
        cart_ShopId: {
            type: String,
            required: true,
        },
        datetime: {
            type: String,
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifieOn',
        },
    },
);

module.exports = {
    cart: model(DOCUMENT_NAME, cartSchema),
};
