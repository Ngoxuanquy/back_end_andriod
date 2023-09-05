const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Contact'
const COLLECTION_NAME = 'Contacts'

const ContactSchema = new Schema(
    {
        contact_state: {
            type: String,
            required: true,
            enum: ['active', 'completed', 'failed', 'pending'],
            default: 'active',
        },
        name: {
            type: String,
        },
        address: {
            type: String,
        },

        phone: {
            type: Number,
        },
        userId: {
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
    contact: model(DOCUMENT_NAME, ContactSchema),
}
