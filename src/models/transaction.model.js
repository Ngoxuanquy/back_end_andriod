const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Transactions'
const COLLECTION_NAME = 'transactions'

const TransactionSchema = new Schema(
    {
        transaction_state: {
            type: String,
            required: true,
            enum: ['active', 'completed', 'failed', 'pending'],
            default: 'active',
        },
        transaction_products: {
            type: Array,
            required: true,
            default: [],
        },

        transaction_count_product: {
            type: Number,
            default: 0,
        },

        transaction_userId: {
            type: Array,
            required: true,
            default: [],

        },
        transaction_ShopId: {
            type: String,
            required: true,
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifieOn',
        },
    }
)

module.exports = {
    transaction: model(DOCUMENT_NAME, TransactionSchema),
}
